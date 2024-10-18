"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { NEXT_PUBLIC_BACKEND_SERVER } from "@/app/network/util"; // Ensure your backend URL is set here
import Sidebar from "@/app/components/side_bar";

function ConfirmUserContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Extract the confirmation code from the URL
    const confirmationCode = searchParams.get("code");

    if (!confirmationCode) {
      setMessage("Confirmation code not found.");
      setLoading(false);
      return;
    }

    // Send the code to the backend for validation
    const confirmUser = async () => {
      try {
        const response = fetch(
          `${NEXT_PUBLIC_BACKEND_SERVER}/user/confirmation`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code: confirmationCode }), // Make sure confirmationCode is a string
          }
        );

        if ((await response).ok) {
          const result = await (await response).text();
          setMessage(result); // Display the success message
        } else {
          setMessage("Invalid confirmation code.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    confirmUser();
  }, [searchParams]);

  return (
    <div className="confirmation-container">
      <h1>Email Confirmation</h1>
      {loading ? <p>Loading...</p> : <p>{message}</p>}
    </div>
  );
}

export default function ConfirmUserPage() {
  return (
    <div>
      <Sidebar />
      <Suspense>
        <ConfirmUserContent />
      </Suspense>
    </div>
  );
}
