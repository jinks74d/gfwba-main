// DISCOUNTS PAGE

import { InnerHero, MemberBenefitsSection } from "@/devlink";

export const metadata = {
  title: "Exclusive Member Discounts at GFWBA: Save on Homebuilding Services",
  description:
    "Unlock exclusive discounts with GFWBA membership. Benefit from savings on various services and products tailored for the homebuilding industry. Join and save now!",
  openGraph: {
    title: "Maximize Savings with GFWBA Member Discounts for Homebuilders",
    description:
      "Explore the wide range of exclusive discounts available to GFWBA members, from services to products, designed to support and enhance your homebuilding business.",
    url: "https://gfwbatx.com/discounts",
    siteName: "Greater Fort Worth Builders Association",
    locale: "en_US",
    type: "website",
  },
};

export default function Discounts() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />
      <MemberBenefitsSection />
    </main>
  );
}
