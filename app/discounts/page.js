// DISCOUNTS PAGE

// Importing necessary components and the getConfig function from Next.js
import { InnerHero, MemberBenefitsSection } from "@/devlink"; // Custom components for page layout
import getConfig from "next/config"; // Function to access the Next.js public runtime configuration
import AdSidebar from "@/components/AdSidebar"; // Component for displaying ads

// Retrieving the public runtime configuration to use in the component
const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig; // Base URL from the config, used in constructing URLs

// Defining metadata for the page, used for SEO purposes
export const metadata = {
  title: "Exclusive Member Discounts at GFWBA: Save on Homebuilding Services",
  description:
    "Unlock exclusive discounts with GFWBA membership. Benefit from savings on various services and products tailored for the homebuilding industry. Join and save now!",
  authors: [
    // Array of authors for structured data purposes
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
    title: "Maximize Savings with GFWBA Member Discounts for Homebuilders",
    description:
      "Explore the wide range of exclusive discounts available to GFWBA members, from services to products, designed to support and enhance your homebuilding business.",
    url: "https://gfwbatx.com/discounts", // The canonical URL for the page
    siteName: "Greater Fort Worth Builders Association",
    locale: "en_US",
    type: "website",
    images: [
      // Images to represent the page when shared on social media
      {
        url: `${metadataBase}/public/images/gfwba-logo@2x.png`, // Constructed using the metadataBase for flexibility
        alt: "GFWBA Logo",
      },
    ],
  },
};

// Main functional component for the Discounts page
export default function Discounts() {
  const { url } = metadata.openGraph; // Destructuring to access the Open Graph URL

  // Breadcrumb schema for SEO, enhancing page discoverability and providing a navigation aid
  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1, // First item in the breadcrumb list (Home)
        item: {
          "@id": `${metadataBase}`, // URL for the home page
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2, // Second item (current page)
        item: {
          "@id": `${metadataBase}/discounts`, // URL for the current page
          name: "Member Benefits", // Name displayed in the breadcrumb trail
        },
      },
    ],
  };

  return (
    <>
      <head>
        {/* Structured data script for breadcrumbs, improving SEO */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {/* Canonical link tag to help prevent duplicate content issues */}
        <link rel="canonical" href={url + "/discounts"} />
      </head>

      <main>
        {/* InnerHero and MemberBenefitsSection components populate the main content of the page */}
        <InnerHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/signup" }}
        />
        <MemberBenefitsSection
          homeGridRightSlot={<AdSidebar />} // AdSidebar component for displaying ads
        />
      </main>
    </>
  );
}
