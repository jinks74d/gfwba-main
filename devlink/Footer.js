import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Footer.module.css";

export function Footer({
  as: _Component = _Builtin.Section,

  footerInsta = {
    href: "#",
    target: "_blank",
  },

  footerFacebook = {
    href: "#",
    target: "_blank",
  },

  footerX = {
    href: "#",
    target: "_blank",
  },

  footerLinkedIn = {
    href: "#",
    target: "_blank",
  },
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "section-3")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "container-1600", "footer-grid")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "home-grid-left", "footer-left")}
          id={_utils.cx(
            _styles,
            "w-node-f7af06b8-9a8e-823f-2dae-e2766151a725-6151a723"
          )}
          tag="div"
        >
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/6552b303a3c6ebfd1a6e400d_gfwba-logo-text-white.png"
          />
          <_Builtin.Block className={_utils.cx(_styles, "icon-blk")} tag="div">
            <_Builtin.Link button={false} block="inline" options={footerInsta}>
              <_Builtin.Image
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/6552b6c3066485790a943747_insta-icon.png"
              />
            </_Builtin.Link>
            <_Builtin.Link
              button={false}
              block="inline"
              options={footerFacebook}
            >
              <_Builtin.Image
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/6552b6c3849f48fbf85a6440_facebook-icon.png"
              />
            </_Builtin.Link>
            <_Builtin.Link button={false} block="inline" options={footerX}>
              <_Builtin.Image
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/6552b6c3df8f15551ef4c87b_x-icon.png"
              />
            </_Builtin.Link>
            <_Builtin.Link
              button={false}
              block="inline"
              options={footerLinkedIn}
            >
              <_Builtin.Image
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/6552b6c3ed5867b9b86646d7_linkedin-icon.png"
              />
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "home-grid-right")}
          id={_utils.cx(
            _styles,
            "w-node-f7af06b8-9a8e-823f-2dae-e2766151a72c-6151a723"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "address-blk")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "address-left")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"ADDRESS:"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "address-right")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "footer-text")}
                tag="div"
              >
                {"100 E. 15th Street, Suite 600"}
                <br />
                {"Fort Worth, Texas 76102"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "address-blk")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "address-left")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"PHONE:"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "address-right")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"817-284-3566"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "address-blk")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "address-left")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"FAX:"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "address-right")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"817-284-6465"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "address-blk")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "address-left")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"EMAIL:"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "address-right")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                {"info@fortworthbuilders.org"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "container-1600", "footer-bar")}
        tag="div"
      >
        <_Builtin.Link
          className={_utils.cx(_styles, "admin-link")}
          button={false}
          block=""
          options={{
            href: "https://gfwbatx.com/admin",
            target: "_blank",
          }}
        >
          {"Admin Login"}
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  );
}
