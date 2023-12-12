const router = require('express').Router();
const categoryRoutes = require('./category.routes')
const goalRoutes = require('./goal.routes');
const userRoutes = require('./user.routes');
const openaiRoutes = require('./openai.routes');

router.use('/goals', goalRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes)
router.use('/openai', openaiRoutes)

module.exports = router;
