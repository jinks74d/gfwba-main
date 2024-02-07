import { InnerHero, HistorySection } from "@/devlink";

export const metadata = {
  title: "History of GFWBA | Building Fort Worth Since 1945",
  description:
    "Discover the Greater Fort Worth Builders Association's history since 1945. Learn about our journey, from the foundation by home builders to our pivotal role in Fort Worth's housing industry.",
  openGraph: {
    title:
      "Greater Fort Worth Builders Association: A Rich History of Building Community Since 1945",
    description:
      "Explore the legacy of the Greater Fort Worth Builders Association (GFWBA) from its founding in 1945. Discover how 200 home builders united to shape the future of housing in Fort Worth, Texas, and the surrounding counties. Learn about our milestones, membership growth, and our commitment to the housing industry and community development.",
    url: "https://gfwbatx.com/history",
    siteName: "Greater Fort Worth Builders Association",
    locale: "en_US",
    type: "website",
  },
};

export default function History() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />
      <HistorySection />
    </main>
  );
}
