import * as React from "react";
import * as Types from "./types";

declare function EventItemSidebar(props: {
  as?: React.ElementType;
  eventListItemTitle?: React.ReactNode;
  eventListItemDate?: React.ReactNode;
  eventListItemLocation?: React.ReactNode;
  eventListItemLink?: Types.Basic.Link;
}): React.JSX.Element;
