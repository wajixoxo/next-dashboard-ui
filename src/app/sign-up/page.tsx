"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore"; // Import Firestore methods
import { auth, db } from "@/firebaseConfig"; // Import Firestore config
import Image from "next/image";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher"); // Default role
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !firstName || !lastName || !role) {
      setError("Please fill in all fields.");
      return;
    }

    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Save user data to Firestore with role
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        firstName,
        lastName,
        email,
        role, // Store the role
        createdAt: serverTimestamp(),
      });

      console.log("User created successfully:", user);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push(`/?message=${encodeURIComponent("Signup successful, please log in")}`);
      }, 2000);
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      setError(error.message || "Failed to sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#E5F4FD] flex justify-center items-center">
      <div className="w-full sm:w-96 bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
          <h1 className="text-2xl font-semibold mt-4">ClassInsight</h1>
        </div>

        <h2 className="text-center text-xl mb-6">Create your account</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="firstname" className="text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstname"
              className="w-full p-2 border border-gray-300 rounded-md mt-2 text-[14px]"
              placeholder="Enter your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="lastname" className="text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastname"
              className="w-full p-2 border border-gray-300 rounded-md mt-2 text-[14px]"
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

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

          <div>
            <label htmlFor="role" className="text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`py-2 rounded-md mt-6 transition-colors ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
