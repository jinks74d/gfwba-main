import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MemberListItem.module.css";

export function MemberListItem({
  as: _Component = _Builtin.Block,
  memberListLogo = "https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/657736e55d97c9cd83d3d38c_gfwba-logo-steer.png",
  memberListName = "Abner, Cody",
  memberListCompany = "Big Tex Renovations",
  memberListTitle = "Owner",
  memberListLocation = "Cleburne, Texas",
  memberListWebsite = "http://www.bigtexrenovations.com",
  memberListCategory = "Remodler",

  memberListItemLink = {
    href: "#",
  },
}) {
  return (
    <_Component className={_utils.cx(_styles, "member-list-item")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "member-list-item-img-blk")}
        tag="div"
      >
        <_Builtin.Image
          className={_utils.cx(_styles, "image-5")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src={memberListLogo}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "member-list-item-grid")}
        id={_utils.cx(
          _styles,
          "w-node-dc12aa47-3664-8463-15b0-01987724ce3d-5c4325d8"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "member-list-item-rt")}
          tag="div"
        >
          <_Builtin.Heading
            className={_utils.cx(_styles, "member-list-item-h3", "member-name")}
            tag="h3"
          >
            {memberListName}
          </_Builtin.Heading>
          <_Builtin.Block
            className={_utils.cx(_styles, "member-list-item-company")}
            tag="div"
          >
            {memberListCompany}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "member-list-item-rt")}
          tag="div"
        >
          <_Builtin.List
            className={_utils.cx(_styles, "member-list-item-list")}
            tag="ul"
            unstyled={true}
          >
            <_Builtin.ListItem>
              <_Builtin.Block
                className={_utils.cx(_styles, "member-list-item-list-title")}
                tag="div"
              >
                {memberListTitle}
              </_Builtin.Block>
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-block-2")}
                tag="div"
              >
                {memberListLocation}
              </_Builtin.Block>
            </_Builtin.ListItem>
            <_Builtin.ListItem>
              <_Builtin.Block tag="div">
                <_Builtin.Link
                  className={_utils.cx(_styles, "link")}
                  button={false}
                  target="_blank"
                  block=""
                  options={{
                    href: "http://www.bigtexrenovations.com/",
                  }}
                >
                  {memberListWebsite}
                </_Builtin.Link>
                {""}
              </_Builtin.Block>
            </_Builtin.ListItem>
          </_Builtin.List>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "member-list-item-rt")}
          tag="div"
        >
          <_Builtin.List
            className={_utils.cx(_styles, "member-list-item-list")}
            tag="ul"
            unstyled={true}
          >
            <_Builtin.ListItem>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-block-3")}
                tag="div"
              >
                {memberListCategory}
              </_Builtin.Block>
            </_Builtin.ListItem>
          </_Builtin.List>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Link
        className={_utils.cx(_styles, "member-list-item-rt", "arrow-right")}
        button={false}
        block="inline"
        options={memberListItemLink}
      >
        <_Builtin.Image
          className={_utils.cx(_styles, "image-7")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/65774bb69a97b1605666cf85_chevron-right%402x.png"
        />
      </_Builtin.Link>
    </_Component>
  );
}
