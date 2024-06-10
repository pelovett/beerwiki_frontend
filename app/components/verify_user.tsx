import { cookies } from "next/headers";
import { NEXT_PUBLIC_BACKEND_SERVER  } from "../network/util";

export default async function VerifyUser(): Promise<Boolean> {
  const authCookie = cookies().get("login_cookie");
  if (authCookie?.value != "") {
    console.log(NEXT_PUBLIC_BACKEND_SERVER )
    const response = await fetch(NEXT_PUBLIC_BACKEND_SERVER  + "/user/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tokenString: authCookie?.value }),
    });

    console.log(response);
    if (response.ok) {
      console.log("good");
      return true;
    } else {
      console.error(response);
      console.log;
      return false;
    }
  }
  console.log("Invalid tokenString");
  return false;
}
