import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { OrderService } from '../../order/order.service';
import { ConsumerService } from '../../consumer/consumer.service';
import { KitchenService } from '../../kitchen/kitchen.service';
import { AccountingService } from '../../accounting/accounting.service';
import { OrchestratorCommands, OrchestratorReplies } from '../../common/events';

/**
 * Orchestration-based SAGA: Central orchestrator coordinates all steps.
 * The orchestrator sends commands to services and processes their replies
 * to determine the next step.
 *
 * Happy path flow:
 * 1. Orchestrator -> Verify Consumer command -> Consumer Service
 * 2. Consumer Service -> Consumer Verified reply -> Orchestrator
 * 3. Orchestrator -> Create Ticket command -> Kitchen Service
 * 4. Kitchen Service -> Ticket Created reply -> Orchestrator
 * 5. Orchestrator -> Authorize Card command -> Accounting Service
 * 6. Accounting Service -> Card Authorized reply -> Orchestrator
 * 7. Orchestrator -> Approve Ticket command -> Kitchen Service
 * 8. Orchestrator -> Approve Order command -> Order Service
 */

interface SagaState {
  orderId: string;
  consumerId: string;
  amount: number;
  description: string;
  currentStep: number;
  status: 'running' | 'completed' | 'compensating' | 'failed';
}

@Injectable()
export class OrchestrationSagaService {
  private readonly logger = new Logger(OrchestrationSagaService.name);
  private sagaStates = new Map<string, SagaState>();

  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly orderService: OrderService,
    private readonly consumerService: ConsumerService,
    private readonly kitchenService: KitchenService,
    private readonly accountingService: AccountingService,
  ) {}

  /**
   * Entry point: Create an order and start the orchestration SAGA
   */
  async createOrder(consumerId: string, amount: number, description: string) {
    // Step 1: Create Order in APPROVAL_PENDING state
    const order = await this.orderService.createOrder(consumerId, amount, 'orchestration');

    this.logger.log(`[SAGA START] Orchestration saga started for order ${order.id}`);

    // Initialize saga state
    this.sagaStates.set(order.id, {
      orderId: order.id,
      consumerId,
      amount,
      description,
      currentStep: 1,
      status: 'running',
    });

    // Step 1: Send Verify Consumer command
    this.logger.log(`[Orchestrator] Step 1: Sending Verify Consumer command for order ${order.id}`);
    this.eventEmitter.emit(OrchestratorCommands.VERIFY_CONSUMER, {
      orderId: order.id,
      consumerId,
    });

    return order;
  }

  // ─── SERVICE HANDLERS (simulate service processing commands) ─────────

  @OnEvent(OrchestratorCommands.VERIFY_CONSUMER, { async: true })
  async handleVerifyConsumer(payload: { orderId: string; consumerId: string }) {
    this.logger.log(`[Consumer Service] Processing Verify Consumer command for order ${payload.orderId}`);

    const isValid = await this.consumerService.verifyConsumer(payload.consumerId);

    if (isValid) {
      this.eventEmitter.emit(OrchestratorReplies.CONSUMER_VERIFIED, { orderId: payload.orderId });
    } else {
      this.eventEmitter.emit(OrchestratorReplies.CONSUMER_VERIFICATION_FAILED, {
        orderId: payload.orderId,
        reason: 'Consumer not found or invalid',
      });
    }
  }

  @OnEvent(OrchestratorCommands.CREATE_TICKET, { async: true })
  async handleCreateTicket(payload: { orderId: string; description: string }) {
    this.logger.log(`[Kitchen Service] Processing Create Ticket command for order ${payload.orderId}`);

    const result = await this.kitchenService.createTicket(payload.orderId, payload.description);

    if (result.success) {
      this.eventEmitter.emit(OrchestratorReplies.TICKET_CREATED, {
        orderId: payload.orderId,
        ticketId: result.ticketId,
      });
    } else {
      this.eventEmitter.emit(OrchestratorReplies.TICKET_CREATION_FAILED, {
        orderId: payload.orderId,
        reason: result.reason,
      });
    }
  }

  @OnEvent(OrchestratorCommands.AUTHORIZE_CARD, { async: true })
  async handleAuthorizeCard(payload: { orderId: string; consumerId: string; amount: number }) {
    this.logger.log(`[Accounting Service] Processing Authorize Card command for order ${payload.orderId}`);

    const result = await this.accountingService.authorizeCreditCard(
      payload.orderId,
      payload.consumerId,
      payload.amount,
    );

    if (result.success) {
      this.eventEmitter.emit(OrchestratorReplies.CARD_AUTHORIZED, {
        orderId: payload.orderId,
        authorizationId: result.authorizationId,
      });
    } else {
      this.eventEmitter.emit(OrchestratorReplies.CARD_AUTHORIZATION_FAILED, {
        orderId: payload.orderId,
        reason: result.reason,
      });
    }
  }

  @OnEvent(OrchestratorCommands.APPROVE_TICKET, { async: true })
  async handleApproveTicket(payload: { orderId: string }) {
    this.logger.log(`[Kitchen Service] Processing Approve Ticket command for order ${payload.orderId}`);
    await this.kitchenService.approveTicket(payload.orderId);
    this.eventEmitter.emit(OrchestratorReplies.TICKET_APPROVED, { orderId: payload.orderId });
  }

  @OnEvent(OrchestratorCommands.APPROVE_ORDER, { async: true })
  async handleApproveOrder(payload: { orderId: string }) {
    this.logger.log(`[Order Service] Processing Approve Order command for order ${payload.orderId}`);
    await this.orderService.approveOrder(payload.orderId);
    this.eventEmitter.emit(OrchestratorReplies.ORDER_APPROVED, { orderId: payload.orderId });
  }

  @OnEvent(OrchestratorCommands.REJECT_TICKET, { async: true })
  async handleRejectTicket(payload: { orderId: string }) {
    this.logger.log(`[Kitchen Service] Processing Reject Ticket command for order ${payload.orderId}`);
    await this.kitchenService.rejectTicket(payload.orderId);
    this.eventEmitter.emit(OrchestratorReplies.TICKET_REJECTED, { orderId: payload.orderId });
  }

  @OnEvent(OrchestratorCommands.REJECT_ORDER, { async: true })
  async handleRejectOrder(payload: { orderId: string }) {
    this.logger.log(`[Order Service] Processing Reject Order command for order ${payload.orderId}`);
    await this.orderService.rejectOrder(payload.orderId);
    this.eventEmitter.emit(OrchestratorReplies.ORDER_REJECTED, { orderId: payload.orderId });
  }

  // ─── ORCHESTRATOR REPLY HANDLERS (decide next step) ──────────────────

  @OnEvent(OrchestratorReplies.CONSUMER_VERIFIED, { async: true })
  async onConsumerVerified(payload: { orderId: string }) {
    const state = this.sagaStates.get(payload.orderId);
    if (!state || state.status !== 'running') return;

    this.logger.log(`[Orchestrator] Consumer verified for order ${payload.orderId}. Moving to step 2.`);
    state.currentStep = 2;

    // Step 2: Send Create Ticket command
    this.logger.log(`[Orchestrator] Step 2: Sending Create Ticket command for order ${payload.orderId}`);
    this.eventEmitter.emit(OrchestratorCommands.CREATE_TICKET, {
      orderId: payload.orderId,
      description: state.description,
    });
  }

  @OnEvent(OrchestratorReplies.TICKET_CREATED, { async: true })
  async onTicketCreated(payload: { orderId: string; ticketId: string }) {
    const state = this.sagaStates.get(payload.orderId);
    if (!state || state.status !== 'running') return;

    this.logger.log(`[Orchestrator] Ticket created for order ${payload.orderId}. Moving to step 3.`);
    state.currentStep = 3;

    // Step 3: Send Authorize Card command
    this.logger.log(`[Orchestrator] Step 3: Sending Authorize Card command for order ${payload.orderId}`);
    this.eventEmitter.emit(OrchestratorCommands.AUTHORIZE_CARD, {
      orderId: payload.orderId,
      consumerId: state.consumerId,
      amount: state.amount,
    });
  }

  @OnEvent(OrchestratorReplies.CARD_AUTHORIZED, { async: true })
  async onCardAuthorized(payload: { orderId: string }) {
    const state = this.sagaStates.get(payload.orderId);
    if (!state || state.status !== 'running') return;

    this.logger.log(`[Orchestrator] Card authorized for order ${payload.orderId}. Moving to step 4.`);
    state.currentStep = 4;

    // Step 4: Send Approve Ticket command
    this.logger.log(`[Orchestrator] Step 4: Sending Approve Ticket command for order ${payload.orderId}`);
    this.eventEmitter.emit(OrchestratorCommands.APPROVE_TICKET, { orderId: payload.orderId });
  }

  @OnEvent(OrchestratorReplies.TICKET_APPROVED, { async: true })
  async onTicketApproved(payload: { orderId: string }) {
    const state = this.sagaStates.get(payload.orderId);
    if (!state || state.status !== 'running') return;

    this.logger.log(`[Orchestrator] Ticket approved for order ${payload.orderId}. Moving to step 5.`);
    state.currentStep = 5;

    // Step 5: Send Approve Order command
    this.logger.log(`[Orchestrator] Step 5: Sending Approve Order command for order ${payload.orderId}`);
    this.eventEmitter.emit(OrchestratorCommands.APPROVE_ORDER, { orderId: payload.orderId });
  }

  @OnEvent(OrchestratorReplies.ORDER_APPROVED, { async: true })
  async onOrderApproved(payload: { orderId: string }) {
    const state = this.sagaStates.get(payload.orderId);
    if (!state) return;

    state.status = 'completed';
    this.sagaStates.delete(payload.orderId);
    this.logger.log(`[SAGA COMPLETE] Orchestration saga completed successfully for order ${payload.orderId}`);
  }

  // ─── COMPENSATION FLOW ───────────────────────────────────────────────

  @OnEvent(OrchestratorReplies.CONSUMER_VERIFICATION_FAILED, { async: true })
  async onConsumerVerificationFailed(payload: { orderId: string; reason: string }) {
    const state = this.sagaStates.get(payload.orderId);
    if (!state) return;

    this.logger.warn(
      `[Orchestrator] Consumer verification failed for order ${payload.orderId}: ${payload.reason}`,
    );
    state.status = 'compensating';

    // Only order was created at step 1 -> reject order
    this.logger.warn(`[Orchestrator] Compensating: Rejecting order ${payload.orderId}`);
    this.eventEmitter.emit(OrchestratorCommands.REJECT_ORDER, { orderId: payload.orderId });
  }

  @OnEvent(OrchestratorReplies.TICKET_CREATION_FAILED, { async: true })
  async onTicketCreationFailed(payload: { orderId: string; reason: string }) {
    const state = this.sagaStates.get(payload.orderId);
    if (!state) return;

    this.logger.warn(
      `[Orchestrator] Ticket creation failed for order ${payload.orderId}: ${payload.reason}`,
    );
    state.status = 'compensating';

    // Order was created at step 1 -> reject order (no ticket to compensate since it failed)
    this.logger.warn(`[Orchestrator] Compensating: Rejecting order ${payload.orderId}`);
    this.eventEmitter.emit(OrchestratorCommands.REJECT_ORDER, { orderId: payload.orderId });
  }

  @OnEvent(OrchestratorReplies.CARD_AUTHORIZATION_FAILED, { async: true })
  async onCardAuthorizationFailed(payload: { orderId: string; reason: string }) {
    const state = this.sagaStates.get(payload.orderId);
    if (!state) return;

    this.logger.warn(
      `[Orchestrator] Card authorization failed for order ${payload.orderId}: ${payload.reason}`,
    );
    state.status = 'compensating';

    // Both order and ticket were created -> reject ticket first, then reject order
    this.logger.warn(`[Orchestrator] Compensating: Rejecting ticket for order ${payload.orderId}`);
    this.eventEmitter.emit(OrchestratorCommands.REJECT_TICKET, { orderId: payload.orderId });
  }

  @OnEvent(OrchestratorReplies.TICKET_REJECTED, { async: true })
  async onTicketRejected(payload: { orderId: string }) {
    const state = this.sagaStates.get(payload.orderId);
    if (!state || state.status !== 'compensating') return;

    // Continue compensation: reject order
    this.logger.warn(`[Orchestrator] Compensating: Rejecting order ${payload.orderId}`);
    this.eventEmitter.emit(OrchestratorCommands.REJECT_ORDER, { orderId: payload.orderId });
  }

  @OnEvent(OrchestratorReplies.ORDER_REJECTED, { async: true })
  async onOrderRejected(payload: { orderId: string }) {
    const state = this.sagaStates.get(payload.orderId);
    if (!state) return;

    state.status = 'failed';
    this.sagaStates.delete(payload.orderId);
    this.logger.warn(`[SAGA FAILED] Orchestration saga rolled back for order ${payload.orderId}`);
  }

  getSagaState(orderId: string): SagaState | undefined {
    return this.sagaStates.get(orderId);
  }
}
