import {db} from "./firebaseConfig"; 
import { collection, addDoc } from 'firebase/firestore';

export const addStudentData = async (studentData: { name: string; age: number; grade: string }) => {
    try {
      // Specify the collection name (e.g., "students")
      const studentsCollection = collection(db, "students");
  
      // Add the student data to the Firestore collection
      const docRef = await addDoc(studentsCollection, studentData);
  
      console.log("Document written with ID: ", docRef.id);
      return docRef.id; // Return the document ID if needed
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error; // Rethrow the error for debugging purposes
    }
  };

  // Teacher data type
  type TeacherData = {
  teacherId: string;
  name: string;
  phone?: string;
  subjects: string[];
  classes: string[];
  address: string;
  photo?: string;
  email: string;
};

export const addTeacherData = async (teacherData: TeacherData) => {
  // { teacherId: string; name: string; subjects: string[];
  // classes: string[]; email: string; address: string;}) => {
      
  try {
        // Specify the collection name (e.g., "teachers")
        const teachersCollection = collection(db, "teachers");
    
        // Add the student data to the Firestore collection
        const docRef = await addDoc(teachersCollection, teacherData);
    
        console.log("Document written with ID: ", docRef.id);
        return docRef.id; // Return the document ID if needed
      } catch (error) {
        console.error("Error adding document: ", error);
        throw error; // Rethrow the error for debugging purposes
      }
    };
  
  