"use client";
import {
  Base21WebflowSection,
  EventItemSidebar,
  InnerHero,
  ProfileSection,
  SingleEventItem,
} from "@/devlink";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BlueBtn from "@/components/BlueBtn";
import { useLoggedStatus } from "@/context/LoggedStatusProvider";
const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER;

export default function Profile() {
  // const { query } = useRouter()
  const router = useRouter();
  const params = useParams();
  // console.log(params)
  const [event, setEvent] = useState("");
  const [upcomingList, setUpcomingList] = useState("");
  const [startTime, setStartTime] = useState("");
  const [startDate, setStartDate] = useState("");
  const [end, setEnd] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [newFName, setNewFName] = useState("");
  const [newLName, setNewLName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loggedId, setLoggedId] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [registered, setRegistered] = useState(false);
  const { loggedStatus, updateLoggedStatus } = useLoggedStatus();
  const [eventImg, setEventImg] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [reg, setReg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchEvent = async () => {
    setIsLoading(true);
    if (localStorage.getItem("GFWBAUSER")) {
      var {
        Id,
        DisplayName,
        Email,
        FirstName,
        LastName,
        MembershipLevel,
        Status,
        token,
      } = JSON.parse(localStorage.getItem("GFWBAUSER"));
      setLoggedId(Id);
      setFirstName(FirstName);
      setLastName(LastName);
      setEmail(Email);
      setNewFName(FirstName);
      setNewLName(LastName);
      setNewEmail(Email);
      updateLoggedStatus(true);
    } else {
      setRegistered(true);
    }
    // let response = await fetch('/api/allContacts', {
    let response = await fetch(`/api/event/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      console.log("response not ok");
      setIsLoading(false);
    }
    if (response.ok) {
      // console.log(json)
      const eventStart = new Date(json.StartDate);
      const eventEnd = new Date(json.EndDate);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const options1 = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const options2 = {
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
      };
      let startDate = eventStart.toLocaleDateString(undefined, options1);
      let startTime = eventStart.toLocaleDateString(undefined, options2);
      let endDate = eventEnd.toLocaleDateString(undefined, options2);
      setEvent(json);
      json.Details.RegistrationTypes?.map((item) => {
        console.log(item?.Id, "..........................event id");
        reg.push({
          opened: false,
          id: item.Id,
        });
      });
      setReg(reg);
      console.log(json.Details.RegistrationTypes);
      setStartDate(startDate);
      setStartTime(startTime);
      setEnd(endDate);

      const imgSrcRegex = /<img\s+[^>]*src="([^"]*)"/gi;

      // Replace the existing HTML content
      const replacedHtml = json.Details.DescriptionHtml.replace(
        imgSrcRegex,
        (match, src) => {
          // Extract the file name from the src attribute
          const pathSegments = src.split("/");
          const fileName = pathSegments[pathSegments.length - 1];

          // Construct the new src URL
          const newSrc = `https://gfwbatx.com/resources/Pictures/${fileName}`;

          // Replace the src attribute value with the new URL
          return match.replace(src, newSrc);
        }
      );
      setEventDescription(replacedHtml);

      // console.log(replacedHtml);
      // console.log(json);
      if (json.registrations[0]) {
        // console.log(json);
        let attendees = [];
        json.registrations.forEach((element) => {
          attendees.push(element.Contact.Id);
        });
        // console.log(attendees.includes(Id));
        if (attendees.includes(Id)) {
          setRegistered(true);
        }
      }
      let response2 = await fetch(`/api/event/upcomingEvents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });
      const json2 = await response2.json();
      if (!response2.ok) {
        setError(json2.error);
        console.log("response not ok");
      }
      if (response2.ok) {
        console.log(json2);
        setUpcomingList(json2);
      }
      setIsLoading(false);
    }
  };

  const handleRegistration = async (e) => {
    var {
      Id,
      DisplayName,
      Email,
      FirstName,
      LastName,
      MembershipLevel,
      Status,
      token,
    } = JSON.parse(localStorage.getItem("GFWBAUSER"));
    e.preventDefault();
    let registrationInfo = {
      FirstName: newFName,
      LastName: newLName,
      Organization: organization,
      Phone: phone,
      Email: newEmail,
      billEmail: billingEmail,
      consent: consent,
      contactId: Id,
      registrationType: registrationId,
    };

    let response = await fetch("/api/event/eventRegistration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token, registrationInfo, id: event.Id }),
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      console.log("response not ok");
    }
    if (response.ok) {
      // console.log(json)
      setRegistering(false);
    }
  };
  function cancelRegistration() {
    setRegistering(false);
  }

  useEffect(() => {
    // if (!localStorage.getItem("GFWBAUSER")) {
    //     router.push('/login');
    // } else {
    // var { Id, DisplayName, Email, FirstName, LastName, MembershipLevel, Status, token } = JSON.parse(localStorage.getItem("GFWBAUSER"));
    // if (Status === 'Lapsed') {
    //     router.push('/login');
    // }
    if (event === "") {
      fetchEvent();
      if (localStorage.getItem("GFWBAUSER")) {
        updateLoggedStatus(true);
      }
    }
    // }
  }, []);
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />
      <Base21WebflowSection
        baseHeading={"EVENTS"}
        baseSubheading={""}
        baseSideHeading={"Upcoming Events"}
        baseGridLeftSlot={
          <>
            {event.Details ? (
              <>
                {/* {console.log(event.Details.DescriptionHtml)} */}
                <SingleEventItem
                  singleEventItemTitle={event.Name}
                  singleEventItemDate={startDate}
                  singleEventItemLocation={event.Location}
                  singleEventItemTime={`${startTime} - ${end}`}
                  singleEventItemDescriptionSlot={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: eventDescription,
                      }}
                    />
                  }
                  singleEventItemRegistration={
                    <div>
                      {loggedStatus ? (
                        !registered && (
                          <>
                            <ul>
                              {/* {console.log(
                            event.Details.RegistrationTypes,
                            "..................event desc"
                          )} */}
                              {event.Details.RegistrationTypes.map((e) => (
                                <li key={e.Id}>
                                  <h4>{e.Name}</h4>
                                  <p>{e.Description}</p>
                                  <p className="text-xl">
                                    Price: ${e.BasePrice}
                                  </p>
                                  {/* {registering ? (
                                    <div>
                                      <h3>Registration</h3>
                                       {console.log(contact)} 
                                      <form
                                        onSubmit={handleRegistration}
                                        className="text-xl font-light mb-4 w-full"
                                      >
                                        <label for="First Name">
                                          First Name
                                        </label>
                                        <input
                                          className="hi w-[300px] text-base pl-2"
                                          type="text"
                                          placeholder={firstName}
                                          value={newFName}
                                          onChange={(e) => {
                                            setNewFName(e.target.value);
                                          }}
                                        />
                                        <label for="Last Name">Last Name</label>
                                        <input
                                          className="hi w-[300px] text-base pl-2"
                                          type="text"
                                          placeholder={lastName}
                                          value={newLName}
                                          onChange={(e) => {
                                            setNewLName(e.target.value);
                                          }}
                                        />
                                        <label for="Email">Email</label>
                                        <input
                                          className="hi w-[300px] text-base pl-2"
                                          type="text"
                                          placeholder={email}
                                          value={newEmail}
                                          onChange={(e) => {
                                            setNewEmail(e.target.value);
                                          }}
                                        />
                                        <label for="organization">
                                          Organization
                                        </label>
                                        <input
                                          className="hi w-[300px] text-base pl-2"
                                          type="text"
                                          placeholder="organization"
                                          value={organization}
                                          onChange={(e) => {
                                            setOrganization(e.target.value);
                                          }}
                                        />
                                        <label for="phone">Office Phone</label>
                                        <input
                                          className="hi w-[300px] text-base pl-2"
                                          type="text"
                                          placeholder="phone number"
                                          value={phone}
                                          onChange={(e) => {
                                            setPhone(e.target.value);
                                          }}
                                        />
                                        <label for="billing">
                                          Accounting or Billing Address
                                        </label>
                                        <input
                                          className="hi w-[300px] text-base pl-2"
                                          type="text"
                                          placeholder="Accounting or Billing Address"
                                          value={billingEmail}
                                          onChange={(e) => {
                                            setBillingEmail(e.target.value);
                                          }}
                                        />
                                        <label for="consent">
                                          We would like to send you relevant
                                          text messages
                                        </label>
                                        <div className="flex flex-row gap-4">
                                          <button
                                            onClick={() => setConsent(true)}
                                            className="cursor-pointer reg-border text-gfwba-blue px-2 py-1"
                                          >
                                            Yes
                                          </button>
                                          <button
                                            onClick={() => setConsent(false)}
                                            className="cursor-pointer reg-border text-gfwba-blue px-2 py-1"
                                          >
                                            No
                                          </button>
                                        </div>
                                        {consent ? (
                                          <p>
                                            You have consented to receive
                                            relevant messages
                                          </p>
                                        ) : (
                                          <p>
                                            You have opted not to receive
                                            relevant messages
                                          </p>
                                        )}
                                        <input
                                          className="cursor-pointer bg-gfwba-blue text-white text-xl uppercase mt-6 py-2 px-10"
                                          type="submit"
                                          onClick={() => {
                                            setRegistrationId(e.Id);
                                          }}
                                        />
                                      </form>
                                      <button
                                        onClick={cancelRegistration}
                                        className="cursor-pointer reg-border text-gfwba-blue text-xl uppercase mt-4 py-2 px-10"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  ) : ( */}
                                  {!registering && (
                                    <div
                                      onClick={() => {
                                        setRegistering(true);
                                        setRegistrationId(e.Id);
                                      }}
                                    >
                                      <p className="SingleEventItem_red-btn__h_K6G SingleEventItem_red-btn-sidebar__qltLF w-button">
                                        Register
                                      </p>
                                    </div>
                                  )}
                                </li>
                              ))}
                              {registering && (
                                <div>
                                  <h3>Registration</h3>
                                  {/* {console.log(contact)} */}
                                  <form
                                    onSubmit={handleRegistration}
                                    className="text-xl font-light mb-4 w-full"
                                  >
                                    <label for="First Name">First Name</label>
                                    <input
                                      className="hi w-[300px] text-base pl-2"
                                      type="text"
                                      placeholder={firstName}
                                      value={newFName}
                                      onChange={(e) => {
                                        setNewFName(e.target.value);
                                      }}
                                    />
                                    <label for="Last Name">Last Name</label>
                                    <input
                                      className="hi w-[300px] text-base pl-2"
                                      type="text"
                                      placeholder={lastName}
                                      value={newLName}
                                      onChange={(e) => {
                                        setNewLName(e.target.value);
                                      }}
                                    />
                                    <label for="Email">Email</label>
                                    <input
                                      className="hi w-[300px] text-base pl-2"
                                      type="text"
                                      placeholder={email}
                                      value={newEmail}
                                      onChange={(e) => {
                                        setNewEmail(e.target.value);
                                      }}
                                    />
                                    <label for="organization">
                                      Organization
                                    </label>
                                    <input
                                      className="hi w-[300px] text-base pl-2"
                                      type="text"
                                      placeholder="organization"
                                      value={organization}
                                      onChange={(e) => {
                                        setOrganization(e.target.value);
                                      }}
                                    />
                                    <label for="phone">Office Phone</label>
                                    <input
                                      className="hi w-[300px] text-base pl-2"
                                      type="text"
                                      placeholder="phone number"
                                      value={phone}
                                      onChange={(e) => {
                                        setPhone(e.target.value);
                                      }}
                                    />
                                    <label for="billing">
                                      Accounting or Billing Address
                                    </label>
                                    <input
                                      className="hi w-[300px] text-base pl-2"
                                      type="text"
                                      placeholder="Accounting or Billing Address"
                                      value={billingEmail}
                                      onChange={(e) => {
                                        setBillingEmail(e.target.value);
                                      }}
                                    />
                                    <label for="consent">
                                      We would like to send you relevant text
                                      messages
                                    </label>
                                    <div className="flex flex-row gap-4">
                                      <button
                                        onClick={() => setConsent(true)}
                                        className="cursor-pointer reg-border text-gfwba-blue px-2 py-1"
                                      >
                                        Yes
                                      </button>
                                      <button
                                        onClick={() => setConsent(false)}
                                        className="cursor-pointer reg-border text-gfwba-blue px-2 py-1"
                                      >
                                        No
                                      </button>
                                    </div>
                                    {consent ? (
                                      <p>
                                        You have consented to receive relevant
                                        messages
                                      </p>
                                    ) : (
                                      <p>
                                        You have opted not to receive relevant
                                        messages
                                      </p>
                                    )}
                                    <input
                                      className="cursor-pointer bg-gfwba-blue text-white text-xl uppercase mt-6 py-2 px-10"
                                      type="submit"
                                      // onClick={() => {
                                      //   setRegistrationId(e.Id);
                                      // }}
                                    />
                                  </form>
                                  <button
                                    onClick={cancelRegistration}
                                    className="cursor-pointer reg-border text-gfwba-blue text-xl uppercase mt-4 py-2 px-10"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )}
                            </ul>
                          </>
                        )
                      ) : (
                        <div>
                          <p className="text-xl">
                            Access restricted. Please log in to proceed{" "}
                          </p>
                          <div onClick={() => router.push(`/login`)}>
                            <p className="SingleEventItem_red-btn__h_K6G SingleEventItem_red-btn-sidebar__qltLF w-button">
                              Click here
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  }
                />
              </>
            ) : (
              <div className="flex gap-[10px] <p className='text-xl leading-normal'>Loading Directory</p>">
                <div className="animate-spin rounded-full border-t-4 border-red-500 border-solid h-5 w-5"></div>
                <p className="text-xl leading-normal">Loading Event</p>
              </div>
            )}
          </>
        }
        homeGridRightSlot={
          <div className="flex flex-col">
            {upcomingList && (
              <div>
                {upcomingList.map((e) => (
                  <EventItemSidebar
                    key={e.Id}
                    eventListItemTitle={e.Name}
                    eventListItemDate={e.Date}
                    eventListItemTime={e.Time}
                    eventListItemLocation={e.Location}
                    eventListItemLink={{ href: `/event/${e.Id}` }}
                  />
                ))}
                <a
                  className="EventItemSidebar_red-btn__T7GSW EventItemSidebar_red-btn-sidebar__RXmzF w-button"
                  href="/events"
                >
                  View More
                </a>
              </div>
            )}
          </div>
        }
      />
      {/* {console.log(event)} */}
      {console.log(reg, "...............reg")}
    </main>
  );
}
