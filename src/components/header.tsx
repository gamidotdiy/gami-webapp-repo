"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { useScroll } from "motion/react";

const menuItems = [
  { name: "Architecture", href: "#features" },
  { name: "Tokenomics", href: "#tokenomics" },
  { name: "Roadmap", href: "#roadmap" },
  { name: "Developers", href: "#developers" },
];

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const { scrollYProgress } = useScroll();

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrolled(latest > 0.05);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        data-scrolled={scrolled}
        className={cn(
          "fixed left-0 top-0 z-50 w-full border-b-[var(--neo-border-width)] border-foreground/15 bg-background/95 shadow-[var(--neo-shadow-soft)] backdrop-blur-xl transition-all duration-300",
          "data-[scrolled=true]:shadow-[var(--neo-shadow-strong)]"
        )}
      >
        <div className="mx-auto flex max-w-6xl flex-col px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.35em]"
              >
                <Image
                  src="/gami-logo.png"
                  alt="Gami Protocol"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-xl border-[3px] border-foreground/20 bg-white p-1"
                />
                <span className="text-base tracking-[0.3em] text-foreground">Gami Protocol</span>
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="neo-border neo-pressable relative z-20 block h-12 w-12 cursor-pointer rounded-full bg-card p-0 text-foreground shadow-[var(--neo-shadow-soft)] lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex items-center gap-6 text-[0.65rem] font-black uppercase tracking-[0.3em]">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="group relative inline-flex items-center py-1 text-muted-foreground transition duration-150 hover:text-foreground"
                      >
                        <span>{item.name}</span>
                        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end gap-6 space-y-8 rounded-[1.5rem] border-[var(--neo-border-width)] border-foreground/20 bg-background/95 p-6 shadow-[var(--neo-shadow-strong)] md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:space-y-0 lg:border-none lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-4 text-xs font-black uppercase tracking-[0.4em]">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-foreground transition hover:bg-accent/60"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild variant="outline" size="sm">
                  <Link href="/whitepaper.pdf" target="_blank" rel="noopener noreferrer">
                    <span>Read Whitepaper</span>
                  </Link>
                </Button>
                <Button asChild size="sm" className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white">
                  <Link href="#">
                    <span>Start Building</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};