"use client";

import React, { useState } from "react";

// Type for props passed to the dropdown
interface StudentDropdownProps {
  selectedClass: string;
  setSelectedClass: React.Dispatch<React.SetStateAction<string>>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  studentsData: { grade: number; class: string }[]; // Add the students data to props
}


const StudentDropdown: React.FC<StudentDropdownProps> = ({
  selectedClass,
  setSelectedClass,
  isDropdownOpen,
  setIsDropdownOpen,
  studentsData,
}) => {
  // Extract unique classes dynamically from studentsData
  const availableClasses = Array.from(
    new Set(studentsData.map((student) => student.class))
  ); // Get unique classes

  const handleClassChange = (className: string) => {
    setSelectedClass(className);
    setIsDropdownOpen(true);
  };

  return (
    <div className="mt-2 text-gray-700">
      <label htmlFor="classSelect" className="text-m text-gray-700 mr-2">
        Select Class: 
      </label>
      <div className="relative inline-block w-[65%] mt-2">
        {/* Dropdown toggle */}
        <button
          className="w-full px-4 py-2 text-left border rounded-md bg-white border-gray-300 shadow-md flex justify-between items-center"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedClass || "Class"}
          <i className={`fas fa-caret-${isDropdownOpen ? "up" : "down"}`} />
        </button>

        {/* Dropdown items (only shown when open) */}
        {isDropdownOpen && (
          <div className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {/* Class Dropdown */}
            <div className="flex gap-2 p-2">
              <button
                className="w-full px-4 py-2 text-left hover:bg-[#A9D4F5]"
                onClick={() => {
                  setSelectedClass("All");
                  setIsDropdownOpen(false);
                }}
              >
                All
              </button>
              {availableClasses.map((className) => (
                <button
                  key={className}
                  className="w-full px-4 py-2 text-left hover:bg-[#A9D4F5]"
                  onClick={() => handleClassChange(className)}
                >
                  {className}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDropdown;
