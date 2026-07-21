require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Bring in the database
require('./app_server/models/db');

const app = express();


// Enable CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE' );
  next();
});

// Enable JSON
app.use(express.json());


// Routes
const itemRoutes = require('./app_server/routes/items');
const userRoutes = require('./app_server/routes/users');

app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);


module.exports = app;