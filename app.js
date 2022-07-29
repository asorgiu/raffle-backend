const express = require('express');
const entryRoutes = require('./routes/entryRoutes');
const graphqlRoutes = require('./routes/graphqlRoutes');
const cors = require('cors');

const app = express();
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// Middleware
// Enable JSON paring of request. Not done by default
app.use(express.json());
app.use(cors(corsOptions));
app.use(graphqlRoutes);

// entry routes
app.use('/api/entries', entryRoutes);

// handle endpoints for http get requests
app.get('/', (req, res) => {
  // Respond with message with route handler
  res.send('Howdy');
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function (req, res) {
  res.status(404).send('Page not found.');
});

module.exports = app;
