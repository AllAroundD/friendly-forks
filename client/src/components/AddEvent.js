import API from './API';
// import { Redirect } from 'react-router-dom';
import { useGlobalStore } from "./GlobalStore";
import React, { useEffect, useRef, useState } from "react"

const AddEvent = (props) => {
    // eslint-disable-next-line
    const [ globalData, dispatch ] = useGlobalStore()
    // eslint-disable-next-line
    let [ userData, setUserData ] = useState({})
    
    async function getUser( session ){
        const apiResult = await API.get( '/api/user/session', session )
        console.log('[getUser] ', apiResult)
        return apiResult
    }

    useEffect( async function(){
        userData = await getUser(localStorage.session)
        console.log('userData', userData)
        // setValues(userData[0])
        console.log('[UserProfile] userData ', userData[0].id)
        localStorage.id = userData[0].id

    }, [] )



    const [eventData, setEventData] = useState({ eventDate: "", availableSeats: "", eventNotes: "", restrictions: "", hostID: localStorage.id});
    // eslint-disable-next-line
    const [ isEventCreated, setIsEventCreated ] = useState( false );
    const [ restrictions, setRestrictions ] = useState([])
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


    // function handleCheckboxes(event) {
    //     let restrictions = this.state.restrictions
    //     restrictions.forEach(restrictions => {
    //         if (restrictions.value === event.target.value)
    //         restrictions.isChecked = event.target.checked
    //     })
    //     this.setState({restrictions: restrictions})
    // }
    
    // const [eventData, setEventData] = useState({ eventDate: "", availableSeats: "", restrictions: "", eventNotes: "" });
    // const inputDateTime = useRef()
    // const inputGuestNumber = useRef()
    // const inputVegetarian = useRef()
    // const inputPescatarian = useRef()
    // const inputVegan = useRef()
    // const inputHalal = useRef()
    // const inputKosher = useRef()
    // const inputGF = useRef()
    // const inputLI = useRef()
    // const inputAllergies = useRef()  
    // const inputNotes = useRef()

    // const checkBox = this.state.restrictions.map((restrictions) => {
    //     return (<li><input key={props.id} onClick={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}</li>);

    async function getDietaryRestrictions() {
        let dietaryRestrictions = [];
        if (inputVegetarian.current.checked) {
            dietaryRestrictions.push("Vegetarian");
        }
        if (inputPescatarian.current.checked) {
            dietaryRestrictions.push("Pescatarian")
        }
        if (inputVegan.current.checked) {
            dietaryRestrictions.push("Vegan")
        }
        if (inputHalal.current.checked) {
            dietaryRestrictions.push("Halal")
        }
        if (inputKosher.current.checked) {
            dietaryRestrictions.push("Kosher")
        }
        if (inputGF.current.checked) {
            dietaryRestrictions.push("Gluten Free")
        }
        if (inputLI.current.checked) {
            dietaryRestrictions.push("Lactose Intolerant")
        }
        if (inputAllergies.current.checked) {
            dietaryRestrictions.push("Allergies")
        }
        if (dietaryRestrictions == null) {
            dietaryRestrictions = "There are no dietary restrictions for this event."
        }
        
        return JSON.stringify(dietaryRestrictions);
    };
    
    function handleInputChange( e ){
        const { id, value } = e.target 
        setEventData( { ...eventData, [id]: value } );
    }

    function handleCheckboxChange( e ){
        const { id, value } = e.target
        setRestrictions( ...restrictions, value)
    }

    let hostID = localStorage.id
    async function postEvent(e) {
        e.preventDefault();
        setEventData( { ...eventData, [restrictions]: getDietaryRestrictions(), hostID } )
        console.log(eventData);
        console.log(restrictions);
        // const restrictions = getDietaryRestrictions();
        const apiResult = await API.post('/api/event/create', eventData);
        console.log(apiResult);
                  
        if( apiResult.error ){
            dispatch( { do: 'setMessage', type: 'danger', message: apiResult.error } );
            return;
        }

        dispatch( { do: 'setMessage', type: 'success', message: 'You have successfully created the event' } );

        // let the message sit for a bit then redirect to login
        setTimeout( function(){ setIsEventCreated(true); }, 5000 );
    }

    return (
        <div style={{marginTop:'150px'}}>
            <p>Please Select an Event Date and Time:</p>            
            <input onChange={handleInputChange} type="datetime-local" id="eventDate" name="eventDate" ref={inputDateTime} style={{backgroundColor: 'aliceBlue', borderRadius: '5px'}}></input>

            <p>How many guests would you like to host?</p>
            <form action="/action_page.php">
                <select onChange={handleInputChange} name="availableSeats" id="availableSeats" ref={inputGuestNumber} style={{backgroundColor: 'aliceBlue', borderRadius: '5px'}}>
                    <option value="availableSeats" selected disabled>Available Seats:</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </form>

            <p>Are there any dietary restrictions you'd like to include?</p>
            <div class="d-flex justify-content-center" style={{alignItems: 'center'}}>
                <div className="card d-flex justify-content-center" style={{width: '30vw', padding: '10px'}}>
                    <ul style={{listStyle: 'none', textAlign: 'left'}}>
                        {/* {
                            this.state.restrictions.map((restrictions) => {
                                return (<CheckBox handleCheckboxes = {this.handleCheckboxes} {...restrictions} />)
                            })
                        } */}
                        <li><input type="checkbox" onChange={handleCheckboxChange} id="Vegetarian" ref={inputVegetarian} />Vegetarian</li>
                        <li><input type="checkbox" onChange={handleCheckboxChange} id="Pescatarian" ref={inputPescatarian} />Pescatarian</li>
                        <li><input type="checkbox" onChange={handleCheckboxChange} id="Vegan" ref={inputVegan} />Vegan</li>
                        <li><input type="checkbox" onChange={handleCheckboxChange} id="Halal" ref={inputHalal} />Halal</li>
                        <li><input type="checkbox" onChange={handleCheckboxChange} id="Kosher" ref={inputKosher} />Kosher</li>
                        <li><input type="checkbox" onChange={handleCheckboxChange} id="GlutenFree" ref={inputGF} />Gluten Free</li>
                        <li><input type="checkbox" onChange={handleCheckboxChange} id="LactoseIntolerance" ref={inputLI} />Lactose Interolerant</li>
                        <li><input type="checkbox" onChange={handleCheckboxChange} id="Allergies" ref={inputAllergies} />Allergies (Please include details in your notes!)</li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <label for="EventNotes">Notes: (Please include any details that may be relevant to your event!)</label>
                <textarea onChange={handleInputChange} id='eventNotes' type="text"  placeholder="notes" class="form-control" ref={inputNotes}/>
            </div>
        <button onClick={postEvent} class="btn btn-primary">Create Event</button>
    </div>
        )
    }

export default AddEvent;

