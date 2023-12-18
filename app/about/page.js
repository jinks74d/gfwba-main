import { InnerHero, AboutSection } from "@/devlink";

export default function About() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/" }}
      />
      <AboutSection />
    </main>
  );
}
