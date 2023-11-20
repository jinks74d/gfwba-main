import { InnerHero } from "@/devlink";

// *** METADATA
export const metadata = {
  title: "GFWBA Member Directory",
  description: "A searchable directory of GFWBA members",
  openGraph: {
    title: "GFWBA Member Directory",
    description: "A searchable directory of GFWBA members",
    type: "website",
    images: [
      {
        // *** TODO: Replace with actual image
        url: "https://gfwba.com/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "GFWBA Member Directory",
      },
    ],
  },
  twitter: {
    handle: "@gfwba",
    site: "@gfwba",
    cardType: "summary_large_image",
  },
  // *** create schema.org structured data here
  // *** https://schema.devlink.design or https://schema.org/docs/full.html (for reference)
  schema: {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: "GFWBA Member Directory",
    url: "https://gfwba.com/directory",
    description: "A searchable directory of GFWBA members",
  },
  favicon: {
    src: "/favicon.ico",
    type: "image/x-icon",
  },
};

export default function Directory() {
  return (
    <main>
      <InnerHero />
    </main>
  );
}
