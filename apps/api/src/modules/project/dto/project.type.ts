import { Field, ObjectType } from '@nestjs/graphql';
import { ArtType } from '@/modules/art/dto';
import { FactoryType } from '@/modules/factory/dto';
import { CustomerType } from '@/modules/customer/dto';
import { ProjectCommentType } from './project-comment.type';

@ObjectType('Project')
export class ProjectType {
    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string;

    @Field(() => [ProjectCommentType], { nullable: true })
    comments: ProjectCommentType[];

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

    @Field(() => FactoryType, { nullable: true })
    factory: FactoryType;

    @Field(() => CustomerType, { nullable: true })
    customer: CustomerType;

    @Field(() => String, { nullable: true })
    factoryId: string;

    @Field(() => String, { nullable: true })
    customerId: string;

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;
}
