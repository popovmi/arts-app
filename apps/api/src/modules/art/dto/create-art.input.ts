import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateArtInput {
  @IsString()
  @Field(() => String)
  name: string;

  @IsString()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  internal: boolean;

  format() {
    return {
      ...this,
      name: this.name.toUpperCase(),
    };
  }
}
