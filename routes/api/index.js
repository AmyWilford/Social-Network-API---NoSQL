// Import Express Router
const router = require('express').Router();
// Import thought and user routes
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// Set endpoint for all thoughts routes
router.use('/thoughts', thoughtRoutes);
// Set endpoint for all user routes
router.use('/users', userRoutes);

// export router
module.exports = router;