"use client";

import { ArrowRight, Bell, Landmark, TrendingUp, Users, Wallet } from "lucide-react";
import EmptyState from "../ui/EmptyState";
import { formatMoney } from "../../utils/formatters";

export default function OverviewPage({ investors, funds, sips, holdings, netWorth, onOpenSips }) {
  const totalSipAmount = sips.reduce((sum, sip) => sum + Number(sip.sip_amount || 0), 0);
  const activeSips = sips.filter((sip) => String(sip.status).toLowerCase() === "active").length;

  return (
    <div className="space-y-7">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Investors" value={investors.length} label="Registered investors" icon={<Users size={20} />} />
        <StatCard title="Mutual Funds" value={funds.length} label="Available schemes" icon={<Landmark size={20} />} />
        <StatCard title="Active SIPs" value={activeSips} label={`Monthly SIP ${formatMoney(totalSipAmount)}`} icon={<Wallet size={20} />} />
        <StatCard title="Net Worth" value={formatMoney(netWorth?.totalNetWorth || 0)} label="Selected investor" icon={<TrendingUp size={20} />} strong />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-black">Holdings</h2>
            <span className="rounded bg-cyan-50 px-3 py-1 text-sm font-bold text-cyan-700">{holdings.length} funds</span>
          </div>
          <div className="space-y-3">
            {holdings.length === 0 ? (
              <EmptyState text="No holdings found for selected investor. Process a SIP to create holdings." />
            ) : (
              holdings.map((holding) => (
                <div key={holding.fund_id} className="grid gap-3 rounded border border-slate-100 p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
                  <div>
                    <p className="font-bold text-slate-950">{holding.fund_name}</p>
                    <p className="text-sm text-slate-500">{holding.fund_type || "Mutual Fund"}</p>
                  </div>
                  <p className="text-sm text-slate-600">{Number(holding.units_held).toFixed(4)} units</p>
                  <p className="font-black text-slate-950">{formatMoney(holding.current_value)}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded bg-slate-950 p-6 text-white shadow-sm">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <p className="text-sm text-cyan-200">Portfolio Value</p>
              <h2 className="mt-2 text-4xl font-black">{formatMoney(netWorth?.totalNetWorth || 0)}</h2>
            </div>
            <Bell className="text-cyan-200" />
          </div>
          <div className="mb-8 grid grid-cols-3 gap-3">
            <MiniBar label="SIPs" value={sips.length} height="h-24" />
            <MiniBar label="Funds" value={funds.length} height="h-32" />
            <MiniBar label="Holdings" value={holdings.length} height="h-20" />
          </div>
          <button onClick={onOpenSips} className="inline-flex h-11 items-center gap-2 rounded bg-white px-4 text-sm font-bold text-slate-950">
            Process SIP
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, label, icon, strong }) {
  return (
    <div className={`rounded p-5 shadow-sm ${strong ? "bg-[#00a6a6] text-white" : "bg-white text-slate-950"}`}>
      <div className="mb-6 flex items-center justify-between">
        <p className={`text-sm font-bold ${strong ? "text-cyan-50" : "text-slate-500"}`}>{title}</p>
        <div className={`grid h-10 w-10 place-items-center rounded ${strong ? "bg-white/20" : "bg-slate-100"}`}>{icon}</div>
      </div>
      <p className="text-3xl font-black">{value}</p>
      <p className={`mt-1 text-sm ${strong ? "text-cyan-50" : "text-slate-500"}`}>{label}</p>
    </div>
  );
}

function MiniBar({ label, value, height }) {
  return (
    <div className="flex flex-col items-center justify-end gap-2">
      <div className={`w-full rounded bg-cyan-300 ${height}`}></div>
      <p className="text-xs text-slate-300">{label}</p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  );
}
