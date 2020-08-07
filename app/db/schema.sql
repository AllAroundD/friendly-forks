DROP DATABASE IF EXISTS friendlyforks_db;

CREATE DATABASE friendlyforks_db;

USE friendlyforks_db;

CREATE TABLE users (
id INTEGER AUTO_INCREMENT NOT NULL,
password VARCHAR (255),
type VARCHAR (255) default 'local',
session VARCHAR (255) default '',
authID VARCHAR (255) default '',
firstName VARCHAR(255),
lastName VARCHAR(255),
thumbnail VARCHAR(255),
userEmail VARCHAR(255),
userLocation VARCHAR(255),
userAddress VARCHAR(255),
userNotes VARCHAR(255),
eventsHosted INTEGER,
eventsAttended INTEGER,
updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY(id)
);

CREATE TABLE events (
id INTEGER AUTO_INCREMENT NOT NULL,
eventDate TIMESTAMP,
availableSeats INTEGER,
eventNotes VARCHAR(255),
restrictions VARCHAR(255) DEFAULT "None",
hostID INTEGER,
attendeeID INTEGER,
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY(id),
FOREIGN KEY (hostID) REFERENCES users(id),
FOREIGN KEY (attendeeID) REFERENCES users(id)
);
