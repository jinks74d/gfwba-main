"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MemberSection.module.css";

export function MemberSection({
  as: _Component = _Builtin.Section,

  link = {
    href: "#",
  },

  link2 = {
    href: "#",
  },

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
          {"MEMBERSHIP"}
        </_Builtin.Heading>
        <_Builtin.Block className={_utils.cx(_styles, "text-block")} tag="div">
          {"The Benefits of Your Membership"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "home-grid")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-left")}
            id={_utils.cx(
              _styles,
              "w-node-_23342329-fc6b-e536-fbf8-e753dcea538f-dcea5388"
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
                  "Information is power and as a member of the Greater Fort Worth Builders Association, you have a professional staff and volunteers working on your behalf to keep you apprised of developments, discoveries, and changes in the local, state and national affairs that directly affect the residential construction industry. The impacts could be in the form of regulatory or code changes, industry mandates, educational requirements, safety training, etc.. Through your membership investment, you will be able to utilize resources at the local, state, and federal levels to maintain your information edge."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"EDUCATION PROGRAMS"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "space-20")}
              tag="div"
            >
              {
                "An expanding offering of professional training programs and seminars are hosted or sponsored by the Greater Fort Worth Builders Association. Our goal is to provide critical information that improves the knowledge and professional development of those employed in our industry. Our Membership Services Committee works directly with our professional staff to create relevant and time sensitive training programs to meet the needs of our members and consumers. Examples of some of the offerings are:"
              }
            </_Builtin.Block>
            <_Builtin.List
              className={_utils.cx(_styles, "space-40")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main")}
                  tag="div"
                >
                  {
                    "Various Educational offerings throughout the year - typically one per month."
                  }
                </_Builtin.Block>
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main")}
                  tag="div"
                >
                  {"Economic Forecast"}
                  <br />
                  {""}
                </_Builtin.Block>
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main")}
                  tag="div"
                >
                  {"Legislative Updates"}
                </_Builtin.Block>
              </_Builtin.ListItem>
            </_Builtin.List>
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"Website Listings, Searches, Online Directory"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "space-20")}
              tag="div"
            >
              {
                "All members get their company listed in the Greater Fort Worth Builders Association on line Membership Directory. Builders and Re modelers are listed in our “Find A Builder or Re-modeler” search used by Associate members and the public. All Members are listed in our “Find a Member” search used by both builders and the public."
              }
            </_Builtin.Block>
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"Membership Events"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "space-20")}
              tag="div"
            >
              {
                "Monthly general membership luncheons and other membership events are held at varied locations and provide an excellent opportunity to strategically market your company and network within the industry. Program speakers address timely topics like the Association’s annual economic forecast, motivational programs, tax issues and housing afford ability. These events include:"
              }
            </_Builtin.Block>
            <_Builtin.List
              className={_utils.cx(_styles, "space-20")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main")}
                  tag="div"
                >
                  {"Education Events"}
                  <br />
                  {""}
                </_Builtin.Block>
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main")}
                  tag="div"
                >
                  {"Luncheons"}
                  <br />
                </_Builtin.Block>
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main")}
                  tag="div"
                >
                  {"New Member Receptions"}
                  <br />
                  {""}
                </_Builtin.Block>
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main")}
                  tag="div"
                >
                  {"Golf Tournaments"}
                  <br />
                </_Builtin.Block>
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main")}
                  tag="div"
                >
                  {"Trade shows"}
                  <br />
                </_Builtin.Block>
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main")}
                  tag="div"
                >
                  {"Award Ceremonies"}
                  <br />
                </_Builtin.Block>
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main")}
                  tag="div"
                >
                  {"Charitable Fundraisers"}
                  <br />
                </_Builtin.Block>
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main")}
                  tag="div"
                >
                  {"Builder & Associate Services Directory"}
                  <br />
                </_Builtin.Block>
              </_Builtin.ListItem>
            </_Builtin.List>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "space-20")}
              tag="div"
            >
              {
                "Be seen with the best of company. The Association’s membership directory lists member firms alphabetically and by business classifications. A desktop reference full of useful sources, this directory is distributed throughout the Association membership to give you maximum visibility within the homebuilding industry."
              }
              <br />
              {""}
            </_Builtin.Block>
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"Local, State & National Government Liaison"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "space-20")}
              tag="div"
            >
              {
                "You stay close to the policy-makers through the services of the Greater Fort Worth Builders Association’s professional staff and volunteer committees. We work on your behalf in in the regions local cities and towns; and with state agencies, the governor’s office and the legislature. NAHB representatives actively lobby in Washington, meeting regularly with members of Congress, administration officials and cabinet officers to ensure housing remains a top priority during the formation of national policy. NAHB maintains the nation’s third largest trade association Political Action Committee."
              }
            </_Builtin.Block>
            <_Builtin.Link
              className={_utils.cx(_styles, "blue-btn", "space-40")}
              button={true}
              block=""
              options={link}
            >
              {"LEARN MORE"}
            </_Builtin.Link>
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"Discount Programs"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "space-20")}
              tag="div"
            >
              {
                "Being a member of the Greater Fort Worth Builders Association means that your company and your employees can enjoy discounts on a variety of products and services."
              }
              <br />
              <br />
              {
                "As soon as you join, you become part of a network of industry professionals; people to do business with and share knowledge with. All the association functions and committee activities provide you with invaluable contacts in the homebuilding industry. You meet fellow members, learn of other business activities and cultivate potential clients. The result is a fuller, more rewarding professional life."
              }
            </_Builtin.Block>
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"Committee & Council Memberships"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "space-40")}
              tag="div"
            >
              {
                "Tailor your committee involvement to areas of special interest – Membership Services, Government Affairs, Special Events, Education, Website Development and much more."
              }
            </_Builtin.Block>
            <_Builtin.Link
              className={_utils.cx(_styles, "blue-btn", "space-40")}
              button={true}
              block=""
              options={link2}
            >
              {"JOIN NOW"}
            </_Builtin.Link>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-right")}
            id={_utils.cx(
              _styles,
              "w-node-_23342329-fc6b-e536-fbf8-e753dcea53e6-dcea5388"
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
