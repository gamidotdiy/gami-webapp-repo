"use client";
import { Card } from "./ui/card";
import { motion } from "motion/react";
import { ArrowDown, Coins, Award, DollarSign } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="tokenomics" className="py-16 max-w-5xl mx-auto md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <motion.h2
            initial={{ opacity: 0, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-foreground text-balance text-3xl font-semibold md:text-5xl"
          >
            <span className="text-muted-foreground">Tokenomics:</span>{" "}
            The Economic Engine
          </motion.h2>
        </div>
        <p className="text-muted-foreground mx-auto mt-8 max-w-[30rem] text-balance text-center text-base leading-snug tracking-wide sm:text-lg">
          A three-tier system that transforms engagement into value
        </p>
      </div>

      <div className="mt-16 max-w-2xl mx-auto space-y-6">
        {/* Step 1: XP */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#a855f7]/10 px-3 py-1 rounded-full">
              <span className="text-[#a855f7] text-xs font-medium">STEP 1</span>
            </div>
            <div className="flex items-start gap-6">
              <div className="bg-[#a855f7]/10 w-14 h-14 rounded-lg flex items-center justify-center shrink-0">
                <Award className="w-7 h-7 text-[#a855f7]" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground text-2xl font-semibold mb-2">
                  Engagement (XP)
                </h3>
                <div className="mb-3">
                  <span className="text-sm text-muted-foreground">Type: </span>
                  <span className="text-sm font-medium">Soulbound Tokens (SBTs)</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Non-transferable proof of effort. Earned by completing quests and milestones.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Arrow Down */}
        <div className="flex justify-center">
          <ArrowDown className="w-6 h-6 text-[#a855f7]" />
        </div>

        {/* Step 2: Gami Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#a855f7]/10 px-3 py-1 rounded-full">
              <span className="text-[#a855f7] text-xs font-medium">STEP 2</span>
            </div>
            <div className="flex items-start gap-6">
              <div className="bg-[#a855f7]/10 w-14 h-14 rounded-lg flex items-center justify-center shrink-0">
                <Coins className="w-7 h-7 text-[#a855f7]" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground text-2xl font-semibold mb-2">
                  Reward (Gami Points)
                </h3>
                <div className="mb-3">
                  <span className="text-sm text-muted-foreground">Type: </span>
                  <span className="text-sm font-medium">Off-chain Points</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The "Claim Ticket." XP thresholds unlock Gami Points, which act as a gateway to liquid value.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Arrow Down */}
        <div className="flex justify-center">
          <ArrowDown className="w-6 h-6 text-[#a855f7]" />
        </div>

        {/* Step 3: $GAMI Token */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 relative overflow-hidden border-[#a855f7]/20">
            <div className="absolute top-4 right-4 bg-[#a855f7]/10 px-3 py-1 rounded-full">
              <span className="text-[#a855f7] text-xs font-medium">STEP 3</span>
            </div>
            <div className="flex items-start gap-6">
              <div className="bg-[#a855f7]/10 w-14 h-14 rounded-lg flex items-center justify-center shrink-0">
                <DollarSign className="w-7 h-7 text-[#a855f7]" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground text-2xl font-semibold mb-2">
                  Utility ($GAMI Token)
                </h3>
                <div className="mb-3">
                  <span className="text-sm text-muted-foreground">Type: </span>
                  <span className="text-sm font-medium">Liquid Asset</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Used for governance, staking to boost rewards, and accessing premium AI dashboard features.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}