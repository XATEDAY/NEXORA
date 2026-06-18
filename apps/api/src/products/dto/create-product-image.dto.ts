import {
    IsBoolean,
    IsInt,
    IsOptional,
    IsString,
    IsUrl,
    Min,
} from 'class-validator';

export class CreateProductImageDto {
    @IsUrl()
    url!: string;

    @IsString()
    @IsOptional()
    alt?: string;

    @IsInt()
    @Min(0)
    @IsOptional()
    position?: number;

    @IsBoolean()
    @IsOptional()
    isPrimary?: boolean;
}