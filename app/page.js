import { HomeHero, HomeMain, Footer } from "@/devlink";

export const metadata = {
  title: "Greater Fort Worth Builders Association",
  description: "Your Success is our Mission",
};

export default function Home() {
  return (
    <main>
      <HomeHero heroDirectory={{ href: '/directory' }} heroJoin={{ href: '/' }} />
      <HomeMain homeDirectory={{ href: '/directory' }} homeJoin={{ href: '/' }} />
    </main>
  );
}
