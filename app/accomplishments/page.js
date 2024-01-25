import { InnerHero, AdvocacySection } from "@/devlink";

export default function About() {
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
