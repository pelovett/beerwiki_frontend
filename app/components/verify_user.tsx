import { cookies } from "next/headers";
import { NEXT_PUBLIC_BACKEND_SERVER } from "../network/util";

export default async function VerifyUser(): Promise<Boolean> {
  const authCookie = cookies().get("login_cookie");
  if (!authCookie || !authCookie?.value) {
    return false;
  }

  console.log(NEXT_PUBLIC_BACKEND_SERVER);
  const response = await fetch(NEXT_PUBLIC_BACKEND_SERVER + "/user/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: authCookie.value },
  });

  console.log(response);
  if (response.ok) {
    return true;
  } else {
    return false;
  }
}
