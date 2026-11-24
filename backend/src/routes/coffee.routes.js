const express = require('express');
const coffeeController = require('../controllers/coffee.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  coffeeSchema,
  updateCoffeeSchema,
  updateStockSchema
} = require('../validations/schemas');

const router = express.Router();

router.get('/', coffeeController.getAll);
router.get('/:id', coffeeController.getById);

// Admin protected routes
router.post('/', authenticate, authorize('admin'), validate(coffeeSchema), coffeeController.create);
router.put('/:id', authenticate, authorize('admin'), validate(updateCoffeeSchema), coffeeController.update);
router.delete('/:id', authenticate, authorize('admin'), coffeeController.delete);
router.patch('/:id/stock', authenticate, authorize('admin'), validate(updateStockSchema), coffeeController.updateStock);

module.exports = router;
