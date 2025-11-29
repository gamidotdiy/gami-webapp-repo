import { Pyramid } from "lucide-react";

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
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "Gami Protocol logo",
    title: "Gami Protocol",
    url: "https://www.gamiprotocol.com",
  },
  tagline = "Built by Gami Foundation.",
  menuItems = [
    {
      title: "Developers",
      links: [
        { text: "GitHub", url: "https://github.com/gami-protocol" },
        { text: "SDK Documentation", url: "https://docs.gamiprotocol.com/sdk" },
        { text: "API Reference", url: "https://docs.gamiprotocol.com/api" },
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
    <section id="developers" className="py-32 border-t bg-background dark:bg-background-dark">
      <div className="container mx-auto max-w-6xl">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Pyramid />
                Gami Protocol
              </div>
              <p className="mt-4 font-bold">{tagline}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                The Gami Foundation builds the Universal Engagement Layer—multi-chain wallets, agent infrastructure, and loyalty rails trusted by leading commerce and gaming brands.
              </p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="text-muted-foreground space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary underline">
                  <a href={link.url}>{link.text}</a>
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