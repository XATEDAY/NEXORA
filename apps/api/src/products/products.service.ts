import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { dot } from 'node:test/reporters';

@Injectable()
export class ProductsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createProductDto: CreateProductDto) {
        const category = await this.prisma.category.findFirst({
        where: {
                id: createProductDto.categoryId,
                isActive: true,
            },
        });

        if (!category) {
            throw new NotFoundException('Category not found or inactive');
        }

        const productWithSameSlug = await this.prisma.product.findUnique({
        where: {
                slug: createProductDto.slug,
            },
        });

        if (productWithSameSlug) {
            throw new ConflictException('Product slug already exists');
        }

        return this.prisma.product.create({
        data: {
            name: createProductDto.name,
            slug: createProductDto.slug,
            description: createProductDto.description,
            basePrice: createProductDto.basePrice,
            salePrice: createProductDto.salePrice,
            status: createProductDto.status ?? ProductStatus.DRAFT,
            isFeatured: createProductDto.isFeatured ?? false,
            publishedAt:
            createProductDto.status === ProductStatus.PUBLISHED ? new Date() : null,
            categoryId: createProductDto.categoryId,
        },
        include: {
            category: true,
            images: true,
                variants: {
                    include: {
                        size: true,
                        color: true,
                    },
                },
            },
        });
    }

    async createVariant(productId: string, dto: CreateProductVariantDto){
        const product = await this.prisma.product.findFirst({
            where: {
                id: productId,
                status: {
                    not: ProductStatus.ARCHIVED,
                },
            },
        });

        if(!product){
            throw new NotFoundException('Product not found or archived');
        }

        const size = await this.prisma.size.findFirst({
            where: {
                id: dto.sizeId,
                isActive: true,
            },
        });

        if(!size){
            throw new NotFoundException('Size not found or inactive');
        }

        const color = await this.prisma.color.findFirst({
            where: {
                id: dto.colorId,
                isActive: true,
            },
        });

        if(!color){
            throw new NotFoundException('Color not found or inactive');
        }

        const existingVariant = await this.prisma.productVariant.findFirst({
            where: {
                productId,
                sizeId: dto.sizeId,
                colorId: dto.colorId,
            },
        });

        if(existingVariant){
            throw new ConflictException('Product variant already exists');
        }

        return this.prisma.productVariant.create({
            data: {
                productId,
                sku: dto.sku,
                stock: dto.stock,
                lowStockThreshold: dto.lowStockThreshold,
                price: dto.price,
                isActive: dto.isActive ?? true,
                sizeId: dto.sizeId,
                colorId: dto.colorId,
            },
            include: {
                product: true,
                size: true,
                color: true,
            },
        });
    }

    findAll() {
        return this.prisma.product.findMany({
        where: {
            status: {
                not: ProductStatus.ARCHIVED,
            },
        },
        include: {
            category: true,
            images: {
                where: {
                    isActive: true,
                },
                orderBy: {
                    position: 'asc',
                },
            },
            variants: {
                where: {
                    isActive: true,
                },
                include: {
                    size: true,
                    color: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        });
    }
}