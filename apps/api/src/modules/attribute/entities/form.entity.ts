import { Entity } from 'typeorm';
import { AttributeType } from '../attribute-type';
import { BaseAttribute } from './base-attribute.entity';

@Entity()
export class Form extends BaseAttribute {
    static attributeType = AttributeType.form;
}
