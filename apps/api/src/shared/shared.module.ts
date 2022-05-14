import { Global, Module } from '@nestjs/common';
import { DateScalar } from './scalar/date.scalar';
import { ApiConfigService } from './services/api-config.service';

@Global()
@Module({
    providers: [DateScalar, ApiConfigService],
    exports: [DateScalar, ApiConfigService],
})
export class SharedModule {}
