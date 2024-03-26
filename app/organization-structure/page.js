// ORGANIZATION STRUCTURE PAGE

// Import necessary React components from the project's design system or component library.
import { InnerHero, OrganizationSection } from "@/devlink";
import AdSidebar from "@/components/AdSidebar";

// Import missing getConfig and publicRuntimeConfig for metadataBase usage.
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig; // Define the base URL for constructing absolute paths for images and canonical links.

// Define page-specific metadata to enhance SEO and provide rich information for social sharing.
export const metadata = {
  title: "Organization Structure of GFWBA - Building Strong Foundations",
  description:
    "Explore the organization structure of the Greater Fort Worth Builders Association (GFWBA), including our leadership, staff, and our commitment to the housing industry.",
  authors: [
    // Authors or contributors to the page content.
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
    // Open Graph metadata for enhancing content's appearance on social media.
    title:
      "GFWBA's Organization Structure: Leadership for the Homebuilding Industry",
    description:
      "Discover how the Greater Fort Worth Builders Association (GFWBA) is structured to support its members and the homebuilding industry, featuring our dedicated staff and leadership teams.",
    url: "https://gfwbatx.com/organization-structure", // The page's canonical URL.
    siteName: "Greater Fort Worth Builders Association",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${metadataBase}/public/images/gfwba-logo@2x.png`, // Path to a relevant image or logo for the page.
        alt: "GFWBA Logo", // Alternative text for the image.
      },
    ],
  },
};

// Functional component for the Organization Structure page.
export default function Organization() {
  const { url } = metadata.openGraph; // Destructure URL from openGraph metadata for use in canonical link.

  // Define structured data using Schema.org's JSON-LD format to improve SEO and site navigation.
  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1, // First item in the breadcrumb list (Home).
        item: {
          "@id": `${metadataBase}`, // Base URL of the site.
          name: "Home", // Label for the home page.
        },
      },
      {
        "@type": "ListItem",
        position: 2, // Second item in the breadcrumb list (current page).
        item: {
          "@id": `${metadataBase}/organization-structure`, // URL of the current page.
          name: "Organization Structure", // Label for the current page.
        },
      },
    ],
  };

  return (
    <>
      <head>
        {/* Embed the breadcrumb structured data within the page's head for SEO benefits. */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {/* Set the canonical URL for the page to avoid duplicate content issues. */}
        <link rel="canonical" href={url} />
      </head>

      <main>
        {/* Render components representing parts of the page. */}
        {/* InnerHero - A component for the page's introductory section, possibly with a hero image or banner. */}
        <InnerHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/signup" }}
        />
        {/* OrganizationSection - A component detailing the organizational structure of GFWBA. */}
        <OrganizationSection
          homeGridRightSlot={<AdSidebar />} // AdSidebar component for displaying ads
        />
      </main>
    </>
  );
}
