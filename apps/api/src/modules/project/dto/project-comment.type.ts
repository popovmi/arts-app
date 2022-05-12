import { User, UserType } from '@/modules/user';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProjectType } from '.';

@ObjectType('ProjectComment')
export class ProjectCommentType {
    @Field(() => Number)
    id: number;

    @Field(() => String)
    projectId: string;

    @Field(() => ProjectType)
    project: ProjectType;

    @Field(() => String)
    text: string;

    @Field(() => String)
    authorId: string;

    @Field(() => UserType)
    author: User;
}
