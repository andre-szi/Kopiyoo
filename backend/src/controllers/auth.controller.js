const authService = require('../services/auth.service');
const { successResponse } = require('../utils/response');

class AuthController {
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      return successResponse(res, 'Registrasi berhasil', result, 201);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const result = await authService.login(req.body);
      return successResponse(res, 'Login berhasil', result, 200);
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      const user = await authService.getProfile(req.user.id);
      return successResponse(res, 'Data profil berhasil diambil', user, 200);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const updated = await authService.updateProfile(req.user.id, req.body);
      return successResponse(res, 'Profil berhasil diperbarui', updated, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
