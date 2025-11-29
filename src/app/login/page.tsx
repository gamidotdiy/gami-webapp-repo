"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState, Suspense } from "react";
import { useAuth } from "@/components/auth/auth-provider";

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
    <div className="min-h-screen bg-[#F4F7FE] px-4 py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-10 rounded-[40px] bg-white p-8 shadow-[0px_45px_90px_rgba(112,144,176,0.35)] md:grid-cols-2 md:p-12">
        <div className="rounded-[30px] bg-gradient-to-br from-[#4318FF] to-[#6AD2FF] p-10 text-white">
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">Supervisor Access</p>
          <h1 className="mt-6 text-4xl font-semibold">Gami Agent Dashboard</h1>
          <p className="mt-4 text-white/80">
            Sign in to orchestrate Supervisor, Quest, and Security agents across the universal engagement layer.
          </p>
          <div className="mt-10 space-y-5 text-sm uppercase tracking-[0.25em] text-white/70">
            <p>Live Clusters · 12</p>
            <p>Fraud Alerts · 4</p>
            <p>Quest Drafts · 8</p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#A3AED0]">
              Sign In
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[#2B3674]">
              Access Your Agent Console
            </h2>
            <p className="mt-2 text-sm text-[#A3AED0]">
              Need an account? <Link href="/signup" className="font-semibold text-[#4318FF]">Create one first</Link>
            </p>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-2">
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              disabled={status === "submitting"}
              className="rounded-full border border-[#E4E9FB] px-4 py-2 text-sm font-semibold text-[#2B3674] shadow-[0px_10px_25px_rgba(160,174,211,0.25)] disabled:opacity-60"
            >
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleOAuth("github")}
              disabled={status === "submitting"}
              className="rounded-full border border-[#E4E9FB] px-4 py-2 text-sm font-semibold text-[#2B3674] shadow-[0px_10px_25px_rgba(160,174,211,0.25)] disabled:opacity-60"
            >
              Continue with GitHub
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleEmailLogin}>
            <label className="block text-sm font-semibold text-[#2B3674]">
              Work Email
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ops@gami.xyz"
                className="mt-2 w-full rounded-full border border-transparent bg-[#F4F7FE] px-5 py-3 text-[#2B3674] placeholder:text-[#A3AED0] focus:border-[#4318FF] focus:outline-none"
              />
            </label>
            <label className="block text-sm font-semibold text-[#2B3674]">
              Access Key
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                className="mt-2 w-full rounded-full border border-transparent bg-[#F4F7FE] px-5 py-3 text-[#2B3674] placeholder:text-[#A3AED0] focus:border-[#4318FF] focus:outline-none"
              />
            </label>
            {error && (
              <p className="text-sm font-medium text-[#D52941]" role="alert">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-full bg-[#4318FF] py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0px_25px_45px_rgba(67,24,255,0.4)] disabled:opacity-60"
            >
              {status === "submitting" ? "Signing In..." : "Launch Console"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-[#A3AED0]">
            Forgot your secret? <Link href="/signup" className="font-semibold text-[#4318FF]">Recreate access</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  // Wrap usage of useSearchParams (a client-side hook) within a Suspense boundary as required by Next.js
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <LoginPageInner />
    </Suspense>
  );
}
