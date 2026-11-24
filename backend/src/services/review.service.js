const prisma = require('../config/database');

class ReviewService {
  async getReviewsByCoffeeId(coffeeId) {
    return prisma.review.findMany({
      where: { coffeeId },
      include: {
        user: {
          select: { id: true, name: true, avatar: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createReview(userId, { coffeeId, rating, comment }) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      const error = new Error('Pengguna tidak valid.');
      error.statusCode = 404;
      throw error;
    }

    const coffee = await prisma.coffee.findUnique({ where: { id: coffeeId } });
    if (!coffee) {
      const error = new Error('Kopi tidak ditemukan.');
      error.statusCode = 404;
      throw error;
    }

    const review = await prisma.review.create({
      data: {
        coffeeId,
        userId,
        userName: user.name,
        rating: Number(rating),
        comment
      }
    });

    // Recalculate average rating & reviewCount for this coffee
    const allReviews = await prisma.review.findMany({
      where: { coffeeId },
      select: { rating: true }
    });

    const totalScore = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = parseFloat((totalScore / allReviews.length).toFixed(1));

    await prisma.coffee.update({
      where: { id: coffeeId },
      data: {
        rating: avgRating,
        reviewCount: allReviews.length
      }
    });

    return review;
  }
}

module.exports = new ReviewService();
