export default function DataPanel({ title, children, action }) {
  return (
    <section className="rounded bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-black">{title}</h2>
        {action}
      </div>
      <div>{children}</div>
    </section>
  );
}
