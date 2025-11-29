"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ActivitySquare,
  BarChart3,
  LayoutDashboard,
  Link2,
  ShieldCheck,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BroadcastButton } from "./broadcast-button";
import { SignOutButton } from "../auth/sign-out-button";

const navLinks = [
  {
    label: "Supervisor (Home)",
    href: "/agents",
    icon: LayoutDashboard,
  },
  {
    label: "Quest Engine",
    href: "/agents/quest",
    icon: ActivitySquare,
  },
  {
    label: "Economy",
    href: "/agents/economy",
    icon: BarChart3,
  },
  {
    label: "Security",
    href: "/agents/security",
    icon: ShieldCheck,
  },
  {
    label: "Rewards",
    href: "/agents/rewards",
    icon: Star,
  },
  {
    label: "Integrations",
    href: "/agents/integrations",
    icon: Link2,
  },
];

export default function HorizonLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F4F7FE] text-[#2B3674]">
      <aside className="hidden w-64 flex-col border-r border-[#E4E9FB] bg-white/95 px-6 py-8 shadow-[14px_30px_60px_rgba(67,24,255,0.08)] lg:flex">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A3AED0]">
            Gami Protocol
          </p>
          <p className="mt-2 text-2xl font-semibold">Agent Core</p>
        </div>
        <nav className="flex flex-1 flex-col gap-2 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 transition-all", 
                pathname === link.href
                  ? "bg-[#4318FF] text-white shadow-[0px_15px_30px_rgba(67,24,255,0.45)]"
                  : "text-[#A3AED0] hover:bg-[#F4F7FE] hover:text-[#2B3674]",
              )}
            >
              <link.icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-6 rounded-2xl bg-[#F4F7FE] p-4 text-sm text-[#2B3674]">
          <p className="font-semibold">Live Sync</p>
          <p className="text-xs text-[#A3AED0]">Agents synchronized • 2m ago</p>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-transparent bg-[#F4F7FE]/90 px-6 py-6 backdrop-blur">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A3AED0]">
              Supervisor Console
            </p>
            <h1 className="text-2xl font-semibold">Gami Agent Dashboard</h1>
          </div>
          <div className="flex flex-1 items-center justify-end gap-3">
            <input
              type="search"
              placeholder="Search agents, quests, wallets..."
              className="hidden w-full max-w-sm rounded-full border border-transparent bg-white/80 px-5 py-2 text-sm text-[#2B3674] placeholder:text-[#A3AED0] focus:border-[#4318FF] focus:outline-none md:block"
            />
            <BroadcastButton />
            <SignOutButton />
          </div>
        </header>
        <div className="px-4 pb-8 pt-6">
          <div className="mb-4 flex gap-3 overflow-x-auto pb-2 pt-1 text-sm font-semibold text-[#A3AED0] lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2",
                  pathname === link.href
                    ? "bg-[#4318FF] text-white"
                    : "bg-white text-[#2B3674]",
                )}
              >
                {link.label.replace(" (Home)", "")}
              </Link>
            ))}
          </div>
          <main className="space-y-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
