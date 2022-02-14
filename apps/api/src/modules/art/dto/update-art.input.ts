import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateArtInput {
  @IsString()
  @Field({ nullable: false })
  id: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  internal?: boolean;

  format() {
    return {
      ...this,
      ...(this.name ? { name: this.name.toUpperCase() } : {}),
    };
  }
}
