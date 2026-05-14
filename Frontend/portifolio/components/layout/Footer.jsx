export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded bg-[#00a6a6] font-black">K</div>
            <p className="text-lg font-bold">KFin Portfolio</p>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-300">
            A clean investor servicing dashboard for SIP tracking, mutual fund data,
            holdings, transaction history, and portfolio valuation.
          </p>
        </div>

        <FooterColumn title="Mutual Fund Solutions" items={["Investor Desk", "AMC Solutions", "Portfolio View", "SIP Processing"]} />
        <FooterColumn title="Registry" items={["Investor Records", "Holdings", "Transactions", "Reports"]} />
        <FooterColumn title="Get In Touch" items={["+91-40-67162222", "support@kfinportfolio.com", "Hyderabad, India"]} />
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <p className="mb-4 text-sm font-bold uppercase tracking-wide text-white">{title}</p>
      <div className="space-y-2 text-sm text-slate-300">
        {items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}
