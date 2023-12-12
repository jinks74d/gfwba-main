import * as React from "react";
import * as Types from "./types";

declare function Navbar(props: {
  as?: React.ElementType;
  navDirectory?: Types.Basic.Link;
  navLogin?: Types.Basic.Link;
  navHome?: Types.Basic.Link;
  navAbout?: Types.Basic.Link;
  navMembership?: Types.Basic.Link;
  navResources?: Types.Basic.Link;
  navContact?: Types.Basic.Link;
}): React.JSX.Element;
