import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";
// import UserCard from "@/components/UserCard";
import Image from "next/image";
import UserCardCountdown from "@/components/UserCardCountdown";
import StudentAttendanceChart from "@/components/StudentAttendanceChart";
import EventCalendar from "@/components/EventCalendar";
import Announcements from "@/components/Announcements";
import StudentCountChart from "@/components/StudentCountChart";

const TeacherPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard2 type="student" studentCount={90} />
          <UserCard2 type="teacher" studentCount={30} />
          <UserCard2 type="staff" studentCount={20} />
          <UserCardCountdown />
        </div>

        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[350px]">
          <StudentCountChart />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[350px]">
            <StudentAttendanceChart />
          </div>
        </div>
        
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          {/* Additional content for bottom chart can be added here */}
        </div>
      </div>
      
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

const UserCard2 = ({ type, studentCount }: { type: string, studentCount: number }) => {
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className=" text-[13px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={25} height={25} />
      </div>
      <h1 className="text-2xl font-semibold my-2">{studentCount}</h1>
      <h2 className="capitalize text-lg font-large text-gray-700">{type}</h2>
    </div>
  );
};

export default TeacherPage;
