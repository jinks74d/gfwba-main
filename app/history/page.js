// HISTORY PAGE

// Import necessary components and functions
import { InnerHero, HistorySection } from "@/devlink"; // Custom components used in the page
import getConfig from "next/config"; // Function to access public runtime configuration
import AdSidebar from "@/components/AdSidebar"; // Component for displaying ads

// Retrieve public runtime configuration settings
const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig; // Base URL for metadata, used in canonical URLs and open graph images

// Define page-specific metadata for SEO optimization
export const metadata = {
  title: "History of GFWBA | Building Fort Worth Since 1945", // Page title
  description:
    "Discover the Greater Fort Worth Builders Association's history since 1945. Learn about our journey, from the foundation by home builders to our pivotal role in Fort Worth's housing industry.", // Page description
  authors: [
    // Authors of the content
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
    // Open Graph data for social media sharing
    title:
      "Greater Fort Worth Builders Association: A Rich History of Building Community Since 1945",
    description:
      "Explore the legacy of the Greater Fort Worth Builders Association (GFWBA) from its founding in 1945. Discover how 200 home builders united to shape the future of housing in Fort Worth, Texas, and the surrounding counties. Learn about our milestones, membership growth, and our commitment to the housing industry and community development.",
    url: `${metadataBase}/history`, // Canonical URL for the page
    siteName: "Greater Fort Worth Builders Association",
    locale: "en_US",
    type: "website",
    images: [
      // Images for Open Graph sharing
      {
        url: `${metadataBase}/public/images/gfwba-logo@2x.png`,
        alt: "GFWBA Logo",
      },
    ],
  },
};

// Functional component for the History page
export default function History() {
  const { url } = metadata.openGraph; // Extract URL from metadata for canonical tag

  // Breadcrumb schema for structured data, improving SEO and user navigation
  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1, // First breadcrumb (Home)
        item: {
          "@id": `${metadataBase}`,
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2, // Second breadcrumb (History page)
        item: {
          "@id": `${metadataBase}/history`,
          name: "History",
        },
      },
    ],
  };

  return (
    <>
      <head>
        {/* Schema.org structured data for breadcrumbs */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {/* Canonical URL for the page to avoid duplicate content issues */}
        <link rel="canonical" href={url + "/history"} />
      </head>

      <main>
        {/* InnerHero and HistorySection components for page content */}
        <InnerHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/signup" }}
        />
        <HistorySection
          homeGridRightSlot={<AdSidebar />} // AdSidebar component for displaying ads
        />
      </main>
    </>
  );
}
