import { useState } from "react";
import { Calendar } from "./ui/calendar";

export default function ReadingCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  //   console.log(date);
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-center font-semibold">Reading Calendar</h3>
      <Calendar mode="single" selected={date} onSelect={setDate} />
    </div>
  );
}
