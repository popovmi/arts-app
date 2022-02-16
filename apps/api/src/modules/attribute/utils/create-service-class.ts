import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectType, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateAttributeInput, UpdateAttributeValueOrderInput, UpdateAttributeInput } from '../dto';
import { BaseAttribute } from '../entities/base-attribute.entity';

export interface AttributeService<T extends BaseAttribute = BaseAttribute> {
    create: (input: CreateAttributeInput) => Promise<T>;
    getValues: () => Promise<T[]>;
    updateValuesOrder: (input: UpdateAttributeValueOrderInput) => Promise<T[]>;
    updateValue: (iput: UpdateAttributeInput) => Promise<T>;
}

export function createAttributeServiceClass<T extends BaseAttribute = BaseAttribute>(Entity: ObjectType<T>) {
    @Injectable()
    class AService implements AttributeService<T> {
        constructor(@InjectRepository(Entity) readonly repository: Repository<ObjectType<T>>) {}

        public async create({ name, active }: CreateAttributeInput): Promise<T> {
            const valueOrder =
                ((await this.repository.createQueryBuilder().select('MAX("valueOrder")', 'max').getRawOne()).max ||
                    0) + 1;

            const result = this.repository.create({
                name,
                active,
                valueOrder,
            });
            await this.repository.save(result);

            return result as unknown as T;
        }

        public async getValues(): Promise<T[]> {
            const result = await this.repository.find({ order: { valueOrder: 'ASC' } });
            return result as unknown as T[];
        }

        @Transactional()
        public async updateValuesOrder(input: UpdateAttributeValueOrderInput) {
            const isBackward = input.direction === 'backward';
            const { newOrder, oldOrder } = input;
            const [updateFrom, updateTo] = isBackward ? [newOrder, oldOrder - 1] : [oldOrder + 1, newOrder];

            await this.repository.update({ valueOrder: oldOrder }, { valueOrder: -1 });

            for (const currentOrder of Array.from({ length: updateTo - updateFrom + 1 }, (_, i) =>
                isBackward ? updateTo - i : i + updateFrom
            )) {
                await this.repository.update(
                    { valueOrder: currentOrder },
                    { valueOrder: isBackward ? currentOrder + 1 : currentOrder - 1 }
                );
            }

            await this.repository.update({ valueOrder: -1 }, { valueOrder: newOrder });

            return await this.getValues();
        }

        public async updateValue({ active, name, id }: UpdateAttributeInput) {
            const attributeValue = await this.repository.findOneOrFail({ id });

            Object.assign(attributeValue, {
                ...(typeof name === 'string' ? { name } : {}),
                ...(typeof active === 'boolean' ? { active } : {}),
            });

            return (await this.repository.save(attributeValue)) as unknown as T;
        }
    }
    return AService;
}
