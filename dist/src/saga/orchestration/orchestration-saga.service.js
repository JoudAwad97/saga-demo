"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OrchestrationSagaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrchestrationSagaService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const order_service_1 = require("../../order/order.service");
const consumer_service_1 = require("../../consumer/consumer.service");
const kitchen_service_1 = require("../../kitchen/kitchen.service");
const accounting_service_1 = require("../../accounting/accounting.service");
const events_1 = require("../../common/events");
let OrchestrationSagaService = OrchestrationSagaService_1 = class OrchestrationSagaService {
    eventEmitter;
    orderService;
    consumerService;
    kitchenService;
    accountingService;
    logger = new common_1.Logger(OrchestrationSagaService_1.name);
    sagaStates = new Map();
    constructor(eventEmitter, orderService, consumerService, kitchenService, accountingService) {
        this.eventEmitter = eventEmitter;
        this.orderService = orderService;
        this.consumerService = consumerService;
        this.kitchenService = kitchenService;
        this.accountingService = accountingService;
    }
    async createOrder(consumerId, amount, description) {
        const order = await this.orderService.createOrder(consumerId, amount, 'orchestration');
        this.logger.log(`[SAGA START] Orchestration saga started for order ${order.id}`);
        this.sagaStates.set(order.id, {
            orderId: order.id,
            consumerId,
            amount,
            description,
            currentStep: 1,
            status: 'running',
        });
        this.logger.log(`[Orchestrator] Step 1: Sending Verify Consumer command for order ${order.id}`);
        this.eventEmitter.emit(events_1.OrchestratorCommands.VERIFY_CONSUMER, {
            orderId: order.id,
            consumerId,
        });
        return order;
    }
    async handleVerifyConsumer(payload) {
        this.logger.log(`[Consumer Service] Processing Verify Consumer command for order ${payload.orderId}`);
        const isValid = await this.consumerService.verifyConsumer(payload.consumerId);
        if (isValid) {
            this.eventEmitter.emit(events_1.OrchestratorReplies.CONSUMER_VERIFIED, { orderId: payload.orderId });
        }
        else {
            this.eventEmitter.emit(events_1.OrchestratorReplies.CONSUMER_VERIFICATION_FAILED, {
                orderId: payload.orderId,
                reason: 'Consumer not found or invalid',
            });
        }
    }
    async handleCreateTicket(payload) {
        this.logger.log(`[Kitchen Service] Processing Create Ticket command for order ${payload.orderId}`);
        const result = await this.kitchenService.createTicket(payload.orderId, payload.description);
        if (result.success) {
            this.eventEmitter.emit(events_1.OrchestratorReplies.TICKET_CREATED, {
                orderId: payload.orderId,
                ticketId: result.ticketId,
            });
        }
        else {
            this.eventEmitter.emit(events_1.OrchestratorReplies.TICKET_CREATION_FAILED, {
                orderId: payload.orderId,
                reason: result.reason,
            });
        }
    }
    async handleAuthorizeCard(payload) {
        this.logger.log(`[Accounting Service] Processing Authorize Card command for order ${payload.orderId}`);
        const result = await this.accountingService.authorizeCreditCard(payload.orderId, payload.consumerId, payload.amount);
        if (result.success) {
            this.eventEmitter.emit(events_1.OrchestratorReplies.CARD_AUTHORIZED, {
                orderId: payload.orderId,
                authorizationId: result.authorizationId,
            });
        }
        else {
            this.eventEmitter.emit(events_1.OrchestratorReplies.CARD_AUTHORIZATION_FAILED, {
                orderId: payload.orderId,
                reason: result.reason,
            });
        }
    }
    async handleApproveTicket(payload) {
        this.logger.log(`[Kitchen Service] Processing Approve Ticket command for order ${payload.orderId}`);
        await this.kitchenService.approveTicket(payload.orderId);
        this.eventEmitter.emit(events_1.OrchestratorReplies.TICKET_APPROVED, { orderId: payload.orderId });
    }
    async handleApproveOrder(payload) {
        this.logger.log(`[Order Service] Processing Approve Order command for order ${payload.orderId}`);
        await this.orderService.approveOrder(payload.orderId);
        this.eventEmitter.emit(events_1.OrchestratorReplies.ORDER_APPROVED, { orderId: payload.orderId });
    }
    async handleRejectTicket(payload) {
        this.logger.log(`[Kitchen Service] Processing Reject Ticket command for order ${payload.orderId}`);
        await this.kitchenService.rejectTicket(payload.orderId);
        this.eventEmitter.emit(events_1.OrchestratorReplies.TICKET_REJECTED, { orderId: payload.orderId });
    }
    async handleRejectOrder(payload) {
        this.logger.log(`[Order Service] Processing Reject Order command for order ${payload.orderId}`);
        await this.orderService.rejectOrder(payload.orderId);
        this.eventEmitter.emit(events_1.OrchestratorReplies.ORDER_REJECTED, { orderId: payload.orderId });
    }
    async onConsumerVerified(payload) {
        const state = this.sagaStates.get(payload.orderId);
        if (!state || state.status !== 'running')
            return;
        this.logger.log(`[Orchestrator] Consumer verified for order ${payload.orderId}. Moving to step 2.`);
        state.currentStep = 2;
        this.logger.log(`[Orchestrator] Step 2: Sending Create Ticket command for order ${payload.orderId}`);
        this.eventEmitter.emit(events_1.OrchestratorCommands.CREATE_TICKET, {
            orderId: payload.orderId,
            description: state.description,
        });
    }
    async onTicketCreated(payload) {
        const state = this.sagaStates.get(payload.orderId);
        if (!state || state.status !== 'running')
            return;
        this.logger.log(`[Orchestrator] Ticket created for order ${payload.orderId}. Moving to step 3.`);
        state.currentStep = 3;
        this.logger.log(`[Orchestrator] Step 3: Sending Authorize Card command for order ${payload.orderId}`);
        this.eventEmitter.emit(events_1.OrchestratorCommands.AUTHORIZE_CARD, {
            orderId: payload.orderId,
            consumerId: state.consumerId,
            amount: state.amount,
        });
    }
    async onCardAuthorized(payload) {
        const state = this.sagaStates.get(payload.orderId);
        if (!state || state.status !== 'running')
            return;
        this.logger.log(`[Orchestrator] Card authorized for order ${payload.orderId}. Moving to step 4.`);
        state.currentStep = 4;
        this.logger.log(`[Orchestrator] Step 4: Sending Approve Ticket command for order ${payload.orderId}`);
        this.eventEmitter.emit(events_1.OrchestratorCommands.APPROVE_TICKET, { orderId: payload.orderId });
    }
    async onTicketApproved(payload) {
        const state = this.sagaStates.get(payload.orderId);
        if (!state || state.status !== 'running')
            return;
        this.logger.log(`[Orchestrator] Ticket approved for order ${payload.orderId}. Moving to step 5.`);
        state.currentStep = 5;
        this.logger.log(`[Orchestrator] Step 5: Sending Approve Order command for order ${payload.orderId}`);
        this.eventEmitter.emit(events_1.OrchestratorCommands.APPROVE_ORDER, { orderId: payload.orderId });
    }
    async onOrderApproved(payload) {
        const state = this.sagaStates.get(payload.orderId);
        if (!state)
            return;
        state.status = 'completed';
        this.sagaStates.delete(payload.orderId);
        this.logger.log(`[SAGA COMPLETE] Orchestration saga completed successfully for order ${payload.orderId}`);
    }
    async onConsumerVerificationFailed(payload) {
        const state = this.sagaStates.get(payload.orderId);
        if (!state)
            return;
        this.logger.warn(`[Orchestrator] Consumer verification failed for order ${payload.orderId}: ${payload.reason}`);
        state.status = 'compensating';
        this.logger.warn(`[Orchestrator] Compensating: Rejecting order ${payload.orderId}`);
        this.eventEmitter.emit(events_1.OrchestratorCommands.REJECT_ORDER, { orderId: payload.orderId });
    }
    async onTicketCreationFailed(payload) {
        const state = this.sagaStates.get(payload.orderId);
        if (!state)
            return;
        this.logger.warn(`[Orchestrator] Ticket creation failed for order ${payload.orderId}: ${payload.reason}`);
        state.status = 'compensating';
        this.logger.warn(`[Orchestrator] Compensating: Rejecting order ${payload.orderId}`);
        this.eventEmitter.emit(events_1.OrchestratorCommands.REJECT_ORDER, { orderId: payload.orderId });
    }
    async onCardAuthorizationFailed(payload) {
        const state = this.sagaStates.get(payload.orderId);
        if (!state)
            return;
        this.logger.warn(`[Orchestrator] Card authorization failed for order ${payload.orderId}: ${payload.reason}`);
        state.status = 'compensating';
        this.logger.warn(`[Orchestrator] Compensating: Rejecting ticket for order ${payload.orderId}`);
        this.eventEmitter.emit(events_1.OrchestratorCommands.REJECT_TICKET, { orderId: payload.orderId });
    }
    async onTicketRejected(payload) {
        const state = this.sagaStates.get(payload.orderId);
        if (!state || state.status !== 'compensating')
            return;
        this.logger.warn(`[Orchestrator] Compensating: Rejecting order ${payload.orderId}`);
        this.eventEmitter.emit(events_1.OrchestratorCommands.REJECT_ORDER, { orderId: payload.orderId });
    }
    async onOrderRejected(payload) {
        const state = this.sagaStates.get(payload.orderId);
        if (!state)
            return;
        state.status = 'failed';
        this.sagaStates.delete(payload.orderId);
        this.logger.warn(`[SAGA FAILED] Orchestration saga rolled back for order ${payload.orderId}`);
    }
    getSagaState(orderId) {
        return this.sagaStates.get(orderId);
    }
};
exports.OrchestrationSagaService = OrchestrationSagaService;
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorCommands.VERIFY_CONSUMER, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "handleVerifyConsumer", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorCommands.CREATE_TICKET, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "handleCreateTicket", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorCommands.AUTHORIZE_CARD, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "handleAuthorizeCard", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorCommands.APPROVE_TICKET, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "handleApproveTicket", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorCommands.APPROVE_ORDER, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "handleApproveOrder", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorCommands.REJECT_TICKET, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "handleRejectTicket", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorCommands.REJECT_ORDER, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "handleRejectOrder", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorReplies.CONSUMER_VERIFIED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "onConsumerVerified", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorReplies.TICKET_CREATED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "onTicketCreated", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorReplies.CARD_AUTHORIZED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "onCardAuthorized", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorReplies.TICKET_APPROVED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "onTicketApproved", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorReplies.ORDER_APPROVED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "onOrderApproved", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorReplies.CONSUMER_VERIFICATION_FAILED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "onConsumerVerificationFailed", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorReplies.TICKET_CREATION_FAILED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "onTicketCreationFailed", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorReplies.CARD_AUTHORIZATION_FAILED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "onCardAuthorizationFailed", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorReplies.TICKET_REJECTED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "onTicketRejected", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.OrchestratorReplies.ORDER_REJECTED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrchestrationSagaService.prototype, "onOrderRejected", null);
exports.OrchestrationSagaService = OrchestrationSagaService = OrchestrationSagaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        order_service_1.OrderService,
        consumer_service_1.ConsumerService,
        kitchen_service_1.KitchenService,
        accounting_service_1.AccountingService])
], OrchestrationSagaService);
//# sourceMappingURL=orchestration-saga.service.js.map