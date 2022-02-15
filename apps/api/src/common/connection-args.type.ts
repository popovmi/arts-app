import { Field, InputType } from '@nestjs/graphql';
import { ConnectionArguments, ConnectionCursor, fromGlobalId } from 'graphql-relay';

type PagingMeta =
    | { pagingType: 'forward'; after?: string; first: number }
    | { pagingType: 'backward'; before?: string; last: number }
    | { pagingType: 'none' };

function checkPagingSanity(args: ConnectionArgs): PagingMeta {
    const { first = 0, last = 0, after, before } = args;
    const isForwardPaging = !!first || !!after;
    const isBackwardPaging = !!last || !!before;

    if (isForwardPaging && isBackwardPaging) {
        throw new Error('Relay pagination cannot be forwards AND backwards!');
    }
    if ((isForwardPaging && before) || (isBackwardPaging && after)) {
        throw new Error('Paging must use either first/after or last/before!');
    }
    if ((isForwardPaging && first < 0) || (isBackwardPaging && last < 0)) {
        throw new Error('Paging take must be positive!');
    }
    if (last && !before) {
        throw new Error("When paging backwards, a 'before' argument is required!");
    }

    return isForwardPaging
        ? { pagingType: 'forward', after, first }
        : isBackwardPaging
        ? { pagingType: 'backward', before, last }
        : { pagingType: 'none' };
}

const getId = (cursor: ConnectionCursor) => parseInt(fromGlobalId(cursor).id, 10);
const nextId = (cursor: ConnectionCursor) => getId(cursor) + 1;

function getPagingParameters(args: ConnectionArgs) {
    const meta = checkPagingSanity(args);

    switch (meta.pagingType) {
        case 'forward': {
            return {
                take: meta.first,
                skip: meta.after ? nextId(meta.after) : 0,
            };
        }
        case 'backward': {
            const { last, before } = meta;
            let take = last;
            let skip = getId(before) - last;

            if (skip < 0) {
                take = Math.max(last + skip, 0);
                skip = 0;
            }

            return { skip, take };
        }
        default:
            return {};
    }
}

@InputType()
export default class ConnectionArgs implements ConnectionArguments {
    @Field(() => String, { nullable: true, description: 'Paginate before opaque cursor' })
    public before?: ConnectionCursor;

    @Field(() => String, { nullable: true, description: 'Paginate after opaque cursor' })
    public after?: ConnectionCursor;

    @Field({ nullable: true, description: 'Paginate first' })
    public first?: number;

    @Field({ nullable: true, description: 'Paginate last' })
    public last?: number;

    pagingParams() {
        return getPagingParameters(this);
    }
}
