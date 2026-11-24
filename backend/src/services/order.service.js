const prisma = require('../config/database');
const cartService = require('./cart.service');

class OrderService {
  async createOrder(userId, {
    shippingAddress,
    customerName,
    customerPhone,
    courier = 'JNE Reguler',
    shippingCost = 18000,
    paymentMethod = 'QRIS'
  }) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      const error = new Error('Pengguna tidak valid.');
      error.statusCode = 404;
      throw error;
    }

    const cart = await cartService.getOrCreateCart(userId);
    if (!cart.items || cart.items.length === 0) {
      const error = new Error('Keranjang belanja kosong. Silakan pilih produk terlebih dahulu.');
      error.statusCode = 400;
      throw error;
    }

    // Verify stock and prepare order items
    for (const item of cart.items) {
      if (item.coffee.stock < item.quantity) {
        const error = new Error(`Stok untuk kopi "${item.coffee.name}" tidak mencukupi (sisa ${item.coffee.stock}).`);
        error.statusCode = 400;
        throw error;
      }
    }

    const totalAmount = cart.subtotal + shippingCost;
    const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
    const courierCode = courier.split(' ')[0] || 'GAYO';
    const trackingNumber = `GAYO-${courierCode}-${Math.floor(10000000 + Math.random() * 90000000)}`;

    // Execute in a transaction: create order, create order items, deduct stock, clear cart
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          customerName: customerName || user.name,
          customerEmail: user.email,
          customerPhone: customerPhone || user.phone || '0812-3456-7890',
          shippingAddress: shippingAddress || user.address || 'Alamat Belum Diatur',
          courier,
          shippingCost,
          status: 'Menunggu Pembayaran',
          trackingNumber,
          totalAmount,
          paymentMethod,
          paymentStatus: 'Pending',
          transactionId: `TRX-${Date.now().toString().slice(-8)}`,
          items: {
            create: cart.items.map((item) => ({
              coffeeId: item.coffeeId,
              name: item.coffee.name,
              grindSize: item.grindSize,
              weight: item.weight,
              quantity: item.quantity,
              price: item.price,
              image: item.coffee.image
            }))
          }
        },
        include: {
          items: true
        }
      });

      // 2. Deduct stock for each coffee
      for (const item of cart.items) {
        await tx.coffee.update({
          where: { id: item.coffeeId },
          data: {
            stock: { decrement: item.quantity }
          }
        });
      }

      // 3. Clear cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      return newOrder;
    });

    return order;
  }

  async getUserOrders(userId) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getAllOrders({ status, page = 1, limit = 20 }) {
    const where = {};
    if (status) {
      where.status = status;
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [total, orders] = await Promise.all([
      prisma.order.count({ where }),
      prisma.order.findMany({
        where,
        include: {
          items: true,
          user: {
            select: { id: true, name: true, email: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limitNum
      })
    ]);

    return {
      items: orders,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    };
  }

  async getOrderById(orderId, user) {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
        user: {
          select: { id: true, name: true, email: true, phone: true }
        }
      }
    });

    if (!order) {
      const error = new Error('Pesanan tidak ditemukan.');
      error.statusCode = 404;
      throw error;
    }

    // Role check: customer can only see their own order
    if (user.role !== 'admin' && order.userId !== user.id) {
      const error = new Error('Akses ditolak ke pesanan ini.');
      error.statusCode = 403;
      throw error;
    }

    return order;
  }

  async updateOrderStatus(orderId, newStatus) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      const error = new Error('Pesanan tidak ditemukan.');
      error.statusCode = 404;
      throw error;
    }

    const updateData = { status: newStatus };

    // Auto-update payment to Paid if moving past pending
    if (newStatus !== 'Menunggu Pembayaran' && order.paymentStatus === 'Pending') {
      updateData.paymentStatus = 'Paid';
      updateData.paidAt = new Date();
    }

    return prisma.order.update({
      where: { id: orderId },
      data: updateData,
      include: { items: true }
    });
  }

  async payOrder(orderId, user) {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      const error = new Error('Pesanan tidak ditemukan.');
      error.statusCode = 404;
      throw error;
    }

    if (user.role !== 'admin' && order.userId !== user.id) {
      const error = new Error('Akses ditolak.');
      error.statusCode = 403;
      throw error;
    }

    return prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'Dikonfirmasi',
        paymentStatus: 'Paid',
        paidAt: new Date()
      },
      include: { items: true }
    });
  }
}

module.exports = new OrderService();
