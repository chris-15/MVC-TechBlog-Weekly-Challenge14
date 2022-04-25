const express = require('express');
const routes = require('./controllers');
const path = require('path');
const exphbs = require('express-handlebars');

// importing sequelize connection
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

//turn on routes
app.use(routes);

//turns connection on to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App now listening on port ${PORT}`))
})