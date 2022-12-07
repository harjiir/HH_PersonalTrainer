import { useEffect, useState } from 'react';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';

import './Calendar.css';

function MyCalendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => fetchTrainings(), []);

    // Fetch trainings from heroku
    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setEvents(eventFormat(data)))
            .catch(err => console.error(err))
    }

    const eventFormat = (list) => {
        const newEventList = list.map((event) => {
            return {
                start: moment(event.date).toDate(),
                end: moment(event.date).add(event.duration, 'm').toDate(),
                title: event.activity + ' - ' + event.customer?.firstname + ' ' + event.customer?.lastname
            }
        });
        return newEventList;
    }

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
                events={events}
                eventColor='#B67C9A'
                initialView='dayGridMonth'
                headerToolbar={{
                    left: 'title',
                    center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                    right: 'prev,next today'
                }}
                firstDay='1'
                height={700}
                timeZone='UTC'
                eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: false
                }}
            />
        </div>
    );
}

export default MyCalendar;