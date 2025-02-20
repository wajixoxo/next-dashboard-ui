// import React, { useState, useEffect } from "react";

// const studentData =[
//     {
//       "studentId": "2230",
//       "name": "Ethan Lee",
//       "class": "2A",
//       "sex": "male"
//     },
//     {
//       "studentId": "2231",
//       "name": "Olivia Ng",
//       "class": "2A",
//       "sex": "female"
//     },
//     {
//       "studentId": "2232",
//       "name": "Noah Yap",
//       "class": "2A",
//       "sex": "male"
//     },
//     {
//       "studentId": "2233",
//       "name": "Chloe Teo",
//       "class": "2A",
//       "sex": "female"
//     },
//     {
//       "studentId": "2227",
//       "name": "Sophia Lim",
//       "class": "2A",
//       "sex": "female"
//     },
//     {
//       "studentId": "2228",
//       "name": "Liam Tan",
//       "class": "2A",
//       "sex": "male"
//     },
//     {
//       "studentId": "2229",
//       "name": "Emily Wong",
//       "class": "2A",
//       "sex": "female"
//     },
//     {
//       "studentId": "2234",
//       "name": "Jake Tan",
//       "class": "2A",
//       "sex": "male"
//     },
//     {
//       "studentId": "2235",
//       "name": "Maya Lee",
//       "class": "2A",
//       "sex": "female"
//     },
//     {
//       "studentId": "2236",
//       "name": "Max Tan",
//       "class": "2A",
//       "sex": "male"
//     },
//     {
//       "studentId": "2237",
//       "name": "Sophie Lim",
//       "class": "2A",
//       "sex": "female"
//     },
//     {
//       "studentId": "2238",
//       "name": "Daniel Lee",
//       "class": "2A",
//       "sex": "male"
//     },
//     {
//       "studentId": "2239",
//       "name": "Lena Tan",
//       "class": "2A",
//       "sex": "female"
//     },
//     {
//       "studentId": "2240",
//       "name": "Riley Ng",
//       "class": "2A",
//       "sex": "male"
//     },
//     {
//       "studentId": "3011",
//       "name": "Joanna Ting",
//       "class": "5B",
//       "sex": "female"
//     },
//     {
//       "studentId": "3012",
//       "name": "Farah Natasha",
//       "class": "5B",
//       "sex": "female"
//     },
//     {
//       "studentId": "3013",
//       "name": "Jeffrey Nyipa",
//       "class": "5B",
//       "sex": "male"
//     },
//     {
//       "studentId": "3014",
//       "name": "Noraini Yusuf",
//       "class": "5B",
//       "sex": "female"
//     },
//     {
//       "studentId": "3015",
//       "name": "Matthew Anak Jabu",
//       "class": "5B",
//       "sex": "male"
//     },
//     {
//       "studentId": "3016",
//       "name": "Hui Min Tan",
//       "class": "5B",
//       "sex": "female"
//     },
//     {
//       "studentId": "3017",
//       "name": "Dinesh Kumar",
//       "class": "5B",
//       "sex": "male"
//     },
//     {
//       "studentId": "3018",
//       "name": "Siti Nurhaliza",
//       "class": "5B",
//       "sex": "female"
//     }
//   ];
//   interface AttendanceFormProps {
//     selectedClass: string;
//   }
  
//   const AttendanceForm: React.FC<AttendanceFormProps> = ({ selectedClass }) => {
//     const [formData, setFormData] = useState({ studentId: "", present: false });
  
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value, type, checked } = e.target;
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     };
  
//     const handleSubmit = (e: React.FormEvent) => {
//       e.preventDefault();
//       console.log("Form submitted for class:", selectedClass, formData);
//     };
  
//     return (
//       <form onSubmit={handleSubmit} className="attendance-form">
//         <h2>Attendance for Class {selectedClass}</h2>
//         <div>
//           <label htmlFor="studentId">Student ID</label>
//           <input
//             type="text"
//             id="studentId"
//             name="studentId"
//             value={formData.studentId}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="present">Present</label>
//           <input
//             type="checkbox"
//             id="present"
//             name="present"
//             checked={formData.present}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     );
//   };
  
//   export default AttendanceForm;