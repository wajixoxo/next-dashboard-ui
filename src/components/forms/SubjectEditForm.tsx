"use client";
import React, { useState } from "react";

interface SubjectEditFormProps {
    type: "create" | "edit"; 
  data: {
    subjectId: string;
    subjectName: string;
    teacherId: string [];
    classes: string[];
  };
  allTeachers: string[]; // List of all teachers for the dropdown
  allClasses: string[]; // List of all classes for the dropdown
  onSubmit?: (updatedData: any) => void;
  onClose?: () => void;  
}


const SubjectEditForm: React.FC<SubjectEditFormProps> = ({ 
    data, 
    onSubmit,
    allTeachers,
    allClasses,
    onClose,
    }) => {
  const [subjectName, setSubjectName] = useState(data?.subjectName || "");
  const [subjectId, setSubjectId] = useState(data?.subjectId || "");
  const [teacherId, setTeacherId] = useState(data?.teacherId || []);
  const [classes, setClasses] = useState(data?.classes || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      subjectName,
      subjectId,
      teacherId,
      classes,
    };
    if (onSubmit) {
        onSubmit(updatedData);
      } // Call the onSubmit prop with the updated data
  };

//   const handleClassChange = (e: React.ChangeEvent<HTMLInputElement>, className: string) => {
//     if (e.target.checked) {
//       setClasses((prev) => [...prev, className]); // Add class if checked
//     } else {
//       setClasses((prev) => prev.filter((cls) => cls !== className)); // Remove class if unchecked
//     }
//   };

const handleClassChange = (selectedClass: string) => {
    setClasses((prev) => {
      if (prev.includes(selectedClass)) {
        return prev.filter((cls) => cls !== selectedClass); // Remove class
      } else {
        return [...prev, selectedClass]; // Add class
      }
    });
  };

  const handleTeacherIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTeacherId([value]); // Set the teacherId state to the selected teacher
  };
  //     setTeacherId(value.split(",").map((id) => id.trim())); // Split by commas and trim spaces to handle multiple teacher IDs

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-md shadow-md">
      
      {/* Subject Name */}
      <label className="flex flex-col">
        Subject Name:
        <input
          type="text"
          value={subjectName}
          readOnly
        //   onChange={(e) => setSubjectName(e.target.value)}
          className="border p-2 rounded-md"
        />
      </label>

      {/* Subject Id */}
      <label className="flex flex-col">
        Subject Id:
        <input
          type="text"
          value={subjectId}
          readOnly
          className="border p-2 rounded-md"
        />
      </label>

      {/* Teacher Assigned
      <label className="flex flex-col">
        Teacher Assigned:
        <input
          type="text"
          value={teacherId.join(", ")}
          onChange={handleTeacherIdChange}
          className="border p-2 rounded-md"
          required
        />
      </label> */}
      {/* Teacher Assigned (Dropdown) */}
      <label className="flex flex-col">
        Teacher Assigned:
        <select
          value={teacherId[0] || ""}
          onChange={handleTeacherIdChange}
          className="border p-2 rounded-md"
        >
          <option value="">Select Teacher</option>
          {allTeachers.map((teacher) => (
            <option key={teacher} value={teacher}>
              {teacher}
            </option>
          ))}
        </select>
      </label>

      {/* Classes */}
      <fieldset className="border p-2 rounded-md">
        <legend className="font-semibold">Classes:</legend>
        {allClasses.map((className) => (
          <label key={className} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={classes.includes(className)}
              onChange={(e) => handleClassChange(className)}
            />
            {className}
          </label>
        ))}
      </fieldset>

      {/* Submit Button */}
      <div className="flex justify-between gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white p-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SubjectEditForm;
