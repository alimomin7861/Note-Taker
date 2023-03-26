// Dependencies
const express = require('express');
const fs = require('fs');

// Routers
const htmlRouter = require('./routes/htmlRoute');
const apiRouter = require('./routes/apiRoute');

// Express Set Up
const app = express();
const PORT = process.env.PORT || 3000;

// Set up Express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.use('/api', apiRouter);
app.use('/', htmlRouter);

// Start the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

