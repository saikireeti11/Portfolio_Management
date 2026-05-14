"use client";

import DataPanel from "../ui/DataPanel";
import EmptyState from "../ui/EmptyState";
import FormCard from "../ui/FormCard";
import ListRow from "../ui/ListRow";
import SelectInput from "../ui/SelectInput";
import TextInput from "../ui/TextInput";

export default function FundsPage({
  funds,
  form,
  setForm,
  navForm,
  setNavForm,
  onSubmit,
  onUpdateNav,
  loading
}) {
  const amcs = Array.from(
    new Map(
      funds
        .filter((fund) => fund.amc_id)
        .map((fund) => [fund.amc_id, { amc_id: fund.amc_id, amc_name: fund.amc_name || `AMC ${fund.amc_id}` }])
    ).values()
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <div className="space-y-6">
        <FormCard title="Create Fund" onSubmit={onSubmit} buttonText="Save Fund" loading={loading}>
          {amcs.length > 0 ? (
            <SelectInput label="AMC" value={form.amc_id} onChange={(value) => setForm({ ...form, amc_id: value })}>
              <option value="">Choose AMC</option>
              {amcs.map((amc) => (
                <option key={amc.amc_id} value={amc.amc_id}>{amc.amc_name}</option>
              ))}
            </SelectInput>
          ) : (
            <TextInput label="AMC ID" type="number" value={form.amc_id} onChange={(value) => setForm({ ...form, amc_id: value })} />
          )}
          <TextInput label="Fund Name" value={form.fund_name} onChange={(value) => setForm({ ...form, fund_name: value })} />
          <TextInput label="Fund Type" value={form.fund_type} onChange={(value) => setForm({ ...form, fund_type: value })} />
          <TextInput label="Category" value={form.category} onChange={(value) => setForm({ ...form, category: value })} />
          <TextInput label="Latest NAV" type="number" value={form.latest_nav} onChange={(value) => setForm({ ...form, latest_nav: value })} />
        </FormCard>

        <FormCard title="Update Fund NAV" onSubmit={onUpdateNav} buttonText="Update NAV" loading={loading}>
          <SelectInput label="Fund" value={navForm.fund_id} onChange={(value) => setNavForm({ ...navForm, fund_id: value })}>
            <option value="">Choose fund</option>
            {funds.map((fund) => (
              <option key={fund.fund_id} value={fund.fund_id}>{fund.fund_name}</option>
            ))}
          </SelectInput>
          <TextInput label="New NAV" type="number" value={navForm.latest_nav} onChange={(value) => setNavForm({ ...navForm, latest_nav: value })} />
        </FormCard>
      </div>

      <DataPanel title="Mutual Funds">
        {funds.length === 0 ? (
          <EmptyState text="No mutual funds found." />
        ) : (
          funds.map((fund) => (
            <ListRow
              key={fund.fund_id}
              title={fund.fund_name}
              subtitle={`${fund.amc_name || "AMC"} | ${fund.category || "Category"} | ${fund.fund_type || "Type"}`}
              right={`NAV ${fund.latest_nav}`}
            />
          ))
        )}
      </DataPanel>
    </div>
  );
}
