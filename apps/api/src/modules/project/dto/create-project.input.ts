import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @IsString()
  @Field(() => String)
  name: string;

  @IsString()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  internal: boolean;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  hasDesignDoc: boolean;

  @IsString()
  @IsOptional()
  @Field(() => String)
  dropNumber: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  intercenter: string;

  @IsString()
  @IsOptional()
  @Field(() => String)
  sfm: string;

  format() {
    return {
      ...this,
      name: this.name.toUpperCase(),
    };
  }
}
