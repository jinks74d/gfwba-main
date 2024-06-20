"use client";
import {
  Base21WebflowSection,
  EventItemSidebar,
  InnerHero,
  SingleEventItem,
} from "@/devlink";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
  const [email, setEmail] = useState("");
  const [newFName, setNewFName] = useState("");
  const [newLName, setNewLName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loggedId, setLoggedId] = useState("");
  const [registered, setRegistered] = useState(false);
  const { loggedStatus, updateLoggedStatus } = useLoggedStatus();
  const [eventDescription, setEventDescription] = useState("");
  const [reg, setReg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = params;

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
          const newSrc = `https://gfwba38.wildapricot.org/resources/Pictures/${fileName}`;
          return match.replace(src, newSrc);
        });
        setEventDescription(replacedHtml);

        const attendees = json.registrations.map(reg => reg.Contact.Id);
        if (attendees.includes(loggedId)) {
          setRegistered(true);
        }

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
                          </li>
                        ))}
                      </ul>
                      <a className="SingleEventItem_red-btn__h_K6G SingleEventItem_red-btn-sidebar__qltLF w-button mt-5" href={`https://gfwba38.wildapricot.org/event-${id}/Registration`} target="_blank">
                        Register
                      </a>
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
