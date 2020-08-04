import React from 'react'

const UserProfile = () => {
    return (
        <div>   

            {/* first name last name inputs and save button */}
            <p>What is first name and last name?</p>
            <div class="input-group">
                <input type="text" aria-label="First name" placeholder="first name" class="form-control"></input>
                <input type="text" aria-label="Last name" placeholder="last name" class="form-control"></input>
            </div>
            <button type="button" class="btn btn-primary">Save</button>

            {/* email inputs and save button */}
            <p>What is your email?</p>
            <div class="input-group">
                <input type="text" aria-label="email" placeholder="email" class="form-control"></input>
            </div>
            <button type="button" class="btn btn-primary">Save</button>

            {/* address inputs and save button */}
            <p>What is your address?</p>
            <div class="input-group">
                <input type="text" aria-label="address" placeholder="address" class="form-control"></input>
            </div>
            <button type="button" class="btn btn-primary">Save</button>

            {/* location (nearest intersection) and save button */}
            <p>What is your closest major intersection?</p>
            <div class="input-group">
                <input type="text" aria-label="location" placeholder="nearest intersection" class="form-control"></input>
            </div>
            <button type="button" class="btn btn-primary">Save</button>

            {/* notes and save button */}
            <p>Please add any notes we should know about you ie: dietary restrictions, what you like to cook? what you like to eat? are you social? etc etc. </p>
            <div class="input-group input-group-lg">
                <textarea class="form-control" aria-label="With textarea" placeholder="notes"></textarea>
            </div>
            <button type="button" class="btn btn-primary">save</button>




            
        </div>
    )
}

export default UserProfile;
