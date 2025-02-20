"use client";

import React, { useState } from "react";

const classOptions = {
  "1": ["1A", "1B"],
  "2": ["2A", "2B"],
  "3": ["3A", "3B"],
  "4": ["4A", "4B"],
  "5": ["5A", "5B"],
};

const subjectOptions = [
  { subjectId: "BM1", name: "Bahasa Melayu" },
  { subjectId: "ENG", name: "English" },
  { subjectId: "MAT", name: "Mathematics" },
  { subjectId: "SCI", name: "Science" },
  { subjectId: "HIS", name: "History" },
  { subjectId: "GEO", name: "Geography" },
  { subjectId: "DT", name: "Design & Technology" },
  { subjectId: "PE", name: "Physical Education" },
  { subjectId: "PHY", name: "Physics" },
  { subjectId: "CHEM", name: "Chemistry" },
];
const SubjectClassDropdown = ({
  subjects,
  classes,
  setSubjects,
  setClasses,
}: {
  subjects: string[];
  classes: string[];
  setSubjects: React.Dispatch<React.SetStateAction<string[]>>;
  setClasses: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [error, setError] = useState<string>("");

  const handleAddSubjectClass = () => {
    if (!selectedSubject || !selectedClass) {
      setError("Please select both a subject and a class.");
      return;
    }
  
    // Add the subjectId-class pair and reset the fields
    setSubjects([...subjects, selectedSubject]); // Save subjectId here
    setClasses([...classes, selectedClass]);
  
    setSelectedSubject(""); // Reset subject dropdown
    setSelectedClass(""); // Reset class dropdown
    setError(""); // Clear error
  };

  const handleRemovePair = (index: number) => {
    setSubjects(subjects.filter((_, i) => i !== index));
    setClasses(classes.filter((_, i) => i !== index));
  };

  return (
    <div className="flex justify-between flex-wrap gap-4">
      {/* Subject Dropdown */}
      <div className="mb-4 w-full">
        <label className="block text-sm font-medium mb-1">Select Subject</label>
        <select
          value={selectedSubject}
          onChange={(e) => {
            setSelectedSubject(e.target.value);
            setError(""); // Clear error on change
          }}
          className={`p-2 border rounded-md w-full ${
            error && !selectedSubject ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">-- Select a Subject --</option>
          {subjectOptions.map((subject) => (
            <option key={subject.subjectId} value={subject.subjectId}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {/* Class Dropdown */}
      {selectedSubject && (
        <div className="mb-4 w-full">
          <label className="block text-sm font-medium">
            Select Class for {selectedSubject}
          </label>
          <select
            value={selectedClass}
            onChange={(e) => {
              setSelectedClass(e.target.value);
              setError(""); // Clear error on change
            }}
            className={`p-2 border rounded-md w-full ${
              error && !selectedClass ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">-- Select a Class --</option>
            {Object.values(classOptions)
              .flat()
              .map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
          </select>
        </div>
      )}

      {/* Add Button */}
      <button
        type="button"
        onClick={handleAddSubjectClass}
        disabled={!selectedSubject || !selectedClass}
        className="bg-blue-400 text-white p-2 rounded-md mt-4 w-full sm:w-auto"
      >
        Add
      </button>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}

      {/* Display Subject-Class Pairs */}
      {(subjects.length > 0 || classes.length > 0) && (
        <div className="mb-4 w-full">
          <h3 className="font-semibold mb-2">Selected Subjects and Classes</h3>
          <ul className="space-y-2">
          {subjects.map((subjectId, index) => {
            const subject = subjectOptions.find(
              (subject) => subject.subjectId === subjectId
            );

            return (
              <li
                key={index}
                className="flex justify-between items-center p-2 border rounded-md bg-gray-100"
              >
                <span>
                  <strong>{subject?.name}:</strong> {classes[index]}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemovePair(index)}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
        </div>
      )}
    </div>
  );
};

export default SubjectClassDropdown;
