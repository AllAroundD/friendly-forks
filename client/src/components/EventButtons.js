import React from 'react'

const EventButtons = () => {
    return (
        <div className="container-fluid">
            <div style={{marginTop:'150px' }}>
                <div class="card cardContainer"> 
                    <button onClick="viewEventsAll()" class="btn btn-primary">Browse All</button>
                    <a href src="createEvent()" class="btn btn-primary">Host</a>
                </div>
            </div>
        </div>
    )
}

export default EventButtons;
