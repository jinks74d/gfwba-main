import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./EventItemSidebar.module.css";

export function EventItemSidebar({
  as: _Component = _Builtin.Block,
  eventListItemTitle = "Professional Women in Building Council Meeting",
  eventListItemDate = "January 10, 2024",
  eventListItemLocation = (
    <>
      {"Reece Expressions Home Gallery 5001 Bryant Irvin Rd. N. "}
      <br />
      {"Fort Worth"}
    </>
  ),

  eventListItemLink = {
    href: "#",
  },

  eventListItemTime = "11:30 am - 1:00 pm",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "event-list-item-sidebar")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "event-list-item-left")}
        id={_utils.cx(
          _styles,
          "w-node-_7a49c071-13ee-5393-c30f-96735e9e75d1-5e9e75d0"
        )}
        tag="div"
      >
        <_Builtin.Heading
          className={_utils.cx(_styles, "event-list-item-title")}
          tag="h3"
        >
          {eventListItemTitle}
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "event-list-item-date", "mb-1-5")}
          tag="div"
        >
          {eventListItemDate}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "event-list-item-time")}
          tag="div"
        >
          {eventListItemTime}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "event-list-item-sidebar-location")}
          tag="div"
        >
          {eventListItemLocation}
        </_Builtin.Block>
        <_Builtin.Link
          className={_utils.cx(_styles, "red-btn", "red-btn-sidebar")}
          button={true}
          block=""
          options={eventListItemLink}
        >
          {"Learn More"}
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  );
}
