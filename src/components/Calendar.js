import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar() {
    const [date, setDate] = useState(new Date());

    return (
        <div className='app'>
            <div className='calendar-container'>
                <p className='text-center'>
                    <span className='bold'>Selected Date:</span>{' '}
                    {date.toDateString()}
                </p>
                <Calendar onChange={setDate} value={date} />
            </div>
        </div>
    );
}

export default MyCalendar;