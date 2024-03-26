import * as React from "react";
import * as Types from "./types";

declare function HomeMain(props: {
  as?: React.ElementType;
  homeJoin?: Types.Basic.Link;
  homeDirectory?: Types.Basic.Link;
  sidebarSlot?: Types.Devlink.Slot;
  homeGridRightSlot?: Types.Devlink.Slot;
}): React.JSX.Element;
