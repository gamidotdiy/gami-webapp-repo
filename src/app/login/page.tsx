"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/auth-provider";

const signalMetrics = [
  { label: "Live Clusters", value: "12" },
  { label: "Fraud Alerts", value: "4" },
  { label: "Quest Drafts", value: "8" },
];

function LoginPageInner() {
  const {
    signInWithEmail,
    signInWithGoogle,
    signInWithGithub,
    user,
    loading,
  } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams?.get("redirect");
  const destination = redirectParam && redirectParam.startsWith("/") ? redirectParam : "/agents";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  useEffect(() => {
    if (!loading && user) {
      router.replace(destination);
    }
  }, [destination, loading, router, user]);

  const handleEmailLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setStatus("submitting");
    try {
      await signInWithEmail(email, password);
      router.push(destination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
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
      router.push(destination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to authenticate");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="neo-chip text-[0.58rem] font-black uppercase tracking-[0.4em] text-foreground"
          >
            ← Back
          </Link>
          <p className="text-xs font-semibold text-muted-foreground">Supervisor access only</p>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="neo-panel neo-pressable space-y-6 p-8 lg:p-10" data-surface="muted">
          <p className="neo-chip" data-tone="ink">
            Supervisor Access
          </p>
          <div>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              Gami Agent Dashboard
            </h1>
            <p className="mt-4 text-base text-foreground/85">
              Sign in to orchestrate Supervisor, Quest, Economy, and Security agents across the universal engagement layer with brutal clarity.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {signalMetrics.map((metric) => (
              <div key={metric.label} className="neo-panel neo-pressable px-4 py-5 text-center">
                <p className="text-3xl font-black">{metric.value}</p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-[1.5rem] border-[var(--neo-border-width)] border-dashed border-foreground/35 p-6 text-sm text-foreground/80">
            <p className="font-semibold uppercase tracking-[0.4em] text-muted-foreground">Live Telemetry</p>
            <p className="mt-2">
              Agents synced • Risk posture nominal • Rewards issuance online
            </p>
          </div>
        </section>

        <section className="neo-panel neo-pressable p-8 lg:p-10">
          <div className="mb-8">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.45em] text-muted-foreground">
              Sign In
            </p>
            <h2 className="mt-3 text-3xl font-black text-foreground">Access Your Agent Console</h2>
            <p className="mt-2 text-sm text-foreground/70">
              Need an account?{" "}
              <Link href="/signup" className="font-semibold text-foreground">
                Create one first
              </Link>
            </p>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuth("google")}
              disabled={status === "submitting"}
            >
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOAuth("github")}
              disabled={status === "submitting"}
            >
              Continue with GitHub
            </Button>
          </div>

          <form className="space-y-5" onSubmit={handleEmailLogin}>
            <label className="block text-sm font-semibold text-foreground">
              Work Email
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ops@gami.xyz"
                className="neo-border mt-2 w-full rounded-[calc(var(--radius)+0.4rem)] bg-background px-5 py-3 text-base font-semibold text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground/30 focus:outline-none"
              />
            </label>
            <label className="block text-sm font-semibold text-foreground">
              Access Key
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                className="neo-border mt-2 w-full rounded-[calc(var(--radius)+0.4rem)] bg-background px-5 py-3 text-base font-semibold text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground/30 focus:outline-none"
              />
            </label>
            {error && (
              <p className="text-sm font-medium text-destructive" role="alert">
                {error}
              </p>
            )}
            <Button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:from-purple-600 hover:to-cyan-500"
            >
              {status === "submitting" ? "Signing In..." : "Launch Console"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-foreground/70">
            Forgot your secret?{" "}
            <Link href="/signup" className="font-semibold text-foreground">
              Recreate access
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <LoginPageInner />
    </Suspense>
  );
}
