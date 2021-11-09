const express = require("express");
//const db = require("./config/connection");

// const apiRoutes = require('./routes/apiRoutes');

//const sequelize = require("./config/connection");

const PORT = 3006 || process.env.PORT;
const app = express();

// Express middleware
//app.use(express.urlencoded({ extended: false }));
//app.use(express.json());
// app.use('/api', apiRoutes);

//Server test
app.get("/", (req, res) => {
  res.json({
    message: "Bing Bong",
  });
});

// Not Found response for unmatched routes
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
// app.connect((err) => {
//   if (err) throw err;
//   console.log("Database is connected");
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// });
