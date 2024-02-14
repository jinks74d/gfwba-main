import Marquee from "react-fast-marquee";
import Image from "next/image";
import Link from "next/link";

import FoxLogo from "../public/images/sponsors/fox-logo.png";
import BRSLogo from "../public/images/sponsors/brs-logo.webp";
import StrucLogo from "../public/images/sponsors/structure-logo.png";
import HotchkissLogo from "../public/images/sponsors/hotchkiss-logo.svg";
import AtmosLogo from "../public/images/sponsors/Atmos_energy_logo.png";
import TDTLogo from "../public/images/sponsors/tdt-logo.webp";
import ReeceLogo from "../public/images/sponsors/reece-logo.svg";
import ExpressionsLogo from "../public/images/sponsors/expression-logo.jpg";

const Marq = () => {
  return (
    <div className="w-full">
      <Marquee
        speed={40}
        pauseOnHover={true}
        className="flex flex-row justify-center items-center"
      >
        <Link href="https://www.foxenergyspecialists.com/" target="_blank">
          <Image
            src={FoxLogo}
            alt="Fox Energy Logo"
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link href="https://www.structuresure.com/" target="_blank">
          <Image
            src={StrucLogo}
            alt="StructSure Logo"
            width={300}
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link href="https://www.brstexas.com/" target="_blank">
          <Image
            src={BRSLogo}
            alt="Bush, Rednicki, and Shelton Logo"
            width={300}
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link href="https://hotchkissinsurance.com/" target="_blank">
          <Image
            src={HotchkissLogo}
            alt="Hotchkiss Insurance Logo"
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link href="https://www.atmosenergy.com/" target="_blank">
          <Image
            src={AtmosLogo}
            alt="Atmos Energy Logo"
            width={175}
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link href="https://www.tdt-inc.com/" target="_blank">
          <Image
            src={TDTLogo}
            alt="Texas Door and Trim Logo"
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link href="https://www.reece.com/" target="_blank">
          <Image
            src={ReeceLogo}
            alt="Reece Logo"
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link
          href="https://www.expressionshomegallerysouthlake.com/"
          target="_blank"
        >
          <Image
            src={ExpressionsLogo}
            alt="Expressions Home Gallery Logo"
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link href="https://www.foxenergyspecialists.com/" target="_blank">
          <Image
            src={FoxLogo}
            alt="Fox Energy Logo"
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link href="https://www.structuresure.com/" target="_blank">
          <Image
            src={StrucLogo}
            alt="StructSure Logo"
            width={300}
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link href="https://www.brstexas.com/" target="_blank">
          <Image
            src={BRSLogo}
            alt="Bush, Rednicki, and Shelton Logo"
            width={300}
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link href="https://hotchkissinsurance.com/" target="_blank">
          <Image
            src={HotchkissLogo}
            alt="Hotchkiss Insurance Logo"
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link href="https://www.atmosenergy.com/" target="_blank">
          <Image
            src={AtmosLogo}
            alt="Atmos Energy Logo"
            width={175}
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link href="https://www.tdt-inc.com/" target="_blank">
          <Image
            src={TDTLogo}
            alt="Texas Door and Trim Logo"
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link href="https://www.reece.com/" target="_blank">
          <Image
            src={ReeceLogo}
            alt="Reece Logo"
            height={75}
            className="image-scroll-item"
          />
        </Link>
        <Link
          href="https://www.expressionshomegallerysouthlake.com/"
          target="_blank"
        >
          <Image
            src={ExpressionsLogo}
            alt="Expressions Home Gallery Logo"
            height={75}
            className="image-scroll-item"
          />
        </Link>
      </Marquee>
    </div>
  );
};

export default Marq;
