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
          <a href="https://drive.google.com/file/d/1QRvLWUYgCtsKpuJKh2zgUhmbBCCH6CP1/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/ads/MARKETING GUIDE 2025 (7)_Page_01.png"
              alt="2025 Marketing Guide"
              width={300}
              height={600}
            />
          </a>

          {/* <Lightbox
            open={open["lightbox1"]}
            close={() => handleClose("lightbox1")}
            slides={[{ src: "/images/ads/2023Contracts_w-qr1pgx700-min.jpg" }]}
          /> */}
        </div>
        <button
          type="button"
          onClick={() => window.open('public/images/ads/MARKETING GUIDE 2025 (7).pdf', '_blank')}
        >
          Open PDF
        </button>
        <a href="https://drive.google.com/file/d/1QRvLWUYgCtsKpuJKh2zgUhmbBCCH6CP1/view?usp=drive_link" target="_blank" rel="noopener noreferrer">2025 Marketing Guide</a>
        <a href="https://drive.google.com/file/d/1fF77CAVzQ4LQ8pVwUqhoD3KXblSvQMAA/view?usp=drive_link" target="_blank" rel="noopener noreferrer">Sponsor Commit Form</a>
      </div>

      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="border border-gray-400 side-img">
          {/* <button type="button" onClick={() => handleOpen("lightbox1")}> */}
          <a href="https://texasbuilders.org/contracts-package/" target="_blank">
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
        <a href="https://texasbuilders.org/contracts-package/" target="_blank">Learn More</a>
      </div>

      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="border border-gray-400 side-img">
          {/* <button type="button" onClick={() => handleOpen("lightbox2")}> */}
          <a href="https://www.texasbuilders.org/model-construction-safety-program-and-jobsite-safety-standards-package/" target="_blank">
            <Image
              src="/images/ads/2024ModelSafety_HalfPg.jpg"
              alt="2023 Contracts"
              width={300}
              height={600}
            />
            </a>
          {/* </button> */}

          {/* <Lightbox
            open={open["lightbox2"]}
            close={() => handleClose("lightbox2")}
            slides={[{ src: "/images/ads/2024ModelSafety_HalfPg.jpg" }]}
          /> */}
        </div>
        <a href="https://www.texasbuilders.org/model-construction-safety-program-and-jobsite-safety-standards-package/" target="_blank">Learn More</a>
      </div>

      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="border border-gray-400 side-img">
          {/* <button type="button" onClick={() => handleOpen("lightbox3")}> */}
          <a href="https://www.texasbuilders.org/tabs-comprehensive-insurance-program/" target="_blank">
            <Image
              src="/images/ads/TABInsuranceProgram-w-QRx720-min.png"
              alt="2023 Contracts"
              width={300}
              height={600}
            />
            </a>
          {/* </button> */}

          {/* <Lightbox
            open={open["lightbox3"]}
            close={() => handleClose("lightbox3")}
            slides={[
              { src: "/images/ads/TABInsuranceProgram-w-QRx720-min.png" },
            ]}
          /> */}
        </div>
        <a href="https://www.texasbuilders.org/tabs-comprehensive-insurance-program/" target="_blank">Learn More</a>
      </div>

      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="border border-gray-400 side-img">
          {/* <button type="button" onClick={() => handleOpen("lightbox4")}> */}
          <a href="https://hbarebates.com/registration/" target="_blank">
            <Image
              src="/images/ads/TAB-Q4'22-Flyer-min.jpg"
              alt="2023 Contracts"
              width={300}
              height={600}
            />
            </a>
          {/* </button> */}

          {/* <Lightbox
            open={open["lightbox4"]}
            close={() => handleClose("lightbox4")}
            slides={[{ src: "/images/ads/TAB-Q4'22-Flyer-min.jpg" }]}
          /> */}
        </div>
        <a href="https://hbarebates.com/registration/" target="_blank">Learn More</a>
      </div>

      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="border border-gray-400 side-img">
          {/* <button type="button" onClick={() => handleOpen("lightbox5")}> */}
          <a href="https://www.nahb.org/nahb-community/member-benefits/savings" target="_blank">
            <Image
              src="/images/ads/generic-savings-postcard-update-2023-crops_Page_1.png"
              alt="2023 Contracts"
              width={300}
              height={600}
            />
            </a>
          {/* </button> */}

          {/* <Lightbox
            open={open["lightbox5"]}
            close={() => handleClose("lightbox5")}
            slides={[
              {
                src: "/images/ads/generic-savings-postcard-update-2023-crops_Page_1.png",
              },
            ]}
          /> */}
        </div>
        <a href="https://www.nahb.org/nahb-community/member-benefits/savings" target="_blank">Learn More</a>
      </div>

      <div className="mb-8 flex flex-col justify-center items-center">
        <div className="border border-gray-400 side-img">
          {/* <button type="button" onClick={() => handleOpen("lightbox6")}> */}
          <a href="https://growthgen.typeform.com/to/bSLHKJWO" target="_blank">
            <Image
              src="/images/ads/2024-SBGP-Clickable-ad-min.png"
              alt="2023 Contracts"
              width={300}
              height={600}
            />
            </a>
          {/* </button> */}

          {/* <Lightbox
            open={open["lightbox6"]}
            close={() => handleClose("lightbox6")}
            slides={[{ src: "/images/ads/2024-SBGP-Clickable-ad-min.png" }]}
          /> */}
        </div>
        <Link href="https://growthgen.typeform.com/to/bSLHKJWO" target="_blank">
          Click Here to Redeem
        </Link>
      </div>

      {/* Repeat for each lightbox, ensuring to change the identifier */}
    </>
  );
}
