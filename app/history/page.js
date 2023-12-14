import { InnerHero, HistorySection } from "@/devlink";

export default function History() {
  return (
    <main>
      <InnerHero heroDirectory={{ href: '/directory' }} heroJoin={{ href: '/' }} />
      <HistorySection />
    </main>
  );
}
