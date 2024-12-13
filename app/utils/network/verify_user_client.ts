import { NEXT_PUBLIC_BACKEND_SERVER } from "./util";

export async function VerifyUserClient(doc: Document): Promise<Boolean> {
  const authCookie = doc.cookie
    .split(";")
    .find((cookie) => cookie.startsWith("login_cookie"))
    ?.split("=")[1];

  if (!authCookie) {
    window.location.href = "/user/login"; // Redirect if the auth cookie is missing
  }

  const response = await fetch(NEXT_PUBLIC_BACKEND_SERVER + "/user/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `login_cookie=${authCookie}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    window.location.href = "/user/login"; // Redirect if verification fails
  }

  return response.ok;
}
