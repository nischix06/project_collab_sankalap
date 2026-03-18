"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import CreateProposalModal from "@/components/feed/CreateProposalModal";
import { useRouter } from "next/navigation";

export default function FeedActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all"
      >
        <Plus className="w-5 h-5" /> New Proposal
      </button>

      <CreateProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          router.refresh();
        }}
      />
    </>
  );
}
