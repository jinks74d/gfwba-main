"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoggedStatus } from "@/context/LoggedStatusProvider";

export default function Login() {
  const { loggedStatus, updateLoggedStatus } = useLoggedStatus();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("Sending");
    let data = {
      username,
      password,
    };
    // console.log(data, JSON.stringify(data));

    let response = await fetch("/api/user/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();
    if (!response.ok) {
      // console.log(json);
      if (json.error_description == "No account can be accessed with specified credentials.") {
        setError(`${json.error_description} Your email and/or password may be incorrect.`);
      } else {
        setError(json.error_description);
      }
      // console.log("response not ok");
    }
    if (response.ok) {
      // console.log('response ok')
      const { accounts, token } = json;
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
      // console.log(json);
      setUsername("");
      setPassword("");
      if (Status == "Active") {
        setLoggedUser(DisplayName);
        setError(null);
        setSubmitted(true);
        const profile = {
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
        localStorage.setItem("GFWBAUSER", JSON.stringify(profile));
        updateLoggedStatus(true);
        router.push(`/profile/${Id}`);
      } else {
        setError(
          `Your current status is ${Status}. Please contact GFWBA for support. If you are renewing, please use the payment link provided in your invoice.`
        );
        setDisabled(true);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col justify-center items-center py-20">
        <div className="p-10 border-2 rounded-2xl border-[#102647]">
          <h1 className="text-6xl">LOGIN</h1>
          {!submitted ? (
            <div>
              <form onSubmit={handleSubmit} className="p-4">
                <label className="text-base font-light">Username</label>
                <input
                  className="p-2"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <label className="text-base font-light mt-4">Password</label>
                <input
                  className="p-2"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <div></div>
                {disabled ? (
                  <input disable type="submit" />
                ) : (
                  <input
                    className="cursor-pointer bg-[#102647] text-white text-xl uppercase mt-10 py-2 px-10"
                    type="submit"
                  />
                )}
              </form>
              <a className="cursor-pointer text-[#102647] p-4" href="https://gfwba38.wildapricot.org/Sys/ResetPasswordRequest" target="_blank">Forgot Password?</a>
            </div>
          ) : (
            <h2>{loggedUser}</h2>
          )}
          {error}
        </div>
      </main>
    </>
  );
}
