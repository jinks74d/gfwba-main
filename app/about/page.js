import { InnerHero, AboutSection } from "@/devlink";

export const metadata = {
  title: "About the Greater Fort Worth Builders Association",
  description:
    "The Greater Fort Worth Builders Association (GFWBA) is a non-profit trade association representing hundreds of companies affiliated within the homebuilding industry throughout the Greater Fort Worth region.",
};

export default function About() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: '/directory' }}
        heroJoin={{ href: '/signup' }}
      />
      <AboutSection />
    </main>
  );
}
