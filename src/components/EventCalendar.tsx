"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

// TEMPORARY
const events = [
  {
    id: 1,
    title: "Chinese New Year",
    time: "Wednesday, 29 Jan 2025",
    description: "Happy Chinese New Year and Happy Holiday to everyone.",
  },
  {
    id: 2,
    title: "PIBG Meeting",
    time: "Tuesday, 4 Feb 2025",
    description: "Mandatory attendance for every staff member.",
  },
  {
    id: 3,
    title: "Ramadhan Fasting Month",
    time: "Friday, 28 Feb 2025",
    description: "Buka Puasa Event will occur in Ramadhan at the hall and cafeteria.",
  },
];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [isClient, setIsClient] = useState(false);

  // Ensuring client-only rendering (avoids hydration mismatch)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Convert event time string to Date object for consistency
  const parsedEvents = events.map((event) => ({
    ...event,
    time: new Date(event.time), // Convert string to Date using JavaScript's Date constructor
  }));

  // Return null until the client-side is ready to render
  if (!isClient) return null;

  // Date formatting options to display "Wednesday, 29/1/2025"
  const formatEventDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      weekday: "long",   // e.g., "Wednesday"
      day: "numeric",    // e.g., "29"
      month: "numeric",  // e.g., "1"
      year: "numeric",   // e.g., "2025"
    });
  };

  return (
    <div className="bg-white p-4 rounded-md border-4">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {parsedEvents.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurpleLight"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600 mr-1">{event.title}</h1>
              <span className="text-gray-500 text-xs ">
                {formatEventDate(event.time)} {/* Format the date */}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
