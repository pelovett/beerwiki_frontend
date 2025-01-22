export function VerifyUserClient(window: Window): boolean {
  const authCookie = window.document.cookie
    .split(";")
    .find((cookie) => cookie.startsWith("login_cookie"))
    ?.split("=")[1];

  return !!authCookie;
}
