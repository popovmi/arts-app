import { AuthGuard, RolesGuard } from '@/modules/auth';
import { Role } from '@/modules/user';
import { Roles } from '@/shared/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AttributeType } from './attribute-type';
import { AttributeService } from './attribute.service';
import {
    BaseAttributeType,
    CreateAttributeInput,
    DeleteAttributeInput,
    UpdateAttributeInput,
    UpdateAttributeValueOrderInput,
} from './dto';

@Resolver()
@UseGuards(AuthGuard, RolesGuard)
export class AttributeResolver {
    constructor(readonly service: AttributeService) {}

    @Mutation(() => BaseAttributeType)
    @Roles(Role.ADMIN)
    public async createAttribute(@Args('input') input: CreateAttributeInput) {
        return await this.service.create(input);
    }

    @Query(() => BaseAttributeType)
    @Roles(Role.ADMIN, Role.USER)
    public async attribute(
        @Args('type', { type: () => AttributeType }) type: AttributeType,
        @Args('id', { type: () => Int }) id: number
    ) {
        return await this.service.getAttribute(type, id);
    }

    @Query(() => [BaseAttributeType])
    @Roles(Role.ADMIN, Role.USER)
    public async attributes(@Args('type', { type: () => AttributeType }) type: AttributeType) {
        return await this.service.getAttributes(type);
    }

    @Mutation(() => [BaseAttributeType])
    @Roles(Role.ADMIN)
    public async updateAttributesOrder(@Args('input') input: UpdateAttributeValueOrderInput) {
        return await this.service.updateValuesOrder(input);
    }

    @Mutation(() => BaseAttributeType)
    @Roles(Role.ADMIN)
    public async updateAttribute(@Args('input') input: UpdateAttributeInput) {
        return await this.service.updateValue(input);
    }

    @Mutation(() => Boolean)
    @Roles(Role.ADMIN)
    public async deleteAttribute(@Args('input') input: DeleteAttributeInput) {
        await this.service.delete(input);
        return true;
    }
}
