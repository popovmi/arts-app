import { Brackets, SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';
import {
  BooleanFieldOption,
  DateFieldOptions,
  NumberFieldOptions,
  StringFieldOption,
} from 'common/filter-input.type';

export enum Operator {
  AND = 'AND',
  OR = 'OR',
}

export interface Field {
  [key: string]: StringFieldOption | BooleanFieldOption | NumberFieldOptions | DateFieldOptions;
}

export type Where = {
  [K in Operator]?: (Where | Field)[];
};
export const filterQuery = <T>(query: SelectQueryBuilder<T>, where: Where) => {
  if (!where) {
    return query;
  } else {
    return traverseTree(query, where) as SelectQueryBuilder<T>;
  }
};

const traverseTree = (query: WhereExpressionBuilder, where: Where, upperOperator = Operator.AND) => {
  Object.keys(where).forEach((key) => {
    if (key === Operator.OR) {
      query = query.orWhere(buildNewBrackets(where, Operator.OR));
    } else if (key === Operator.AND) {
      query = query.andWhere(buildNewBrackets(where, Operator.AND));
    } else {
      // Field
      query = handleArgs(query, where as Field, upperOperator === Operator.AND ? 'andWhere' : 'orWhere');
    }
  });

  return query;
};
const buildNewBrackets = (where: Where, operator: Operator) => {
  return new Brackets((qb) =>
    where[operator].map((queryArray) => {
      traverseTree(qb, queryArray, operator);
    })
  );
};

const handleArgs = (query: WhereExpressionBuilder, where: Where, andOr: 'andWhere' | 'orWhere') => {
  const whereArgs = Object.entries(where);
  whereArgs.forEach((whereArg) => {
    const [fieldName, filters] = whereArg;
    const ops = Object.entries(filters);

    ops.forEach((parameters) => {
      const [operation, value] = parameters;
      switch (operation) {
        case 'is': {
          query[andOr](`"${fieldName}" = :isvalue`, { isvalue: value });
          break;
        }
        case 'not': {
          query[andOr](`"${fieldName}" != :notvalue`, { notvalue: value });
          break;
        }
        case 'in': {
          query[andOr](`"${fieldName}" IN (:...invalue)`, { invalue: value });
          break;
        }
        case 'not_in': {
          query[andOr](`"${fieldName}" NOT IN (:...notinvalue)`, {
            notinvalue: value,
          });
          break;
        }
        case 'lt': {
          query[andOr](`"${fieldName}" < :ltvalue`, { ltvalue: value });
          break;
        }
        case 'lte': {
          query[andOr](`"${fieldName}" <= :ltevalue`, { ltevalue: value });
          break;
        }
        case 'gt': {
          query[andOr](`"${fieldName}" > :gtvalue`, { gtvalue: value });
          break;
        }
        case 'gte': {
          query[andOr](`"${fieldName}" >= :gtevalue`, { gtevalue: value });
          break;
        }
        case 'contains': {
          query[andOr](`"${fieldName}" ILIKE :convalue`, {
            convalue: `%${value}%`,
          });
          break;
        }
        case 'not_contains': {
          query[andOr](`"${fieldName}" NOT ILIKE :notconvalue`, {
            notconvalue: `%${value}%`,
          });
          break;
        }
        case 'starts_with': {
          query[andOr](`"${fieldName}" ILIKE :swvalue`, {
            swvalue: `${value}%`,
          });
          break;
        }
        case 'not_starts_with': {
          query[andOr](`"${fieldName}" NOT ILIKE :nswvalue`, {
            nswvalue: `${value}%`,
          });
          break;
        }
        case 'ends_with': {
          query[andOr](`"${fieldName}" ILIKE :ewvalue`, {
            ewvalue: `%${value}`,
          });
          break;
        }
        case 'not_ends_with': {
          query[andOr](`"${fieldName}" ILIKE :newvalue`, {
            newvalue: `%${value}`,
          });
          break;
        }
        default: {
          break;
        }
      }
    });
  });

  return query;
};
