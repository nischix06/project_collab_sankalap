import dbConnect from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import User from "@/models/User";
import ProposalFeed from "@/components/feed/ProposalFeed";
import CreateProposalModal from "@/components/feed/CreateProposalModal";
import FeedActions from "./FeedActions"; // Client component for modal state
import { Zap } from "lucide-react";

export default async function ProposalsPage() {
  await dbConnect();

  const proposals = await Proposal.find({})
    .populate("createdBy", "name avatar role")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 gap-8 relative overflow-hidden">
        <div className="space-y-2 relative z-10">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Project Incubator</h1>
          <p className="text-slate-500 font-medium tracking-tight text-lg">Shape the next big thing at Pixel Club. Vote, collaborate, build.</p>
        </div>
        <div className="relative z-10">
          <FeedActions />
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
            <ProposalFeed proposals={proposals as any[]} title="Latest Proposals" />
        </div>

        <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500 fill-amber-500" /> Trending Projects
                </h3>
                <div className="space-y-6">
                    {proposals.slice(0, 3).map((p: any, i) => (
                        <div key={p._id} className="group cursor-pointer">
                            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">#{i + 1} Trending</p>
                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">{p.title}</h4>
                            <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs text-slate-400 font-medium">{p.votes} votes</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span className="text-xs text-slate-400 font-medium">12 comments</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full mt-8 py-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 text-slate-600 dark:text-slate-400 font-bold text-xs rounded-xl transition-all">
                    View Leaderboard
                </button>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-2">Need a Team?</h3>
                    <p className="text-blue-100 text-sm leading-relaxed mb-6">Filter by "Collaboration" to find projects looking for your skills.</p>
                    <button className="px-5 py-2.5 bg-white text-blue-600 rounded-xl text-xs font-black shadow-lg hover:scale-105 transition-all">
                        Browse Collabs
                    </button>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>
        </aside>
      </div>
    </div>
  );
}
