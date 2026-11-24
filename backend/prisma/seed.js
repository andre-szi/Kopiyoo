const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Specialty Grade 1',
    description: 'Biji kopi pilihan dengan defect minimal dan cita rasa kompleks khas dataran tinggi Gayo.',
    icon: 'Award'
  },
  {
    id: 'cat-2',
    name: 'Single Origin Gayo',
    description: 'Kopi murni dari satu perkebunan spesifik di Takengon dan Bener Meriah.',
    icon: 'MapPin'
  },
  {
    id: 'cat-3',
    name: 'Wine & Fermentation',
    description: 'Proses fermentasi alami anaerobik yang menghasilkan aroma anggur dan buah eksotis.',
    icon: 'Flame'
  },
  {
    id: 'cat-4',
    name: 'Honey & Natural',
    description: 'Pengeringan dengan lapisan mucilage untuk rasa manis madu dan body karamel yang kental.',
    icon: 'Sparkles'
  },
  {
    id: 'cat-5',
    name: 'Espresso & Dark Roast',
    description: 'Roasting gelap intens dengan crema tebal, ideal untuk espresso machine dan moka pot.',
    icon: 'Coffee'
  }
];

const COFFEES = [
  {
    id: 'gayo-01',
    name: 'Gayo Arabica Honey Process',
    categoryId: 'cat-4',
    origin: 'Aceh Tengah (Takengon)',
    process: 'Honey',
    roast: 'Medium',
    flavor: ['Caramel', 'Chocolate', 'Honey', 'Nutty'],
    weight: 200,
    price: 85000,
    stock: 25,
    description: 'Kopi Arabika Gayo dengan metode Honey Process di mana biji dikeringkan bersama sebagian lendir buah (mucilage). Menghasilkan rasa manis alami yang lembut, aftertaste karamel gurih, dan keasaman seimbang.',
    elevation: '1500 - 1650 mdpl',
    acidity: 'Medium Clean',
    body: 'Smooth & Syrupy',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true
  },
  {
    id: 'gayo-02',
    name: 'Gayo Highland Wine Process',
    categoryId: 'cat-3',
    origin: 'Bener Meriah',
    process: 'Wine',
    roast: 'Light',
    flavor: ['Fruity', 'Winey', 'Blackcurrant', 'Floral'],
    weight: 200,
    price: 115000,
    stock: 14,
    description: 'Masterpiece kopi Gayo dari perkebunan Bener Meriah. Biji ceri merah difermentasi selama 30-45 hari dalam tabung anaerobik kedap udara. Memberikan sensasi aroma anggur merah matang yang meledak di lidah tanpa kandungan alkohol.',
    elevation: '1600 - 1750 mdpl',
    acidity: 'Bright & Juicy',
    body: 'Medium Round',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 42,
    isFeatured: true
  },
  {
    id: 'gayo-03',
    name: 'Gayo Arabica Full Washed Classic',
    categoryId: 'cat-2',
    origin: 'Aceh Tengah',
    process: 'Washed',
    roast: 'Medium',
    flavor: ['Chocolate', 'Citrus', 'Brown Sugar'],
    weight: 200,
    price: 78000,
    stock: 35,
    description: 'Karakter otentik kopi Gayo legendaris. Diproses basah murni (Full Washed) menghasilkan profil cup yang sangat bersih (clean cup), notes cokelat hitam pekat dipadu sentuhan rempah dan jeruk keprok khas Aceh.',
    elevation: '1400 - 1550 mdpl',
    acidity: 'Crisp & Citrusy',
    body: 'Medium Body',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 29,
    isFeatured: false
  },
  {
    id: 'gayo-04',
    name: 'Gayo Natural Sun-Dried Specialty',
    categoryId: 'cat-4',
    origin: 'Bener Meriah',
    process: 'Natural',
    roast: 'Medium',
    flavor: ['Fruity', 'Caramel', 'Strawberry', 'Sweet'],
    weight: 200,
    price: 92000,
    stock: 18,
    description: 'Ceri kopi pilihan dikeringkan utuh di bawah terik matahari dataran tinggi Gayo di atas meja pengeringan bertingkat. Penyerapan gula alami dari buah ceri menghasilkan cita rasa buah berry manis dan body yang tebal.',
    elevation: '1500 - 1700 mdpl',
    acidity: 'Mellow Fruity',
    body: 'Heavy & Bold',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 31,
    isFeatured: true
  },
  {
    id: 'gayo-05',
    name: 'Gayo Dark Roast Espresso Blend',
    categoryId: 'cat-5',
    origin: 'Aceh Tengah',
    process: 'Washed',
    roast: 'Dark',
    flavor: ['Dark Chocolate', 'Nutty', 'Smoky', 'Molasses'],
    weight: 200,
    price: 75000,
    stock: 40,
    description: 'Diformulasikan khusus bagi pecinta kopi kental, cafe latte, dan minuman espresso berbasis susu. Tingkat sangrai Dark yang tepat memunculkan minyak alami tanpa rasa gosong, menghasilkan crema emas pekat.',
    elevation: '1350 - 1500 mdpl',
    acidity: 'Low / Lembut di Lambung',
    body: 'Very Heavy & Crema Rich',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 23,
    isFeatured: false
  }
];

async function main() {
  console.log('🌱 Memulai proses seeding data Kopi Gayo...');

  // 1. Seed Users
  const adminPassword = await bcrypt.hash('admin123', 10);
  const customerPassword = await bcrypt.hash('customer123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@kopigayo.id' },
    update: {},
    create: {
      id: 'user-admin',
      name: 'Admin Kopi Gayo',
      email: 'admin@kopigayo.id',
      password: adminPassword,
      role: 'admin',
      phone: '0812-9988-7766',
      address: 'Jl. Takengon - Bireuen No. 45, Aceh Tengah',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    }
  });

  const customer = await prisma.user.upsert({
    where: { email: 'budi@mahasiswa.id' },
    update: {},
    create: {
      id: 'user-customer',
      name: 'Budi Santoso',
      email: 'budi@mahasiswa.id',
      password: customerPassword,
      role: 'customer',
      phone: '0813-1234-5678',
      address: 'Jl. Melati No. 18, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12160',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      cart: {
        create: {}
      }
    }
  });

  console.log(`✅ User Admin: ${admin.email}`);
  console.log(`✅ User Customer: ${customer.email}`);

  // 2. Seed Categories
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { name: cat.name },
      update: cat,
      create: cat
    });
  }
  console.log(`✅ ${CATEGORIES.length} Kategori berhasil di-seed`);

  // 3. Seed Coffees
  for (const coffee of COFFEES) {
    await prisma.coffee.upsert({
      where: { id: coffee.id },
      update: coffee,
      create: coffee
    });
  }
  console.log(`✅ ${COFFEES.length} Produk Kopi berhasil di-seed`);

  console.log('🎉 Seeding selesai dengan sukses!');
}

main()
  .catch((e) => {
    console.error('❌ Gagal saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
