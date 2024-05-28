import VerifyUser from "@/app/components/verify_user";
import Message from "@/app/components/verify_user";
import React from "react";

export default async function Home() {
  console.log("good");

  const userVerified = await VerifyUser();

  return (
    <main style={{ height: "100%" }}>
      {userVerified ? <div>verified</div> : <div>Unverified</div>}
    </main>
  );
}
