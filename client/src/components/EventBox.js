import React from 'react'

const EventBox = (props) => {

    return (
        <div>
            <div class="card cardContainer"> 
                <div class="card cardContent">
                    <div style={{fontSize: '8vw'}} class="card-header">
                        {props.availableSeats}
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">{props.eventDate}</li>
                        <li class="list-group-item">{props.eventLocation}</li>
                        <li class="list-group-item">{props.eventNotes}</li>
                    </ul>
                    <button type="button" class="btn btn-primary">Request Seat!</button>
                </div>
            </div>
        </div>
    )
}

export default EventBox;
