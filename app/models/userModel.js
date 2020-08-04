const orm = require("../orm");
const DB = require("../orm");

class UserModel {
    async getUserByID(userID) {
        let db = new orm("friendlyforks_db");
        let user = await db.selectSome("users", "id", userID);
        await db.close();
        return user;
    }

    async getUserByAuthID(authID) {
        let db = new orm("friendlyforks_db");
        let user = await db.selectSome("users", "authID", authID);
        await db.close();
        return user[0].id;
    }
  
    async removeUser(authID) {
        let db = new orm("friendlyforks_db");
        let user = await db.removeOne("users", "authID", authID);
        await db.close();
        return user;
    }

    async getAttendeeByID(attendeeID){
        let db = new orm ("friendlyforks_db");
        let user = await db.selectOne("events", "attendeeID", attendeeID )
        await db.close()
        return user; 
         
    }

    async getHostByID(hostID){
        let db = new orm ("friendlyfork_db");
        let user = await db.selectOne("events","hostID", hostID)
        await db.close()
        return user;
    }

    async getAllAttendeesByID(attendeeID){
        let db = new orm ("friendlyforks_db");
        let user = await db.selectSome("events", "attendeeID", attendeeID )
        await db.close()
        return user; 
         
    }

    async getAddressbyHostID(userAddress){
        let db = new orm ("friendlyforks_db");
        let user = await db.leftJoinWhere("users", "events", "users.userAddress", "events.hostID", "users.userAddress", userAddress)
        await db.close()
        return user;

    }

    async getUserEmail (userEmail){
        let db = new orm ("friendlyforks_db")
        let user = await db.selectOne("users", "users.userEmail", userEmail ) 
        await db. close()
        return user 
    }

    async getLoginCredentials(userEmail) {
        let db = new DB ("friendlyforks_db");
        let userData = await db.selectSome("users", "users.userEmail", userEmail);
        await db.close()
        return userData;
    }
}

module.exports = UserModel;
