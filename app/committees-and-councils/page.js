// COMMITTEES & COUNCILS PAGE

// Importing components and functions from dependencies
import {
  InnerHero, // Custom component for displaying a hero section
  Base21WebflowSection, // Custom component for a section that might be styled using Webflow conventions
  CommitteeSection, // Custom component for displaying committee-related content
  StaffSidebar, // Custom component for displaying staff information in a sidebar
} from "@/devlink";
import getConfig from "next/config"; // Function to access the Next.js public runtime configuration

// Retrieve public runtime configuration settings
const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig; // Base URL for metadata, used in canonical URLs and open graph images

// Define metadata for the Committees & Councils page for SEO optimization
export const metadata = {
  title: "Join GFWBA Committees & Councils - Empower Your Industry Impact",
  description:
    "Explore GFWBA's diverse committees and councils designed for members to foster industry relationships, influence policy, and engage in community building. Get involved today to shape the future of the building industry in Fort Worth.",
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
    // Open Graph metadata for enhancing content visibility on social media
    title:
      "Empowering Industry Leadership Through GFWBA Committees and Councils",
    description:
      "Dive into the heart of the building industry with GFWBA's Committees and Councils. Whether it's through education, government affairs, or community service, your involvement can drive change and innovation. Join now to make a meaningful impact.",
    url: `${metadataBase}/committees-and-councils`, // Canonical URL of the page
    siteName: "Greater Fort Worth Builders Association",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${metadataBase}/public/images/gfwba-logo@2x.png`,
        alt: "GFWBA Logo", // Descriptive text for the image
      },
    ],
  },
};

// Functional component for the Committees & Councils page
export default function About() {
  const { url } = metadata.openGraph; // Extract URL from metadata for canonical link

  // Breadcrumb schema for structured data, enhancing navigation and SEO
  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1, // Represents the home page in the breadcrumb trail
        item: {
          "@id": `${metadataBase}`,
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2, // Represents the current page in the breadcrumb trail
        item: {
          "@id": `${metadataBase}/committees-and-councils`,
          name: "Committees & Councils",
        },
      },
    ],
  };

  return (
    <>
      <head>
        {/* Structured data for breadcrumbs implemented using JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {/* Canonical URL for the page to help prevent duplicate content issues */}
        <link rel="canonical" href={url + "/committees-and-councils"} />
      </head>

      <main>
        {/* Components for page layout and content */}
        <InnerHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/signup" }}
        />
        <Base21WebflowSection
          baseHeading="COMMITTEES & COUNCILS"
          baseSubheading=""
          baseGridLeftSlot={<CommitteeSection />}
          baseSideHeading="ASSOCIATION STAFF"
          homeGridRightSlot={<StaffSidebar />}
        />
      </main>
    </>
  );
}
