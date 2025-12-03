import { Pyramid } from "lucide-react";
import React from "react";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    src: "/gami-logo.png",
    alt: "Gami Protocol logo",
    title: "Gami Protocol",
    url: "https://www.gamiprotocol.xyz/",
  },
  tagline = "Built by Gami Foundation.",
  menuItems = [
    {
      title: "Developers",
      links: [
        { text: "GitHub", url: "https://github.com/gami-protocol" },
        { text: "SDK Documentation", url: "https://docs.gamiprotocol.xyz/sdk" },
        { text: "API Reference", url: "https://docs.gamiprotocol.xyz/api" },
      ],
    },
    {
      title: "Ecosystem",
      links: [
        { text: "Grant Program ($10M Fund)", url: "https://www.gamiprotocol.com/grants" },
        { text: "Bug Bounty", url: "https://www.gamiprotocol.com/security/bug-bounty" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Whitepaper", url: "https://www.gamiprotocol.com/whitepaper.pdf" },
        { text: "Blog", url: "https://www.gamiprotocol.com/blog" },
        { text: "Community", url: "https://discord.gg/gamiprotocol" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "https://www.gamiprotocol.com/about" },
        { text: "Careers", url: "https://www.gamiprotocol.com/careers" },
        { text: "Contact", url: "mailto:hello@gamiprotocol.com" },
      ],
    },
  ],
  copyright = "© 2025 Gami Protocol. The Universal Layer for Digital Engagement.",
  bottomLinks = [
    { text: "Privacy Policy", url: "https://www.gamiprotocol.com/legal/privacy" },
    { text: "Terms of Service", url: "https://www.gamiprotocol.com/legal/terms" },
  ],
}: Footer2Props) => {
  return (
    <section id="developers" className="px-6 pb-24 pt-24">
      <div className="mx-auto max-w-6xl">
        <footer className="neo-panel neo-pressable px-8 py-10">
          <div className="flex flex-col gap-12 lg:flex-row">
            <div className="lg:w-1/3">
              <a href={logo.url} className="inline-flex items-center gap-3 text-lg font-black uppercase tracking-[0.4em]">
                <span className="neo-border flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/40">
                  <Pyramid className="h-6 w-6" />
                </span>
                {logo.title}
              </a>
              <p className="mt-4 text-xl font-black">{tagline}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                The Gami Foundation builds the Universal Engagement Layer—multi-chain wallets, agent infrastructure, and loyalty rails trusted by leading commerce and gaming brands.
              </p>
            </div>
            <div className="grid flex-1 grid-cols-2 gap-8 text-sm sm:grid-cols-2 md:grid-cols-4">
              {menuItems.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground">
                    {section.title}
                  </h3>
                  <ul className="mt-4 space-y-3 font-semibold">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a
                          className="inline-flex items-center gap-2 transition hover:translate-x-1 hover:text-foreground"
                          href={link.url}
                        >
                          <span className="block h-2 w-2 rounded-sm bg-foreground" aria-hidden />
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="neo-divider my-10" />
          <div className="flex flex-col gap-4 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>{copyright}</p>
            <ul className="flex flex-wrap gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <a className="hover:text-foreground" href={link.url}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
