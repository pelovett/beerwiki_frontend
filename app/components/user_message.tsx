import {cookies} from "next/headers";

export default function Message() {
    const viewedWelcomeMessage = cookies().get("login_cookie")
    if (viewedWelcomeMessage?.value === "true") {
        return <div>Welcome back!</div>
    }

    return <div>Profile</div>
}
