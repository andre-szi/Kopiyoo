# ☕ Kopiyoo REST API Backend

Backend REST API untuk **Kopiyoo (Sistem Informasi Marketplace & Pemesanan Kopi Gayo Berbasis Web)** dibangun menggunakan Node.js, Express.js, Prisma ORM, PostgreSQL, JWT Authentication, dan arsitektur berlapis (*Layered Architecture*).

---

## 🏗️ Struktur Proyek

```text
backend/
├── prisma/
│   ├── schema.prisma         # Skema database & relasi entitas Prisma
│   └── seed.js               # Database seeder (Kategori, Kopi, Pengguna Demo)
├── src/
│   ├── config/
│   │   ├── database.js       # Inisialisasi PrismaClient
│   │   └── environment.js    # Konfigurasi env & dotenv
│   ├── controllers/          # HTTP Request & Response handlers
│   │   ├── auth.controller.js
│   │   ├── category.controller.js
│   │   ├── coffee.controller.js
│   │   ├── cart.controller.js
│   │   ├── order.controller.js
│   │   ├── review.controller.js
│   │   └── report.controller.js
│   ├── services/             # Business logic & query ORM
│   │   ├── auth.service.js
│   │   ├── category.service.js
│   │   ├── coffee.service.js
│   │   ├── cart.service.js
│   │   ├── order.service.js
│   │   ├── review.service.js
│   │   └── report.service.js
│   ├── routes/               # Endpoint routing per resource
│   │   ├── auth.routes.js
│   │   ├── category.routes.js
│   │   ├── coffee.routes.js
│   │   ├── cart.routes.js
│   │   ├── order.routes.js
│   │   ├── review.routes.js
│   │   ├── report.routes.js
│   │   └── index.js          # Agregator route API (/api/v1)
│   ├── middlewares/
│   │   ├── auth.middleware.js     # JWT guard & Role authorization (Customer / Admin)
│   │   ├── error.middleware.js    # Global error & 404 handler
│   │   └── validate.middleware.js # Zod schema validation middleware
│   ├── utils/
│   │   ├── response.js       # Standard JSON response formatter
│   │   └── token.js          # Generator & verifier JWT token
│   ├── validations/
│   │   └── schemas.js        # Validasi schema Zod (Request payload)
│   └── app.js                # Inisialisasi Express & middleware CORS
├── .env.example              # Template variabel lingkungan
├── package.json
└── server.js                 # Entry point server HTTP
```

---

## 🚀 Panduan Menjalankan Backend

### 1. Prasyarat:
- Node.js (v18+)
- PostgreSQL / MySQL database

### 2. Instalasi Dependensi:
Masuk ke direktori `backend` dan jalankan:
```bash
cd backend
npm install
```

### 3. Konfigurasi Environment:
Salin file `.env.example` menjadi `.env` dan sesuaikan koneksi database Anda:
```bash
cp .env.example .env
```
Contoh isi `.env`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/kopiyoo_db?schema=public"
JWT_SECRET="kopiyoo_super_secret_jwt_key_2026_popl"
JWT_EXPIRES_IN="1d"
CORS_ORIGIN="http://localhost:3000"
```

### 4. Migrasi & Seeding Database:
Sinkronkan skema ke database dan jalankan seeder:
```bash
# Sinkronkan skema ke database (Prisma db push)
npm run prisma:push

# Generate client
npm run prisma:generate

# Isi data awal (Kategori, Kopi Gayo, Akun Demo)
npm run prisma:seed
```

### 5. Menjalankan Server:
```bash
# Mode development (auto-reload dengan nodemon)
npm run dev

# Mode production
npm start
```
Server akan aktif di: `http://localhost:5000/api/v1`

---

## 🔑 Kredensial Akun Demo (Hasil Seed)

| Role | Email | Password | Hak Akses |
|---|---|---|---|
| **Admin** | `admin@kopigayo.id` | `admin123` | Akses penuh dashboard, CRUD produk, status pesanan |
| **Customer** | `budi@mahasiswa.id` | `customer123` | Belanja, keranjang, checkout, ulasan |

---

## 📡 Daftar Endpoint API Lengkap

Semua response menggunakan format standar:
```json
{
  "success": true,
  "message": "Pesan status",
  "data": { ... }
}
```

### 1. Autentikasi (`/api/v1/auth`)
| Method | Endpoint | Deskripsi | Auth |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Mendaftarkan akun customer baru | Publik |
| `POST` | `/api/v1/auth/login` | Login (Admin atau Customer) | Publik |
| `GET` | `/api/v1/auth/me` | Mengambil data profil login saat ini | Bearer JWT |
| `PUT` | `/api/v1/auth/profile` | Memperbarui profil pengguna | Bearer JWT |

### 2. Kategori (`/api/v1/categories`)
| Method | Endpoint | Deskripsi | Auth |
|---|---|---|---|
| `GET` | `/api/v1/categories` | Mendapatkan semua kategori kopi | Publik |
| `GET` | `/api/v1/categories/:id` | Detail kategori beserta daftar kopinya | Publik |
| `POST` | `/api/v1/categories` | Tambah kategori baru | Admin |
| `PUT` | `/api/v1/categories/:id` | Edit kategori | Admin |
| `DELETE` | `/api/v1/categories/:id` | Hapus kategori | Admin |

### 3. Produk Kopi (`/api/v1/coffees`)
| Method | Endpoint | Deskripsi | Auth |
|---|---|---|---|
| `GET` | `/api/v1/coffees` | Katalog kopi (Filter: categoryId, roast, process, search) | Publik |
| `GET` | `/api/v1/coffees/:id` | Detail spesifik kopi beserta ulasan | Publik |
| `POST` | `/api/v1/coffees` | Tambah produk kopi baru | Admin |
| `PUT` | `/api/v1/coffees/:id` | Edit informasi produk kopi | Admin |
| `DELETE` | `/api/v1/coffees/:id` | Hapus produk kopi dari katalog | Admin |
| `PATCH` | `/api/v1/coffees/:id/stock` | Perbarui stok produk | Admin |

### 4. Keranjang Belanja (`/api/v1/cart`)
| Method | Endpoint | Deskripsi | Auth |
|---|---|---|---|
| `GET` | `/api/v1/cart` | Mendapatkan keranjang pengguna | Customer |
| `POST` | `/api/v1/cart/items` | Tambah item ke keranjang (dengan grindSize & weight) | Customer |
| `PATCH` | `/api/v1/cart/items/:itemId` | Ubah kuantitas item dalam keranjang | Customer |
| `DELETE` | `/api/v1/cart/items/:itemId` | Hapus satu item dari keranjang | Customer |
| `DELETE` | `/api/v1/cart` | Kosongkan seluruh keranjang | Customer |

### 5. Pesanan & Checkout (`/api/v1/orders`)
| Method | Endpoint | Deskripsi | Auth |
|---|---|---|---|
| `POST` | `/api/v1/orders` | Checkout pesanan dari keranjang aktif | Customer |
| `GET` | `/api/v1/orders/my-orders` | Riwayat pesanan milik customer | Customer |
| `GET` | `/api/v1/orders/:id` | Detail pesanan tertentu | Customer/Admin |
| `POST` | `/api/v1/orders/:id/pay` | Konfirmasi / simulasi pembayaran pesanan | Customer/Admin |
| `GET` | `/api/v1/orders` | Semua data pesanan (Filter status) | Admin |
| `PATCH` | `/api/v1/orders/:id/status` | Perbarui status pesanan (5 tahapan) | Admin |

### 6. Ulasan & Rating (`/api/v1/coffees/:coffeeId/reviews`)
| Method | Endpoint | Deskripsi | Auth |
|---|---|---|---|
| `GET` | `/api/v1/coffees/:coffeeId/reviews` | Daftar ulasan untuk satu produk kopi | Publik |
| `POST` | `/api/v1/coffees/:coffeeId/reviews` | Memberi rating (1-5) dan komentar ulasan | Customer |

### 7. Laporan & Dashboard Admin (`/api/v1/reports`)
| Method | Endpoint | Deskripsi | Auth |
|---|---|---|---|
| `GET` | `/api/v1/reports/admin/dashboard` | Statistik omzet, jumlah order, produk, dan status | Admin |
