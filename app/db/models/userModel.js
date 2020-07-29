const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: "Please enter First Name"
        },
        lastName: {
            type: String,
            trim: true,
            required: "Please enter Last Name"
        },
        img: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            required: "Please enter email",
            match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
        },
        location: {
            type: String,
            trim: true,
            required: "Please enter closest intersection"
        },
        address: {
            type: String,
            trim: true,
            required: "Please enter your hosting address"
        },
        notes: {
            type: String,
            trim: true
        },
        eventsHosted: {
            type: Number
        },
        eventsAttended: {
            type: Number
        }
    }


)

const Users = mongoose.model("User", userSchema)

module.exports = Users
