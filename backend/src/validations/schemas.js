const { z } = require('zod');

// Auth Schemas
const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nama minimal 2 karakter'),
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    phone: z.string().optional(),
    address: z.string().optional(),
    avatar: z.string().url('URL avatar tidak valid').optional()
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(1, 'Password wajib diisi')
  })
});

const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nama minimal 2 karakter').optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    avatar: z.string().url('URL avatar tidak valid').optional()
  })
});

// Category Schemas
const categorySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nama kategori minimal 2 karakter'),
    description: z.string().min(5, 'Deskripsi kategori minimal 5 karakter'),
    icon: z.string().optional()
  })
});

const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Nama kategori minimal 2 karakter').optional(),
    description: z.string().min(5, 'Deskripsi kategori minimal 5 karakter').optional(),
    icon: z.string().optional()
  })
});

// Coffee / Product Schemas
const coffeeSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Nama kopi minimal 3 karakter'),
    categoryId: z.string().min(1, 'Kategori kopi wajib dipilih'),
    origin: z.string().min(2, 'Asal daerah (origin) wajib diisi'),
    process: z.string().min(2, 'Proses pengolahan wajib diisi'),
    roast: z.string().min(2, 'Tingkat sangrai (roast) wajib diisi'),
    flavor: z.union([z.array(z.string()), z.string()]).optional().default([]),
    weight: z.number().int().positive('Berat harus positif').optional().default(200),
    price: z.number().int().positive('Harga harus bernilai positif'),
    stock: z.number().int().nonnegative('Stok tidak boleh negatif').optional().default(0),
    description: z.string().min(10, 'Deskripsi minimal 10 karakter'),
    elevation: z.string().optional().default('1400 - 1600 mdpl'),
    acidity: z.string().optional().default('Medium Clean'),
    body: z.string().optional().default('Smooth & Full'),
    image: z.string().url('Format URL gambar tidak valid').optional(),
    isFeatured: z.boolean().optional().default(false)
  })
});

const updateCoffeeSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    categoryId: z.string().optional(),
    origin: z.string().optional(),
    process: z.string().optional(),
    roast: z.string().optional(),
    flavor: z.union([z.array(z.string()), z.string()]).optional(),
    weight: z.number().int().positive().optional(),
    price: z.number().int().positive().optional(),
    stock: z.number().int().nonnegative().optional(),
    description: z.string().min(10).optional(),
    elevation: z.string().optional(),
    acidity: z.string().optional(),
    body: z.string().optional(),
    image: z.string().url().optional(),
    isFeatured: z.boolean().optional()
  })
});

const updateStockSchema = z.object({
  body: z.object({
    stock: z.number().int().nonnegative('Stok tidak boleh bernilai negatif')
  })
});

// Cart Schemas
const addToCartSchema = z.object({
  body: z.object({
    coffeeId: z.string().min(1, 'ID Kopi wajib diisi'),
    grindSize: z.string().optional().default('Biji Utuh'),
    weight: z.number().int().positive().optional().default(200),
    quantity: z.number().int().positive('Kuantitas minimal 1').optional().default(1)
  })
});

const updateCartQuantitySchema = z.object({
  body: z.object({
    quantity: z.number().int().positive('Kuantitas minimal 1')
  })
});

// Order Schemas
const createOrderSchema = z.object({
  body: z.object({
    shippingAddress: z.string().min(5, 'Alamat pengiriman minimal 5 karakter').optional(),
    customerName: z.string().optional(),
    customerPhone: z.string().optional(),
    courier: z.string().optional().default('JNE Reguler'),
    shippingCost: z.number().int().nonnegative().optional().default(18000),
    paymentMethod: z.string().optional().default('QRIS')
  })
});

const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum([
      'Menunggu Pembayaran',
      'Dikonfirmasi',
      'Diproses',
      'Dikirim',
      'Selesai',
      'Dibatalkan'
    ], {
      errorMap: () => ({ message: 'Status pesanan tidak valid' })
    })
  })
});

// Review Schemas
const reviewSchema = z.object({
  body: z.object({
    rating: z.number().int().min(1, 'Rating minimal 1').max(5, 'Rating maksimal 5'),
    comment: z.string().min(3, 'Ulasan minimal 3 karakter')
  })
});

module.exports = {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  categorySchema,
  updateCategorySchema,
  coffeeSchema,
  updateCoffeeSchema,
  updateStockSchema,
  addToCartSchema,
  updateCartQuantitySchema,
  createOrderSchema,
  updateOrderStatusSchema,
  reviewSchema
};
