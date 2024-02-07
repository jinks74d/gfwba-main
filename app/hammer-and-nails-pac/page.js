// HAMMER AND NAILS PAGE

import { InnerHero, HammerNailsSection } from "@/devlink";

export const metadata = {
  title: "Hammer and Nails PAC: Political Advocacy for Fort Worth Homebuilding",
  description:
    "Join the Hammer and Nails PAC by GFWBA to support political candidates who champion the homebuilding industry in Fort Worth. Make a difference today.",
  openGraph: {
    title:
      "Empower Fort Worth's Homebuilding Industry with Hammer and Nails PAC",
    description:
      "Get involved with the Greater Fort Worth Builders Association's Hammer and Nails PAC. Support local and state candidates who advocate for the building industry's growth and success.",
    url: "https://gfwbatx.com/hammer-and-nails-pac",
    siteName: "Greater Fort Worth Builders Association",
    locale: "en_US",
    type: "website",
  },
};

export default function HammerAndNails() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />
      <HammerNailsSection />
    </main>
  );
}
