import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FieldMap as IFieldMap, resolveFieldMap } from '../graphql';

export const FieldMap = (deep = true, parent: string | string[] = []) => {
    return createParamDecorator<
        {
            deep: boolean;
            parent: string | string[];
        },
        ExecutionContext,
        IFieldMap
    >(({ deep, parent }, context) => {
        const ctx = GqlExecutionContext.create(context);
        const info = ctx.getInfo();
        return resolveFieldMap(info, deep, parent);
    })({ deep, parent });
};
