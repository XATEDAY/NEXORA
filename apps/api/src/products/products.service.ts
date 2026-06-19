import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { FindProductsQueryDto } from './dto/find-products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductVariantStockDto } from './dto/update-product-variant-stock.dto';

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
      include: this.productInclude(),
    });
  }

  async update(productId: string, dto: UpdateProductDto) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: productId,
        status: {
          not: ProductStatus.ARCHIVED,
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found or archived');
    }

    if (dto.categoryId) {
      const category = await this.prisma.category.findFirst({
        where: {
          id: dto.categoryId,
          isActive: true,
        },
      });

      if (!category) {
        throw new NotFoundException('Category not found or inactive');
      }
    }

    if (dto.slug && dto.slug !== product.slug) {
      const productWithSameSlug = await this.prisma.product.findUnique({
        where: {
          slug: dto.slug,
        },
      });

      if (productWithSameSlug) {
        throw new ConflictException('Product slug already exists');
      }
    }

    const shouldSetPublishedAt =
      dto.status === ProductStatus.PUBLISHED && !product.publishedAt;
    const shouldClearPublishedAt =
      dto.status !== undefined && dto.status !== ProductStatus.PUBLISHED;

    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        basePrice: dto.basePrice,
        salePrice: dto.salePrice,
        status: dto.status,
        isFeatured: dto.isFeatured,
        categoryId: dto.categoryId,
        publishedAt: shouldSetPublishedAt
          ? new Date()
          : shouldClearPublishedAt
            ? null
            : undefined,
      },
      include: this.productInclude(),
    });
  }

  async createVariant(productId: string, dto: CreateProductVariantDto) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: productId,
        status: {
          not: ProductStatus.ARCHIVED,
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found or archived');
    }

    const size = await this.prisma.size.findFirst({
      where: {
        id: dto.sizeId,
        isActive: true,
      },
    });

    if (!size) {
      throw new NotFoundException('Size not found or inactive');
    }

    const color = await this.prisma.color.findFirst({
      where: {
        id: dto.colorId,
        isActive: true,
      },
    });

    if (!color) {
      throw new NotFoundException('Color not found or inactive');
    }

    const existingVariant = await this.prisma.productVariant.findFirst({
      where: {
        productId,
        sizeId: dto.sizeId,
        colorId: dto.colorId,
      },
    });

    if (existingVariant) {
      throw new ConflictException('Product variant already exists');
    }

    return this.prisma.productVariant.create({
      data: {
        productId,
        sku: dto.sku,
        stock: dto.stock,
        lowStockThreshold: dto.lowStockThreshold ?? 5,
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

  async updateVariantStock(
    variantId: string,
    dto: UpdateProductVariantStockDto,
  ) {
    const variant = await this.prisma.productVariant.findFirst({
      where: {
        id: variantId,
        isActive: true,
        product: {
          status: {
            not: ProductStatus.ARCHIVED,
          },
        },
      },
    });

    if (!variant) {
      throw new NotFoundException('Product variant not found or inactive');
    }

    return this.prisma.productVariant.update({
      where: {
        id: variantId,
      },
      data: {
        stock: dto.stock,
        lowStockThreshold: dto.lowStockThreshold ?? variant.lowStockThreshold,
      },
      include: {
        product: true,
        size: true,
        color: true,
      },
    });
  }

  async deactivateVariant(variantId: string) {
    const variant = await this.prisma.productVariant.findFirst({
      where: {
        id: variantId,
        isActive: true,
        product: {
          status: {
            not: ProductStatus.ARCHIVED,
          },
        },
      },
    });

    if (!variant) {
      throw new NotFoundException('Product variant not found or already inactive');
    }

    return this.prisma.productVariant.update({
      where: {
        id: variantId,
      },
      data: {
        isActive: false,
      },
      include: {
        product: true,
        size: true,
        color: true,
      },
    });
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        slug,
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
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async createImage(productId: string, dto: CreateProductImageDto) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: productId,
        status: {
          not: ProductStatus.ARCHIVED,
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found or archived');
    }

    if (dto.isPrimary) {
      await this.prisma.productImage.updateMany({
        where: {
          productId,
          isPrimary: true,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    return this.prisma.productImage.create({
      data: {
        productId,
        url: dto.url,
        alt: dto.alt,
        position: dto.position ?? 0,
        isPrimary: dto.isPrimary ?? false,
        isActive: true,
      },
    });
  }

  async deactivateImage(imageId: string) {
    const image = await this.prisma.productImage.findFirst({
      where: {
        id: imageId,
        isActive: true,
        product: {
          status: {
            not: ProductStatus.ARCHIVED,
          },
        },
      },
    });

    if (!image) {
      throw new NotFoundException('Product image not found or already inactive');
    }

    return this.prisma.productImage.update({
      where: {
        id: imageId,
      },
      data: {
        isActive: false,
        isPrimary: false,
      },
    });
  }

  async getFacets() {
    const [categories, sizes, colors, priceRange] = await Promise.all([
      this.prisma.category.findMany({
        where: {
          isActive: true,
          products: {
            some: {
              status: ProductStatus.PUBLISHED,
            },
          },
        },
        select: {
          id: true,
          name: true,
          slug: true,
          _count: {
            select: {
              products: true,
            },
          },
        },
        orderBy: {
          name: 'asc',
        },
      }),

      this.prisma.size.findMany({
        where: {
          isActive: true,
          variants: {
            some: {
              isActive: true,
              stock: {
                gt: 0,
              },
              product: {
                status: ProductStatus.PUBLISHED,
              },
            },
          },
        },
        select: {
          id: true,
          name: true,
          value: true,
          sortOrder: true,
        },
        orderBy: {
          sortOrder: 'asc',
        },
      }),

      this.prisma.color.findMany({
        where: {
          isActive: true,
          variants: {
            some: {
              isActive: true,
              stock: {
                gt: 0,
              },
              product: {
                status: ProductStatus.PUBLISHED,
              },
            },
          },
        },
        select: {
          id: true,
          name: true,
          value: true,
          hexCode: true,
        },
        orderBy: {
          name: 'asc',
        },
      }),

      this.prisma.product.aggregate({
        where: {
          status: ProductStatus.PUBLISHED,
        },
        _min: {
          basePrice: true,
        },
        _max: {
          basePrice: true,
        },
      }),
    ]);

    return {
      categories: categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        count: category._count.products,
      })),
      sizes,
      colors,
      price: {
        min: priceRange._min.basePrice,
        max: priceRange._max.basePrice,
      },
    };
  }

  getCategories() {
    return this.prisma.category.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  getSizes() {
    return this.prisma.size.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        value: true,
        sortOrder: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }

  getColors() {
    return this.prisma.color.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        value: true,
        hexCode: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async archive(productId: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: productId,
        status: {
          not: ProductStatus.ARCHIVED,
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found or already archived');
    }

    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        status: ProductStatus.ARCHIVED,
      },
      include: this.productInclude(),
    });
  }

  getLowStockVariants() {
    return this.prisma.productVariant.findMany({
      where: {
        isActive: true,
        stock: {
          lte: this.prisma.productVariant.fields.lowStockThreshold,
        },
        product: {
          status: ProductStatus.PUBLISHED,
        },
      },
      include: {
        product: true,
        size: true,
        color: true,
      },
      orderBy: {
        stock: 'asc',
      },
    });
  }

  findAll(query: FindProductsQueryDto) {
    return this.prisma.product.findMany({
      where: {
        status: {
          not: ProductStatus.ARCHIVED,
        },
        ...(query.featured !== undefined && {
          isFeatured: query.featured,
        }),
        ...(query.category && {
          category: {
            slug: query.category,
            isActive: true,
          },
        }),
        ...(query.minPrice !== undefined || query.maxPrice !== undefined
          ? {
              basePrice: {
                ...(query.minPrice !== undefined && { gte: query.minPrice }),
                ...(query.maxPrice !== undefined && { lte: query.maxPrice }),
              },
            }
          : {}),
        ...(query.size || query.color || query.available !== undefined
          ? {
              variants: {
                some: {
                  isActive: true,
                  ...(query.available === true && {
                    stock: {
                      gt: 0,
                    },
                  }),
                  ...(query.available === false && {
                    stock: 0,
                  }),
                  ...(query.size && {
                    size: {
                      value: query.size,
                      isActive: true,
                    },
                  }),
                  ...(query.color && {
                    color: {
                      value: query.color,
                      isActive: true,
                    },
                  }),
                },
              },
            }
          : {}),
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

  private productInclude() {
    return {
      category: true,
      images: {
        orderBy: {
          position: 'asc' as const,
        },
      },
      variants: {
        include: {
          size: true,
          color: true,
        },
      },
    };
  }
}
