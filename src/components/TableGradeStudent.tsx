import React from "react";

const StudentTable = ({
  studentsData,
  resultsData,
}: {
  studentsData: { studentId: string; PredictedScore: number }[];
  resultsData: {
    studentId: string;
    name: string;
    class: string;
    subject: string;
    ActualTestScore: number;
    PredictedScore: number | null;
  }[];
}) => {
  // Update the PredictedScore in resultsData based on studentData
  const updatedResultsData = resultsData.map((result) => {
    const predictedScore = studentsData.find(
      (student) => student.studentId === result.studentId
    )?.PredictedScore;
    return {
      ...result,
      PredictedScore: predictedScore ?? result.PredictedScore, // If no predicted score, keep the original
    };
  });

  const columns = [
    { header: "Student ID", accessor: "studentId" },
    { header: "Name", accessor: "name" },
    { header: "Actual Test Score", accessor: "ActualTestScore" },
//     
  ];

  const renderRow = (item: typeof updatedResultsData[0], index: number) => (
    <tr
      className={`text-sm border-b hover:bg-gray-50 ${
        index % 2 === 0 ? "bg-gray-100" : ""
      }`}
    >
      <td className="py-3 px-4">{item.studentId}</td>
      <td className="py-3 px-4">{item.name}</td>
      <td className="py-3 px-4">{item.ActualTestScore}</td>
      {/* <td className="py-3 px-4">
        {item.PredictedScore ?? "Not Available"}
      </td> */}
    </tr>
  );

  return (
    <table className="w-full mt-4 border-collapse shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-blue-400 text-white">
        <tr className="text-left text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className="py-3 px-4 border-b">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {updatedResultsData.map((item, index) => (
          <React.Fragment key={index}>{renderRow(item, index)}</React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
