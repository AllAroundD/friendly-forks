const mysql = require("mysql");

if (! process.env.JAWSDB_URL) {
    require("dotenv").config();
};

function connectDB() {
    if (process.env.JAWSDB_URL) {
        return mysql.createConnection(process.env.JAWSDB_URL)
    } else {
        return mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME,
            insecureAuth: true
        });
    };
};

function closeDB(connection) {
    return new Promise( ( resolve, reject ) => {
        connection.end( err => {
            if ( err )
                return reject( err );
            resolve();
        });
    });
};

module.exports = {connectDB, closeDB};