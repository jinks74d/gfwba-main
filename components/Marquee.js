import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";

import FoxLogo from "../public/images/sponsors/FoxEnergy_logo_2013_color_noCircle-wREG_LcS (1).png";
import BRSLogo from "../public/images/sponsors/brs-logo.webp";
import StrucLogo from "../public/images/sponsors/structure-logo.png";
import HotchkissLogo from "../public/images/sponsors/hotchkiss-logo.svg";
import AtmosLogo from "../public/images/sponsors/Atmos_energy_logo.png";
import WPLogo from "public/images/sponsors/western-pacific.png";
import ReeceLogo from "../public/images/sponsors/reese-bath.png";

const Marq = () => {
  return (
    <div className="w-full">
      <h2 className="mt-4 mb-2 text-lg text-center uppercase font-bold tracking-wide">
        2024 Platinum Sponsors
      </h2>
      <Marquee
        speed={20}
        pauseOnHover={true}
        className="flex flex-row justify-center items-center"
      >
        <Link href="https://www.foxenergyspecialists.com/" target="_blank">
          <Image
            src={FoxLogo}
            alt="Fox Energy Logo"
            width={300}
            height={150}
            className="image-scroll-item max-size"
          />
        </Link>
        <Link href="https://www.strucsure.com/" target="_blank">
          <Image
            src={StrucLogo}
            alt="StructSure Logo"
            width={300}
            height={150}
            className="image-scroll-item max-size"
          />
        </Link>
        <Link href="https://www.brs.com/" target="_blank">
          <Image
            src={BRSLogo}
            alt="BRS Logo"
            width={300}
            height={150}
            className="image-scroll-item max-size"
          />
        </Link>
        <Link href="https://www.hotchkiss.com/" target="_blank">
          <Image
            src={HotchkissLogo}
            alt="Hotchkiss Logo"
            width={300}
            height={150}
            className="image-scroll-item max-size"
          />
        </Link>
        <Link href="https://www.atmosenergy.com/" target="_blank">
          <Image
            src={AtmosLogo}
            alt="Atmos Energy Logo"
            width={300}
            height={150}
            className="image-scroll-item max-size"
          />
        </Link>
        <Link href="https://www.westernpacific.com/" target="_blank">
          <Image
            src={WPLogo}
            alt="Western Pacific Logo"
            width={150}
            height={150}
            className="image-scroll-item"
          />
        </Link>
        <Link href="https://www.reece.com/" target="_blank">
          <Image
            src={ReeceLogo}
            alt="Reece Bath Logo"
            width={300}
            height={150}
            className="image-scroll-item max-size"
          />
        </Link>
      </Marquee>
    </div>
  );
};

export default Marq;
