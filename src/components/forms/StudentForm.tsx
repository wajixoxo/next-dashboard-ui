"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { collection, addDoc } from 'firebase/firestore';
import { db } from "@/firebaseConfig"; // Make sure you have your Firebase config properly set up

const schema = z.object({
  studentId: z
    .string()
    .min(1, { message: "Student ID is required!" })
    .max(4, { message: "Student ID must be at most 4 characters!" }),
  name: z.string().min(1, { message: "Name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  photo: z.string().url({ message: "Please provide a valid URL for the photo!" }).optional(),
  grade: z.enum(["1", "2", "3", "4", "5"], { message: "Grade is required!" }),
  class: z.string().min(1, { message: "Class is required!" }),
  address: z.string().min(1, { message: "Address is required!" }),
  phone: z
    .string()
    .max(12, { message: "Phone number cannot be more than 12 characters!" })
    .regex(/^\d+$/, { message: "Phone number must only contain digits!" })
    .optional(), // Optional but should follow the format and validation.
});

type Inputs = z.infer<typeof schema>;

const StudentForm = ({
  type,
  data,
  onSubmit,
}: {
  type: "create" | "edit";
  data?: any;
  onSubmit?: (data: any) => Promise<void>;
}) => {
  const [formVisible, setFormVisible] = useState(true); // State to control form visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset, // To reset the form if needed
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: data || {},
  });

  // Watch grade to dynamically update class options
  const grade = watch("grade");

  const classOptions = {
    "1": ["1A", "1B"],
    "2": ["2A", "2B"],
    "3": ["3A", "3B"],
    "4": ["4A", "4B"],
    "5": ["5A", "5B"],
  };

  // New function to handle form submission and store data in Firestore
  const handleFormSubmit = async (formData: Inputs) => {
    if (type === "create") {
      try {
        // Add student data to Firestore
        const docRef = await addDoc(collection(db, "students"), formData);
        console.log("Document written with ID: ", docRef.id);
        alert("Student created successfully!");

        // Log success message
        console.log("Data uploaded successfully!"); // New success log

        // Hide the form
        setFormVisible(false); // Hide the form after success

        // Reset the form fields
        reset();

        // Optionally reset the form with new default values if needed
        // reset({ studentId: "", name: "", email: "", photo: "", grade: "", class: "", address: "", phone: "" });

        // Optionally call onSubmit after successful submission
        if (onSubmit) {
          onSubmit(formData);
        }
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Failed to add student. Please try again.");
      }
    } else {
      // Handle update logic if needed
      if (onSubmit) {
        onSubmit(formData);
      }
    }
  };

  // If form is not visible, don't render it
  if (!formVisible) {
    return null; // Form is hidden
  }

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit(handleFormSubmit)} // Use the new handleFormSubmit function
    >
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a New Student" : "Update Student"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Student ID"
          name="studentId"
          defaultValue={data?.studentId}
          register={register}
          error={errors.studentId}
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
          defaultValue={data?.photo}
          register={register}
          // error={errors.photo}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("grade")}
            defaultValue={data?.grade}
          >
            <option value="" disabled>
              Select Grade
            </option>
            {["1", "2", "3", "4", "5"].map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {errors.grade?.message && (
            <p className="text-xs text-red-400">
              {errors.grade.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("class")}
            defaultValue={data?.class}
          >
            <option value="" disabled>
              Select Class
            </option>
            {grade &&
              classOptions[grade].map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
          </select>
          {errors.class?.message && (
            <p className="text-xs text-red-400">
              {errors.class.message.toString()}
            </p>
          )}
        </div>
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
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
