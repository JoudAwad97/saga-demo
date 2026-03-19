import { Module } from '@nestjs/common';
import { ChoreographySagaService } from './choreography-saga.service';
import { OrderModule } from '../../order/order.module';
import { ConsumerModule } from '../../consumer/consumer.module';
import { KitchenModule } from '../../kitchen/kitchen.module';
import { AccountingModule } from '../../accounting/accounting.module';

@Module({
  imports: [OrderModule, ConsumerModule, KitchenModule, AccountingModule],
  providers: [ChoreographySagaService],
  exports: [ChoreographySagaService],
})
export class ChoreographySagaModule {}
