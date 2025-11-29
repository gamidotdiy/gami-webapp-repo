"use client";

import { useEffect, useRef, useState } from "react";

export type AgentEvent = {
  event: string;
  origin?: string;
  payload: Record<string, unknown>;
  receivedAt: number;
};

type Options = {
  url?: string;
  enabled?: boolean;
};

const MAX_EVENTS = 200;

export function useAgentStream({ url, enabled = true }: Options = {}) {
  const [events, setEvents] = useState<AgentEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);

  const streamUrl = url ?? process.env.NEXT_PUBLIC_AGENT_STREAM_URL ?? "http://localhost:9000/api/stream";

  useEffect(() => {
    if (!enabled) return undefined;
    if (typeof window === "undefined") return undefined;
    if (eventSourceRef.current) return undefined;

    const source = new EventSource(streamUrl);
    eventSourceRef.current = source;

    source.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    source.onmessage = (message) => {
      try {
        const parsed = JSON.parse(message.data) as {
          event: string;
          origin?: string;
          payload?: Record<string, unknown>;
        };

        setEvents((prev) => {
          const nextEvent: AgentEvent = {
            event: parsed.event,
            origin: parsed.origin,
            payload: parsed.payload ?? {},
            receivedAt: Date.now(),
          };
          return [nextEvent, ...prev].slice(0, MAX_EVENTS);
        });
      } catch (err) {
        console.error("Malformed SSE payload", err);
      }
    };

    source.onerror = (err) => {
      console.error("SSE connection error", err);
      setIsConnected(false);
      setError("Live telemetry disconnected");
    };

    return () => {
      source.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    };
  }, [enabled, streamUrl]);

  return {
    events,
    error,
    isConnected,
  };
}
