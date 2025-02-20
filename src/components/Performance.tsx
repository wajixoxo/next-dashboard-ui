"use client"
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Rectangle, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Image from "next/image"; // Import Image component

type GradeKey = "Gred A+" | "Gred A" | "Gred A–" | "Gred B+" | "Gred B" | "Gred C+" | "Gred C" | "Gred D" | "Gred E" | "Gred F";

const Performance = ({ resultsData }: { resultsData: any[] }) => {
  const [gradeCounts, setGradeCounts] = useState<any[]>([]);

  useEffect(() => {
    const categorizeScores = (data: any[]) => {
      const gradeCounts: Record<GradeKey, number> = {
        "Gred A+": 0,
        "Gred A": 0,
        "Gred A–": 0,
        "Gred B+": 0,
        "Gred B": 0,
        "Gred C+": 0,
        "Gred C": 0,
        "Gred D": 0,
        "Gred E": 0,
        "Gred F": 0,
      };

      data.forEach((entry) => {
        const score = entry.score;
        if (score >= 90) gradeCounts["Gred A+"] += 1;
        else if (score >= 80) gradeCounts["Gred A"] += 1;
        else if (score >= 70) gradeCounts["Gred A–"] += 1;
        else if (score >= 65) gradeCounts["Gred B+"] += 1;
        else if (score >= 60) gradeCounts["Gred B"] += 1;
        else if (score >= 55) gradeCounts["Gred C+"] += 1;
        else if (score >= 50) gradeCounts["Gred C"] += 1;
        else if (score >= 45) gradeCounts["Gred D"] += 1;
        else if (score >= 40) gradeCounts["Gred E"] += 1;
        else gradeCounts["Gred F"] += 1;
      });

      return Object.keys(gradeCounts).map((grade) => ({
        grade,
        students: gradeCounts[grade as GradeKey],
      }));
    };

    setGradeCounts(categorizeScores(resultsData));
  }, [resultsData]);

  return (
    <div className="bg-white p-4 rounded-md h-80 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Performance</h1>
        <Image src="/moreDark.png" alt="More" width={16} height={16} />
      </div>

      {/* Chart */}
      <div className="w-full  h-full">
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={gradeCounts}
            >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="grade" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#8884d8"  activeBar={<Rectangle fill="#F6CBDE" stroke="#595959" />}  />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Performance;
