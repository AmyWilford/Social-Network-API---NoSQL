// Import Express
const express = require('express');
// Import connection
const db = require('./config/connection');
// Import routes
const routes = require('./routes');

// Establish listening PORT
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//Once db is openened - app is listening on declared port
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});