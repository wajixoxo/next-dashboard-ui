"use client";
import { db } from "@/firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

const events = [
  {
    eventId: 1,
    title: "Chinese New Year",
    time: "Wednesday, 29 Jan 2025",
    description: "Happy Chinese New Year and Happy Holiday to everyone.",
  },
  {
    eventId: 2,
    title: "PIBG Meeting",
    time: "Tuesday, 4 Feb 2025",
    description: "Mandatory attendance for every staff member.",
  },
  {
    eventId: 3,
    title: "Ramadhan Fasting Month",
    time: "Friday, 28 Feb 2025",
    description: "Buka Puasa Event will occur in Ramadhan at the hall and cafeteria.",
  },
];

const UploadStudentData = async () => {
  try {
    for (const data of events) {
      // Convert eventId to a string
      await setDoc(doc(db, "events", data.eventId.toString()), data);
    }
    console.log("Data uploaded successfully!");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error uploading data:", error.message);
    } else {
      console.error("Unknown error occurred.");
    }
  }
};

export default UploadStudentData;
