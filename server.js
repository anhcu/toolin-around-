// Bringing in packages for express server, express-session, handlebars and sequelize
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// 
// require('dotenv').config();
// Bringing in controllers directory routes, sequelize config
const routes = require('./controllers');
const sequelize = require('./config/connection');

// Declaring variables for express server and port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine
const hbs = exphbs.create();

// Session configuration with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Use express-session with the session configuration
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Data parsing and enabling use of static files in public directory
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Enabling use of routes
app.use(routes);

// Start sequelize database listening on port
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
