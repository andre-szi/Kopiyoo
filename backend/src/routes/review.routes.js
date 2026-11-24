const express = require('express');
const reviewController = require('../controllers/review.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const { reviewSchema } = require('../validations/schemas');

const router = express.Router();

router.get('/coffees/:coffeeId/reviews', reviewController.getByCoffeeId);
router.post('/coffees/:coffeeId/reviews', authenticate, validate(reviewSchema), reviewController.create);

module.exports = router;
