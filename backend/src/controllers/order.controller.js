const orderService = require('../services/order.service');
const { successResponse } = require('../utils/response');

class OrderController {
  async createOrder(req, res, next) {
    try {
      const order = await orderService.createOrder(req.user.id, req.body);
      return successResponse(res, 'Pesanan berhasil dibuat', order, 201);
    } catch (error) {
      next(error);
    }
  }

  async getUserOrders(req, res, next) {
    try {
      const orders = await orderService.getUserOrders(req.user.id);
      return successResponse(res, 'Daftar riwayat pesanan berhasil diambil', orders, 200);
    } catch (error) {
      next(error);
    }
  }

  async getAllOrders(req, res, next) {
    try {
      const result = await orderService.getAllOrders(req.query);
      return successResponse(res, 'Semua data pesanan berhasil diambil', result, 200);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const order = await orderService.getOrderById(req.params.id, req.user);
      return successResponse(res, 'Detail pesanan berhasil diambil', order, 200);
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const updated = await orderService.updateOrderStatus(req.params.id, req.body.status);
      return successResponse(res, 'Status pesanan berhasil diperbarui', updated, 200);
    } catch (error) {
      next(error);
    }
  }

  async payOrder(req, res, next) {
    try {
      const updated = await orderService.payOrder(req.params.id, req.user);
      return successResponse(res, 'Pembayaran pesanan berhasil dikonfirmasi', updated, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
