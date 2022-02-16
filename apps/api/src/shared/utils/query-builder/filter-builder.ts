import {
    BooleanFieldOption,
    DateFieldOptions,
    NumberFieldOptions,
    StringFieldOption,
} from '@/common/filter-input.type';
import { LogicalOperator } from '@/shared/types';
import { Brackets, SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm';

export interface Field {
    [key: string]: StringFieldOption | BooleanFieldOption | NumberFieldOptions | DateFieldOptions;
}

export type Where = {
    [K in LogicalOperator]?: (Where | Field)[];
};
export const filterQuery = <T>(query: SelectQueryBuilder<T>, where: Where) => {
    if (!where) {
        return query;
    } else {
        return traverseTree(query, query.alias, where) as SelectQueryBuilder<T>;
    }
};

const traverseTree = (
    query: WhereExpressionBuilder,
    alias: string,
    where: Where,
    upperOperator = LogicalOperator.AND
) => {
    Object.keys(where).forEach((key) => {
        if (key === LogicalOperator.OR) {
            query = query.orWhere(buildNewBrackets(where, alias, LogicalOperator.OR));
        } else if (key === LogicalOperator.AND) {
            query = query.andWhere(buildNewBrackets(where, alias, LogicalOperator.AND));
        } else {
            query = handleArgs(
                query,
                alias,
                where as Field,
                upperOperator === LogicalOperator.AND ? 'andWhere' : 'orWhere'
            );
        }
    });

    return query;
};
const buildNewBrackets = (where: Where, alias: string, operator: LogicalOperator) => {
    return new Brackets((qb) =>
        where[operator].map((queryArray) => {
            traverseTree(qb, alias, queryArray, operator);
        })
    );
};

const handleArgs = (query: WhereExpressionBuilder, alias: string, where: Where, andOr: 'andWhere' | 'orWhere') => {
    const whereArgs = Object.entries(where);
    whereArgs.forEach((whereArg) => {
        const [fieldName, filters] = whereArg;
        const ops = Object.entries(filters);

        ops.forEach((parameters) => {
            const [operation, value] = parameters;
            switch (operation) {
                case 'is': {
                    query[andOr](`${alias}."${fieldName}" = :isvalue`, { isvalue: value });
                    break;
                }
                case 'not': {
                    query[andOr](`${alias}."${fieldName}" != :notvalue`, { notvalue: value });
                    break;
                }
                case 'in': {
                    query[andOr](`${alias}."${fieldName}" IN (:...invalue)`, { invalue: value });
                    break;
                }
                case 'not_in': {
                    query[andOr](`${alias}."${fieldName}" NOT IN (:...notinvalue)`, {
                        notinvalue: value,
                    });
                    break;
                }
                case 'lt': {
                    query[andOr](`${alias}."${fieldName}" < :ltvalue`, { ltvalue: value });
                    break;
                }
                case 'lte': {
                    query[andOr](`${alias}."${fieldName}" <= :ltevalue`, { ltevalue: value });
                    break;
                }
                case 'gt': {
                    query[andOr](`${alias}."${fieldName}" > :gtvalue`, { gtvalue: value });
                    break;
                }
                case 'gte': {
                    query[andOr](`${alias}."${fieldName}" >= :gtevalue`, { gtevalue: value });
                    break;
                }
                case 'contains': {
                    query[andOr](`${alias}."${fieldName}" ILIKE :convalue`, {
                        convalue: `%${value}%`,
                    });
                    break;
                }
                case 'not_contains': {
                    query[andOr](`${alias}."${fieldName}" NOT ILIKE :notconvalue`, {
                        notconvalue: `%${value}%`,
                    });
                    break;
                }
                case 'starts_with': {
                    query[andOr](`${alias}."${fieldName}" ILIKE :swvalue`, {
                        swvalue: `${value}%`,
                    });
                    break;
                }
                case 'not_starts_with': {
                    query[andOr](`${alias}."${fieldName}" NOT ILIKE :nswvalue`, {
                        nswvalue: `${value}%`,
                    });
                    break;
                }
                case 'ends_with': {
                    query[andOr](`${alias}."${fieldName}" ILIKE :ewvalue`, {
                        ewvalue: `%${value}`,
                    });
                    break;
                }
                case 'not_ends_with': {
                    query[andOr](`${alias}."${fieldName}" ILIKE :newvalue`, {
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
