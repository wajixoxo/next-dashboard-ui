import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Make sure you have your Firebase config properly set up

const schema = z.object({
  // For each student, we'll save their grade for T3 and T4
  students: z.array(
    z.object({
      studentId: z.string(),
      gradeT3: z.number().nullable(),
      gradeT4: z.number().nullable(),
    })
  ),
});

type Inputs = z.infer<typeof schema>;

const GradeForm = ({
  classId,
  subjectId,
}: {
  classId: string;
  subjectId: string;
}) => {
  const [students, setStudents] = useState<any[]>([]); // This will hold the list of students
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  // Fetch students based on classId and subjectId
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsQuery = query(
          collection(db, "students"),
          where("class", "==", classId)
        );
        const querySnapshot = await getDocs(studentsQuery);
        const studentsData = querySnapshot.docs.map((doc) => doc.data());
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [classId]);

  // Handle form submission and save grades
  const handleFormSubmit = async (formData: Inputs) => {
    try {
      const gradeData = formData.students.map((student) => ({
        studentId: student.studentId,
        classId,
        subjectId,
        examScores: {
          T3: student.gradeT3,
          T4: student.gradeT4,
        },
        predictedScore: null, // You can add your own prediction logic here
        lastTestScore: null, // Use actual last test score
      }));

      // Add grades data to Firestore
      for (const grade of gradeData) {
        await addDoc(collection(db, "grades"), grade);
      }

      alert("Grades saved successfully!");
      reset(); // Reset form after saving
    } catch (error) {
      console.error("Error saving grades:", error);
      alert("Failed to save grades. Please try again.");
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(handleFormSubmit)}>
      <h1 className="text-xl font-semibold">Grade Entry for {classId} - {subjectId}</h1>
      <div className="flex flex-col gap-4">
        {students.length > 0 ? (
          students.map((student) => (
            <div key={student.studentId} className="flex items-center gap-4">
              <span>{student.name}</span>
              <input
                type="number"
                placeholder="T3 Grade"
                {...register(`students.${student.studentId}.gradeT3`)}
                className="p-2 rounded-md border"
              />
              <input
                type="number"
                placeholder="T4 Grade"
                {...register(`students.${student.studentId}.gradeT4`)}
                className="p-2 rounded-md border"
              />
            </div>
          ))
        ) : (
          <p>No students found for this class.</p>
        )}
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        Save Grades
      </button>
    </form>
  );
};

export default GradeForm;
