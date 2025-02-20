"use client";
import { getAuth } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";  // Import Firestore deleteDoc function
import { auth, db } from "@/firebaseConfig";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import TeacherForm from "./forms/TeacherForm";
import StudentForm from "./forms/StudentForm";
import SubjectEditForm from "./forms/SubjectEditForm";
import GradeForm from "./forms/GradeForm";

const forms:
 {
  [key: string]: (type: "create" | "edit", data?: any, onClose?: () => void, onSubmit?: (updatedData: any) => void) => JSX.Element;
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  subject: (type, data, onClose, onSubmit) => (
    <SubjectEditForm type={type} data={data} onClose={onClose} onSubmit={onSubmit} allTeachers={[]} allClasses={[]} />
  ),

};

interface Teacher {
  teacherId: string;
  name: string;
  classes: string[]; // Classes assigned to the teacher
}

const FormModal = ({
  table,
  type,
  data,
  id,
  onClose,
  onConfirm,
  allTeachers = [], // Default empty array
  allClasses = [], // Default empty array
}: {
  table:
    | "teacher"
    | "student"
    | "subject"
    | "class"
    | "grades"
    | "lesson"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "edit" | "delete";
  data?: any;
  id?: string | null;
  children?: React.ReactNode;
  onClose?: () => void;
  onConfirm?: () => void;
  allTeachers?: Teacher[];
  allClasses?: string[];
}) => {
  const [formData, setFormData] = useState(data || {});
  const [open, setOpen] = useState(false);

  const size = "w-8 h-8";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "edit"
      ? "bg-lamaYellow"
      : "bg-lamaPurple";

  // Delete the student from Firestore
  const handleDelete = async () => {
    if (!auth.currentUser) {
      alert("User is not authenticated. Please log in first.");
    }
    
    if (id && onConfirm) {
      try {
        await deleteDoc(doc(db, table, id));   // Delete the document
        setOpen(false);  // Close the modal
        alert("Data deleted successfully!");
        if (onClose) onClose();  // Call onClose to refresh the student list
      } catch (error) {
        console.error("Error deleting student: ", error);
      }
    }
  };
  
  // const Form = () => {
  //   return type === "delete" && id ? (
  //     <form action="" className="p-4 flex flex-col gap-4">
  //       <span className="text-center font-medium">
  //         All data will be lost. Are you sure you want to delete this {table}?
  //       </span>
  //       <button 
  //       type = "button"
  //       className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
  //       onClick={handleDelete}
  //       >
  //         Delete
  //       </button>
  //     </form>
  //   ) : type === "create" || type === "edit" ? (
  //     forms[table](type, data)
  //   ) : (
  //     "Form not found!"
  //   );
  // };

  const Form = () => {
    
    if (type === "delete" && id) {
      
      return (
        <form action="" className="p-4 flex flex-col gap-4">
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this {table}?
          </span>
          <button
            type="button"
            className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center"
            onClick={handleDelete}
          >
            Delete
          </button>
        </form>
      );
    } else if (type === "create" || type === "edit") {
      // Handle both 'create' and 'edit' types for the 'subject' form
      if (table === "subject") {
        return (
          <SubjectEditForm
            data={data}
            type={type}
            onSubmit={(updatedData) => {
              console.log("Updated Subject Data:", updatedData);
              setOpen(false);
            } }
            onClose={onClose || (() => { })} // Provide a default no-op function if onClose is undefined
            allTeachers={[]} 
            allClasses={[]}      
      />
        );
      } 
      // if (table === "grades") {
      //   return (
      //     <GradeForm
      //       type={type}
      //       data={data}
      //       onSubmit={(updatedData: any) => {
      //         console.log("Grade Data:", updatedData);
      //         setOpen(false);
      //       }}
      //       onClose={onClose}
      //     />
      //   );
      // } 
      else {
        return forms[table]?.(type, data, onClose, onConfirm) || "Form not found!";
      }
    } else {
      return "Form not found!";
    }
  };

  return (
    <>
      {type === "delete" ? (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              
              onClick={onClose}
            >
              <Image src="/close.png" alt="" width={14} height={14} />
            </div>
          </div>
        </div>
      ) : (
        <>
          <button
            className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
            onClick={() => setOpen(true)}
          >
            <Image src={`/${type}.png`} alt="" width={16} height={16} />
          </button>
          {open && (
            <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
                <Form />
                <div
                  className="absolute top-4 right-4 cursor-pointer"
                  // onClick={onClose}
                  onClick={() => setOpen(false)}
                >
                  <Image src="/close.png" alt="" width={14} height={14} />
                  
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
//OPTION OLD
  // return (
  //   <>
  //     <button
  //       className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
  //       onClick={() => setOpen(true)}
  //     >
  //       <Image src={`/${type}.png`} alt="" width={16} height={16} />
  //     </button>
  //     {open && (
  //       <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
  //         <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
  //           <Form />
  //           <div
  //             className="absolute top-4 right-4 cursor-pointer"
              
  //             onClick={() => setOpen(false)}
  //           >
  //             <Image src="/close.png" alt="" width={14} height={14} />
  //           </div>
  //         </div>
  //       </div>
  //     )} 
  //   </>
  // );
  
  
};

export default FormModal;