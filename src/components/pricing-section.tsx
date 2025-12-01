"use client";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { Award, Coins, DollarSign } from "lucide-react";

const steps = [
  {
    title: "Engagement (XP)",
    type: "Soulbound Tokens",
    description: "Non-transferable proof of effort. Earned by completing quests and milestones.",
    Icon: Award,
    surface: "muted",
  },
  {
    title: "Reward (Gami Points)",
    type: "Off-chain Points",
    description: "XP thresholds unlock Gami Points, acting as a gateway to liquid value.",
    Icon: Coins,
  },
  {
    title: "Utility ($GAMI Token)",
    type: "Liquid Asset",
    description: "Governance, staking boosts, and premium AI dashboard access ride on the $GAMI token.",
    Icon: DollarSign,
    surface: "muted",
  },
];

export default function PricingSection() {
  return (
    <section id="tokenomics" className="px-6 pb-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-balance text-3xl font-semibold md:text-5xl"
          >
            <span className="text-muted-foreground">Tokenomics:</span> The Economic Engine
          </motion.h2>
          <p className="text-muted-foreground text-base leading-snug tracking-wide">
            A three-tier system transforms engagement into value without sacrificing the established color system.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-[1.1rem] top-0 bottom-0 hidden border-l-[var(--neo-border-width)] border-dashed border-foreground/25 md:block" />
          <ol className="space-y-10">
            {steps.map(({ title, type, description, Icon, surface }, index) => (
              <li key={title} className="relative">
                <span className="neo-border absolute left-0 top-8 flex h-8 w-8 items-center justify-center rounded-full bg-background text-xs font-black md:-left-4">
                  0{index + 1}
                </span>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card data-surface={surface} className="p-8 md:ml-16">
                    <div className="flex flex-col gap-6 md:flex-row">
                      <div className="neo-border flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/40">
                        <Icon className="h-6 w-6 text-[#a855f7]" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.5em] text-muted-foreground">
                          Step {index + 1}
                        </p>
                        <h3 className="mt-2 text-2xl font-black">{title}</h3>
                        <div className="mt-3 text-sm">
                          <span className="text-muted-foreground">Type: </span>
                          <span className="font-medium">{type}</span>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-foreground/80">{description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
