// import UserCard from "@/components/UserCard";
// import UserCardCountdown from "@/components/UserCardCountdown";
"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
    RadialBarChart,
    RadialBar,
  } from "recharts";
import Image from "next/image";
import ClassDropdown from "@/components/AttendanceDropdown";
import EventCalendar from "@/components/EventCalendar";
import Announcements from "@/components/Announcements";
// import AttendanceForm from "@/components/AttendanceForm";

// Data for different classes
const data2A = [
  { name: "Mon", Present: 8, Absent: 5 },
  { name: "Tue", Present: 9, Absent: 4 },
  { name: "Wed", Present: 11, Absent: 2 },
  { name: "Thu", Present: 12, Absent: 1 },
  { name: "Fri", Present: 7, Absent: 6 },
];

const data5B = [
  { name: "Mon", Present: 5, Absent: 3 },
  { name: "Tue", Present: 6, Absent: 2 },
  { name: "Wed", Present: 7, Absent: 1 },
  { name: "Thu", Present: 7, Absent: 1 },
  { name: "Fri", Present: 5, Absent: 3 },
];

 const studentData =[
  {
    "studentId": "2230",
    "name": "Ethan Lee",
    "class": "2A",
    "sex": "male"
  },
  {
    "studentId": "2231",
    "name": "Olivia Ng",
    "class": "2A",
    "sex": "female"
  },
  {
    "studentId": "2232",
    "name": "Noah Yap",
    "class": "2A",
    "sex": "male"
  },
  {
    "studentId": "2233",
    "name": "Chloe Teo",
    "class": "2A",
    "sex": "female"
  },
  {
    "studentId": "2227",
    "name": "Sophia Lim",
    "class": "2A",
    "sex": "female"
  },
  {
    "studentId": "2228",
    "name": "Liam Tan",
    "class": "2A",
    "sex": "male"
  },
  {
    "studentId": "2229",
    "name": "Emily Wong",
    "class": "2A",
    "sex": "female"
  },
  {
    "studentId": "2234",
    "name": "Jake Tan",
    "class": "2A",
    "sex": "male"
  },
  {
    "studentId": "2235",
    "name": "Maya Lee",
    "class": "2A",
    "sex": "female"
  },
  {
    "studentId": "2236",
    "name": "Max Tan",
    "class": "2A",
    "sex": "male"
  },
  {
    "studentId": "2237",
    "name": "Sophie Lim",
    "class": "2A",
    "sex": "female"
  },
  {
    "studentId": "2238",
    "name": "Daniel Lee",
    "class": "2A",
    "sex": "male"
  },
  {
    "studentId": "2239",
    "name": "Lena Tan",
    "class": "2A",
    "sex": "female"
  },
  {
    "studentId": "2240",
    "name": "Riley Ng",
    "class": "2A",
    "sex": "male"
  },
  {
    "studentId": "3011",
    "name": "Joanna Ting",
    "class": "5B",
    "sex": "female"
  },
  {
    "studentId": "3012",
    "name": "Farah Natasha",
    "class": "5B",
    "sex": "female"
  },
  {
    "studentId": "3013",
    "name": "Jeffrey Nyipa",
    "class": "5B",
    "sex": "male"
  },
  {
    "studentId": "3014",
    "name": "Noraini Yusuf",
    "class": "5B",
    "sex": "female"
  },
  {
    "studentId": "3015",
    "name": "Matthew Anak Jabu",
    "class": "5B",
    "sex": "male"
  },
  {
    "studentId": "3016",
    "name": "Hui Min Tan",
    "class": "5B",
    "sex": "female"
  },
  {
    "studentId": "3017",
    "name": "Dinesh Kumar",
    "class": "5B",
    "sex": "male"
  },
  {
    "studentId": "3018",
    "name": "Siti Nurhaliza",
    "class": "5B",
    "sex": "female"
  }
]

const genderData = 
{
  "2A": [
    { "name": "Total", "count": 14, "fill": "#97C39A" },
    { "name": "Girls", "count": 7, "fill": "#ED96BB" },
    { "name": "Boys", "count": 7, "fill": "#A9D4F5" }
  ],
  "5B": [
    { "name": "Total", "count": 8, "fill": "#97C39A" },
    { "name": "Girls", "count": 5, "fill": "#ED96BB" },
    { "name": "Boys", "count": 3, "fill": "#A9D4F5" }
  ]
};

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState<string>("2A");
  const [isFormVisible, setIsFormVisible] = useState(false); 

  // Class options to be passed to dropdown
  const classOptions = ["2A", "5B"];
  
// // Toggle the visibility of the form when the button is clicked
//   const handleCreateClick = () => {
//     setIsFormVisible((prevState) => !prevState);  // Toggle visibility on each click
//   };


  // Update data based on selected class
  const getAttendanceData = () => {
    switch (selectedClass) {
      case "2A":
        return data2A;
      case "5B":
        return data5B;
        default:
        return data2A;
    
    }
  };

  const handleClassChange = (newClass: string) => {
    setSelectedClass(newClass);
  };

  
  const filteredResults = studentData.filter(student => student.class === selectedClass);
const totalNumInClass = filteredResults.length;

  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* LEFT */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard1 type="total student enrolled in your class " studentCount={totalNumInClass} />
          </div>

      {/* New class dropdown wrapper */}
      <div className="flex items-center gap-2 mb-4">
        <span className="font-semibold">{selectedClass}</span>
        <select
          value={selectedClass}
          onChange={(e) => handleClassChange(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg p-2 text-l"
        >
          {classOptions.map((classOption) => (
            <option key={classOption} value={classOption}>
              Class {classOption}
            </option>
          ))}
        </select>
      </div>
          {/* Button to toggle the form */}
        <div className="mb-4">
          {/* <button
            onClick={handleCreateClick}
            className="bg-blue-400 text-white px-4 py-2 rounded-lg"
          >
            {isFormVisible ? 'Hide Attendance Form' : 'Create Attendance'}
          </button> */}
        </div>

          {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-3/3 h-[350px]">
          <CountChart1 selectedClass={selectedClass} data={genderData} />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-3/3 h-[500px]">
          <AttendanceChart1 data={getAttendanceData()} className={selectedClass} />
          {/* <BarChart data={getAttendanceData()} className={selectedClass} /> */}
          </div>
        </div>

      
        
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          
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

const data = [
    {
      name: "Mon",
      Present: 60,
      Absent: 40,
    },
    {
      name: "Tue",
      Present: 70,
      Absent: 60,
    },
    {
      name: "Wed",
      Present: 90,
      Absent: 75,
    },
    {
      name: "Thu",
      Present: 90,
      Absent: 75,
    },
    {
      name: "Fri",
      Present: 65,
      Absent: 55,
    },
  ];

  const AttendanceChart1 = ({ data, className }: { data: any[], className: string }) => {
    const [currentDate, setCurrentDate] = useState("");
    
    // Update the current date
    useEffect(() => {
      const today = new Date();
      const options : Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
      const formattedDate = today.toLocaleDateString('en-US', options);
      setCurrentDate(formattedDate);
    }, []);
  
    return (
      <div className="bg-white rounded-lg p-4 h-full">
        <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold leading-tight">{`Class ${className}'s Attendance`}</h1>
          {/* Image aligned to the right */}
          <Image src="/moreDark.png" alt="More" width={20} height={20} />
        </div>
  
        {/* Date displayed below */}
        <p className="text-m font-semibold text-[#595959] mt-1">{currentDate}</p>
  
        <ResponsiveContainer width="90%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis dataKey="name" axisLine={false} tick={{ fill: "#333333" }} tickLine={false} />
          <YAxis axisLine={false} tick={{ fill: "#595959" }} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "#595959" }} />
          <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }} />
          <Bar dataKey="Present" fill="#7DC1F2" legendType="circle" radius={[10, 10, 0, 0]} />
          <Bar dataKey="Absent" fill="#E3A1A5" legendType="circle" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      </div>
    );
  };
  const CountChart1 = ({
    selectedClass,
    data,
  }: {
    selectedClass: string;
    data: Record<string, { name: string; count: number; fill: string }[]>;
  }) => {
    const getCountData = () => {
      return data[selectedClass] || [];
    };
  
    const countData = getCountData();
  
    // Function to get specific count values for Total, Girls, Boys
    const getClassCount = (name: string) => {
      const classData = countData.find(item => item.name === name);
      return classData ? classData.count : 0;
    };
  
    return (
      <div className="chart-container bg-white shadow-lg rounded-lg p-6">
        {/* Class Title */}
        <h2 className="text-center font-bold text-2xl text-gray-700 mb-6">
          Class: {selectedClass}
        </h2>
  
        {/* Radial Bar Chart */}
        <div className="relative w-full h-[300px] mx-auto">
          <ResponsiveContainer>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={20}
              data={countData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar background dataKey="count" cornerRadius={10} />
              <Legend
                iconSize={10}
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  marginTop: 20,
                  fontSize: "14px",
                }}
              />
            </RadialBarChart>
          </ResponsiveContainer>

        
  
          {/* Centered Image */}
          <Image
            src="/maleFemale2.png"
            alt="Center Icon"
            width={60}
            height={60}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
  
        {/* Display Count Data: Total, Girls, Boys */}
        <div className="mt-6 flex justify-center space-x-6">
          <div className="text-center">
            <h4 className="font-semibold text-lg text-gray-800">Total</h4>
            <p className="text-2xl text-gray-600">{getClassCount("Total")}</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-lg text-gray-800">Girls</h4>
            <p className="text-2xl text-gray-600">{getClassCount("Girls")}</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold text-lg text-gray-800">Boys</h4>
            <p className="text-2xl text-gray-600">{getClassCount("Boys")}</p>
          </div>
        </div>
      </div>

      
    );
  };
  

export default AttendancePage;    