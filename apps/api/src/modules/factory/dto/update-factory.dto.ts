import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateFactoryDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
