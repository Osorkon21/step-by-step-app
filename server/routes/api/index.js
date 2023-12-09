const router = require('express').Router();
const categoryRoutes = require('./category.routes')
const goalRoutes = require('./goal.routes');
const userRoutes = require('./user.routes');

router.use('/goals', goalRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes)

module.exports = router;
