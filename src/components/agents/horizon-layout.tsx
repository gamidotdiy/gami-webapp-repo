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
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-72 flex-col gap-6 border-r border-foreground/15 bg-background/85 px-4 py-8 lg:flex">
        <div className="neo-panel neo-pressable p-5">
          <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-muted-foreground">
            Gami Protocol
          </p>
          <p className="mt-2 text-xl font-black tracking-[0.3em] text-foreground">Agent Core</p>
        </div>
        <nav className="flex flex-1 flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "neo-border neo-pressable flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold",
                pathname === link.href
                  ? "bg-foreground text-background"
                  : "bg-background/80 text-foreground/70 hover:text-foreground",
              )}
            >
              <link.icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className="neo-panel neo-pressable p-4 text-sm">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-muted-foreground">Live Sync</p>
          <p className="mt-1 text-foreground">Agents synchronized • 2m ago</p>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-foreground/10 bg-background/95 px-6 py-6 backdrop-blur-xl">
          <div>
            <p className="text-[0.6rem] font-black uppercase tracking-[0.45em] text-muted-foreground">
              Supervisor Console
            </p>
            <h1 className="mt-2 text-2xl font-black">Gami Agent Dashboard</h1>
          </div>
          <div className="flex flex-1 items-center justify-end gap-3">
            <input
              type="search"
              placeholder="Search agents, quests, wallets..."
              className="neo-border hidden w-full max-w-sm rounded-[calc(var(--radius)+0.4rem)] bg-background px-5 py-2 text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-foreground/30 focus:outline-none md:block"
            />
            <BroadcastButton />
            <SignOutButton />
          </div>
        </header>
        <div className="px-4 pb-8 pt-6">
          <div className="mb-4 flex gap-3 overflow-x-auto pb-2 pt-1 text-xs font-black uppercase tracking-[0.4em] text-muted-foreground lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "neo-border whitespace-nowrap rounded-full px-4 py-2",
                  pathname === link.href
                    ? "bg-foreground text-background"
                    : "bg-background/90 text-foreground/80",
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
