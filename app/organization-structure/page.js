// ORGANIZATION STRUCTURE PAGE

import { InnerHero, OrganizationSection } from "@/devlink";

export const metadata = {
  title: "Organization Structure of GFWBA - Building Strong Foundations",
  description:
    "Explore the organization structure of the Greater Fort Worth Builders Association (GFWBA), including our leadership, staff, and our commitment to the housing industry.",
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
      "GFWBA's Organization Structure: Leadership for the Homebuilding Industry",
    description:
      "Discover how the Greater Fort Worth Builders Association (GFWBA) is structured to support its members and the homebuilding industry, featuring our dedicated staff and leadership teams.",
    url: "https://gfwbatx.com/organization-structure",
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

export default function Organization() {
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
          "@id": `${metadataBase}/organization-structure`,
          name: "Organization Structure",
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
      <link rel="canonical" href={url + "/organization-structure"} />
      <main>
        <InnerHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/signup" }}
        />
        <OrganizationSection />
      </main>
    </>
  );
}
