import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../auth/auth.guard';
import { AttributeType } from './attribute-type';
import { AttributeService } from './attribute.service';
import {
  BaseAttributeType,
  CreateAttributeInput,
  UpdateAttributeInput,
  UpdateAttributeValueOrderInput,
} from './dto';

@Resolver()
@UseGuards(AuthGuard)
export class AttributeResolver {
  constructor(readonly service: AttributeService) {}

  @Mutation(() => BaseAttributeType)
  public async createAttribute(@Args('input') input: CreateAttributeInput) {
    return await this.service.create(input);
  }

  @Query(() => [BaseAttributeType])
  public async attributes(@Args('type', { type: () => AttributeType }) type: AttributeType) {
    return await this.service.getValues(type);
  }

  @Mutation(() => [BaseAttributeType])
  public async updateAttributesOrder(@Args('input') input: UpdateAttributeValueOrderInput) {
    return await this.service.updateValuesOrder(input);
  }

  @Mutation(() => BaseAttributeType)
  public async updateAttribute(@Args('input') input: UpdateAttributeInput) {
    return await this.service.updateValue(input);
  }
}
