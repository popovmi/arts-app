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
export const filterQuery = <T>(
    query: SelectQueryBuilder<T>,
    alias: string,
    where: Where,
    relations: string[] = []
) => {
    if (!where) {
        return query;
    } else {
        Object.keys(where).forEach((key) => {
            if (relations.includes(key)) {
                query = filterQuery(query.leftJoin(`${query.alias}.${key}`, key), key, where[key]);
            }
        });

        return traverseTree(query, alias, where) as SelectQueryBuilder<T>;
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
                { [key]: where[key] } as Field,
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
        let i = 1;

        ops.forEach((parameters) => {
            const [operation, value] = parameters;
            const paramName = `${fieldName}${operation}Param${i++}`;

            switch (operation) {
                case 'is': {
                    query[andOr](`${alias}."${fieldName}" = :${paramName} `, { [paramName]: value });
                    break;
                }
                case 'not': {
                    query[andOr](`${alias}."${fieldName}" != :${paramName}`, { [paramName]: value });
                    break;
                }
                case 'in': {
                    query[andOr](`${alias}."${fieldName}" IN (:...${paramName})`, { [paramName]: value });
                    break;
                }
                case 'notIn': {
                    query[andOr](`${alias}."${fieldName}" NOT IN (:...${paramName})`, {
                        [paramName]: value,
                    });
                    break;
                }
                case 'lt': {
                    query[andOr](`${alias}."${fieldName}" < :${paramName}`, { [paramName]: value });
                    break;
                }
                case 'lte': {
                    query[andOr](`${alias}."${fieldName}" <= :${paramName}`, { [paramName]: value });
                    break;
                }
                case 'gt': {
                    query[andOr](`${alias}."${fieldName}" > :${paramName}`, { [paramName]: value });
                    break;
                }
                case 'gte': {
                    query[andOr](`${alias}."${fieldName}" >= :${paramName}`, { [paramName]: value });
                    break;
                }
                case 'contains': {
                    query[andOr](`${alias}."${fieldName}" ILIKE :${paramName}`, {
                        [paramName]: `%${value}%`,
                    });
                    break;
                }
                case 'notContains': {
                    query[andOr](`${alias}."${fieldName}" NOT ILIKE :${paramName}`, {
                        [paramName]: `%${value}%`,
                    });
                    break;
                }
                case 'startsWith': {
                    query[andOr](`${alias}."${fieldName}" ILIKE :${paramName}`, {
                        [paramName]: `${value}%`,
                    });
                    break;
                }
                case 'notStartsWith': {
                    query[andOr](`${alias}."${fieldName}" NOT ILIKE :${paramName}`, {
                        [paramName]: `${value}%`,
                    });
                    break;
                }
                case 'endsWith': {
                    query[andOr](`${alias}."${fieldName}" ILIKE :${paramName}`, {
                        [paramName]: `%${value}`,
                    });
                    break;
                }
                case 'notEndsWith': {
                    query[andOr](`${alias}."${fieldName}" ILIKE :${paramName}`, {
                        [paramName]: `%${value}`,
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
