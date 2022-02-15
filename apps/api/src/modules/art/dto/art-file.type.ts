import { Field, ObjectType } from '@nestjs/graphql';
import { ArtType } from '.';

@ObjectType()
export class ArtFileType {
    @Field(() => String)
    artId: string;

    @Field(() => ArtType)
    art: ArtType;

    @Field(() => String)
    originalPath: string;

    @Field(() => String)
    watermarkPath: string;

    @Field(() => Date)
    uploadedAt: Date;
}
