import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
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
    @Field(() => Role)
    role: Role;

    @Field(() => Boolean)
    @IsBoolean()
    active: boolean;

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
