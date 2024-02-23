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

  navHome = {
    href: "#",
  },

  navAbout = {
    href: "http://localhost:3000/about",
  },

  navMembership = {
    href: "#",
  },

  navResources = {
    href: "#",
  },

  navContact = {
    href: "#",
  },

  loginLogout,
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
      <_Builtin.Block className={_utils.cx(_styles, "container")} tag="div">
        <_Builtin.NavbarBrand
          className={_utils.cx(_styles, "brand")}
          options={navHome}
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
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block", "hide")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "dir-menu")} tag="div">
            <_Builtin.Link
              className={_utils.cx(_styles, "dir-button")}
              button={false}
              block=""
              options={{
                href: "/directory",
              }}
            >
              {"MEMBER directory"}
            </_Builtin.Link>
            <_Builtin.Link
              className={_utils.cx(_styles, "mem-button", "hide")}
              button={false}
              block=""
              options={navLogin}
            >
              {"member login"}
            </_Builtin.Link>
            <_Builtin.Block tag="div">{loginLogout}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.NavbarMenu
            className={_utils.cx(_styles, "nav-menu")}
            tag="nav"
            role="navigation"
          >
            <_Builtin.DropdownWrapper tag="div" delay={0} hover={false}>
              <_Builtin.DropdownToggle
                className={_utils.cx(_styles, "dropdown-toggle")}
                tag="div"
              >
                <_Builtin.Icon
                  className={_utils.cx(_styles, "nav-dd-icon")}
                  widget={{
                    type: "icon",
                    icon: "dropdown-toggle",
                  }}
                />
                <_Builtin.Link
                  className={_utils.cx(_styles, "dd-main-link")}
                  button={false}
                  block="inline"
                  options={{
                    href: "/about",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "nav-link")}
                    tag="div"
                  >
                    {"ABOUT US"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.DropdownToggle>
              <_Builtin.DropdownList
                className={_utils.cx(_styles, "dropdown-list-2")}
                tag="nav"
              >
                <_Builtin.DropdownLink
                  className={_utils.cx(_styles, "dd-link")}
                  options={{
                    href: "/history",
                  }}
                >
                  {"HISTORY"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  className={_utils.cx(_styles, "dd-link")}
                  options={{
                    href: "/organization-structure",
                  }}
                >
                  {"ORGANIZATION SRUCTURE"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  className={_utils.cx(_styles, "dd-link")}
                  options={{
                    href: "#",
                  }}
                >
                  {"LEADERSHIP"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  className={_utils.cx(_styles, "dd-link")}
                  options={{
                    href: "/hammer-and-nails-pac",
                  }}
                >
                  {"HAMMER & NAILS PAC"}
                </_Builtin.DropdownLink>
              </_Builtin.DropdownList>
            </_Builtin.DropdownWrapper>
            <_Builtin.DropdownWrapper tag="div" delay={0} hover={false}>
              <_Builtin.DropdownToggle
                className={_utils.cx(_styles, "dropdown-toggle")}
                tag="div"
              >
                <_Builtin.Icon
                  className={_utils.cx(_styles, "nav-dd-icon")}
                  widget={{
                    type: "icon",
                    icon: "dropdown-toggle",
                  }}
                />
                <_Builtin.Link
                  className={_utils.cx(_styles, "dd-main-link")}
                  button={false}
                  block="inline"
                  options={{
                    href: "/membership",
                  }}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "nav-link")}
                    tag="div"
                  >
                    {"MEMBERSHIP"}
                  </_Builtin.Block>
                </_Builtin.Link>
              </_Builtin.DropdownToggle>
              <_Builtin.DropdownList
                className={_utils.cx(_styles, "dropdown-list-2")}
                tag="nav"
              >
                <_Builtin.DropdownLink
                  className={_utils.cx(_styles, "dd-link")}
                  options={{
                    href: "/discounts",
                  }}
                >
                  {"MEMBER BENEFITS"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  className={_utils.cx(_styles, "dd-link")}
                  options={{
                    href: "/faq",
                  }}
                >
                  {"FAQs"}
                </_Builtin.DropdownLink>
                <_Builtin.DropdownLink
                  className={_utils.cx(_styles, "dd-link")}
                  options={{
                    href: "/committees-and-councils",
                  }}
                >
                  {"COMMITTEES & COUNCILS"}
                </_Builtin.DropdownLink>
              </_Builtin.DropdownList>
            </_Builtin.DropdownWrapper>
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link")}
              options={{
                href: "/events",
              }}
            >
              {"EVENTS"}
            </_Builtin.NavbarLink>
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link", "hide")}
              options={navResources}
            >
              {"RESOURCES"}
            </_Builtin.NavbarLink>
            <_Builtin.NavbarLink
              className={_utils.cx(_styles, "nav-link")}
              options={{
                href: "/contact",
              }}
            >
              {"CONTACT US"}
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
