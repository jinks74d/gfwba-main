"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./EventListCard.module.css";

export function EventListCard({
  as: _Component = _Builtin.Block,
  eventTitle = "Professional Women in Building Council Meeting",
  eventDate = "January 10, 2024",
  eventTime = "11:30 am - 1:00 pm",
  eventLocation = (
    <>
      {"Reece Expressions Home Gallery 5001 Bryant Irvin Rd. N. "}
      <br />
      {"Fort Worth"}
    </>
  ),

  eventLink = {
    href: "#",
  },
}) {
  return (
    <_Component className={_utils.cx(_styles, "event-list-item")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "event-list-item-left")}
        id={_utils.cx(
          _styles,
          "w-node-_0ab64e90-b3c3-94fa-02b5-fe7196b895ff-96b895fe"
        )}
        tag="div"
      >
        <_Builtin.Heading
          className={_utils.cx(_styles, "event-list-item-title")}
          tag="h3"
        >
          {eventTitle}
        </_Builtin.Heading>
        <_Builtin.Block
          className={_utils.cx(_styles, "event-list-item-date")}
          tag="div"
        >
          {eventDate}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "event-list-item-time")}
          tag="div"
        >
          {eventTime}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "event-list-item-location")}
          tag="div"
        >
          {eventLocation}
        </_Builtin.Block>
        <_Builtin.Link
          className={_utils.cx(_styles, "red-btn")}
          button={true}
          block=""
          options={eventLink}
        >
          {"Register"}
        </_Builtin.Link>
      </_Builtin.Block>
      // <_Builtin.Block
      //   className={_utils.cx(_styles, "event-list-item-right")}
      //   tag="div"
      // >
      //   // <_Builtin.Image
      //   //   className={_utils.cx(_styles, "event-list-item-image")}
      //   //   loading="lazy"
      //   //   width="auto"
      //   //   height="auto"
      //   //   alt=""
      //   //   src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/659c4411b9d7b8c85929985d_PWB%202024%20January%20Meeting.png"
      //   // />
      // </_Builtin.Block>
    </_Component>
  );
}
