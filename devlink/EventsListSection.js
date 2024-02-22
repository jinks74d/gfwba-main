import React from "react";
import * as _Builtin from "./_Builtin";
import { EventListCard } from "./EventListCard";
import { EventItemSidebar } from "./EventItemSidebar";
import * as _utils from "./utils";
import _styles from "./EventsListSection.module.css";

export function EventsListSection({
  as: _Component = _Builtin.Section,
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

  calendarPane,
  listPane,
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
          {"GFWBA EVENTS"}
        </_Builtin.Heading>
        <_Builtin.Block className={_utils.cx(_styles, "text-block")} tag="div">
          {"Register for Upcoming Events"}
          <br />
          {""}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "home-grid")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-left")}
            id={_utils.cx(
              _styles,
              "w-node-_1fe1735a-5937-c76b-3bfd-7fcdf1bbf06f-f1bbf066"
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
                <_Builtin.Strong>{"Get Your Company Noticed"}</_Builtin.Strong>
                <br />
                {
                  "The Membership Committee is looking for SWAG (Advertising) to include in the New Member Buckets. If you would like to include Marketing/PR items, please bring them to the next Membership Committee Meeting or Business After Hours. Dates, time and location for these events can be found on the calendar below."
                }
                <br />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"UPCOMING EVENTS"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "space-40")}
              tag="div"
            >
              {
                "Our primary purposes are to provide information exchange, communication and education for members; to interact with local, state and federal legislative bodies to foster a positive building climate; to provide a forum to implement policies that affect the building industry; and to promote professionalism among our members."
              }
            </_Builtin.Block>
            <_Builtin.TabsWrapper
              className={_utils.cx(_styles, "event-tabs")}
              current="Tab 1"
              easing="ease"
              fadeIn={300}
              fadeOut={100}
            >
              <_Builtin.TabsMenu tag="div">
                <_Builtin.TabsLink
                  className={_utils.cx(_styles, "tab-link-tab-1")}
                  data-w-tab="Tab 1"
                  block="inline"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-block-4")}
                    tag="div"
                  >
                    {"Calendar"}
                  </_Builtin.Block>
                </_Builtin.TabsLink>
                <_Builtin.TabsLink
                  className={_utils.cx(_styles, "tab-link-tab-2")}
                  data-w-tab="Tab 2"
                  block="inline"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-block-5")}
                    tag="div"
                  >
                    {"List View"}
                  </_Builtin.Block>
                </_Builtin.TabsLink>
              </_Builtin.TabsMenu>
              <_Builtin.TabsContent
                className={_utils.cx(_styles, "tabs-content")}
                tag="div"
              >
                <_Builtin.TabsPane
                  className={_utils.cx(_styles, "event-calendar-tab")}
                  tag="div"
                  data-w-tab="Tab 1"
                >
                  {calendarPane}
                </_Builtin.TabsPane>
                <_Builtin.TabsPane
                  className={_utils.cx(_styles, "event-list-tab")}
                  tag="div"
                  data-w-tab="Tab 2"
                >
                  {listPane ?? (
                    <>
                      <EventListCard
                        eventTitle={eventTitle}
                        eventDate={eventDate}
                        eventTime={eventTime}
                        eventLocation={eventLocation}
                        eventLink={eventLink}
                      />
                      <_Builtin.Block
                        className={_utils.cx(_styles, "event-list-item")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "event-list-item-left")}
                          id={_utils.cx(
                            _styles,
                            "w-node-_35221ded-0d43-a2fb-047a-a45cdf1919e0-f1bbf066"
                          )}
                          tag="div"
                        >
                          <_Builtin.Heading
                            className={_utils.cx(
                              _styles,
                              "event-list-item-title"
                            )}
                            tag="h3"
                          >
                            {eventTitle}
                          </_Builtin.Heading>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "event-list-item-date"
                            )}
                            tag="div"
                          >
                            {eventDate}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "event-list-item-time"
                            )}
                            tag="div"
                          >
                            {eventTime}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "event-list-item-location"
                            )}
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
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "event-list-item-right"
                          )}
                          tag="div"
                        >
                          <_Builtin.Image
                            className={_utils.cx(
                              _styles,
                              "event-list-item-image"
                            )}
                            width="auto"
                            height="auto"
                            loading="lazy"
                            alt=""
                            src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/659c4411b9d7b8c85929985d_PWB%202024%20January%20Meeting.png"
                          />
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </>
                  )}
                </_Builtin.TabsPane>
              </_Builtin.TabsContent>
            </_Builtin.TabsWrapper>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-right")}
            id={_utils.cx(
              _styles,
              "w-node-_1fe1735a-5937-c76b-3bfd-7fcdf1bbf097-f1bbf066"
            )}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"ASSOCIATION STAFF"}
            </_Builtin.Heading>
            <EventItemSidebar />
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
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
