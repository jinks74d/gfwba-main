import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./HomeHero.module.css";

export function HomeHero({
  as: _Component = _Builtin.Section,

  heroDirectory = {
    href: "#",
  },

  heroJoin = {
    href: "#",
  },
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "section")}
      grid={{
        type: "section",
      }}
      tag="section"
      id="homeHoro"
    >
      <_Builtin.Block className={_utils.cx(_styles, "hero-btn-blk")} tag="div">
        <_Builtin.Link
          className={_utils.cx(_styles, "hero-btn-blk-item", "item-blue")}
          button={false}
          options={heroDirectory}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "hero-btn-blk-item-text-1", "hide")}
            tag="div"
          >
            {"find a professional"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "hero-btn-blk-item-text-2")}
            tag="div"
          >
            {"member"}
            <br />
            {"directory"}
          </_Builtin.Block>
        </_Builtin.Link>
        <_Builtin.Link
          className={_utils.cx(_styles, "hero-btn-blk-item", "item-red")}
          button={false}
          options={heroJoin}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "hero-btn-blk-item-text-1")}
            tag="div"
          >
            {"become a member"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "hero-btn-blk-item-text-2")}
            tag="div"
          >
            {"join now"}
          </_Builtin.Block>
        </_Builtin.Link>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cj(_utils.cx(_styles, ""), "w-clearfix")}
        tag="div"
      >
        <_Builtin.Image
          className={_utils.cx(_styles, "hero-img")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/65525cb8453835c98ab6ed97_home-hero.jpg"
        />
      </_Builtin.Block>
    </_Component>
  );
}
