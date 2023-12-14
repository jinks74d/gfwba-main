import { InnerHero, MemberSection } from "@/devlink";

export default function Membership() {
  return (
    <main>
      <InnerHero heroDirectory={{ href: '/directory' }} heroJoin={{ href: '/' }} />
      <MemberSection
        link={{ href: '/government-affairs' }}
        link2={{ href: '/' }}
      />
    </main>
  );
}
