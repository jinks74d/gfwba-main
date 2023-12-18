import { InnerHero, MemberSection } from "@/devlink";

export const metadata = {
  title: "Membership in the Greater Fort Worth Builders Association",
  description:
    "Are you ready to become a member of the Greater Fort Worth Builders Association? We have a variety of membership options available.",
};

export default function Membership() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/" }}
      />
      <MemberSection
        link={{ href: "/government-affairs" }}
        link2={{ href: "/" }}
      />
    </main>
  );
}
