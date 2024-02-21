"use client";

import Marq from "@/components/Marquee";
import { DevLinkProvider, Navbar, Footer } from "@/devlink";
import { LoggedStatusProvider } from "@/context/LoggedStatusProvider";
import NavLog from "@/components/NavLog";

import "./globals.css";
import "@/devlink/global.css";

export const metadata = {
  authors: [
    {
      name: "Farside Web Development",
      url: "https://farsidedev.com",
    },
    {
      name: "Greater Fort Worth Builders Association",
      url: "https://gfwbatx.com",
    },
  ],
};

export default function RootLayout({ children }) {
  // console.log(loggedStatus)
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat&display=swap"
        />
      </head>
      <body>
        <LoggedStatusProvider>
          <DevLinkProvider>
            <Navbar
              navHome={{ href: "/" }}
              navDirectory={{ href: "/directory" }}
              navLogin={{ href: "/login" }}
              navMembership={{ href: "/membership" }}
              navContact={{ href: "/contact" }}
              loginLogout={<NavLog />}
            />
            <Marq />

            {children}

            <Footer
              footerInsta={{
                href: "https://www.instagram.com/greaterfwbuildersassociation/",
                target: "_blank",
              }}
              footerFacebook={{
                href: "https://www.facebook.com/GFWBA",
                target: "_blank",
              }}
              footerX={{
                href: "https://twitter.com/i/flow/login?redirect_after_login=%2FFWBuildersAssoc",
                target: "_blank",
              }}
              footerLinkedIn={{
                href: "https://www.linkedin.com/company/greater-fort-worth-builders-association/",
                target: "_blank",
              }}
            />
          </DevLinkProvider>
        </LoggedStatusProvider>
      </body>
    </html>
  );
}
