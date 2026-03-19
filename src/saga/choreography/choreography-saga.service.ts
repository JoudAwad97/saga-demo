import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { OrderService } from '../../order/order.service';
import { ConsumerService } from '../../consumer/consumer.service';
import { KitchenService } from '../../kitchen/kitchen.service';
import { AccountingService } from '../../accounting/accounting.service';
import { ChoreographyEvents } from '../../common/events';
import type {
  OrderCreatedPayload,
  ConsumerVerifiedPayload,
  TicketCreatedPayload,
  CreditCardAuthorizedPayload,
  SagaFailurePayload,
} from '../../common/events';

/**
 * Choreography-based SAGA: No central coordinator.
 * Each service publishes events and other services react to them.
 *
 * Happy path flow:
 * 1. Order Service -> publishes OrderCreated
 * 2. Consumer Service -> consumes OrderCreated, publishes ConsumerVerified
 * 3. Kitchen Service -> consumes OrderCreated, publishes TicketCreated
 * 4. Accounting Service -> consumes ConsumerVerified + TicketCreated, publishes CreditCardAuthorized
 * 5. Kitchen Service -> consumes CreditCardAuthorized, approves Ticket
 * 6. Order Service -> consumes CreditCardAuthorized, approves Order
 */
@Injectable()
export class ChoreographySagaService {
  private readonly logger = new Logger(ChoreographySagaService.name);

  // Track which prerequisites are met for accounting (needs both consumer verified + ticket created)
  private accountingPrerequisites = new Map<
    string,
    { consumerVerified: boolean; ticketCreated: boolean; consumerId: string; amount: number }
  >();

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly orderService: OrderService,
    private readonly consumerService: ConsumerService,
    private readonly kitchenService: KitchenService,
    private readonly accountingService: AccountingService,
  ) {}

  /**
   * Entry point: Create an order and kick off the choreography SAGA
   */
  async createOrder(consumerId: string, amount: number, description: string) {
    // Step 1: Create Order in APPROVAL_PENDING state
    const order = await this.orderService.createOrder(consumerId, amount, 'choreography');

    this.logger.log(`[SAGA START] Choreography saga started for order ${order.id}`);

    // Initialize accounting prerequisites tracker
    this.accountingPrerequisites.set(order.id, {
      consumerVerified: false,
      ticketCreated: false,
      consumerId,
      amount,
    });

    // Publish OrderCreated event
    const payload: OrderCreatedPayload = {
      orderId: order.id,
      consumerId,
      amount,
      description,
    };
    this.eventEmitter.emit(ChoreographyEvents.ORDER_CREATED, payload);

    return order;
  }

  // ─── Consumer Service reacts to OrderCreated ─────────────────────────

  @OnEvent(ChoreographyEvents.ORDER_CREATED, { async: true })
  async handleOrderCreated_VerifyConsumer(payload: OrderCreatedPayload) {
    this.logger.log(`[Consumer Service] Verifying consumer ${payload.consumerId} for order ${payload.orderId}`);

    const isValid = await this.consumerService.verifyConsumer(payload.consumerId);

    if (isValid) {
      this.eventEmitter.emit(ChoreographyEvents.CONSUMER_VERIFIED, {
        orderId: payload.orderId,
        consumerId: payload.consumerId,
      } as ConsumerVerifiedPayload);
    } else {
      this.eventEmitter.emit(ChoreographyEvents.CONSUMER_VERIFICATION_FAILED, {
        orderId: payload.orderId,
        reason: 'Consumer verification failed',
      } as SagaFailurePayload);
    }
  }

  // ─── Kitchen Service reacts to OrderCreated ──────────────────────────

  @OnEvent(ChoreographyEvents.ORDER_CREATED, { async: true })
  async handleOrderCreated_CreateTicket(payload: OrderCreatedPayload) {
    this.logger.log(`[Kitchen Service] Creating ticket for order ${payload.orderId}`);

    const result = await this.kitchenService.createTicket(payload.orderId, payload.description);

    if (result.success) {
      this.eventEmitter.emit(ChoreographyEvents.TICKET_CREATED, {
        orderId: payload.orderId,
        ticketId: result.ticketId,
      } as TicketCreatedPayload);
    } else {
      this.eventEmitter.emit(ChoreographyEvents.TICKET_CREATION_FAILED, {
        orderId: payload.orderId,
        reason: result.reason,
      } as SagaFailurePayload);
    }
  }

  // ─── Accounting Service reacts to ConsumerVerified ───────────────────

  @OnEvent(ChoreographyEvents.CONSUMER_VERIFIED, { async: true })
  async handleConsumerVerified(payload: ConsumerVerifiedPayload) {
    this.logger.log(`[Accounting Service] Consumer verified for order ${payload.orderId}`);

    const prereqs = this.accountingPrerequisites.get(payload.orderId);
    if (!prereqs) return;

    prereqs.consumerVerified = true;
    await this.tryAuthorizeCreditCard(payload.orderId);
  }

  // ─── Accounting Service reacts to TicketCreated ──────────────────────

  @OnEvent(ChoreographyEvents.TICKET_CREATED, { async: true })
  async handleTicketCreated(payload: TicketCreatedPayload) {
    this.logger.log(`[Accounting Service] Ticket created for order ${payload.orderId}`);

    const prereqs = this.accountingPrerequisites.get(payload.orderId);
    if (!prereqs) return;

    prereqs.ticketCreated = true;
    await this.tryAuthorizeCreditCard(payload.orderId);
  }

  /**
   * Accounting only authorizes when BOTH consumer is verified AND ticket is created
   */
  private async tryAuthorizeCreditCard(orderId: string) {
    const prereqs = this.accountingPrerequisites.get(orderId);
    if (!prereqs || !prereqs.consumerVerified || !prereqs.ticketCreated) return;

    this.logger.log(`[Accounting Service] Both prerequisites met, authorizing credit card for order ${orderId}`);

    const result = await this.accountingService.authorizeCreditCard(
      orderId,
      prereqs.consumerId,
      prereqs.amount,
    );

    // Clean up tracker
    this.accountingPrerequisites.delete(orderId);

    if (result.success) {
      this.eventEmitter.emit(ChoreographyEvents.CREDIT_CARD_AUTHORIZED, {
        orderId,
        authorizationId: result.authorizationId,
      } as CreditCardAuthorizedPayload);
    } else {
      this.eventEmitter.emit(ChoreographyEvents.CREDIT_CARD_AUTHORIZATION_FAILED, {
        orderId,
        reason: result.reason,
      } as SagaFailurePayload);
    }
  }

  // ─── Kitchen Service reacts to CreditCardAuthorized ──────────────────

  @OnEvent(ChoreographyEvents.CREDIT_CARD_AUTHORIZED, { async: true })
  async handleCreditCardAuthorized_ApproveTicket(payload: CreditCardAuthorizedPayload) {
    this.logger.log(`[Kitchen Service] Approving ticket for order ${payload.orderId}`);
    await this.kitchenService.approveTicket(payload.orderId);
  }

  // ─── Order Service reacts to CreditCardAuthorized ────────────────────

  @OnEvent(ChoreographyEvents.CREDIT_CARD_AUTHORIZED, { async: true })
  async handleCreditCardAuthorized_ApproveOrder(payload: CreditCardAuthorizedPayload) {
    this.logger.log(`[Order Service] Approving order ${payload.orderId}`);
    await this.orderService.approveOrder(payload.orderId);
    this.logger.log(`[SAGA COMPLETE] Choreography saga completed successfully for order ${payload.orderId}`);
  }

  // ─── COMPENSATING TRANSACTIONS ───────────────────────────────────────

  @OnEvent(ChoreographyEvents.CONSUMER_VERIFICATION_FAILED, { async: true })
  async handleConsumerVerificationFailed(payload: SagaFailurePayload) {
    this.logger.warn(`[COMPENSATION] Consumer verification failed for order ${payload.orderId}: ${payload.reason}`);
    this.accountingPrerequisites.delete(payload.orderId);
    await this.orderService.rejectOrder(payload.orderId);
    this.logger.warn(`[SAGA FAILED] Choreography saga failed for order ${payload.orderId}`);
  }

  @OnEvent(ChoreographyEvents.TICKET_CREATION_FAILED, { async: true })
  async handleTicketCreationFailed(payload: SagaFailurePayload) {
    this.logger.warn(`[COMPENSATION] Ticket creation failed for order ${payload.orderId}: ${payload.reason}`);
    this.accountingPrerequisites.delete(payload.orderId);
    await this.orderService.rejectOrder(payload.orderId);
    this.logger.warn(`[SAGA FAILED] Choreography saga failed for order ${payload.orderId}`);
  }

  @OnEvent(ChoreographyEvents.CREDIT_CARD_AUTHORIZATION_FAILED, { async: true })
  async handleCreditCardAuthorizationFailed(payload: SagaFailurePayload) {
    this.logger.warn(
      `[COMPENSATION] Credit card authorization failed for order ${payload.orderId}: ${payload.reason}`,
    );

    // Compensate: reject ticket and reject order
    await this.kitchenService.rejectTicket(payload.orderId);
    await this.orderService.rejectOrder(payload.orderId);
    this.logger.warn(`[SAGA FAILED] Choreography saga rolled back for order ${payload.orderId}`);
  }
}
