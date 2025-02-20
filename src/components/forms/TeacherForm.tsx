import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { collection, addDoc, doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import SubjectClassDropdown from "../SubjectClassDropdown";

// Zod schema definition
const schema = z.object({
  teacherId: z.string().min(1, { message: "Teacher ID is required!" }).max(4),
  name: z.string().min(1, { message: "Name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  photo: z.string().url().optional(),
  phone: z
    .string()
    .max(12, { message: "Phone number cannot be more than 12 characters!" })
    .regex(/^\d+$/, { message: "Phone number must only contain digits!" })
    .optional(),
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
  onSubmit,
}: {
  type: "create" | "edit";
  data?: any;
  onSubmit?: (data: any) => Promise<void>;
}) => {
  const [formVisible, setFormVisible] = useState(true);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (formData: Inputs) => {
    if (type === "create") {
      try {
        const combinedData = { ...formData, subjectId: subjects, classes };

        const docRef = await addDoc(collection(db, "teachers"), combinedData);
        alert("Teacher created successfully!");
        reset();

        // Update subjects collection for each selected subject
        subjects.forEach(async (subject) => {
          const subjectRef = doc(db, "subjects", subject);
          await updateDoc(subjectRef, {
            teachers: arrayUnion(docRef),
          });
        });

        // Update class collection for each class the teacher is linked to
        classes.forEach(async (classId) => {
          const classRef = doc(db, "class", classId);
          const classSnapshot = await getDoc(classRef);

          if (classSnapshot.exists()) {
            const classData = classSnapshot.data();
            subjects.forEach(async (subjectId) => {
              const subjectKey = subjectId;
              await updateDoc(classRef, {
                [`subjects.${subjectKey}.teacherIds`]: arrayUnion(docRef.id),
              });
            });
          }
        });

        setFormVisible(false);
        reset();
        if (onSubmit) onSubmit(combinedData);
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to add teacher. Please try again.");
      }
    } else if (onSubmit) {
      onSubmit(formData);
    }
  };

  if (!formVisible) return null;

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(handleFormSubmit)}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a New Teacher" : "Update Teacher"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Teacher ID"
          name="teacherId"
          defaultValue={data?.teacherId}
          register={register}
          error={errors.teacherId}
        />
        <InputField
          label="Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors.email}
        />
        <InputField
          label="Photo URL (optional)"
          name="photo"
          defaultValue={data?.photo || ""}
          register={register}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Phone (e.g., 60123456789)"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <SubjectClassDropdown
          subjects={subjects}
          classes={classes}
          setSubjects={setSubjects}
          setClasses={setClasses}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md mt-4">
        {type === "create" ? "Create Teacher" : "Update Teacher"}
      </button>
    </form>
  );
};

export default TeacherForm;
