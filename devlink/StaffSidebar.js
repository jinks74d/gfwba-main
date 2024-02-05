import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./StaffSidebar.module.css";

export function StaffSidebar({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "staff-item-blk")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "staff-item")} tag="div">
        <_Builtin.Image
          className={_utils.cx(_styles, "", "image-4")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655a86cc1de34c4d81716a2e_filller.png"
        />
        <_Builtin.Block className={_utils.cx(_styles, "staff-name")} tag="div">
          {"Kimberly Eaton-Pregler"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "staff-title")} tag="div">
          {"Executive Vice President"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "staff-item")} tag="div">
        <_Builtin.Image
          className={_utils.cx(_styles, "", "image-4")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655a86cc1de34c4d81716a2e_filller.png"
        />
        <_Builtin.Block className={_utils.cx(_styles, "staff-name")} tag="div">
          {"Sharon Liles Love"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "staff-title")} tag="div">
          {"Director of Operations"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "staff-item")} tag="div">
        <_Builtin.Image
          className={_utils.cx(_styles, "", "image-4")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655a86cc1de34c4d81716a2e_filller.png"
        />
        <_Builtin.Block className={_utils.cx(_styles, "staff-name")} tag="div">
          {"Shannon Claybaugh"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "staff-title")} tag="div">
          {"Director of Member Services/"}
          <br />
          {"Certified Master Builder Administrator"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
