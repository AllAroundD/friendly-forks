import React, {useEffect, useState} from 'react'
import AddEvent from "../components/AddEvent"
import API from '../components/API'
import EventBox from '../components/EventBox'

function Events (props) {
    let [eventData, setEventData] = useState({ eventDate: "", eventDate: "", availableSeats: "", eventNotes: "", restrictions: "", hostID:"", attendeeID:"" });

    async function displayEvents() {
        const allEvents = await API.get('/api/event/events');
        return allEvents;
    }
     
    useEffect( async function(){
        eventData = await displayEvents()
        console.log(eventData)
        setEventData (eventData[0])
    }, [] )


    // eventData.forEach((event, index) => {
    //     console.log(event);

    // });

    // let events = displayEvents();
    return (
        <div>
            {/* {eventData.map(event => console.log(event))} */}
            
        </div>
    )
}

export default Events
