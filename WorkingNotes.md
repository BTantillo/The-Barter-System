11/ 09/21 - RA. Resolved the issue with the server not running.
Modified the server.js file in the root folder. const db which connects to the connect.js file is not properly setup.
-Using 13.1.4 to setup the server with sequelize.

- Will work on this now.

# Run the server

- npm start

run the db

- mysql -u root -p
- your password
- source db/db.sql
- show databases;

# seed the db - on hold but will setup
- npm run seed
- node server.js

11/11/21 - these notes are duplicated in doc.

The create post button now routes to the dashboard.

Completed some structuring steps for the upload through the different view files. The route is not identifying the file upload in the console log. Getting a 500 error code. Interal server error.

The posts still go through the original Post route.
