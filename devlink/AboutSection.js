import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AboutSection.module.css";

export function AboutSection({
  as: _Component = _Builtin.Section,
  image = "https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/6552a3bb6f2d2eaba84a5ea2_about-hero.jpg",
  homeGridRightSlot,
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
          {"ABOUT GFWBA"}
        </_Builtin.Heading>
        <_Builtin.Block className={_utils.cx(_styles, "text-block")} tag="div">
          {"Welcome to the Greater Fort Worth Builders Association"}
          <br />
          {""}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "home-grid")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-left")}
            id={_utils.cx(
              _styles,
              "w-node-_2339f8be-06df-42a8-7b76-b51537b201f6-37b201ed"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "main-left-list")}
              tag="div"
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "list-logo-left")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/6549729854ffbc32e05dfa25/655a853b0fad09343073a4c7_gfwba-logo-vert.png"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "p-main")}
                tag="div"
              >
                {
                  "The Greater Fort Worth Builders Association (GFWBA) is a non-profit trade association representing hundreds of companies affiliated within the homebuilding industry throughout the Greater Fort Worth region. The Greater Fort Worth Builders Association is one of twenty-eight local associations that make up the Texas Association of Builders (TAB). in addition, we are affiliated with the National Association of Home Builders (NAHB). An active board of directors and volunteer committees, made up of leaders from local builders, trade contractors and businesses associated within the real estate industry, lead the Greater Fort Worth Builders Association in its mission."
                }
                <br />
                <br />
                {""}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"MISSION STATEMENT"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "space-40")}
              tag="div"
            >
              {
                "Our primary purposes are to provide information exchange, communication and education for members; to interact with local, state and federal legislative bodies to foster a positive building climate; to provide a forum to implement policies that affect the building industry; and to promote professionalism among our members."
              }
            </_Builtin.Block>
            <_Builtin.Heading
              className={_utils.cx(_styles, "heading-2")}
              tag="h2"
            >
              {"2022 VICTORY - TEXAS SUPREME COURT"}
            </_Builtin.Heading>
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "space-40")}
              tag="div"
            >
              <_Builtin.Strong>
                {"BRS summary updated 5.23.22"}
                <br />
                <br />
                {"‍"}
              </_Builtin.Strong>
              {
                "Garabedian Properties and its sister company Builder Recovery Services LLC (both members of GFWBA) recently completed a long journey through the court system in their dispute with the Town of Westlake. On March 23, 2022, their case was heard before the Texas Supreme Court."
              }
              <br />
              <br />
              {
                "Here is how it all began. Back in 2015, Michael Garabedian started a construction waste hauling business to keep his custom home building sites clean. Over time other builders sought out the services of Builder Recovery Services (BRS) to help keep their job sites clean. "
              }
              <br />
              <br />
              {
                "BRS was a highly dependable trade partner as its team understood construction. Unlike the big waste haulers who could take weeks to service a construction site, BRS was there within days if not hours. This timely service was found to be attractive to local builders and renovations. Unfortunately, not everyone appreciated this service."
              }
              <br />
              <br />
              {
                "The Town of Westlake took a position that a private company using containers to haul construction debris from job sites was not permitted and made attempts to shut down the company. BRS’s legal team was able to document that there was no legal authority to prohibit services such as BRS from servicing construction sites. "
              }
              <br />
              <br />
              {
                "The Town’s staff chose had a choice to make, they could work with the construction industry to address concerns or implement additional regulations. They chose the latter and drafted a new ordinance to restrict private construction waste haulers. During workshops and town meetings nearly two dozen building professionals showed up to voice their opposition to the new restrictions. The Town persisted and passed a new ordinance which did several things including;"
              }
              <br />
              {"‍"}
              <br />
              {
                "* Requiring any private waste hauler to secure a license from the town"
              }
              <br />
              <br />
              {
                "* Provided unrestricted access to a waste hauler’s books and financials to the Town Manager"
              }
              <br />
              <br />
              {
                "* Required monthly reports to the Town dictating revenue, routes, equipment locations, tonnage hauled and other such administrative burdens"
              }
              <br />
              <br />
              {
                "* A 15% fee on gross revenue for all services provided in the Town of Westlake"
              }
              <br />
              <br />
              {
                "BRS, the local building industry and construction waste haulers opposed this new ordinance for a host of reasons, including;"
              }
              <br />
              <br />
              {
                "* Licensing was not specifically a power given to the Town of Westlake (a general law town) by the Texas Legislature and prohibited by state law."
              }
              <br />
              <br />
              {
                "* Most if not all of the identified concerns staff noted as requiring attention are already accounted for by existing ordinances in the Town (littering, traffic violations, etc…) OR had no relevance to construction waste haulers."
              }
              <br />
              <br />
              {
                "* Many other trades, vehicles and services have greater impact on Town services than construction waste haulers"
              }
              <br />
              <br />
              {
                "* State law specifically notes that licensing fees can ONLY be used to offset the administrative costs related to processing the license. They cannot be used for general revenue generation."
              }
              <br />
              <br />
              {
                "* State law and the Texas constitution prohibited the creation of a tax on revenue and/or income."
              }
            </_Builtin.Block>
            <_Builtin.Image
              className={_utils.cx(_styles, "space-40")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src={image}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "p-main", "space-40")}
              tag="div"
            >
              {
                "The Town of Westlake passed the ordinance and took enforcement action against BRS and one of their builder clients. BRS had no choice but to sue the Town and the case was heard in the fall of 2019. The District Court Judge ruled in favor of the Town of Westlake on licensing and ruled in favor of BRS by declaring the 15% licensing fee unlawful. Both parties choose to appeal the ruling to Texas Second Court of Appeals. "
              }
              <br />
              <br />
              {
                "The Town decided to pass a new ordinance with a lower percentage fee than the original ordinance and claim that this new fee was not part of the dispute. BRS disagreed and continued to oppose any licensing fee based upon a percentage of revenue or income. "
              }
              <br />
              <br />
              {
                "The appeals court upheld the District’s court ruling on licensing and refused to address the licensing fee matter (they punted). This left BRS no case but to appeal to the Texas Supreme Court.  It is rare and difficult to get a case heard by the Texas Supreme Court. Their decision to hear the case validated BRS’s position that this was a much greater issue than just construction waste hauling."
              }
              <br />
              <br />
              {
                "If the Town’s position was to be validated, then any municipality in the state could infer licensing powers on private businesses AND create fees based upon revenue and/or income. It would be a back door to implementing an income tax in direct contradiction with the Texas Constitution."
              }
              <br />
              <br />
              {
                "BRS has never claimed that they or any other construction waste hauler was free to operate without adhering to public laws on littering, traffic, and the like. BRS does not believe a Town can use its police powers to put restrictions on select industries and they are adamant that a municipality cannot use a percentage of revenue basis for charging a fee."
              }
              <br />
              <br />
              {
                "BRS and Garabedian Properties received support from across the state with contributions and amicus briefs from the Greater Fort Worth Builders Association, Dallas Builders Association, Austin Builders Association, Houston Builders Association, Big Country Builders Association, and the Texas Association of Builders. This teamwork and cooperation is a testament to the power of the builder community within the Builders Association. Alone we are one voice in the wild, together we are 10,000 strong fighting to protect the home building industry and keep housing as affordable as possible."
              }
              <br />
              <br />
              {
                "On Friday May 20, 2022, we finally received our ruling. The Supreme Court of Texas ruled in favor of Builder Recovery Services, LLC and remanded the case back to the Appeals Court for conclusion. The court was very clear that the fee Westlake was charging using a percentage formula was an Occupation Tax regardless of the percentage. The court was ambiguous on the licensing question and directed the Appeals Court to revisit this matter. This was a big victory for our member and for the home building industry. "
              }
              <br />
              <br />
              {
                "We congratulate Garabedian Properties and Builder Recovery Services LLC on their victory and thank them for the massive commitment of time, money and resources in defense of our industry."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "home-grid-right")}
            id={_utils.cx(
              _styles,
              "w-node-_2339f8be-06df-42a8-7b76-b51537b2024e-37b201ed"
            )}
            tag="div"
          >
            {homeGridRightSlot}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
