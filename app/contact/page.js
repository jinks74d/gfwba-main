//CONTACT PAGE

import { InnerHero, ContactSection } from "@/devlink";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig;

export const metadata = {
  title: "Contact Us | Greater Fort Worth Builders Association - Connect Now",
  description:
    "Reach out to the Greater Fort Worth Builders Association for inquiries, support, and services. Visit our contact page for all the ways you can connect with us in Fort Worth.",
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
    title: "Contact Us | Greater Fort Worth Builders Association - Connect Now",
    description:
      "Reach out to the Greater Fort Worth Builders Association for inquiries, support, and services. Visit our contact page for all the ways you can connect with us in Fort Worth.",
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

export default function Contact() {
  const { url } = metadata.openGraph;

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
          "@id": `${metadataBase}/contact`,
          name: "History",
        },
      },
    ],
  };

  return (
    <>
      <head>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <link rel="canonical" href={url + "/contact"} />
      </head>

      <main>
        <InnerHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/signup" }}
        />
        <ContactSection />
      </main>
    </>
  );
}
