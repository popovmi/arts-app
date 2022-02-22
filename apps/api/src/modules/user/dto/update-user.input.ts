import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../role.enum';

@InputType()
export class UpdateUserInput {
  @IsString()
  @Field({ nullable: false })
  id: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  fullName?: string;

  @IsEnum(Role)
  @IsOptional()
  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsString()
  @Field({ nullable: true })
  @IsOptional()
  password?: string;

  format() {
    return {
      ...this,
      ...(this.fullName
        ? {
            fullName: this.fullName
              .split(' ')
              .map((part) => part[0].toUpperCase() + part.slice(1))
              .join(' '),
          }
        : {}),
    };
  }
}
