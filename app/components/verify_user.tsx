import { cookies } from "next/headers";

export default async function VerifyUser(): Promise<Boolean> {
  const authCookie = cookies().get("login_cookie");
  if (authCookie?.value != "") {
    const response = await fetch("http://localhost:8888/user/verify", {
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
