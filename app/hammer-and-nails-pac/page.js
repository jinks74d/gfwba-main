import { InnerHero, HammerNailsSection } from "@/devlink";

export default function HammerAndNails() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: '/directory' }}
        heroJoin={{ href: '/signup' }}
      />
      <HammerNailsSection />
    </main>
  );
}
