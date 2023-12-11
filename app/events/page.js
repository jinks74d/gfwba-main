"use client"
import BlueBtn from "@/components/BlueBtn";
import SearchBar from '@/components/SearchBar';
import { useEffect, useState } from 'react'
import Link from 'next/link'
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
                if (eventEnd.getTime() > today.getTime()) {
                    e.start = eventStart.toLocaleDateString(undefined, options);
                    e.end = eventEnd.toLocaleDateString(undefined, options);
                    // console.log(e)
                    formattedEvents.push(e)
                }
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
            <InnerHero />
            <section className="pt-24 px-24 flex">
                {/* MAIN DIRECTORY LEFT */}
                <div className="w-[25%] pt-28">
                    {/* <div
            onClick={() => { setFilter([]); setContacts(allContacts) }}
            className="flex items-center justify-center border border-red-500 w-52 h-14 mb-[30px] cursor-pointer"
          >
            <p className="text-2xl p-0 m-0 uppercase text-[#102647]">Clear Filters</p>
          </div> */}
                    {/* <div className="border border-[#B3B3B3] max-w-[386px] p-[15px] max-h-[633px] overflow-auto mr-[60px]">
            <p className="text-2xl uppercase">Categories</p>
            <ul className="list-none p-0">
              {categories && categories.map((c) => (
                <li className="flex gap-1 text-xl cursor-pointer" onClick={() => toggleFilter(c)} key={c}>{filter.includes(c) ? <p className="text-red-500">☒</p> : <p className="text-red-500">☐</p>}{c}</li>
              ))}
            </ul>
          </div> */}
                </div>

                {/* MAIN DIRECTORY RIGHT */}
                <div className="w-[75%]">
                    <div className="flex justify-between items-center pb-10">
                        <h2>Events List</h2>
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
