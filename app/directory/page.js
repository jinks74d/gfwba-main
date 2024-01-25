"use client";
import DirectoryItem from "@/components/DirectoryItem";
import BlueBtn from "@/components/BlueBtn";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import Link from "next/link";
// import useSWR from 'swr'

import { InnerHero, MemberListItem } from "@/devlink";
// const fetcher = (...args) => fetch(...args).then(res => res.json())

// *** METADATA
// export const metadata = {
//   title: "Greater Fort Worth Builders Association Member Directory",
//   description:
//     "Find a member of the Greater Fort Worth Builders Association (GFWBA)",
// };

export default function Directory() {
  const [contacts, setContacts] = useState("");
  const [allContacts, setAllContacts] = useState("");
  const [categories, setCategories] = useState([]);
  const [serviceAreas, setServiceAreas] = useState([]);
  const [filter, setFilter] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const fetchContacts = async () => {
    // let response = await fetch('/api/allContacts', {
    let response = await fetch("/api/activeContacts", {
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
      console.log(response);
      // const alphaSorted = json.Contacts.sort();
      let categoryArr = [];
      let areaArr = [];
      console.log(json.Contacts);

      setContacts(json.Contacts);
      setAllContacts(json.Contacts);
      json.Contacts.forEach((element) => {
        let cat = element.FieldValues[47];
        let memberCat = [];
        Object.keys(cat.Value).forEach(function (key, index) {
          if (categoryArr.indexOf(cat.Value[key].Label) == -1) {
            categoryArr.push(cat.Value[key].Label);
          }
          memberCat.push(` ${cat.Value[key].Label}`);
        });
        element.memberCat = memberCat;

        // if (element.FieldValues.indexOf('Service Area') != -1) {
        //   let area = element.FieldValues[52]
        //   Object.keys(area.Value).forEach(function (key, index) {
        //     if (areaArr.indexOf(area.Value[key].Label) == -1) {
        //       areaArr.push(cat.Value[key].Label);
        //     }
        //   })
        //   console.log(areaArr)
        // }
      });
      console.log(categoryArr);
      setCategories(categoryArr.sort());
      // setServiceAreas(areaArr);
      json.Contacts.forEach((element) => {
        let img = element.FieldValues[49];
        if (img.Value != "") {
          console.log(
            `${element.DisplayName}'s image url is: ${img.Value.Url}`
          );
        }
        // Object.keys(img.Value).forEach(function (key, index) {
        //   img.Value[key].Label
        // })
      });
    }
  };

  const toggleFilter = async (e) => {
    let filters = filter;
    // console.log(e)
    if (filters.indexOf(e) == -1) {
      filters.push(e);
    } else {
      filters.splice(filters.indexOf(e), 1);
    }
    console.log(filters);
    setFilter(filters);
    if (filters.length == 0) {
      console.log(allContacts);
      setContacts(allContacts);
    } else {
      let filteredContacts = [];
      function filterContacts(contacts, filters) {
        contacts.forEach((contact) => {
          let contactCat = [];
          // console.log(contact)
          Object.keys(contact.FieldValues[47].Value).forEach(function (
            key,
            index
          ) {
            // console.log(contact.FieldValues[47].Value)
            contactCat.push(contact.FieldValues[47].Value[key].Label);
          });
          // console.log(contactCat)
          if (contactCat.some((item) => filters.includes(item))) {
            if (filteredContacts.indexOf(contact) == -1) {
              filteredContacts.push(contact);
            }
          }
        });
      }
      // console.log(filteredContacts)
      filterContacts(allContacts, filters);
      setContacts(filteredContacts);
    }
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm != "") {
      let filteredContacts = [];
      setContacts(allContacts);
      let filters = filter;
      // console.log(e)
      for (let i = 0; i < categories.length; i++) {
        let c = categories[i];
        // console.log(c)
        if (c) {
          if (c.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1) {
            // console.log(c)
            filters.push(c);
          }
        }
      }
      if (filters == filter) {
        filters.push(searchTerm);
      }
      setFilter(filters);
      contacts.forEach((contact) => {
        let contactCat = [];
        // console.log(contact)
        Object.keys(contact.FieldValues[47].Value).forEach(function (
          key,
          index
        ) {
          // console.log(contact.FieldValues[47].Value)
          contactCat.push(contact.FieldValues[47].Value[key].Label);
        });
        // Filter the data array based on the search term
        for (let i = 0; i < contactCat.length; i++) {
          let a = contactCat[i];
          if (a) {
            if (a.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1) {
              filteredContacts.push(contact);
            }
          }
        }
      });
      setContacts(filteredContacts);
    }
  };

  useEffect(() => {
    if (contacts === "") {
      fetchContacts();
    }
  });

  // console.log(data)

  return (
    <main>
      <InnerHero
        heroDirectory={{ href: '/directory' }}
        heroJoin={{ href: '/signup' }}
      />
      <section className="pt-24 px-24 flex">
        {/* MAIN DIRECTORY LEFT */}
        <div className="w-[25%] pt-28">
          <div
            onClick={() => {
              setFilter([]);
              setContacts(allContacts);
            }}
            className="flex items-center justify-center border border-red-500 w-52 h-14 mb-[30px] cursor-pointer"
          >
            <p className="text-2xl p-0 m-0 uppercase text-[#102647]">
              Clear Filters
            </p>
          </div>
          <div className="border border-[#B3B3B3] max-w-[386px] p-[15px] max-h-[633px] overflow-auto mr-[60px]">
            <p className="text-2xl uppercase">Categories</p>
            <ul className="list-none p-0">
              {categories &&
                categories.map((c) => (
                  <li
                    className="flex gap-1 text-xl cursor-pointer"
                    onClick={() => toggleFilter(c)}
                    key={c}
                  >
                    {filter.includes(c) ? (
                      <p className="text-red-500">☒</p>
                    ) : (
                      <p className="text-red-500">☐</p>
                    )}
                    {c}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* MAIN DIRECTORY RIGHT */}
        <div className="w-[75%]">
          <div className="flex justify-between items-center pb-10">
            <h2>MEMBER DIRECTORY</h2>
            <SearchBar onSearch={handleSearch} />
          </div>
          {filter && (
            <div className="flex gap-[20px] cursor-pointer">
              {filter.map((f) => (
                <p
                  className="text-l border border-red-500 p-[5px]"
                  onClick={() => toggleFilter(f)}
                  key={f}
                >
                  {f} X
                </p>
              ))}
            </div>
          )}
          <div>
            {contacts ? (
              contacts.map((c) => (
                <MemberListItem
                  // memberListLogo={}
                  memberListName={`${c.DisplayName}`}
                  memberListCompany={`${c.Organization}`}
                  memberListTitle={` ${c.FieldValues[39].Value}`}
                  memberListLocation={`${c.FieldValues[44].Value}, ${c.FieldValues[45].Value}`}
                  memberListWebsite={`${c.FieldValues[48].Value}`}
                  memberListCategory={`${c.memberCat}`}
                  memberListItemLink={{ href: `/profile/${c.Id}` }}
                  key={c.Id}
                />
              ))
            ) : (
              // <p className='text-xl leading-normal'>Loading Directory</p>
              <div className="flex gap-[10px] <p className='text-xl leading-normal'>Loading Directory</p>">
                <div className="animate-spin rounded-full border-t-4 border-red-500 border-solid h-5 w-5"></div>
                <p className="text-xl leading-normal">Loading Directory</p>
              </div>
            )}
          </div>
          <BlueBtn text="load more" link="https://gfwba.com/directory" />
        </div>
      </section>
    </main>
  );
}
