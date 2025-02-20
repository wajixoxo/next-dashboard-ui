"use client";

import { useState, useEffect } from "react";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import Image from "next/image";
import StudentDropdown from "@/components/StudentDropdown"; // Import the dropdown component
import FormModal from "@/components/FormModal";
import StudentForm from "@/components/forms/StudentForm";
import { addStudentData } from "@/firestoreUtils";
import { db } from "@/firebaseConfig";  // Import the Firestore database
import { deleteDoc, collection, getDocs, doc } from "firebase/firestore";  // Firestore query functions
import { getAuth } from "firebase/auth";

const auth = getAuth();

type Student = {
  studentId: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  grade: number;
  class: string;
  address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
];

const StudentListPage = () => {
  const [selectedClass, setSelectedClass] = useState<string>("All");
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState<string | null>(null);
  const [search, setSearch] = useState("");


  // Fetch students data from Firestore when the component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));  // Get students from Firestore
        const fetchedStudents = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            studentId: data.studentId || "",
            name: data.name || "",
            photo: data.photo || "",
            grade: Number(data.grade) || 0,
            class: data.class || "",
            address: data.address || "",
            phone: data.phone || "",
          };
        });
        setStudents(fetchedStudents);
      } catch (error) {
        console.error("Error fetching students: ", error);
      }
    };

    fetchStudents();
  }, []); 

  const filteredStudents = students.filter((student) => {
    // Case-insensitive comparison for selectedClass
    const classMatch = selectedClass === "All" || student.class.toLowerCase().includes(selectedClass.toLowerCase());
  
    // Check if the search term is present in any of the student fields (name, class, address, phone)
    const searchMatch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.class.toLowerCase().includes(search.toLowerCase()) ||
      student.studentId.toLowerCase().includes(search.toLowerCase()) ||
      student.address.toLowerCase().includes(search.toLowerCase()) ||
      student.phone?.toLowerCase().includes(search.toLowerCase());
  
    return classMatch && searchMatch;
  });
  


  const handleCreateStudent = async (data: any) => {
    try {
      const newStudentId = await addStudentData(data);
      setStudents((prev) => [
        ...prev,
        { ...data, id: newStudentId }, // Add new student to the state
      ]);
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      const studentDocRef = doc(db, "students", id);
      await deleteDoc(studentDocRef);  // Delete the student document
      setStudents((prev) => prev.filter((student) => student.studentId !== id));  // Remove from local state
      setIsModalOpen(false);  // Close the modal
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setStudentIdToDelete(id);  // Set the student ID to be deleted
    setIsModalOpen(true);  // Open the modal
  };

  const renderRow = (item: Student) => (
    <tr
      key={item.studentId}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaSkyLight"
    >
       {/* Name and Photo */}
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.photo}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class}</p>
        </div>
      </td>
      {/* Hidden Columns for Larger Screens */}
      <td className="hidden md:table-cell">{item.studentId}</td>
      <td className="hidden md:table-cell">{item.class}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      </tr>
  );
        {/* Action Buttons */}
        {/* <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
             <button
              onClick={() => {
                setStudentIdToDelete(item.studentId);
                setIsModalOpen(true); // Open the modal
                handleOpenDeleteModal(item.studentId)
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-full bg-lamaPurple hover:bg-red-600`}
              >
              <Image src="/delete.png" alt="Delete" width={14} height={14} />
            </button>
             {/* Directly pass type="delete" and studentId to FormModal */}
        //      {isModalOpen && studentIdToDelete === item.studentId && (
        //       <FormModal
        //         table="student"
        //         type="delete"
        //         id={item.studentId}
        //         onClose={() => setIsModalOpen(false)} // Close the modal
        //         onConfirm={() => handleDeleteStudent(item.studentId)}
        // //       />
        //   )}
        // </>
        // )}
        // </div> */}
      
  

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          {selectedClass === "All" ? "All Students" : `${selectedClass} Students`}
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
        <TableSearch value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="flex items-center gap-4 self-end">
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)} // Toggle dropdown visibility
              className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow"
              >
               <Image src="/filter.png" alt="" width={14} height={14} />
               </button>

            {role === "admin" && (
              <FormModal table="student" type="create"/>
            )}
          </div>
        </div>
      </div>

      {/* Use StudentDropdown */}
      {isDropdownOpen && (
      <StudentDropdown
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        studentsData={students} // Pass the studentsData prop
      />
    )}

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={filteredStudents} />

    
      {/* Modal for StudentForm */}
      {isModalOpen && (
        <FormModal table="student" type="create" onClose={() => setIsModalOpen(false)}>
          <StudentForm type="create" onSubmit={handleCreateStudent} />
        </FormModal>
      )}
    </div>
  );
};

export default StudentListPage;
