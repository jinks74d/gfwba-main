"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CommitteeSection.module.css";

export function CommitteeSection({
  as: _Component = _Builtin.Block,

  emailLink = {
    href: "/contact",
  },
}) {
  return (
    <_Component className={_utils.cx(_styles, "committee-section")} tag="div">
      <_Builtin.Heading className={_utils.cx(_styles, "heading-2")} tag="h2">
        {"GET INVOLVED"}
      </_Builtin.Heading>
      <_Builtin.Block
        className={_utils.cx(_styles, "committee-item")}
        tag="div"
      >
        <_Builtin.Heading tag="h3">{"Associate's council"}</_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "p-main", "space-40")}
          tag="div"
        >
          {
            "Associates Council fosters the relationship between Associate Members & Builders Members, improves the visibility of associate members and increases recognition of their products and services among builders. "
          }
          <br />
          <br />
          {
            "The Committee meets every other month to discuss Associate Council business and plan association events and philanthropic projects. All Associate and Affiliate Members of the GFWBA are welcome to attend and join the council. "
          }
          <br />
          <br />
          {"If you would like to join this committee, please contact "}
          <_Builtin.Link
            className={_utils.cx(_styles, "p-main-link")}
            button={false}
            block=""
            options={emailLink}
          >
            {"Kimberly Eaton-Pregle"}
          </_Builtin.Link>
          {"r, Executive Vice President."}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "committee-item")}
        tag="div"
      >
        <_Builtin.Heading tag="h3">{"awards committee"}</_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "p-main", "space-40")}
          tag="div"
        >
          {
            "The Awards Committee is composed of 7 members appointed by the President. The following are standing members: "
          }
          <br />
          <br />
          <_Builtin.Span className={_utils.cx(_styles, "ml-20")}>
            {"Immediate Past Builder of the Year"}
            <br />
          </_Builtin.Span>
          <_Builtin.Span className={_utils.cx(_styles, "ml-20")}>
            {"Immediate Past Associate of the Year "}
            <br />
          </_Builtin.Span>
          <_Builtin.Span className={_utils.cx(_styles, "ml-20")}>
            {"1 previous Associate of the Year from the past 20 years"}
          </_Builtin.Span>{" "}
          <br />
          <br />
          {
            "This committee determines what awards will be given each year, approves of the awards ballots and reviews finalist questionnaires to determine the recipients of each award."
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "committee-item")}
        tag="div"
      >
        <_Builtin.Heading tag="h3">{"board of directors"}</_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "p-main", "space-40")}
          tag="div"
        >
          {
            "The Board of Directors is the governing body of the Association and performs those duties prescribed by the Texas Business Organizations Code and the duties prescribed by our Bylaws. "
          }
          <br />
          <br />
          {
            "The Board is responsible for establishing general policies for the management and ongoing operations of the Association. The Board consists of Builder and Associate members. Members of the Executive Committee are not elected to the Board. Also included on the Board of Directors are the GFWBA Past Presidents and GFWBA Life Directors. "
          }
          <br />
          <br />
          {
            "f you are a Builder or Associate Member and would be willing to serve on the Board of Directors, please contact "
          }
          <_Builtin.Link
            className={_utils.cx(_styles, "p-main-link")}
            button={false}
            block=""
            options={emailLink}
          >
            {"Kimberly Eaton Pregler"}
          </_Builtin.Link>
          {
            ", Executive Vice President. Your name will be given to the Nominating Committee for consideration in the next election."
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "committee-item")}
        tag="div"
      >
        <_Builtin.Heading tag="h3">{"budget & finance"}</_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "p-main", "space-40")}
          tag="div"
        >
          {
            "The Budget and Finance Committee is composed of 7 Builder members. The First Vice President is a standing member. The chair of the committee is the Secretary/Treasurer. The Budget and Finance Committee establishes an annual budget for approval by the board and has quarterly teleconference meetings to review the budget, event performance, accounts receivable, etc. "
          }
          <br />
          <br />
          {
            "If you are a Builder Member and would be willing to serve on this committee, please contact "
          }
          <_Builtin.Link
            className={_utils.cx(_styles, "p-main-link")}
            button={false}
            block=""
            options={emailLink}
          >
            {"Kimberly Eaton-Pregler"}
          </_Builtin.Link>
          {
            ", Executive Vice President. Your name will be given to the Secretary/Treasurer for consideration."
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "committee-item")}
        tag="div"
      >
        <_Builtin.Heading tag="h3">{"education committee"}</_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "p-main", "space-40")}
          tag="div"
        >
          {
            "The Education Committee works to develop a calendar of educational events of interest to GFWBA members. Educational events are typically held once a month and include lunch. Topics may include building codes, legal information, business development, feature new materials or methods, etc."
          }
          <br />
          {"‍"}
          <br />
          {
            "If you are an Associate, Affiliate or Builder Member and would be willing to serve on this committee, please contact "
          }
          <_Builtin.Link
            className={_utils.cx(_styles, "p-main-link")}
            button={false}
            block=""
            options={emailLink}
          >
            {"Kimberly Eaton-Pregler"}
          </_Builtin.Link>
          {
            ", Executive Vice President. Your name will be given to the Secretary/Treasurer for consideration."
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "committee-item")}
        tag="div"
      >
        <_Builtin.Heading tag="h3">{"executive committee"}</_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "p-main", "space-40")}
          tag="div"
        >
          {
            "The Executive Committee is made up of the elected officers of the GFWBA. The Executive Committee includes the President, First Vice President, and 5 Vice Presidents, and a Secretary Treasurer. With the exception of the President, they are elected by the Board at their initial meeting for the fiscal year and hold office for a term of 1 year. The Board may elect or appoint additional officers as it deems desirable."
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "committee-item")}
        tag="div"
      >
        <_Builtin.Heading tag="h3">
          {"government affairs committee"}
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "p-main", "space-40")}
          tag="div"
        >
          {
            "The Government Affairs Committee is charged with overseeing and coordinating the government affairs activities and programs of the GFWBA to execute the objectives of the Association. "
          }
          <br />
          <br />
          {
            "The Government Affairs Committee meets monthly to discuss issues affecting our 7 county jurisdiction. This committee continually works to foster good working relationships with all elected officials.  "
          }
          <br />
          <br />
          {
            "The Government Affairs Committee also plans and executes our annual Municipal Awards Night. "
          }
          <br />
          <br />
          {
            "If you are a GFWBA Member and would like to join this committee, please contact "
          }
          <_Builtin.Link
            className={_utils.cx(_styles, "p-main-link")}
            button={false}
            block=""
            options={emailLink}
          >
            {"Kimberly Eaton-Pregler"}
          </_Builtin.Link>
          {", Executive Vice President."}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "committee-item")}
        tag="div"
      >
        <_Builtin.Heading tag="h3">{"hammer & nails pac"}</_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "p-main", "space-40")}
          tag="div"
        >
          {
            "The Hammer and Nails Political Action Committee (PAC) is an important element of GFWBA’s advocacy program, and is the political voice for the greater Fort Worth seven county home building industry. The purpose of the Hammer & Nails PAC is to contribute money to local and state candidates who understand and support the efforts of the building industry, and organize effective political action on behalf of our members and the home building industry. "
          }
          <br />
          <br />
          {"To learn more about the Hammer and Nails PAC, contact "}
          <_Builtin.Link
            className={_utils.cx(_styles, "p-main-link")}
            button={false}
            block=""
            options={emailLink}
          >
            {"Kimberly Eaton-Pregler"}
          </_Builtin.Link>
          {", Executive Vice President."}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "committee-item")}
        tag="div"
      >
        <_Builtin.Heading tag="h3">{"membership committee"}</_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "p-main", "space-40")}
          tag="div"
        >
          {
            "The Membership Committee has the duty and responsibility for recommending policy to the Board in the area of Membership. The committee promotes increased number of members and the quality of membership, proposes and develops information meetings between members, Directors, Officers, and staff, reviews and recommends member services and education program to the Board in conjunction with staff, has the responsibility of planning various membership activities, and recommends action to the Board on all applications for membership. "
          }
          <br />
          <br />
          {
            "The committee meets once a month. All GFWBA members are welcome to attend the Membership Committee meetings. "
          }
          <br />
          <br />
          {
            "If you are a GFWBA Member and would like to join this committee, please contact "
          }
          <_Builtin.Link
            className={_utils.cx(_styles, "p-main-link")}
            button={false}
            block=""
            options={emailLink}
          >
            {"Kimberly Eaton-Pregler"}
          </_Builtin.Link>
          {", Executive Vice President."}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "committee-item")}
        tag="div"
      >
        <_Builtin.Heading tag="h3">{"nominating committee"}</_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "p-main", "space-40")}
          tag="div"
        >
          {
            "The Nominating Committee is composed of 7 members of the Association. These members include the Immediate Past President, President and President Elect. The remaining members of the committee will be appointed by the President. The Chair is the Immediate Past President. "
          }
          <br />
          <br />
          {
            "The Nominating Committee annually solicits and recommends nominees for the Board of Directors. It reviews the duties and responsibilities of the Board positions with proposed nominees. The committee prepares and sends ballots to members of the association. The committee also presents the incoming Board with the slate of officers. "
          }
          <br />
          <br />
          {
            "If you are a GFWBA Member and would like to serve on this committee, please contact "
          }
          <_Builtin.Link
            className={_utils.cx(_styles, "p-main-link")}
            button={false}
            block=""
            options={emailLink}
          >
            {"Kimberly Eaton-Pregler"}
          </_Builtin.Link>
          {", Executive Vice President."}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "committee-item")}
        tag="div"
      >
        <_Builtin.Heading tag="h3">
          {"Professional Women in Building (PWB) Council"}
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "p-main", "space-40")}
          tag="div"
        >
          {
            "The Professional Women in Building Council (PWB) is the voice of women in the building industry, dedicated to promoting industry professionalism and supporting members at the local, state and national levels. "
          }
          <br />
          <br />
          {
            "Mission: Uniting and supporting women in the construction industry and in the communities we serve. PWB activities include professional development and philanthropic projects.  "
          }
          <br />
          <br />
          {"Dues are $75.00 per year. "}
          <br />
          <br />
          {
            "If you are a GFWBA Member and would like to join this committee, please contact "
          }
          <_Builtin.Link
            className={_utils.cx(_styles, "p-main-link")}
            button={false}
            block=""
            options={emailLink}
          >
            {"Kimberly Eaton-Pregler"}
          </_Builtin.Link>
          {", Executive Vice President."}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "committee-item")}
        tag="div"
      >
        <_Builtin.Heading tag="h3">
          {"young professionals committee"}
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "p-main", "space-40")}
          tag="div"
        >
          {
            "The Young Professionals (YP) Committee offers an environment for educational, philanthropic, networking and career growth opportunities for Young Professionals (under 45) affiliated with the development, remodeling and homebuilding industries. The YP group meets monthly, and events contain an educational component often in the form of presentations by the Greater Fort Worth Builders Association members or industry leaders or networking events.  "
          }
          <br />
          <br />
          {
            "The Young Professionals Committee is active in all areas of the association. They host many events including a chili cookoff, a Fall Social and the Santa Claus Project – providing Christmas gifts and a party for area youth in need. "
          }
          <br />
          <br />
          {
            "If you are a GFWBA Member and would like to join this committee, please contact "
          }
          <_Builtin.Link
            className={_utils.cx(_styles, "p-main-link")}
            button={false}
            block=""
            options={emailLink}
          >
            {"Kimberly Eaton-Pregler"}
          </_Builtin.Link>
          {", Executive Vice President."}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
