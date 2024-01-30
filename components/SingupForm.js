"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const params = useParams();
  // console.log(params)

  //useState for form fields
  const [membershipOptions, setMembershipOptions] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [officePhone, setOfficePhone] = useState("");
  const [cell, setCell] = useState("");
  const [fax, setFax] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState("");
  const [photo, setPhoto] = useState("");
  const [categories, setCategories] = useState("");
  const [area, setArea] = useState("");
  const [organization, setOrganization] = useState("");
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [Email, setEmail] = useState("");
  const [secondEmail, setSecondEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [houzz, setHouzz] = useState("");
  const [instagram, setInstagram] = useState("");
  const [memberSince, setMemberSince] = useState("");
  const [employees, setEmployees] = useState("");
  const [Password, setPassword] = useState("");
  const [loggedId, setLoggedId] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [referredBy, setReferredBy] = useState("");
  const [certName, setCertName] = useState("");
  const [certCode, setCertCode] = useState("");

  const fetchMemberships = async () => {
    if (localStorage.getItem("GFWBAUSER")) {
      var { Id } = JSON.parse(localStorage.getItem("GFWBAUSER"));
      setLoggedId(Id);
    }
    let response = await fetch("/api/allMemberships", {
      // let response = await fetch(`/api/contact/${params.id}`, {
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
      let membershipArr = [];
      json.forEach((membership) => {
        // console.log(membership)
        if (membership.PublicCanApply == true) {
          membershipArr.push(membership);
        }
      });
      console.log(membershipArr);
      setMembershipOptions(membershipArr.sort());
    }
  };

  // const handleSubmit = async (e) => {
  const handleSubmit = async (e) => {
    let arr = [];
    let checkboxes = document.querySelectorAll(
      "input[type='checkbox']:checked"
    );
    for (let i = 0; i < checkboxes.length; i++) {
      arr.push(checkboxes[i].value);
    }
    console.log(document.querySelector("#membership").value);
    console.log(arr);
    e.preventDefault();
    // var { Id, DisplayName, Email, FirstName, LastName, MembershipLevel, Status, token } = JSON.parse(localStorage.getItem("GFWBAUSER"));
    if (document.querySelector("#membership").value == "1468722") {
      setCertName("Builder Classification");
      setCertCode("custom-13852170");
    } else if (document.querySelector("#membership").value == "739309") {
      setCertName("Builder Classification");
      setCertCode("custom-13852170");
    } else if (document.querySelector("#membership").value == "739308") {
      setCertName("Associate Classifications");
      setCertCode("custom-7728413");
    } else if (document.querySelector("#membership").value == "1468735") {
      setCertName("Associate Classifications");
      setCertCode("custom-7728413");
    }
    let body = {
      FirstName: FName,
      LastName: LName,
      MembershipEnabled: true,
      MembershipLevel: {
        Id: document.querySelector("#membership").value,
      },
      Organization: organization,
      Email: Email,
      FieldValues: [
        {
          FieldName: "Office Phone",
          SystemCode: "Phone",
          Value: officePhone,
        },
        {
          FieldName: "Organization",
          SystemCode: "Organization",
          Value: organization,
        },
        {
          FieldName: "eMail",
          SystemCode: "Email",
          Value: Email,
        },
        {
          FieldName: "Title",
          SystemCode: "custom-7725697",
          Value: title,
        },
        {
          FieldName: "Cell Phone",
          SystemCode: "custom-14590954",
          Value: cell,
        },
        {
          FieldName: "Fax",
          SystemCode: "custom-7725703",
          Value: fax,
        },
        {
          FieldName: "Secondary Email Address",
          SystemCode: "custom-15537186",
          Value: secondEmail,
        },
        {
          FieldName: "Address",
          SystemCode: "custom-7725698",
          Value: address,
        },
        {
          FieldName: "City",
          SystemCode: "custom-7725699",
          Value: city,
        },
        {
          FieldName: "State",
          SystemCode: "custom-7725700",
          Value: state,
        },
        {
          FieldName: "ZIP",
          SystemCode: "custom-7725701",
          Value: zip,
        },
        {
          FieldName: certName,
          SystemCode: certCode,
          Value: arr,
        },
        {
          FieldName: "Website",
          SystemCode: "custom-7725704",
          Value: website,
        },
        {
          FieldName: "Company Logo",
          SystemCode: "custom-7725704",
          Value: logo,
        },
        {
          FieldName: "Photo",
          SystemCode: "custom-7725714",
          Value: photo,
        },
        {
          FieldName:
            "If a member referred you to the association please list their name and company",
          SystemCode: "custom-7725711",
          Value: referredBy,
        },
        {
          FieldName: "Facebook Page URL",
          SystemCode: "custom-7725705",
          Value: facebook,
        },
        {
          FieldName: "Twitter URL",
          SystemCode: "custom-7725706",
          Value: twitter,
        },
        {
          FieldName: "Houzz URL",
          SystemCode: "custom-14543948",
          Value: houzz,
        },
        {
          FieldName: "You Tube URL",
          SystemCode: "custom-14543949",
          Value: youtube,
        },
        {
          FieldName: "Instagram URL",
          SystemCode: "custom-14543950",
          Value: instagram,
        },
        {
          FieldName: "Member of GFW Builders Assocition Since",
          SystemCode: "custom-14571711",
          Value: memberSince,
        },
        {
          FieldName: "Total Paid Employees",
          SystemCode: "custom-7725696",
          Value: employees,
        },
      ],
      Password: Password,
    };
    console.log(body);
    let response = await fetch("/api/user/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ body }),
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      console.log("response not ok");
    }
    if (response.ok) {
      console.log(json);
      // setUpdating(false)
      // setNewFName('')
      // setNewLName('')
      // setNewEmail('')
      // setNewPassword('')
      // const { accounts, critChange, token } = json
      // const { Id, DisplayName, Email, FirstName, LastName, IsAccountAdministrator, MembershipLevel, Status } = accounts
      // setContact(accounts)
      // const contact = { Id, DisplayName, Email, FirstName, LastName, IsAccountAdministrator, MembershipLevel: MembershipLevel.Name, Status, token }
      // // console.log(contact)
      // localStorage.setItem("GFWBAUSER", JSON.stringify(contact));
      // if (critChange) {
      //     // remove localStorage and redirect to a log back in page
      //     localStorage.removeItem("GFWBAUSER");
      // }
    }
  };

  useEffect(() => {
    if (membershipOptions === "") {
      fetchMemberships();
    }
  });

  const classifications = [
    { name: "Accounting" },
    { name: "Advertising/Marketing/PR" },
    { name: "Air Conditioning/Heating" },
    { name: "Alarm Systems" },
    { name: "Appliances" },
    { name: "Appraisers/Estimators" },
    { name: "Architects" },
    { name: "Art Services" },
    { name: "Attic Ventilation" },
    { name: "Audio/Visual" },
    { name: "Automation Services" },
    { name: "Automotive Sales/Leasing" },
    { name: "Awards/Trophies/Gifts" },
    { name: "Banking" },
    { name: "Barbeque Grills" },
    { name: "Blinds" },
    { name: "Blueprint Services" },
    { name: "Brick" },
    { name: "Building Materials" },
    { name: "Cabinets" },
    { name: "Carpentry" },
    { name: "Carpet Cleaning" },
    { name: "Catering/Restaurants" },
    { name: "Cleaning Services" },
    { name: "Closet Organization Systems" },
    { name: "Columns" },
    { name: "Computer Products & Services" },
    { name: "Concrete" },
    { name: "Concrete Reinforcement" },
    { name: "Concrete Staining & Stamping" },
    { name: "Consultants" },
    { name: "Convention Services & Planning" },
    { name: "Countertops" },
    { name: "Decks" },
    { name: "Designers" },
    { name: "Doors" },
    { name: "Drywall" },
    { name: "Electrical Work" },
    { name: "Elevators/Dumbwaiters" },
    { name: "Embroidery/Screen Print" },
    { name: "Employee Benefits" },
    { name: "Energy" },
    { name: "Engineering" },
    { name: "Environmental Consulting" },
    { name: "Erosion Control" },
    { name: "Estate Planning" },
    { name: "Excavation/Grading" },
    { name: "Fencing" },
    { name: "Financial Services" },
    { name: "Fire Prevention" },
    { name: "Fireplace/Mantels" },
    { name: "Floors" },
    { name: "Foundation Repair" },
    { name: "Framing" },
    { name: "Furniture" },
    { name: "Garage Doors" },
    { name: "Garage Organization" },
    { name: "Generators" },
    { name: "Glass & Mirrors" },
    { name: "Governments" },
    { name: "Granite" },
    { name: "Green Building" },
    { name: "Gutters" },
    { name: "Hardware" },
    { name: "Home Theaters" },
    { name: "Inspection Service" },
    { name: "Insulating Concrete Forms" },
    { name: "Insulation" },
    { name: "Insurance" },
    { name: "Interior Designers" },
    { name: "Iron Work" },
    { name: "Kitchen/Bath" },
    { name: "Kitchen/Bath/Lighting" },
    { name: "Land Development" },
    { name: "Landscaping" },
    { name: "Legal Services" },
    { name: "Lighting/Fans" },
    { name: "Lumber" },
    { name: "Marble" },
    { name: "Market Research" },
    { name: "Mobile Trash Compaction" },
    { name: "Mold Inhibitors" },
    { name: "Motorized Screens" },
    { name: "Outdoor Cooling & Heating" },
    { name: "Outdoor Living" },
    { name: "Overhead/Garage Doors" },
    { name: "Paint" },
    { name: "Personal Safety" },
    { name: "Pest Control/Extermination" },
    { name: "Pier Drilling" },
    { name: "Plumbing" },
    { name: "Portable Restrooms" },
    { name: "Printing" },
    { name: "Promotional Items" },
    { name: "Propane" },
    { name: "Publishers" },
    { name: "Ramps and other accessibility items" },
    { name: "Real Estate Brokers" },
    { name: "Real Estate Photography" },
    { name: "Remodeling/Renovation" },
    { name: "Resurfacing/Repair" },
    { name: "Retaining Walls" },
    { name: "Roofing" },
    { name: "Security" },
    { name: "Septic" },
    { name: "Sheet Metal" },
    { name: "Shutters" },
    { name: "Siding" },
    { name: "Signs" },
    { name: "Smart Home Technology" },
    { name: "Sod Farm" },
    { name: "Soil Testing" },
    { name: "Solar Energy" },
    { name: "Sprinklers (Fire)" },
    { name: "Sprinklers (Lawn)" },
    { name: "Staffing" },
    { name: "Staging" },
    { name: "Stairs/Handrails" },
    { name: "Stone/Cast/Natural/Cut" },
    { name: "Storm Shelters" },
    { name: "Structured Wiring" },
    { name: "Stucco" },
    { name: "Surveyors" },
    { name: "Swimming Pools" },
    { name: "Tax Consultants" },
    { name: "Technology" },
    { name: "Telephone Systems" },
    { name: "Telephone/Mobile/Pager" },
    { name: "Tile" },
    { name: "Title Insurance" },
    { name: "Toilets/Portable" },
    { name: "Tools/Equipment" },
    { name: "Travel Agents" },
    { name: "Trim" },
    { name: "Trucking/Transportation" },
    { name: "Trusses/Floor Joists" },
    { name: "Utility Company" },
    { name: "Utility Contractors" },
    { name: "Vacuum Systems" },
    { name: "Wall Coverings" },
    { name: "Warranty Insurance" },
    { name: "Waste Removal" },
    { name: "Water Damage Restoration" },
    { name: "Water Leak Detection" },
    { name: "Water Treatment" },
    { name: "Weatherization Systems" },
    { name: "Windows" },
    { name: "Wine Cellars" },
  ];

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="p-10">
          <p className="text-xl">Choose you level</p>
          <select id="membership" className="border text-xl mb-6 pl-2">
            {membershipOptions
              ? membershipOptions.map((m) => (
                  <option value={m.Id} key={m.Id}>
                    {m.Name}
                  </option>
                ))
              : null}
          </select>
          <div className="flex flex-row gap-8 text-xl font-light mb-4 w-full">
            <div>
              <label htmlFor="First Name">First Name</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="First Name"
                value={FName}
                onChange={(e) => {
                  setFName(e.target.value);
                }}
                required
              />
            </div>
            <div>
              <label htmlFor="Last Name">Last Name</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="Last Name"
                value={LName}
                onChange={(e) => {
                  setLName(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="text-xl font-light mb-4">
            <label htmlFor="Organization">Organization</label>
            <input
              className="hi w-[500px] text-base pl-2"
              type="text"
              placeholder="Organization"
              value={organization}
              onChange={(e) => {
                setOrganization(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex flex-row gap-8 text-xl font-light mb-4">
            <div className="text-xl font-light mb-4 w-full">
              <label htmlFor="Office Phone">Office Phone</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="phone"
                placeholder="Office Phone"
                value={officePhone}
                onChange={(e) => {
                  setOfficePhone(e.target.value);
                }}
                required
              />
            </div>
            <div className="text-xl font-light mb-4 w-full">
              <label htmlFor="Email">eMail</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="eMail"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <div className="text-xl font-light mb-4 w-full">
              <label htmlFor="Title">Title</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-8 text-xl font-light mb-4">
            <div className="text-xl font-light mb-4">
              <label htmlFor="Cell Phone">Cell Phone</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="Cell Phone"
                value={cell}
                onChange={(e) => {
                  setCell(e.target.value);
                }}
              />
            </div>
            <div className="text-xl font-light mb-4 w-full">
              <label htmlFor="Fax">Fax</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="Fax"
                value={fax}
                onChange={(e) => {
                  setFax(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="text-xl font-light mb-4 w-full">
            <label htmlFor="Secondary Email Address">
              Secondary Email Address
            </label>
            <input
              className="hi w-[300px] text-base pl-2"
              type="text"
              placeholder="Secondary Email Address"
              value={secondEmail}
              onChange={(e) => {
                setSecondEmail(e.target.value);
              }}
            />
            <p className="text-xs mt-1">
              *USE THIS FIELD IF YOU NEED INVOICES SENT TO ANOTHER EMAIL
              ADDRESS. THIS ADDRESS WILL RECEIVE ALL EMAILS FROM THE GFWBA
              SYSTEM: INVOICES, EVENT NOTICES, ETC.
            </p>
          </div>
          <div className="flex flex-row gap-8 text-xl font-light mb-4">
            <div className="text-xl font-light mb-4">
              <label htmlFor="Address">Address</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                required
              />
            </div>
            <div className="text-xl font-light mb-4">
              <label htmlFor="City">City</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-8 text-xl font-light mb-4">
            <div className="text-xl font-light mb-4">
              <label htmlFor="State">State</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
                required
              />
            </div>
            <div className="text-xl font-light mb-4">
              <label htmlFor="ZIP">ZIP</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="ZIP"
                value={zip}
                onChange={(e) => {
                  setZip(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <div className="text-xl font-light mb-6">
            <label htmlFor="Password">Password</label>
            <input
              className="hi w-[300px] text-base pl-2"
              type="text"
              placeholder="Password"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <label className="text-xl mb-3" htmlFor="Classifications">
            Classifications{" "}
            <span className="text-base">(Choose all that apply.)</span>
          </label>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {classifications.map((c) => (
              <div key={c.name}>
                <div className="flex">
                  <input
                    type="checkbox"
                    id={c.name}
                    name={c.name}
                    value={c.name}
                  />
                  <label className="pl-2">{c.name}</label>
                </div>
              </div>
            ))}
          </div>
          <div className="text-xl font-light mb-4">
            <label htmlFor="Website">Website</label>
            <input
              className="hi w-[300px] text-base pl-2"
              type="text"
              placeholder="Website"
              value={website}
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
            />
            <p className="text-xs mt-1">
              *Must include http:// or https://. Example:
              http://www.yourwebsite.com
            </p>
          </div>

          <label className="text-xl mb-2" htmlFor="referred">
            Member Referral
          </label>
          <textarea
            value={referredBy}
            onChange={(e) => {
              setReferredBy(e.target.value);
            }}
            rows="2"
            cols="50"
          ></textarea>
          <p className="text-xs mt-1">
            If someone invited you to join the GFWBA, please list their name. If
            no one referred you please enter NA
          </p>

          {/* Social Media Links */}
          <div className="flex flex-row gap-8 text-xl font-light">
            <div className="text-xl font-light mb-4">
              <label htmlFor="Facebook Page URL">Facebook Page URL</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="Facebook Page URL"
                value={facebook}
                onChange={(e) => {
                  setFacebook(e.target.value);
                }}
              />
              <p className="text-xs mt-1">
                The URL to your company Facebook page.
              </p>
            </div>
            <div className="text-xl font-light mb-4">
              <label htmlFor="Twitter URL">Twitter URL</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="Twitter URL"
                value={twitter}
                onChange={(e) => {
                  setTwitter(e.target.value);
                }}
              />
              <p className="text-xs mt-1">The URL to your Twitter page.</p>
            </div>
            <div className="text-xl font-light mb-4">
              <label htmlFor="Houzz URL">Houzz URL</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="Houzz URL"
                value={houzz}
                onChange={(e) => {
                  setHouzz(e.target.value);
                }}
              />
              <p className="text-xs mt-1">The URL to your Houzz page</p>
            </div>
          </div>
          <div className="flex flex-row gap-8 text-xl font-light">
            <div className="text-xl font-light mb-4">
              <label htmlFor="You Tube URL">You Tube URL</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="You Tube URL"
                value={youtube}
                onChange={(e) => {
                  setYoutube(e.target.value);
                }}
              />
              <p className="text-xs mt-1">The URL to your YouTube page</p>
            </div>
            <div className="text-xl font-light mb-4">
              <label htmlFor="Instagram URL">Instagram URL</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder="Instagram URL"
                value={instagram}
                onChange={(e) => {
                  setInstagram(e.target.value);
                }}
              />
              <p className="text-xs mt-1">The URL to your Instagram page</p>
            </div>
          </div>
          <div className="text-xl font-light mb-4">
            <label htmlFor="Member Since">Member of GFWBA Since</label>
            <input
              className="hi w-[300px] text-base pl-2"
              type="text"
              placeholder="Member Since"
              value={memberSince}
              onChange={(e) => {
                setMemberSince(e.target.value);
              }}
            />
          </div>
          <div className="text-xl font-light mb-4">
            <label htmlFor="Total Paid Employees">Total Paid Employees</label>
            <input
              className="hi w-[300px] text-base pl-2"
              type="text"
              placeholder="Total Paid Employees"
              value={employees}
              onChange={(e) => {
                setEmployees(e.target.value);
              }}
              required
            />
          </div>

          <input
            className="cursor-pointer bg-[#102647] text-white text-xl uppercase mt-10 py-2 px-10"
            type="submit"
          />
        </form>
      </div>
    </>
  );
}
