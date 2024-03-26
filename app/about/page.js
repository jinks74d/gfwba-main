// ABOUT PAGE

// Import React components and getConfig from Next.js
import { InnerHero, AboutSection } from "@/devlink"; // Custom components for the About page layout
import getConfig from "next/config"; // Used to access the public runtime configuration
import AdSidebar from "@/components/AdSidebar";

// Retrieve public runtime configuration, including the base URL for metadata
const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig; // Base URL used in metadata, e.g., for canonical URLs and open graph images

// Define metadata for the About page, including SEO and Open Graph details
export const metadata = {
  title: "About GFWBA: Advocating for Fort Worth's Homebuilding Industry", // Title of the page for SEO purposes
  description:
    "Learn about the Greater Fort Worth Builders Association (GFWBA), our mission, history, and significant victories for the homebuilding industry in Fort Worth, Texas.", // Description for SEO
  authors: [
    // Authors or contributors to the page content
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
    // Open Graph metadata for social sharing
    title:
      "Greater Fort Worth Builders Association: Shaping the Future of Homebuilding", // OG title
    description:
      "Discover the mission, achievements, and impact of the Greater Fort Worth Builders Association on Fort Worth's homebuilding sector. Join us in our commitment to industry excellence.", // OG description
    url: "https://gfwbatx.com/about", // Canonical URL of the About page
    siteName: "Greater Fort Worth Builders Association", // Website name for OG data
    locale: "en_US", // Locale of the content
    type: "website", // Type of content
    images: [
      // Images for OG sharing
      {
        url: `${metadataBase}/public/images/gfwba-logo@2x.png`, // URL of the image to share
        alt: "GFWBA Logo", // Alternative text for the image
      },
    ],
  },
};

// Functional component for the About page
export default function About() {
  const { url } = metadata.openGraph; // Extract the canonical URL from the metadata

  // Define breadcrumb schema for structured data (SEO)
  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1, // Position in the breadcrumb list
        item: {
          "@id": `${metadataBase}`, // URL of the home page
          name: "Home", // Name of the breadcrumb
        },
      },
      {
        "@type": "ListItem",
        position: 2, // Position in the breadcrumb list for the About page
        item: {
          "@id": `${metadataBase}/about`, // Canonical URL of the About page
          name: "About", // Name of the breadcrumb
        },
      },
    ],
  };

  return (
    <>
      <head>
        {/* Insert structured data (breadcrumb schema) for SEO */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {/* Canonical link to help with SEO and prevent duplicate content */}
        <link rel="canonical" href={url} />
      </head>
      <main>
        {/* InnerHero and AboutSection components display page content */}
        <InnerHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/signup" }}
        />
        <AboutSection
          homeGridRightSlot={<AdSidebar />} // AdSidebar component for displaying ads
        />
      </main>
    </>
  );
}
