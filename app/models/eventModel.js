const orm = require("../orm")
const DB = require("../orm")
const dbName = process.env.JAWSDB || process.env.DB_NAME

class EventModel {
    async getEvents(column, search) {
        let db = new orm (dbName);
        let events = await db.selectSome("events", column, search);
        await db.closeDB();
        return events;
    }

    async getEventsByHostID(userID) {
        let db = new orm (dbName);
        let events = (await db.selectSome("events", "id", userID))[0];
        await db.closeDB();
        return events;
    }

    async getEventsByHostAuthID(userID) {
        let db = new orm (dbName);
        let events = await db.leftJoinWhere("users", "events", "users.id", "events.id", "events.id", userID);
        await db.closeDB();
        return events;
    }

    async getAllEvents() {
        let db = new orm (dbName);
        let events = await db.selectAll("events");
        await db.closeDB();
        return events;
    }

    async getEventAndHost(userID) {
        let db = new orm (dbName);
        let events = await db.leftJoinWhere("users", "events", "users.id", "events.id", "events.id", userID);
        await db.closeDB();
        return events;

    }

    async removeEvent(eventID){
        let db = new orm (dbName)
        let events = await db.removeOne("events", "events.id", eventID  ) 
        await db.closeDB()
        return events; 
    }

    
    async viewAllEvents(){
        let db = new orm (dbName)
        let events = await db.selectAll("events")
        await db.closeDB();
        return events;
    }

    async getEventByDate(eventDate){
        let db = new orm (dbName)
        let events = await db.selectSome("events", "events.eventDate", eventDate )
        await db.closeDB();
        return events;
    }

    async getEventbySeat(seatNumber){
        // let seatNumber = document.querySelector("#availableSeat").selectedOptions[i].value
        let db = new orm (dbName)
        let events = await db.selectSome("events", "events.availableSeats", seatNumber)
        await db.closeDB();
        return events;
    }

    async getEventbyRestrictions(restrictions){
        // let restrictions = document.querySelector("dietRestrict").selectedOptions[i].value
        let db = new orm (dbName)
        let events = await db.selectSome("events", "events.restriction", restrictions)
        await db.closeDB();
        return events;
    }

    async addEvent(eventData) {
        let db = new orm (dbName)
        let event = await db.addEvent(eventData);
        await db.closeDB();
        return event;
    }

}

module.exports = EventModel;