"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";

const readinessMetrics = [
  { label: "Agents Ready", value: "04" },
  { label: "Quest Blueprints", value: "32" },
  { label: "Wallets Simulated", value: "1.2K" },
];

const proofPoints = [
  "Risk, Budget, and Integrity agents debate every change in under 2s.",
  "Universal wallet keeps XP, tokens, and fiat rewards perfectly in sync.",
  "Stripe-ready metering ensures finance can reconcile usage instantly.",
];

export default function SignupPage() {
  const {
    signUpWithEmail,
    signInWithGoogle,
    signInWithGithub,
    createTestAccount,
    user,
    loading,
  } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "testing">("idle");
  const [error, setError] = useState<string | null>(null);
  const [testAccount, setTestAccount] = useState<{ email: string; password: string } | null>(null);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/agents");
    }
  }, [loading, router, user]);

  const handleEmailSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setStatus("submitting");
    try {
      await signUpWithEmail(email, password);
      router.push("/agents");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign up");
    } finally {
      setStatus("idle");
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    setError(null);
    setStatus("submitting");
    try {
      if (provider === "google") {
        await signInWithGoogle();
      } else {
        await signInWithGithub();
      }
      router.push("/agents");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to authenticate");
    } finally {
      setStatus("idle");
    }
  };

  const handleTestSignup = async () => {
    setError(null);
    setStatus("testing");
    try {
      const creds = await createTestAccount();
      setTestAccount(creds);
      router.push("/agents");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create test account");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="neo-panel neo-pressable space-y-6 p-8 lg:p-10" data-surface="muted">
          <p className="neo-chip" data-tone="ink">
            Provision Access
          </p>
          <div>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">Spin up your Operator Identity</h1>
            <p className="mt-4 text-base text-foreground/85">
              Create supervisor credentials before assigning quests to Economy, Rewards, and Security agents across the engagement layer.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {readinessMetrics.map((metric) => (
              <div key={metric.label} className="neo-panel neo-pressable px-4 py-5 text-center">
                <p className="text-3xl font-black">{metric.value}</p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-[1.5rem] border-[var(--neo-border-width)] border-dashed border-foreground/35 p-6 text-sm text-foreground/80">
            <p className="font-semibold uppercase tracking-[0.4em] text-muted-foreground">Agent Guarantees</p>
            <ul className="mt-4 space-y-3">
              {proofPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-[0.35rem] size-2 rounded-full bg-foreground" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="neo-panel neo-pressable p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.45em] text-muted-foreground">
              Sign Up
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground">Provision Supervisor Credentials</h2>
            <p className="mt-2 text-sm text-foreground/70">
              Already verified?{" "}
              <Link href="/login" className="font-semibold text-foreground">
                Sign in instead
              </Link>
            </p>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-2">
            <Button type="button" variant="outline" onClick={() => handleOAuth("google")} disabled={status !== "idle"}>
              Continue with Google
            </Button>
            <Button type="button" variant="outline" onClick={() => handleOAuth("github")} disabled={status !== "idle"}>
              Continue with GitHub
            </Button>
          </div>

          <form className="space-y-5" onSubmit={handleEmailSignup}>
            <label className="block text-sm font-semibold text-foreground">
              Work Email
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="agent@gami.xyz"
                className="neo-border mt-2 w-full rounded-[calc(var(--radius)+0.4rem)] bg-background px-5 py-3 text-base font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30"
              />
            </label>
            <label className="block text-sm font-semibold text-foreground">
              Create Password
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                className="neo-border mt-2 w-full rounded-[calc(var(--radius)+0.4rem)] bg-background px-5 py-3 text-base font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30"
              />
            </label>
            <label className="block text-sm font-semibold text-foreground">
              Confirm Password
              <input
                type="password"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="********"
                className="neo-border mt-2 w-full rounded-[calc(var(--radius)+0.4rem)] bg-background px-5 py-3 text-base font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/30"
              />
            </label>
            {error && (
              <p className="text-sm font-medium text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button
              type="submit"
              disabled={status !== "idle"}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:from-purple-600 hover:to-cyan-500"
            >
              {status === "submitting" ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-8 rounded-[1.4rem] border-[var(--neo-border-width)] border-dashed border-foreground/30 p-5 text-sm text-foreground/80">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Need sandbox data?</p>
                <p className="mt-1 text-base font-semibold text-foreground">Generate a disposable test agent.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleTestSignup}
                disabled={status === "testing"}
                className="w-full sm:w-auto"
              >
                {status === "testing" ? "Provisioning..." : "Test Sign-Up"}
              </Button>
            </div>
            {testAccount && (
              <div className="mt-4 rounded-[calc(var(--radius)+0.6rem)] bg-background p-4 text-xs text-foreground/80">
                <p className="font-semibold text-foreground">Demo Credentials</p>
                <p className="mt-2">Email: {testAccount.email}</p>
                <p>Password: {testAccount.password}</p>
                <p className="mt-2 text-muted-foreground">
                  Stored securely in Firebase Auth — use these credentials to explore the agent console immediately.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
