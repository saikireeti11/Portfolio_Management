"use client";

import DataPanel from "../ui/DataPanel";
import EmptyState from "../ui/EmptyState";
import FormCard from "../ui/FormCard";
import ListRow from "../ui/ListRow";
import TextInput from "../ui/TextInput";
import { formatMoney } from "../../utils/formatters";

export default function InvestorsPage({ investors, form, setForm, onSubmit, holdings, netWorth, loading }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <FormCard title="Create Investor" onSubmit={onSubmit} buttonText="Save Investor" loading={loading}>
        <div className="grid gap-3 sm:grid-cols-2">
          <TextInput label="First Name" value={form.first_name} onChange={(value) => setForm({ ...form, first_name: value })} />
          <TextInput label="Last Name" value={form.last_name} onChange={(value) => setForm({ ...form, last_name: value })} />
        </div>
        <TextInput label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
        <TextInput label="Phone" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
        <TextInput label="PAN Number" value={form.pan_number} onChange={(value) => setForm({ ...form, pan_number: value.toUpperCase() })} />
      </FormCard>

      <div className="space-y-6">
        <DataPanel title="Investors">
          {investors.length === 0 ? (
            <EmptyState text="No investors found. Create one from the form." />
          ) : (
            investors.map((investor) => (
              <ListRow
                key={investor.investor_id}
                title={`${investor.first_name} ${investor.last_name}`}
                subtitle={investor.email}
                right={`${investor.total_sips || 0} SIPs`}
              />
            ))
          )}
        </DataPanel>

        <DataPanel title={`Selected Net Worth: ${formatMoney(netWorth?.totalNetWorth || 0)}`}>
          {holdings.length === 0 ? (
            <EmptyState text="Select or create an investor with processed SIPs to see holdings." />
          ) : (
            holdings.map((holding) => (
              <ListRow
                key={holding.fund_id}
                title={holding.fund_name}
                subtitle={`${Number(holding.units_held).toFixed(4)} units at NAV ${holding.latest_nav}`}
                right={formatMoney(holding.current_value)}
              />
            ))
          )}
        </DataPanel>
      </div>
    </div>
  );
}
