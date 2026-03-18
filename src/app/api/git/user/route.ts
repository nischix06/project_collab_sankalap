import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import GitRepo from "@/models/GitRepo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ message: "UserId required" }, { status: 400 });
    }

    await dbConnect();
    const repos = await GitRepo.find({ userId, type: "PERSONAL" }).sort({ updatedAt: -1 });
    
    return NextResponse.json(repos);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching user repos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { repoUrl } = await req.json();
    if (!repoUrl) return NextResponse.json({ message: "Repo URL required" }, { status: 400 });

    // Simple parser
    const parts = repoUrl.replace("https://github.com/", "").split("/");
    const owner = parts[0];
    const repoName = parts[1];

    if (!owner || !repoName) return NextResponse.json({ message: "Invalid GitHub URL" }, { status: 400 });

    await dbConnect();
    const repo = await GitRepo.findOneAndUpdate(
      { repoUrl, userId: (session.user as any).id },
      {
        repoUrl,
        owner,
        repoName,
        userId: (session.user as any).id,
        type: "PERSONAL",
        syncStatus: "idle"
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(repo);
  } catch (error) {
    return NextResponse.json({ message: "Error linking repo" }, { status: 500 });
  }
}
