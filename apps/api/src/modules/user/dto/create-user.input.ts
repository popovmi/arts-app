import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../role.enum';

@InputType()
export class CreateUserInput {
    @IsString()
    @Field()
    username: string;

    @IsString()
    @Field({})
    fullName: string;

    @IsEnum(Role)
    @IsOptional()
    @Field(() => Role, { nullable: true })
    role: Role = Role.USER;

    @Field(() => Boolean, { nullable: true })
    @IsOptional()
    @IsBoolean()
    active = true;

    @IsString()
    @Field()
    password: string;

    format() {
        return {
            ...this,
            username: this.username.toUpperCase(),
            fullName: this.fullName
                .split(' ')
                .map((part) => part[0].toUpperCase() + part.slice(1))
                .join(' '),
        };
    }
}
