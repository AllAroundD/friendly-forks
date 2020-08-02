USE friendlyforks_db;

INSERT INTO users (
firstName, lastName, profilePicture, userEmail, userLocation, userAddress, userNotes) 
VALUES ('John','Doe',profilePicture, 'john.doe@gmail.com', 'Toronto', '111 Yonge Street Toronto ON', 'Am allergic to nuts');

INSERT INTO events (
eventDate, availableSeats, eventNotes, hostID) 
VALUES (CURRENT_TIMESTAMP, 2, 'would be nice gesture if something was brought to share', 1);