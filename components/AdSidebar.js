import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

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
      <div className="mb-8 border border-gray-400">
        <button type="button" onClick={() => handleOpen("lightbox1")}>
          <Image
            src="/images/ads/2023Contracts_w-qr1pgx700-min.jpg"
            alt="2023 Contracts"
            width={300}
            height={600}
          />
        </button>

        <Lightbox
          open={open["lightbox1"]}
          close={() => handleClose("lightbox1")}
          slides={[{ src: "/images/ads/2023Contracts_w-qr1pgx700-min.jpg" }]}
        />
      </div>

      <div className="mb-8 border border-gray-400">
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

      <div className="mb-8 border border-gray-400">
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
          slides={[{ src: "/images/ads/TABInsuranceProgram-w-QRx720-min.png" }]}
        />
      </div>

      <div className="mb-8 border border-gray-400">
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

      {/* Repeat for each lightbox, ensuring to change the identifier */}
    </>
  );
}
