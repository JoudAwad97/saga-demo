import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChoreographySagaService } from './choreography/choreography-saga.service';
import { OrchestrationSagaService } from './orchestration/orchestration-saga.service';
import { OrderService } from '../order/order.service';
import { ConsumerService } from '../consumer/consumer.service';
import { KitchenService } from '../kitchen/kitchen.service';
import { AccountingService } from '../accounting/accounting.service';

class CreateOrderDto {
  consumerId: string;
  amount: number;
  description: string;
}

class CreateConsumerDto {
  name: string;
  creditLimit?: number;
}

@Controller('saga')
export class SagaController {
  constructor(
    private readonly choreographySaga: ChoreographySagaService,
    private readonly orchestrationSaga: OrchestrationSagaService,
    private readonly orderService: OrderService,
    private readonly consumerService: ConsumerService,
    private readonly kitchenService: KitchenService,
    private readonly accountingService: AccountingService,
  ) {}

  @Post('consumers')
  async createConsumer(@Body() dto: CreateConsumerDto) {
    return this.consumerService.createConsumer(dto.name, dto.creditLimit);
  }

  @Post('choreography/orders')
  async createOrderChoreography(@Body() dto: CreateOrderDto) {
    return this.choreographySaga.createOrder(dto.consumerId, dto.amount, dto.description);
  }

  @Post('orchestration/orders')
  async createOrderOrchestration(@Body() dto: CreateOrderDto) {
    return this.orchestrationSaga.createOrder(dto.consumerId, dto.amount, dto.description);
  }

  @Get('orders/:id')
  async getOrder(@Param('id') id: string) {
    const order = await this.orderService.findById(id);
    const ticket = await this.kitchenService.findByOrderId(id);
    const authorization = await this.accountingService.findByOrderId(id);
    return { order, ticket, authorization };
  }
}
