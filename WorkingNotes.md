11/ 09/21 - RA. Resolved the issue with the server not running.
Modified the server.js file in the root folder. const db which connects to the connect.js file is not properly setup.
-disabled the middleware

- Will work on this now.

Run the server

- npm start

run the db

- mysql -u root -p
- your password
- source db/db.sql
- show databases;

seed the db - on hold but will setup

- node db/index.js
