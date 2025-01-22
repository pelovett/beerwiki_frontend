"use client";

import { useEffect, useState } from "react";

import Sidebar from "@/app/components/side_bar";
import { VerifyUserClient } from "@/app/utils/network/verify_user_client";
import LogoutButton from "@/app/components/logout_button";

export default function Home() {
  const [userVerified, setUserVerified] = useState(false);
  useEffect(() => {
    setUserVerified(VerifyUserClient(window));
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="fixed left-0 top-0">
        <Sidebar />
      </div>

      {/* Conditionally render LogoutButton if userVerified is true */}
      {userVerified && <LogoutButton />}
    </div>
  );
}
