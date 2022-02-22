import { Entity } from 'typeorm';
import { AttributeType } from '../attribute-type';
import { BaseAttribute } from './base-attribute.entity';

@Entity()
export class ProductType extends BaseAttribute {
  static attributeType = AttributeType.productType;
}
