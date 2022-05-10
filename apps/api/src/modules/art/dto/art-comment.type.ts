import { User, UserType } from '@/modules/user';
import { Field, ObjectType } from '@nestjs/graphql';
import { ArtType } from '.';

@ObjectType('ArtComment')
export class ArtCommentType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  artId: string;

  @Field(() => ArtType)
  art: ArtType;

  @Field(() => String)
  text: string;

  @Field(() => UserType)
  authorId: string;

  @Field(() => UserType)
  author: User;
}
