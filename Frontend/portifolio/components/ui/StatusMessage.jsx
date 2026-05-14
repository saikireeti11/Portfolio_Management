"use client";

export default function StatusMessage({ error, message }) {
  if (!error && !message) return null;

  return (
    <div className={`mb-5 rounded px-4 py-3 text-sm font-semibold ${error ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
      {error || message}
    </div>
  );
}
