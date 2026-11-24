const reportService = require('../services/report.service');
const { successResponse } = require('../utils/response');

class ReportController {
  async getStats(req, res, next) {
    try {
      const stats = await reportService.getAdminDashboardStats();
      return successResponse(res, 'Statistik dashboard admin berhasil diambil', stats, 200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReportController();
