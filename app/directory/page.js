import DirectoryItem from "@/components/DirectoryItem";
import BlueBtn from "@/components/BlueBtn";

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
      <section className="pt-24 px-24 flex">
        {/* MAIN DIRECTORY LEFT */}
        <div className="w-[25%] pt-28">
          <p className="text-red-400 text-lg">CATEGORIES GO HERE</p>
        </div>

        {/* MAIN DIRECTORY RIGHT */}
        <div className="w-[75%]">
          <div className="flex justify-between items-center pb-10">
            <h2>MEMBER DIRECTORY</h2>
            <p className="text-red-400 text-lg">SEARCH GOES HERE</p>
          </div>
          <div className="grid grid-cols-3">
            <DirectoryItem />
            <DirectoryItem />
            <DirectoryItem />
            <DirectoryItem />
            <DirectoryItem />
            <DirectoryItem />
            <DirectoryItem />
            <DirectoryItem />
            <DirectoryItem />
          </div>
          <BlueBtn text="load more" link="https://gfwba.com/directory" />
        </div>
      </section>
    </main>
  );
}
