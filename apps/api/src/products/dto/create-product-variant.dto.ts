import {
    IsBoolean,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Min,
} from 'class-validator';

export class CreateProductVariantDto {
    @IsString()
    sku!: string;

    @IsInt()
    @Min(0)
    stock!: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    lowStockThreshold?: number;

    @IsNumber()
    @Min(0)
    @IsOptional()
    price?: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsUUID()
    sizeId!: string;

    @IsUUID()
    colorId!: string;
}