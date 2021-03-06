const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const app = express();
const PORT = process.env.PORT || 3006;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const helpers = require("./utils/helpers");

const hbs = exphbs.create({ helpers });

//sets up Handlebars.js as apps template engine of choice
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //!14.5.7 snap changed to false
//express.static() method is a built-in Express.js middleware function that can take all of the contents of a folder and serve them as static assets
app.use(express.static(path.join(__dirname, "public")));

const routes = require("./controllers");

// turn on routes
app.use(routes); //Code snap  14.1 does not list

app.use(express.static("./public/upload"));
// turn on connection to db and server
//! To reset the db force: true. Otherwise default to false.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now swapping"));
});
