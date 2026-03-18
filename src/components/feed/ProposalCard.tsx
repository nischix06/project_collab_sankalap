"use client";

import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, MoreHorizontal, Rocket, Code, Layers, FileText, UserPlus } from "lucide-react";
import { useState } from "react";

interface ProposalCardProps {
  proposal: {
    _id: string;
    title: string;
    description: string;
    type: "idea" | "research" | "implementation" | "collaboration";
    status: "proposal" | "active" | "disabled";
    stage: string;
    votes: number;
    techStack: string[];
    createdAt: string;
    createdBy: {
      name: string;
      avatar?: string;
      role: string;
    };
  };
}

const typeStyles = {
  idea: { label: "IDEA", icon: Rocket, color: "text-amber-500", bg: "bg-amber-100/50 dark:bg-amber-900/20" },
  research: { label: "RESEARCH", icon: FileText, color: "text-blue-500", bg: "bg-blue-100/50 dark:bg-blue-900/20" },
  implementation: { label: "BUILD", icon: Code, color: "text-green-500", bg: "bg-green-100/50 dark:bg-green-900/20" },
  collaboration: { label: "COLLAB", icon: UserPlus, color: "text-purple-500", bg: "bg-purple-100/50 dark:bg-purple-900/20" },
};

const stages = ["Proposal", "Planning", "Ideation", "Architecture", "Setup", "Development", "Completed"];

export default function ProposalCard({ proposal }: ProposalCardProps) {
  const [voteCount, setVoteCount] = useState(proposal.votes);
  const [voted, setVoted] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    if (voted === type) {
      setVoted(null);
      setVoteCount(prev => (type === "up" ? prev - 1 : prev + 1));
    } else {
      setVoteCount(prev => (voted === (type === "up" ? "down" : "up") ? (type === "up" ? prev + 2 : prev - 2) : (type === "up" ? prev + 1 : prev - 1)));
      setVoted(type);
    }
  };

  const currentStageIndex = stages.findIndex(s => s.toLowerCase() === proposal.stage.toLowerCase());
  const progress = ((currentStageIndex + 1) / stages.length) * 100;

  const style = typeStyles[proposal.type] || typeStyles.idea;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-blue-600">
              {proposal.createdBy.name[0]}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight hover:underline cursor-pointer">{proposal.createdBy.name}</h4>
              <p className="text-[11px] text-slate-500 font-medium">3 hours ago • <span className={style.color}>{style.label}</span></p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{proposal.title}</h3>
            <div className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 ${style.bg} ${style.color}`}>
              <style.icon className="w-3 h-3" />
              {style.label}
            </div>
          </div>
          
          <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3">
            {proposal.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {proposal.techStack.map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded ring-1 ring-slate-200 dark:ring-slate-700">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
             <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> Stage: {proposal.stage}</span>
             <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className={`h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full`}
            />
          </div>
        </div>

        {/* Visual Vote Count (Social Like Bar) */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
            <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1">
                    <div className="z-20 p-1 rounded-full bg-blue-500 text-white"><ThumbsUp className="w-2.5 h-2.5" /></div>
                    <div className="z-10 p-1 rounded-full bg-red-400 text-white"><ThumbsDown className="w-2.5 h-2.5" /></div>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{voteCount} engagement score</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 hover:underline cursor-pointer">12 comments • 8 shares</span>
        </div>
      </div>

      <div className="grid grid-cols-3 border-t border-slate-100 dark:border-slate-800">
        <button 
            onClick={() => handleVote("up")}
            className={`flex items-center justify-center gap-2 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold text-xs ${voted === "up" ? "text-blue-600" : "text-slate-500"}`}
        >
          <ThumbsUp className={`w-4 h-4 ${voted === "up" ? "fill-blue-600" : ""}`} />
          Upvote
        </button>
        <button 
            onClick={() => handleVote("down")}
            className={`flex items-center justify-center gap-2 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold text-xs ${voted === "down" ? "text-red-500" : "text-slate-500"}`}
        >
          <ThumbsDown className={`w-4 h-4 ${voted === "down" ? "fill-red-500" : ""}`} />
          Downvote
        </button>
        <button className="flex items-center justify-center gap-2 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-semibold text-xs text-slate-500">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </motion.div>
  );
}
