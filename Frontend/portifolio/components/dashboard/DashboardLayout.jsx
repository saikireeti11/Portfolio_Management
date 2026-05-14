"use client";

import {
  BarChart3,
  Landmark,
  LayoutDashboard,
  Plus,
  RefreshCw,
  Users,
  Wallet,
  Loader2
} from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import StatusMessage from "../ui/StatusMessage";

export default function DashboardLayout({
  user,
  logout,
  activeView,
  setActiveView,
  investors,
  selectedInvestorId,
  onSelectInvestor,
  loading,
  message,
  error,
  onRefresh,
  children
}) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header user={user} onLogout={logout} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="overflow-hidden rounded bg-white shadow-xl">
          <div className="grid lg:grid-cols-[260px_1fr]">
            <aside className="border-b border-slate-200 p-5 lg:border-b-0 lg:border-r">
              <div className="mb-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Main Menu</p>
                <div className="space-y-2">
                  <SideButton icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeView === "dashboard"} onClick={() => setActiveView("dashboard")} />
                  <SideButton icon={<Users size={18} />} label="Investors" active={activeView === "investors"} onClick={() => setActiveView("investors")} />
                  <SideButton icon={<Landmark size={18} />} label="Funds" active={activeView === "funds"} onClick={() => setActiveView("funds")} />
                  <SideButton icon={<Wallet size={18} />} label="SIPs" active={activeView === "sips"} onClick={() => setActiveView("sips")} />
                  <SideButton icon={<BarChart3 size={18} />} label="Transactions" active={activeView === "transactions"} onClick={() => setActiveView("transactions")} />
                </div>
              </div>

              <div className="rounded border border-dashed border-slate-300 p-4">
                <p className="text-sm font-bold text-slate-900">Selected Investor</p>
                <select
                  value={selectedInvestorId}
                  onChange={(event) => onSelectInvestor(event.target.value)}
                  className="mt-3 w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="">Choose investor</option>
                  {investors.map((investor) => (
                    <option key={investor.investor_id} value={investor.investor_id}>
                      {investor.first_name} {investor.last_name}
                    </option>
                  ))}
                </select>
              </div>
            </aside>

            <section className="min-h-[720px] bg-[#f7f8fb] p-5 lg:p-8">
              <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-black text-slate-950 md:text-4xl">Portfolio Analytics</h1>
                  <p className="mt-1 text-sm text-slate-500">Live data from your Express and Supabase backend</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={onRefresh}
                    className="inline-flex h-11 items-center gap-2 rounded border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700"
                  >
                    {loading ? <Loader2 className="animate-spin" size={16} /> : <RefreshCw size={16} />}
                    Refresh
                  </button>
                  <button
                    onClick={() => setActiveView("sips")}
                    className="inline-flex h-11 items-center gap-2 rounded bg-slate-950 px-4 text-sm font-bold text-white"
                  >
                    <Plus size={16} />
                    New SIP
                  </button>
                </div>
              </div>

              <StatusMessage error={error} message={message} />
              {children}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function SideButton({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`flex w-full items-center gap-3 rounded px-4 py-3 text-left text-sm font-bold ${active ? "bg-[#e9fbfb] text-[#007f7f]" : "text-slate-500 hover:bg-slate-50"}`}>
      {icon}
      {label}
    </button>
  );
}
