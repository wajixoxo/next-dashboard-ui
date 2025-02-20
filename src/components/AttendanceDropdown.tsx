// components/ClassDropdown.tsx
"use client";
import React from "react";

interface ClassDropdownProps {
  selectedClass: string;
  onChangeClass: (newClass: string) => void;
}

const ClassDropdown = ({ selectedClass, onChangeClass, classOptions }: { selectedClass: string, 
  onChangeClass: (newClass: string) => void, classOptions: string[] }) => {
  return (
    <div className="flex items-center gap-2">
      <select
        value={selectedClass}
        onChange={(e) => onChangeClass(e.target.value)}
        className="bg-white border border-gray-300 rounded-lg p-2 text-sm"
      >
        <option value="2A">Class 2A</option>
        <option value="5B">Class 5B</option>
      </select>
      <span className="font-semibold">{selectedClass}</span>
    </div>
  );
};

export default ClassDropdown;
