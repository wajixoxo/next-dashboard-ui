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
    count: 30,
    fill: "#7EB979",
  },
  {
    name: "Girls",
    count: 12,
    fill: "#E3A1A5",
  },
  {
    name: "Boys",
    count: 18,
    fill: "#7DC1F2",
  },
];

const CountChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold ">Teachers</h1>
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
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-between gap-8 pt-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 bg-[#7DC1F2] rounded-full" />
          <h2 className="text-xs text-[#333333]">Boys (40%)</h2>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 bg-[#E3A1A5] rounded-full" />
          <h2 className="text-xs text-[#333333]">Girls (60%)</h2>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-5 h-5 bg-[#7EB979] rounded-full" />
          <h2 className="text-xs text-[#333333]">Total (100%)</h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;