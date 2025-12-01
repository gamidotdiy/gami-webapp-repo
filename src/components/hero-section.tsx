import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { HeroHeader } from "./header";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.2,
      },
    },
  },
};

const heroChips = [
  "Cross-Chain Identity",
  "AI Agents Online",
  "Universal Wallet",
];

const heroStats = [
  {
    value: "$150B+",
    label: "Serviceable Market",
    detail: "Gamification + Loyalty TAM",
  },
  {
    value: "1-2s",
    label: "Block Finality",
    detail: "Instant reward issuance",
  },
  {
    value: "4",
    label: "Autonomous Agents",
    detail: "Quest • Economy • Security • Rewards",
  },
  {
    value: "100%",
    label: "Data Sovereignty",
    detail: "GDPR compliant custody",
  },
];

const heroCallouts = [
  {
    title: "Universal Wallet",
    detail: "Portable XP, assets, and identity in one surface",
  },
  {
    title: "Agent Debate",
    detail: "Risk, Budget, Personalization, Integrity in milliseconds",
  },
];

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-hidden">
        <section className="relative isolate px-6 pt-32 pb-24 lg:pb-32">
          <div className="neo-grid-bg pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden />
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: { staggerChildren: 0.08 },
                    },
                  },
                  ...transitionVariants,
                }}
                className="flex flex-wrap items-center gap-3"
              >
                {heroChips.map((chip) => (
                  <span key={chip} className="neo-chip text-[0.6rem]">
                    {chip}
                  </span>
                ))}
              </AnimatedGroup>

              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h1"
                className="text-balance text-4xl font-black leading-tight sm:text-5xl md:text-6xl"
              >
                The Universal Neobrutalist Layer for Digital Engagement
              </TextEffect>

              <div className="neo-panel neo-pressable px-6 py-5 text-base leading-relaxed text-foreground/90">
                A cohesive design system for wallets, AI agents, and progression services.
                Bold borders, honest geometry, and vibrant gradients keep the original palette while delivering a tactile neobrutalist experience across every surface.
              </div>

              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: { staggerChildren: 0.05, delayChildren: 0.15 },
                    },
                  },
                  ...transitionVariants,
                }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  key="cta-primary"
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:from-purple-600 hover:to-cyan-500"
                >
                  <Link href="/signup">
                    <span className="text-nowrap">Start Building</span>
                  </Link>
                </Button>
                <Button key="cta-secondary" asChild variant="outline" size="lg">
                  <Link href="/whitepaper.pdf" target="_blank" rel="noopener noreferrer">
                    <span className="text-nowrap">Read Whitepaper</span>
                  </Link>
                </Button>
              </AnimatedGroup>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="neo-panel neo-pressable px-5 py-6">
                    <p className="text-3xl font-black md:text-4xl">{stat.value}</p>
                    <p className="mt-1 text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-sm text-foreground/70">{stat.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: { delayChildren: 0.2 },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -left-6 -top-6 hidden h-full w-full border-[var(--neo-border-width)] border-dashed border-foreground/25 lg:block"
                />
                <div className="neo-panel neo-pressable overflow-hidden px-5 py-6">
                  <div className="rounded-[1.6rem] border-[var(--neo-border-width)] border-dashed border-foreground/20 bg-background/85 p-3">
                    <Image
                      className="rounded-[1.2rem] border-[var(--neo-border-width)] border-foreground/10"
                      src="/app-ui.png"
                      alt="Gami Protocol dashboard"
                      width={2700}
                      height={1440}
                    />
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {heroCallouts.map((callout) => (
                      <div key={callout.title} className="neo-border rounded-2xl bg-background/90 p-4 text-sm font-semibold">
                        <p className="uppercase text-xs tracking-[0.4em] text-muted-foreground">
                          {callout.title}
                        </p>
                        <p className="mt-2 text-sm font-medium text-foreground/80">{callout.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className="neo-panel neo-pressable absolute -right-6 bottom-6 hidden max-w-xs px-5 py-4 lg:block"
                  data-surface="muted"
                >
                  <p className="text-xs font-black uppercase tracking-[0.5em] text-foreground/70">Live Activity</p>
                  <p className="mt-3 text-2xl font-black text-foreground">+1,284 XP / min</p>
                  <p className="text-sm text-foreground/70">
                    Agents issuing quests, rewards, and security actions in real-time.
                  </p>
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="neo-panel neo-pressable px-6 py-8 text-center">
              <p className="text-xs font-black uppercase tracking-[0.55em] text-muted-foreground">
                Trusted by teams shipping loyalty, commerce, and gaming ecosystems
              </p>
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  { src: "https://html.tailus.io/blocks/customers/nvidia.svg", alt: "Nvidia" },
                  { src: "https://html.tailus.io/blocks/customers/column.svg", alt: "Column" },
                  { src: "https://html.tailus.io/blocks/customers/github.svg", alt: "GitHub" },
                  { src: "https://html.tailus.io/blocks/customers/nike.svg", alt: "Nike" },
                  { src: "https://html.tailus.io/blocks/customers/lemonsqueezy.svg", alt: "Lemon Squeezy" },
                  { src: "https://html.tailus.io/blocks/customers/laravel.svg", alt: "Laravel" },
                  { src: "https://html.tailus.io/blocks/customers/lilly.svg", alt: "Lilly" },
                  { src: "https://html.tailus.io/blocks/customers/openai.svg", alt: "OpenAI" },
                ].map((logo) => (
                  <div
                    key={logo.alt}
                    className="neo-border flex h-16 items-center justify-center rounded-2xl bg-white/90 p-3 dark:bg-foreground/5"
                  >
                    <img
                      className="mx-auto max-h-6 w-auto object-contain dark:invert"
                      src={logo.src}
                      alt={`${logo.alt} Logo`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
