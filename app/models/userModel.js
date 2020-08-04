const orm = require("../config/orm");
const DB = require("../config/orm");

class UserModel {
    async getUserByID(userID) {
        let db = new orm("friendlyforks_db");
        let user = await db.selectSome("users", "id", userID);
        await db.close();
        return user;
    }

    async getUserByAuthID(authID) {
        let db = new orm("friendlyforks_db");
        let user = await db.selectSome("users", "auth_id", authID);
        await db.close();
        return user[0].id;
    }
  
    async removeUser(authID) {
        let db = new orm("friendlyforks_db");
        let user = await db.removeOne("users", "auth_id", authID);
        await db.close();
        return user;
    }

    async getAttendeeByID(attendeeID){
        let db = new orm ("friendlyforks_db")
        let user = await db.selectOne("events", "attendeeID", attendeeID )
        await db.close()
        return user; 
         
    }

    async getHostByID(hostID){
        let db = new orm ("friendlyfork_db")
        let user = await db.selectOne("events","hostID", hostID)
        await db.close()
        return user;
    }


    async getAllAttendeesByID(attendeeID){
        let db = new orm ("friendlyforks_db")
        let user = await db.selectSome("events", "attendeeID", attendeeID )
        await db.close()
        return user; 
         
    }

    async getAddressbyHostID(userAddress){
        let db = new orm ("friendlyforks_db")
        let user = await db.leftJoinWhere("users", "events", "users.userAddress", "events.hostID", "users.userAddress", userAddress)
        await db.close()
        return user;

    }

    


    
}

module.exports = UserModel;
