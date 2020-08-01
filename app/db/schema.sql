DROP DATABASE IF EXISTS friendlyforks_db;

CREATE DATABASE friendlyforks_db;

USE friendlyforks_db;

CREATE TABLE users (
id INTEGER AUTO_INCREMENT NOT NULL,
type VARCHAR(255),
password VARCHAR (255),
session VARCHAR (255),
authID VARCHAR (255),
firstName VARCHAR(255),
lastName VARCHAR(255),
profilePicture VARCHAR(255),
userEmail VARCHAR(255),
userLocation VARCHAR(255),
userAddress VARCHAR(255),
userNotes VARCHAR(255),
eventsHosted INTEGER,
eventsAttended INTEGER,
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY(id)
);

CREATE TABLE events (
id INTEGER AUTO_INCREMENT NOT NULL,
eventDate TIMESTAMP,
availableSeats INTEGER,
eventNotes VARCHAR(255),
restrictions VARCHAR(255),
hostID INTEGER,
attendeeID INTEGER,
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY(id),
FOREIGN KEY (hostID) REFERENCES users(id),
FOREIGN KEY (attendeeID) REFERENCES users(id)
);
