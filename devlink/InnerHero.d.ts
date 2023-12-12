import * as React from "react";
import * as Types from "./types";

declare function InnerHero(props: {
  as?: React.ElementType;
  heroImage?: Types.Asset.Image;
  heroDirectory?: Types.Basic.Link;
  heroJoin?: Types.Basic.Link;
}): React.JSX.Element;
