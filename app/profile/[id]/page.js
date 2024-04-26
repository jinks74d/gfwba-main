"use client";
import { InnerHero, ProfileSection } from "@/devlink";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLoggedStatus } from "@/context/LoggedStatusProvider";
import axios from "axios";
const imageServer = process.env.NEXT_PUBLIC_IMAGE_SERVER;

export default function Profile({ imageData }) {
  // const { query } = useRouter()
  const router = useRouter();
  const params = useParams();
  // console.log(params)
  const [contact, setContact] = useState("");
  const [fieldValues, setFieldValues] = useState([]);
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [office, setOffice] = useState("");
  const [cell, setCell] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState("");
  console.log(logo, "logo");
  const [categories, setCategories] = useState("");
  const [categoriesArr, setCategoriesArr] = useState("");
  const [area, setArea] = useState("");
  const [updating, setUpdating] = useState(false);
  const [newFName, setNewFName] = useState("");
  const [newLName, setNewLName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loggedId, setLoggedId] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const { loggedStatus, updateLoggedStatus } = useLoggedStatus();
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [emailReplyToAddress, setEmailReplyToAddress] = useState("");
  const [emailReplyToName, setEmailReplyToName] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [membershipOptions, setMembershipOptions] = useState("");
  //
  const [newAddress, setNewAddress] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newOfficePhone, setNewOfficePhone] = useState("");
  const [newCell, setNewCell] = useState("");
  const [newFax, setNewFax] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newLogoBase, setNewLogoBase] = useState("");
  const [newLogoFile, setNewLogoFile] = useState("");
  const [newPhoto, setNewPhoto] = useState("");
  const [newArea, setNewArea] = useState("");
  const [newOrganization, setNewOrganization] = useState("");
  const [newSecondEmail, setNewSecondEmail] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newState, setNewState] = useState("");
  const [newZip, setNewZip] = useState("");
  const [newFacebook, setNewFacebook] = useState("");
  const [newTwitter, setNewTwitter] = useState("");
  const [newYoutube, setNewYoutube] = useState("");
  const [newHouzz, setNewHouzz] = useState("");
  const [newInstagram, setNewInstagram] = useState("");
  const [newMemberSince, setNewMemberSince] = useState("");
  const [newEmployees, setNewEmployees] = useState("");
  const [newReferredBy, setNewReferredBy] = useState("");
  const [tempImg, setTempImg] = useState("");

  const [checkboxes, setCheckboxes] = useState(categoriesArr);

  const handleCheckboxChange = (category) => {
    if (checkboxes.includes(category)) {
      // If category is already in the list, remove it
      setCheckboxes(checkboxes.filter((cat) => cat !== category));
    } else {
      // If category is not in the list, add it
      setCheckboxes([...checkboxes, category]);
    }
  };

  const fetchContact = async () => {
    if (localStorage.getItem("GFWBAUSER")) {
      var { Id, DisplayName, Email } = JSON.parse(
        localStorage.getItem("GFWBAUSER")
      );
      // if (localStorage.getItem("GFWBATEMP")) {
      //   var imgJson = JSON.parse(localStorage.getItem("GFWBATEMP"));
      //   setTempImg(imgJson.tempImg);
      //   console.log(tempImg);
      // }
      setLoggedId(Id);
      if (params.id == Id) {
        setEmailReplyToAddress(Email);
        setEmailReplyToName(DisplayName);
      }
    }
    // let response = await fetch('/api/allContacts', {
    let response = await fetch(`/api/contact/${params.id}`, {
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
      setContact(json);
      setFieldValues(json.FieldValues);
      setAddress(
        ` ${json.FieldValues[43].Value}, ${json.FieldValues[44].Value}, ${json.FieldValues[45].Value} ${json.FieldValues[46].Value}`
      );
      setTitle(` ${json.FieldValues[39].Value}`);
      setOffice(` ${json.FieldValues[25].Value}`);
      setCell(` ${json.FieldValues[40].Value}`);
      if (typeof json.FieldValues[48].Value != "object") {
        // console.log(c.FieldValues[48].Value)
        if (json.FieldValues[48].Value.startsWith("http")) {
          //str starts with http
        } else {
          //str does not start with http
          if (json.FieldValues[48].Value !== "") {
            json.FieldValues[48].Value = `http://${json.FieldValues[48].Value}`;
          }
        }
      }
      setWebsite(` ${json.FieldValues[48].Value}`);
      // let imageData = json.FieldValues[49].Value.Url.blob()
      // const imageUrl = URL.createObjectURL(imageData);
      // console.log(json.profLogo)
      // const logoUrl = URL.createObjectURL(json.profLogo);
      // console.log(logoUrl)
      // console.log(json, "json");
      if (json.FieldValues[48].Value) {
        setLogo(`${json.FieldValues[49].Value.Id}`);
      }
      if (tempImg != "") {
        if (tempImg !== logo) {
          setLogo(`${tempImg}`);
        }
      }
      let categoryArr = [];
      let categoriesArr = [];
      let cat = json.FieldValues[47];
      if (typeof cat == "object") {
        Object.keys(cat.Value).forEach(function (key, index) {
          if (categoryArr.indexOf(cat.Value[key].Label) == -1) {
            if (index > 0) {
              categoryArr.push(`, ${cat.Value[key].Label}`);
              categoriesArr.push(cat.Value[key].Label);
            } else {
              categoryArr.push(cat.Value[key].Label);
              categoriesArr.push(cat.Value[key].Label);
            }
          }
        });
        setCategories(categoryArr);
        setCategoriesArr(categoriesArr);
        setCheckboxes(categoriesArr);
        // console.log(categoryArr)
      }
      let areaArr = [];
      let areas = json.FieldValues[52];
      if (areas.FieldName == "Service Area") {
        Object.keys(areas.Value).forEach(function (key, index) {
          if (areaArr.indexOf(areas.Value[key].Label) == -1) {
            if (index > 0) {
              areaArr.push(`, ${areas.Value[key].Label}`);
            } else {
              areaArr.push(areas.Value[key].Label);
            }
          }
        });
        setArea(areaArr);
      }
    }
  };

  const handleSubmit = async (e) => {
    let arr = [];
    let checkboxes = document.querySelectorAll(
      "input[type='checkbox']:checked"
    );
    for (let i = 0; i < checkboxes.length; i++) {
      arr.push(checkboxes[i].value);
    }
    e.preventDefault();
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
    let changes = {};
    let fieldValues = [];
    // "if" cases to identify elements changed prior to sending to api
    if (newFName !== "") {
      changes.FirstName = newFName;
    }
    if (newLName !== "") {
      changes.LastName = newLName;
    }
    if (newEmail !== "") {
      changes.Email = newEmail;
    }
    if (newPassword !== "") {
      changes.Password = newPassword;
    }
    if (newAddress !== "") {
      fieldValues.push({
        FieldName: "Address",
        SystemCode: "custom-7725698",
        Value: newAddress,
      });
    }
    if (newTitle !== "") {
      fieldValues.push({
        FieldName: "Title",
        SystemCode: "custom-7725697",
        Value: newTitle,
      });
    }
    if (newOfficePhone !== "") {
      changes.Phone = newOfficePhone;
    }
    if (newCell !== "") {
      fieldValues.push({
        FieldName: "Cell Phone",
        SystemCode: "custom-14590954",
        Value: newCell,
      });
    }
    if (newFax !== "") {
      fieldValues.push({
        FieldName: "Fax",
        SystemCode: "custom-7725703",
        Value: newFax,
      });
    }
    if (newWebsite !== "") {
      fieldValues.push({
        FieldName: "Website",
        SystemCode: "custom-7725704",
        Value: newWebsite,
      });
    }
    if (arr !== categoriesArr) {
      console.log(arr);
      let formattedArr = [];
      arr.forEach((e) => {
        formattedArr.push({ Label: e });
      });
      fieldValues.push({
        FieldName: contact.FieldValues[47].FieldName,
        SystemCode: contact.FieldValues[47].SystemCode,
        Value: formattedArr,
      });
    }
    if (newOrganization !== "") {
      changes.Organization = newOrganization;
      fieldValues.push({
        FieldName: "Organization",
        SystemCode: "Organization",
        Value: newOrganization,
      });
    }
    if (newSecondEmail !== "") {
      fieldValues.push({
        FieldName: "Secondary Email Address",
        SystemCode: "custom-15537186",
        Value: newSecondEmail,
      });
    }
    if (newCity !== "") {
      fieldValues.push({
        FieldName: "City",
        SystemCode: "custom-7725699",
        Value: newCity,
      });
    }
    if (newState !== "") {
      fieldValues.push({
        FieldName: "State",
        SystemCode: "custom-7725700",
        Value: newState,
      });
    }
    if (newZip !== "") {
      fieldValues.push({
        FieldName: "ZIP",
        SystemCode: "custom-7725701",
        Value: newZip,
      });
    }
    if (newFacebook !== "") {
      fieldValues.push({
        FieldName: "Facebook Page URL",
        SystemCode: "custom-7725705",
        Value: newFacebook,
      });
    }
    if (newTwitter !== "") {
      fieldValues.push({
        FieldName: "Twitter URL",
        SystemCode: "custom-7725706",
        Value: newTwitter,
      });
    }
    if (newYoutube !== "") {
      fieldValues.push({
        FieldName: "You Tube URL",
        SystemCode: "custom-14543949",
        Value: newYoutube,
      });
    }
    if (newHouzz !== "") {
      fieldValues.push({
        FieldName: "Houzz URL",
        SystemCode: "custom-14543948",
        Value: newHouzz,
      });
    }
    if (newInstagram !== "") {
      fieldValues.push({
        FieldName: "Instagram URL",
        SystemCode: "custom-14543950",
        Value: newInstagram,
      });
    }
    if (newMemberSince !== "") {
      fieldValues.push({
        FieldName: "Member of GFW Builders Assocition Since",
        SystemCode: "custom-14571711",
        Value: newMemberSince,
      });
    }
    if (newEmployees !== "") {
      fieldValues.push({
        FieldName: "Total Paid Employees",
        SystemCode: "custom-7725696",
        Value: newEmployees,
      });
    }
    if (newReferredBy !== "") {
      fieldValues.push({
        FieldName:
          "If a member referred you to the association please list their name and company",
        SystemCode: "custom-7725711",
        Value: newReferredBy,
      });
    }
    if (fieldValues[0]) {
      changes.FieldValues = fieldValues;
    }
    if (newLogoFile !== "") {
      try {
        // Send base64Image to the server
        console.log(params.id, newLogoFile);
        let imgResponse = await axios.post(`/api/cron/update`, {
          contactID: params.id,
          contactUrl: contact.Url,
          image: newLogoBase,
          file: newLogoFile,
        });
        const imgJson = await imgResponse.data;
        console.log(imgJson);
        // setTempImg(imgJson)
        //setLogo(`${imageServer}/contacts-image/${imgJson.newImg}`)
        // localStorage.setItem("GFWBATEMP", JSON.stringify({ tempImg: imgJson.newImg }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    let response = await fetch("/api/user/userInfo", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token, changes, id: contact.Id, loggedId: Id }),
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      console.log("response not ok");
    }
    if (response.ok) {
      // console.log(json)
      setUpdating(false);
      setNewFName("");
      setNewLName("");
      setNewEmail("");
      setNewPassword("");
      const { accounts, critChange, token } = json;
      const {
        Id,
        DisplayName,
        Email,
        FirstName,
        LastName,
        IsAccountAdministrator,
        MembershipLevel,
        Status,
      } = accounts;
      setContact(accounts);
      const contact = {
        Id,
        DisplayName,
        Email,
        FirstName,
        LastName,
        IsAccountAdministrator,
        MembershipLevel: MembershipLevel.Name,
        Status,
        token,
      };
      // console.log(contact)
      localStorage.setItem("GFWBAUSER", JSON.stringify(contact));
      if (critChange) {
        // remove localStorage and redirect to a log back in page
        localStorage.removeItem("GFWBAUSER");
      }
      // window.location.reload()
    }
  };
  const handleImageUpload = (event) => {
    var errorMessage = document.getElementById("error-message");
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    // Check file type
    var allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      errorMessage.textContent = "Only PNG or JPG files are allowed.";
      event.preventDefault();
      return;
    }

    // Check file size
    var maxSize = 10 * 1024 * 1024; // 10 MB in bytes
    if (file.size > maxSize) {
      errorMessage.textContent = "File size exceeds the maximum limit of 10MB.";
      event.preventDefault();
      return;
    }

    // Clear error message if everything is okay
    errorMessage.textContent = "";

    reader.onloadend = () => {
      setNewLogoBase(reader.result);
      setNewLogoFile(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const updateImage = async () => {
    try {
      // Send base64Image to the server
      await axios.post(`${imageServer}/contact/update`, {
        contactID: params.id,
        image: newLogoBase,
      });
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  function cancelUpdate() {
    setUpdating(false);
  }
  const sendEmail = async (e) => {
    e.preventDefault();
    let sender = {
      subject: emailSubject,
      body: emailBody,
      ReplyToAddress: emailReplyToAddress,
      ReplyToName: emailReplyToName,
    };
    let recipient = {
      Id: contact.Id,
      Name: contact.DisplayName,
      Email: contact.Email,
    };
    let response = await fetch("/api/sendEmail", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ sender, recipient }),
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      console.log("response not ok");
    }
    if (response.ok) {
      setEmailSubject("");
      setEmailBody("");
      setEmailReplyToAddress("");
      setEmailReplyToName("");
      setSendingEmail(false);
    }
  };

  useEffect(() => {
    // if (contact === "") {
    fetchContact();
    if (localStorage.getItem("GFWBAUSER")) {
      updateLoggedStatus(true);
    }
    // }
  }, []);

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
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />

      {/* TODO: Style the Update Form */}
      {updating ? (
        <div className="form-main justify-center">
          <div className="my-10 border-[#102647] border-2 p-10 rounded-3xl">
            <h3 className="font-light text-3xl">Update Profile</h3>
            {/* {console.log(contact)} */}
            <form onSubmit={handleSubmit}>
              <div className="text-xl font-light mb-6">
                <label className="form-label" for="First Name">
                  First Name
                </label>
                <input
                  className="hi form-input"
                  type="text"
                  placeholder={contact.FirstName}
                  value={newFName}
                  onChange={(e) => {
                    setNewFName(e.target.value);
                  }}
                />
              </div>
              <div className="text-xl font-light mb-6">
                <label className="form-label" for="Last Name">
                  Last Name
                </label>
                <input
                  className="hi form-input"
                  type="text"
                  placeholder={contact.LastName}
                  value={newLName}
                  onChange={(e) => {
                    setNewLName(e.target.value);
                  }}
                />
              </div>
              <div className="text-xl font-light mb-6">
                <label className="form-label" for="Email">
                  Email
                </label>
                <input
                  className="hi form-input"
                  type="text"
                  placeholder={contact.Email}
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                  }}
                />
              </div>
              {/* <label for='Password'>Password</label>
                        <input
                            className='hi'
                            type="text"
                            placeholder="Password"
                            value={newPassword}
                            onChange={(e) => { setNewPassword(e.target.value) }}
                        /> */}
              <div className="text-xl font-light mb-4">
                <label htmlFor="Organization">Organization</label>
                <input
                  className="hi w-[500px] text-base pl-2"
                  type="text"
                  placeholder={contact.Organization}
                  value={newOrganization}
                  onChange={(e) => {
                    setNewOrganization(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-row gap-8 text-xl font-light mb-4">
                <div className="text-xl font-light mb-4 w-full">
                  <label htmlFor="Office Phone">Office Phone</label>
                  <input
                    className="hi w-[300px] text-base pl-2"
                    type="phone"
                    placeholder={contact.Phone}
                    value={newOfficePhone}
                    onChange={(e) => {
                      setNewOfficePhone(e.target.value);
                    }}
                  />
                </div>
                <div className="text-xl font-light mb-4 w-full">
                  <label htmlFor="Title">Title</label>
                  <input
                    className="hi w-[300px] text-base pl-2"
                    type="text"
                    placeholder={contact.FieldValues[39].Value}
                    value={newTitle}
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-8 text-xl font-light mb-4">
                <div className="text-xl font-light mb-4">
                  <label htmlFor="Cell Phone">Cell Phone</label>
                  <input
                    className="hi w-[300px] text-base pl-2"
                    type="text"
                    placeholder={contact.FieldValues[40].Value}
                    value={newCell}
                    onChange={(e) => {
                      setNewCell(e.target.value);
                    }}
                  />
                </div>
                <div className="text-xl font-light mb-4 w-full">
                  <label htmlFor="Fax">Fax</label>
                  <input
                    className="hi w-[300px] text-base pl-2"
                    type="text"
                    placeholder={contact.FieldValues[41].Value}
                    value={newFax}
                    onChange={(e) => {
                      setNewFax(e.target.value);
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
                  placeholder={contact.FieldValues[42].Value}
                  value={newSecondEmail}
                  onChange={(e) => {
                    setNewSecondEmail(e.target.value);
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
                    placeholder={contact.FieldValues[43].Value}
                    value={newAddress}
                    onChange={(e) => {
                      setNewAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="text-xl font-light mb-4">
                  <label htmlFor="City">City</label>
                  <input
                    className="hi w-[300px] text-base pl-2"
                    type="text"
                    placeholder={contact.FieldValues[44].Value}
                    value={newCity}
                    onChange={(e) => {
                      setNewCity(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-8 text-xl font-light mb-4">
                <div className="text-xl font-light mb-4">
                  <label htmlFor="State">State</label>
                  <input
                    className="hi w-[300px] text-base pl-2"
                    type="text"
                    placeholder={contact.FieldValues[45].Value}
                    value={newState}
                    onChange={(e) => {
                      setNewState(e.target.value);
                    }}
                  />
                </div>
                <div className="text-xl font-light mb-4">
                  <label htmlFor="ZIP">ZIP</label>
                  <input
                    className="hi w-[300px] text-base pl-2"
                    type="text"
                    placeholder={contact.FieldValues[46].Value}
                    value={newZip}
                    onChange={(e) => {
                      setNewZip(e.target.value);
                    }}
                  />
                </div>
              </div>
              <label className="text-xl mb-3" htmlFor="Classifications">
                Classifications{" "}
                <span className="text-base">(Choose all that apply.)</span>
              </label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {classifications.map((c) => (
                  <div key={c.name}>
                    {/* {categoriesArr.includes(c.name) ?
                      <div className="flex">
                        <input
                          type="checkbox"
                          id={c.name}
                          name={c.name}
                          value={c.name}
                          checked={categoriesArr.includes(c.name)}
                        />
                        <label className="pl-2">{c.name}</label>
                      </div>
                      :
                      <div className="flex">
                        <input
                          type="checkbox"
                          id={c.name}
                          name={c.name}
                          value={c.name}
                        />
                        <label className="pl-2">{c.name}</label>
                      </div>} */}
                    <div className="flex">
                      <input
                        type="checkbox"
                        id={c.name}
                        name={c.name}
                        value={c.name}
                        // checked={categoriesArr.includes(c.name)}
                        checked={checkboxes.includes(c.name)}
                        onChange={() => handleCheckboxChange(c.name)}
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
                  placeholder={contact.FieldValues[48].Value}
                  value={newWebsite}
                  onChange={(e) => {
                    setNewWebsite(e.target.value);
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
                value={newReferredBy}
                onChange={(e) => {
                  setNewReferredBy(e.target.value);
                }}
                rows="2"
                cols="50"
                placeholder={contact.FieldValues[51].Value}
              ></textarea>
              <p className="text-xs mt-1">
                If someone invited you to join the GFWBA, please list their
                name. If no one referred you please enter NA
              </p>

              {/* Social Media Links */}
              <div className="flex flex-row gap-8 text-xl font-light">
                <div className="text-xl font-light mb-4">
                  <label htmlFor="Facebook Page URL">Facebook Page URL</label>
                  <input
                    className="hi w-[300px] text-base pl-2"
                    type="text"
                    placeholder={contact.FieldValues[53].Value}
                    value={newFacebook}
                    onChange={(e) => {
                      setNewFacebook(e.target.value);
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
                    placeholder={contact.FieldValues[54].Value}
                    value={newTwitter}
                    onChange={(e) => {
                      setNewTwitter(e.target.value);
                    }}
                  />
                  <p className="text-xs mt-1">The URL to your Twitter page.</p>
                </div>
                <div className="text-xl font-light mb-4">
                  <label htmlFor="Houzz URL">Houzz URL</label>
                  <input
                    className="hi w-[300px] text-base pl-2"
                    type="text"
                    placeholder={contact.FieldValues[55].Value}
                    value={newHouzz}
                    onChange={(e) => {
                      setNewHouzz(e.target.value);
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
                    placeholder={contact.FieldValues[56].Value}
                    value={newYoutube}
                    onChange={(e) => {
                      setNewYoutube(e.target.value);
                    }}
                  />
                  <p className="text-xs mt-1">The URL to your YouTube page</p>
                </div>
                <div className="text-xl font-light mb-4">
                  <label htmlFor="Instagram URL">Instagram URL</label>
                  <input
                    className="hi w-[300px] text-base pl-2"
                    type="text"
                    placeholder={contact.FieldValues[57].Value}
                    value={newInstagram}
                    onChange={(e) => {
                      setNewInstagram(e.target.value);
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
                  placeholder={contact.FieldValues[58].Value}
                  value={newMemberSince}
                  onChange={(e) => {
                    setNewMemberSince(e.target.value);
                  }}
                />
              </div>
              <div className="text-xl font-light mb-4">
                <label htmlFor="Total Paid Employees">
                  Total Paid Employees
                </label>
                <input
                  className="hi w-[300px] text-base pl-2"
                  type="text"
                  placeholder={contact.FieldValues[60].Value}
                  value={newEmployees}
                  onChange={(e) => {
                    setNewEmployees(e.target.value);
                  }}
                />
                <div>
                  <label htmlFor="imageUpload">Upload Image</label>
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                  />
                  <span id="error-message" className="text-red"></span>
                </div>
              </div>
              <div className="flex gap-4">
                <input
                  className="cursor-pointer bg-[#102647] text-white text-xl uppercase mt-10 py-2 px-10"
                  type="submit"
                />
                <button
                  className="cursor-pointer text-[#102647] text-xl uppercase mt-10 py-2 px-10 border-2 border-[#102647] border-solid"
                  onClick={cancelUpdate}
                >
                  Cancel
                </button>
              </div>
            </form>
            {/* <p>{contact.DisplayName}</p>
                    <p>{contact.Email}</p>
                    <p>{contact.FirstName}</p>
                    <p>{contact.LastName}</p> */}
            {/* <p>Membership Status: {contact.Status}</p> */}
            {/* <p></p> */}
          </div>
        </div>
      ) : (
        <>
          <ProfileSection
            profMainName={contact.DisplayName}
            profMainComp={contact.Organization}
            profTitle={title}
            profOrganization={contact.Organization}
            profAddress={address}
            profOffice={office}
            profCell={cell}
            // profEmail={contact.Email}
            // profEmailAddress={{ href: `mailto:${contact.Email}` }}
            profWebsite={website}
            profWebsiteAddress={{ href: website, target: "_blank" }}
            profLogo={params.id}
            profCategories={categories}
            profArea={area}
          />
          {params.id == loggedId && (
            <div className="form-main form-margin-top">
              <button
                className="cursor-pointer bg-[#102647] text-white text-xl uppercase mt-10 py-2 px-10"
                onClick={() => setUpdating(true)}
              >
                Update
              </button>
            </div>
          )}
          {/* START MESSAGING APP */}
          {sendingEmail ? (
            <div>
              <div className="form-main">
                <form onSubmit={sendEmail}>
                  <div className="font-light mb-4">
                    <label className="font-light mb-2" for="Reply Name">
                      Name
                    </label>
                    <input
                      className="hi w-[400px] text-base p-2"
                      type="text"
                      // placeholder={contact.FirstName}
                      value={emailReplyToName}
                      onChange={(e) => {
                        setEmailReplyToName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="font-light mb-4">
                    <label className="font-light mb-2" for="Reply Email">
                      Email
                    </label>
                    <input
                      className="hi w-[400px] text-base p-2"
                      type="text"
                      // placeholder={contact.FirstName}
                      value={emailReplyToAddress}
                      onChange={(e) => {
                        setEmailReplyToAddress(e.target.value);
                      }}
                    />
                  </div>
                  <div className="font-light mb-4">
                    <label className="font-light mb-2" for="Subject">
                      Subject
                    </label>
                    <input
                      className="hi w-[400px] text-base p-2"
                      type="text"
                      // placeholder='subject'
                      value={emailSubject}
                      onChange={(e) => {
                        setEmailSubject(e.target.value);
                      }}
                    />
                  </div>
                  <div className="font-light mb-4">
                    <label className="font-light mb-2" for="Body">
                      Message
                    </label>
                    <textarea
                      className="hi w-[400px] text-base p-2"
                      type="text"
                      // placeholder='Email Body'
                      value={emailBody}
                      onChange={(e) => {
                        setEmailBody(e.target.value);
                      }}
                    />
                  </div>

                  <p>reCAPTCHA?</p>
                  <div className="flex gap-4">
                    <input
                      className="cursor-pointer bg-[#102647] text-white text-xl uppercase mt-10 py-2 px-10"
                      type="submit"
                    />
                    <button
                      className="cursor-pointer text-[#102647] border-2 border-[#102647] border-solid text-xl uppercase mt-10 py-2 px-10"
                      onClick={() => setSendingEmail(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="ml-auto mr-auto flex w-full max-w-[1600px]">
              <button
                className="cursor-pointer bg-[#102647] text-white text-xl uppercase mt-10 py-2 px-10 btn-res-padding"
                onClick={() => setSendingEmail(true)}
              >
                MESSAGE MEMBER
              </button>
            </div>
          )}
          {/* END MESSAGING APP */}
        </>
      )}
    </main>
  );
}
