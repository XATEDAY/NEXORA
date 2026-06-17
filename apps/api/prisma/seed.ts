import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error('DATABASE_URL is not defined');
    }

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.category.upsert({
        where: { slug: 'polos' },
        update: {},
        create: {
            name: 'Polos',
            slug: 'polos',
            description: 'Polos urbanos, basicos y oversize.',
        },
    });

    await prisma.category.upsert({
        where: { slug: 'pantalones' },
        update: {},
        create: {
            name: 'Pantalones',
            slug: 'pantalones',
            description: 'Pantalones casuales, cargo y denim.',
        },
    });

    await prisma.category.upsert({
        where: { slug: 'calzado' },
        update: {},
        create: {
            name: 'Calzado',
            slug: 'calzado',
            description: 'Zapatillas y calzado urbano.',
        },
    });

    await prisma.category.upsert({
        where: { slug: 'accesorios' },
        update: {},
        create: {
            name: 'Accesorios',
            slug: 'accesorios',
            description: 'Complementos y accesorios de moda.',
        },
    });

    const sizes = [
        { name: 'Small', value: 'S', sortOrder: 1 },
        { name: 'Medium', value: 'M', sortOrder: 2 },
        { name: 'Large', value: 'L', sortOrder: 3 },
        { name: 'Extra Large', value: 'XL', sortOrder: 4 },
    ];

    for (const size of sizes) {
        await prisma.size.upsert({
        where: { value: size.value },
        update: {},
        create: size,
        });
    }

    const colors = [
        { name: 'Negro', value: 'black', hexCode: '#111111' },
        { name: 'Blanco', value: 'white', hexCode: '#f5f5f5' },
        { name: 'Azul', value: 'blue', hexCode: '#1d4ed8' },
        { name: 'Beige', value: 'beige', hexCode: '#d6c2a8' },
    ];

    for (const color of colors) {
        await prisma.color.upsert({
            where: { value: color.value },
            update: {},
            create: color,
        });
    }

    console.log('Seed completed');
}

main()
    .catch((error) => {
        console.error(error);
    process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });