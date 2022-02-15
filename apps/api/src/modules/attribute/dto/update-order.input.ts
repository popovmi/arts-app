import { Field, InputType } from '@nestjs/graphql';
import { NotMatch } from 'shared/decorators/match.decorator';

type UpdateOrderDirection = 'forward' | 'backward';

@InputType()
export class UpdateAttributeValueOrderInput {
    @Field(() => Number)
    oldOrder: number;

    @Field(() => Number)
    @NotMatch(UpdateAttributeValueOrderInput, (req) => req.oldOrder)
    newOrder: number;

    get direction(): UpdateOrderDirection {
        return this.oldOrder > this.newOrder ? 'backward' : 'forward';
    }
}
