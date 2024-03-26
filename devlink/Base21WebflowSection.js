import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Base21WebflowSection.module.css";

export function Base21WebflowSection({
  as: _Component = _Builtin.Section,
  heading = {},
  subHeading = {},
  sideHeading = {},
  baseHeading = "THE FEDERATION",
  baseSubheading = "Your Three Tiered Membership",
  baseSideHeading = "ASSOCIATIONSTAFF",
  baseGridLeftSlot,
  homeGridRightSlot,
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
          {baseHeading}
        </_Builtin.Heading>
        <_Builtin.Block className={_utils.cx(_styles, "text-block")} tag="div">
          {baseSubheading}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "home-grid")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-left")}
            id={_utils.cx(
              _styles,
              "w-node-_66a5b6cb-6a7b-9ddb-b18e-c74662f8aed3-62f8aecc"
            )}
            tag="div"
          >
            {baseGridLeftSlot}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-right")}
            id={_utils.cx(
              _styles,
              "w-node-_66a5b6cb-6a7b-9ddb-b18e-c74662f8aed4-62f8aecc"
            )}
            tag="div"
          >
            {homeGridRightSlot}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
