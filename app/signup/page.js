import React from "react";
import { InnerHero, JoinGfwbaSection } from "@/devlink";
import SignupForm from "../../components/SingupForm";

function signup() {
  return (
    <main>
      <InnerHero
        heroDirectory={{ href: "/directory" }}
        heroJoin={{ href: "/" }}
      />
      <JoinGfwbaSection joinFormSlot={<SignupForm />} />
    </main>
  );
}

export default signup;
