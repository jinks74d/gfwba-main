import { InnerHero, OrganizationSection } from "@/devlink";

export default function Organization() {
  return (
    <main>
      <InnerHero heroDirectory={{ href: '/directory' }} heroJoin={{ href: '/' }} />
      <OrganizationSection />
    </main>
  );
}
