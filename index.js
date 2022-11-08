const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

// WHAT IS THIS AND WHY?
// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const socialNetworkBackend = cwd.includes('Social-Network-API---NoSQL')
  ? cwd.split('/Social-Network-API---NoSQL  /')[1]
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${socialNetworkBackend} running on port ${PORT}!`);
  });
});