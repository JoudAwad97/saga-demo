import { ChoreographySagaService } from './choreography/choreography-saga.service';
import { OrchestrationSagaService } from './orchestration/orchestration-saga.service';
import { OrderService } from '../order/order.service';
import { ConsumerService } from '../consumer/consumer.service';
import { KitchenService } from '../kitchen/kitchen.service';
import { AccountingService } from '../accounting/accounting.service';
declare class CreateOrderDto {
    consumerId: string;
    amount: number;
    description: string;
}
declare class CreateConsumerDto {
    name: string;
    creditLimit?: number;
}
export declare class SagaController {
    private readonly choreographySaga;
    private readonly orchestrationSaga;
    private readonly orderService;
    private readonly consumerService;
    private readonly kitchenService;
    private readonly accountingService;
    constructor(choreographySaga: ChoreographySagaService, orchestrationSaga: OrchestrationSagaService, orderService: OrderService, consumerService: ConsumerService, kitchenService: KitchenService, accountingService: AccountingService);
    createConsumer(dto: CreateConsumerDto): Promise<{
        id: string;
        name: string;
        creditLimit: number;
        createdAt: Date;
    }>;
    createOrderChoreography(dto: CreateOrderDto): Promise<{
        id: string;
        createdAt: Date;
        consumerId: string;
        amount: number;
        state: import("@prisma/client").$Enums.OrderState;
        sagaType: string;
        updatedAt: Date;
    }>;
    createOrderOrchestration(dto: CreateOrderDto): Promise<{
        id: string;
        createdAt: Date;
        consumerId: string;
        amount: number;
        state: import("@prisma/client").$Enums.OrderState;
        sagaType: string;
        updatedAt: Date;
    }>;
    getOrder(id: string): Promise<{
        order: {
            id: string;
            createdAt: Date;
            consumerId: string;
            amount: number;
            state: import("@prisma/client").$Enums.OrderState;
            sagaType: string;
            updatedAt: Date;
        } | null;
        ticket: {
            id: string;
            createdAt: Date;
            state: import("@prisma/client").$Enums.TicketState;
            updatedAt: Date;
            orderId: string;
            description: string;
        } | null;
        authorization: {
            id: string;
            createdAt: Date;
            consumerId: string;
            amount: number;
            state: import("@prisma/client").$Enums.AuthorizationState;
            updatedAt: Date;
            orderId: string;
        } | null;
    }>;
}
export {};
