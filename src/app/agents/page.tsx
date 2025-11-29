import { HorizonCard } from "@/components/agents/horizon-card";
import { InflationProjectionChart } from "@/components/agents/inflation-projection-chart";
import { LiveAgentTable } from "@/components/agents/live-agent-table";
import { QuestCompletionChart } from "@/components/agents/quest-completion-chart";
import {
  Activity,
  Flag,
  Trophy,
  Zap,
} from "lucide-react";

const topStats = [
  {
    label: "Total XP Minted",
    value: "84.2M",
    delta: "+12% vs last epoch",
    icon: Trophy,
  },
  {
    label: "$GAMI Circulation",
    value: "$12.4M",
    delta: "Stable · 24h",
    icon: Zap,
  },
  {
    label: "Active Quests",
    value: "318",
    delta: "-4 paused",
    icon: Activity,
  },
  {
    label: "Network Health",
    value: "99.2%",
    delta: "Flag network green",
    icon: Flag,
  },
];

export default function SupervisorDashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {topStats.map((stat) => (
          <HorizonCard key={stat.label}>
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-[#F4F7FE] p-3 text-[#4318FF]">
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A3AED0]">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-[#2B3674]">{stat.value}</p>
                <p className="text-sm text-[#A3AED0]">{stat.delta}</p>
              </div>
            </div>
          </HorizonCard>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <HorizonCard
          title="Inflation Projection (30 Days)"
          subtitle="Economy Management Agent"
        >
          <InflationProjectionChart />
        </HorizonCard>
        <HorizonCard title="Quest Completion Rate" subtitle="Daily completions">
          <QuestCompletionChart />
        </HorizonCard>
      </section>

      <LiveAgentTable />
    </div>
  );
}
