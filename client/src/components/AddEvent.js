import API from './API';
import React, { useEffect, useRef } from "react"

const AddEvent = (props) => {
    const inputDateTime = useRef()
    const inputGuestNumber = useRef()
    const inputVegetarian = useRef()
    const inputPescatarian = useRef()
    const inputVegan = useRef()
    const inputHalal = useRef()
    const inputKosher = useRef()
    const inputGF = useRef()
    const inputLI = useRef()
    const inputAllergies = useRef()  
    const inputNotes = useRef()

    return (
        <div style={{marginTop:'150px'}}>
            <p>Please Select an Event Date and Time:</p>            
            <input type="datetime-local" id="birthdaytime" name="birthdaytime" ref={inputDateTime} style={{backgroundColor: 'aliceBlue', borderRadius: '5px'}}></input>

            <p>How many guests would you like to host?</p>
            <form action="/action_page.php">
                <select name="guests" id="guests" ref={inputGuestNumber} style={{backgroundColor: 'aliceBlue', borderRadius: '5px'}}>
                    <option value="volvo" selected disabled>Available Seats:</option>
                    <option value="one">1</option>
                    <option value="two">2</option>
                    <option value="three">3</option>
                </select>
            </form>

            <p>Are there any dietary restrictions you'd like to include?</p>
            <div class="d-flex justify-content-center" style={{alignItems: 'center'}}>
                <div className="card d-flex justify-content-center" style={{width: '30vw', padding: '10px'}}>
                    <ul style={{listStyle: 'none', textAlign: 'left'}}>
                        <li><input type="checkbox" ref={inputVegetarian} />Vegetarian</li>
                        <li><input type="checkbox" ref={inputPescatarian} />Pescatarian</li>
                        <li><input type="checkbox" ref={inputVegan} />Vegan</li>
                        <li><input type="checkbox" ref={inputHalal} />Halal</li>
                        <li><input type="checkbox" ref={inputKosher} />Kosher</li>
                        <li><input type="checkbox" ref={inputGF} />Gluten Free</li>
                        <li><input type="checkbox" ref={inputLI} />Lactose Interolerant</li>
                        <li><input type="checkbox" ref={inputAllergies} />Allergies (Please include details in your notes!)</li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <label for="EventNotes">Notes: (Please include any details that may be relevant to your event!)</label>
                <textarea value={eventData.event} onChange={handleInputChange} id='eventNotes' type="text"  placeholder="notes" class="form-control" ref={inputNotes}/>
            </div>
        <button class="btn btn-primary">Create Event</button>
    </div>
        )
    }

export default AddEvent;

