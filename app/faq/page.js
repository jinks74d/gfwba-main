//FAQ PAGE

// Import necessary components and the configuration function from Next.js and custom components
import { InnerHero, FaqSection } from "@/devlink"; // Custom UI components for rendering specific sections of the FAQ page
import getConfig from "next/config"; // Function to access the Next.js public runtime configuration

// Retrieve public runtime configuration to use throughout the component
const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig; // Base URL for building absolute URLs (for canonical tags, OG images, etc.)

// Define static metadata for the FAQ page, used for SEO purposes
export const metadata = {
  title:
    "FAQs: Joining GFWBA - Membership Benefits & Eligibility | Greater Fort Worth Builders Association",
  description:
    "Discover the benefits of joining the GFWBA, membership eligibility, and more in our FAQ section. Learn how we support the homebuilding industry in Fort Worth through advocacy, education, and networking.",
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
    // Open Graph protocol metadata to enhance link sharing on social platforms
    title:
      "Frequently Asked Questions (FAQs) - Greater Fort Worth Builders Association",
    description:
      "Explore our FAQ section to find answers about joining the Greater Fort Worth Builders Association, the benefits of membership, and how we advocate for the homebuilding industry.",
    url: `${metadataBase}/faq`, // The canonical URL for the FAQ page
    siteName: "Greater Fort Worth Builders Association",
    locale: "en_US",
    type: "website",
    images: [
      // Image(s) to represent the page when shared on social media
      {
        url: `${metadataBase}/public/images/gfwba-logo@2x.png`,
        alt: "GFWBA Logo",
      },
    ],
  },
};

// Main functional component for the FAQ page
export default function Discounts() {
  // Note: The function name should probably be `FAQ` to match the page's purpose
  const { url } = metadata.openGraph; // Extract the canonical URL from the metadata

  // Breadcrumb schema for structured data, aiding in SEO and user navigation
  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      // List of breadcrumbs leading to the current page
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
          "@id": `${metadataBase}/faq`, // The current page should be `/faq`, not `/history`
          name: "FAQ",
        },
      },
    ],
  };

  // FAQPage schema to structure the FAQs for search engines, enhancing content discoverability
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      // Array of questions and answers
      // Each question-answer pair is detailed here
    ],
  };

  return (
    // React Fragment to return multiple elements without adding extra nodes to the DOM
    <>
      <head>
        {/* Schema.org structured data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqPageSchema)}
        </script>
        {/* Canonical link element for the FAQ page */}
        <link rel="canonical" href={url + "/faq"} />
      </head>

      <main>
        {/* InnerHero and FaqSection components render respective sections of the FAQ page */}
        <InnerHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/signup" }}
        />
        <FaqSection />
      </main>
    </>
  );
}
