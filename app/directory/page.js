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
  const [filter, setFilter] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [paginationObj, setPaginationObj] = useState({});
  const [paginationArr, setPaginationArr] = useState("");
  const [fetchedData, setFetchedData] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [searched, setSearched] = useState([]);

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
      // console.log(response);
      // const alphaSorted = json.Contacts.sort();
      let categoryArr = [];
      let areaArr = [];
      // const getValidUrl = (url = "") => {
      //   let newUrl = window.decodeURIComponent(url);
      //   newUrl = newUrl.trim().replace(/\s/g, "");

      //   if (/^(:\/\/)/.test(newUrl)) {
      //     return `http${newUrl}`;
      //   }
      //   if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
      //     return `http://${newUrl}`;
      //   }
      // }
      let formatedContacts = [];
      json.Contacts.forEach((c) => {
        if (typeof c.FieldValues[48].Value != "object") {
          // console.log(c.FieldValues[48].Value);
          if (c.FieldValues[48].Value.startsWith("http")) {
            //str starts with http
          } else {
            //str does not start with http
            if (c.FieldValues[48].Value !== "") {
              c.FieldValues[48].Value = `http://${c.FieldValues[48].Value}`;
            }
          }
        }
        if (c.DisplayName !== 'Mattingley, Patrick') {
          c.FullName = `${c.FirstName} ${c.LastName}`
          formatedContacts.push(c);
        } else if (c.DisplayName == 'Mattingley, Patrick') {
          c.DisplayName = c.Organization;
          formatedContacts.push(c);
        }
      });
      // console.log(formatedContacts);
      let pagination = paginator(formatedContacts, 1);
      setFetchedData(pagination.data);
      setPaginationArr(pagination.data);
      setPaginationObj(pagination);
      setContacts(formatedContacts);
      setAllContacts(formatedContacts);

      json?.Contacts?.forEach((element) => {
        let cat = element.FieldValues[47];
        let memberCat = [];
        Object.keys(cat?.Value || {})?.forEach(function (key, index) {
          // console.log(key, "jsonjsonjsonjson");  // Optional for debugging

          // Access properties with optional chaining and default values
          const label = cat?.Value?.[key]?.Label || "Label not found";

          if (categoryArr?.indexOf(label) === -1) {
            categoryArr?.push(label);
          }

          memberCat?.push(` ${label}`);
        });

        // console.log(memberCat, "memberCat");

        // console.log(categoryArr, "...............ctg");
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
      // console.log(categoryArr, "rtrtrttr");
      setCategories(categoryArr.sort());
      // setServiceAreas(areaArr);
    }
  };
  const toggleFilter = async (e) => {
    let filters = filter;
    // console.log(e)
    if (filters.indexOf(e) == -1) {
      filters.push(e);
    } else {
      let newFilter = [];
      // console.log(filters);
      // console.log(filters.splice(filters.indexOf(e), 1));
      // filters.splice(filters.indexOf(e), 1);
      filters.forEach(function (f) {
        if (f.toUpperCase() !== e.toUpperCase()) {
          newFilter.push(f);
        }
      });
      console.log(newFilter);
      filters = newFilter;
    }
    console.log(filters);
    setFilter(filters);
    if (filters.length == 0) {
      console.log(allContacts);
      let pagination = paginator(allContacts, 1);
      // setPaginationArr(pagination.data);
      console.log(pagination, ".................pagination");
      setPaginationArr(pagination?.data);
      setPaginationObj(pagination);
      // setContacts(allContacts);
    } else {
      let filteredContacts = [];
      function filterContacts(contacts, filters) {
        contacts.forEach((contact) => {
          let contactCat = [];
          console.log(contact)
          Object.keys(contact.FieldValues[47].Value || {}).forEach(function (
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
          // check org and name
          // filters.forEach((f) => {
          //   if (contact.DisplayName.toUpperCase().includes(f.toUpperCase())) {
          //     console.log(contact);
          //     if (filteredContacts.indexOf(contact) == -1) {
          //       filteredContacts.push(contact);
          //     }
          //     console.log(filteredContacts);
          //   }
          //   if (contact.Organization.toUpperCase().includes(f.toUpperCase())) {
          //     console.log(contact);
          //     if (filteredContacts.indexOf(contact) == -1) {
          //       filteredContacts.push(contact);
          //     }
          //     console.log(filteredContacts);
          //   }
          // });
          filters.forEach((f) => {
            const displayName = contact.DisplayName.toUpperCase();
            const organization = contact.Organization.toUpperCase();
            const searchFilter = f.toUpperCase();

            // Split the display name by comma
            const displayNameParts = contact.DisplayName.split(',').map(part => part.trim().toUpperCase());

            // Create the "First Name, Last Name" format
            const firstNameLastName = displayNameParts.length === 2 &&
              (displayNameParts[1] + ' ' + displayNameParts[0]).includes(filterUpperCase);

            // Check if any format matches the search filter
            // if (displayName.includes(searchFilter) || firstNameLastName.includes(searchFilter)) {
            //   console.log(contact);
            //   if (filteredContacts.indexOf(contact) === -1) {
            //     filteredContacts.push(contact);
            //   }
            //   console.log(filteredContacts);
            // }

            // Check if the organization matches the search filter
            if (organization.includes(searchFilter)) {
              console.log(contact);
              if (filteredContacts.indexOf(contact) === -1) {
                filteredContacts.push(contact);
              }
              console.log(filteredContacts);
            }
          });

        });
      }
      // console.log(filteredContacts)
      filterContacts(allContacts, filters);
      let pagination = paginator(filteredContacts, 1);
      setContacts(filteredContacts);
      setPaginationArr(pagination.data);
      setPaginationObj(pagination);
      // setContacts(filteredContacts);
    }
  };
  console.log(paginationArr, "........pag after clear filter");
  const handleSearch = (searchTerm) => {
    console.log(searchTerm);
    if (searchTerm != "") {
      let filteredContacts = [];
      console.log(filter);
      if (filter[0]) {
        console.log("fsdfsdffsdfsf");
        console.log(true);
        filteredContacts = contacts;
      } else {
        console.log(false);
        filteredContacts = [];
      }
      console.log(contacts);
      console.log(filteredContacts);
      console.log(filter);
      // setContacts(allContacts);
      let filters = filter;
      // // console.log(e)
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
      let filtersUpper = [];
      filters.forEach((f) => {
        filtersUpper.push(f.toUpperCase());
      });
      if (filtersUpper.indexOf(searchTerm.toUpperCase()) == -1) {
        filters.push(searchTerm);
      }
      console.log(filters);
      setFilter(filters);

      console.log(allContacts, "allContacts");
      // console.log(contacts, allContacts);
      allContacts.forEach((contact) => {
        let contactCat = [];
        // console.log(contact)
        Object.keys(contact.FieldValues[47].Value || {}).forEach(function (
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
        // console.log(contact.DisplayName.toUpperCase(), searchTerm.toUpperCase());
        // if (
        //   contact.DisplayName.toUpperCase().includes(searchTerm.toUpperCase())
        // ) {
        //   console.log(contact.FullName);
        //   if (filteredContacts.indexOf(contact) == -1) {
        //     filteredContacts.push(contact);
        //   }
        //   console.log(filteredContacts);
        // }
        if (contact.DisplayName) {
          const displayNameParts = contact.DisplayName.split(',').map(part => part.trim().toUpperCase());

          // Check for "Last Name, First Name"
          const lastNameFirstName = contact.DisplayName.toUpperCase().includes(searchTerm.toUpperCase());

          // Check for "First Name Last Name"
          const firstNameLastName = displayNameParts.length === 2 &&
            (displayNameParts[1] + ' ' + displayNameParts[0]).includes(searchTerm.toUpperCase());

          if (lastNameFirstName || firstNameLastName) {
            console.log(contact);
            if (filteredContacts.indexOf(contact) === -1) {
              filteredContacts.push(contact);
            }
            console.log(filteredContacts);
          }
        }
        if (
          contact.Organization.toUpperCase().includes(searchTerm.toUpperCase())
        ) {
          console.log(contact);
          if (filteredContacts.indexOf(contact) == -1) {
            filteredContacts.push(contact);
          }
          console.log(filteredContacts);
        }
      });
      setContacts(filteredContacts);
      let pagination = paginator(filteredContacts, 1);
      setPaginationArr(pagination.data);
      console.log(filteredContacts);
      // setSearched(filteredContacts);
    }
  };
  useEffect(() => {
    if (allContacts === "") {
      fetchContacts();
      if (localStorage.getItem("GFWBAUSER")) {
        updateLoggedStatus(true);
      }
    }
  });

  console.log(paginationArr, "...............pagination");

  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />
      <section className="pt-2 px-0 md:pt-24 md:px-24 flex flex-col md:flex-row">
        {/* MAIN DIRECTORY LEFT */}
        <div className="md:hidden">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="md:w-[25%] pt-2 md:pt-28">
          <div
            onClick={() => {
              setFilter([]);
              let pagination = paginator(allContacts, 1);
              console.log(pagination, "................pag");
              setContacts(allContacts);
              setPaginationArr(pagination?.data);
            }}
            className="flex items-center justify-center mx-auto md:ml-0 border border-red-500 w-[240px] md:w-52 md:h-14 md:mb-[30px] cursor-pointer"
          >
            <p className="text-base md:text-xl p-0 m-0 uppercase text-[#102647]">
              Clear Filters
            </p>
          </div>
          <div className="mx-auto md:ml-0 border border-[#B3B3B3] max-w-[240px] md:max-w-[386px] p-[15px] max-h-[250px] md:max-h-[633px] overflow-auto md:mr-[60px]">
            <p className="text-base md:text-xl uppercase">Categories</p>
            <ul className="list-none p-0">
              {categories &&
                categories.map((c) => (
                  <li
                    className="flex gap-1 text-sm md:text-base cursor-pointer"
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
        <div className="w-full md:w-[75%]">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center pb-10">
            <h2>MEMBER DIRECTORY</h2>
            <div className="hidden md:block">
              <SearchBar onSearch={handleSearch} />
            </div>
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
              paginationArr?.map((c) => {
                // console.log(c.FieldValues[49].Value);
                if (c.MembershipEnabled)
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
              <div className="flex gap-[10px] <p className='text-xl leading-normal'>Loading Directory</p>">
                <div className="animate-spin rounded-full border-t-4 border-red-500 border-solid h-5 w-5"></div>
                <p className="text-xl leading-normal">Loading Directory</p>
              </div>
            )}
          </div>
          {paginationObj && (
            <div className="flex justify-between">
              <div>
                {paginationObj.pre_page && (
                  <div
                    className="bg-[#102647] text-white text-sm md:text-xl uppercase mt-10 py-2 px-2 md:px-10 cursor-pointer"
                    onClick={() => {
                      console.log(paginationObj, contacts);
                      let pagination = paginator(
                        contacts,
                        paginationObj.pre_page
                      );
                      console.log(pagination);
                      setPaginationArr(pagination.data);
                      setPaginationObj(pagination);
                    }}
                  >
                    <p className="mb-0">Prev Page</p>
                  </div>
                )}
              </div>
              <div>
                {paginationObj.next_page && (
                  <div
                    className="bg-[#102647] text-white text-sm md:text-xl uppercase mt-10 py-2 px-2 md:px-10 cursor-pointer"
                    onClick={() => {
                      console.log(paginationObj, contacts);
                      let pagination = paginator(
                        contacts,
                        paginationObj.next_page
                      );
                      console.log(pagination);
                      setPaginationArr(pagination.data);
                      setPaginationObj(pagination);
                    }}
                  >
                    <p className="mb-0">Next Page</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
