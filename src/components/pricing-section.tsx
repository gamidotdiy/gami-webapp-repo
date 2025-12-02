"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const plans = [
  {
    name: "Free Tier",
    badge: "Builder",
    price: "$0",
    cadence: "per workspace · forever",
    description: "Prototype quests, XP loops, and wallet flows without handing over a credit card.",
    features: [
      "Unlimited sandbox quests + XP webhooks",
      "2 autonomous agents with universal wallet simulator",
      "Community Discord, status alerts, and weekly office hours",
    ],
    ctaLabel: "Start Free",
    ctaHref: "/signup",
    note: "Instant activation. Upgrade only when finance needs metered billing.",
  },
  {
    name: "Scale with Stripe",
    badge: "Stripe Billing",
    price: "$499",
    cadence: "per workspace · month",
    description: "Stripe Billing + Connect power usage monetization, fiat on-ramps, and revenue share payouts.",
    features: [
      "Stripe-managed seats, usage meters, and invoicing",
      "Unlimited wallets, production SLA, and audit telemetry",
      "Fiat + crypto payouts via Stripe Connect & Treasury",
    ],
    ctaLabel: "Book Stripe Demo",
    ctaHref: "mailto:hello@gami.xyz?subject=Stripe%20Scale%20Plan",
    note: "Stripe handles contracts and collections. Keys ship after review.",
    surface: "muted",
  },
];

const trustPoints = [
  {
    title: "Stripe-native billing",
    detail:
      "Usage, seats, and revenue share live directly inside Stripe Billing + Connect so finance never leaves their source of truth.",
    Icon: CreditCard,
  },
  {
    title: "Wallet sovereignty",
    detail: "Every tier ships with universal wallet custody, SOC 2 logging, and compliance-ready audit trails.",
    Icon: ShieldCheck,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="px-6 pb-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-balance text-3xl font-semibold md:text-5xl"
          >
            <span className="text-muted-foreground">Pricing:</span> Free to start, Stripe when you scale
          </motion.h2>
          <p className="text-muted-foreground text-base leading-snug tracking-wide">
            Launch experiments on the free tier, then flip on Stripe-managed billing when you need production wallets, payouts,
            and finance-approved reporting.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card data-surface={plan.surface} className="flex h-full flex-col gap-6 p-8">
                <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.5em] text-muted-foreground">
                  <span>Plan 0{index + 1}</span>
                  {plan.badge && <span className="neo-chip text-[0.55rem] tracking-[0.3em]">{plan.badge}</span>}
                </div>
                <div>
                  <h3 className="text-3xl font-black">{plan.name}</h3>
                  <p className="mt-2 text-sm text-foreground/70">{plan.description}</p>
                </div>
                <div>
                  <p className="text-4xl font-black">{plan.price}</p>
                  <p className="text-sm text-foreground/70">{plan.cadence}</p>
                </div>
                <ul className="space-y-3 text-sm text-foreground/80">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:from-purple-600 hover:to-cyan-500"
                >
                  {plan.ctaHref.startsWith("http") || plan.ctaHref.startsWith("mailto") ? (
                    <a href={plan.ctaHref} target="_blank" rel="noreferrer">
                      {plan.ctaLabel}
                    </a>
                  ) : (
                    <Link href={plan.ctaHref}>{plan.ctaLabel}</Link>
                  )}
                </Button>
                {plan.note && <p className="text-xs text-foreground/70">{plan.note}</p>}
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {trustPoints.map(({ title, detail, Icon }) => (
            <Card key={title} data-surface="muted" className="flex items-start gap-4 p-6">
              <div className="neo-border flex h-14 w-14 items-center justify-center rounded-2xl bg-background/80">
                <Icon className="h-6 w-6 text-[#a855f7]" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">{title}</p>
                <p className="mt-2 text-sm text-foreground/80">{detail}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
