const {connectDB, closeDB} = require("./connection.js")
const fs = require('fs')
const dbFile = './medialist.data'

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
     
    removeOne(tableName, condition) {
        return new Promise((resolve, reject) => {
            this.connection.query("DELETE FROM ?? WHERE ?", [tableName, condition], function (err, rows) {
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
}


function getMedia() {
    console.log(`[getMedia] ${__dirname}`)
    if (!fs.existsSync(dbFile)) {
        return []
    }

    // split by the new-lines
    mediaList = fs.readFileSync(dbFile, 'utf8').split('\n')
    return mediaList
}

function saveMedia(mediaData) {
    fs.appendFileSync(dbFile, `${mediaData.imageUrl}\n`)
}


module.exports = {
    DB,
    getMedia,
    saveMedia
}