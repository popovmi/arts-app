import { registerEnumType } from '@nestjs/graphql';

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  valuesMap: { ASC: { description: 'Ascending' }, DESC: { description: 'Descending' } },
});
