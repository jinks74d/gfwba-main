//EVENTS PAGE

"use client";

import BlueBtn from "@/components/BlueBtn";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarComponent } from "@/components/Calendar";
import { Metadata } from "./eventsMetadata";
import Head from "next/head";
// import useSWR from 'swr'

import { InnerHero, EventsListSection, EventListCard, Base21WebflowSection, EventItemSidebar } from "@/devlink";

const metadataBase = "https://gfwba-main.vercel.app/";

export default function Events() {
  const { url } = "https://gfwba-main.vercel.app/events";

  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": `${metadataBase}`,
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${metadataBase}/events`,
          name: "Events",
        },
      },
    ],
  };

  const [events, setEvents] = useState("");
  const [events2, setEvents2] = useState("");
  const [allContacts, setAllContacts] = useState("");
  const [upcomingEvents, setUpcomingList] = useState([]);
  //   const [categories, setCategories] = useState([]);
  //   const [serviceAreas, setServiceAreas] = useState([]);
  //   const [filter, setFilter] = useState([]);
  //   const [searchResults, setSearchResults] = useState([]);

  const fetchEvents = async () => {
    let response = await fetch("/api/allEvents", {
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
      console.log(json);
      let formattedEvents = [];
      let formattedEvents2 = [];
      let today = new Date();

      json.Events.forEach((e) => {
        const eventStart = new Date(e.StartDate);
        const eventEnd = new Date(e.EndDate);
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
        e.start = e.StartDate;
        e.title = e.Name;
        e.id = e.Id;
        if (eventEnd.getTime() > today.getTime()) {
          e.niceStartDate = eventStart.toLocaleDateString(undefined, options1);
          e.niceStartTime = eventStart.toLocaleDateString(undefined, options2);
          e.EndDate = eventEnd.toLocaleDateString(undefined, options);
          // console.log(e)
          formattedEvents2.push(e);
        }
        formattedEvents.push(e);
      });
      function compare(a, b) {
        if (a.EndDate < b.EndDate) {
          return -1;
        }
        if (a.EndDate > b.EndDate) {
          return 1;
        }
        return 0;
      }

      setEvents(formattedEvents.sort(compare));
      setEvents2(formattedEvents2.sort(compare));

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

  useEffect(() => {
    if (events === "") {
      fetchEvents();
    }
  });

  // console.log(data)

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {<Metadata />}
        </script>
        <link rel="canonical" href={url} />
      </Head>

      <main>
        <InnerHero
          heroDirectory={{ href: "/directory" }}
          heroJoin={{ href: "/signup" }}
        />
        <EventsListSection
          calendarPane={
            <div>
              {events ? (
                <CalendarComponent events={events} />
              ) : (
                <div className="flex gap-[10px] <p className='text-xl leading-normal'>Loading Directory</p>">
                  <div className="animate-spin rounded-full border-t-4 border-red-500 border-solid h-5 w-5"></div>
                  <p className="text-xl leading-normal">Loading Calendar</p>
                </div>
              )}
            </div>
          }
          listPane={
            <div>
              {events2 ? (
                events2.map((e) => (
                  <>
                    {/* {console.log(e)} */}
                    <EventListCard
                      eventTitle={e.Name}
                      eventDate={e.niceStartDate}
                      eventTime={e.niceStartTime}
                      eventLocation={e.Location}
                      eventLink={{ href: `/event/${e.Id}` }}
                    />
                  </>
                ))
              ) : (
                <div className="flex gap-[10px] <p className='text-xl leading-normal'>Loading Directory</p>">
                  <div className="animate-spin rounded-full border-t-4 border-red-500 border-solid h-5 w-5"></div>
                  <p className="text-xl leading-normal">Loading Events</p>
                </div>
              )}
            </div>
          }

        />
        <Base21WebflowSection
          baseHeading={'GFWBA EVENTS'}
          baseSubheading={""}
          baseSideHeading={"Upcoming Events"}
          baseGridLeftSlot={<div>
            {events ? (
              <CalendarComponent events={events} />
            ) : (
              <div className="flex gap-[10px] <p className='text-xl leading-normal'>Loading Directory</p>">
                <div className="animate-spin rounded-full border-t-4 border-red-500 border-solid h-5 w-5"></div>
                <p className="text-xl leading-normal">Loading Calendar</p>
              </div>
            )}
          </div>}
          homeGridRightSlot={
            <div className="flex flex-col">
              {upcomingEvents &&
                <div>
                  {upcomingEvents.map((e) => (
                    <EventItemSidebar
                      key={`side-${e.Id}`}
                      eventListItemTitle={e.Name}
                      eventListItemDate={e.Date}
                      eventListItemTime={e.Time}
                      eventListItemLocation={e.Location}
                      eventListItemLink={{ href: `/event/${e.Id}` }}
                    />
                  ))}
                </div>
              }
            </div>
          }
        />
      </main>
    </>
  );
}
