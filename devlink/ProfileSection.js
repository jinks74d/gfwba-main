import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ProfileSection.module.css";

export function ProfileSection({
  as: _Component = _Builtin.Section,
  profileMainName = {},
  profMainName = "MICHAELGARABEDIAN",
  profMainComp = "GARABEDIANPROPERTIES",
  profTitle = "President/CEO",
  profOrganization = "Garabedian Properties",
  profAddress = "PO Box 93984, Southlake,TX 76092",
  profOffice = "817-748-2669",
  profCell = "N/A",
  profEmail = "mike@garabedian.us",
  profWebsite = "www.garabedianproperties.com",
  profLogo = "https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/65661a5573f2e9c08f5352fb_elr11kio.png",
  profCategories = "Developer",
  profArea = "NWTarrant",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "section-2")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.BlockContainer
        className={_utils.cx(_styles, "container-1600")}
        grid={{
          type: "container",
        }}
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
                {"Email:"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main")}
                tag="div"
              >
                <_Builtin.Link
                  button={false}
                  target="_blank"
                  options={{
                    href: "mailto:mike@garabedian.us",
                  }}
                >
                  {profEmail}
                </_Builtin.Link>
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
                  options={{
                    href: "mailto:mike@garabedian.us",
                  }}
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
            {typeof profCategories == 'object' &&
              <>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main-bold")}
                  tag="div"
                >
                  {"CATEGORIES"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main", "p-main-lh")}
                  tag="div"
                >
                  {profCategories.map((c) => (<p key={c}>{c}</p>))}
                </_Builtin.Block>
              </>
            }
            {/* <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "p-main-lh")}
              tag="div"
            >
              {"Custom Builder"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "p-main-lh")}
              tag="div"
            >
              {"Build on Your Lot"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "p-main-lh")}
              tag="div"
            >
              {"Certified Master Builder"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "p-main-lh", "space-40")}
              tag="div"
            >
              {"Outbuildings - Other structures"}
            </_Builtin.Block> */}
            {typeof profArea == 'object' &&
              <>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main-bold")}
                  tag="div"
                >
                  {"SERVICEAREAS"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "p-main", "p-main-lh")}
                  tag="div"
                >
                  {profArea.map((a) => (<p key={a}>{a}</p>))}
                </_Builtin.Block>
              </>
            }
            {/* <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "p-main-lh", "space-40")}
              tag="div"
            >
              {"SWTarrant"}
            </_Builtin.Block> */}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.BlockContainer>
    </_Component>
  );
}
