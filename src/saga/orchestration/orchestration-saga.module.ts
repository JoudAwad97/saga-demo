import { Module } from '@nestjs/common';
import { OrchestrationSagaService } from './orchestration-saga.service';
import { OrderModule } from '../../order/order.module';
import { ConsumerModule } from '../../consumer/consumer.module';
import { KitchenModule } from '../../kitchen/kitchen.module';
import { AccountingModule } from '../../accounting/accounting.module';

@Module({
  imports: [OrderModule, ConsumerModule, KitchenModule, AccountingModule],
  providers: [OrchestrationSagaService],
  exports: [OrchestrationSagaService],
})
export class OrchestrationSagaModule {}
