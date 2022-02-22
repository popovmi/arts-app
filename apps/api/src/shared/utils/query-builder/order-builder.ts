import { OrderDirection } from '@/shared/types/order';
import { SelectQueryBuilder } from 'typeorm';

export interface Order {
  [key: string]: OrderDirection;
}

export const orderQuery = <T>(query: SelectQueryBuilder<T>, order: Order) => {
  Object.entries(order).forEach(([orderField, direction]) => {
    query.addOrderBy(`"${orderField}"`, direction);
  });
};
