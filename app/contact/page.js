//CONTACT PAGE

// Import necessary components and functions from Next.js and other libraries
import { InnerHero, ContactSection } from "@/devlink"; // Custom components for the contact page
import getConfig from "next/config"; // Function to access public runtime config in Next.js

// Retrieve public runtime configuration settings
const { publicRuntimeConfig } = getConfig();
const { metadataBase } = publicRuntimeConfig; // Base URL for the site, used in metadata and breadcrumb schema

// Define metadata for the contact page
export const metadata = {
  title: "Contact Us | Greater Fort Worth Builders Association - Connect Now",
  description:
    "Reach out to the Greater Fort Worth Builders Association for inquiries, support, and services. Visit our contact page for all the ways you can connect with us in Fort Worth.",
  authors: [
    // Authors or responsible entities for the content of the page
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
    // Open Graph metadata to enhance link sharing on social media
    title: "Contact Us | Greater Fort Worth Builders Association - Connect Now",
    description:
      "Reach out to the Greater Fort Worth Builders Association for inquiries, support, and services. Visit our contact page for all the ways you can connect with us in Fort Worth.",
    url: `${metadataBase}/history`, // URL for the page, seems like a mistake (should be /contact instead of /history)
    siteName: "Greater Fort Worth Builders Association",
    locale: "en_US",
    type: "website",
    images: [
      // Array of images for social media previews
      {
        url: `${metadataBase}/public/images/gfwba-logo@2x.png`,
        alt: "GFWBA Logo",
      },
    ],
  },
};

// Contact page component
export default function Contact() {
  const { url } = metadata.openGraph; // Retrieve the URL from the metadata for canonical tag

  // Define the breadcrumb schema for structured data, enhancing SEO and site navigation clarity
  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": `${metadataBase}`, // Base URL indicating the home page
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${metadataBase}/contact`, // URL for the current contact page
          name: "Contact GFWBA", // Name of the current page
        },
      },
    ],
  };

  return (
    <>
      <head>
        {/* Define the metadata and structured data for the contact page */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {/* Define the canonical URL for the contact page */}
        <link rel="canonical" href={url + "/contact"} />
      </head>

      <main>
        {/* Render the InnerHero and ContactSection components to display the page's content */}
        <InnerHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/signup" }}
        />
        <ContactSection />
      </main>
    </>
  );
}
