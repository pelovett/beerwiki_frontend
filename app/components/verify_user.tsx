import { cookies } from "next/headers";
import { NEXT_PUBLIC_BACKEND_SERVER } from "../network/util";
import { redirect } from "next/navigation";

export default async function VerifyUser(): Promise<Boolean> {
  const authCookie = cookies().get("login_cookie");

  if (!authCookie || !authCookie.value) {
    redirect("/user/login"); // Redirect if the auth cookie is missing
  }

  const response = await fetch(NEXT_PUBLIC_BACKEND_SERVER + "/user/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `login_cookie=${authCookie.value}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    redirect("/user/login"); // Redirect if verification fails
  }

  return response.ok;
}
