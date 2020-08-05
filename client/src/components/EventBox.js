import React from 'react'

const EventBox = () => {
    return (
        <div>
            <div class="card cardContainer"> 
                <div class="card cardContent">
                    <div style={{fontSize: '8vw'}} class="card-header">
                        2
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Host Name</li>
                        <li class="list-group-item">Date and Time</li>
                        <li class="list-group-item">Location</li>
                    </ul>
                    <button type="button" class="btn btn-success">Request Seat!</button>
                </div>
            </div>
        </div>
    )
}

export default EventBox;
