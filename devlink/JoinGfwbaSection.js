"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JoinGfwbaSection.module.css";

export function JoinGfwbaSection({
  as: _Component = _Builtin.Section,
  joinFormSlot,
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
          {"JOIN GFWBA"}
        </_Builtin.Heading>
        <_Builtin.Block className={_utils.cx(_styles, "text-block")} tag="div">
          {"New Membership Application"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "home-grid")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-left")}
            id={_utils.cx(
              _styles,
              "w-node-_3fd8a6cc-3f8a-56be-ef07-a5bc06f5ed06-06f5ecff"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "join-form-info")}
              tag="div"
            >
              <_Builtin.Heading tag="h3">
                {"EFFECTIVE January 1, 2023"}
              </_Builtin.Heading>
              <_Builtin.Paragraph className={_utils.cx(_styles, "p-main")}>
                {"Builder Member Dues: $1050.00 per year"}
              </_Builtin.Paragraph>
              <_Builtin.Paragraph className={_utils.cx(_styles, "p-main")}>
                {"Builder Payment Plan: $98.00 per month"}
              </_Builtin.Paragraph>
              <_Builtin.Paragraph className={_utils.cx(_styles, "p-main")}>
                {"Associate Member Dues: $900.00 per year"}
              </_Builtin.Paragraph>
              <_Builtin.Paragraph className={_utils.cx(_styles, "p-main")}>
                {"Associate Payment Plan: $83.00 per month"}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "join-form-info", "mt-40")}
              tag="div"
            >
              <_Builtin.Paragraph className={_utils.cx(_styles, "p-main")}>
                {
                  "Affiliate Memberships are available at $175.00. For more information, please contact administration at (817) 284-3566 or email info@fortworthbuilders.org."
                }
              </_Builtin.Paragraph>
              <_Builtin.Paragraph className={_utils.cx(_styles, "p-main")}>
                {
                  "Applicants agree to abide by the Greater Fort Worth Builders Association Bylaws and Association policy. "
                }
                <br />
                {""}
              </_Builtin.Paragraph>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "join-form-slot")}
              tag="div"
            >
              {joinFormSlot}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-right")}
            id={_utils.cx(
              _styles,
              "w-node-_3fd8a6cc-3f8a-56be-ef07-a5bc06f5ed1a-06f5ecff"
            )}
            tag="div"
          >
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"MEMBER LEVELS"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "member-levels")}
              tag="div"
            >
              <_Builtin.DropdownWrapper
                className={_utils.cx(_styles, "dropdown")}
                tag="div"
                delay={0}
                hover={false}
              >
                <_Builtin.DropdownToggle
                  className={_utils.cx(_styles, "p-main", "dd-head")}
                  tag="div"
                >
                  <_Builtin.Icon
                    widget={{
                      type: "icon",
                      icon: "dropdown-toggle",
                    }}
                  />
                  <_Builtin.Block tag="div">
                    <_Builtin.Strong>
                      {"Builder - $1,050.00 (USD)"}
                    </_Builtin.Strong>
                  </_Builtin.Block>
                </_Builtin.DropdownToggle>
                <_Builtin.DropdownList
                  className={_utils.cx(_styles, "dropdown-list", "dd-list")}
                  tag="nav"
                >
                  <_Builtin.List
                    className={_utils.cx(_styles, "dd-list", "dd-list-1")}
                    tag="ul"
                    unstyled={false}
                  >
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "p-main", "dd-li")}
                    >
                      <_Builtin.Paragraph>
                        {"Subscription period: 1 year"}
                      </_Builtin.Paragraph>
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "p-main", "dd-li")}
                    >
                      <_Builtin.Paragraph>
                        {"No automatically recurring payments"}
                      </_Builtin.Paragraph>
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "p-main", "dd-li")}
                    >
                      <_Builtin.Paragraph>
                        {
                          "Builder Membership is available to builders, developers and remodelers."
                        }
                      </_Builtin.Paragraph>
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "p-main", "dd-li")}
                    >
                      <_Builtin.Paragraph>
                        {
                          "Membership dues are non-refundable and will not be prorated."
                        }
                        <br />
                        {""}
                      </_Builtin.Paragraph>
                    </_Builtin.ListItem>
                  </_Builtin.List>
                </_Builtin.DropdownList>
              </_Builtin.DropdownWrapper>
              <_Builtin.DropdownWrapper
                className={_utils.cx(_styles, "dropdown")}
                tag="div"
                delay={0}
                hover={false}
              >
                <_Builtin.DropdownToggle
                  className={_utils.cx(_styles, "p-main", "dd-head")}
                  tag="div"
                >
                  <_Builtin.Icon
                    widget={{
                      type: "icon",
                      icon: "dropdown-toggle",
                    }}
                  />
                  <_Builtin.Block tag="div">
                    <_Builtin.Strong>
                      {"Builder PP23 - $98.00 (USD)"}
                    </_Builtin.Strong>
                  </_Builtin.Block>
                </_Builtin.DropdownToggle>
                <_Builtin.DropdownList
                  className={_utils.cx(_styles, "dropdown-list", "dd-list")}
                  tag="nav"
                >
                  <_Builtin.List
                    className={_utils.cx(_styles, "dd-list", "dd-list-1")}
                    tag="ul"
                    unstyled={false}
                  >
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "p-main", "dd-li")}
                    >
                      <_Builtin.Paragraph>
                        {"Subscription period: Monthly"}
                      </_Builtin.Paragraph>
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "p-main", "dd-li")}
                    >
                      <_Builtin.Paragraph>
                        {"Automatic renewal (recurring payments)"}
                      </_Builtin.Paragraph>
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "p-main", "dd-li")}
                    >
                      <_Builtin.Paragraph>
                        {
                          "By selecting this option, you agree to a minimum of 12 monthly payments of $98.00 each. Your membership in the GFWBA will auto-renew each year on your anniversary date and monthly payments will continue. If payments are stopped during a membership year, you will be billed for the balance left for that year. If payments are stopped, you will not be eligible to enroll in the payment plan in the future. To cancel your membership, you must contact the GFWBA office 30 days prior to your anniversary date. If the installment payment is declined two times in a 12 month period, the GFWBA will balance bill for the remainder of that 12 month period. The member will not be eligible to enroll in the monthly payment plan until the following year. This policy will take effect January 1, 2020."
                        }
                      </_Builtin.Paragraph>
                    </_Builtin.ListItem>
                  </_Builtin.List>
                </_Builtin.DropdownList>
              </_Builtin.DropdownWrapper>
              <_Builtin.DropdownWrapper
                className={_utils.cx(_styles, "dropdown")}
                tag="div"
                delay={0}
                hover={false}
              >
                <_Builtin.DropdownToggle
                  className={_utils.cx(_styles, "p-main", "dd-head")}
                  tag="div"
                >
                  <_Builtin.Icon
                    widget={{
                      type: "icon",
                      icon: "dropdown-toggle",
                    }}
                  />
                  <_Builtin.Block tag="div">
                    <_Builtin.Strong>
                      {"Associate - $900.00 (USD)"}
                    </_Builtin.Strong>
                  </_Builtin.Block>
                </_Builtin.DropdownToggle>
                <_Builtin.DropdownList
                  className={_utils.cx(_styles, "dropdown-list", "dd-list")}
                  tag="nav"
                >
                  <_Builtin.List
                    className={_utils.cx(_styles, "dd-list", "dd-list-1")}
                    tag="ul"
                    unstyled={false}
                  >
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "p-main", "dd-li")}
                    >
                      <_Builtin.Paragraph>
                        {"Subscription period: 1 year"}
                      </_Builtin.Paragraph>
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "p-main", "dd-li")}
                    >
                      <_Builtin.Paragraph>
                        {"No automatically recurring payments"}
                      </_Builtin.Paragraph>
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "p-main", "dd-li")}
                    >
                      <_Builtin.Paragraph>
                        {"Associate Membership is available to non-builders."}
                      </_Builtin.Paragraph>
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "p-main", "dd-li")}
                    >
                      <_Builtin.Paragraph>
                        {
                          "Membership dues are non-refundable and will not be prorated."
                        }
                      </_Builtin.Paragraph>
                    </_Builtin.ListItem>
                  </_Builtin.List>
                </_Builtin.DropdownList>
              </_Builtin.DropdownWrapper>
              <_Builtin.DropdownWrapper
                className={_utils.cx(_styles, "dropdown")}
                tag="div"
                delay={0}
                hover={false}
              >
                <_Builtin.DropdownToggle
                  className={_utils.cx(_styles, "p-main", "dd-head")}
                  tag="div"
                >
                  <_Builtin.Icon
                    widget={{
                      type: "icon",
                      icon: "dropdown-toggle",
                    }}
                  />
                  <_Builtin.Block tag="div">
                    <_Builtin.Strong>
                      {"Associate PP23 - $83.00 (USD)"}
                    </_Builtin.Strong>
                  </_Builtin.Block>
                </_Builtin.DropdownToggle>
                <_Builtin.DropdownList
                  className={_utils.cx(_styles, "dropdown-list", "dd-list")}
                  tag="nav"
                >
                  <_Builtin.List
                    className={_utils.cx(_styles, "dd-list", "dd-list-1")}
                    tag="ul"
                    unstyled={false}
                  >
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "p-main", "dd-li")}
                    >
                      <_Builtin.Paragraph>
                        {"Subscription period: Monthly"}
                      </_Builtin.Paragraph>
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "p-main", "dd-li")}
                    >
                      <_Builtin.Paragraph>
                        {"Automatic renewal (recurring payments)"}
                      </_Builtin.Paragraph>
                    </_Builtin.ListItem>
                    <_Builtin.ListItem
                      className={_utils.cx(_styles, "p-main", "dd-li")}
                    >
                      <_Builtin.Paragraph>
                        {
                          "By selecting this option, you agree to a minimum of 12 monthly payments of $83.00 each. Your membership in the GFWBA will auto-renew each year on your anniversary date and monthly payments will continue. If payments are stopped during a membership year, you will be billed for the balance left for that year. To cancel your membership, you must contact the GFWBA office 30 days prior to your anniversary date. If the installment payment is declined two times in a 12 month period, the GFWBA will balance bill for the remainder of that 12 month period. The member will not be eligible to enroll in the monthly payment plan until the following year. This policy will take effect January 1, 2020."
                        }
                      </_Builtin.Paragraph>
                    </_Builtin.ListItem>
                  </_Builtin.List>
                </_Builtin.DropdownList>
              </_Builtin.DropdownWrapper>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
