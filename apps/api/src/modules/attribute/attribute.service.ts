import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { AttributeType } from './attribute-type';
import { CreateAttributeInput, UpdateAttributeInput, UpdateAttributeValueOrderInput } from './dto';
import * as Entities from './entities';

const EntitiesArray = Object.values(Entities);

@Injectable()
export class AttributeService {
    constructor(@InjectEntityManager() readonly em: EntityManager) {}

    private getType = (type: AttributeType) =>
        EntitiesArray.find((entityClass) => entityClass.attributeType === type);

    public async create({ name, active, type }: CreateAttributeInput) {
        const Attribute = this.getType(type);
        const valueOrder =
            ((
                await this.em
                    .createQueryBuilder<typeof Attribute>(Attribute, 'attribute')
                    .select('MAX("valueOrder")', 'max')
                    .getRawOne()
            ).max || 0) + 1;

        const result = this.em.create(Attribute, {
            name,
            active,
            valueOrder,
        });
        await this.em.save(result);

        return result;
    }

    public async getValues(type: AttributeType) {
        const result = await this.em.find(this.getType(type), { order: { valueOrder: 'ASC' } });
        return result;
    }

    @Transactional()
    public async updateValuesOrder(input: UpdateAttributeValueOrderInput) {
        const Attribute = this.getType(input.type);
        const isBackward = input.direction === 'backward';
        const { newOrder, oldOrder } = input;
        const [updateFrom, updateTo] = isBackward ? [newOrder, oldOrder - 1] : [oldOrder + 1, newOrder];

        await this.em.update(Attribute, { valueOrder: oldOrder }, { valueOrder: -1 });

        for (const currentOrder of Array.from({ length: updateTo - updateFrom + 1 }, (_, i) =>
            isBackward ? updateTo - i : i + updateFrom
        )) {
            await this.em.update(
                Attribute,
                { valueOrder: currentOrder },
                { valueOrder: isBackward ? currentOrder + 1 : currentOrder - 1 }
            );
        }

        await this.em.update(Attribute, { valueOrder: -1 }, { valueOrder: newOrder });

        return await this.getValues(input.type);
    }

    public async updateValue({ type, active, name, id }: UpdateAttributeInput) {
        const Attribute = this.getType(type);
        const attributeValue = await this.em.findOneOrFail(Attribute, { id });

        Object.assign(attributeValue, {
            ...(typeof name === 'string' ? { name } : {}),
            ...(typeof active === 'boolean' ? { active } : {}),
        });

        return await this.em.save(Attribute, attributeValue);
    }
}
