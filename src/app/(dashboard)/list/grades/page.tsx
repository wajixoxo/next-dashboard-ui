"use client";
// import GradeEntry from "@/components/GradeEntry";
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
import StudentTable from "@/components/TableGradeStudent";

interface Student {
  studentId: string;
  PredictedScore: number;
}

const GradesPage : React.FC = () => {
  const [studentsData, setStudentsData] = useState<Student[]>([]);

  // Function to update the studentsData state when new data is received from UploadPredict
  const handleDataUpdate = (data: { studentId: string; PredictedScore: number }[]) => {
    setStudentsData(data);
  };

const [resultsData, setResultsData] = useState([
  {
    "studentId": "2230",
    "name": "Ethan Lee",
    "class": "2A",
    "subject": "DT",
    "ActualTestScore": 75,
    "PredictedScore": null
  },
  {
    "studentId": "2231",
    "name": "Olivia Ng",
    "class": "2A",
    "subject": "DT",
    "ActualTestScore": 82,
    "PredictedScore": null
  },
  {
    "studentId": "2232",
    "name": "Noah Yap",
    "class": "2A",
    "subject": "DT",
    "ActualTestScore": 68,
    "PredictedScore": null
  },
  {
    "studentId": "2233",
    "name": "Chloe Teo",
    "class": "2A",
    "subject": "DT",
    "ActualTestScore": 90,
    "PredictedScore": null
  },
  {
    "studentId": "2227",
    "name": "Sophia Lim",
    "class": "2A",
    "subject": "DT",
    "ActualTestScore": 65,
    "PredictedScore": null
  },
  {
    "studentId": "2228",
    "name": "Liam Tan",
    "class": "2A",
    "subject": "DT",
    "ActualTestScore": 80,
    "PredictedScore": null
  },
  {
    "studentId": "2229",
    "name": "Emily Wong",
    "class": "2A",
    "subject": "DT",
    "ActualTestScore": 72,
    "PredictedScore": null
  },
  {
    "studentId": "2234",
    "name": "Jake Tan",
    "class": "2A",
    "subject": "DT",
    "ActualTestScore": 78,
    "PredictedScore": null
  },
  {
    "studentId": "2235",
    "name": "Maya Lee",
    "class": "2A",
    "subject": "DT",
    "ActualTestScore": 85,
    "PredictedScore": null
  },
  {
    "studentId": "2236",
    "name": "Max Tan",
    "class": "2A",
    "subject": "DT",
    "ActualTestScore": 70,
    "PredictedScore": null
  },
  {
    "studentId": "2237",
    "name": "Sophie Lim",
    "class": "2A",
    "subject": "DT",
    "ActualTestScore": 92,
    "PredictedScore": null
  },
  {
    "studentId": "2238",
    "name": "Daniel Lee",
    "class": "2A",
    "subject": "DT",
    "ActualTestScore": 77,
    "PredictedScore": null
  },
  {
    "studentId": "2239",
    "name": "Lena Tan",
    "class": "2A",
    "subject": "DT",
    "ActualTestScore": 80,
    "PredictedScore": null
  },
  {
    "studentId": "2240",
    "name": "Riley Ng",
    "class": "2A",
    "subject": "DT",
    "ActualTestScore": 66,
    "PredictedScore": null
  },
    {
      studentId: "3011",
      name: "Joanna Ting",
      class: "5B",
      subject: "DT",
      ActualTestScore: 85,
      PredictedScore: null
    },
    {
      studentId: "3012",
      name: "Farah Natasha",
      class: "5B",
      subject: "DT",
      ActualTestScore: 78,
      PredictedScore: null
    },
    {
      studentId: "3013",
      name: "Jeffrey Nyipa",
      class: "5B",
      subject: "DT",
      ActualTestScore: 92,
      PredictedScore: null
    },
    {
      studentId: "3014",
      name: "Noraini Yusuf",
      class: "5B",
      subject: "DT",
      ActualTestScore: 88,
      PredictedScore: null
    },
    {
      studentId: "3015",
      name: "Matthew Anak Jabu",
      class: "5B",
      subject: "DT",
      ActualTestScore: 79,
      PredictedScore: null
    },
    {
      studentId: "3016",
      name: "Hui Min Tan",
      class: "5B",
      subject: "DT",
      ActualTestScore: 93,
      PredictedScore: null
    },
    {
      studentId: "3017",
      name: "Dinesh Kumar",
      class: "5B",
      subject: "DT",
      ActualTestScore: 70,
      PredictedScore: null
    },
    {
      studentId: "3018",
      name: "Siti Nurhaliza",
      class: "5B",
      subject: "DT",
      ActualTestScore: 77,
      PredictedScore: null
    }
  ]);

  const [selectedClass, setSelectedClass] = useState<string>("2A");

  const classes = [...new Set(resultsData.map(student => student.class))];

  const handleClassChange = (newClass: string) => {
    setSelectedClass(newClass);
  };

  const filteredResults = resultsData.filter((student) => student.class === selectedClass);

  const totalScore = filteredResults.reduce((sum, student) => sum + student.ActualTestScore, 0);
  const totalNumInClass = filteredResults.length;
  const aveScoreInClass = totalNumInClass > 0 ? Math.round(totalScore / totalNumInClass) : 0;


  const filteredData = resultsData.filter(
    (item) => item.class === selectedClass
  );

  const dataWithPredictedScores = filteredData.map((student) => {
    const predictedScore = studentsData.find(
      (data) => data.studentId === student.studentId
    )?.PredictedScore;
    return {
      ...student,
      PredictedScore: predictedScore ?? student.PredictedScore,
    };
  });

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="flex items-center gap-2"></div>

      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard1 type="Total student enrolled in this classes" studentCount={totalNumInClass} />
          <UserCard1 type="Average Score in Class" studentCount={aveScoreInClass} />
        </div>

        {/* New class dropdown wrapper */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-semibold">{selectedClass}</span>
          <select
            value={selectedClass}
            onChange={(e) => handleClassChange(e.target.value)}
            className="bg-white border border-gray-300 rounded-lg p-2 text-l"
          >
            {classes.map((classOption) => (
              <option key={classOption} value={classOption}>
                Class {classOption}
              </option>
            ))}
          </select>
        </div>

        {/* UploadPredict Component */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UploadPredict onDataUpdate={handleDataUpdate} />
        </div>

        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <div className="w-full lg:w-3/3 h-[350px]">
            <GradePerformance resultsData={filteredResults} />
          </div>
        </div>

        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <StudentTable studentsData={studentsData} resultsData={dataWithPredictedScores} />
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

const UserCard1 = ({ type, studentCount }: { type: string , studentCount: number }) => {
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

export default GradesPage;