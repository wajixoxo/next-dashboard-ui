import { useState } from "react";

// Teacher type
type Teacher = {
  teacherId: string;
  name: string;
  phone?: string;
  subjects: string[];
  classes: string[];
  address: string;
  photo?: string;
  email: string;
};

type TeacherDropdownProps = {
  selectedSubject: string;
  setSelectedSubject: React.Dispatch<React.SetStateAction<string>>;
  selectedClass: string;  // Change name here to `selectedClass`
  setSelectedClass: React.Dispatch<React.SetStateAction<string>>;  // Change name here to `setSelectedClass`
  isDropdownOpen: boolean;  
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;  
  teachersData: Teacher[];  
};

const TeacherDropdown: React.FC<TeacherDropdownProps> = ({
  selectedSubject,
  setSelectedSubject,
  selectedClass,  // Change name here to `selectedClass`
  setSelectedClass,  // Change name here to `setSelectedClass`
  isDropdownOpen,
  setIsDropdownOpen,
  teachersData,
}) => {
  const [isSubjectDropdownOpen, setIsSubjectDropdownOpen] = useState<boolean>(false);
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState<boolean>(false);  // Change name here to `isClassDropdownOpen`

  // Deduplicate subjects using Set
  const allSubjects = new Set<string>();
teachersData.forEach((teacher) => {
  // Check if teacher.subjects is defined and is an array
  if (teacher.subjects && Array.isArray(teacher.subjects)) {
    teacher.subjects.forEach((subject) => allSubjects.add(subject));
  }
});

  const uniqueSubjects = Array.from(allSubjects); // Convert Set back to Array

  // Deduplicate classes (not grades) using Set
  const allClasses = new Set<string>();
  teachersData.forEach((teacher) => {
    teacher.classes.forEach((cls) => allClasses.add(cls));  // `cls` represents classes
  });
  const uniqueClasses = Array.from(allClasses); // Convert Set back to Array

  return (
    <div className="mt-2 text-gray-700 flex gap-5">
      {/* Subject Dropdown */}
      <div className="relative inline w-[45%] mt-2">
        <label htmlFor="subjectSelect" className="text-m text-gray-700 mr-2">
          Select Subject:
        </label>
        <button
          className="w-full px-4 py-2 text-left border rounded-md bg-white border-gray-300 shadow-md flex justify-between items-center"
          onClick={() => setIsSubjectDropdownOpen(!isSubjectDropdownOpen)}
        >
          {selectedSubject}{" "}
          <i
            className={`fas fa-caret-${isSubjectDropdownOpen ? "up" : "down"}`}
          />
        </button>
        {isSubjectDropdownOpen && (
          <div className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <button
              className="w-full px-4 py-2 text-left hover:bg-[#A9D4F5]"
              onClick={() => {
                setSelectedSubject("All");
                setIsSubjectDropdownOpen(false);
              }}
            >
              All
            </button>
            {uniqueSubjects.map((subject) => (
              <button
                key={subject}
                className="w-full px-4 py-2 text-left hover:bg-[#A9D4F5]"
                onClick={() => {
                  setSelectedSubject(subject);
                  setIsSubjectDropdownOpen(false);
                }}
              >
                {subject}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Class Dropdown */}
      <div className="relative inline-block w-[45%] mt-2">
        <label htmlFor="classSelect" className="text-m text-gray-700 mr-2 ml-4">
          Select Class: {/* Changed label to "Select Class" */}
        </label>
        <button
          className="w-full px-4 py-2 text-left border rounded-md bg-white border-gray-300 shadow-md flex justify-between items-center"
          onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}  // Changed to `isClassDropdownOpen`
        >
          {selectedClass}{" "}  {/* Changed to `selectedClass` */}
          <i
            className={`fas fa-caret-${isClassDropdownOpen ? "up" : "down"}`}
          />
        </button>
        {isClassDropdownOpen && (  // Changed to `isClassDropdownOpen`
          <div className="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <button
              className="w-full px-4 py-2 text-left hover:bg-[#A9D4F5]"
              onClick={() => {
                setSelectedClass("All");  // Changed to `setSelectedClass`
                setIsClassDropdownOpen(false);  // Changed to `setIsClassDropdownOpen`
              }}
            >
              All
            </button>
            {uniqueClasses.map((cls) => (  // `cls` represents class
              <button
                key={cls}
                className="w-full px-4 py-2 text-left hover:bg-[#A9D4F5]"
                onClick={() => {
                  setSelectedClass(cls);  // Changed to `setSelectedClass`
                  setIsClassDropdownOpen(false);  // Changed to `setIsClassDropdownOpen`
                }}
              >
                {cls}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDropdown;
