"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NEXT_PUBLIC_BACKEND_SERVER } from "@/app/network/util";
import Sidebar from "@/app/components/side_bar";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");

    const confirmationCode = searchParams.get("code");

    if (!confirmationCode) {
      setPopupMessage("Your Password Has Been Changed");
      setPopupVisible(true);
      return;
    }

    const response = await fetch(
      NEXT_PUBLIC_BACKEND_SERVER + "/user/change-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          code: confirmationCode,
        }),
      }
    );

    if (response.ok) {
      setPopupMessage("Your Password Has Been Changed");
      setPopupVisible(true);
    } else {
      const errorResponse = await response.json(); // Parse the error response as JSON
      console.log("Error Response:", errorResponse); // Log the entire error response for debugging

      // Access the error message and set it for the popup
      setPopupMessage(`${errorResponse.error}`); // Set the message to display the error
      setPopupVisible(true);
    }
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
        <h1 className="text-3xl font-serif mb-4">Change Password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="relative">
            {" "}
            {/* Add this div to wrap the password input and tooltip */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-2 border border-gray-300 rounded-md peer w-full"
              required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
              title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*)."
            />
            <div className="absolute hidden peer-focus:flex w-full flex-col mt-1 p-2 bg-gray-100 border border-gray-300 rounded-md text-base text-gray-600 left-0">
              <ul className="list-none leading-relaxed">
                {/** Map through the list items for better readability and scalability */}
                {[
                  "At least 8 characters long",
                  "At least one uppercase letter (A-Z)",
                  "At least one lowercase letter (a-z)",
                  "At least one number (0-9)",
                  "At least one special character (!@#$%^&*)",
                ].map((item, index) => (
                  <li
                    key={index}
                    style={{ position: "relative", paddingLeft: "30px" }}
                  >
                    <span
                      style={{
                        content: '""',
                        display: "inline-block",
                        backgroundImage: "url(/hopBulletPoint.png)", // Our custom bullet point image
                        backgroundSize: "20px 20px",
                        backgroundRepeat: "no-repeat",
                        width: "20px",
                        height: "20px",
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Change Password
          </button>
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
