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

  const fetchEvent = async () => {
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
      setStartDate(startDate);
      setStartTime(startTime);
      setEnd(endDate);
      console.log(json);
      if (json.registrations[0]) {
        console.log(json);
        let attendees = [];
        json.registrations.forEach((element) => {
          attendees.push(element.Contact.Id);
        });
        console.log(attendees.includes(Id));
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
  });

  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />
      <Base21WebflowSection
        baseHeading={"Events"}
        baseSubheading={""}
        baseSideHeading={"Upcoming Events"}
        baseGridLeftSlot={
          <>
            {event.Details && (
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
                        __html: event.Details.DescriptionHtml,
                      }}
                    />
                  }
                  singleEventItemRegistration={
                    <div>
                      {!registered && (
                        <ul>
                          {event.Details &&
                            event.Details.RegistrationTypes.map((e) => (
                              <li key={e.Id}>
                                <h4>{e.Name}</h4>
                                <p>{e.Description}</p>
                                <p className="text-xl">Price: ${e.BasePrice}</p>
                                {registering ? (
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
                                          className="cursor-pointer border border-[#102647] text-[#102647] p-2"
                                        >
                                          Yes
                                        </button>
                                        <button
                                          onClick={() => setConsent(false)}
                                          className="cursor-pointer border border-[#102647] text-[#102647] p-2"
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
                                        className="cursor-pointer bg-[#102647] text-white text-xl uppercase mt-10 py-2 px-10"
                                        type="submit"
                                        onClick={() => {
                                          setRegistrationId(e.Id);
                                        }}
                                      />
                                    </form>
                                    <button
                                      onClick={cancelRegistration}
                                      className="cursor-pointer border-2 border-[#102647] text-[#102647] text-xl uppercase mt-10 py-2 px-10"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <div onClick={() => setRegistering(true)}>
                                    <p className="SingleEventItem_red-btn__h_K6G SingleEventItem_red-btn-sidebar__qltLF w-button">
                                      Register
                                    </p>
                                  </div>
                                )}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  }
                />
              </>
            )}
          </>
        }
        homeGridRightSlot={
          <div className="flex flex-col">
            {upcomingList &&
              upcomingList.map((e) => (
                <EventItemSidebar
                  key={e.Id}
                  eventListItemTitle={e.Name}
                  eventListItemDate={e.StartDate}
                  eventListItemLocation={e.Location}
                  eventListItemLink={{ href: `/event/${e.Id}` }}
                />
              ))}
          </div>
        }
      />
      {console.log(event)}
    </main>
  );
}
