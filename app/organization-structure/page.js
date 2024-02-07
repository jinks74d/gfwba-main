// ORGANIZATION STRUCTURE PAGE

import { InnerHero, OrganizationSection } from "@/devlink";

export const metadata = {
  title: "Organization Structure of GFWBA - Building Strong Foundations",
  description:
    "Explore the organization structure of the Greater Fort Worth Builders Association (GFWBA), including our leadership, staff, and our commitment to the housing industry.",
  openGraph: {
    title:
      "GFWBA's Organization Structure: Leadership for the Homebuilding Industry",
    description:
      "Discover how the Greater Fort Worth Builders Association (GFWBA) is structured to support its members and the homebuilding industry, featuring our dedicated staff and leadership teams.",
    url: "https://gfwbatx.com/organization-structure",
    siteName: "Greater Fort Worth Builders Association",
    locale: "en_US",
    type: "website",
  },
};

export default function Organization() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />
      <OrganizationSection />
    </main>
  );
}
