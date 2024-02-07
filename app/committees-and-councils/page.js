import {
  InnerHero,
  Base21WebflowSection,
  CommitteeSection,
  StaffSidebar,
} from "@/devlink";

export const metadata = {
  title: "",
  description: "",
};

export default function About() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />
      <Base21WebflowSection
        baseHeading="COMMITTEES & COUNCILS"
        baseSubheading=""
        baseGridLeftSlot={<CommitteeSection />}
        baseSideHeading="ASSOCIATION STAFF"
        homeGridRightSlot={<StaffSidebar />}
      />
    </main>
  );
}
