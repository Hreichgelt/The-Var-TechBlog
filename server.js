// server for tech blog
// dependencies from unit 14 lessons
require('dotenv').config();
const path = require('path');

const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const routes = require('./controllers');

const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const models = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'saucy sauce',
  cookie: { maxAge: 86400 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};


// Set Handlebars as the default template engine.
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// turn on routes
app.use(routes);
app.get('/health', (req, res) => {
  res.send('OK')
})
// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Listening at http://localhost:${PORT}`)
  );
});
