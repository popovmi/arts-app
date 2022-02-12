import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { Role } from './role.enum';

@InputType()
export class CreateUserInput {
  @IsString()
  @Field()
  username: string;

  @IsString()
  @Field()
  fullName: string;

  @IsEnum(Role)
  @Field(() => Role)
  role: Role;

  @Field(() => Boolean)
  @IsBoolean()
  active: boolean;
}
