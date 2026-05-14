"use client";

export default function SelectInput({ label, value, onChange, children, required = true }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
      <select
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#00a6a6]"
      >
        {children}
      </select>
    </label>
  );
}
