// Import required mongoose components used to establish database connection
const { connect, connection } = require('mongoose');

// Establish connection to mongodb database - networkDB
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/networkDB';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// export connection
module.exports = connection;