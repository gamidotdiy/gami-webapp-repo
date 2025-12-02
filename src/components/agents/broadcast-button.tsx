"use client";

import { useState } from "react";
import { Loader2, SendHorizonal, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      <Button
        type="button"
        size="sm"
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:from-purple-600 hover:to-cyan-500"
      >
        Broadcast Update
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
          <div className="neo-panel neo-pressable w-full max-w-md space-y-5 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-muted-foreground">
                  Global Notice
                </p>
                <h3 className="mt-2 text-xl font-black text-foreground">Send to all agents</h3>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <label className="block text-sm font-semibold text-foreground">
              Message
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={4}
                className="neo-border mt-2 w-full resize-none rounded-[calc(var(--radius)+0.4rem)] bg-background/80 px-4 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground/30 focus:outline-none"
                placeholder="Share timeline changes, reward boosts, or emergency pauses"
              />
            </label>
            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSend}
                disabled={sending}
                className="bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:from-purple-600 hover:to-cyan-500"
              >
                {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <SendHorizonal className="mr-2 h-4 w-4" />}
                {sending ? "Dispatching" : "Dispatch"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="absolute -bottom-16 right-0 w-[280px] text-xs font-semibold text-foreground">
          <div className="neo-panel p-4 text-left">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
