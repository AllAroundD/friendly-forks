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
        let db = new orm("friendlyforks_bd");
        let user = await db.selectSome("users", "auth_id", authID);
        await db.close();
        return user[0].id;
    }
}

module.exports = UserModel;
