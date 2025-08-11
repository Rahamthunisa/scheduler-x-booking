'use client'
import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewDay, createViewMonthAgenda, createViewMonthGrid, createViewWeek } from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createCalendarControlsPlugin } from '@schedule-x/calendar-controls'
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createResizePlugin } from '@schedule-x/resize'
import '@schedule-x/theme-default/dist/index.css'
import { useState } from 'react'

const DOCTORS = [
  { id: 'dr-smith', name: 'Dr. Smith' },
  { id: 'dr-lee', name: 'Dr. Lee' },
  { id: 'dr-jones', name: 'Dr. Jones' }
]

export default function BookingSchedule() {
  const eventsService = useState(() => createEventsServicePlugin())[0]
  const calendarControls = useState(() => createCalendarControlsPlugin())[0]
  const eventModal = useState(() => createEventModalPlugin())[0]
  const resizePlugin = useState(() => createResizePlugin())[0]

  const [doctorId, setDoctorId] = useState(DOCTORS[0].id)
  const [events, setEvents] = useState([
    { id: '1', title: 'Event 1', start: '2023-12-16', end: '2023-12-16', doctorId: 'dr-smith' }
  ])

  const calendar = useNextCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda()
    ],
    events,
    plugins: [eventsService, calendarControls, eventModal, resizePlugin],
    callbacks: {

    }
  })



  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: '#f6f8fa', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '2.5rem 2rem 1.5rem 2rem', background: '#fff', boxShadow: '0 2px 12px rgba(60,60,80,0.04)' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0, color: '#2a2a40', letterSpacing: '-0.5px' }}>Book a Doctor Appointment</h1>
        <div style={{ color: '#7a7a8c', fontSize: 18, marginTop: 8 }}>Select a doctor and book your preferred time slot below.</div>
      </header>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 18, background: '#fff', padding: '1.2rem 2rem', borderBottom: '1px solid #e3e6ed', boxShadow: '0 1px 6px rgba(60,60,80,0.03)' }}>
        <label htmlFor="doctor-select" style={{ fontWeight: 500, fontSize: 17, color: '#444' }}>Doctor:</label>
        <select
          id="doctor-select"
          value={doctorId}
          onChange={e => setDoctorId(e.target.value)}
          style={{
            padding: '8px 18px',
            borderRadius: 8,
            border: '1px solid #d2d6dc',
            fontSize: 17,
            background: '#f6f8fa',
            color: '#222',
            fontWeight: 500,
            outline: 'none',
            minWidth: 160,
            boxShadow: '0 1px 3px rgba(60,60,80,0.03)'
          }}
        >
          {DOCTORS.map(doc => (
            <option key={doc.id} value={doc.id}>{doc.name}</option>
          ))}
        </select>
        <div style={{ marginLeft: 24, display: 'flex', gap: 10 }}>
          {['day', 'week', 'monthGrid'].map(view => (
            <button
              key={view}
              onClick={() => calendarControls.setView(view)}
              style={{
                padding: '8px 22px',
                borderRadius: 8,
                border: 'none',
                background: '#ececff',
                color: '#3d3d6b',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(60,60,80,0.03)',
                transition: 'background 0.15s',
              }}
            >
              {view === 'day' ? 'Day' : view === 'week' ? 'Week' : 'Month'}
            </button>
          ))}
          <button
            onClick={() => calendarControls.setDate(new Date().toISOString().slice(0, 10))}
            style={{
              padding: '8px 22px',
              borderRadius: 8,
              border: 'none',
              background: '#5d5dfc',
              color: '#fff',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              marginLeft: '10px',
              boxShadow: '0 1px 2px rgba(60,60,80,0.03)',
              transition: 'background 0.15s',
            }}
          >Today</button>
        </div>
      </div>
      <main style={{ flex: 1, width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'stretch', alignItems: 'stretch', minHeight: 0, minWidth: 0, padding: 0 }}>
        <div style={{ flex: 1, width: '100%', height: '100%', minHeight: 0, minWidth: 0, padding: 0, background: '#f6f8fa', display: 'flex', alignItems: 'stretch', justifyContent: 'stretch' }}>
          <div style={{ flex: 1, minHeight: 0, minWidth: 0, padding: 0, margin: 0 }}>
            <div className="schedule-x-calendar" style={{ width: '100%', height: '100%' }}>
              <ScheduleXCalendar calendarApp={calendar} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
