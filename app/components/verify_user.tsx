import { cookies } from "next/headers";
import { NEXT_PUBLIC_BACKEND_SERVER } from "../network/util";

export default async function VerifyUser(): Promise<Boolean> {
  const authCookie = cookies().get("login_cookie");
  if (!authCookie || !authCookie?.value) {
    return false;
  }

  const response = await fetch(NEXT_PUBLIC_BACKEND_SERVER + "/user/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `login_cookie=${authCookie.value}`,
    },
    credentials: "include",
  });

  return response.ok;
}
