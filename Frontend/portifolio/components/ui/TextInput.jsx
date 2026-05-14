"use client";

export default function TextInput({ label, value, onChange, type = "text", required = true, placeholder }) {
  const inputType = type === "email" ? "text" : type;

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
      <input
        required={required}
        type={inputType}
        inputMode={type === "email" ? "email" : undefined}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#00a6a6]"
      />
    </label>
  );
}
