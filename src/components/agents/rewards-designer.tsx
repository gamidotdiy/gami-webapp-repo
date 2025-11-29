"use client";

import { useMemo, useState } from "react";
import { Copy, Palette, Sparkles, Upload } from "lucide-react";
import { HorizonCard } from "./horizon-card";
import { useAgentStream } from "@/hooks/use-agent-stream";

const defaultTiers = [
  {
    id: "nebula",
    label: "Nebula",
    threshold: 1500,
    gradient: "from-[#7F5DFF] to-[#4318FF]",
    icon: "✨",
  },
  {
    id: "supernova",
    label: "Supernova",
    threshold: 5000,
    gradient: "from-[#FF7EB3] to-[#FF3D81]",
    icon: "🚀",
  },
  {
    id: "galaxy",
    label: "Galaxy",
    threshold: 12500,
    gradient: "from-[#6AD2FF] to-[#28A7FF]",
    icon: "🌌",
  },
];

export function RewardsDesigner() {
  const [tiers, setTiers] = useState(defaultTiers);
  const [selectedTier, setSelectedTier] = useState(defaultTiers[0]);
  const [xpPerUsd, setXpPerUsd] = useState(12);
  const [accent, setAccent] = useState("#4318FF");
  const { events } = useAgentStream();

  const recentBadges = useMemo(
    () =>
      events
        .filter((event) => event.event.startsWith("rewards."))
        .slice(0, 4)
        .map((event) => ({
          wallet: (event.payload.wallet_id as string) ?? "0x…",
          badge: (event.payload.badge as string) ?? "Nebula",
          xp: event.payload.xp_awarded as number | undefined,
          at: new Date(event.receivedAt).toLocaleTimeString(),
        })),
    [events],
  );

  const embedCode = useMemo(() => {
    const payload = {
      xp_per_usd: xpPerUsd,
      accent,
      tiers: tiers.map(({ label, threshold, gradient, icon }) => ({ label, threshold, gradient, icon })),
    };
    return `<script
  src="https://cdn.gami.xyz/rewards-plugin.js"
  data-gami-rewards='${JSON.stringify(payload)}'
  data-sse="${process.env.NEXT_PUBLIC_AGENT_STREAM_URL ?? "http://localhost:9000/api/stream"}"
></script>`;
  }, [accent, tiers, xpPerUsd]);

  const handleTierChange = (field: keyof typeof selectedTier, value: string) => {
    setTiers((prev) =>
      prev.map((tier) =>
        tier.id === selectedTier.id
          ? {
              ...tier,
              [field]: field === "threshold" ? Number(value) || 0 : value,
            }
          : tier,
      ),
    );
    setSelectedTier((prevTier) => ({
      ...prevTier,
      [field]: field === "threshold" ? Number(value) || 0 : value,
    }));
  };

  const copyEmbed = async () => {
    await navigator.clipboard.writeText(embedCode);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <HorizonCard title="Badge System" subtitle="Rewards Agent Designer">
          <div className="grid gap-4 md:grid-cols-3">
            {tiers.map((tier) => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTier(tier)}
                className={`rounded-2xl border px-4 py-5 text-left ${
                  selectedTier.id === tier.id
                    ? "border-[#4318FF] shadow-[0_15px_35px_rgba(67,24,255,0.25)]"
                    : "border-[#EEF2FF]"
                }`}
              >
                <div className={`rounded-2xl bg-gradient-to-br ${tier.gradient} p-4 text-3xl`}>{tier.icon}</div>
                <p className="mt-3 text-base font-semibold text-[#2B3674]">{tier.label}</p>
                <p className="text-sm text-[#A3AED0]">≥ {tier.threshold} XP</p>
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <label className="text-sm font-semibold text-[#2B3674]">
              Badge Label
              <input
                type="text"
                value={selectedTier.label}
                onChange={(event) => handleTierChange("label", event.target.value)}
                className="mt-2 w-full rounded-full border border-transparent bg-[#F4F7FE] px-4 py-2 focus:border-[#4318FF] focus:outline-none"
              />
            </label>
            <label className="text-sm font-semibold text-[#2B3674]">
              XP Threshold
              <input
                type="number"
                min={0}
                value={selectedTier.threshold}
                onChange={(event) => handleTierChange("threshold", event.target.value)}
                className="mt-2 w-full rounded-full border border-transparent bg-[#F4F7FE] px-4 py-2 focus:border-[#4318FF] focus:outline-none"
              />
            </label>
            <label className="text-sm font-semibold text-[#2B3674]">
              Icon
              <input
                type="text"
                value={selectedTier.icon}
                onChange={(event) => handleTierChange("icon", event.target.value)}
                className="mt-2 w-full rounded-full border border-transparent bg-[#F4F7FE] px-4 py-2 focus:border-[#4318FF] focus:outline-none"
              />
            </label>
          </div>
          <div className="mt-4">
            <label className="text-sm font-semibold text-[#2B3674]">
              Tailwind Gradient Class
              <input
                type="text"
                value={selectedTier.gradient}
                onChange={(event) => handleTierChange("gradient", event.target.value)}
                className="mt-2 w-full rounded-full border border-transparent bg-[#F4F7FE] px-4 py-2 font-mono text-xs focus:border-[#4318FF] focus:outline-none"
                placeholder="from-[#6AD2FF] to-[#28A7FF]"
              />
            </label>
          </div>
        </HorizonCard>

        <HorizonCard title="Storefront Embed" subtitle="Drop-in plugin">
          <div className="space-y-3">
            <p className="text-sm text-[#2B3674]">
              Inject this snippet into any Shopify, Magento, or custom storefront to stream badges & XP from the Rewards Agent.
            </p>
            <pre className="rounded-2xl bg-[#0F172A] p-4 text-xs text-white overflow-x-auto">
              <code>{embedCode}</code>
            </pre>
            <button
              type="button"
              onClick={copyEmbed}
              className="flex items-center justify-center gap-2 rounded-full bg-[#4318FF] px-5 py-2 text-sm font-semibold text-white"
            >
              <Copy className="h-4 w-4" /> Copy snippet
            </button>
          </div>
        </HorizonCard>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <HorizonCard title="Brand Controls" subtitle="XP curve & palette">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-[#2B3674]">
              XP per $1 (net)
              <input
                type="number"
                min={1}
                value={xpPerUsd}
                onChange={(event) => setXpPerUsd(Number(event.target.value) || 1)}
                className="mt-2 w-full rounded-full border border-transparent bg-[#F4F7FE] px-4 py-2 focus:border-[#4318FF] focus:outline-none"
              />
            </label>
            <label className="text-sm font-semibold text-[#2B3674]">
              Accent color
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="color"
                  value={accent}
                  onChange={(event) => setAccent(event.target.value)}
                  className="size-11 cursor-pointer rounded-full border border-[#EEF2FF] bg-white"
                />
                <span className="font-mono text-sm text-[#2B3674]">{accent}</span>
              </div>
            </label>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 text-xs text-[#A3AED0]">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F4F7FE] px-4 py-2"><Palette className="h-3.5 w-3.5" /> Customizable gradients</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F4F7FE] px-4 py-2"><Sparkles className="h-3.5 w-3.5" /> Badge SVG/emoji support</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F4F7FE] px-4 py-2"><Upload className="h-3.5 w-3.5" /> JSON export</span>
          </div>
        </HorizonCard>

        <HorizonCard title="Live Badge Issuance" subtitle="Rewards Agent feed">
          <div className="space-y-3 text-sm text-[#2B3674]">
            {recentBadges.length === 0 && <p className="text-[#A3AED0]">Waiting for rewards.badge events…</p>}
            {recentBadges.map((badge, index) => (
              <div key={`${badge.wallet}-${index}`} className="rounded-2xl border border-[#EEF2FF] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A3AED0]">{badge.at}</p>
                <p className="mt-1 text-base font-semibold text-[#2B3674]">{badge.badge}</p>
                <p className="text-sm text-[#A3AED0]">{badge.wallet} · +{badge.xp ?? "?"} XP</p>
              </div>
            ))}
          </div>
        </HorizonCard>
      </div>
    </div>
  );
}
