import { Transform } from 'class-transformer';
import {
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

export class FindProductsQueryDto {
    @IsString()
    @IsOptional()
    category?: string;

    @IsString()
    @IsOptional()
    size?: string;

    @IsString()
    @IsOptional()
    color?: string;

    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    @IsOptional()
    available?: boolean;

    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    @IsOptional()
    featured?: boolean;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(0)
    @IsOptional()
    minPrice?: number;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @Min(0)
    @IsOptional()
    maxPrice?: number;
}