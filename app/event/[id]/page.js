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
  const [inviteCode, setInviteCode] = useState("");
  const [requiresInviteCode, setRequiresInviteCode] = useState(false)
  const [eventKeys, setEventKeys] = useState([]);
  const [registrationOption, setRegistrationOption] = useState('');
  const { id } = params;

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
    if (registrationOption.Availability == 'CodeRequired') {
      if (inviteCode == registrationOption.RegistrationCode) {
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
      } else { setError('incorrect code') }
    } else {
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
  }
  function cancelRegistration() {
    setRegistering(false);
  }
  // Separate function to initialize user data from localStorage
  const initializeUserData = () => {
    const user = localStorage.getItem("GFWBAUSER");
    if (user) {
      const {
        Id,
        DisplayName,
        Email,
        FirstName,
        LastName,
        MembershipLevel,
        Status,
        token,
      } = JSON.parse(user);
      setLoggedId(Id);
      setFirstName(FirstName);
      setLastName(LastName);
      setEmail(Email);
      setNewFName(FirstName);
      setNewLName(LastName);
      setNewEmail(Email);
      updateLoggedStatus(true);

      if (Status === 'Lapsed') {
        router.push('/login');
        return false; // Stop further processing
      }
      return true; // Continue further processing
    } else {
      setRegistered(true);
      return false; // Stop further processing
    }
  };

  useEffect(() => {
    console.log('triggered', id)
    const fetchEvent = async () => {
      setIsLoading(true);

      if (!initializeUserData()) return;

      try {
        const response = await fetch(`/api/event/${id}`, {
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
          return;
        }

        const eventStart = new Date(json.StartDate);
        const eventEnd = new Date(json.EndDate);
        const options1 = { year: "numeric", month: "long", day: "numeric" };
        const options2 = { weekday: "long", hour: "numeric", minute: "numeric" };
        setEvent(json);
        setStartDate(eventStart.toLocaleDateString(undefined, options1));
        setStartTime(eventStart.toLocaleDateString(undefined, options2));
        setEnd(eventEnd.toLocaleDateString(undefined, options2));

        const imgSrcRegex = /<img\s+[^>]*src="([^"]*)"/gi;
        const replacedHtml = json.Details.DescriptionHtml.replace(imgSrcRegex, (match, src) => {
          const pathSegments = src.split("/");
          const fileName = pathSegments[pathSegments.length - 1];
          const newSrc = `https://gfwbatx.com/resources/Pictures/${fileName}`;
          return match.replace(src, newSrc);
        });
        setEventDescription(replacedHtml);

        const attendees = json.registrations.map(reg => reg.Contact.Id);
        if (attendees.includes(loggedId)) {
          setRegistered(true);
        }

        const keyArray = json.Details.RegistrationTypes.filter(item => item.Availability === 'CodeRequired').map((item, index) => ({
          registration: item,
          index
        }));
        setEventKeys(keyArray);

        const response2 = await fetch(`/api/event/upcomingEvents`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        const json2 = await response2.json();
        if (!response2.ok) {
          setError(json2.error);
          console.log("response not ok");
        } else {
          setUpcomingList(json2);
        }

      } catch (err) {
        setError('An error occurred while fetching the event');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]); // Only re-run the effect if 'id' changes
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
                                        setRegistrationOption(e);
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
                                    {registrationOption.Availability == 'CodeRequired' ? <>
                                      <label for="invite code">
                                        Invite Code
                                      </label>
                                      <input
                                        className="hi w-[300px] text-base pl-2"
                                        type="text"
                                        placeholder="Invite Code"
                                        value={inviteCode}
                                        onChange={(e) => {
                                          setInviteCode(e.target.value);
                                        }}
                                      />
                                    </> :
                                      console.log(eventKeys)
                                    }
                                    <label for="First Name">First Name</label>
                                    <input
                                      className="hi w-[300px] text-base pl-2"
                                      type="text"
                                      placeholder={firstName}
                                      value={newFName}
                                      onChange={(e) => {
                                        setNewFName(e.target.value);
                                      }}
                                      required
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
                                      required
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
                                      required
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
                                      required
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
                                      required
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
                                      required
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
