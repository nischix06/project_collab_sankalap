import React from 'react';

export default function MemberDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="member-dashboard-layout">
      {children}
    </div>
  );
}
