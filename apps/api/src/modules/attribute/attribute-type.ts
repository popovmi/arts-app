import { registerEnumType } from '@nestjs/graphql';

export enum AttributeType {
    artClass = 'artClass',
    bottomForm = 'bottomForm',
    form = 'form',
    height = 'height',
    nominalVolume = 'nominalVolume',
    productionMethod = 'productionMethod',
    productType = 'productType',
    ringType = 'ringType',
    dropNumber = 'dropNumber',
    intercenter = 'intercenter',
    sfm = 'sfm',
}

registerEnumType(AttributeType, { name: 'AttributeType' });
