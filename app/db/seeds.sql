USE friendlyforks_db;

INSERT INTO users (
type, password, firstName, lastName, thumbnail, userEmail, userLocation, userAddress, userNotes) 
VALUES ('local','$2b$10$nBRGgpKbMgUqjic2TZleuugOl4VGvWJMI9L/wxhPvXBbk9eL/e.rG','John','Doe','uploads/bf34b8d5c54f7a22a14157de1f9c50df.jpg', 'john.doe@gmail.com', 'Toronto', '111 Yonge Street Toronto ON', 'Am allergic to nuts');

INSERT INTO events (
eventDate, availableSeats, eventNotes, hostID) 
VALUES (CURRENT_TIMESTAMP, 2, 'would be nice gesture if something was brought to share', 1);