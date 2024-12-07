"use client";

import { FormEvent, useState } from "react";
import { NEXT_PUBLIC_BACKEND_SERVER } from "@/app/network/util";
import Sidebar from "@/app/components/side_bar";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_BACKEND_SERVER}/user/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        // Show success message if the request was successful
        setPopupMessage("Password reset link has been sent to your email.");
      } else {
        // Show error message if the request failed
        const errorData = await response.json();
        setPopupMessage(errorData.error || "Failed to send reset link.");
      }
    } catch (error) {
      // Handle any network or unexpected errors
      setPopupMessage("An error occurred. Please try again later.");
    }

    setPopupVisible(true); // Show the popup
  }

  function closePopup() {
    setPopupVisible(false);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="fixed left-0 top-0">
        <Sidebar />
      </div>
      <div className="flex flex-col p-8 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
        <h1 className="text-3xl font-serif mb-4">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Send Reset Link
          </button>
          <a
            href="/user/login"
            className="text-blue-500 hover:underline text-sm self-start"
          >
            Back to Login
          </a>
        </form>
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
    </div>
  );
}
