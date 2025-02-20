import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
// import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export const resultsData = [
    { id: 1, subject: "Math", class: "1A", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 90 },
    { id: 2, subject: "English", class: "2A", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 87 },
    { id: 3, subject: "Science", class: "3A", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 75 },
    { id: 4, subject: "Social Studies", class: "1B", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 65 },
    { id: 5, subject: "Art", class: "4A", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 55 },
    { id: 6, subject: "Music", class: "5A", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 40 },
    { id: 7, subject: "History", class: "6A", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 30 },
    { id: 8, subject: "Math", class: "1B", teacher: "John Doe", student: "Kiera", date: "2025-01-01", type: "exam", score: 33 },
    { id: 9, subject: "Physics", class: "7A", teacher: "John Doe", student: "John Doe", date: "2025-01-01", type: "exam", score: 78 },
    { id: 10, subject: "Math", class: "1B", teacher: "John Doe", student: "Amanda", date: "2025-01-01", type: "exam", score: 90 },
  ];

const SpecificClassPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSkyLight py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3  self-center">
            <Image src="/class1.png" alt="" width={130} height={130} />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <h1 className="text-xl font-semibold">Class 1B</h1>
                {/* {role === "admin" && <FormModal
                  table="teacher"
                  type="update"
                  data={{
                    id: 1,
                    username: "deanguerrero",
                    email: "deanguerrero@gmail.com",
                    password: "password",
                    firstName: "Dean",
                    lastName: "Guerrero",
                    phone: "+1 234 567 89",
                    address: "1234 Main St, Anytown, USA",
                    bloodType: "A+",
                    dateOfBirth: "2000-01-01",
                    sex: "male",
                    img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                  }}
                />} */}
             
              </div>
              <h2 className="mt-0 mb-0 p-0 text-xl text-gray-700 font-semibold">Mathematics</h2>
              <div className="mt-0 flex justify-between flex-wrap text-s font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/student.png" alt="" width={14} height={14} />
                  <span>25</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/teacher.png" alt="" width={14} height={14} />
                  <span>Jessica Ahmad</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>jessica.a@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>+1 234 567</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex flex-col gap-4 h-full">
            {/* CARD 1 */}
            <div className="bg-white p-7 rounded-md flex gap-4 w-full shadow">
                <Image
                src="/singleAttendance.png"
                alt=""
                width={40}
                height={40}
                className="w-8 h-8"
                />
                <div>
                <h1 className="text-l font-semibold">90%</h1>
                <span className="text-md text-gray-600">Attendance</span>
                </div>
            </div>
            {/* CARD 2 */}
            <div className="bg-white p-7 rounded-md flex gap-4 w-full shadow">
                <Image
                src="/grading.png"
                alt=""
                width={40}
                height={40}
                className="w-8 h-8"
                />
                <div>
                <h1 className="text-l font-semibold">B+</h1>
                <span className="text-md text-gray-600">Average Grade</span>
                </div>
            </div>
            {/* CARD 3
            <div className="bg-white p-4 rounded-md flex gap-4 w-full shadow">
                <Image
                src="/singleLesson.png"
                alt=""
                width={30}
                height={30}
                className="w-6 h-6"
                />
                <div>
                <h1 className="text-l font-semibold">6</h1>
                <span className="text-sm text-gray-600">Lessons</span>
                </div>
            </div> */}
            </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Class 1B&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-700">
            <Link className="p-3 rounded-md bg-[#FAE27C]" href="/">
            Class 1B&apos;s Grade
            </Link> 
            <Link className="p-3 rounded-md bg-lamaPurpleLight" href="/">
              Your Schedule
            </Link>
            <Link className="p-3 rounded-md bg-[#C6C2FF]" href="/">
              Class Student List
            </Link>
            <Link className="p-3 rounded-md bg-lamaYellowLight" href="/">
              Class 1B&apos;s Attendance
            </Link>
            <Link className="p-3 rounded-md bg-lamaSky" href="/">
              Class 1B&apos;s Lessons
            </Link>
          </div>
        </div>
        <Performance resultsData={resultsData} />
        <Announcements />
      </div>
    </div>
  );
};

export default SpecificClassPage;