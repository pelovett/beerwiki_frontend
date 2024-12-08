"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { NEXT_PUBLIC_BACKEND_SERVER } from "@/app/utils/network/util";
import Sidebar from "@/app/components/side_bar";

function ConfirmUserBody() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const confirmationCode = searchParams.get("code");

    if (!confirmationCode) {
      setMessage("Confirmation code not found.");
      setLoading(false);
      return;
    }

    const confirmUser = async () => {
      try {
        const response = await fetch(
          `${NEXT_PUBLIC_BACKEND_SERVER}/user/confirmation`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code: confirmationCode }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          setMessage(result.message || "Email confirmed successfully!");

          setTimeout(() => {
            router.push("/user/profile");
          }, 2000);
        } else {
          setMessage("Invalid confirmation code.");
        }
      } catch (error) {
        console.error("Error confirming user:", error);
        setMessage("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    confirmUser(); // Correct function call
  }, [searchParams]);

  return (
    <div className="flex flex-row max-w-[99.75rem] mt-12">
      <Sidebar />
      <div className="flex-grow flex items-center justify-center min-h-screen bg-gray-50">
        <div className="confirmation-container max-w-sm w-full bg-white shadow-lg rounded-lg p-4">
          <h1 className="text-2xl font-semibold text-center mb-4">
            Email Confirmation
          </h1>
          {loading ? (
            <div className="flex items-center justify-center">
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="ml-3">Loading...</p>
            </div>
          ) : (
            <p className="text-center text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ConfirmUserContent() {
  return (
    <Suspense>
      <ConfirmUserBody />
    </Suspense>
  );
}

export default ConfirmUserContent;
