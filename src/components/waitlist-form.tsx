"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

const initialForm = {
  email: "",
  business: "",
  wallet: "",
};

type WaitlistStatus = "idle" | "loading" | "success" | "error";

export function WaitlistForm() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState<WaitlistStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (field: keyof typeof formData) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.email.trim() || !formData.business.trim()) {
      setStatus("error");
      setMessage("Email and business name are both required.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          business: formData.business.trim(),
          wallet: formData.wallet.trim(),
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.message ?? "Unable to join the waitlist right now.");
      }

      setStatus("success");
      setMessage(payload.message ?? "You're on the list. We'll reach out with credentials soon.");
      setFormData(initialForm);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Try again in a moment.");
    }
  };

  const isLoading = status === "loading";

  return (
    <div className="neo-panel neo-pressable space-y-5 p-6" data-surface="muted">
      <div>
        <p className="text-[0.62rem] font-black uppercase tracking-[0.45em] text-muted-foreground">Priority Waitlist</p>
        <h3 className="mt-2 text-2xl font-black text-foreground">Secure Wallet & Stripe enablement</h3>
        <p className="mt-2 text-sm text-foreground/70">
          Drop your email, business, and wallet so we can queue you for the Operator beta cohort.
        </p>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className="text-sm font-semibold text-foreground">
          Work Email
          <input
            type="email"
            required
            autoComplete="email"
            value={formData.email}
            onChange={handleChange("email")}
            placeholder="ops@gami.xyz"
            className="neo-border mt-2 w-full rounded-[calc(var(--radius)+0.4rem)] bg-background px-4 py-3 text-base font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30"
          />
        </label>
        <label className="text-sm font-semibold text-foreground">
          Business / DAO
          <input
            type="text"
            required
            value={formData.business}
            onChange={handleChange("business")}
            placeholder="Gami Alliance"
            className="neo-border mt-2 w-full rounded-[calc(var(--radius)+0.4rem)] bg-background px-4 py-3 text-base font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30"
          />
        </label>
        <label className="text-sm font-semibold text-foreground">
          Wallet (optional)
          <input
            type="text"
            value={formData.wallet}
            onChange={handleChange("wallet")}
            placeholder="0xA1…9F"
            className="neo-border mt-2 w-full rounded-[calc(var(--radius)+0.4rem)] bg-background px-4 py-3 text-base font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30"
          />
        </label>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:from-purple-600 hover:to-cyan-500"
        >
          {isLoading ? "Submitting..." : "Join the Waitlist"}
        </Button>
      </form>

      {message && (
        <p
          className={`text-sm font-medium ${status === "success" ? "text-emerald-600" : "text-destructive"}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </p>
      )}
    </div>
  );
}
