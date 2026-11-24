const coffeeService = require('../services/coffee.service');
const { successResponse } = require('../utils/response');

class CoffeeController {
  async getAll(req, res, next) {
    try {
      const result = await coffeeService.getAllCoffees(req.query);
      return successResponse(res, 'Katalog kopi berhasil diambil', result, 200);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const coffee = await coffeeService.getCoffeeById(req.params.id);
      return successResponse(res, 'Detail produk kopi berhasil diambil', coffee, 200);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const coffee = await coffeeService.createCoffee(req.body);
      return successResponse(res, 'Produk kopi baru berhasil ditambahkan', coffee, 201);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const coffee = await coffeeService.updateCoffee(req.params.id, req.body);
      return successResponse(res, 'Data produk kopi berhasil diperbarui', coffee, 200);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await coffeeService.deleteCoffee(req.params.id);
      return successResponse(res, 'Produk kopi berhasil dihapus', null, 200);
    } catch (error) {
      next(error);
    }
  }

  async updateStock(req, res, next) {
    try {
      const result = await coffeeService.updateStock(req.params.id, req.body.stock);
      return successResponse(res, 'Stok produk berhasil diperbarui', result, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CoffeeController();
