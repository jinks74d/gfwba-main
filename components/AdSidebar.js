import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function AdSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mb-6 border border-gray-400">
        <button type="button" onClick={() => setOpen(true)}>
          <Image
            src="/images/ads/2023Contracts_w-qr1pgx700-min.jpg"
            alt="2023 Contracts"
            width={300}
            height={600}
          />
        </button>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: "/images/ads/2023Contracts_w-qr1pgx700-min.jpg" }]}
        />
      </div>

      <div className="mb-6 border border-gray-400">
        <button type="button" onClick={() => setOpen(true)}>
          <Image
            src="/images/ads/2024ModelSafety_HalfPg.jpg"
            alt="2024 Safety Model"
            width={300}
            height={600}
          />
        </button>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: "/images/ads/2024ModelSafety_HalfPg.jpg" }]}
        />
      </div>

      <div className="mb-6 border border-gray-400">
        <button type="button" onClick={() => setOpen(true)}>
          <Image
            src="/images/ads/TABInsuranceProgram-w-QRx720-min.png"
            alt="2024 Safety Model"
            width={300}
            height={600}
          />
        </button>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={[{ src: "TABInsuranceProgram-w-QRx720-min.png" }]}
        />
      </div>
    </>
  );
}
