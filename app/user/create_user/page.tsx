"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_BACKEND_SERVER } from "@/app/network/util";
import Sidebar from "@/app/components/side_bar";
import TopBar from "@/app/components/top_bar";

export default function LoginPage() {
  const router = useRouter();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const createdAt = new Date().toISOString(); // ISO format

    const response = await fetch(
      NEXT_PUBLIC_BACKEND_SERVER + "/user/create-account",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          username,
          password,
          created_at: createdAt,
        }),
        credentials: "include", // Important for including cookies
      }
    );

    if (response.ok) {
      setPopupMessage("A confirmation link has been sent to you email");
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
    <>
      <TopBar />
      <div
        className={
          "relative h-full sm:min-h-screen flex items-center" +
          " justify-center mb-[9.5rem] sm:mb-0"
        }
      >
        <div className="fixed left-0 top-0">
          <Sidebar />
        </div>
        <div className="flex flex-col p-8 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
          <h1 className="text-3xl font-serif mb-4">Create Account</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="username"
              name="username"
              placeholder="Username"
              className="p-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-2 border border-gray-300 rounded-md"
              required
            />
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
              Create Account
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
    </>
  );
}
