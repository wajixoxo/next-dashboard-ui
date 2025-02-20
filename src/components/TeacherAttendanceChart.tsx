"use client";
import Image from "next/image";
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

const data = [
  {
    name: "Mon",
    Present: 18,
    Absent: 12,
  },
  {
    name: "Tue",
    Present: 15,
    Absent: 15,
  },
  {
    name: "Wed",
    Present: 23,
    Absent: 7,
  },
  {
    name: "Thu",
    Present: 20,
    Absent: 10,
  },
  {
    name: "Fri",
    Present: 17,
    Absent: 13,
  },
];

const AttendanceChart = () => {

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
            <h1 className="text-lg font-semibold leading-tight">Teacher's Attendance</h1>
            {/* Image aligned to the right */}
            <Image src="/moreDark.png" alt="More" width={20} height={20} />
          </div>
    
          {/* Date displayed below */}
          <p className="text-m font-semibold text-[#595959] mt-1">{currentDate}</p>
    
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#333333" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#595959" }} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "#595959" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="Present"
            fill="#7EB979"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="Absent"
            fill="#ED96BB"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;