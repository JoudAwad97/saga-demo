import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PrismaModule } from './prisma/prisma.module';
import { ConsumerModule } from './consumer/consumer.module';
import { KitchenModule } from './kitchen/kitchen.module';
import { AccountingModule } from './accounting/accounting.module';
import { OrderModule } from './order/order.module';
import { ChoreographySagaModule } from './saga/choreography/choreography-saga.module';
import { OrchestrationSagaModule } from './saga/orchestration/orchestration-saga.module';
import { SagaController } from './saga/saga.controller';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    PrismaModule,
    ConsumerModule,
    KitchenModule,
    AccountingModule,
    OrderModule,
    ChoreographySagaModule,
    OrchestrationSagaModule,
  ],
  controllers: [SagaController],
})
export class AppModule {}
