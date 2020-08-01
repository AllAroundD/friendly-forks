const orm = require("../config/orm");
const DB = require("../config/orm");

class UserModel {
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

    async getEventsByHostAuthID(authID) {
        let db = new orm("friendlyforks_db");
        let events = await db.leftJoinWhere("events", "users", "events.id", "users.authid", "events.id", authID);
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
}