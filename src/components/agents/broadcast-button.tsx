"use client";

import { useState } from "react";
import { Loader2, SendHorizonal, X } from "lucide-react";

export function BroadcastButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("All agents nominal. Keep missions live.");
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSending(false);
    setToast("Broadcast queued to Quest/Economy/Security/Rewards agents");
    setOpen(false);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#2B3674] shadow-[0px_10px_30px_rgba(160,174,211,0.4)]"
      >
        Broadcast Update
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-[0px_35px_80px_rgba(15,23,42,0.35)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A3AED0]">Global Notice</p>
                <h3 className="text-lg font-semibold text-[#2B3674]">Send to all agents</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-[#E4E9FB] p-2 text-[#4318FF]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <label className="block text-sm font-medium text-[#2B3674]">
              Message
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={4}
                className="mt-2 w-full resize-none rounded-2xl border border-transparent bg-[#F4F7FE] px-4 py-3 text-sm text-[#2B3674] focus:border-[#4318FF] focus:outline-none"
                placeholder="Share timeline changes, reward boosts, or emergency pauses"
              />
            </label>
            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[#A3AED0]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-full bg-[#4318FF] px-5 py-2 text-sm font-semibold text-white shadow-[0px_20px_45px_rgba(67,24,255,0.35)] disabled:opacity-60"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizonal className="h-4 w-4" />}
                {sending ? "Dispatching" : "Dispatch"}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="absolute -bottom-14 right-0 w-[280px] rounded-2xl bg-white px-4 py-3 text-xs font-semibold text-[#2B3674] shadow-[0px_15px_30px_rgba(67,24,255,0.25)]">
          {toast}
        </div>
      )}
    </div>
  );
}
