DROP DATABASE IF EXISTS friendlyforks_db;

CREATE DATABASE friendlyforks_db;

USE friendlyforks_db;

CREATE TABLE users (
id INTEGER AUTO_INCREMENT NOT NULL,
firstName VARCHAR(255),
lastName VARCHAR(255),
profilePicture VARCHAR(255),
userEmail VARCHAR(255),
userLocation VARCHAR(255),
userAddress VARCHAR(255),
userNotes VARCHAR(255),
eventsHosted INTEGER,
eventsAttended INTEGER,
createdAt TIMESTAMP NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE events (
id INTEGER AUTO_INCREMENT NOT NULL,
eventDate TIMESTAMP,
availableSeats INTEGER,
hostID INTEGER,
attendeeID INTEGER,
createdAt TIMESTAMP NOT NULL,
PRIMARY KEY(id)
);
