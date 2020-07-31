const orm = require("../orm")

class userModel {
    async addUser(type, password, authID) {
        //user is an object
        let db = new orm("friendlyforks_db");
        await db.insertOne("users", user);
        await db.close();
    }

    // async updateUser(){
    //     let db=new orm("friendlyforks_db")
    //     await db.updateOne("", )
    //     await db.close()

    // }
}
