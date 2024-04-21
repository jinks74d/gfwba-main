"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AdsSidebar.module.css";

export function AdsSidebar({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "staff-item-blk")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "staff-item")} tag="div">
        <_Builtin.NotSupported _atom="LightboxWrapper" />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "staff-item")} tag="div">
        <_Builtin.NotSupported _atom="LightboxWrapper" />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "staff-item")} tag="div">
        <_Builtin.NotSupported _atom="LightboxWrapper" />
      </_Builtin.Block>
    </_Component>
  );
}
