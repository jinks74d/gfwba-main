import * as React from "react";
import * as Types from "./types";

declare function SingleEventItem(props: {
  as?: React.ElementType;
  singleEventItemTitle?: React.ReactNode;
  singleEventItemDate?: React.ReactNode;
  singleEventItemLocation?: React.ReactNode;
  singleEventItemTime?: React.ReactNode;
  singleEventItemDescription?: React.ReactNode;
  singleEventItemLink?: Types.Basic.Link;
  singleEventItemRegistration?: Types.Devlink.Slot;
  singleEventItemDescriptionSlot?: Types.Devlink.Slot;
}): React.JSX.Element;
