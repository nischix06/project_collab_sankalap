import React from 'react';

export default function ProposalDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-xl font-bold">Proposal {params.id}</h1>
    </div>
  );
}
