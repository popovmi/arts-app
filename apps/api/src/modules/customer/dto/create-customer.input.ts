import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field(() => String)
  name: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  active: boolean;
}
