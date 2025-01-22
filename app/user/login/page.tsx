"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_BACKEND_SERVER } from "@/app/utils/network/util";
import Sidebar from "@/app/components/side_bar";
import TopBar from "@/app/components/top_bar";
import { VerifyUserClient } from "@/app/utils/network/verify_user_client";

export default function LoginPage() {
  const router = useRouter();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Check if we're already logged in
  useEffect(() => {
    if (VerifyUserClient(window)) {
      window.location.href = "/user/profile";
    }
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    fetch(NEXT_PUBLIC_BACKEND_SERVER + "/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Important for including cookies
    })
      .catch((err) => {
        console.log(err);
        setPopupMessage(`Error: Could Not Contact Server`); // Set the message to display the error
        setPopupVisible(true);
      })
      .then((response) => {
        if (response?.ok) {
          setTimeout(() => {
            router.push("/user/profile");
          }, 200);
        } else {
          console.error(response);
          if (response) {
            response
              .json()
              .then((errorResponse) => {
                console.log("Error Response:", errorResponse); // Log the entire error response for debugging

                // Access the error message and set it for the popup
                setPopupMessage(`Error: ${errorResponse.error}`); // Set the message to display the error
                setPopupVisible(true);
              })
              .catch((err) => {
                console.log(err);
                setPopupMessage(`Error: Internal Server Error`); // Set the message to display the error
                setPopupVisible(true);
              });
          }
        }
      });
  }

  function closePopup() {
    setPopupVisible(false);
  }

  return (
    <>
      <TopBar />
      <div className="relative min-h-screen flex items-center justify-center mb-[9.5rem] sm:mb-0">
        <div className="fixed left-0 top-0">
          <Sidebar />
        </div>
        <div className="flex flex-col p-8 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
          <h1 className="text-3xl font-serif mb-4">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <a
              href="/user/forgot-password"
              className="text-blue-500 hover:underline text-sm self-start"
            >
              Forgot password?
            </a>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Login
            </button>
            <a
              href="/user/create-user"
              className="p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 inline-block text-center"
            >
              Create User
            </a>
          </form>
        </div>
      </div>
      {/* Popup */}
      {popupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p>{popupMessage}</p>
            <button
              onClick={closePopup}
              className="mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
