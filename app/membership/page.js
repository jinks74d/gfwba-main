import { InnerHero, MemberSection } from "@/devlink";

export const metadata = {
  title:
    "Join GFWBA: Unlock Exclusive Membership Benefits for Homebuilding Professionals",
  description:
    "Discover the benefits of GFWBA membership: educational programs, networking events, advocacy, and discounts. Enhance your homebuilding career in Fort Worth today.",
  openGraph: {
    title:
      "Greater Fort Worth Builders Association Membership: Elevate Your Business",
    description:
      "Explore the advantages of becoming a GFWBA member. From educational resources to networking opportunities, see how our membership can support and grow your homebuilding business.",
    url: "https://gfwbatx.com/membership",
    siteName: "Greater Fort Worth Builders Association",
    locale: "en_US",
    type: "website",
  },
};

export default function Membership() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />
      <MemberSection
        link={{ href: "/government-affairs" }}
        link2={{ href: "/signup" }}
      />
    </main>
  );
}
