import * as React from "react";
import * as Types from "./types";

declare function EventListCard(props: {
  as?: React.ElementType;
  eventTitle?: React.ReactNode;
  eventDate?: React.ReactNode;
  eventTime?: React.ReactNode;
  eventLocation?: React.ReactNode;
  eventLink?: Types.Basic.Link;
}): React.JSX.Element;
