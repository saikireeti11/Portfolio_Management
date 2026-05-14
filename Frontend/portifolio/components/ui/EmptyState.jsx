import { CheckCircle2 } from "lucide-react";

export default function EmptyState({ text }) {
  return (
    <div className="rounded border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
      <CheckCircle2 className="mx-auto mb-2 text-slate-300" size={24} />
      {text}
    </div>
  );
}
