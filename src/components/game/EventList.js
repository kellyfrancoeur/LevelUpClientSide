import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEvents } from "../../managers/EventManager.js"

export const EventList = (props) => {
    const navigate = useNavigate()
    const [ events, setEvents ] = useState([])

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (<>
        <h2>Events</h2>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
             navigate({ pathname: "/events/new" })
            }}
        >Register New Event</button>
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">Event Description: {event.description}</div>
                        <div className="event__date">Event Date: {event.date}</div>
                        <div className="event__time">Time of Event: {event.time}</div>
                    </section>
                })
            }
        </article>
        </>
    )
}