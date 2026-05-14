export default function ListRow({ title, subtitle, right, action }) {
  return (
    <div className="grid gap-3 border-b border-slate-100 py-4 last:border-none sm:grid-cols-[1fr_auto] sm:items-center">
      <div>
        <p className="font-bold text-slate-950">{title}</p>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        {right && <p className="font-black text-slate-950">{right}</p>}
        {action}
      </div>
    </div>
  );
}
