import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding TechNest Enterprise Database matching Frontend Hardware Catalog...');

  // 1. Roles
  const superAdminRole = await prisma.role.upsert({
    where: { name: 'SUPER_ADMIN' },
    update: {},
    create: { name: 'SUPER_ADMIN', description: 'Full system control' },
  });

  const customerRole = await prisma.role.upsert({
    where: { name: 'CUSTOMER' },
    update: {},
    create: { name: 'CUSTOMER', description: 'Standard retail customer' },
  });

  // 2. Admin User
  const adminPasswordHash = await argon2.hash('AdminSecretKey2026!');
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@technest.store' },
    update: {},
    create: {
      email: 'admin@technest.store',
      fullName: 'Aarav Sharma (Admin)',
      passwordHash: adminPasswordHash,
      isVerified: true,
      roles: { create: { roleId: superAdminRole.id } },
    },
  });
  console.log(`✅ Admin user seeded: ${adminUser.email}`);

  // 3. Categories
  const laptopsCat = await prisma.category.upsert({
    where: { slug: 'laptops' },
    update: {},
    create: { name: 'Laptops & Workstations', slug: 'laptops', description: 'Flagship M4 Max laptops and RTX 5090 mobile rigs' },
  });

  const pcsCat = await prisma.category.upsert({
    where: { slug: 'gaming-pcs' },
    update: {},
    create: { name: 'Custom Gaming PCs', slug: 'gaming-pcs', description: 'Liquid-cooled custom desktop rigs' },
  });

  const monitorsCat = await prisma.category.upsert({
    where: { slug: 'monitors' },
    update: {},
    create: { name: 'Monitors & Displays', slug: 'monitors', description: '240Hz 4K QD-OLED displays' },
  });

  const peripheralsCat = await prisma.category.upsert({
    where: { slug: 'peripherals' },
    update: {},
    create: { name: 'Peripherals & Keyboards', slug: 'peripherals', description: 'Rapid-trigger magnetic keyboards' },
  });

  // 4. Brands
  const techNestBrand = await prisma.brand.upsert({
    where: { slug: 'technest' },
    update: {},
    create: { name: 'TechNest', slug: 'technest' },
  });

  const apexBrand = await prisma.brand.upsert({
    where: { slug: 'apex' },
    update: {},
    create: { name: 'Apex', slug: 'apex' },
  });

  const cyberBladeBrand = await prisma.brand.upsert({
    where: { slug: 'cyberblade' },
    update: {},
    create: { name: 'CyberBlade', slug: 'cyberblade' },
  });

  // 5. Products Matching Frontend Catalog
  const products = [
    {
      name: 'TechNest Titan Pro M4 Max Studio Laptop',
      slug: 'titan-pro-m4-max',
      description: 'Flagship mobile workstation with 16-Core CPU, 40-Core GPU, and 64GB Unified RAM.',
      price: 249990,
      originalPrice: 279990,
      emiStartingAt: 10416,
      isFeatured: true,
      isBestSeller: true,
      rating: 4.95,
      reviewCount: 142,
      brandId: techNestBrand.id,
      categoryId: laptopsCat.id,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
      sku: 'TITAN-M4-64-2TB',
    },
    {
      name: 'Apex Beast Ultra RTX 5090 Desktop Rig',
      slug: 'apex-beast-rtx-5090',
      description: 'Custom liquid-cooled gaming PC with RTX 5090 32GB GPU and Intel Core Ultra 9 285K.',
      price: 329990,
      originalPrice: 359990,
      emiStartingAt: 13749,
      isFeatured: true,
      isTrending: true,
      rating: 4.98,
      reviewCount: 98,
      brandId: apexBrand.id,
      categoryId: pcsCat.id,
      imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop',
      sku: 'APEX-5090-ULTRA',
    },
    {
      name: 'Horizon 49" QD-OLED 240Hz Curved Display',
      slug: 'horizon-49-qd-oled',
      description: 'Dual QHD 5120x1440 240Hz 0.03ms ultra-wide curved gaming monitor.',
      price: 109990,
      originalPrice: 129990,
      emiStartingAt: 4583,
      isFeatured: true,
      rating: 4.88,
      reviewCount: 76,
      brandId: techNestBrand.id,
      categoryId: monitorsCat.id,
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop',
      sku: 'HORIZON-49-OLED',
    },
    {
      name: 'CyberBlade Pro 8K Rapid Trigger Keyboard',
      slug: 'cyberblade-8k-keyboard',
      description: 'Hall Effect magnetic switches with 8000Hz polling rate and customizable actuation.',
      price: 17990,
      originalPrice: 19990,
      emiStartingAt: 1499,
      isFeatured: true,
      rating: 4.92,
      reviewCount: 215,
      brandId: cyberBladeBrand.id,
      categoryId: peripheralsCat.id,
      imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=800&auto=format&fit=crop',
      sku: 'CYBERBLADE-8K-MAG',
    },
  ];

  for (const p of products) {
    const { imageUrl, sku, ...pData } = p;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        ...pData,
        images: {
          create: [{ url: imageUrl, isPrimary: true, altText: p.name }],
        },
        variants: {
          create: [
            {
              sku,
              stock: 30,
              inventory: {
                create: { availableQuantity: 30, reservedQuantity: 0, warehouseLocation: 'BLR-HUB-A1' },
              },
            },
          ],
        },
      },
    });
  }

  console.log(`✅ Seeded ${products.length} hardware products matching Frontend catalog.`);
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
