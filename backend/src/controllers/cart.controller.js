const cartService = require('../services/cart.service');
const { successResponse } = require('../utils/response');

class CartController {
  async getCart(req, res, next) {
    try {
      const cart = await cartService.getOrCreateCart(req.user.id);
      return successResponse(res, 'Keranjang belanja berhasil diambil', cart, 200);
    } catch (error) {
      next(error);
    }
  }

  async addToCart(req, res, next) {
    try {
      const cart = await cartService.addToCart(req.user.id, req.body);
      return successResponse(res, 'Produk berhasil ditambahkan ke keranjang', cart, 200);
    } catch (error) {
      next(error);
    }
  }

  async updateQuantity(req, res, next) {
    try {
      const cart = await cartService.updateItemQuantity(req.user.id, req.params.itemId, req.body.quantity);
      return successResponse(res, 'Kuantitas keranjang berhasil diperbarui', cart, 200);
    } catch (error) {
      next(error);
    }
  }

  async removeItem(req, res, next) {
    try {
      const cart = await cartService.removeItem(req.user.id, req.params.itemId);
      return successResponse(res, 'Item berhasil dihapus dari keranjang', cart, 200);
    } catch (error) {
      next(error);
    }
  }

  async clearCart(req, res, next) {
    try {
      const cart = await cartService.clearCart(req.user.id);
      return successResponse(res, 'Keranjang belanja berhasil dikosongkan', cart, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();
