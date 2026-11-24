const prisma = require('../config/database');

class CategoryService {
  async getAllCategories() {
    return prisma.category.findMany({
      include: {
        _count: {
          select: { coffees: true }
        }
      },
      orderBy: { name: 'asc' }
    });
  }

  async getCategoryById(id) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        coffees: true
      }
    });

    if (!category) {
      const error = new Error('Kategori tidak ditemukan.');
      error.statusCode = 404;
      throw error;
    }

    return category;
  }

  async createCategory({ name, description, icon }) {
    const existing = await prisma.category.findUnique({
      where: { name }
    });

    if (existing) {
      const error = new Error(`Kategori dengan nama "${name}" sudah ada.`);
      error.statusCode = 409;
      throw error;
    }

    return prisma.category.create({
      data: {
        name,
        description,
        icon: icon || 'Coffee'
      }
    });
  }

  async updateCategory(id, { name, description, icon }) {
    await this.getCategoryById(id);

    return prisma.category.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(icon && { icon })
      }
    });
  }

  async deleteCategory(id) {
    await this.getCategoryById(id);

    return prisma.category.delete({
      where: { id }
    });
  }
}

module.exports = new CategoryService();
