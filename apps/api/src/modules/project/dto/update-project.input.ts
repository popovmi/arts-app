import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateProjectInput {
  @IsString()
  @Field({ nullable: false })
  id: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  internal: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  hasDesignDoc: boolean;

  format() {
    return {
      ...this,
      name: this.name.toUpperCase(),
    };
  }
}
