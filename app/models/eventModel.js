const orm = require("../config/orm");
const DB = require("../config/orm");

class EventModel {
    async getEvents(column, search) {
        let db = new orm("friendlyforks_db");
        let events = await db.selectSome("events", column, search);
        await db.close();
        return events;
    }

    async getEventsByHostID(userID) {
        let db = new orm("friendlyforks_db");
        let events = (await db.selectSome("events", "id", userID))[0];
        await db.close();
        return events;
    }

    async getEventsByHostAuthID(userID) {
        let db = new orm("friendlyforks_db");
        let events = await db.leftJoinWhere("users", "events", "users.id", "events.id", "events.id", userID);
        await db.close();
        return events;
    }

    async getAllEvents() {
        let db = new orm("friendlyforks_db");
        let events = await db.selectAll("events");
        await db.close();
        return events;
    }

    async getEventAndUser(userID) {
        let db = new orm("friendlyforks_db");
        let events = await db.leftJoinWhere("users", "events", "users.id", "events.id", "events.id", userID);
        await db.close();
        return events;

    }

    async removeEvent(eventID){
        let db = new orm("friendlyforks_db")
        let events = await db.removeOne("events", "events.id", eventID  ) 
        await db.close()
        return events; 
    }

    
    async viewAllEvents(){
        let db = new orm("friendlyforks_db")
        let events = await db.selectAll("events")
        await db.close();
        return events;

    }

    async getEventByDate(eventDate){
        let db = new orm("friendlyforks_db")
        let events = await db.selectSome("events", "events.eventDate", eventDate )
        await db.close();
        return events;


    }

    async getEventbySeat(seatNumber){
        let seatNumber = document.querySelector("#availableSeat").selectedOptions[i].value
        let db = new orm("friendlyforks_db")
        let events = await db.selectSome("events", "events.availableSeats", seatNumber)
        await db.close();
        return events;
    }

    async getEventbyRestrictions(restrictions){
        let restrictions = document.querySelector("dietRestrict").selectedOptions[i].value
        let db = orm ("friendlyforks_db")
        let events = await db.selectSome("events", "events.restriction", restrictions)
        await db.close();
        return events;
    }





    




}

module.exports = EventModel;
