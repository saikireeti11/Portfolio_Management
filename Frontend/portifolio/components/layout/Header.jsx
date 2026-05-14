"use client";

import { LogOut, Menu } from "lucide-react";

export default function Header({ user, onLogout }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded bg-[#00a6a6] text-xl font-black text-white">
            K
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight text-slate-950">KFin Portfolio</p>
            <p className="text-xs font-medium text-slate-500">SIP Tracker & Wealth Desk</p>
          </div>
        </div>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
          <span>Solutions</span>
          <span>Products</span>
          <span>Investors</span>
          <span>Mutual Funds</span>
          <span>Contact Us</span>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <button
                onClick={onLogout}
                className="inline-flex h-10 items-center gap-2 rounded border border-slate-200 px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <button className="inline-flex h-10 items-center gap-2 rounded border border-slate-200 px-3 text-sm font-semibold text-slate-700 lg:hidden">
              <Menu size={18} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
