"use client";

// import UserCard from "@/components/UserCard";
import UserCardCountdown from "@/components/UserCardCountdown";
import TeacherCountChart from "@/components/TeacherCountChart";
import StudentCountChart from "@/components/StudentCountChart";
import TeacherAttendanceChart from "@/components/TeacherAttendanceChart";
import StudentAttendanceChart from "@/components/StudentAttendanceChart";
import EventCalendar from "@/components/EventCalendar";
import Announcements from "@/components/Announcements";
import Image from "next/image";
// import UploadStudentsData from "@/components/UploadStudentData";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";


const AdminPage = () => {

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard2 type="students" studentCount={90} />
          <UserCard2 type="teachers" studentCount={30} />
          <UserCard2 type="staffs" studentCount={20} />
          <UserCard2 type="classes" studentCount={10} /> {/* Adjust if needed */}
          <UserCard2 type="subjects" studentCount={10} /> {/* Adjust if needed */}
          <UserCardCountdown />
        </div>

        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
            {/* TEACHER COUNT CHART */}
            <div className="w-full lg:w-1/2 h-[350px]">
              <TeacherCountChart />
            </div>
            {/* STUDENT COUNT CHART */}
            <div className="w-full lg:w-1/2 h-[350px]">
              <StudentCountChart />
            </div>
        </div>

        {/* BOTTOM CHART */}
        <div className="w-full h-[500px] flex flex-col lg:flex-row gap-4">
          {/* TEACHER ATTENDANCE CHART */}
          <div className="w-full lg:w-1/2 h-[400px]">
            <TeacherAttendanceChart/>
            </div>
            {/* STUDENT ATTENDANCE CHART */}
            <div className="w-full lg:w-1/2 h-[400px]">
            <StudentAttendanceChart/>
            </div>
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

export default AdminPage;
