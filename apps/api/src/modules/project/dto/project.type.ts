import { Field, ObjectType } from '@nestjs/graphql';
import { ArtType } from 'modules/art/dto';

@ObjectType('Project')
export class ProjectType {
    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => Boolean)
    internal: boolean;

    @Field(() => Boolean, { nullable: true })
    hasDesignDoc: boolean;

    @Field(() => String, { nullable: true })
    sfm: string;

    @Field(() => String, { nullable: true })
    dropNumber: string;

    @Field(() => String, { nullable: true })
    intercenter: string;

    @Field(() => [ArtType], { nullable: true })
    arts: ArtType[];

    @Field(() => String, { nullable: true })
    factoryId: number;

    @Field(() => String, { nullable: true })
    customerId: number;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}
