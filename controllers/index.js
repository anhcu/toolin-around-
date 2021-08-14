// BRING IN EXPRESS ROUTER
const router = require('express').Router();

// ACCESS TO API ROUTES AND HOME ROUTES
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// ENABLE USE OF API AND HOME ROUTES
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// EXPORT THE ROUTER FOR USE IN APPLICATION
module.exports = router;


