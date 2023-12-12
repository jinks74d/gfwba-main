import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Navbar.module.css";

export function Navbar({
  as: _Component = _Builtin.NavbarWrapper,

  navDirectory = {
    href: "#",
  },

  navLogin = {
    href: "#",
  },
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "", "navbar")}
      tag="div"
      config={{
        animation: "default",
        collapse: "medium",
        docHeight: false,
        duration: 400,
        easing: "ease",
        easing2: "ease",
        noScroll: false,
      }}
    >
      <_Builtin.NavbarContainer
        className={_utils.cx(_styles, "container", "hide")}
        tag="div"
      >
        <_Builtin.NavbarBrand
          options={{
            href: "http://localhost:3000/",
          }}
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "image")}
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/654973dff5e6efeb48a605c2_gfwba-logo.png"
          />
        </_Builtin.NavbarBrand>
        <_Builtin.Block className={_utils.cx(_styles, "div-block")} tag="div">
          <_Builtin.Block className={_utils.cx(_styles, "dir-menu")} tag="div">
            <_Builtin.Link
              className={_utils.cx(_styles, "dir-button")}
              button={false}
              options={navDirectory}
            >
              {"MEMBER directory"}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "mem-button")}
              button={false}
              options={navLogin}
            >
              {"member login"}
            </_Builtin.Link>
          </_Builtin.Block>
          <_Builtin.NavbarMenu
            className={_utils.cx(_styles, "nav-menu")}
            tag="nav"
            role="navigation"
          >
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link")}
              options={{
                href: "http://localhost:3000/about",
              }}
            >
              {"ABOUT US"}
            </_Builtin.NavbarLink>
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link")}
              options={{
                href: "#",
              }}
            >
              {"MEMBERSHIP"}
            </_Builtin.NavbarLink>
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link")}
              options={{
                href: "#",
              }}
            >
              {"RESOURCES"}
            </_Builtin.NavbarLink>
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link")}
              options={{
                href: "#",
              }}
            >
              {"CONTACTUS"}
            </_Builtin.NavbarLink>
          </_Builtin.NavbarMenu>
        </_Builtin.Block>
        <_Builtin.NavbarButton tag="div">
          <_Builtin.Icon
            widget={{
              type: "icon",
              icon: "nav-menu",
            }}
          />
        </_Builtin.NavbarButton>
      </_Builtin.NavbarContainer>
      <_Builtin.Block className={_utils.cx(_styles, "container")} tag="div">
        <_Builtin.NavbarBrand
          options={{
            href: "http://localhost:3000/",
          }}
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "image")}
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/654973dff5e6efeb48a605c2_gfwba-logo.png"
          />
        </_Builtin.NavbarBrand>
        <_Builtin.Block className={_utils.cx(_styles, "div-block")} tag="div">
          <_Builtin.Block className={_utils.cx(_styles, "dir-menu")} tag="div">
            <_Builtin.Link
              className={_utils.cx(_styles, "dir-button")}
              button={false}
              options={navDirectory}
            >
              {"MEMBER directory"}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "mem-button")}
              button={false}
              options={navLogin}
            >
              {"member login"}
            </_Builtin.Link>
          </_Builtin.Block>
          <_Builtin.NavbarMenu
            className={_utils.cx(_styles, "nav-menu")}
            tag="nav"
            role="navigation"
          >
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link")}
              options={{
                href: "http://localhost:3000/about",
              }}
            >
              {"ABOUT US"}
            </_Builtin.NavbarLink>
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link")}
              options={{
                href: "#",
              }}
            >
              {"MEMBERSHIP"}
            </_Builtin.NavbarLink>
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link")}
              options={{
                href: "#",
              }}
            >
              {"RESOURCES"}
            </_Builtin.NavbarLink>
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link")}
              options={{
                href: "#",
              }}
            >
              {"CONTACTUS"}
            </_Builtin.NavbarLink>
          </_Builtin.NavbarMenu>
        </_Builtin.Block>
        <_Builtin.NavbarButton tag="div">
          <_Builtin.Icon
            widget={{
              type: "icon",
              icon: "nav-menu",
            }}
          />
        </_Builtin.NavbarButton>
      </_Builtin.Block>
    </_Component>
  );
}
