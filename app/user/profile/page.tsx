// app/user/profile/page.tsx
import VerifyUser from "@/app/components/verify_user";
import { redirect } from "next/navigation";

export default async function Home() {
  const userVerified = await VerifyUser();
  return (
    <main style={{ height: "100%" }}>
      <div>Verified</div>
    </main>
  );
}
