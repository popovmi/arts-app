import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateFactoryInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  active: boolean;
}
