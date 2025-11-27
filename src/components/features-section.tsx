"use client";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import {
  Wallet,
  Database,
  Brain,
  Zap,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <section id="features">
      <div className="py-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-foreground text-balance text-3xl font-semibold md:text-4xl text-center mb-4"
          >
            <span className="text-muted-foreground">Core Architecture:</span>{" "}
            How It Works
          </motion.h2>
          <p className="text-muted-foreground text-center text-base max-w-2xl mx-auto mb-12">
            A modular loyalty infrastructure built on cutting-edge blockchain technology
          </p>
          
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Card 1: Universal Wallet */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full flex flex-col">
                <div className="bg-[#a3ff12]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Wallet className="w-6 h-6 text-[#a3ff12]" />
                </div>
                <h3 className="text-foreground text-xl font-semibold mb-3">
                  One Identity, Everywhere
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A non-custodial "Cross-Web Identity" that aggregates your XP, achievements, and assets from gaming, fitness, and retail into a single portable profile.
                </p>
              </Card>
            </motion.div>

            {/* Card 2: MCP Core */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full flex flex-col">
                <div className="bg-[#a3ff12]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-[#a3ff12]" />
                </div>
                <h3 className="text-foreground text-xl font-semibold mb-3">
                  Multi-Chain Progression
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The "tamper-proof ledger" that processes user events in real-time. It translates Web2 actions (API calls) into verifiable on-chain reputation.
                </p>
              </Card>
            </motion.div>

            {/* Card 3: AI Agent Layer */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full flex flex-col">
                <div className="bg-[#a3ff12]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-[#a3ff12]" />
                </div>
                <h3 className="text-foreground text-xl font-semibold mb-3">
                  Intelligent Rewards
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Four specialized agents (Risk, Budget, Personalization, and Integrity) debate in milliseconds to mint the perfect reward, balancing user retention with partner budgets.
                </p>
              </Card>
            </motion.div>

            {/* Card 4: Sovereign Infrastructure */}
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full flex flex-col">
                <div className="bg-[#a3ff12]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-[#a3ff12]" />
                </div>
                <h3 className="text-foreground text-xl font-semibold mb-3">
                  Cosmos Speed, EVM Power
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Built on a dedicated Layer 1 for high-speed, low-cost gaming transactions, with native bridges to Ethereum, Solana, and Bitcoin L2s.
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}