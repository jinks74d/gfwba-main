// ABOUT PAGE

import { InnerHero, AboutSection } from "@/devlink";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig;

export const metadata = {
  title: "About GFWBA: Advocating for Fort Worth's Homebuilding Industry",
  description:
    "Learn about the Greater Fort Worth Builders Association (GFWBA), our mission, history, and significant victories for the homebuilding industry in Fort Worth, Texas.",
  openGraph: {
    title:
      "Greater Fort Worth Builders Association: Shaping the Future of Homebuilding",
    description:
      "Discover the mission, achievements, and impact of the Greater Fort Worth Builders Association on Fort Worth's homebuilding sector. Join us in our commitment to industry excellence.",
    url: "https://gfwbatx.com/about",
    siteName: "Greater Fort Worth Builders Association",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${metadataBase}/public/images/gfwba-logo@2x.png`,
        alt: "GFWBA Logo",
      },
    ],
  },
};

export default function About() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />
      <AboutSection />
    </main>
  );
}
