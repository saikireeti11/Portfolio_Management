import React from "react";
import {
  Bell,
  Search,
  Settings,
  LogOut,
  LayoutDashboard,
  Users,
  Wallet,
  BarChart3,
  Plus,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const payments = [
    {
      name: "Emma Ryan Jr.",
      amount: "$4,823",
      status: "Done",
      img: "https://i.pravatar.cc/100?img=11",
    },
    {
      name: "Justin Weber",
      amount: "$3,937",
      status: "Pending",
      img: "https://i.pravatar.cc/100?img=12",
    },
  ];

  const transactions = [
    {
      name: "Emma Ryan Jr.",
      type: "Salary",
      status: "Pending",
      date: "Feb 19th, 2023",
      amount: "$3,892",
      img: "https://i.pravatar.cc/100?img=13",
    },
    {
      name: "Adrian Daren",
      type: "Bonus",
      status: "Done",
      date: "Feb 18th, 2023",
      amount: "$1073",
      img: "https://i.pravatar.cc/100?img=14",
    },
    {
      name: "Roxanne Hills",
      type: "Salary",
      status: "Done",
      date: "Apr 16th, 2023",
      amount: "$2,790",
      img: "https://i.pravatar.cc/100?img=15",
    },
  ];

  return (
    <div className="min-h-screen bg-[#e9e9ef] flex items-center justify-center p-6">
      <div className="w-full max-w-7xl bg-white rounded-[35px] shadow-xl overflow-hidden flex">
        
        {/* Sidebar */}
        <aside className="w-[260px] border-r border-gray-200 p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-14">
              <div className="w-10 h-10 rounded-xl bg-cyan-400"></div>
              <h1 className="text-3xl font-bold">Veritas</h1>
            </div>

            <div className="mb-10">
              <p className="text-xs tracking-[3px] text-gray-400 mb-5">
                MAIN MENU
              </p>

              <div className="space-y-3">
                <SidebarItem
                  icon={<LayoutDashboard size={18} />}
                  label="Dashboard"
                  active
                />
                <SidebarItem icon={<Users size={18} />} label="Users" />
                <SidebarItem icon={<Wallet size={18} />} label="Accounts" />
                <SidebarItem icon={<BarChart3 size={18} />} label="Statistics" />
              </div>
            </div>

            <div>
              <p className="text-xs tracking-[3px] text-gray-400 mb-5">
                TEAMS
              </p>

              <div className="space-y-4 text-gray-600">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  Marketing
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  Development
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5 text-gray-500">
            <div className="flex items-center gap-3 cursor-pointer">
              <Settings size={18} />
              Settings
            </div>

            <div className="flex items-center gap-3 cursor-pointer">
              <LogOut size={18} />
              Log Out
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-5xl font-bold">Analytics</h2>
            </div>

            <div className="flex items-center gap-5">
              <div className="bg-gray-100 rounded-full p-1 flex">
                <button className="px-6 py-2 bg-white rounded-full shadow text-sm font-medium">
                  Full Statistics
                </button>
                <button className="px-6 py-2 text-sm text-gray-500">
                  Results Summary
                </button>
              </div>

              <button className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center">
                <Plus />
              </button>

              <img
                src="https://i.pravatar.cc/100?img=32"
                alt=""
                className="w-12 h-12 rounded-full"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-4 gap-6 mb-10">
            
            {/* Team Payments */}
            <div className="border border-dashed border-gray-300 rounded-3xl p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold leading-tight">
                  Team <br /> Payments
                </h3>
                <Bell size={20} />
              </div>

              <p className="text-sm text-gray-500 mb-8">07 Dec approval</p>

              <div className="flex items-center">
                <div className="flex -space-x-3">
                  <img
                    className="w-11 h-11 rounded-full border-2 border-white"
                    src="https://i.pravatar.cc/100?img=21"
                    alt=""
                  />
                  <img
                    className="w-11 h-11 rounded-full border-2 border-white"
                    src="https://i.pravatar.cc/100?img=22"
                    alt=""
                  />
                  <img
                    className="w-11 h-11 rounded-full border-2 border-white"
                    src="https://i.pravatar.cc/100?img=23"
                    alt=""
                  />
                </div>

                <div className="ml-4 px-4 py-2 rounded-full bg-gray-100 text-sm font-semibold">
                  25+
                </div>
              </div>
            </div>

            {/* Savings */}
            <div className="border border-dashed border-gray-300 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-200 rounded-full"></div>
                <h3 className="text-2xl font-bold">Savings</h3>
              </div>

              <div className="h-20 flex items-end gap-2 mb-6">
                <div className="w-6 h-12 bg-cyan-200 rounded-full"></div>
                <div className="w-6 h-16 bg-cyan-300 rounded-full"></div>
                <div className="w-6 h-10 bg-cyan-200 rounded-full"></div>
                <div className="w-6 h-20 bg-cyan-400 rounded-full"></div>
                <div className="w-6 h-14 bg-cyan-300 rounded-full"></div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-4xl font-bold">$5,839</h2>
                  <p className="text-red-400 text-sm">-11% last week</p>
                </div>

                <button className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Income Statistics */}
            <div className="bg-[#f7f7f7] rounded-3xl p-6">
              <h3 className="text-2xl font-bold mb-2">
                Income statistics
              </h3>

              <span className="text-green-500 text-sm font-semibold">
                +8%
              </span>

              <div className="flex items-end justify-between h-44 mt-8">
                <div className="w-14 h-16 bg-cyan-100 rounded-xl flex items-end justify-center pb-2 text-sm">
                  15%
                </div>

                <div className="w-14 h-28 bg-purple-100 rounded-xl flex items-end justify-center pb-2 text-sm">
                  21%
                </div>

                <div className="w-14 h-40 bg-orange-400 rounded-xl flex items-end justify-center pb-2 text-white text-sm">
                  32%
                </div>
              </div>
            </div>

            {/* Plan Card */}
            <div className="rounded-3xl overflow-hidden bg-white shadow-sm">
              <div className="bg-cyan-400 text-white p-6 h-[220px] flex flex-col justify-between">
                <div>
                  <h2 className="text-5xl font-bold">$95.9</h2>
                  <p>Per Month</p>
                </div>

                <h3 className="text-3xl font-bold leading-snug">
                  Choose Best Plan For You!
                </h3>
              </div>

              <div className="flex justify-between items-center p-5">
                <button className="text-gray-600 font-medium">
                  Details
                </button>

                <button className="bg-black text-white px-6 py-3 rounded-full font-semibold">
                  Upgrade
                </button>
              </div>
            </div>
          </div>

          {/* Recent Payments */}
          <section className="mb-10">
            <h3 className="text-3xl font-bold mb-6">
              Recently Payments
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {payments.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#f8f8f8] rounded-2xl p-5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.img}
                      alt=""
                      className="w-14 h-14 rounded-full"
                    />

                    <div>
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-sm text-gray-400">Mar 9, 2023</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <h3 className="font-bold text-2xl">
                      {item.amount}
                    </h3>

                    <span
                      className={`px-4 py-2 rounded-full text-sm ${
                        item.status === "Done"
                          ? "bg-cyan-100 text-cyan-700"
                          : "bg-orange-100 text-orange-600"
                      }`}
                    >
                      {item.status}
                    </span>

                    <MoreHorizontal />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Transactions */}
          <section className="bg-[#fafafa] rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold">Transactions</h3>

              <div className="bg-white px-4 py-3 rounded-xl flex items-center gap-2 border border-gray-200">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-none bg-transparent"
                />
              </div>
            </div>

            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-400 border-b">
                  <th className="pb-4">Receiver</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4"></th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((item, index) => (
                  <tr key={index} className="border-b last:border-none">
                    <td className="py-5">
                      <div className="flex items-center gap-4">
                        <input type="checkbox" />

                        <img
                          src={item.img}
                          alt=""
                          className="w-12 h-12 rounded-full"
                        />

                        <span className="font-semibold">{item.name}</span>
                      </div>
                    </td>

                    <td>{item.type}</td>

                    <td>
                      <span
                        className={`px-4 py-2 rounded-full text-sm ${
                          item.status === "Done"
                            ? "bg-cyan-100 text-cyan-700"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>{item.date}</td>

                    <td className="font-bold">{item.amount}</td>

                    <td>
                      <button className="border border-gray-300 px-5 py-2 rounded-xl">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${
        active
          ? "bg-[#f2f1fb] text-black font-semibold"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}