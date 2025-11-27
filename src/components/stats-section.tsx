"use client";
import { motion } from "motion/react";

const StatsSection = () => {
  return (
    <section className="pt-32">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-foreground text-balance max-w-xl  text-center mx-auto text-3xl font-semibold md:text-4xl"
        >
          <span className="text-muted-foreground">Impact in</span>{" "}
          Numbers
        </motion.h2>
        <div className="grid gap-10 pt-9 md:grid-cols-4 lg:gap-0 lg:pt-20">
          <div className="text-center">
            <p className="pt-4 text-5xl font-semibold lg:pt-10">$150B+</p>
            <p className="text-sm font-medium text-muted-foreground mt-4">
              Serviceable Market Opportunity
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              (Gamification + Loyalty)
            </p>
          </div>
          <div className="text-center">
            <p className="pt-4 text-5xl font-semibold lg:pt-10">1-2s</p>
            <p className="text-sm font-medium text-muted-foreground mt-4">
              Block Finality
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              (Instant Reward Issuance)
            </p>
          </div>
          <div className="text-center">
            <p className="pt-4 text-5xl font-semibold lg:pt-10">4</p>
            <p className="text-sm font-medium text-muted-foreground mt-4">
              AI Agents
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Optimizing Rewards Real-Time
            </p>
          </div>
          <div className="text-center">
            <p className="pt-4 text-5xl font-semibold lg:pt-10">100%</p>
            <p className="text-sm font-medium text-muted-foreground mt-4">
              User Data Sovereignty
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              (GDPR Compliant)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { StatsSection };