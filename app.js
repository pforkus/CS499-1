require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Bring in the database
require('./app_server/models/db');

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || '').split(',');
// Enable CORS
app.use('/api', cors({
  origin: allowedOrigins,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// Enable JSON
app.use(express.json());


// Routes
const itemRoutes = require('./app_server/routes/items');
const userRoutes = require('./app_server/routes/users');

app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);


module.exports = app;