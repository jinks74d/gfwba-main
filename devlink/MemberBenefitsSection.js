"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MemberBenefitsSection.module.css";
import Link from "next/link";
import Image from "next/image";

export function MemberBenefitsSection({
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
          {"MEMBER BENEFITS"}
        </_Builtin.Heading>
        <_Builtin.Block className={_utils.cx(_styles, "text-block")} tag="div">
          {"Discounts and Member Benefits"}
          <br />
          {""}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "home-grid")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-left")}
            id={_utils.cx(
              _styles,
              "w-node-_1a9d6216-a5d4-fd52-b9d2-fe3afb2ebbac-fb2ebba3"
            )}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"Member Only Discount Programs"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "space-20")}
              tag="div"
            >
              {
                "The Greater Fort Worth Builders Association is always looking for ways to keep our members aware of the many advantages of their membership investment. As a member of the Greater Fort Worth Builders Association, you are entitled to receive the benefits of programs and services that are not available to the general public. Many of these discount programs and services are enhanced for association members. Below are some of the programs and services offered to members of the association."
              }
            </_Builtin.Block>
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"National Association of Home Builders (NAHB) Member Savings"}
            </_Builtin.Heading>
            <div className="flex flex-col md:flex-row gap-4">
              <Image
                loading="lazy"
                width="300"
                height="250"
                alt="NAHB Logo"
                src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655391c0ad009d50dcdfb26c_2019.jpg"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main", "space-20")}
                tag="div"
              >
                {"The  "}
                {
                  <Link
                    href="https://www.nahb.org/nahb-community/member-benefits/savings"
                    target="_blank"
                    style={{ textDecoration: "underline" }}
                  >
                    NAHB Member Savings Program
                  </Link>
                }
                {
                  " continues to make a big impact in boosting members' bottom lines."
                }
                <br />
                {""}
              </_Builtin.Block>
            </div>
            <br />
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"Texas Association of Builders"}
            </_Builtin.Heading>
            <div className="flex flex-col md:flex-row gap-4">
              <Image
                loading="lazy"
                width="230"
                height="250"
                alt="NAHB Logo"
                src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655391c05614887a99abe38c_TAB-facebook-logo-image2.jpg"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main", "space-20")}
                tag="div"
              >
                {"The "}
                {
                  <Link
                    href="https://www.texasbuilders.org/member-programs/"
                    target="_blank"
                    style={{ textDecoration: "underline" }}
                  >
                    Texas Association of Builders
                  </Link>
                }
                {
                  " members have access to programs and services that are not available to the public, some of which are discounted or enhanced for TAB members. They also provide revenue back to TAB and your local HBA."
                }
                <br />
                {""}
              </_Builtin.Block>
            </div>
          </_Builtin.Block>

          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-right")}
            id={_utils.cx(
              _styles,
              "w-node-_1a9d6216-a5d4-fd52-b9d2-fe3afb2ebbb7-fb2ebba3"
            )}
            tag="div"
          >
            {homeGridRightSlot ?? (
              <>
                <_Builtin.Heading
                  className={_utils.cx(_styles, "heading-2")}
                  tag="h2"
                >
                  {"ASSOCIATION STAFF"}
                </_Builtin.Heading>
                <_Builtin.Block
                  className={_utils.cx(_styles, "staff-item-blk")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "staff-item")}
                    tag="div"
                  >
                    <_Builtin.Image
                      className={_utils.cx(_styles, "", "image-4")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt=""
                      src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655a86cc1de34c4d81716a2e_filller.png"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "staff-name")}
                      tag="div"
                    >
                      {"Kimberly Eaton-Pregler"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "staff-title")}
                      tag="div"
                    >
                      {"Executive Vice President"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "staff-item")}
                    tag="div"
                  >
                    <_Builtin.Image
                      className={_utils.cx(_styles, "", "image-4")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt=""
                      src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655a86cc1de34c4d81716a2e_filller.png"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "staff-name")}
                      tag="div"
                    >
                      {"Sharon Liles Love"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "staff-title")}
                      tag="div"
                    >
                      {"Director of Operations"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "staff-item")}
                    tag="div"
                  >
                    <_Builtin.Image
                      className={_utils.cx(_styles, "", "image-4")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt=""
                      src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655a86cc1de34c4d81716a2e_filller.png"
                    />
                    <_Builtin.Block
                      className={_utils.cx(_styles, "staff-name")}
                      tag="div"
                    >
                      {"Shannon Claybaugh"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "staff-title")}
                      tag="div"
                    >
                      {"Director of Member Services/"}
                      <br />
                      {"Certified Master Builder Administrator"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
