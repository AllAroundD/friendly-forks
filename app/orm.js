const {connectDB, closeDB} = require("./connection.js")

class DB {
    constructor() {
        this.connection = connectDB();
    }

    closeDB() {
        return closeDB(this.connection);
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            })
        })
    }

    insertOne(tableName, value) {
        return new Promise((resolve, reject) => {
            this.connection.query("INSERT INTO ?? SET ?", [tableName, value], function (err, rows) {
                if (err) reject(err);
                resolve(rows);
            })
        })
    }

    updateOne(tableName, update, condition) {
        //requires a string for tablename, and objects with a single key value pair for update and condition
        return new Promise((resolve, reject) => {
            this.connection.query("UPDATE ?? SET ? WHERE ?", [tableName, update, condition], function (err, rows) {
                if (err) reject(err)
                resolve(rows)
            })
        })
    }

    addUser(userData) {
        const queryString = `INSERT INTO users (firstName, lastName, profilePicture, userEmail, userLocation, userAddress, userNotes)
        VALUES ('${userData.firstName}', '${userData.lastName}', '${userData.profilePicture}', '${userData.userEmail}, '${userData.userLocation}, '${userData.userAddress}', '${userData.userNotes}')`
        console.log(`[addUser] queryString`, queryString)
        return new Promise ((resolve, reject) => {
            this.connection.query(queryString, function(err, rows) {
                    if (err) reject(err)
                        resolve(rows)
            })
        })
    }

    updateUser(userData) {
        const queryString = `UPDATE events SET firstName=${userData.firstName}, lastName=${userData.lastName}, profilePicture=${userData.profilePicture}, 
        userEmail=${userData.userEmail}, userLocation=${userData.userLocation}, userAddress=${userData.userAddress}, userNotes=${userData.userNotes} WHERE id=${id}`
        console.log(`[updateUser] queryString`, queryString);
        return new Promise ((resolve, reject) => {
            this.connection.query(queryString, function (err, rows) {
                if (err) reject(err)
                resolve(rows)
            })
        })
    }
     
    addEvent(eventData) {
        const queryString = `INSERT INTO events (eventDate, availableSeats, eventNotes, restrictions)
        VALUES ('${eventData.eventDate}', '${eventData.availableSeats}', '${eventData.eventNotes}', '${restrictions}')`
        console.log(`[addEvent] queryString`, queryString);
        return new Promise ((resolve, reject) => {
            this.connection.query(queryString, function (err, rows) {
                if (err) reject (err)
                resolve(rows)
            })
        })
    }

    updateEvent(eventData) {
        const queryString = `UPDATE events SET eventDate=${eventData.eventDate}, availableSeats=${eventData.availableSeats}, eventNotes=${eventData.restrictions})`
        console.log(`[updateEvent] queryString`, queryString);
        return new Promise ((resolve, reject) => {
            this.connection.query(queryString, function (err, rows) {
                if (err) reject (err)
                resolve(rows)
            })
        })
    }

    removeOne(tableName, column, value) {
        return new Promise((resolve, reject) => {
            this.connection.query("DELETE FROM ?? WHERE ?? = ?", [tableName, column, value], function (err, rows) {
                if (err) reject(err)
                resolve(rows)
            })
        })
    }

    selectOne(tableName, column, value) {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM ?? WHERE ?? = ?", [tableName, column, value], function (err, rows) {
                if (err) reject (err)
                resolve(rows)
            })
        })
    }

    selectAll(tableName) {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM ??", [tableName], function (err, rows) {
                if (err) reject(err)
                resolve(rows)
            })
        })
    }

    selectSome(tableName, columnName, searchValue) {
        return new Promise((resolve, reject) => {
            this.connection.query("SELECT * FROM ?? WHERE ?? = ?", [tableName, columnName, searchValue], function (
                err,
                rows
            ) {
                if (err) reject(err)
                resolve(rows)
            })
        })
    }

    leftJoinWhere(leftTable, rightTable, leftKey, rightKey, whereClauseCol, whereClauseVal) {
        return new Promise((resolve, reject) => {
            this.connection.query(
                "SELECT * FROM ?? LEFT JOIN ?? ON ?? = ?? WHERE ?? = ?",
                [leftTable, rightTable, leftKey, rightKey, whereClauseCol, whereClauseVal],
                function (err, rows) {
                    if (err) reject(err);
                    resolve(rows);
                }
            );
        });
    }
}

module.exports = DB