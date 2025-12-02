import Link from "next/link";
import { HorizonCard } from "@/components/agents/horizon-card";
import { InflationProjectionChart } from "@/components/agents/inflation-projection-chart";
import { LiveAgentTable } from "@/components/agents/live-agent-table";
import { QuestCompletionChart } from "@/components/agents/quest-completion-chart";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ActivitySquare,
  BarChart3,
  Flag,
  ShieldCheck,
  Star,
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

type AgentFeatureKey = "quest" | "economy" | "security" | "rewards";

type AgentFeature = {
  key: AgentFeatureKey;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  metrics: string[];
  href: string;
  Icon: LucideIcon;
  accentClass: string;
  surface?: "muted";
  signalStat: string;
  signalDelta: string;
};

const agentFeatures: AgentFeature[] = [
  {
    key: "quest",
    title: "Quest Agent",
    badge: "Engagement",
    tagline: "Engagement Autonomy",
    description:
      "Transforms partner briefs and Web2 telemetry into sharded quest trees with gating, XP curves, and treasury-aware payouts.",
    metrics: ["54 live briefs", "Latency 180ms", "Integrity 98%"],
    href: "/agents/quest",
    Icon: ActivitySquare,
    accentClass: "bg-gradient-to-br from-lime-200/80 via-emerald-200/60 to-emerald-100/60 text-emerald-900",
    signalStat: "54 live quests",
    signalDelta: "+6 vs last hour",
  },
  {
    key: "economy",
    title: "Economy Agent",
    badge: "Economy",
    tagline: "Treasury Equilibrium",
    description:
      "Runs constant-time supply simulations before approving new emissions so $GAMI inflation, sinks, and subsidies stay predictable.",
    metrics: ["Inflation holding at 1.9%", "Deflation guard armed", "Runway 182 days"],
    href: "/agents/economy",
    Icon: BarChart3,
    accentClass: "bg-gradient-to-br from-amber-200/80 via-orange-200/60 to-yellow-100/60 text-amber-900",
    surface: "muted",
    signalStat: "1.9% inflation",
    signalDelta: "Stable · 24h",
  },
  {
    key: "security",
    title: "Security Agent",
    badge: "Security",
    tagline: "Trust Fabric",
    description:
      "Scores wallets, location intel, and anomaly signals before agents can issue value so fraud ops share the same ledger as growth.",
    metrics: ["12 wallets flagged", "3 escalations resolved", "0 breaches in 180d"],
    href: "/agents/security",
    Icon: ShieldCheck,
    accentClass: "bg-gradient-to-br from-sky-200/80 via-cyan-200/60 to-blue-100/60 text-sky-900",
    surface: "muted",
    signalStat: "12 flags",
    signalDelta: "3 escalated cases",
  },
  {
    key: "rewards",
    title: "Rewards Agent",
    badge: "Rewards",
    tagline: "Value Orchestration",
    description:
      "Prices badges, XP, and partner goods after a four-agent debate that balances retention, budget, and integrity in milliseconds.",
    metrics: ["4.8k XP / min", "Budget 82% utilized", "12 partner catalogs"],
    href: "/agents/rewards",
    Icon: Star,
    accentClass: "bg-gradient-to-br from-purple-200/80 via-fuchsia-200/60 to-pink-100/60 text-fuchsia-900",
    signalStat: "+4.8k XP/min",
    signalDelta: "Budget 82% utilized",
  },
];

export default function SupervisorDashboardPage() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="neo-panel neo-pressable relative overflow-hidden rounded-[2.5rem] border-[var(--neo-border-width)] px-8 py-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(186,186,255,0.35),_transparent_60%)]"
          />
          <div className="relative space-y-4">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.5em] text-muted-foreground">Neobrutalist Control Deck</p>
            <h2 className="text-4xl font-black leading-tight text-foreground">
              All four agents, one tactile slab of telemetry.
            </h2>
            <p className="text-sm text-foreground/75">
              Bold borders, honest geometry, and neon gradients keep the system legible when finance, trust, and loyalty teams
              collaborate live.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {agentFeatures.map((feature) => (
                <div
                  key={feature.key}
                  className="neo-border rounded-2xl bg-background/85 px-4 py-3 shadow-[8px_8px_0_0_rgba(0,0,0,0.12)]"
                >
                  <p className="text-[0.58rem] font-black uppercase tracking-[0.45em] text-muted-foreground">{feature.badge}</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{feature.title}</p>
                  <p className="text-xs text-foreground/60">{feature.signalStat}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="neo-panel neo-pressable relative overflow-hidden rounded-[2.5rem] border-[var(--neo-border-width)] p-8"
          data-surface="muted"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(147,197,253,0.25),_transparent_65%)]"
          />
          <div className="relative">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.45em] text-muted-foreground">Signal Stack</p>
            <h3 className="mt-3 text-2xl font-black text-foreground">Human overrides stay explainable.</h3>
            <p className="mt-2 text-sm text-foreground/70">
              Every command is notarized so on-call operators can intervene without breaking determinism.
            </p>
            <div className="mt-6 space-y-4">
              {agentFeatures.map((feature) => (
                <div
                  key={`${feature.key}-signal`}
                  className="neo-border flex items-center justify-between rounded-2xl bg-background/90 px-4 py-3"
                >
                  <div>
                    <p className="text-[0.58rem] font-black uppercase tracking-[0.4em] text-muted-foreground">{feature.tagline}</p>
                    <p className="text-sm font-semibold text-foreground">{feature.signalStat}</p>
                  </div>
                  <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-foreground/70">
                    {feature.signalDelta}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        {agentFeatures.map((feature) => (
          <div
            key={feature.key}
            className="neo-panel neo-pressable flex h-full flex-col gap-5 rounded-[2rem] border-[var(--neo-border-width)] p-6"
            data-surface={feature.surface}
          >
            <div className="flex items-center justify-between gap-4">
              <div
                className={`neo-border flex h-14 w-14 items-center justify-center rounded-2xl ${feature.accentClass}`}
              >
                <feature.Icon className="h-6 w-6" />
              </div>
              <span className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-muted-foreground">{feature.badge}</span>
            </div>
            <div>
              <p className="text-[0.58rem] font-black uppercase tracking-[0.4em] text-muted-foreground">{feature.tagline}</p>
              <h3 className="mt-2 text-2xl font-black text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm text-foreground/75">{feature.description}</p>
            </div>
            <ul className="space-y-2 text-sm text-foreground/80">
              {feature.metrics.map((metric) => (
                <li key={metric} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
                  <span>{metric}</span>
                </li>
              ))}
            </ul>
            <Link
              href={feature.href}
              className="neo-border inline-flex items-center justify-between rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.4em] text-foreground hover:bg-foreground hover:text-background"
            >
              Open {feature.title}
              <span aria-hidden>↗</span>
            </Link>
          </div>
        ))}
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {topStats.map((stat) => (
          <HorizonCard key={stat.label}>
            <div className="flex items-center gap-4">
              <div className="neo-border flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/30 text-foreground">
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[0.65rem] font-black uppercase tracking-[0.35em] text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-black text-foreground">{stat.value}</p>
                <p className="text-sm text-foreground/70">{stat.delta}</p>
              </div>
            </div>
          </HorizonCard>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <HorizonCard title="Inflation Projection (30 Days)" subtitle="Economy Management Agent">
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
