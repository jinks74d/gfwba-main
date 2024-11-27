"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Link from "next/link";

// THIS IS A CHANGE FOR GIT HUB MERGE TEST

export default function AdSidebar() {
  // Use an object to manage open state of multiple lightboxes
  const [open, setOpen] = useState({});

  // Function to handle opening a specific lightbox
  const handleOpen = (id) => setOpen({ ...open, [id]: true });

  // Function to handle closing a specific lightbox
  const handleClose = (id) => setOpen({ ...open, [id]: false });

  return (
    <>
      {/* Each lightbox section now has a unique identifier */}
      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="border border-gray-400 side-img">
          {/* <button type="button" onClick={() => handleOpen("lightbox1")}> */}
          <a href="https://texasbuilders.org" target="_blank">
            <Image
              src="/images/ads/2023Contracts_w-qr1pgx700-min.jpg"
              alt="2023 Contracts"
              width={300}
              height={600}
            />
          </a>
          {/* </button> */}

          {/* <Lightbox
            open={open["lightbox1"]}
            close={() => handleClose("lightbox1")}
            slides={[{ src: "/images/ads/2023Contracts_w-qr1pgx700-min.jpg" }]}
          /> */}
        </div>
        <a href="https://teaxasbuilders.org">TexasBuilders.org</a>
      </div>

      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="border border-gray-400 side-img">
          <button type="button" onClick={() => handleOpen("lightbox2")}>
            <Image
              src="/images/ads/2024ModelSafety_HalfPg.jpg"
              alt="2023 Contracts"
              width={300}
              height={600}
            />
          </button>

          <Lightbox
            open={open["lightbox2"]}
            close={() => handleClose("lightbox2")}
            slides={[{ src: "/images/ads/2024ModelSafety_HalfPg.jpg" }]}
          />
        </div>
        <p>Click Image to Enlarge</p>
      </div>

      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="border border-gray-400 side-img">
          <button type="button" onClick={() => handleOpen("lightbox3")}>
            <Image
              src="/images/ads/TABInsuranceProgram-w-QRx720-min.png"
              alt="2023 Contracts"
              width={300}
              height={600}
            />
          </button>

          <Lightbox
            open={open["lightbox3"]}
            close={() => handleClose("lightbox3")}
            slides={[
              { src: "/images/ads/TABInsuranceProgram-w-QRx720-min.png" },
            ]}
          />
        </div>
        <p>Click Image to Enlarge</p>
      </div>

      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="border border-gray-400 side-img">
          <button type="button" onClick={() => handleOpen("lightbox4")}>
            <Image
              src="/images/ads/TAB-Q4'22-Flyer-min.jpg"
              alt="2023 Contracts"
              width={300}
              height={600}
            />
          </button>

          <Lightbox
            open={open["lightbox4"]}
            close={() => handleClose("lightbox4")}
            slides={[{ src: "/images/ads/TAB-Q4'22-Flyer-min.jpg" }]}
          />
        </div>
        <p>Click Image to Enlarge</p>
      </div>

      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="border border-gray-400 side-img">
          <button type="button" onClick={() => handleOpen("lightbox5")}>
            <Image
              src="/images/ads/generic-savings-postcard-update-2023-crops_Page_1.png"
              alt="2023 Contracts"
              width={300}
              height={600}
            />
          </button>

          <Lightbox
            open={open["lightbox5"]}
            close={() => handleClose("lightbox5")}
            slides={[
              {
                src: "/images/ads/generic-savings-postcard-update-2023-crops_Page_1.png",
              },
            ]}
          />
        </div>
        <p>Click Image to Enlarge</p>
      </div>

      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="border border-gray-400 side-img">
          <button type="button" onClick={() => handleOpen("lightbox6")}>
            <Image
              src="/images/ads/2024-SBGP-Clickable-ad-min.png"
              alt="2023 Contracts"
              width={300}
              height={600}
            />
          </button>

          <Lightbox
            open={open["lightbox6"]}
            close={() => handleClose("lightbox6")}
            slides={[{ src: "/images/ads/2024-SBGP-Clickable-ad-min.png" }]}
          />
        </div>
        <Link href="https://growthgen.typeform.com/to/bSLHKJWO">
          Click Here to Redeem
        </Link>
      </div>

      {/* Repeat for each lightbox, ensuring to change the identifier */}
    </>
  );
}
