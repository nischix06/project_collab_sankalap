import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import Vote from "@/models/Vote";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { proposalId, voteType } = await req.json();

    await dbConnect();

    const user = await User.findOne({ email: session.user?.email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const userId = user._id;

    // Check existing vote
    const existingVote = await Vote.findOne({ userId, proposalId });

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // Remove vote if same type (toggle)
        await Vote.findByIdAndDelete(existingVote._id);
        await Proposal.findByIdAndUpdate(proposalId, { $inc: { votes: voteType === "up" ? -1 : 1 } });
      } else {
        // Change vote type
        existingVote.voteType = voteType;
        await existingVote.save();
        await Proposal.findByIdAndUpdate(proposalId, { $inc: { votes: voteType === "up" ? 2 : -2 } });
      }
    } else {
      // Create new vote
      await Vote.create({ userId, proposalId, voteType });
      await Proposal.findByIdAndUpdate(proposalId, { $inc: { votes: voteType === "up" ? 1 : -1 } });
    }

    // Refresh proposal to check for status update
    const updatedProposal = await Proposal.findById(proposalId);
    
    // Logic: if votes >= 10 -> status = active
    if (updatedProposal.votes >= 10 && updatedProposal.status === "proposal") {
        updatedProposal.status = "active";
        await updatedProposal.save();
    }

    return NextResponse.json(updatedProposal);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
