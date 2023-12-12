import * as React from "react";
import * as Types from "./types";

declare function ProfileSection(props: {
  as?: React.ElementType;
  profileMainName?: Types.Devlink.RuntimeProps;
  profMainName?: React.ReactNode;
  profMainComp?: React.ReactNode;
  profTitle?: React.ReactNode;
  profOrganization?: React.ReactNode;
  profAddress?: React.ReactNode;
  profOffice?: React.ReactNode;
  profCell?: React.ReactNode;
  profEmail?: React.ReactNode;
  profWebsite?: React.ReactNode;
  profLogo?: Types.Asset.Image;
  profCategories?: React.ReactNode;
  profArea?: React.ReactNode;
  profEmailAddress?: Types.Basic.Link;
  profWebsiteAddress?: Types.Basic.Link;
}): React.JSX.Element;
