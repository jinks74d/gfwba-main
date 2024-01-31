import { InnerHero, FaqSection } from "@/devlink";

export default function Discounts() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />
      <FaqSection />
    </main>
  );
}
