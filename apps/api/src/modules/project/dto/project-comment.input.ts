import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class ProjectCommentInput {
    @IsString()
    @Field(() => String)
    text: string;

    @IsUUID()
    @Field(() => String)
    projectId: string;
}
