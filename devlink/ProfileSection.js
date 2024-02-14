import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ProfileSection.module.css";

export function ProfileSection({
  as: _Component = _Builtin.Section,
  profileMainName = {},
  profMainName = "",
  profMainComp = "",
  profTitle = "",
  profOrganization = "",
  profAddress = "",
  profOffice = "",
  profCell = "",
  profEmail = "",
  profWebsite = "",
  profLogo = "https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/657736e55d97c9cd83d3d38c_gfwba-logo-steer.png",
  profCategories = "Developer",
  profArea = "NWTarrant",

  profEmailAddress = {
    href: "#",
  },

  profWebsiteAddress = {
    href: "#",
    target: "_blank",
  },
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
          {profMainName}
        </_Builtin.Heading>
        <_Builtin.Block className={_utils.cx(_styles, "text-block")} tag="div">
          {profMainComp}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "home-grid")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-left")}
            id={_utils.cx(
              _styles,
              "w-node-f8646bb1-4b20-1190-de99-618fa8856e25-a8856e1e"
            )}
            tag="div"
          >
            <_Builtin.Heading tag="h3">{"profile"}</_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "biz-info-item")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main-bold")}
                tag="div"
              >
                {"Title:"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main")}
                tag="div"
              >
                {profTitle}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "biz-info-item")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main-bold")}
                tag="div"
              >
                {"Organization:"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main")}
                tag="div"
              >
                {profOrganization}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "biz-info-item")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main-bold")}
                tag="div"
              >
                {"Address:"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main")}
                tag="div"
              >
                {profAddress}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "biz-info-item")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main-bold")}
                tag="div"
              >
                {"Office Phone:"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main")}
                tag="div"
              >
                {profOffice}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "biz-info-item")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main-bold")}
                tag="div"
              >
                {"Cell Phone:"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main")}
                tag="div"
              >
                {profCell}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "biz-info-item")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main-bold")}
                tag="div"
              >
                {"Website:"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main")}
                tag="div"
              >
                <_Builtin.Link
                  button={false}
                  target="_blank"
                  block=""
                  options={profWebsiteAddress}
                >
                  {profWebsite}
                </_Builtin.Link>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-right")}
            id={_utils.cx(
              _styles,
              "w-node-f8646bb1-4b20-1190-de99-618fa8856e4d-a8856e1e"
            )}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"COMPANY"}
            </_Builtin.Heading>
            <_Builtin.Image
              className={_utils.cx(_styles, "profile-logo")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src={profLogo}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main-bold")}
              tag="div"
            >
              {"CATEGORIES"}
            </_Builtin.Block>
            <_Builtin.List
              className={_utils.cx(_styles, "member-list-item-list")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main", "p-main-lh")}
                  tag="div"
                >
                  {profCategories}
                </_Builtin.Block>
              </_Builtin.ListItem>
            </_Builtin.List>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main-bold")}
              tag="div"
            >
              {"SERVICE AREAS"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "p-main-lh")}
              tag="div"
            >
              {profArea}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
