import * as React from "react";
import * as Types from "./types";

declare function EventsListSection(props: {
  as?: React.ElementType;
  eventTitle?: React.ReactNode;
  eventDate?: React.ReactNode;
  eventTime?: React.ReactNode;
  eventLocation?: React.ReactNode;
  eventLink?: Types.Basic.Link;
  calendarPane?: Types.Devlink.Slot;
  listPane?: Types.Devlink.Slot;
}): React.JSX.Element;
