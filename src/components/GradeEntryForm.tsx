import React, { useState } from "react";

const GradeEntry = ({ onSubmit }: { onSubmit: (newGrade: { studentId: string; score: number }) => void }) => {
  const [studentId, setStudentId] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId && score >= 0) {
      onSubmit({ studentId, score });
      setStudentId(""); // Reset after submitting
      setScore(0); // Reset after submitting
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Student ID</label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Enter Student ID"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Grade</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="mt-1 p-2 border rounded-md w-full"
          placeholder="Enter Grade"
        />
      </div>

      <button
        type="submit"
        className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Submit Grade
      </button>
    </form>
  );
};

export default GradeEntry;
