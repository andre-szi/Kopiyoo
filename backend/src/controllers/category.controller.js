const categoryService = require('../services/category.service');
const { successResponse } = require('../utils/response');

class CategoryController {
  async getAll(req, res, next) {
    try {
      const categories = await categoryService.getAllCategories();
      return successResponse(res, 'Daftar kategori berhasil diambil', categories, 200);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      return successResponse(res, 'Detail kategori berhasil diambil', category, 200);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const category = await categoryService.createCategory(req.body);
      return successResponse(res, 'Kategori berhasil ditambahkan', category, 201);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const category = await categoryService.updateCategory(req.params.id, req.body);
      return successResponse(res, 'Kategori berhasil diperbarui', category, 200);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await categoryService.deleteCategory(req.params.id);
      return successResponse(res, 'Kategori berhasil dihapus', null, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
