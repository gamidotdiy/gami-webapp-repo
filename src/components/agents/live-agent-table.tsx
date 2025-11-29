"use client";

import { useEffect, useMemo, useState } from "react";
import { Radio } from "lucide-react";
import { HorizonCard } from "./horizon-card";
import { useAgentStream, type AgentEvent } from "@/hooks/use-agent-stream";

const STALE_AFTER_MS = 30_000;

type AgentKey = "quest" | "economy" | "security" | "rewards";

type AgentRow = {
  key: AgentKey;
  name: string;
  statusLabel: string;
  statusTone: "positive" | "warning" | "idle";
  lastSignal: string;
  action: string;
};

const agentMeta: Record<AgentKey, { name: string; fallbackAction: string }> = {
  quest: {
    name: "Quest Agent",
    fallbackAction: "Awaiting quest generation",
  },
  economy: {
    name: "Economy Agent",
    fallbackAction: "No simulation yet",
  },
  security: {
    name: "Security Agent",
    fallbackAction: "No wallets analyzed",
  },
  rewards: {
    name: "Rewards Agent",
    fallbackAction: "No badges issued",
  },
};

const asNumber = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
};

const asBoolean = (value: unknown) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  return undefined;
};

const formatIdentifier = (value?: string) => {
  if (!value) return undefined;
  return value.length > 14 ? `${value.slice(0, 6)}…${value.slice(-4)}` : value;
};

function formatRelativeTime(receivedAt: number, now: number) {
  const delta = Math.max(0, now - receivedAt);
  if (delta < 1_000) return "just now";
  if (delta < 60_000) return `${Math.floor(delta / 1_000)}s ago`;
  if (delta < 3_600_000) return `${Math.floor(delta / 60_000)}m ago`;
  return `${Math.floor(delta / 3_600_000)}h ago`;
}

function describeAction(key: AgentKey, payload: Record<string, unknown>): string {
  switch (key) {
    case "quest": {
      const questId = formatIdentifier(
        typeof payload["quest_id"] === "string"
          ? payload["quest_id"]
          : typeof payload["questId"] === "string"
            ? (payload["questId"] as string)
            : undefined,
      );
      const wallet = formatIdentifier(
        typeof payload["wallet_id"] === "string"
          ? payload["wallet_id"]
          : typeof payload["walletId"] === "string"
            ? (payload["walletId"] as string)
            : undefined,
      );
      const difficulty = typeof payload["difficulty"] === "string"
        ? (payload["difficulty"] as string)
        : typeof payload["difficulty_rating"] === "string"
          ? (payload["difficulty_rating"] as string)
          : undefined;
      if (!questId && !wallet && !difficulty) return agentMeta.quest.fallbackAction;
      return [
        questId ? `Quest ${questId}` : null,
        difficulty ? difficulty : null,
        wallet ? `for ${wallet}` : null,
      ]
        .filter(Boolean)
        .join(" · ");
    }
    case "economy": {
      const inflation =
        asNumber(payload["predicted_inflation"]) ?? asNumber(payload["predictedInflation"]);
      const deflation =
        asBoolean(payload["trigger_deflation"]) ?? asBoolean(payload["triggerDeflation"]);
      if (inflation === undefined && deflation === undefined) return agentMeta.economy.fallbackAction;
      const pieces: string[] = [];
      if (inflation !== undefined) pieces.push(`Inflation ${inflation.toFixed(2)}%`);
      if (deflation !== undefined) pieces.push(deflation ? "Deflation guard ON" : "Deflation guard off");
      return pieces.join(" · ");
    }
    case "security": {
      const wallet = formatIdentifier(
        typeof payload["user_id"] === "string"
          ? payload["user_id"]
          : typeof payload["userId"] === "string"
            ? (payload["userId"] as string)
            : undefined,
      );
      const isAnomaly = asBoolean(payload["is_anomaly"]) ?? asBoolean(payload["isAnomaly"]);
      const action = typeof payload["action_taken"] === "string"
        ? (payload["action_taken"] as string)
        : typeof payload["actionTaken"] === "string"
          ? (payload["actionTaken"] as string)
          : undefined;
      const score = asNumber(payload["anomaly_score"]) ?? asNumber(payload["anomalyScore"]);
      if (!wallet && action === undefined && isAnomaly === undefined && score === undefined) {
        return agentMeta.security.fallbackAction;
      }
      const status = isAnomaly === undefined ? undefined : isAnomaly ? "Anomaly" : "Clear";
      return [
        wallet ? `Wallet ${wallet}` : null,
        status,
        score !== undefined ? `score ${score.toFixed(0)}` : null,
        action,
      ]
        .filter(Boolean)
        .join(" · ");
    }
    case "rewards": {
      const wallet = formatIdentifier(
        typeof payload["wallet_id"] === "string"
          ? payload["wallet_id"]
          : typeof payload["walletId"] === "string"
            ? (payload["walletId"] as string)
            : undefined,
      );
      const badge =
        (typeof payload["badge"] === "string" && payload["badge"]) ||
        (typeof payload["tier"] === "string" && payload["tier"]);
      const theme = typeof payload["theme"] === "string" ? payload["theme"] : undefined;
      const xpAwarded = asNumber(payload["xp_awarded"]) ?? asNumber(payload["xpAwarded"]);
      if (!wallet && !badge && xpAwarded === undefined) {
        return agentMeta.rewards.fallbackAction;
      }
      return [
        badge ?? "Badge issued",
        wallet ? `to ${wallet}` : null,
        xpAwarded !== undefined ? `+${xpAwarded} XP` : null,
        theme,
      ]
        .filter(Boolean)
        .join(" · ");
    }
    default:
      return "";
  }
}

export function LiveAgentTable() {
  const { events, error, isConnected } = useAgentStream();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 5_000);
    return () => window.clearInterval(interval);
  }, []);

  const rows = useMemo<AgentRow[]>(() => {
    const latest: Partial<Record<AgentKey, AgentEvent>> = {};

    events.forEach((event) => {
      if (!latest.quest && event.event.startsWith("quest.")) {
        latest.quest = event;
      }
      if (!latest.economy && event.event.startsWith("economy.")) {
        latest.economy = event;
      }
      if (!latest.security && event.event.startsWith("security.")) {
        latest.security = event;
      }
      if (!latest.rewards && event.event.startsWith("rewards.")) {
        latest.rewards = event;
      }
    });

    return (Object.keys(agentMeta) as AgentKey[]).map((key) => {
      const event = latest[key] ?? null;
      const age = event ? now - event.receivedAt : null;
      const isFresh = typeof age === "number" && age < STALE_AFTER_MS;
      const statusLabel = isFresh ? "Online" : event ? "Signal stale" : "Idle";
      const statusTone: AgentRow["statusTone"] = isFresh ? "positive" : event ? "warning" : "idle";

      return {
        key,
        name: agentMeta[key].name,
        statusLabel,
        statusTone,
        lastSignal: event ? formatRelativeTime(event.receivedAt, now) : "—",
        action: event ? describeAction(key, event.payload) : agentMeta[key].fallbackAction,
      };
    });
  }, [events, now]);

  const statusChipClass = (tone: AgentRow["statusTone"]) => {
    if (tone === "positive") return "bg-[#EAFBF5] text-[#1BA97F]";
    if (tone === "warning") return "bg-[#FFF5E6] text-[#D97706]";
    return "bg-[#FDEEF3] text-[#D52941]";
  };

  return (
    <HorizonCard title="Live Agent Activity" subtitle="Realtime telemetry">
      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#A3AED0]">
        <span className="flex items-center gap-2 text-[#2B3674]">
          <Radio className="h-4 w-4 text-[#4318FF]" />
          {isConnected ? "Streaming from @Gami_Agents" : "Connecting to @Gami_Agents"}
        </span>
        {error && <span className="text-[#D52941]">{error}</span>}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-[0.25em] text-[#A3AED0]">
              <th className="pb-3">Agent Name</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Last Signal</th>
              <th className="pb-3">Last Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-[#EEF2FF]">
                <td className="py-4 font-semibold text-[#2B3674]">{row.name}</td>
                <td className="py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusChipClass(row.statusTone)}`}>
                    {row.statusLabel}
                  </span>
                </td>
                <td className="py-4 text-[#2B3674]">{row.lastSignal}</td>
                <td className="py-4 text-[#A3AED0]">{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </HorizonCard>
  );
}
