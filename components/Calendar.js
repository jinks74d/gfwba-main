import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Link from 'next/link'

// const events = [
//     { title: 'Meeting', start: new Date() }
// ]

export function DemoApp({ events }) {
    console.log(events)
    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView='dayGridMonth'
                weekends={false}
                events={events}
                eventContent={renderEventContent}
            />
        </div>
    )
}

// a custom render function
function renderEventContent(eventInfo) {
    console.log(eventInfo)
    return (
        <Link href='/event/[id]' as={`/event/${eventInfo.event.id}`} key={eventInfo.event.id}>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </Link>
    )
}