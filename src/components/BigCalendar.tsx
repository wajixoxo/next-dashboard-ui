
"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import * as moment from "moment";
import { calendarEvents } from "@/lib/data"; // Adjust the path if necessary
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

// Configure Moment to start the week on Monday
moment.updateLocale("en", {
  week: {
    dow: 1, // 0 for Sunday, 1 for Monday, etc.
  },
});

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]} // Ensure the work_week view is enabled
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 8, 0, 0)} // Set the start time for work hours
      max={new Date(2025, 1, 0, 17, 0, 0)} // Set the end time for work hours
      formats={{
        weekdayFormat: "dddd", // Show full weekday names (Monday, Tuesday, etc.)
        dayFormat: "D", // Optional: Display only the day number
      }}
    />
  );
};

export default BigCalendar;
