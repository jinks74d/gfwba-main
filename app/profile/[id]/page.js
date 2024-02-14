"use client";
import { InnerHero, ProfileSection } from "@/devlink";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLoggedStatus } from "@/context/LoggedStatusProvider";

export default function Profile({ imageData }) {
  // const { query } = useRouter()
  const router = useRouter();
  const params = useParams();
  // console.log(params)
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [office, setOffice] = useState("");
  const [cell, setCell] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState("");
  const [categories, setCategories] = useState("");
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

  const fetchContact = async () => {
    if (localStorage.getItem("GFWBAUSER")) {
      var { Id, DisplayName, Email } = JSON.parse(
        localStorage.getItem("GFWBAUSER")
      );
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
      setAddress(
        ` ${json.FieldValues[43].Value}, ${json.FieldValues[44].Value}, ${json.FieldValues[45].Value} ${json.FieldValues[46].Value}`
      );
      setTitle(` ${json.FieldValues[39].Value}`);
      setOffice(` ${json.FieldValues[25].Value}`);
      setCell(` ${json.FieldValues[40].Value}`);
      setWebsite(` ${json.FieldValues[48].Value}`);
      // let imageData = json.FieldValues[49].Value.Url.blob()
      // const imageUrl = URL.createObjectURL(imageData);
      // console.log(json.profLogo)
      // const logoUrl = URL.createObjectURL(json.profLogo);
      // console.log(logoUrl)
      // setLogo(logoUrl)
      let categoryArr = [];
      let cat = json.FieldValues[47];
      if (typeof cat == "object") {
        Object.keys(cat.Value).forEach(function (key, index) {
          if (categoryArr.indexOf(cat.Value[key].Label) == -1) {
            if (index > 0) {
              categoryArr.push(`, ${cat.Value[key].Label}`);
            } else {
              categoryArr.push(cat.Value[key].Label);
            }
          }
        });
        setCategories(categoryArr);
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
    if (contact === "") {
      fetchContact();
      if (localStorage.getItem("GFWBAUSER")) {
        updateLoggedStatus(true);
      }
    }
  });

  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/signup" }}
      />

      {/* TODO: Style the Update Form */}
      {updating ? (
        <div>
          <h3>Update</h3>
          {/* {console.log(contact)} */}
          <form onSubmit={handleSubmit}>
            <div className="text-xl font-light mb-6">
              <label for="First Name">First Name</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder={contact.FirstName}
                value={newFName}
                onChange={(e) => {
                  setNewFName(e.target.value);
                }}
              />
            </div>
            <div className="text-xl font-light mb-6">
              <label for="Last Name">Last Name</label>
              <input
                className="hi w-[300px] text-base pl-2"
                type="text"
                placeholder={contact.LastName}
                value={newLName}
                onChange={(e) => {
                  setNewLName(e.target.value);
                }}
              />
            </div>
            <div className="text-xl font-light mb-6">
              <label for="Email">Email</label>
              <input
                className="hi w-[300px] text-base pl-2"
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
            <div></div>
            <input
              className="cursor-pointer bg-[#102647] text-white text-xl uppercase mt-10 py-2 px-10"
              type="submit"
            />
          </form>
          {/* <p>{contact.DisplayName}</p>
                    <p>{contact.Email}</p>
                    <p>{contact.FirstName}</p>
                    <p>{contact.LastName}</p> */}
          {/* <p>Membership Status: {contact.Status}</p> */}
          {/* <p></p> */}
          <button
            className="cursor-pointer bg-[#102647] text-white text-xl uppercase mt-10 py-2 px-10"
            onClick={cancelUpdate}
          >
            Cancel
          </button>
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
            profLogo={logo}
            profCategories={categories}
            profArea={area}
          />
          {params.id == loggedId && (
            <button
              className="cursor-pointer bg-[#102647] text-white text-xl uppercase mt-10 py-2 px-10"
              onClick={() => setUpdating(true)}
            >
              Update
            </button>
          )}
          {/* START MESSAGING APP */}
          {sendingEmail ? (
            <div className="flex mt-10 text-base">
              <div className="w-full max-w-[1600px] ml-auto mr-auto">
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
                className="cursor-pointer bg-[#102647] text-white text-xl uppercase mt-10 py-2 px-10"
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
