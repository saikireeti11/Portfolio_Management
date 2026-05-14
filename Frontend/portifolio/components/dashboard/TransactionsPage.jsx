"use client";

import { Search } from "lucide-react";
import EmptyState from "../ui/EmptyState";
import { formatDate, formatMoney } from "../../utils/formatters";

export default function TransactionsPage({
  sips,
  selectedSipId,
  onSelectSip,
  transactions,
  search,
  setSearch
}) {
  return (
    <div className="rounded bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-black">Investment Transactions</h2>
          <p className="text-sm text-slate-500">Choose a SIP to view transaction history</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select value={selectedSipId} onChange={(event) => onSelectSip(event.target.value)} className="h-11 rounded border border-slate-200 px-3 text-sm">
            <option value="">Choose SIP</option>
            {sips.map((sip) => (
              <option key={sip.sip_id} value={sip.sip_id}>
                {sip.fund_name} | {formatMoney(sip.sip_amount)}
              </option>
            ))}
          </select>
          <div className="flex h-11 items-center gap-2 rounded border border-slate-200 px-3">
            <Search size={16} className="text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search" className="outline-none" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b text-slate-500">
              <th className="py-3">Fund</th>
              <th>Type</th>
              <th>Date</th>
              <th>NAV</th>
              <th>Units</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_id} className="border-b last:border-none">
                <td className="py-4 font-bold">{transaction.fund_name}</td>
                <td>{transaction.transaction_type}</td>
                <td>{formatDate(transaction.transaction_date)}</td>
                <td>{transaction.nav}</td>
                <td>{Number(transaction.units_allocated).toFixed(6)}</td>
                <td className="font-black">{formatMoney(transaction.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {transactions.length === 0 && <EmptyState text="No transactions available for this SIP." />}
      </div>
    </div>
  );
}
