import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantStockDto } from './dto/update-product-variant-stock.dto';
import { CreateProductImageDto } from './dto/create-product-image.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    create(@Body() CreateProductDto: CreateProductDto){
        return this.productsService.create(CreateProductDto);
    }

    @Post(':id/variants')
    createVariant(
        @Param('id') productId: string,
        @Body() CreateProductVariantDto: CreateProductVariantDto,
    ){
        return this.productsService.createVariant(productId, CreateProductVariantDto);
    }

    @Post(':id/images')
    createImage(
        @Param('id') productId: string,
        @Body() CreateProductImageDto: CreateProductImageDto,
    ){
        return this.productsService.createImage(productId, CreateProductImageDto);
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':slug')
    findBySlug(@Param('slug') slug: string){
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
}