

"use client";
import { useState, useRef } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";
import Image from "next/image";
import ClassDropdown from "@/components/AttendanceDropdown";
import EventCalendar from "@/components/EventCalendar";
import Announcements from "@/components/Announcements";
import GradePerformance from "@/components/GradePerformance";
import GradeStudentTable from "@/components/GradeStudentTable";
import FormModal from "@/components/FormModal";
import UploadPredict from "@/components/UploadPredict"; 

export const studentData = [
    {
      "id": "S1",
      "studentId": "S1",
      "name": "John Doe",
      "photo": "/placeholder.jpg",
      "class": "1A",
      "grade": 0,
      "attendance": 88,
      "lastTestScore": 90
    },
    {
      "id": "S2",
      "studentId": "S2",
      "name": "Kiera",
      "photo": "/placeholder.jpg",
      "class": "1B",
      "grade": 0,
      "attendance": 72,
      "lastTestScore": 33
    },
    {
      "id": "S3",
      "studentId": "S3",
      "name": "Amanda",
      "photo": "/placeholder.jpg",
      "class": "1B",
      "grade": 0,
      "attendance": 95,
      "lastTestScore": 90
    }
  ]
  
export const resultsData = [
    { id: 1, subject: "Math", class: "1A", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 90 },
    { id: 2, subject: "English", class: "2A", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 87 },
    { id: 3, subject: "Science", class: "3A", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 75 },
    { id: 4, subject: "Social Studies", class: "1B", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 65 },
    { id: 5, subject: "Art", class: "4A", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 55 },
    { id: 6, subject: "Music", class: "5A", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 40 },
    { id: 7, subject: "History", class: "6A", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 30 },
    { id: 8, subject: "Math", class: "1B", teacher: "John Doe", student: "Kiera", date: "2025-01-01", type: "exam", score: 33 },
    { id: 9, subject: "Physics", class: "7A", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 78 },
    { id: 10, subject: "Math", class: "1B", teacher: "John Doe", student: "Amanda", date: "2025-01-01", type: "exam", score: 90 },
  ];

  const GradesPage = () => {
    const [selectedClass, setSelectedClass] = useState<string>("1B");
  
    const handleClassChange = (newClass: string) => {
      setSelectedClass(newClass);
    };

    const filteredData = resultsData.filter(
        (item) => item.class === selectedClass
      );
    
      const trendData = filteredData.reduce((acc, curr) => {
        const existing = acc.find((item) => item.date === curr.date);
        if (existing) {
          existing.score += curr.score;
          existing.count += 1;
        } else {
          acc.push({ date: curr.date, score: curr.score, count: 1 });
        }
        return acc;
      }, [] as { date: string; score: number; count: number }[]).map((item) => ({
        date: item.date,
        average: item.score / item.count,
      }));

      const atRiskStudents = filteredData
      .sort((a, b) => a.score - b.score)
      .slice(0, 5)
      .map((result) => {
        // Find the corresponding student details from `studentData`
        const student = studentData.find(
          (student) => student.name === result.student
        );
        return student ? { ...student, predictedScore: result.score } : null;
      })
      .filter((student) => student !== null); // Remove any nulls if no match is found
    
            
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard1 type="total student enrolled in your classes" />
          <UserCard1 type="Average Class Grade" />
          <UserCard1 type="Top Performer" />
          <UserCard1 type="At Risk Students" />
          </div>
          <div className="flex gap-4 justify-between flex-wrap">
          <ClassDropdown selectedClass={selectedClass} onChangeClass={handleClassChange} />
          <FormModal table="student" type="create"/>
        </div>

        <div className="flex gap-4 justify-between flex-wrap">
        {/* Modal for file upload */}
        <UploadPredict />
        </div>

          {/* MIDDLE CHARTS */}
        <div className="flex gap-4 justify-between flex-wrap">
          {/* PERFORMANCE CHART */}
          <div className="w-full lg:w-3/3 h-[350px]">
          <GradePerformance resultsData={resultsData} />
          </div>
          {/* GRADE OVER TIME CHART */}
          <div className="w-full h-[300px]">
          <h2>Grade Trends Over Time</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="average" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
             {/* AT RISK STUDENTS CHART */}
          <div>
            <h2 className="text-xl font-semibold mb-4">At-Risk Students</h2>
            <div className="flex gap-4 justify-between flex-wrap">
              {atRiskStudents.map((student) => (
                <div
                  key={student.id}
                  className="flex justify-between items-center odd:bg-[#E4A0C0] even:bg-[#BCB2E6] p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col gap-2">
                  <p className=" text-[#333333]">
                    <span className="text-[#333333]">Student Name:</span> {student.name}
                    </p>
                    <p className="text-[#333333]">
                    <span className="text-[#333333]">Student ID:</span> {student.studentId}
                    </p>
                    <p className="text-md font-semibold text-red-600">
                    <span className="text-[#333333]">Predicted Score:</span> {student.predictedScore}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
        <GradeStudentTable selectedClass={selectedClass} studentData={studentData} />
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

const UserCard1 = ({ type }: { type: string }) => {
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className=" text-[13px]
        bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={25} height={25} />
      </div>
      <h1 className="text-2xl font-semibold my-2">75</h1>
      <h2 className="capitalize text-lg font-large text-gray-700">{type}</h2>
    </div>
  );
};

export default GradesPage;    
