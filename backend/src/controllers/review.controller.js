const reviewService = require('../services/review.service');
const { successResponse } = require('../utils/response');

class ReviewController {
  async getByCoffeeId(req, res, next) {
    try {
      const reviews = await reviewService.getReviewsByCoffeeId(req.params.coffeeId);
      return successResponse(res, 'Daftar ulasan berhasil diambil', reviews, 200);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const review = await reviewService.createReview(req.user.id, {
        coffeeId: req.params.coffeeId,
        rating: req.body.rating,
        comment: req.body.comment
      });
      return successResponse(res, 'Ulasan berhasil ditambahkan', review, 201);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReviewController();
