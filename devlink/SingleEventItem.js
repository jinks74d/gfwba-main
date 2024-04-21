"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SingleEventItem.module.css";

export function SingleEventItem({
  as: _Component = _Builtin.Block,
  singleEventItemTitle = "Professional Women in Building Council Meeting",
  singleEventItemDate = "January 10, 2024",
  singleEventItemLocation = (
    <>
      {"Reece Expressions Home Gallery 5001 Bryant Irvin Rd. N. "}
      <br />
      {"Fort Worth"}
    </>
  ),
  singleEventItemTime = "11:30 am - 1:00 pm",
  singleEventItemDescription = (
    <>
      {
        "The Membership Committee has the duty and responsibility for recommending policy to the Board in the area of Membership. The committee promotes increased number of members and the quality of membership, proposes and develops information meetings between members, Directors, Officers, and staff, reviews and recommends member services and education programs to the Board in conjunction with staff, has the responsibility of planning various membership activities, and recommends action to the Board on all applications for membership. The committee meets once a month."
      }
      <br />
      <br />
      {
        "All GFWBA members are welcome to attend the Membership Committee meetings. s If you are a GFWBA Member and would like to join this committee, please contact "
      }
      {" Executive Vice President. "}
      <br />
      <br />
      {"Membership Committee Chair - "}
      {"- FBS Appliance"}
      <br />
      {"Membership Committee Chair - "}
      {" - Texas Door & Trim"}
    </>
  ),

  singleEventItemLink = {
    href: "#",
  },

  singleEventItemRegistration,
  singleEventItemDescriptionSlot,
}) {
  return (
    <_Component className={_utils.cx(_styles, "single-event-item")} tag="div">
      <_Builtin.Heading
        className={_utils.cx(_styles, "single-event-item-title")}
        tag="h2"
      >
        {singleEventItemTitle}
      </_Builtin.Heading>
      <_Builtin.Block
        className={_utils.cx(_styles, "single-event-item-date", "mb-3")}
        tag="div"
      >
        {singleEventItemDate}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "single-event-item-time")}
        tag="div"
      >
        {singleEventItemTime}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "single-event-item-location")}
        tag="div"
      >
        {singleEventItemLocation}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "single-event-item-description", "hide")}
        tag="div"
      >
        {singleEventItemDescription}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {singleEventItemDescriptionSlot}
      </_Builtin.Block>
      <_Builtin.Link
        className={_utils.cx(_styles, "red-btn", "red-btn-sidebar", "hide")}
        button={true}
        block=""
        options={singleEventItemLink}
      >
        {"Register"}
      </_Builtin.Link>
      <_Builtin.Block tag="div">{singleEventItemRegistration}</_Builtin.Block>
    </_Component>
  );
}
