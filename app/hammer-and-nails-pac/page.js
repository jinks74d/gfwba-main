// HAMMER AND NAILS PAGE

// Import necessary components and configurations
import { InnerHero, HammerNailsSection } from "@/devlink"; // Custom components for page layout
import getConfig from "next/config"; // Function to access public runtime configuration
import AdSidebar from "@/components/AdSidebar"; // Component for displaying ads

// Retrieve runtime configuration to use in the application, such as base URL for metadata
const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig; // Base URL for constructing full paths for assets and links

// Define metadata for the "Hammer and Nails PAC" page to enhance SEO
export const metadata = {
  title: "Hammer and Nails PAC: Political Advocacy for Fort Worth Homebuilding", // Page title for SEO and browser tab
  description:
    "Join the Hammer and Nails PAC by GFWBA to support political candidates who champion the homebuilding industry in Fort Worth. Make a difference today.", // Page description for SEO and social sharing
  authors: [
    // Information about the authors or responsible entities for the page content
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
    // Open Graph data to define how the page is represented when shared on social media
    title:
      "Empower Fort Worth's Homebuilding Industry with Hammer and Nails PAC",
    description:
      "Get involved with the Greater Fort Worth Builders Association's Hammer and Nails PAC. Support local and state candidates who advocate for the building industry's growth and success.",
    url: "https://gfwbatx.com/hammer-and-nails-pac", // Canonical URL of the page
    siteName: "Greater Fort Worth Builders Association",
    locale: "en_US",
    type: "website",
    images: [
      // Images to represent the page when shared on social media
      {
        url: `${metadataBase}/public/images/gfwba-logo@2x.png`,
        alt: "GFWBA Logo",
      },
    ],
  },
};

// Functional component for the "Hammer and Nails PAC" page
export default function HammerAndNails() {
  const { url } = metadata.openGraph; // Extract the page URL from metadata for canonical link

  // Breadcrumb schema for structured data, improving SEO and aiding site navigation
  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1, // First breadcrumb for "Home"
        item: {
          "@id": `${metadataBase}`, // URL for "Home"
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2, // Second breadcrumb for the current page
        item: {
          "@id": `${metadataBase}/hammer-and-nails-pac`, // URL for "Hammer and Nails PAC"
          name: "Hammer and Nails PAC",
        },
      },
    ],
  };

  return (
    <>
      <head>
        {/* Structured data for breadcrumbs to assist search engines and user navigation */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {/* Canonical URL to avoid duplicate content and improve SEO */}
        <link rel="canonical" href={url + "/hammer-and-nails-pac"} />
      </head>

      <main>
        {/* InnerHero component to display a hero section specific to the page */}
        <InnerHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/signup" }}
        />
        {/* HammerNailsSection component to display the main content of the "Hammer and Nails PAC" page */}
        <HammerNailsSection
          homeGridRightSlot={<AdSidebar />} // AdSidebar component for displaying ads
        />
      </main>
    </>
  );
}
