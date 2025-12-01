"use client";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Wallet, Database, Brain, Zap } from "lucide-react";

const features = [
  {
    title: "One Identity, Everywhere",
    description:
      "A non-custodial cross-web identity that aggregates XP, achievements, and assets across gaming, fitness, and retail into a single portable profile.",
    Icon: Wallet,
    surface: "muted",
  },
  {
    title: "Multi-Chain Progression",
    description:
      "The tamper-proof ledger translating Web2 actions into verifiable on-chain reputation with programmable XP curves.",
    Icon: Database,
  },
  {
    title: "Intelligent Rewards",
    description:
      "Four specialized agents debate in milliseconds to mint the perfect reward while balancing retention and partner budgets.",
    Icon: Brain,
  },
  {
    title: "Cosmos Speed, EVM Power",
    description:
      "Dedicated Layer 1 throughput with native bridges to Ethereum, Solana, and Bitcoin L2s keeps value flowing without friction.",
    Icon: Zap,
    surface: "muted",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="px-6 pb-24">
      <div className="mx-auto w-full max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-balance text-center text-3xl font-semibold md:text-4xl"
        >
          <span className="text-muted-foreground">Core Architecture:</span> How It Works
        </motion.h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-3xl text-center text-base">
          Brutalist blocks showcase each subsystem without diluting the original palette—structure, texture, and color now move in sync.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {features.map(({ title, description, Icon, surface }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <Card
                data-surface={surface}
                className="h-full space-y-4 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="neo-border flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/30">
                    <Icon className="h-6 w-6 text-[#a855f7]" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-foreground text-2xl font-black">{title}</h3>
                <p className="text-sm leading-relaxed text-foreground/75">{description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
