"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { StaffSidebar } from "./StaffSidebar";
import * as _utils from "./utils";
import _styles from "./FaqSection.module.css";

export function FaqSection({
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
          {"FAQ"}
        </_Builtin.Heading>
        <_Builtin.Block className={_utils.cx(_styles, "text-block")} tag="div">
          {"Qusestions &Answers"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "home-grid")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-left")}
            id={_utils.cx(
              _styles,
              "w-node-e5e9a36c-55fc-8291-adb3-a75cec18b6dc-ec18b6d5"
            )}
            tag="div"
          >
            <_Builtin.Block className={_utils.cx(_styles, "faq-div")} tag="div">
              <_Builtin.Heading
                className={_utils.cx(_styles, "faq-heading")}
                tag="h3"
              >
                {"Q: Can I join right now?"}
              </_Builtin.Heading>
              <_Builtin.Paragraph className={_utils.cx(_styles, "p-main")}>
                {"A: "}
                <_Builtin.Link
                  className={_utils.cx(_styles, "contact-link")}
                  button={false}
                  block=""
                  options={{
                    href: "#",
                  }}
                >
                  {"Click/Touch here"}
                </_Builtin.Link>
                {
                  " for our membership application for builders, associates, and affiliates."
                }
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "faq-div")} tag="div">
              <_Builtin.Heading
                className={_utils.cx(_styles, "faq-heading")}
                tag="h3"
              >
                {
                  "Q: What exactly does the Greater Fort Worth Builders Association do?"
                }
              </_Builtin.Heading>
              <_Builtin.Paragraph className={_utils.cx(_styles, "p-main")}>
                {
                  "A: We serve the homebuilding industry of the Greater Fort Worth region in many ways including advocacy on important issues, education of our members on current practices, consumer education, disseminating trends and changes forthcoming, and working with committees to resolve industry wide issues, to name a few."
                }
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "faq-div")} tag="div">
              <_Builtin.Heading
                className={_utils.cx(_styles, "faq-heading")}
                tag="h3"
              >
                {
                  "Q: If my co-worker is a member of the Greater Fort Worth Builders Association, am I also a member?"
                }
              </_Builtin.Heading>
              <_Builtin.Paragraph className={_utils.cx(_styles, "p-main")}>
                {
                  "A: No. The Greater Fort Worth Builders Association does not offer “Corporate Memberships”; however, if your company is a “Builder” or “Associate” member of the association, you are eligible to become an “Affiliate” member of the Greater Fort Worth Builders Association. An “Affiliate” membership costs $125 annually and must be under an active “Builder” or “Associate” member. As an “Affiliate” member, you will have access to all of the same benefits and opportunities as other members, excluding service on the Board of Directors or State and National Directors."
                }
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "faq-div")} tag="div">
              <_Builtin.Heading
                className={_utils.cx(_styles, "faq-heading")}
                tag="h3"
              >
                {
                  "Q: What exactly does the Greater Fort Worth Builders Association do?"
                }
              </_Builtin.Heading>
              <_Builtin.Paragraph className={_utils.cx(_styles, "p-main")}>
                {
                  "A: We serve the homebuilding industry of the Greater Fort Worth region in many ways including advocacy on important issues, education of our members on current practices, consumer education, disseminating trends and changes forthcoming, and working with committees to resolve industry wide issues, to name a few."
                }
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "faq-div")} tag="div">
              <_Builtin.Heading
                className={_utils.cx(_styles, "faq-heading")}
                tag="h3"
              >
                {
                  "Q: What do I get for joining the Greater Fort Worth Builders Association and why should I?"
                }
              </_Builtin.Heading>
              <_Builtin.Paragraph className={_utils.cx(_styles, "p-main")}>
                {
                  "A: Your membership in the Greater Fort Worth Builders Association also includes membership in the Texas Association of Builders (TAB)and the National Association of Builders (NAHB). This three-tiered membership makes you part of a group of organizations who deeply care about the residential construction industry and are working to ensure affordable home ownership is available for consumers. Builders and Remodelers will have access to the Texas Association of Builders Contracts Package which is updated every two years. Only Builder level members can purchase these contracts. There are various member programs and discounts through TAB and NAHB. Upon joining, your listing will appear in our online directory and your listing will appear in the hard copy of our directory when it is next printed. The GFWBA is an active association with a number of events and committees for members to choose from. Builder and Remodeler members are eligible to apply to become a "
                }
                <_Builtin.Link
                  className={_utils.cx(_styles, "contact-link")}
                  button={false}
                  block=""
                  options={{
                    href: "#",
                    target: "_blank",
                  }}
                >
                  {"Certified Master Builder"}
                </_Builtin.Link>
                {"."}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "faq-div")} tag="div">
              <_Builtin.Heading
                className={_utils.cx(_styles, "faq-heading")}
                tag="h3"
              >
                {
                  "Q: Who is eligible to serve on Greater Fort Worth Builders Association Committees?"
                }
              </_Builtin.Heading>
              <_Builtin.Paragraph className={_utils.cx(_styles, "p-main")}>
                {
                  "A: All Greater Fort Worth Builders Association members are encouraged to volunteer on one of our Committees. Please be aware that service on our committees is a privilege of membership and will require regular attendance and participation. Composition of some Committees are expressly defined in the Bylaws of the Greater Fort Worth Builders Association."
                }
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "faq-div")} tag="div">
              <_Builtin.Heading
                className={_utils.cx(_styles, "faq-heading")}
                tag="h3"
              >
                {"Q: When will my membership expire if I join today?"}
              </_Builtin.Heading>
              <_Builtin.Paragraph className={_utils.cx(_styles, "p-main")}>
                {
                  "A: Your Greater Fort Worth Builders Association membership expires 12 months after your join date. In addition, you membership to both the National Association of Home Builders (NAHB) and Texas Association of Builders (TAB) will also expire at that time. For your convenience you will receive a membership renewal invoice 60 days prior to the anniversary of your joining the Greater Fort Worth Builders Association."
                }
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Link
              className={_utils.cx(_styles, "blue-btn")}
              button={true}
              block=""
              options={{
                href: "/signup",
              }}
            >
              {"Join Now"}
            </_Builtin.Link>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-right")}
            id={_utils.cx(
              _styles,
              "w-node-e5e9a36c-55fc-8291-adb3-a75cec18b707-ec18b6d5"
            )}
            tag="div"
          >
            {homeGridRightSlot ?? (
              <>
                <_Builtin.Heading
                  className={_utils.cx(_styles, "heading-2")}
                  tag="h2"
                >
                  {"ASSOCIATIONSTAFF"}
                </_Builtin.Heading>
                <StaffSidebar />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
