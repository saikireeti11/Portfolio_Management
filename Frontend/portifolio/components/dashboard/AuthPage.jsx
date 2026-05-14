"use client";

import { useContext, useState } from "react";
import { CircleDollarSign, Loader2, ShieldCheck, TrendingUp } from "lucide-react";
import AuthContext from "../../context/AuthContext";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import StatusMessage from "../ui/StatusMessage";
import TextInput from "../ui/TextInput";

export default function AuthPage() {
  const { login, register } = useContext(AuthContext);
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
        setMessage("Logged in successfully");
      } else {
        await register(form);
        setMessage("Account created successfully");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="mx-auto grid min-h-[calc(100vh-160px)] max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded bg-slate-950 p-8 text-white shadow-xl lg:p-12">
          <p className="mb-4 inline-flex rounded bg-[#00a6a6]/20 px-3 py-1 text-sm font-semibold text-cyan-200">
            SIP Tracker & Portfolio Management
          </p>
          <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
            Manage investors, mutual funds, SIPs, holdings, and net worth from one desk.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            A professional KFin-inspired frontend connected to your Express and Supabase PostgreSQL backend.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <HeroPoint icon={<ShieldCheck size={20} />} title="JWT Auth" text="Secure protected APIs" />
            <HeroPoint icon={<TrendingUp size={20} />} title="Live NAV" text="Funds and holdings" />
            <HeroPoint icon={<CircleDollarSign size={20} />} title="SIP Flow" text="Process transactions" />
          </div>
        </section>

        <section className="rounded bg-white p-6 shadow-xl sm:p-8">
          <div className="mb-6 flex rounded bg-slate-100 p-1">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded px-4 py-2 text-sm font-bold ${mode === "login" ? "bg-white shadow" : "text-slate-500"}`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 rounded px-4 py-2 text-sm font-bold ${mode === "register" ? "bg-white shadow" : "text-slate-500"}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <TextInput label="Name" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
            )}
            <TextInput label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
            <TextInput label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} />
            <button className="flex h-12 w-full items-center justify-center rounded bg-[#00a6a6] font-bold text-white hover:bg-[#008f8f]">
              {loading ? <Loader2 className="animate-spin" size={20} /> : mode === "login" ? "Login to Dashboard" : "Create Account"}
            </button>
          </form>

          <StatusMessage error={error} message={message} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

function HeroPoint({ icon, title, text }) {
  return (
    <div className="rounded border border-white/10 bg-white/5 p-4">
      <div className="mb-3 text-cyan-200">{icon}</div>
      <p className="font-bold">{title}</p>
      <p className="text-sm text-slate-300">{text}</p>
    </div>
  );
}
