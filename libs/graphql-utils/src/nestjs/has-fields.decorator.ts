import { hasFields } from '../graphql';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const HasFields = (...fields: (string | string[])[]) => {
    return createParamDecorator<(string | string[])[], ExecutionContext, boolean>((search, context) => {
        const ctx = GqlExecutionContext.create(context);
        const info = ctx.getInfo();

        for (const field of search) {
            if (!hasFields(info, field)) {
                return false;
            }
        }

        return true;
    })(fields);
};
