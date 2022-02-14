import { Global, Module } from '@nestjs/common';
import { DateScalar } from './scalar/date.scalar';
import { ApiConfigService } from './services/api-config.service';

export { ApiConfigService };

@Global()
@Module({
  providers: [ApiConfigService, DateScalar],
  exports: [ApiConfigService],
})
export class SharedModule {}
