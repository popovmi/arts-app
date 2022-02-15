import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsBoolean()
    @IsOptional()
    active?: boolean;
}
