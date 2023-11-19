import Marquee from "react-fast-marquee";
import Image from "next/image";

import FoxLogo from "../public/images/sponsors/fox-energy-logo.jpg";
import StrucLogo from "../public/images/sponsors/shw_logo_cmyk_horizontal.png";
import PermaLogo from "../public/images/sponsors/Perma-Pier.png";
import AtmosLogo from "../public/images/sponsors/Atmos_energy_logo.png";

const Marq = () => {
  return (
    <div className="w-full flex flex-col mt-20">
    <h2 className="m-auto">OUR PLATINUM PARTNERS</h2>
    <Marquee
        className="pb-[100px] pt-[50px]"
      >
        <Image
          src={FoxLogo}
          alt="Fox Energy Logo"
          height={250}          
          className="pr-[300px]"
         />
         <Image
          src={StrucLogo}
          alt="StructSure Logo"
          width={800}
          height={250}
          className="pr-[300px]"
         />
         <Image
          src={PermaLogo}
          alt="StructSure Logo"
          height={250}
          className="pr-[300px]"
         />
         <Image
          src={AtmosLogo}
          alt="StructSure Logo"
          height={250}
          className="pr-[300px]"
         />
      </Marquee>
      </div>
  )
}

export default Marq