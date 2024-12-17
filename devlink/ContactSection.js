"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ContactSection.module.css";

export function ContactSection({
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
          {"CONTACT US"}
        </_Builtin.Heading>
        <_Builtin.Block className={_utils.cx(_styles, "text-block")} tag="div">
          {"Greater Fort Worth Builders Association"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "home-grid")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-left")}
            id={_utils.cx(
              _styles,
              "w-node-f7e2952d-e998-c666-4faf-a0e64c52f288-4c52f281"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "contact-info-div")}
              tag="div"
            >
              <_Builtin.Heading
                className={_utils.cx(_styles, "contact-h3")}
                tag="h3"
              >
                {"address:"}
              </_Builtin.Heading>
              <_Builtin.Paragraph
                className={_utils.cx(_styles, "p-main", "contact-p")}
              >
                {"100 E. 15th Street, Suite 600"}
                <br />
                {"Fort Worth, Texas 76102"}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "contact-info-div")}
              tag="div"
            >
              <_Builtin.Heading
                className={_utils.cx(_styles, "contact-h3")}
                tag="h3"
              >
                {"Phone:"}
              </_Builtin.Heading>
              <_Builtin.Paragraph
                className={_utils.cx(_styles, "p-main", "contact-p")}
              >
                {"817-284-3566"}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "contact-info-div")}
              tag="div"
            >
              <_Builtin.Heading
                className={_utils.cx(_styles, "contact-h3")}
                tag="h3"
              >
                {"fax:"}
              </_Builtin.Heading>
              <_Builtin.Paragraph
                className={_utils.cx(_styles, "p-main", "contact-p")}
              >
                {"817-284-6465"}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "contact-info-div")}
              tag="div"
            >
              <_Builtin.Heading
                className={_utils.cx(_styles, "contact-h3")}
                tag="h3"
              >
                {"email:"}
              </_Builtin.Heading>
              <_Builtin.Paragraph
                className={_utils.cx(_styles, "p-main", "contact-p")}
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "contact-link")}
                  button={false}
                  block=""
                  options={{
                    href: "mailto:info@fortworthbuilders.org",
                  }}
                >
                  {"info@fortworthbuilders.org"}
                </_Builtin.Link>
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "map-embed")}
              value="%3Ciframe%20src%3D%22https%3A%2F%2Fwww.google.com%2Fmaps%2Fembed%3Fpb%3D!1m18!1m12!1m3!1d5544.770529491419!2d-97.3282529873991!3d32.74714608539984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e71140e9d7667%253A0x4147a27acf088894!2s100%2520E%252015th%2520St%2520Ste%2520600%252C%2520Fort%2520Worth%252C%2520TX%252076102!5e1!3m2!1sen!2sus!4v1706655800742!5m2!1sen!2sus%22%20width%3D%22100%25%22%20height%3D%22450%22%20style%3D%22border%3A0%3B%22%20allowfullscreen%3D%22%22%20loading%3D%22lazy%22%20referrerpolicy%3D%22no-referrer-when-downgrade%22%3E%3C%2Fiframe%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-right")}
            id={_utils.cx(
              _styles,
              "w-node-f7e2952d-e998-c666-4faf-a0e64c52f2a1-4c52f281"
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
