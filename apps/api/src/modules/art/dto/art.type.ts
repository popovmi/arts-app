import { Field, ObjectType } from '@nestjs/graphql';
import { ProjectType } from '@/modules/project/dto';
import { ArtFileType } from './art-file.type';

@ObjectType('Art')
export class ArtType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Boolean)
  internal: boolean;

  @Field(() => [ArtFileType], { nullable: true })
  files: ArtFileType[];

  @Field(() => String, { nullable: true })
  projectId: string;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: true })
  bottomForm: string;

  @Field(() => String, { nullable: true })
  artClass: string;

  @Field(() => String, { nullable: true })
  form: string;

  @Field(() => String, { nullable: true })
  nominalVolume: string;

  @Field(() => String, { nullable: true })
  height: string;

  @Field(() => String, { nullable: true })
  productType: string;

  @Field(() => String, { nullable: true })
  productionMethod: string;

  @Field(() => String, { nullable: true })
  ringType: string;

  @Field(() => ProjectType, { nullable: true })
  project: ProjectType;
}
