// components/logout_buttom.js

"use client"; // Mark this component as a client-side component

import { useState } from "react";
import { NEXT_PUBLIC_BACKEND_SERVER } from "../network/util";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch(
        NEXT_PUBLIC_BACKEND_SERVER + "/user/logout-user",
        {
          method: "GET", // Assuming the logout endpoint uses GET, or use POST if needed
          credentials: "include", // Ensure the cookie is sent with the request
        }
      );

      if (response.ok) {
        // Redirect to the login page after successful logout
        window.location.href = "/"; // Redirect to login page
      } else {
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
