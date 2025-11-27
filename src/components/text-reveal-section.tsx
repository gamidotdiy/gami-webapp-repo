"use client";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Calendar, Users, Code, Vote } from "lucide-react";

const TextRevealSection = () => {
  return (
    <section id="roadmap" className="bg-background py-24">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-foreground text-balance text-3xl font-semibold md:text-4xl text-center mb-4"
        >
          <span className="text-muted-foreground">The Roadmap:</span>{" "}
          Our Journey
        </motion.h2>
        <p className="text-muted-foreground text-center text-base max-w-2xl mx-auto mb-16">
          Building the future of digital engagement, one milestone at a time
        </p>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

          {/* Phase 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative mb-12 md:mb-16"
          >
            <div className="flex items-start gap-6 md:grid md:grid-cols-2 md:gap-8">
              <div className="hidden md:block text-right">
                <Card className="p-6 inline-block">
                  <div className="flex items-center gap-3 mb-4 justify-end">
                    <h3 className="text-xl font-semibold">Phase 1: Foundation</h3>
                    <div className="bg-[#a3ff12]/10 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                      <Code className="w-5 h-5 text-[#a3ff12]" />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4 flex items-center gap-2 justify-end">
                    <Calendar className="w-4 h-4" />
                    <span>Q4 2025 - Q2 2026</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground text-right">
                    <li>• Launch of Universal Wallet MVP & SDK v1.0</li>
                    <li>• Onboarding 50+ early developer partners</li>
                  </ul>
                </Card>
              </div>
              <div className="md:hidden">
                <Card className="p-6 ml-14">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#a3ff12]/10 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                      <Code className="w-5 h-5 text-[#a3ff12]" />
                    </div>
                    <h3 className="text-xl font-semibold">Phase 1: Foundation</h3>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Q4 2025 - Q2 2026</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Launch of Universal Wallet MVP & SDK v1.0</li>
                    <li>• Onboarding 50+ early developer partners</li>
                  </ul>
                </Card>
              </div>
              <div className="absolute left-6 top-2 w-3 h-3 rounded-full bg-[#a3ff12] border-4 border-background md:left-1/2 md:-translate-x-1/2" />
            </div>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mb-12 md:mb-16"
          >
            <div className="flex items-start gap-6 md:grid md:grid-cols-2 md:gap-8">
              <div className="hidden md:block" />
              <Card className="p-6 ml-14 md:ml-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#a3ff12]/10 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-[#a3ff12]" />
                  </div>
                  <h3 className="text-xl font-semibold">Phase 2: Scale</h3>
                </div>
                <div className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Q3 2026</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• $GAMI TGE (Token Generation Event) & Staking Pools Live</li>
                  <li>• Full AI-Personalization Dashboard V2 release</li>
                </ul>
              </Card>
              <div className="absolute left-6 top-2 w-3 h-3 rounded-full bg-[#a3ff12] border-4 border-background md:left-1/2 md:-translate-x-1/2" />
            </div>
          </motion.div>

          {/* Phase 3 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-start gap-6 md:grid md:grid-cols-2 md:gap-8">
              <div className="hidden md:block text-right">
                <Card className="p-6 inline-block">
                  <div className="flex items-center gap-3 mb-4 justify-end">
                    <h3 className="text-xl font-semibold">Phase 3: Decentralization</h3>
                    <div className="bg-[#a3ff12]/10 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                      <Vote className="w-5 h-5 text-[#a3ff12]" />
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4 flex items-center gap-2 justify-end">
                    <Calendar className="w-4 h-4" />
                    <span>2027+</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground text-right">
                    <li>• Transition to DAO Governance</li>
                    <li>• Protocol becomes fully open-source</li>
                  </ul>
                </Card>
              </div>
              <div className="md:hidden">
                <Card className="p-6 ml-14">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#a3ff12]/10 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                      <Vote className="w-5 h-5 text-[#a3ff12]" />
                    </div>
                    <h3 className="text-xl font-semibold">Phase 3: Decentralization</h3>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>2027+</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Transition to DAO Governance</li>
                    <li>• Protocol becomes fully open-source</li>
                  </ul>
                </Card>
              </div>
              <div className="absolute left-6 top-2 w-3 h-3 rounded-full bg-[#a3ff12] border-4 border-background md:left-1/2 md:-translate-x-1/2" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { TextRevealSection };