import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Match } from '@/shared/decorators/match.decorator';

@ArgsType()
export class ChangePasswordArgs {
    @Field(() => String)
    @IsString()
    username: string;

    @Field(() => String)
    @IsString()
    password: string;

    @Field(() => String)
    @Match(ChangePasswordArgs, (dto) => dto.newPassword, { message: 'Пароли должны совпадать!' })
    passwordRepeat: string;

    @Field(() => String)
    @IsString()
    newPassword: string;
}
