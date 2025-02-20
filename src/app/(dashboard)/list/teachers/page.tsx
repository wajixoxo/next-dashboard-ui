"use client";

import { useState, useEffect } from "react";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import Image from "next/image";
import TeacherDropdown from "@/components/TeacherDropdown"; // Import the TeacherDropdown
import FormModal from "@/components/FormModal";
import { addTeacherData } from "@/firestoreUtils";
import { db } from "@/firebaseConfig";  // Import the Firestore database
import { deleteDoc, collection, getDocs, doc } from "firebase/firestore";  // Firestore query functions
import { getAuth } from "firebase/auth";
import TeacherForm from "@/components/forms/TeacherForm";


const auth = getAuth();

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

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Teacher ID",
    accessor: "teacherId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
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

const TeacherListPage = () => {
  // Manage selected subject and grade states
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedClass, setSelectedClass] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [teacherIdToDelete, setTeacherIdToDelete] = useState<string | null>(null);
  const [search, setSearch] = useState("");


  // Fetch students data from Firestore when the component mounts
    useEffect(() => {
      const fetchTeachers = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "teachers"));  // Get teachers from Firestore
          const fetchedTeachers = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              teacherId: data.teacherId || "",
              name: data.name || "",
              photo: data.photo || "/avatar.png",
              subjects: data.subjectId || [],
              classes: data.classes || [],
              address: data.address || "",
              phone: data.phone || "",
              email: data.email || "",
            };
          });
          setTeachers(fetchedTeachers);
        } catch (error) {
          console.error("Error fetching teachers: ", error);
        }
      };

      fetchTeachers();
    }, []); 

    const filteredTeachers = teachers.filter((teacher) => {
      // Handle the subject and class filters
      const subjectMatch = selectedSubject === "All" || teacher.subjects.includes(selectedSubject);
      const classMatch = selectedClass === "All" || teacher.classes.some((cls) => cls.includes(selectedClass));
    
      // Check if the search term is present in any of the teacher fields (name, email, phone, address)
      const searchMatch =
        (teacher.name.toLowerCase().includes(search.toLowerCase())) ||
        (teacher.teacherId.toLowerCase().includes(search.toLowerCase())) ||
        (teacher.email?.toLowerCase().includes(search.toLowerCase())) ||
        (teacher.email?.toLowerCase().includes(search.toLowerCase())) ||
        (teacher.phone?.toLowerCase().includes(search.toLowerCase())) ||
        (teacher.address?.toLowerCase().includes(search.toLowerCase()));
    
      // Both conditions (class, subject) and search term must match
      return subjectMatch && classMatch && searchMatch;
    });
    

  const handleCreateTeacher = async (data: Teacher) => {
    try {
      const newTeacherId = await addTeacherData(data);
      setTeachers((prev) => [
        ...prev,
        { ...data, teacherId: newTeacherId }, // Add new teacher to the state
      ]);
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Failed to add teachers:", error);
    }
  };

  const handleDeleteTeacher = async (id: string) => {
    try {
      const teacherDocRef = doc(db, "teachers", id);
      await deleteDoc(teacherDocRef);  // Delete the teacher document
      setTeachers((prev) => prev.filter((teacher) => teacher.teacherId !== id));  // Remove from local state
      setIsModalOpen(false);  // Close the modal
    } catch (error) {
      console.error("Error deleting teacher: ", error);
    }
  };

  const handleOpenDeleteModal = (id: string) => {
    setTeacherIdToDelete(id);  // Set the teacher ID to be deleted
    setIsModalOpen(true);  // Open the modal
  };

  const renderRow = (item: Teacher) => (
    <tr
      key={item.teacherId}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaSkyLight"
    >
      <td className="flex items-center gap-4 p-4 rounded-full ">
      <Image
          src={item.photo || "/avatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      
    {/* Medium screens: Teacher ID and Subjects */}
    <td className="hidden md:table-cell">{item.teacherId}</td>
    <td className="hidden md:table-cell">{item.subjects.join(", ")}</td>
    <td className="hidden md:table-cell">{item.classes.join(", ")}</td>
    <td className="hidden md:table-cell">{item.phone}</td>
    <td className="hidden md:table-cell">{item.address}</td>

      <td>
        <div className="flex items-center gap-2">

          {/* {role === "admin" && (
            <>
             <button
              onClick={() => {
                setTeacherIdToDelete(item.teacherId);
                setIsModalOpen(true); // Open the modal
                handleOpenDeleteModal(item.teacherId)
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-full bg-lamaPurple hover:bg-red-600`}
              >
              <Image src="/delete.png" alt="Delete" width={14} height={14} />
            </button>
             {/* Directly pass type="delete" and studentId to FormModal */}
             {/* {isModalOpen && teacherIdToDelete === item.teacherId && (
              <FormModal
                table="teacher"
                type="delete"
                id={item.teacherId}
                onClose={() => setIsModalOpen(false)} // Close the modal
                onConfirm={() => handleDeleteTeacher(item.teacherId)}
              />
          )}
        </> */}
        {/* )} */} 
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
      <h1 className="hidden md:block text-lg font-semibold">
          {selectedSubject === "All" && selectedClass === "All"
            ? "All Teachers"
            : `${selectedSubject} - ${selectedClass} Teachers`}
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
              // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              //   <Image src="/plus.png" alt="" width={14} height={14} />
              // </button>
              <FormModal table="teacher" type="create"/>
            )}
          </div>
        </div>
      </div>

      {/* Teacher Dropdowns */}
      {isDropdownOpen && (
      <TeacherDropdown
      selectedSubject={selectedSubject}
      setSelectedSubject={setSelectedSubject}
      selectedClass={selectedClass}
      setSelectedClass={setSelectedClass}
      isDropdownOpen={isDropdownOpen}
      setIsDropdownOpen={setIsDropdownOpen}
      teachersData={teachers}  // <-- Corrected the prop
      />
    )}


      {/* Teacher List */}
      <Table columns={columns} renderRow={renderRow} data={filteredTeachers} />

    
          {/* Modal for TeacherForm */}
          {isModalOpen && (
        <FormModal table="teacher" type="create" onClose={() => setIsModalOpen(false)}>
          <TeacherForm type="create" onSubmit={handleCreateTeacher} />
        </FormModal>
      )}
    </div>
  );
};

export default TeacherListPage;
