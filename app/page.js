import { HomeHero, HomeMain, Footer } from "@/devlink";

export default function Home() {
  return (
    <main>
      <HomeHero heroDirectory={{ href: '/directory' }} heroJoin={{ href: '/' }} />
      <HomeMain homeDirectory={{ href: '/directory' }} homeJoin={{ href: '/' }} />
    </main>
  );
}
