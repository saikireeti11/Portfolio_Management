"use client";

import DataPanel from "../ui/DataPanel";
import EmptyState from "../ui/EmptyState";
import FormCard from "../ui/FormCard";
import SelectInput from "../ui/SelectInput";
import TextInput from "../ui/TextInput";
import { formatMoney } from "../../utils/formatters";

export default function SipsPage({ sips, investors, funds, form, setForm, onSubmit, onProcess, loading }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <FormCard title="Register SIP" onSubmit={onSubmit} buttonText="Register SIP" loading={loading}>
        <SelectInput label="Investor" value={form.investor_id} onChange={(value) => setForm({ ...form, investor_id: value })}>
          <option value="">Choose investor</option>
          {investors.map((investor) => (
            <option key={investor.investor_id} value={investor.investor_id}>
              {investor.first_name} {investor.last_name}
            </option>
          ))}
        </SelectInput>
        <SelectInput label="Fund" value={form.fund_id} onChange={(value) => setForm({ ...form, fund_id: value })}>
          <option value="">Choose fund</option>
          {funds.map((fund) => (
            <option key={fund.fund_id} value={fund.fund_id}>{fund.fund_name}</option>
          ))}
        </SelectInput>
        <TextInput label="Portfolio ID optional" type="number" required={false} value={form.portfolio_id} onChange={(value) => setForm({ ...form, portfolio_id: value })} />
        <TextInput label="SIP Amount" type="number" value={form.sip_amount} onChange={(value) => setForm({ ...form, sip_amount: value })} />
        <TextInput label="SIP Date" type="number" value={form.sip_date} onChange={(value) => setForm({ ...form, sip_date: value })} />
        <TextInput label="Start Date" type="date" value={form.start_date} onChange={(value) => setForm({ ...form, start_date: value })} />
      </FormCard>

      <DataPanel title="SIP Book">
        {sips.length === 0 ? (
          <EmptyState text="No SIPs found. Register a SIP to begin." />
        ) : (
          sips.map((sip) => (
            <div key={sip.sip_id} className="grid gap-3 border-b border-slate-100 py-4 last:border-none md:grid-cols-[1fr_auto_auto] md:items-center">
              <div>
                <p className="font-bold text-slate-950">{sip.fund_name}</p>
                <p className="text-sm text-slate-500">
                  {sip.first_name} {sip.last_name} | SIP date {sip.sip_date} | {sip.status}
                </p>
              </div>
              <p className="font-black">{formatMoney(sip.sip_amount)}</p>
              <button
                disabled={loading}
                onClick={() => onProcess(sip.sip_id)}
                className="inline-flex h-10 items-center justify-center rounded bg-slate-950 px-4 text-sm font-bold text-white disabled:opacity-60"
              >
                Process
              </button>
            </div>
          ))
        )}
      </DataPanel>
    </div>
  );
}
