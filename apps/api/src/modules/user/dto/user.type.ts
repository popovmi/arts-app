import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '../role.enum';

@ObjectType('User')
export class UserType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  fullName: string;

  @Field(() => Role)
  role: Role;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
