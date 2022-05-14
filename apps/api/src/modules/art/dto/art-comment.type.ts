import { User, UserType } from '@/modules/user';
import { Field, ObjectType } from '@nestjs/graphql';
import { ArtType } from '.';

@ObjectType('ArtComment')
export class ArtCommentType {
    @Field(() => Number)
    id: number;

    @Field(() => String)
    artId: string;

    @Field(() => ArtType)
    art: ArtType;

    @Field(() => String)
    text: string;

    @Field(() => String)
    authorId: string;

    @Field(() => UserType)
    author: User;
}
