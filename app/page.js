// HOME PAGE

// import Head from "next/head";
import { HomeHero, HomeMain, Footer } from "@/devlink";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig;

export const metadata = {
  title:
    "Greater Fort Worth Builders Association - Leading Homebuilding Industry Advocacy",
  description:
    "Join GFWBA, the premier non-profit association for homebuilding professionals in Fort Worth. Advocacy, education, networking, and member services since 1945.",
  openGraph: {
    title:
      "Empowering Fort Worth's Homebuilding Industry - Greater Fort Worth Builders Association",
    description:
      "Discover how the Greater Fort Worth Builders Association champions the homebuilding industry through advocacy, education, and networking. Since 1945, connecting professionals for growth and community development.",
    url: "https://gfwbatx.com",
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

export default function Home() {
  // Schema.org JSON-LD for SEO
  // Define the Organization schema
  const organizationSchema = {
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "Greater Fort Worth Builders Association",
    url: `${metadataBase}`,
    logo: `${metadataBase}/images/gfwba-logo@2x.png`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-817-284-3566",
        contactType: "administrative support",
        areaServed: "US",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/GFWBA",
      "https://twitter.com/i/flow/login?redirect_after_login=%2FFWBuildersAssoc",
      "https://www.instagram.com/greaterfwbuildersassociation/",
      "https://www.linkedin.com/company/greater-fort-worth-builders-association/",
      // Add other social media profiles as needed
    ],
  };

  // Define the Website schema
  const websiteSchema = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    url: metadataBase, // Use the metadataBase for the URL
    name: "Greater Fort Worth Builders Association",
    potentialAction: {
      "@type": "SearchAction",
      target: `${metadataBase}/search?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  // End of Schema.org JSON-LD for SEO

  return (
    <>
      <head>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      </head>
      <main>
        <HomeHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/" }}
        />
        <HomeMain
          homeDirectory={{ href: "/directory" }}
          homeJoin={{ href: "/" }}
        />
      </main>
    </>
  );
}
