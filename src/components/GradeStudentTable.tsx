"use client";

import React, { useState } from "react";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { string } from "zod";

type Props = {
  selectedClass: string;
  studentData: Student[];
};

type ExamScores = {
  T1: number | null;
  T2: number | null;
  T3: number | null;
  T4: number | null;
};

type StudentGrade = {
  studentId: string;
  examScores: ExamScores;
  predictedScore: number;
  lastTestScore: number;
};

type Grade = {
  classId: string;
  subjectId: string;
  students: StudentGrade[];
};

type Student = {
  studentId: string;
  name: string;
  email: string;
  photo: string;
  phone: string;
  grade: number;
  class: string;
  address: string;
  grades: StudentGrade[]; // Assume each student has an array of grades
};

const columns = [
  {
    header: "Student Name",
    accessor: "name",
  },
  {
    header: "Current Score",
    accessor: "lastTestScore",
    className: "hidden md:table-cell",
  },
  {
    header: "Predicted Test Score",
    accessor: "predictedScore",
    className: "hidden md:table-cell",
  },
];

const GradeStudentTable: React.FC<Props> = ({ selectedClass, studentData }) => {
  const [search, setSearch] = useState("");
  const filteredStudents = studentData.filter((student) => {
    return (
      selectedClass === "All" ||
      student.class === selectedClass
    );
  });
  

  const renderRow = (student: Student) => {
    // Assuming each student has an array of grades, we fetch the first one
    const studentGrade = student.grades[0]; // Or you could select the appropriate one based on the subject or other criteria

    return (
      <tr key={student.studentId} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaSkyLight">
        <td className="flex items-center gap-4 p-4">
          <div className="flex flex-col">
            <h3 className="font-semibold">{student.name}</h3>
          </div>
        </td>
        <td className="hidden md:table-cell">{studentGrade?.lastTestScore}</td>
        <td className="hidden md:table-cell">{studentGrade?.predictedScore}</td>
      </tr>
    );
  };


  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          {selectedClass === "All"
            ? "All Students"
            : `${selectedClass} Students`}
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={filteredStudents} />

      {/* PAGINATION */}
      <Pagination />
    </div>
  );
};

export default GradeStudentTable;
