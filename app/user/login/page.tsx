"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_BACKEND_SERVER  } from "@/app/network/util";

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const response = await fetch(NEXT_PUBLIC_BACKEND_SERVER  + "/user/login", {
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
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
