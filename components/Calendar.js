import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Link from "next/link";

// const events = [
//     { title: 'Meeting', start: new Date() }
// ]

export function CalendarComponent({ events }) {
  console.log(events);
  return (
    <div className="h-full">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay,dayGridMonth",
        }}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
}

// a custom render function
function renderEventContent(eventInfo) {
  // console.log(eventInfo);
  return (
    <Link
      className="p-1 text-sm"
      href="/event/[id]"
      as={`/event/${eventInfo.event.id}`}
      key={eventInfo.event.id}
    >
      <b>{eventInfo.timeText}</b>
      <p>{eventInfo.event.title}</p>
    </Link>
  );
}
