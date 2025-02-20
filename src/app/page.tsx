"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { auth, db } from "@/firebaseConfig"; // Import Firebase config
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      setIsLoading(true); // Start loading
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in successfully:", user);

      // Fetch the user's role from Firestore
      const userDocRef = doc(db, "users", user.uid); // Assuming 'users' is your Firestore collection
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        if (role === "admin") {
          router.push("/admin"); // Redirect admin users
        } else if (role === "teacher") {
          router.push("/teacher"); // Redirect teacher users
        } else {
          setError("User role is not recognized.");
        }
      } else {
        setError("User data not found.");
      }
    } catch (error: any) {
      console.error("Error logging in:", error.message);
      setError(error.message || "Failed to log in.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-[#E5F4FD] flex justify-center items-center">
      <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
          <h1 className="text-2xl font-semibold mt-4">ClassInsight</h1>
        </div>

        <h2 className="text-center text-xl mb-6">Login to your account</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md mt-6 hover:bg-blue-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm">
            No account?{" "}
            <a
              href="/sign-up"
              className="text-blue-500 hover:underline"
            >
              Click here to Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
