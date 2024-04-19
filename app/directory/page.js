"use client";
import DirectoryItem from "@/components/DirectoryItem";
import BlueBtn from "@/components/BlueBtn";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useLoggedStatus } from "@/context/LoggedStatusProvider";
// import useSWR from 'swr'
const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER;

import { InnerHero, MemberListItem } from "@/devlink";
// const fetcher = (...args) => fetch(...args).then(res => res.json())

// *** METADATA
// export const metadata = {
//   title: "Greater Fort Worth Builders Association Member Directory",
//   description:
//     "Find a member of the Greater Fort Worth Builders Association (GFWBA)",
// };

export default function Directory() {
  const { loggedStatus, updateLoggedStatus } = useLoggedStatus();
  const [contacts, setContacts] = useState("");
  const [allContacts, setAllContacts] = useState("");
  const [categories, setCategories] = useState([]);
  const [serviceAreas, setServiceAreas] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState([]);
  const [page, setPage] = useState(0);
  const [paginationObj, setPaginationObj] = useState({});
  const [paginationArr, setPaginationArr] = useState("");
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const contactsPerPage = 10;

  function paginator(items, current_page, per_page_items) {
    let page = current_page || 1,
      per_page = per_page_items || 10,
      offset = (page - 1) * per_page,
      paginatedItems = items.slice(offset).slice(0, per_page),
      total_pages = Math.ceil(items.length / per_page);

    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems,
    };
  }

  const fetchContacts = async () => {
    setIsLoading(true);
    // let response = await fetch('/api/allContacts', {
    let response = await fetch(
      `/api/activeContacts?page=${page}&filter=${filter.join(
        ","
      )}&search=${searchResults}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      console.log("response not ok");
    }
    if (response.ok) {
      console.log(json);
      console.log(json.Contacts);
      setTotalPages(Math.ceil(json.count / contactsPerPage));
      // const alphaSorted = json.Contacts.sort();
      let categoryArr = [];

      let formatedContacts = [];
      json.Contacts.forEach((c) => {
        if (typeof c.FieldValues[48].Value != "object") {
          // console.log(c.FieldValues[48].Value)
          if (c.FieldValues[48].Value.startsWith("http")) {
            //str starts with http
          } else {
            //str does not start with http
            if (c.FieldValues[48].Value !== "") {
              c.FieldValues[48].Value = `http://${c.FieldValues[48].Value}`;
            }
          }
        }
        formatedContacts.push(c);
      });
      console.log(formatedContacts);
      let pagination = paginator(formatedContacts, 1);
      setPaginationArr(pagination.data);
      setPaginationObj(pagination);
      setContacts(formatedContacts);
      setAllContacts(formatedContacts);
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
      });
      setCategories(categoryArr.sort());
    }
    setIsLoading(false);
  };

  const toggleFilter = async (category) => {
    if (filter.includes(category)) {
      setFilter(filter.filter((cat) => cat !== category));
    } else {
      setFilter([...filter, category]);
    }
    setPage(1);
    // let filters = filter;
    // // console.log(e)
    // if (filters.indexOf(e) == -1) {
    //   filters.push(e);
    // } else {
    //   let newFilter = [];
    //   console.log(filters);
    //   // console.log(filters.splice(filters.indexOf(e), 1));
    //   // filters.splice(filters.indexOf(e), 1);
    //   filters.forEach(function (f) {
    //     if (f.toUpperCase() !== e.toUpperCase()) {
    //       newFilter.push(f);
    //     }
    //   });
    //   console.log(newFilter);
    //   filters = newFilter;
    // }
    // console.log(filters);
    // setFilter(filters);
    // if (filters.length == 0) {
    //   console.log(allContacts);
    //   let pagination = paginator(allContacts, 1);
    //   setPaginationArr(pagination.data);
    //   setPaginationObj(pagination);
    //   // setContacts(allContacts);
    // } else {
    //   let filteredContacts = [];
    //   function filterContacts(contacts, filters) {
    //     contacts.forEach((contact) => {
    //       let contactCat = [];
    //       // console.log(contact)
    //       Object.keys(contact.FieldValues[47].Value).forEach(function (
    //         key,
    //         index
    //       ) {
    //         // console.log(contact.FieldValues[47].Value)
    //         contactCat.push(contact.FieldValues[47].Value[key].Label);
    //       });
    //       // console.log(contactCat)
    //       if (contactCat.some((item) => filters.includes(item))) {
    //         if (filteredContacts.indexOf(contact) == -1) {
    //           filteredContacts.push(contact);
    //         }
    //       }
    //       // check org and name
    //       filters.forEach((f) => {
    //         if (contact.DisplayName.toUpperCase().includes(f.toUpperCase())) {
    //           console.log(contact);
    //           if (filteredContacts.indexOf(contact) == -1) {
    //             filteredContacts.push(contact);
    //           }
    //           console.log(filteredContacts);
    //         }
    //         if (contact.Organization.toUpperCase().includes(f.toUpperCase())) {
    //           console.log(contact);
    //           if (filteredContacts.indexOf(contact) == -1) {
    //             filteredContacts.push(contact);
    //           }
    //           console.log(filteredContacts);
    //         }
    //       });
    //     });
    //   }
    //   // console.log(filteredContacts)
    //   filterContacts(allContacts, filters);
    //   let pagination = paginator(filteredContacts, 1);
    //   setContacts(filteredContacts);
    //   setPaginationArr(pagination.data);
    //   setPaginationObj(pagination);
    //   // setContacts(filteredContacts);
    // }
  };

  const handleSearch = (searchTerm) => {
    // if (searchTerm != "") {
    //   let filteredContacts = [];
    //   console.log(filter);
    //   if (filter[0]) {
    //     console.log(true);
    //     filteredContacts = contacts;
    //   } else {
    //     console.log(false);
    //     filteredContacts = [];
    //   }
    //   let filters = filter;
    //   for (let i = 0; i < categories.length; i++) {
    //     let c = categories[i];
    //     if (c) {
    //       if (c.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1) {
    //         // console.log(c)
    //         filters.push(c);
    //       }
    //     }
    //   }
    //   let filtersUpper = [];
    //   filters.forEach((f) => {
    //     filtersUpper.push(f.toUpperCase());
    //   });
    //   if (filtersUpper.indexOf(searchTerm.toUpperCase()) == -1) {
    //     filters.push(searchTerm);
    //   }
    //   console.log(filters);
    //   setFilter(filters);
    //   allContacts.forEach((contact) => {
    //     let contactCat = [];
    //     // console.log(contact)
    //     Object.keys(contact.FieldValues[47].Value).forEach(function (
    //       key,
    //       index
    //     ) {
    //       contactCat.push(contact.FieldValues[47].Value[key].Label);
    //     });
    //     // Filter the data array based on the search term
    //     for (let i = 0; i < contactCat.length; i++) {
    //       let a = contactCat[i];
    //       if (a) {
    //         if (a.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1) {
    //           filteredContacts.push(contact);
    //         }
    //       }
    //     }
    //     if (
    //       contact.DisplayName.toUpperCase().includes(searchTerm.toUpperCase())
    //     ) {
    //       console.log(contact);
    //       if (filteredContacts.indexOf(contact) == -1) {
    //         filteredContacts.push(contact);
    //       }
    //       console.log(filteredContacts);
    //     }
    //     if (
    //       contact.Organization.toUpperCase().includes(searchTerm.toUpperCase())
    //     ) {
    //       console.log(contact);
    //       if (filteredContacts.indexOf(contact) == -1) {
    //         filteredContacts.push(contact);
    //       }
    //       console.log(filteredContacts);
    //     }
    //   });
    //   console.log(filteredContacts);
    //   setContacts(filteredContacts);
    //   let pagination = paginator(filteredContacts, 1);
    //   setPaginationArr(pagination.data);
    // }

    if (searchTerm != "") {
      setSearchResults(searchTerm);
      setPage(0);
    }
  };

  // useEffect(() => {
  //   fetchContacts();

  //   if (allContacts === "") {
  //     if (localStorage.getItem("GFWBAUSER")) {
  //       updateLoggedStatus(true);
  //     }
  //   }
  // });

  // useEffect to fetch contacts on component mount and on currentPage, filter, or searchTerm change
  useEffect(() => {
    if (allContacts === "") {
      if (localStorage.getItem("GFWBAUSER")) {
        updateLoggedStatus(true);
      }
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [page, filter, searchResults]);

  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />
      <section className="pt-24 px-24 flex">
        {/* MAIN DIRECTORY LEFT */}
        <div className="w-[25%] pt-28">
          <div
            onClick={() => {
              setFilter([]);
              let pagination = paginator(allContacts, 1);
              setContacts(allContacts);
              setPaginationArr(pagination);
            }}
            className="flex items-center justify-center border border-red-500 w-52 h-14 mb-[30px] cursor-pointer"
          >
            <p className="text-xl p-0 m-0 uppercase text-[#102647]">
              Clear Filters
            </p>
          </div>
          <div className="border border-[#B3B3B3] max-w-[386px] p-[15px] max-h-[633px] overflow-auto mr-[60px]">
            <p className="text-xl uppercase">Categories</p>
            <ul className="list-none p-0">
              {categories &&
                categories.map((c) => (
                  <li
                    className="flex gap-1 text-base cursor-pointer"
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
            {paginationArr ? (
              paginationArr.map((c) => {
                if (c.FieldValues[49].Value) {
                  return (
                    <MemberListItem
                      memberListLogo={`${c.Id}`}
                      memberListName={`${c.DisplayName}`}
                      memberListCompany={`${c.Organization}`}
                      memberListTitle={` ${c.FieldValues[39].Value}`}
                      memberListLocation={`${c.FieldValues[44].Value}, ${c.FieldValues[45].Value}`}
                      memberListWebsite={`${c.FieldValues[48].Value}`}
                      memberListWebsiteLink={{
                        href: `${c.FieldValues[48].Value}`,
                        target: "_blank",
                      }}
                      memberListCategory={`${c.memberCat}`}
                      memberListItemLink={{ href: `/profile/${c.Id}` }}
                      key={c.Id}
                    />
                  );
                } else {
                  return (
                    <MemberListItem
                      // memberListLogo={}
                      memberListName={`${c.DisplayName}`}
                      memberListCompany={`${c.Organization}`}
                      memberListTitle={` ${c.FieldValues[39].Value}`}
                      memberListLocation={`${c.FieldValues[44].Value}, ${c.FieldValues[45].Value}`}
                      memberListWebsite={`${c.FieldValues[48].Value}`}
                      memberListWebsiteLink={{
                        href: `${c.FieldValues[48].Value}`,
                        target: "_blank",
                      }}
                      memberListCategory={`${c.memberCat}`}
                      memberListItemLink={{ href: `/profile/${c.Id}` }}
                      key={c.Id}
                    />
                  );
                }
              })
            ) : (
              // <p className='text-xl leading-normal'>Loading Directory</p>
              <></>
            )}

            {isLoading && (
              <div className="flex gap-[10px] <p className='text-xl leading-normal'>Loading Directory</p>">
                <div className="animate-spin rounded-full border-t-4 border-red-500 border-solid h-5 w-5"></div>
                <p className="text-xl leading-normal">Loading Directory</p>
              </div>
            )}
          </div>
          {totalPages && (
            <div className="pagination">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                className="bg-[#102647] text-white text-xl uppercase mt-10 py-2 px-10"
              >
                Previous
              </button>
              <span className="text-xl font-bold mx-4">
                {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages - 1}
                className="bg-[#102647] text-white text-xl uppercase mt-10 py-2 px-10"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
