const prisma = require('../config/database');

class CartService {
  async getOrCreateCart(userId) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            coffee: {
              select: {
                id: true,
                name: true,
                image: true,
                origin: true,
                process: true,
                roast: true,
                price: true,
                stock: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              coffee: true
            }
          }
        }
      });
    }

    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      ...cart,
      subtotal,
      totalItems
    };
  }

  async addToCart(userId, { coffeeId, grindSize = 'Biji Utuh', weight = 200, quantity = 1 }) {
    const coffee = await prisma.coffee.findUnique({
      where: { id: coffeeId }
    });

    if (!coffee) {
      const error = new Error('Produk kopi tidak ditemukan.');
      error.statusCode = 404;
      throw error;
    }

    if (coffee.stock < quantity) {
      const error = new Error(`Stok tidak mencukupi. Tersedia: ${coffee.stock}`);
      error.statusCode = 400;
      throw error;
    }

    // Weight multiplier rule (consistent with frontend logic):
    let multiplier = 1;
    if (weight === 500) multiplier = 2.35;
    if (weight === 1000) multiplier = 4.4;
    const finalPrice = Math.round(coffee.price * multiplier);

    const cart = await this.getOrCreateCart(userId);

    // Check if same item with same grindSize and weight already exists in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        coffeeId,
        grindSize,
        weight
      }
    });

    if (existingItem) {
      const updatedQuantity = existingItem.quantity + quantity;
      if (coffee.stock < updatedQuantity) {
        const error = new Error(`Total kuantitas melebihi stok yang tersedia (${coffee.stock}).`);
        error.statusCode = 400;
        throw error;
      }

      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: updatedQuantity }
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          coffeeId,
          grindSize,
          weight,
          quantity,
          price: finalPrice
        }
      });
    }

    return this.getOrCreateCart(userId);
  }

  async updateItemQuantity(userId, cartItemId, quantity) {
    const cart = await this.getOrCreateCart(userId);

    const item = await prisma.cartItem.findFirst({
      where: { id: cartItemId, cartId: cart.id },
      include: { coffee: true }
    });

    if (!item) {
      const error = new Error('Item keranjang tidak ditemukan.');
      error.statusCode = 404;
      throw error;
    }

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: cartItemId } });
    } else {
      if (item.coffee.stock < quantity) {
        const error = new Error(`Stok tidak mencukupi. Tersedia: ${item.coffee.stock}`);
        error.statusCode = 400;
        throw error;
      }

      await prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity }
      });
    }

    return this.getOrCreateCart(userId);
  }

  async removeItem(userId, cartItemId) {
    const cart = await this.getOrCreateCart(userId);

    const item = await prisma.cartItem.findFirst({
      where: { id: cartItemId, cartId: cart.id }
    });

    if (!item) {
      const error = new Error('Item keranjang tidak ditemukan.');
      error.statusCode = 404;
      throw error;
    }

    await prisma.cartItem.delete({ where: { id: cartItemId } });

    return this.getOrCreateCart(userId);
  }

  async clearCart(userId) {
    const cart = await this.getOrCreateCart(userId);
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return this.getOrCreateCart(userId);
  }
}

module.exports = new CartService();
