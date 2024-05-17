"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./OrganizationSection.module.css";

export function OrganizationSection({
  as: _Component = _Builtin.Section,
  homeGridRightSlot,
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
          {"THE FEDERATION"}
        </_Builtin.Heading>
        <_Builtin.Block className={_utils.cx(_styles, "text-block")} tag="div">
          {"Your Three Tiered Membership"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "home-grid")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-left")}
            id={_utils.cx(
              _styles,
              "w-node-_65830385-a995-52b8-5d88-f4261ecbc176-1ecbc16f"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "main-left-list")}
              tag="div"
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "list-logo-left")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655a853b0fad09343073a4c7_gfwba-logo-vert.png"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main")}
                tag="div"
              >
                {
                  "Founded in 1945, the Greater Fort Worth Builders Association is the local arm of a three-level federation which includes the National Association of Homebuilders (NAHB), and the Texas Association of Builders (TAB)."
                }
                <br />
                <br />
                {
                  "By offering specialized services for the many disciplines involved in new home construction, the Greater Fort Worth Builders Association’s Councils and Committees provide a more focused approach to resolving specific issues unique to their professions and regions.."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "main-left-list")}
              tag="div"
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "list-logo-left")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655391c05614887a99abe38c_TAB-facebook-logo-image2.jpg"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main")}
                tag="div"
              >
                {
                  "The Texas Association of Builders (TAB) is dedicated to creating a positive business environment for the housing industry by addressing the housing issues of the people of Texas."
                }
                <br />
                <br />
                {
                  "Founded in 1946, the Texas Association of Builders is an affiliate of the National Association of Home Builders and has 29 local home builders associations and nearly 10,000 members across Texas. Representing over 315,000 jobs and more than $21 billion in the Texas economy, the state and local associations play a crucial role in providing housing for Texans. Learn more about TAB’s advocacy efforts here."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "main-left-list")}
              tag="div"
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "list-logo-left")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655391c0ad009d50dcdfb26c_2019.jpg"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main")}
                tag="div"
              >
                {
                  "Founded in the 1940's, NAHB strives to protect the American Dream of housing opportunities for all, while working to achieve professional success for its members who build communities, create jobs and strengthen our economy."
                }
                <br />
                <br />
                {
                  "A federation of more than 700 state and local associations, NAHB represents more than 140,000 members. About one-third are home builders and remodelers. The rest work in closely related specialties such as sales and marketing, housing finance, and manufacturing and supplying building materials."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"STAFF INFORMATION"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "space-40")}
              tag="div"
            >
              {
                "The Greater Fort Worth Builders Association (GFWBA) is operated by a full-time staff, which is always available by phone, email or make an appointment to visit our downtown Fort Worth offices, located directly across from the historic “Water Gardens”. Dedicated to delivering personalized, professional and thorough service to our members; the Greater Fort Worth Builders Association staff is here to answer your questions and help you get the most out of your membership."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-right")}
            id={_utils.cx(
              _styles,
              "w-node-_65830385-a995-52b8-5d88-f4261ecbc190-1ecbc16f"
            )}
            tag="div"
          >
            {homeGridRightSlot}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
