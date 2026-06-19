import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { FindProductsQueryDto } from './dto/find-products-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductVariantStockDto } from './dto/update-product-variant-stock.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Post(':id/images')
  createImage(
    @Param('id') productId: string,
    @Body() createProductImageDto: CreateProductImageDto,
  ) {
    return this.productsService.createImage(productId, createProductImageDto);
  }

  @Post(':id/variants')
  createVariant(
    @Param('id') productId: string,
    @Body() createProductVariantDto: CreateProductVariantDto,
  ) {
    return this.productsService.createVariant(productId, createProductVariantDto);
  }

  @Get()
  findAll(@Query() query: FindProductsQueryDto) {
    return this.productsService.findAll(query);
  }

  @Get('facets')
  getFacets() {
    return this.productsService.getFacets();
  }

  @Get('admin/low-stock')
  getLowStockVariants() {
    return this.productsService.getLowStockVariants();
  }

  @Get('meta/categories')
  getCategories() {
    return this.productsService.getCategories();
  }

  @Get('meta/sizes')
  getSizes() {
    return this.productsService.getSizes();
  }

  @Get('meta/colors')
  getColors() {
    return this.productsService.getColors();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Patch('variants/:id/stock')
  updateVariantStock(
    @Param('id') variantId: string,
    @Body() updateProductVariantStockDto: UpdateProductVariantStockDto,
  ) {
    return this.productsService.updateVariantStock(
      variantId,
      updateProductVariantStockDto,
    );
  }

  @Patch('variants/:id/deactivate')
  deactivateVariant(@Param('id') variantId: string) {
    return this.productsService.deactivateVariant(variantId);
  }

  @Patch('images/:id/deactivate')
  deactivateImage(@Param('id') imageId: string) {
    return this.productsService.deactivateImage(imageId);
  }

  @Patch(':id/archive')
  archive(@Param('id') productId: string) {
    return this.productsService.archive(productId);
  }

  @Patch(':id')
  update(
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(productId, updateProductDto);
  }
}
