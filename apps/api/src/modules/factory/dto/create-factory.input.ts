import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFactoryInput {
  @Field(() => String)
  name: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  active: boolean;
}
