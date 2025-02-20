"use client";
import Image from "next/image";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 90,
    fill: "#97C39A",
  },
  {
    name: "Girls",
    count: 31,
    fill: "#ED96BB",
  },
  {
    name: "Boys",
    count: 69,
    fill: "#A9D4F5",
  },
];

const CountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold ">Students</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* CHART */}
      <div className="relative w-[90%] h-[60%] mx-auto">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="110%"
            barSize={32}
            data={data}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          src="/maleFemale2.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-between gap-8 pt-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 bg-[#A9D4F5] rounded-full" />
    
          <h2 className="text-xs text-[#333333]">Boys (77%)</h2>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 bg-[#ED96BB] rounded-full" />
    
          <h2 className="text-xs text-[#333333]">Girls (23%)</h2>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 bg-[#97C39A] rounded-full" />
          <h2 className="text-xs text-[#333333]">Total (100%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;