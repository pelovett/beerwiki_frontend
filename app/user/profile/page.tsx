import Sidebar from "@/app/components/side_bar";
import VerifyUser from "@/app/components/verify_user";
import LogoutButton from "@/app/components/logout_button";

export default async function Home() {
  const userVerified = await VerifyUser(); // Fetch user verification status

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="fixed left-0 top-0">
        <Sidebar />
      </div>

      {/* Conditionally render LogoutButton if userVerified is true */}
      {userVerified && <LogoutButton />}
    </div>
  );
}
