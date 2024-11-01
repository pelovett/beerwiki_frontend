"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_BACKEND_SERVER } from "@/app/network/util";
import Sidebar from "@/app/components/side_bar";
import TopBar from "@/app/components/top_bar";

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(NEXT_PUBLIC_BACKEND_SERVER + "/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // Important for including cookies
    });

    if (response.ok) {
      console.log("good");
    } else {
      console.error(response);
      console.log;
    }
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
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Login
            </button>
            <a
              href="/user/create_user"
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 inline-block text-center"
            >
              Create User
            </a>
          </form>
        </div>
      </div>
    </>
  );
}
