import React from 'react';

const AddEvent = () => {

    return (
        <div style={{marginTop:'150px'}}>
            <p>Please Select an Event Date and Time:</p>            
            <input type="datetime-local" id="birthdaytime" name="birthdaytime" style={{backgroundColor: 'aliceBlue', borderRadius: '5px'}}></input>

            <p>How many guests would you like to host?</p>
            <form action="/action_page.php">
                <select name="cars" id="cars" style={{backgroundColor: 'aliceBlue', borderRadius: '5px'}}>
                    <option value="volvo" selected disabled>Available Seats:</option>
                    <option value="saab">1</option>
                    <option value="opel">2</option>
                    <option value="audi">3</option>
                </select>
            </form>

            <p>Are there any dietary restrictions you'd like to include?</p>
            <div class="d-flex justify-content-center" style={{alignItems: 'center'}}>
                <div className="card d-flex justify-content-center" style={{width: '30vw', padding: '10px'}}>
                    <ul style={{listStyle: 'none', textAlign: 'left'}}>
                    <li><input type="checkbox" />Vegetarian</li>
                    <li><input type="checkbox" />Pescatarian</li>
                    <li><input type="checkbox" />Vegan</li>
                    <li><input type="checkbox" />Halal</li>
                    <li><input type="checkbox" />Kosher</li>
                    <li><input type="checkbox" />Gluten Free</li>
                    <li><input type="checkbox" />Lactose Interolerance</li>
                    <li><input type="checkbox" />Allergies (Please include details in your notes!)</li>
                    </ul>
                </div>
            </div>
            <button class="btn btn-primary">Create Event</button>
        </div>
        )
    }

export default AddEvent;

