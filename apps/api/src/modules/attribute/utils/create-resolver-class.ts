import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'modules/auth/auth.guard';
import { ObjectType } from 'typeorm';
import { BaseAttribute } from '../entities/base-attribute.entity';
import { BaseAttributeType } from '../dto/base-attribute.type';
import { CreateAttributeInput } from '../dto/create-attribute.input';
import { UpdateAttributeValueOrderInput } from '../dto/update-order.input';
import { AttributeService } from './create-service-class';
import { UpdateAttributeInput } from '../dto/update-attribute.input';

export function createAttributeResolverClass(Entity: ObjectType<BaseAttribute>) {
    const serviceName = `${Entity.name}Service`;
    @Resolver()
    @UseGuards(AuthGuard)
    class AResolver {
        constructor(@Inject(serviceName) readonly service: AttributeService) {}

        @Mutation(() => BaseAttributeType, { name: `create${Entity.name}` })
        public async create(@Args('input') input: CreateAttributeInput) {
            return await this.service.create(input);
        }

        @Query(() => [BaseAttributeType], { name: `get${Entity.name}` })
        public async getValues() {
            return await this.service.getValues();
        }

        @Mutation(() => [BaseAttributeType], { name: `update${Entity.name}Order` })
        public async updateValuesOrder(@Args('input') input: UpdateAttributeValueOrderInput) {
            return await this.service.updateValuesOrder(input);
        }

        @Mutation(() => BaseAttributeType, { name: `update${Entity.name}` })
        public async updateAttribute(@Args('input') input: UpdateAttributeInput) {
            return await this.service.updateValue(input);
        }
    }

    return AResolver;
}
