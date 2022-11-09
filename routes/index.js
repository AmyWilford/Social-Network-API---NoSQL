// Import express router
const router = require('express').Router();
// Import api routes
const apiRoutes = require('./api');

// Set /api endpoint for apiRoutes
router.use('/api', apiRoutes);

// If route not found - show message 'Wrong Route'
router.use((req, res) => res.send('Wrong route!'));

// Export Router
module.exports = router;
