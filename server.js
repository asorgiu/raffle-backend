const app = require('./app');
const db = require('./db');
let server = null;

// Use env variable to get port number
const PORT = process.env.PORT || 3001;

// Connect to our database before listening for connections
db.connect().then(() => {
  server = app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
  });
});

module.exports = server;
