// HISTORY PAGE

import { InnerHero, HistorySection } from "@/devlink";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig;

export const metadata = {
  title: "History of GFWBA | Building Fort Worth Since 1945",
  description:
    "Discover the Greater Fort Worth Builders Association's history since 1945. Learn about our journey, from the foundation by home builders to our pivotal role in Fort Worth's housing industry.",
  authors: [
    {
      name: "Farside Web Development",
      url: "https://farsidedev.com",
    },
    {
      name: "Greater Fort Worth Builders Association",
      url: "https://gfwbatx.com",
    },
  ],
  openGraph: {
    title:
      "Greater Fort Worth Builders Association: A Rich History of Building Community Since 1945",
    description:
      "Explore the legacy of the Greater Fort Worth Builders Association (GFWBA) from its founding in 1945. Discover how 200 home builders united to shape the future of housing in Fort Worth, Texas, and the surrounding counties. Learn about our milestones, membership growth, and our commitment to the housing industry and community development.",
    url: `${metadataBase}/history`,
    siteName: "Greater Fort Worth Builders Association",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${metadataBase}/public/images/gfwba-logo@2x.png`,
        alt: "GFWBA Logo",
      },
    ],
  },
};

export default function History() {
  const { url } = metadata.openGraph;

  // Start of Schema.org JSON-LD for SEO
  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": `${metadataBase}`,
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${metadataBase}/history`,
          name: "History",
        },
      },
    ],
  };
  // End of Schema.org JSON-LD for SEO

  return (
    <>
      <head>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </head>
      <link rel="canonical" href={url + "/history"} />
      <main>
        <InnerHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/signup" }}
        />
        <HistorySection />
      </main>
    </>
  );
}
