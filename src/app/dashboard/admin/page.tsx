import dbConnect from "@/lib/mongodb";
import Proposal from "@/models/Proposal";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminControls from "./AdminControls"; // Client component

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  await dbConnect();
  const user = await User.findOne({ email: session?.user?.email });
  
  if (user?.role !== "pixel_head") {
    redirect("/dashboard");
  }

  const proposals = await Proposal.find({ status: "proposal" })
    .populate("createdBy", "name role")
    .sort({ votes: -1 })
    .lean();

  const leads = await User.find({ role: { $in: ["project_lead", "pixel_member"] } }).lean();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Pixel Head Dashboard</h1>
        <p className="text-slate-500">Manage community project proposals and assign leads.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {proposals.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-400 font-medium">No pending proposals to review.</p>
          </div>
        ) : (
          proposals.map((p: any) => (
            <div key={p._id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-[10px] font-bold uppercase">{p.type}</span>
                  <span className="text-xs text-slate-400 font-medium">Votes: {p.votes}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{p.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">{p.description}</p>
                <p className="text-xs text-slate-400">Created by <span className="font-bold text-slate-600">{p.createdBy.name}</span></p>
              </div>

              <AdminControls proposalId={p._id.toString()} leads={leads as any[]} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
