import * as React from "react";
import * as Types from "./types";

declare function MemberListItem(props: {
  as?: React.ElementType;
  memberId: number;
  memberListLogo?: Types.Asset.Image;
  memberListName?: React.ReactNode;
  memberListCompany?: React.ReactNode;
  memberListTitle?: React.ReactNode;
  memberListLocation?: React.ReactNode;
  memberListWebsite?: React.ReactNode;
  memberListCategory?: React.ReactNode;
  memberListItemLink?: Types.Basic.Link;
}): React.JSX.Element;
