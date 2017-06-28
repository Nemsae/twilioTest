const PORT = process.env.PORT || 3001;

const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./config/db');
// const twilio = require('twilio');

// MONGOOSE CONFIGURATION
mongoose.Promise = Promise;
mongoose.connect(db.url, (err) => {
  console.log(err || `MongoDB connected to ${db.name}`); // eslint-disable-line no-console
}); //

const app = express();

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/public'));
}

app.set('port', PORT);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/public')));

//  ROUTES
app.use('/api', require('./routes/api'));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
