import { Entity } from 'typeorm';
import { AttributeType } from '../attribute-type';
import { BaseAttribute } from './base-attribute.entity';

@Entity()
export class NominalVolume extends BaseAttribute {
  static attributeType = AttributeType.nominalVolume;
}
