"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Globe, Link2, Store } from "lucide-react";
import { HorizonCard } from "./horizon-card";

const platforms = ["Shopify", "Magento", "BigCommerce", "Custom"] as const;
const pluginModes = [
  { id: "rewards", label: "Rewards Widget" },
  { id: "wallet", label: "Universal Wallet" },
  { id: "telemetry", label: "Telemetry + SSE" },
] as const;

type Platform = (typeof platforms)[number];

type IntegrationState = {
  brand: string;
  platform: Platform;
  domain: string;
  rewardsEndpoint: string;
  sseUrl: string;
  plugin: (typeof pluginModes)[number]["id"];
};

const initialState: IntegrationState = {
  brand: "Acme Collective",
  platform: "Shopify",
  domain: "shop.acme.io",
  rewardsEndpoint: "https://api.acme.io/rewards",
  sseUrl: process.env.NEXT_PUBLIC_AGENT_STREAM_URL ?? "http://localhost:9000/api/stream",
  plugin: "rewards",
};

export function SiteIntegrationPanel() {
  const [state, setState] = useState(initialState);
  const [copied, setCopied] = useState(false);

  const embedCode = useMemo(() => {
    const payload = {
      brand: state.brand,
      platform: state.platform,
      domain: state.domain,
      plugin: state.plugin,
      rewards_api: state.rewardsEndpoint,
      sse: state.sseUrl,
    };
    return `<script
  src="https://cdn.gami.xyz/plugin.js"
  data-gami-config='${JSON.stringify(payload)}'
  async
></script>`;
  }, [state]);

  const handleChange = (key: keyof IntegrationState, value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const copySnippet = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <HorizonCard title="Brand & Platform" subtitle="Connect storefronts to @Gami agents">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-[#2B3674]">
            Brand name
            <input
              type="text"
              value={state.brand}
              onChange={(event) => handleChange("brand", event.target.value)}
              className="mt-2 w-full rounded-full border border-transparent bg-[#F4F7FE] px-4 py-2 focus:border-[#4318FF] focus:outline-none"
            />
          </label>
          <label className="text-sm font-semibold text-[#2B3674]">
            Primary domain
            <div className="mt-2 flex items-center gap-2 rounded-full border border-transparent bg-[#F4F7FE] px-4">
              <Globe className="h-4 w-4 text-[#A3AED0]" />
              <input
                type="text"
                value={state.domain}
                onChange={(event) => handleChange("domain", event.target.value)}
                className="w-full bg-transparent py-2 text-sm focus:outline-none"
                placeholder="store.brand.com"
              />
            </div>
          </label>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-[#2B3674]">
            Platform
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              {platforms.map((platform) => (
                <button
                  type="button"
                  key={platform}
                  onClick={() => handleChange("platform", platform)}
                  className={`flex items-center justify-between rounded-2xl border px-3 py-2 ${
                    state.platform === platform ? "border-[#4318FF] bg-white" : "border-[#E4E9FB] bg-[#F4F7FE]"
                  }`}
                >
                  <span>{platform}</span>
                  {state.platform === platform && <Check className="h-4 w-4 text-[#4318FF]" />}
                </button>
              ))}
            </div>
          </label>
          <label className="text-sm font-semibold text-[#2B3674]">
            Rewards / webhook endpoint
            <div className="mt-2 flex items-center gap-2 rounded-full border border-transparent bg-[#F4F7FE] px-4">
              <Link2 className="h-4 w-4 text-[#A3AED0]" />
              <input
                type="url"
                value={state.rewardsEndpoint}
                onChange={(event) => handleChange("rewardsEndpoint", event.target.value)}
                className="w-full bg-transparent py-2 text-sm focus:outline-none"
                placeholder="https://api.brand.com/rewards"
              />
            </div>
          </label>
        </div>
      </HorizonCard>

      <HorizonCard title="Plugin Mode" subtitle="Choose what embeds into the site">
        <div className="grid gap-3 md:grid-cols-3">
          {pluginModes.map((mode) => (
            <button
              type="button"
              key={mode.id}
              onClick={() => handleChange("plugin", mode.id)}
              className={`rounded-2xl border px-4 py-4 text-left text-sm ${
                state.plugin === mode.id ? "border-[#4318FF] bg-white shadow-[0_12px_32px_rgba(67,24,255,0.12)]" : "border-[#E4E9FB] bg-[#F4F7FE]"
              }`}
            >
              <p className="text-base font-semibold text-[#2B3674]">{mode.label}</p>
              <p className="text-xs text-[#A3AED0]">
                {mode.id === "rewards" && "Badge tiers + XP events"}
                {mode.id === "wallet" && "Universal wallet connect + quests"}
                {mode.id === "telemetry" && "Raw SSE stream for custom UI"}
              </p>
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-[#2B3674]">
            SSE URL
            <input
              type="url"
              value={state.sseUrl}
              onChange={(event) => handleChange("sseUrl", event.target.value)}
              className="mt-2 w-full rounded-full border border-transparent bg-[#F4F7FE] px-4 py-2 text-sm focus:border-[#4318FF] focus:outline-none"
            />
          </label>
          <div className="rounded-2xl bg-[#F9FBFF] p-4 text-sm text-[#2B3674]">
            <p className="font-semibold">Webhook tip</p>
            <p className="text-xs text-[#A3AED0]">
              POST `wallet_id`, `action_type`, and `xp_delta` to the rewards endpoint; the MCP backend fan-outs the event to quests, economy, security, and rewards agents.
            </p>
          </div>
        </div>
      </HorizonCard>

      <HorizonCard title="Embed snippet" subtitle="Drop into any site">
        <div className="space-y-3">
          <p className="text-sm text-[#2B3674]">
            Paste this into your platform theme (e.g., Shopify theme.liquid or Magento footer). The payload links the storefront to the MCP stack plus Universal Wallet.
          </p>
          <pre className="rounded-2xl bg-[#0F172A] p-4 text-xs text-white overflow-x-auto">
            <code>{embedCode}</code>
          </pre>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={copySnippet}
              className="inline-flex items-center gap-2 rounded-full bg-[#4318FF] px-5 py-2 text-sm font-semibold text-white"
            >
              <Copy className="h-4 w-4" /> {copied ? "Copied" : "Copy snippet"}
            </button>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs text-[#2B3674]">
              <Store className="h-4 w-4 text-[#4318FF]" /> {state.platform} · {state.domain}
            </span>
          </div>
        </div>
      </HorizonCard>
    </div>
  );
}
