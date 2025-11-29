"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";

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
    <div className="min-h-screen bg-[#F4F7FE] px-4 py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-10 rounded-[40px] bg-white p-8 shadow-[0px_45px_90px_rgba(112,144,176,0.35)] md:grid-cols-2 md:p-12">
        <div className="rounded-[30px] bg-gradient-to-br from-[#4318FF] to-[#6AD2FF] p-10 text-white">
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">Start Here</p>
          <h1 className="mt-6 text-4xl font-semibold">Create Your Agent Identity</h1>
          <p className="mt-4 text-white/80">
            Generate supervised access before handing missions to Quest, Economy, and Security agents across the network.
          </p>
          <div className="mt-10 space-y-5 text-sm uppercase tracking-[0.25em] text-white/70">
            <p>Nodes Linked · 32</p>
            <p>AI Assistants · 6</p>
            <p>Runbooks Verified · 18</p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#A3AED0]">
              Sign Up First
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[#2B3674]">
              Provision Supervisor Credentials
            </h2>
            <p className="mt-2 text-sm text-[#A3AED0]">
              Already verified? <Link href="/login" className="font-semibold text-[#4318FF]">Sign in instead</Link>
            </p>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-2">
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              disabled={status !== "idle"}
              className="rounded-full border border-[#E4E9FB] px-4 py-2 text-sm font-semibold text-[#2B3674] shadow-[0px_10px_25px_rgba(160,174,211,0.25)] disabled:opacity-60"
            >
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleOAuth("github")}
              disabled={status !== "idle"}
              className="rounded-full border border-[#E4E9FB] px-4 py-2 text-sm font-semibold text-[#2B3674] shadow-[0px_10px_25px_rgba(160,174,211,0.25)] disabled:opacity-60"
            >
              Continue with GitHub
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleEmailSignup}>
            <label className="block text-sm font-semibold text-[#2B3674]">
              Work Email
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="agent@gami.xyz"
                className="mt-2 w-full rounded-full border border-transparent bg-[#F4F7FE] px-5 py-3 text-[#2B3674] placeholder:text-[#A3AED0] focus:border-[#4318FF] focus:outline-none"
              />
            </label>
            <label className="block text-sm font-semibold text-[#2B3674]">
              Create Password
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                className="mt-2 w-full rounded-full border border-transparent bg-[#F4F7FE] px-5 py-3 text-[#2B3674] placeholder:text-[#A3AED0] focus:border-[#4318FF] focus:outline-none"
              />
            </label>
            <label className="block text-sm font-semibold text-[#2B3674]">
              Confirm Password
              <input
                type="password"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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
              disabled={status !== "idle"}
              className="w-full rounded-full bg-[#4318FF] py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-[0px_25px_45px_rgba(67,24,255,0.4)] disabled:opacity-60"
            >
              {status === "submitting" ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 rounded-[24px] bg-[#F4F7FE] p-5 text-sm text-[#2B3674]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A3AED0]">
                  Test Run
                </p>
                <p className="text-base font-semibold text-[#2B3674]">
                  Generate a Fake Email First
                </p>
              </div>
              <button
                type="button"
                onClick={handleTestSignup}
                disabled={status === "testing"}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#4318FF] shadow-[0px_15px_35px_rgba(67,24,255,0.2)] disabled:opacity-60"
              >
                {status === "testing" ? "Provisioning..." : "Test Sign-Up"}
              </button>
            </div>
            {testAccount && (
              <div className="mt-4 rounded-2xl bg-white p-4 text-xs text-[#2B3674]">
                <p className="font-semibold text-[#4318FF]">Demo Credentials</p>
                <p className="mt-2">Email: {testAccount.email}</p>
                <p>Password: {testAccount.password}</p>
                <p className="mt-2 text-[#A3AED0]">
                  Stored securely in Firebase Auth — you can use these details to login immediately.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
