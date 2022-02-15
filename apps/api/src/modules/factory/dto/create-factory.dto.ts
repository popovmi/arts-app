import { IsBoolean, IsString } from 'class-validator';

export class CreateFactoryDto {
    @IsString()
    name: string;

    @IsBoolean()
    active: boolean;
}
