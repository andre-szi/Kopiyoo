const prisma = require('../config/database');

class ReportService {
  async getAdminDashboardStats() {
    const [
      totalUsers,
      totalCoffees,
      totalOrders,
      paidOrders,
      ordersByStatus,
      recentOrders
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'customer' } }),
      prisma.coffee.count(),
      prisma.order.count(),
      prisma.order.findMany({
        where: { paymentStatus: 'Paid' },
        select: { totalAmount: true }
      }),
      prisma.order.groupBy({
        by: ['status'],
        _count: { id: true }
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          items: true
        }
      })
    ]);

    const totalRevenue = paidOrders.reduce((sum, ord) => sum + ord.totalAmount, 0);

    const statusMap = {
      'Menunggu Pembayaran': 0,
      'Dikonfirmasi': 0,
      'Diproses': 0,
      'Dikirim': 0,
      'Selesai': 0,
      'Dibatalkan': 0
    };

    ordersByStatus.forEach((item) => {
      statusMap[item.status] = item._count.id;
    });

    return {
      summary: {
        totalRevenue,
        totalOrders,
        totalCoffees,
        totalCustomers: totalUsers
      },
      ordersByStatus: statusMap,
      recentOrders
    };
  }
}

module.exports = new ReportService();
