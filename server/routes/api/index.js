const router = require('express').Router();

const goalRoutes = require('./goal.routes');
const userRoutes = require('./user.routes');

router.use('/goal', goalRoutes);
router.use('/user', userRoutes);

module.exports = router;
