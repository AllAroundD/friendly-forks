const mongoose = require("mongoose")

const Schema = mongoose.Schema

const eventSchema = new Schema(
    {
        eventDate: {
            type: Date,
            default: Date.now,
            required: true
        },
        eventNotes: {
            type: String,
            required: true
        },
        availableSeats: {
            type: Number
            // look up if max 
        },
        // hostId - lookup how to ref to user id hosting

        // attendeeId - lookup how to ref to user ids attending





    }


)

const Events = mongoose.model("Event", eventSchema)

module.exports = Events
