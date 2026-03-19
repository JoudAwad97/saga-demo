import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderService } from '../../order/order.service';
import { ConsumerService } from '../../consumer/consumer.service';
import { KitchenService } from '../../kitchen/kitchen.service';
import { AccountingService } from '../../accounting/accounting.service';
interface SagaState {
    orderId: string;
    consumerId: string;
    amount: number;
    description: string;
    currentStep: number;
    status: 'running' | 'completed' | 'compensating' | 'failed';
}
export declare class OrchestrationSagaService {
    private readonly eventEmitter;
    private readonly orderService;
    private readonly consumerService;
    private readonly kitchenService;
    private readonly accountingService;
    private readonly logger;
    private sagaStates;
    constructor(eventEmitter: EventEmitter2, orderService: OrderService, consumerService: ConsumerService, kitchenService: KitchenService, accountingService: AccountingService);
    createOrder(consumerId: string, amount: number, description: string): Promise<{
        id: string;
        createdAt: Date;
        consumerId: string;
        amount: number;
        state: import("@prisma/client").$Enums.OrderState;
        sagaType: string;
        updatedAt: Date;
    }>;
    handleVerifyConsumer(payload: {
        orderId: string;
        consumerId: string;
    }): Promise<void>;
    handleCreateTicket(payload: {
        orderId: string;
        description: string;
    }): Promise<void>;
    handleAuthorizeCard(payload: {
        orderId: string;
        consumerId: string;
        amount: number;
    }): Promise<void>;
    handleApproveTicket(payload: {
        orderId: string;
    }): Promise<void>;
    handleApproveOrder(payload: {
        orderId: string;
    }): Promise<void>;
    handleRejectTicket(payload: {
        orderId: string;
    }): Promise<void>;
    handleRejectOrder(payload: {
        orderId: string;
    }): Promise<void>;
    onConsumerVerified(payload: {
        orderId: string;
    }): Promise<void>;
    onTicketCreated(payload: {
        orderId: string;
        ticketId: string;
    }): Promise<void>;
    onCardAuthorized(payload: {
        orderId: string;
    }): Promise<void>;
    onTicketApproved(payload: {
        orderId: string;
    }): Promise<void>;
    onOrderApproved(payload: {
        orderId: string;
    }): Promise<void>;
    onConsumerVerificationFailed(payload: {
        orderId: string;
        reason: string;
    }): Promise<void>;
    onTicketCreationFailed(payload: {
        orderId: string;
        reason: string;
    }): Promise<void>;
    onCardAuthorizationFailed(payload: {
        orderId: string;
        reason: string;
    }): Promise<void>;
    onTicketRejected(payload: {
        orderId: string;
    }): Promise<void>;
    onOrderRejected(payload: {
        orderId: string;
    }): Promise<void>;
    getSagaState(orderId: string): SagaState | undefined;
}
export {};
