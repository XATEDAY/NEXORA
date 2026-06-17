import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Min,
    } from 'class-validator';

import { ProductStatus } from '@prisma/client';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    slug!: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @Min(0)
    basePrice!: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    salePrice?: number;

    @IsEnum(ProductStatus)
    @IsOptional()
    status?: ProductStatus;

    @IsBoolean()
    @IsOptional()
    isFeatured?: boolean;

    @IsUUID()
    categoryId!: string;
}