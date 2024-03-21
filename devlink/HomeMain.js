import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./HomeMain.module.css";
import AdSidebar from "@/components/AdSidebar";

export function HomeMain({
  as: _Component = _Builtin.Section,

  homeJoin = {
    href: "#",
  },

  homeDirectory = {
    href: "#",
  },

  sidebarSlot = <AdSidebar />,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "section-2")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-1600")}
        tag="div"
      >
        <_Builtin.Heading className={_utils.cx(_styles, "heading-1")} tag="h1">
          {"YOUR SUCCESS IS OUR MISSION"}
        </_Builtin.Heading>
        <_Builtin.Block className={_utils.cx(_styles, "text-block")} tag="div">
          {"Welcome to the Greater Fort Worth Builders Association"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "home-grid")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-left")}
            id={_utils.cx(
              _styles,
              "w-node-c43a05ae-d77d-76ee-dabc-1f546fa637e3-6dac7120"
            )}
            tag="div"
          >
            <_Builtin.Block className={_utils.cx(_styles, "p-main")} tag="div">
              {
                "The Greater Fort Worth Builders Association (GFWBA) is the leading non-profit trade association representing hundreds of companies and individuals with common interests affiliated with the homebuilding industry throughout the Greater Fort Worth region. GFWBA is one of twenty-eight local associations that make up the Texas Association of Builders (TAB). In addition, we are affiliated with the National Association of Home Builders (NAHB)."
              }
              <br />
              <br />
              {
                "As the voice of the homebuilding industry, GFWBA serves as a representative body, advocating for the interests of our members. We actively engage with government, agencies, regulators, the media, and other influencers to ensure the collective views and positions of our members are heard."
              }
              <br />
              <br />
              {
                "Under the guidance of an active board of directors and volunteer committees consisting of leaders from local builders, trade contractors, and real estate businesses, GFWBA is committed to providing our members advocacy on important issues, valuable information, trends and changes forthcoming, education opportunities, promotion and representation."
              }
            </_Builtin.Block>
            <_Builtin.Link
              className={_utils.cx(_styles, "text-link")}
              button={false}
              block=""
              options={{
                href: "#",
              }}
            >
              {"LEARN MORE"}
            </_Builtin.Link>
            <_Builtin.Image
              className={_utils.cx(_styles, "image-2")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/65525cb8453835c98ab6ed97_home-hero.jpg"
            />
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {
                "JOIN AN EXCEPTIONAL COMMUNITY OF LEADERS IN THE BUILDING INDUSTRY"
              }
            </_Builtin.Heading>
            <_Builtin.Block className={_utils.cx(_styles, "p-main")} tag="div">
              {
                "Membership in GFWBA offers businesses and individuals GFWBA represents all segments of the residentialbuilding industry and promotes home building and home ownership in a variety of ways."
              }
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "home-left-list")}
              tag="div"
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "list-img-left")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655282a34d160fb4abac5aa2_cert1-icon.png"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main")}
                tag="div"
              >
                <_Builtin.Strong>{"AFFILIATIONS"}</_Builtin.Strong>
                <br />
                {
                  "GFWBA is affiliated with the National Association of Home Builders and the Texas Association of Builders. Your three-tiered membership includes the National Association of Homebuilders (NAHB), and the Texas Association of Builders (TAB)."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "home-left-list")}
              tag="div"
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "list-img-left")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655282a3d938e7933273e488_cert2-icon.png"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main")}
                tag="div"
              >
                <_Builtin.Strong>
                  {"EDUCATION&ADVICE"}
                  <br />
                </_Builtin.Strong>
                {
                  "Education is central to our mission. We provide members with access to a wealth of resources, from training materials to technical advice and industry updates. Together, we empower expertise and drive progress in the home building industry."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "home-left-list")}
              tag="div"
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "list-img-left")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655282a3ef06ff31297fd171_people-icon.png"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main")}
                tag="div"
              >
                <_Builtin.Strong>
                  {"CONNECTIONG &COLLABORATING"}
                  <br />
                </_Builtin.Strong>
                {
                  "Our community thrives on the power of connection. We offer opportunities to connect with industry peers who share your passion and common interests. Through networking events and collaborative initiatives, members are able to build invaluable relationships."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "home-left-list")}
              tag="div"
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "list-img-left")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655282a300587f67db768885_coin-icon.png"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main", "space-40")}
                tag="div"
              >
                <_Builtin.Strong>
                  {"BENEFITS &DISCOUNTS"}
                  <br />
                </_Builtin.Strong>
                {
                  "As a member, you gain exclusive access to a wealth of benefits, programs, and services that are carefully curated to enhance your professional journey. Your affiliation with us opens doors to opportunities designed to empower and elevate your business."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"HIRE A GFWBA PROFESSIONAL"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "space-40")}
              tag="div"
            >
              {
                "When you choose to work with members of the Greater Fort Worth Builders Association, you're not just selecting professionals; you're opting for peace of mind. Our members are committed to excellence, ethical practices and upholding the highest industry standards."
              }
              <br />
              <br />
              {
                "This commitment means that your project, whether it's a new home, renovation, or any construction endeavor, is in the hands of experts who prioritize quality, safety and professionalism. It's not just about getting the job done; it's about getting it done right. When you partner with a GFWBA member, you can rest assured that you're making a choice that ensures the utmost in craftsmanship and reliability."
              }
            </_Builtin.Block>
            <_Builtin.Link
              className={_utils.cx(_styles, "red-btn", "space-40")}
              button={false}
              block=""
              options={{
                href: "/membership",
              }}
            >
              {"JOIN GFWBA"}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "blue-btn", "space-40")}
              button={false}
              block=""
              options={{
                href: "/directory",
              }}
            >
              {"MEMBER DIRECTORY"}
            </_Builtin.Link>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-right")}
            id={_utils.cx(
              _styles,
              "w-node-c43a05ae-d77d-76ee-dabc-1f546fa6381a-6dac7120"
            )}
            tag="div"
          >
            <_Builtin.Block tag="div">{sidebarSlot}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
