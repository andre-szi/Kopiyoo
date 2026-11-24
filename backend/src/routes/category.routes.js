const express = require('express');
const categoryController = require('../controllers/category.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  categorySchema,
  updateCategorySchema
} = require('../validations/schemas');

const router = express.Router();

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);

// Admin protected routes
router.post('/', authenticate, authorize('admin'), validate(categorySchema), categoryController.create);
router.put('/:id', authenticate, authorize('admin'), validate(updateCategorySchema), categoryController.update);
router.delete('/:id', authenticate, authorize('admin'), categoryController.delete);

module.exports = router;
