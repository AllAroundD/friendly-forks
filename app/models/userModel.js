const orm = require("../orm")
const DB = require("../orm")
const dbName = process.env.JAWSDB || process.env.DB_NAME

class UserModel {
    async getUserByID(userID) {
        let db = new orm(dbName);
        let user = await db.selectSome("users", "id", userID);
        await db.closeorm();
        return user;
    }

    async getUserByAuthID(authID) {
        let db = new orm(dbName);
        let user = await db.selectSome("users", "authID", authID);
        await db.closeorm();
        return user[0].id;
    }
  
    async removeUser(authID) {
        let db = new orm(dbName);
        let user = await db.removeOne("users", "authID", authID);
        await db.closeorm();
        return user;
    }

    async getAttendeeByID(attendeeID){
        let db = new orm(dbName);
        let user = await db.selectOne("events", "attendeeID", attendeeID )
        await db.closeorm()
        return user; 
         
    }

    async getHostByID(hostID){
        let db = new orm(dbName);
        let user = await db.selectOne("events","hostID", hostID)
        await db.closeorm()
        return user;
    }

    async getAllAttendeesByID(attendeeID){
        let db = new orm(dbName);
        let user = await db.selectSome("events", "attendeeID", attendeeID )
        await db.closeorm()
        return user; 
         
    }

    async getAddressbyHostID(userAddress){
        let db = new orm(dbName);
        let user = await db.leftJoinWhere("users", "events", "users.userAddress", "events.hostID", "users.userAddress", userAddress)
        await db.closeorm()
        return user;

    }

    async getUserEmail (userEmail){
        let db = new orm(dbName);
        let user = await db.selectOne("users", "users.userEmail", userEmail ) 
        await db. close()
        return user 
    }

    async getLoginCredentials(userEmail) {
        let db = new orm("friendlyforks_db");
        let userData = await db.selectSome("users", "users.userEmail", userEmail);
        await db.closeorm()
        return userData;
    }

    async updateSession(userEmail, session) {
        let db = new orm(dbName);
        // let updatedSession=`"session"='${session}'`
        // let condition=`"userEmail"=${userEmail}`
        // let updateResult = await db.updateOne("users", { "users.session" : session }, { "users.userEmail": userEmail })

        const queryString = `UPDATE users SET session='${session}' WHERE userEmail='${userEmail}'`
        // console.log('queryString: ',queryString)
        let updateResult = await db.query(queryString)

        let userData
        if (updateResult) {
            userData = await db.selectOne("users","users.userEmail", userEmail)
        }

        await db.closeorm()
        return userData
    }

    async clearSession(session) {
        let db = new orm(dbName);
        const queryString = `UPDATE users SET session='' WHERE session='${session}'`
        // console.log('queryString: ',queryString)
        let updateResult = await db.query(queryString)

        await db.closeorm()
        return true
    }

    async checkSession(session) {
        let db = new orm(dbName);
        // let userData = await db.selectOne("users","users.session", session)
        const queryString = `SELECT * FROM users WHERE session='${session}'`
        // console.log('queryString: ',queryString)
        let userData = await db.query(queryString)
        await db.closeorm()
        return userData
    }

    
    async getUserInfo(session) {
        let db = new orm(dbName);
        // let userData = await db.selectOne("users","users.session", session)
        const queryString = `SELECT * FROM users WHERE session='${session}'`
        // console.log('queryString: ',queryString)
        let userData = await db.query(queryString)
        await db.closeorm()
        return userData
    }

        
    async addUser(userData) {
        // console.log('[UserModel] addUser: ',userData)
        let db = new orm(dbName);
        let result = await db.addUser(userData);
        await db.closeorm()
        return result
    }

    async saveUser(userData) {
        // console.log('[UserModel] saveUser: ', userData)
        let db = new orm(dbName);
        let result = await db.updateUser(userData);
        await db.closeorm()
        return result
    }

}

module.exports = UserModel;
