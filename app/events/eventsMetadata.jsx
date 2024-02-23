// eventsMetadata.js

import getConfig from "next/config";

// Fetch the public runtime config
// const { publicRuntimeConfig } = getConfig();
// Now, extract `metadataBase` from `publicRuntimeConfig`
// const { metadataBase } = publicRuntimeConfig;

const metadataBase = "https://yourdomain.com";

const config = getConfig();
console.log(config); // Debug: See what getConfig() returns

export const Metadata = {
  title:
    "Upcoming GFWBA Events - Network, Learn & Grow in Fort Worth's Building Industry", // Page title
  description:
    "Join the Greater Fort Worth Builders Association (GFWBA) at our upcoming events. From networking to educational opportunities, discover how you can enhance your business, connect with professionals, and contribute to a thriving building industry in Fort Worth. Check out our event calendar now!", // Page description
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
      "Upcoming GFWBA Events - Network, Learn & Grow in Fort Worth's Building Industry",
    description:
      "Join the Greater Fort Worth Builders Association (GFWBA) at our upcoming events. From networking to educational opportunities, discover how you can enhance your business, connect with professionals, and contribute to a thriving building industry in Fort Worth. Check out our event calendar now!",
    url: `${metadataBase}/events`, // Canonical URL for the page
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
