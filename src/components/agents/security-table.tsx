"use client";

import { type ComponentType, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { HorizonCard } from "./horizon-card";

const fraudRows = [
  {
    walletId: "0x8c90...a21",
    riskScore: 92,
    anomaly: "Sybil",
    status: "Banned" as const,
    reputation: 24,
    latency: "412 ms",
    xpVelocity: [90, 130, 220, 310, 480, 710, 220],
    lastAction: "Drained quest rewards",
  },
  {
    walletId: "0x52bd...9ee",
    riskScore: 74,
    anomaly: "Bot",
    status: "Review" as const,
    reputation: 61,
    latency: "180 ms",
    xpVelocity: [35, 40, 55, 150, 210, 190, 205],
    lastAction: "Velocity spike",
  },
  {
    walletId: "0x4aa1...102",
    riskScore: 18,
    anomaly: "Sybil",
    status: "Safe" as const,
    reputation: 88,
    latency: "95 ms",
    xpVelocity: [14, 12, 18, 17, 19, 18, 16],
    lastAction: "Quest cleared",
  },
  {
    walletId: "0xb912...7aa",
    riskScore: 66,
    anomaly: "Bot",
    status: "Review" as const,
    reputation: 54,
    latency: "233 ms",
    xpVelocity: [30, 45, 55, 63, 180, 70, 68],
    lastAction: "Macro inputs",
  },
];

type Status = "Safe" | "Review" | "Banned";

const statusMeta: Record<Status, { label: string; color: string; icon: ComponentType<{ className?: string }> }> = {
  Safe: { label: "Safe", color: "text-[#1BA97F]", icon: CheckCircle2 },
  Review: { label: "Review", color: "text-[#F2C94C]", icon: AlertTriangle },
  Banned: { label: "Banned", color: "text-[#D52941]", icon: XCircle },
};

export function SecurityTable() {
  const [selectedRow, setSelectedRow] = useState<typeof fraudRows[number] | null>(null);

  const detailVelocity = useMemo(() => selectedRow?.xpVelocity ?? [], [selectedRow]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A3AED0]">
            Security Sentinel
          </p>
          <h2 className="text-2xl font-semibold text-[#2B3674]">Fraud Alert Table</h2>
        </div>
        <div className="flex items-center gap-3 text-sm text-[#A3AED0]">
          <ShieldAlert className="h-4 w-4" />
          Isolation Forest feed · Live
        </div>
      </header>

      <HorizonCard>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="text-xs uppercase tracking-[0.25em] text-[#A3AED0]">
                <th className="pb-4">Wallet</th>
                <th className="pb-4">Risk Score</th>
                <th className="pb-4">Anomaly</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Latency</th>
                <th className="pb-4">Last Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {fraudRows.map((row) => {
                const meta = statusMeta[row.status];
                const Icon = meta.icon;
                return (
                  <tr
                    key={row.walletId}
                    onClick={() => setSelectedRow(row)}
                    className="cursor-pointer border-t border-[#EEF2FF] transition hover:bg-[#F9FBFF]"
                  >
                    <td className="py-4 font-semibold">{row.walletId}</td>
                    <td className="py-4">
                      <span className="rounded-full bg-[#F6F5FF] px-3 py-1 text-[#4318FF] font-semibold">
                        {row.riskScore}
                      </span>
                    </td>
                    <td className="py-4 text-[#2B3674]">{row.anomaly}</td>
                    <td className="py-4">
                      <div className={`flex items-center gap-2 font-semibold ${meta.color}`}>
                        <Icon className="h-4 w-4" />
                        {meta.label}
                      </div>
                    </td>
                    <td className="py-4 text-[#2B3674]">{row.latency}</td>
                    <td className="py-4 text-[#A3AED0]">{row.lastAction}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </HorizonCard>

      {selectedRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-2xl rounded-[30px] bg-white p-8 shadow-[0px_45px_90px_rgba(15,23,42,0.45)]">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A3AED0]">Wallet Detail</p>
                <h3 className="text-2xl font-semibold text-[#2B3674]">{selectedRow.walletId}</h3>
              </div>
              <button
                aria-label="Close detail"
                className="rounded-full border border-[#E4E9FB] p-2"
                onClick={() => setSelectedRow(null)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-[20px] bg-[#F4F7FE] p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A3AED0]">Risk Score</p>
                <p className="mt-2 text-4xl font-semibold text-[#D52941]">{selectedRow.riskScore}</p>
              </div>
              <div className="rounded-[20px] bg-[#F4F7FE] p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A3AED0]">Reputation</p>
                <p className="mt-2 text-4xl font-semibold text-[#4318FF]">{selectedRow.reputation}</p>
              </div>
              <div className="rounded-[20px] bg-[#F4F7FE] p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A3AED0]">Status</p>
                <div className="mt-2 flex items-center justify-center gap-2 text-lg font-semibold text-[#2B3674]">
                  {statusMeta[selectedRow.status].label}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#A3AED0]">
                XP Velocity (last 7 actions)
              </p>
              <div className="mt-3 h-56 rounded-[20px] bg-[#F4F7FE] p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={detailVelocity.map((value, index) => ({ label: `Action ${index + 1}`, value }))}
                  >
                    <defs>
                      <linearGradient id="velocity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4318FF" stopOpacity={0.7} />
                        <stop offset="95%" stopColor="#4318FF" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#A3AED0" }} />
                    <Tooltip
                      contentStyle={{ borderRadius: 16, border: "none", boxShadow: "0px 35px 60px rgba(15,23,42,0.25)" }}
                      formatter={(value: number) => [`${value} XP`, "Velocity"]}
                    />
                    <Area type="monotone" dataKey="value" stroke="#4318FF" fill="url(#velocity)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2 text-[#A3AED0]">
                <UserRound className="h-4 w-4" />
                Last action · {selectedRow.lastAction}
              </div>
              <button className="rounded-full bg-[#4318FF] px-6 py-2 font-semibold text-white shadow-[0px_20px_45px_rgba(67,24,255,0.35)]">
                Escalate to Guardian
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
