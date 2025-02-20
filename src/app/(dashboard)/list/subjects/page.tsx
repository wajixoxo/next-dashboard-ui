"use client";

import { useState, useEffect } from "react";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { db } from "@/firebaseConfig"; // Firestore configuration
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import FormModal from "@/components/FormModal";

const auth = getAuth();

type Teacher = {
  teacherId: string;
  name: string;
  classes: string[];
};

type Subject = {
  subjectId: string;
  name: string;
  teacherId: string[];
  classes: string[];
};

const columns = [
  { header: "Subject Name", accessor: "subjectName" },
  { header: "Teachers", accessor: "teachers" },
];

const SubjectListPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null); // Track the selected subject for editing
  const [isModalOpen, setModalOpen] = useState(false); // Track modal visibility
  const [allClass, setAllClass] = useState<string[]>([]);

  // Fetch subjects and teachers from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectsSnapshot = await getDocs(collection(db, "subjects"));
        const teachersSnapshot = await getDocs(collection(db, "teachers"));

        const fetchedSubjects = subjectsSnapshot.docs.map((doc) => ({
          subjectId: doc.id, // Document ID
          ...doc.data(), // Document data
        })) as Subject[];

        const fetchedTeachers = teachersSnapshot.docs.map((doc) => ({
          teacherId: doc.id, // Document ID
          ...doc.data(), // Document data
        })) as Teacher[];

        console.log("Fetched Subjects:", fetchedSubjects);
        console.log("Fetched Teachers:", fetchedTeachers);

        setSubjects(fetchedSubjects);
        setTeachers(fetchedTeachers);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        // Assuming you have a "class" collection in Firestore
        const classSnapshot = await getDocs(collection(db, "class"));
        const classList = classSnapshot.docs.map((doc) => doc.data().name);
        setAllClass(classList);
      } catch (error) {
        console.error("Error fetching classes: ", error);
      }
    };
  
    fetchClass();
  }, []);

  // Helper to format teachers string
  const formatTeachers = (teacherIds: string[], subjectClasses: string[]) => {
    if (!teacherIds || !Array.isArray(teacherIds)) return '';
    return teacherIds
      .map((id) => {
        const teacher = teachers.find((teacher) => teacher.teacherId === id);
        if (teacher) {
          const teacherClasses = teacher.classes
            .filter((cls) => subjectClasses.includes(cls))
            .join(", ");
          return `${teacher.name} (${teacherClasses})`;
        }
        return null;
      })
      .filter(Boolean)
      .join(", ");
  };

  // Format data for the table with search filtering
  const formattedSubjects = subjects
  .filter((subject) => {
    const subjectNameMatch = subject.name.toLowerCase().includes(search.toLowerCase());
    const teachersMatch = formatTeachers(subject.teacherId, subject.classes)
      .toLowerCase()
      .includes(search.toLowerCase());
    return subjectNameMatch || teachersMatch;
  })
  .map((subject) => ({
    subjectName: subject.name,
    teachers: formatTeachers(subject.teacherId, subject.classes),
  }));

   // Open the modal with the selected subject
   const handleEdit = (subject: Subject) => {
    setSelectedSubject(subject);
    setModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedSubject(null);
    setModalOpen(false);
  };

  // Function to render rows in the table
  const renderRow = (item: any) => (
    <tr
      key={item.subjectId}  // Use subjectName as the unique key (or subjectId)
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaSkyLight"
    >
      {/* Subject Name */}
      <td className="p-4">{item.subjectName}</td>
      {/* Teachers */}
      <td className="p-4">{item.teachers}</td>
      {/* Actions */}
      <td className="p-4">
      
      {/* <FormModal
            table="subject"
            type="edit"
            data={
              selectedSubject ? {
                subjectId: selectedSubject.subjectId,
                name: selectedSubject.name,
                teacherId: selectedSubject.teacherId.join(', '), // Convert array to comma-separated string for the modal
                classes: selectedSubject.classes,
              } : undefined // Handle null case
            }
            onClose={closeModal}
            onConfirm={() => {
              if (selectedSubject) {
            // teacherId is already an array, so no need to split it
            const updatedTeacherId = selectedSubject.teacherId.map((id: string) => id.trim());

                // Update the selectedSubject with the new teacherIds
                const updatedSubject = {
                  ...selectedSubject,
                  teacherId: updatedTeacherId, // Save as array
                };

                // Now save the updated subject data to Firestore
                const subjectRef = collection(db, 'subjects');
                const subjectDocRef = doc(subjectRef, selectedSubject.subjectId);

                // Update the Firestore document with the updated teacherId
                updateDoc(subjectDocRef, {
                  teacherId: updatedTeacherId,
                  name: updatedSubject.name,
                  classes: updatedSubject.classes,
                })
                  .then(() => {
                    console.log('Subject updated successfully');
                    closeModal();
                    // Optionally, refresh the data to reflect the changes
                    fetchData();
                  })
                  .catch((error) => {
                  console.error('Error updating subject: ', error);
                });
            }
          }}
        /> */}

      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Subjects</h1>
        <TableSearch value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={formattedSubjects} />

      {/* Render FormModal */}
      {isModalOpen && selectedSubject && (
        <FormModal
          table="subject"
          type="edit"
          data={selectedSubject} // Pass the selected subject data
          onClose={closeModal} // Handle modal close
          onConfirm={() => {
            closeModal();
            // Add logic to refresh the data after saving if needed
          }}
          allTeachers={teachers} // Pass the list of teachers
          allClasses={allClass} // Pass the list of classes
        
        />
      )}
    </div>
  );
};

export default SubjectListPage;
function fetchData() {
  throw new Error("Function not implemented.");
}

