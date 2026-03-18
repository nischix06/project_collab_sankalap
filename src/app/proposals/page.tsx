import dbConnect from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import User from "@/models/User";
import ProposalFeed from "@/components/feed/ProposalFeed";
import CreateProposalModal from "@/components/feed/CreateProposalModal";
import FeedActions from "./FeedActions"; // Client component for modal state

export default async function ProposalsPage() {
  await dbConnect();

  const proposals = await Proposal.find({})
    .populate("createdBy", "name avatar role")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <div className="flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Community Proposals</h1>
          <p className="text-sm text-slate-500">Vote for the projects you want to see built.</p>
        </div>
        <FeedActions />
      </div>

      <ProposalFeed proposals={proposals as any[]} />
    </div>
  );
}
