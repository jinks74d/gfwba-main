// HOME PAGE

// import Head from "next/head";
import { HomeHero, HomeMain, Footer } from "@/devlink";
import AdSidebar from "@/components/AdSidebar";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig;

export const metadata = {
  title:
    "Greater Fort Worth Builders Association - Leading Homebuilding Industry Advocacy",
  description:
    "Join GFWBA, the premier non-profit association for homebuilding professionals in Fort Worth. Advocacy, education, networking, and member services since 1945.",
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
      "Empowering Fort Worth's Homebuilding Industry - Greater Fort Worth Builders Association",
    description:
      "Discover how the Greater Fort Worth Builders Association champions the homebuilding industry through advocacy, education, and networking. Since 1945, connecting professionals for growth and community development.",
    url: `${metadataBase}`,
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
  const { url } = metadata.openGraph;

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

  // Define the LocalBusiness schema
  const localBusinessSchema = {
    "@context": "http://schema.org",
    "@type": "LocalBusiness",
    name: "Greater Fort Worth Builders Association",
    address: {
      "@type": "PostalAddress",
      streetAddress: "100 E. 15th Street, Suite 600",
      addressLocality: "Fort Worth",
      addressRegion: "TX",
      postalCode: "76102",
      addressCountry: "US",
    },
    telephone: "+1-817-284-3566",
    url: metadataBase,
  };

  // Define the BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://gfwbatx.com",
      },
    ],
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
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {/* <link rel="canonical" href={url} /> */}
      </head>
      <main>
        <HomeHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/" }}
        />
        <HomeMain
          homeDirectory={{ href: "/directory" }}
          homeJoin={{ href: "/" }}
          homeGridRightSlot={<AdSidebar />} // AdSidebar component for displaying ads
        />
      </main>
    </>
  );
}
