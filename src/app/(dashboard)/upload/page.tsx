"use client";
import React from "react";
import UploadStudentData from "@/components/UploadStudentData"; // Ensure this path is correct

const UploadButton = () => {
  const handleUpload = async () => {
    try {
      await UploadStudentData(); // Calls the function to upload the student data
      alert("Data uploaded successfully!");
    } catch (error) {
      alert("Error uploading data: ");
    }
  };

  return (
    <div>
      <button onClick={handleUpload}>Upload Grades Data to Firebase</button>
    </div>
  );
};

export default UploadButton;
