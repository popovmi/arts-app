import { UserModule } from '@/modules/user';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Customer])],
  providers: [CustomerService, CustomerResolver],
  exports: [CustomerService],
})
export class CustomerModule {}
