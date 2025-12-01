"use client";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Calendar, Users, Code, Vote } from "lucide-react";

const phases = [
  {
    title: "Phase 1: Foundation",
    timeframe: "Q4 2025 - Q2 2026",
    bullets: [
      "Launch of Universal Wallet MVP & SDK v1.0",
      "Onboard 50+ early developer partners",
    ],
    Icon: Code,
    surface: "muted",
  },
  {
    title: "Phase 2: Scale",
    timeframe: "Q3 2026",
    bullets: [
      "$GAMI TGE & staking pools online",
      "AI-Personalization Dashboard v2 released",
    ],
    Icon: Users,
  },
  {
    title: "Phase 3: Decentralization",
    timeframe: "2027+",
    bullets: [
      "Transition to DAO governance",
      "Protocol becomes fully open-source",
    ],
    Icon: Vote,
    surface: "muted",
  },
];

const TextRevealSection = () => {
  return (
    <section id="roadmap" className="px-6 pb-32">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-balance text-center text-3xl font-semibold md:text-4xl"
        >
          <span className="text-muted-foreground">The Roadmap:</span> Our Journey
        </motion.h2>
        <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-center text-base">
          Neon borders meet honest typography—milestones rendered with brutal clarity.
        </p>

        <div className="relative mt-16">
          <div className="absolute left-[1.1rem] top-0 bottom-0 border-l-[var(--neo-border-width)] border-dashed border-foreground/25" />
          <ol className="space-y-10">
            {phases.map(({ title, timeframe, bullets, Icon, surface }, index) => (
              <li key={title} className="relative">
                <span className="neo-border absolute left-0 top-8 flex h-10 w-10 items-center justify-center rounded-full bg-background text-xs font-black">
                  P{index + 1}
                </span>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    data-surface={surface}
                    className="p-6 pt-8 md:ml-16 md:p-8"
                  >
                    <div className="flex flex-col gap-6 md:flex-row md:items-start">
                      <div className="neo-border flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/30">
                        <Icon className="h-5 w-5 text-[#a855f7]" />
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <h3 className="text-xl font-black">{title}</h3>
                          <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-dashed border-foreground/30 px-3 py-1 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {timeframe}
                          </div>
                        </div>
                        <ul className="space-y-2 text-sm text-foreground/80">
                          {bullets.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-1 block h-2 w-2 rounded-sm bg-foreground" aria-hidden />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
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
};

export { TextRevealSection };
