// MEMBERSHIP PAGE

// Import required components and functions
import { InnerHero, MemberSection } from "@/devlink"; // Custom components for displaying page sections
import getConfig from "next/config"; // Function to access public runtime configuration

// Retrieve public runtime configuration settings
const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig; // Base URL used in metadata for canonical URLs and Open Graph images

// Define page-specific metadata for SEO optimization
export const metadata = {
  title:
    "Join GFWBA: Unlock Exclusive Membership Benefits for Homebuilding Professionals", // The title of the membership page
  description:
    "Discover the benefits of GFWBA membership: educational programs, networking events, advocacy, and discounts. Enhance your homebuilding career in Fort Worth today.", // A brief description of the page content and membership benefits
  openGraph: {
    title:
      "Greater Fort Worth Builders Association Membership: Elevate Your Business", // The title used for social sharing (Open Graph)
    description:
      "Explore the advantages of becoming a GFWBA member. From educational resources to networking opportunities, see how our membership can support and grow your homebuilding business.", // The description used for social sharing (Open Graph)
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
    url: `${metadataBase}/membership`, // The canonical URL of the membership page
    siteName: "Greater Fort Worth Builders Association", // The name of the website or organization
    locale: "en_US", // The locale of the page content
    type: "website", // The type of content (usually "website" for generic pages)
    images: [
      // Images associated with the page for social sharing
      {
        url: `${metadataBase}/public/images/gfwba-logo@2x.png`, // URL to the image
        alt: "GFWBA Logo", // Alt text for the image
      },
    ],
  },
};

// Functional component for the Membership page
export default function Membership() {
  const { url } = metadata.openGraph; // Extract the canonical URL from metadata for the <link rel="canonical"> tag

  // Define the BreadcrumbList schema for structured data to enhance SEO and navigation clarity
  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1, // Indicates the first item in the breadcrumb trail (Home page)
        item: {
          "@id": `${metadataBase}`, // URL of the home page
          name: "Home", // Label for the home page link
        },
      },
      {
        "@type": "ListItem",
        position: 2, // Indicates the second item in the breadcrumb trail (Membership page)
        item: {
          "@id": `${metadataBase}/membership`, // URL of the membership page
          name: "Membership", // Corrected label for the membership page link (previously mislabeled as "History")
        },
      },
    ],
  };

  return (
    <>
      <head>
        {/* Embedding structured data for breadcrumbs using JSON-LD format */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {/* Setting the canonical URL for the membership page to avoid duplicate content issues */}
        <link rel="canonical" href={url} />
      </head>

      <main>
        {/* InnerHero component to display the top hero section of the membership page */}
        <InnerHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/signup" }}
        />
        {/* MemberSection component to display membership information and benefits */}
        <MemberSection
          link={{ href: "/government-affairs" }} // Link to the government affairs page
          link2={{ href: "/signup" }} // Link to the signup page
        />
      </main>
    </>
  );
}
