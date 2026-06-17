import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdateProductVariantStockDto {
    @IsInt()
    @Min(0)
    stock!: number;

    @IsInt()
    @Min(0)
    @IsOptional()
    lowStockThreshold?: number;
}