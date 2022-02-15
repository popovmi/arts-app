import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateAttributeInput {
  @Field()
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  active: boolean;
}
