import { Field, ObjectType } from '@nestjs/graphql';
import { UserType } from '@/modules/user/dto';

@ObjectType()
export class LoginResponse {
    @Field(() => UserType)
    user: UserType;
}
