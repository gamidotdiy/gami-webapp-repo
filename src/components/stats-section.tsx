"use client";
import { motion } from "motion/react";

const stats = [
  {
    value: "$150B+",
    label: "Serviceable Market Opportunity",
    detail: "Gamification and loyalty spend ready for capture",
  },
  {
    value: "1-2s",
    label: "Block Finality",
    detail: "Instant reward issuance with Cosmos speed",
  },
  {
    value: "4",
    label: "Autonomous Agents",
    detail: "Quest, Economy, Security, Rewards working in tandem",
  },
  {
    value: "100%",
    label: "User Data Sovereignty",
    detail: "Self-custody and GDPR compliance baked in",
  },
];

const StatsSection = () => {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-balance text-center text-3xl font-semibold md:text-4xl"
        >
          <span className="text-muted-foreground">Impact in</span> Numbers
        </motion.h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted-foreground">
          Brutalist geometry meets on-chain truth—hard metrics rendered with the same palette you trust.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="neo-panel neo-pressable h-full p-6"
            >
              <span className="block h-2 w-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
              <p className="mt-6 text-4xl font-black md:text-5xl">{stat.value}</p>
              <p className="mt-3 text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-3 text-sm text-foreground/80">{stat.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { StatsSection };
