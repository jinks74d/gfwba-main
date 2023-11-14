import Marquee from "react-fast-marquee";
import Image from "next/image";

import FoxLogo from "../public/images/sponsors/fox-energy-logo.jpg";
import StrucLogo from "../public/images/sponsors/shw_logo_cmyk_horizontal.png";
import PermaLogo from "../public/images/sponsors/Perma-Pier.png";
import AtmosLogo from "../public/images/sponsors/Atmos_energy_logo.png";

const Marq = () => {
  return (
    <Marquee
        className="py-[100px]"
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
  )
}

export default Marq