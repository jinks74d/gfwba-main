"use client"
import BlueBtn from "@/components/BlueBtn";
import SearchBar from '@/components/SearchBar';
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { DemoApp } from "@/components/Calendar";
// import useSWR from 'swr'

import { InnerHero } from "@/devlink";

export default function Events() {
    const [events, setEvents] = useState('');
    const [allContacts, setAllContacts] = useState('');
    //   const [categories, setCategories] = useState([]);
    //   const [serviceAreas, setServiceAreas] = useState([]);
    //   const [filter, setFilter] = useState([]);
    //   const [searchResults, setSearchResults] = useState([]);

    const fetchEvents = async () => {
        let response = await fetch('/api/allEvents', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }
        });

        const json = await response.json();
        if (!response.ok) {
            setError(json.error)
            console.log('response not ok')
        }
        if (response.ok) {
            console.log(json)
            let formattedEvents = [];
            let today = new Date()
            // json.Events.forEach((e) => {
            //     const eventStart = new Date(e.StartDate);
            //     const eventEnd = new Date(e.EndDate);
            //     const options = {
            //         weekday: 'long',
            //         year: 'numeric',
            //         month: 'long',
            //         day: 'numeric',
            //         hour: 'numeric',
            //         minute: 'numeric'
            //     };
            //     if (eventEnd.getTime() > today.getTime()) {
            //         e.start = eventStart.toLocaleDateString(undefined, options);
            //         e.end = eventEnd.toLocaleDateString(undefined, options);
            //         // console.log(e)
            //         formattedEvents.push(e)
            //     }
            // })
            json.Events.forEach((e) => {
                const eventStart = new Date(e.StartDate);
                const eventEnd = new Date(e.EndDate);
                const options = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric'
                };
                e.start = e.StartDate;
                e.title = e.Name;
                e.id = e.Id;
                formattedEvents.push(e);
            })
            function compare(a, b) {
                if (a.EndDate < b.EndDate) {
                    return -1;
                }
                if (a.EndDate > b.EndDate) {
                    return 1;
                }
                return 0;
            }

            setEvents(formattedEvents.sort(compare))
        }
    }

    useEffect(() => {
        if (events === '') {
            fetchEvents();
        }
    })

    // console.log(data)

    return (
        <main>
            <InnerHero heroDirectory={{ href: '/directory' }} heroJoin={{ href: '/' }} />
            <DemoApp events={events} />
            <section className="pt-24 px-24 flex">
                {/* MAIN DIRECTORY LEFT */}
                <div className="w-[25%] pt-28">
                </div>

                {/* MAIN DIRECTORY RIGHT */}
                <div className="w-[75%]">
                    <div className="flex justify-between items-center pb-10">
                        <h2>EVENT LIST</h2>
                        {/* <SearchBar onSearch={handleSearch} /> */}
                    </div>
                    {/* {filter && <div className="flex gap-[20px] cursor-pointer">{filter.map((f) => (
            <p className="text-l border border-red-500 p-[5px]" onClick={() => toggleFilter(f)} key={f}>{f} X</p>
          ))}</div>} */}
                    <div className="grid grid-cols-3">
                        {events ?
                            events.map((e) => (
                                <Link href='/event/[id]' as={`/event/${e.Id}`} key={e.Id}>
                                    {console.log(e)}
                                    <h3>{e.Name}</h3>
                                    <h4>{e.Location}</h4>
                                    <p>Starts: {e.start}</p>
                                    <p>Ends: {e.end}</p>
                                    {e.Tags[0] && e.Tags.map((t) => (
                                        <p key={t}>{t}</p>
                                    ))}
                                </Link>
                            ))
                            :
                            // <p className='text-xl leading-normal'>Loading Directory</p>
                            <div className="flex gap-[10px] <p className='text-xl leading-normal'>Loading Directory</p>"><div className="animate-spin rounded-full border-t-4 border-red-500 border-solid h-5 w-5"></div><p className='text-xl leading-normal'>Loading Events</p></div>
                        }
                    </div>
                    <BlueBtn text="load more" link="https://gfwba.com/directory" />
                </div>
            </section>
        </main>
    );
}
