import { HorizonCard } from "@/components/agents/horizon-card";
import { InflationProjectionChart } from "@/components/agents/inflation-projection-chart";

const levers = [
  { label: "Treasury Utilization", value: "68%", detail: "Auto-compounding" },
  { label: "Liquidity Depth", value: "$4.2M", detail: "Across 3 chains" },
  { label: "Stability Window", value: "36h", detail: "Until next rebalance" },
];

export default function EconomyAgentPage() {
  return (
    <div className="space-y-6">
      <HorizonCard
        title="Economy Controls"
        subtitle="Automations injected by Treasury Agent"
        className="bg-gradient-to-br from-white to-[#F4F7FE]"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {levers.map((lever) => (
            <div key={lever.label} className="rounded-[18px] bg-white p-4 shadow-[0px_20px_40px_rgba(160,174,211,0.25)]">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A3AED0]">
                {lever.label}
              </p>
              <p className="mt-3 text-3xl font-semibold text-[#2B3674]">{lever.value}</p>
              <p className="text-sm text-[#A3AED0]">{lever.detail}</p>
            </div>
          ))}
        </div>
      </HorizonCard>

      <HorizonCard
        title="Inflation Projection (30 Days)"
        subtitle="Model overlay"
      >
        <InflationProjectionChart />
      </HorizonCard>
    </div>
  );
}
