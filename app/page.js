// HOME PAGE

import { HomeHero, HomeMain, Footer } from "@/devlink";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig;

export const metadata = {
  title:
    "Greater Fort Worth Builders Association - Leading Homebuilding Industry Advocacy",
  description:
    "Join GFWBA, the premier non-profit association for homebuilding professionals in Fort Worth. Advocacy, education, networking, and member services since 1945.",
  openGraph: {
    title:
      "Empowering Fort Worth's Homebuilding Industry - Greater Fort Worth Builders Association",
    description:
      "Discover how the Greater Fort Worth Builders Association champions the homebuilding industry through advocacy, education, and networking. Since 1945, connecting professionals for growth and community development.",
    url: "https://gfwbatx.com",
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

export default function Home() {
  return (
    <main>
      <HomeHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/" }}
      />
      <HomeMain
        homeDirectory={{ href: "/directory" }}
        homeJoin={{ href: "/" }}
      />
    </main>
  );
}
