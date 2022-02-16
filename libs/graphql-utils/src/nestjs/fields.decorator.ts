import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { resolveFields } from '../graphql';

export const Fields = (deep = true, parent: string | string[] = []) => {
    return createParamDecorator<
        {
            deep: boolean;
            parent: string | string[];
        },
        ExecutionContext,
        string[]
    >(({ deep, parent }, context) => {
        const ctx = GqlExecutionContext.create(context);
        const info = ctx.getInfo();
        return resolveFields(info, deep, parent);
    })({ deep, parent });
};
