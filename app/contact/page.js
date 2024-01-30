import { InnerHero, ContactSection } from "@/devlink";

export default function Contact() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />
      <ContactSection />
    </main>
  );
}
