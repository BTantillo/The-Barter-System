const express = require("express");
const db = require("./db/connection");

// const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3006;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use('/api', apiRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// Not Found response for unmatched routes
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database is connected");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
