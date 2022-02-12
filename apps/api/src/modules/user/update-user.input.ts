import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { Role } from './role.enum';

@InputType()
export class UpdateUserInput {
  @IsString()
  @Field({ nullable: false })
  id: string;

  @IsString()
  @Field({ nullable: true })
  fullName: string;

  @IsEnum(Role)
  @Field(() => Role, { nullable: true })
  role: Role;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  active: boolean;

  @IsString()
  @Field()
  password: string;

  format() {
    return {
      ...this,
      fullName: this.fullName
        .split(' ')
        .map((part) => part[0].toUpperCase() + part.slice(1))
        .join(' '),
    };
  }
}
