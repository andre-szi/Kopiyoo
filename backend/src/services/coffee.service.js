const prisma = require('../config/database');

class CoffeeService {
  async getAllCoffees({ categoryId, process, roast, search, isFeatured, page = 1, limit = 20, sort = 'createdAt', order = 'desc' }) {
    const where = {};

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (process) {
      where.process = { equals: process, mode: 'insensitive' };
    }

    if (roast) {
      where.roast = { equals: roast, mode: 'insensitive' };
    }

    if (isFeatured !== undefined) {
      where.isFeatured = isFeatured === 'true' || isFeatured === true;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { origin: { contains: search, mode: 'insensitive' } },
        { process: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [total, coffees] = await Promise.all([
      prisma.coffee.count({ where }),
      prisma.coffee.findMany({
        where,
        include: {
          category: {
            select: { id: true, name: true, icon: true }
          }
        },
        orderBy: { [sort]: order },
        skip,
        take: limitNum
      })
    ]);

    return {
      items: coffees,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    };
  }

  async getCoffeeById(id) {
    const coffee = await prisma.coffee.findUnique({
      where: { id },
      include: {
        category: true,
        reviews: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    });

    if (!coffee) {
      const error = new Error('Produk kopi tidak ditemukan.');
      error.statusCode = 404;
      throw error;
    }

    return coffee;
  }

  async createCoffee(data) {
    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId }
    });

    if (!categoryExists) {
      const error = new Error('Kategori yang dipilih tidak valid.');
      error.statusCode = 400;
      throw error;
    }

    return prisma.coffee.create({
      data: {
        ...data,
        flavor: Array.isArray(data.flavor) ? data.flavor : [data.flavor]
      },
      include: {
        category: true
      }
    });
  }

  async updateCoffee(id, data) {
    await this.getCoffeeById(id);

    if (data.categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: data.categoryId }
      });
      if (!categoryExists) {
        const error = new Error('Kategori yang dipilih tidak valid.');
        error.statusCode = 400;
        throw error;
      }
    }

    const updatePayload = { ...data };
    if (data.flavor && !Array.isArray(data.flavor)) {
      updatePayload.flavor = [data.flavor];
    }

    return prisma.coffee.update({
      where: { id },
      data: updatePayload,
      include: {
        category: true
      }
    });
  }

  async deleteCoffee(id) {
    await this.getCoffeeById(id);

    return prisma.coffee.delete({
      where: { id }
    });
  }

  async updateStock(id, newStock) {
    await this.getCoffeeById(id);

    return prisma.coffee.update({
      where: { id },
      data: { stock: newStock },
      select: { id: true, name: true, stock: true }
    });
  }
}

module.exports = new CoffeeService();
