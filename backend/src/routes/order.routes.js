const express = require('express');
const orderController = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  createOrderSchema,
  updateOrderStatusSchema
} = require('../validations/schemas');

const router = express.Router();

router.use(authenticate);

// Customer endpoints
router.post('/', validate(createOrderSchema), orderController.createOrder);
router.get('/my-orders', orderController.getUserOrders);
router.post('/:id/pay', orderController.payOrder);

// Admin endpoints
router.get('/', authorize('admin'), orderController.getAllOrders);
router.patch('/:id/status', authorize('admin'), validate(updateOrderStatusSchema), orderController.updateStatus);

// Shared endpoint (Access verified in controller by ID & role)
router.get('/:id', orderController.getById);

module.exports = router;
