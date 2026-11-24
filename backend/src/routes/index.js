const express = require('express');
const authRoutes = require('./auth.routes');
const categoryRoutes = require('./category.routes');
const coffeeRoutes = require('./coffee.routes');
const cartRoutes = require('./cart.routes');
const orderRoutes = require('./order.routes');
const reviewRoutes = require('./review.routes');
const reportRoutes = require('./report.routes');

const router = express.Router();

// Health Check Endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Kopiyoo REST API server is healthy and running.',
    timestamp: new Date().toISOString()
  });
});

// Resource Routers
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/coffees', coffeeRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/', reviewRoutes);
router.use('/reports', reportRoutes);

module.exports = router;
