import Marquee from "react-fast-marquee";
import Image from "next/image";

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
    <div className="w-full flex flex-col mt-20">
      <h2 className="m-auto text-xl lg:text-5xl mb-10">
        OUR PLATINUM PARTNERS
      </h2>
      <Marquee className="pb-[40px] pt-[40px] lg:pb-[100px] lg:pt-[50px]">
        <Image
          src={FoxLogo}
          alt="Fox Energy Logo"
          height={250}
          className="image-scroll-item"
        />
        <Image
          src={StrucLogo}
          alt="StructSure Logo"
          width={800}
          height={250}
          className="image-scroll-item"
        />
        <Image
          src={BRSLogo}
          alt="Bush, Rednicki, and Shelton Logo"
          width={800}
          height={250}
          className="image-scroll-item"
        />
        <Image
          src={HotchkissLogo}
          alt="Hotchkiss Insurance Logo"
          height={250}
          className="image-scroll-item"
        />
        <Image
          src={AtmosLogo}
          alt="StructSure Logo"
          height={250}
          className="object-scale-down h-auto m-h-10 w-auto m-w-32 pr-[100px] lg:pr-[300px]"
        />
        <Image
          src={TDTLogo}
          alt="Texas Door and Trim Logo"
          height={250}
          className="image-scroll-item"
        />
        <Image
          src={ReeceLogo}
          alt="Reece Logo"
          height={250}
          className="image-scroll-item"
        />
        <Image
          src={ExpressionsLogo}
          alt="Expressions Home Gallery Logo"
          height={250}
          className="image-scroll-item"
        />
      </Marquee>
    </div>
  );
};

export default Marq;
