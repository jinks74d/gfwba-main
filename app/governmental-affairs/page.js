import { InnerHero, AdvocacySection } from "@/devlink";

export default function GovernmentAffairs() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: '/directory' }}
        heroJoin={{ href: '/signup' }}
      />
      <AdvocacySection />
    </main>
  );
}
