import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderService } from '../../order/order.service';
import { ConsumerService } from '../../consumer/consumer.service';
import { KitchenService } from '../../kitchen/kitchen.service';
import { AccountingService } from '../../accounting/accounting.service';
import type { OrderCreatedPayload, ConsumerVerifiedPayload, TicketCreatedPayload, CreditCardAuthorizedPayload, SagaFailurePayload } from '../../common/events';
export declare class ChoreographySagaService {
    private readonly eventEmitter;
    private readonly orderService;
    private readonly consumerService;
    private readonly kitchenService;
    private readonly accountingService;
    private readonly logger;
    private accountingPrerequisites;
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
    handleOrderCreated_VerifyConsumer(payload: OrderCreatedPayload): Promise<void>;
    handleOrderCreated_CreateTicket(payload: OrderCreatedPayload): Promise<void>;
    handleConsumerVerified(payload: ConsumerVerifiedPayload): Promise<void>;
    handleTicketCreated(payload: TicketCreatedPayload): Promise<void>;
    private tryAuthorizeCreditCard;
    handleCreditCardAuthorized_ApproveTicket(payload: CreditCardAuthorizedPayload): Promise<void>;
    handleCreditCardAuthorized_ApproveOrder(payload: CreditCardAuthorizedPayload): Promise<void>;
    handleConsumerVerificationFailed(payload: SagaFailurePayload): Promise<void>;
    handleTicketCreationFailed(payload: SagaFailurePayload): Promise<void>;
    handleCreditCardAuthorizationFailed(payload: SagaFailurePayload): Promise<void>;
}
