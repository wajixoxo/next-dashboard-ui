"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const UserCardCountdown = () => {
  // SPM Exam Date
  const examDate = new Date("November 21, 2025 00:00:00").getTime();

  // State to keep track of the time left
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      // Get the current time
      const now = new Date().getTime();

      // Find the difference between now and the exam date
      const distance = examDate - now;

      if (distance <= 0) {
        // If the time has passed, stop the countdown
        clearInterval(interval);
        setTimeLeft("EXAM STARTED!");
        return;
      }

      // Calculate time components
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      // Set the time left
      setTimeLeft(`${days} Days ${hours} Hours ${minutes} Minutes`);
    }, 60000); // Update every minute

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [examDate]);

  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[9px] bg-white px-2 py-1 rounded-full text-green-600 p-5 ">
          November 21, 2025
        </span>
        <Image src="/more.png" alt="More Options" width={20} height={20} className="ml-4"/>
      </div>
      <h1 className="text-base md:text-lg lg:text-xl xl:text-2xl font-semibold my-4">{timeLeft}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-700">SPM Countdown</h2>
    </div>
  );
};

export default UserCardCountdown;
