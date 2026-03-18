import dbConnect from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import User from "@/models/User";
import ProposalFeed from "@/components/feed/ProposalFeed";
import FeedActions from "./FeedActions"; 
import LiveActivityStream from "@/components/feed/LiveActivityStream";
import BuildersOnline from "@/components/feed/BuildersOnline";
import TopBuildersLeaderboard from "@/components/feed/TopBuildersLeaderboard";
import { Zap, Activity, Users, Trophy, Plus } from "lucide-react";

export default async function ProposalsPage() {
  await dbConnect();

  const proposals = await Proposal.find({})
    .populate("createdBy", "name avatar role")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 font-sans">
      {/* Header Section - More Dense */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900 text-white p-8 rounded-3xl shadow-2xl border border-slate-800 relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2 mb-1">
             <span className="px-2 py-0.5 bg-blue-500 text-[10px] font-black rounded uppercase tracking-widest">Live Now</span>
             <span className="text-[10px] font-mono text-slate-400">SESSION: ACTIVE</span>
          </div>
          <h1 className="text-3xl font-black tracking-tighter">BUILDER FEED</h1>
          <p className="text-slate-400 font-medium text-sm">Where ideas transform into code. Join the momentum.</p>
        </div>
        <div className="relative z-10 scale-110">
          <FeedActions />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar - Quick Stats/Menu (Optional, can keep it simpler) */}
        
        {/* Center Feed - Main Focus */}
        <div className="lg:col-span-8 space-y-8">
            <ProposalFeed proposals={proposals as any[]} title="Recent Ideas" />
        </div>

        {/* Right Sidebar - Vibe Multipliers */}
        <aside className="lg:col-span-4 space-y-8 sticky top-24">
            {/* Builders Online */}
            <div className="glass p-6 rounded-3xl">
                <BuildersOnline />
            </div>

            {/* Live Activity */}
            <div className="glass p-6 rounded-3xl">
                <LiveActivityStream />
            </div>

            {/* Leaderboard */}
            <div className="glass p-6 rounded-3xl">
                <TopBuildersLeaderboard />
            </div>

            {/* Floating Action Button Simulation (Actually in FeedActions, but can add another here) */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl shadow-xl text-white">
                <h3 className="text-sm font-black mb-1 uppercase tracking-wider">Got a Vision?</h3>
                <p className="text-blue-100 text-xs mb-4">Dont just watch. Build the next big project at Pixel.</p>
                <button className="w-full py-2.5 bg-white text-blue-600 rounded-xl text-[10px] font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest">
                    Pitch Your Idea
                </button>
            </div>
        </aside>
      </div>
    </div>
  );
}
