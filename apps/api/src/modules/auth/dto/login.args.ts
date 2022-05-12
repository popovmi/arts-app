import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class LoginArgs {
    @Field(() => String)
    @IsString()
    username: string;

    @Field(() => String)
    @IsString()
    password: string;
}
