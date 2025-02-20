"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Set a timeout to redirect to login after 2 seconds
    setTimeout(() => {
      router.push("/"); // Redirect to the login page (assumed to be at the root)
    }, 2000); // 2 seconds delay
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-gray-800">You are logged out.</h1>
        <p className="text-gray-600 mt-2">Redirecting you to the login page...</p>
      </div>
    </div>
  );
};

export default LogoutPage;
