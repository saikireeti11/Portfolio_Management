"use client";

export default function FormCard({ title, children, onSubmit, buttonText, loading }) {
  return (
    <form onSubmit={onSubmit} className="rounded bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-black">{title}</h2>
      <div className="space-y-4">{children}</div>
      <button disabled={loading} className="mt-5 h-11 w-full rounded bg-slate-950 text-sm font-bold text-white disabled:opacity-60">
        {buttonText}
      </button>
    </form>
  );
}
