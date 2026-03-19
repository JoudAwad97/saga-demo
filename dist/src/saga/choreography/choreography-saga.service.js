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
var ChoreographySagaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoreographySagaService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const order_service_1 = require("../../order/order.service");
const consumer_service_1 = require("../../consumer/consumer.service");
const kitchen_service_1 = require("../../kitchen/kitchen.service");
const accounting_service_1 = require("../../accounting/accounting.service");
const events_1 = require("../../common/events");
let ChoreographySagaService = ChoreographySagaService_1 = class ChoreographySagaService {
    eventEmitter;
    orderService;
    consumerService;
    kitchenService;
    accountingService;
    logger = new common_1.Logger(ChoreographySagaService_1.name);
    accountingPrerequisites = new Map();
    constructor(eventEmitter, orderService, consumerService, kitchenService, accountingService) {
        this.eventEmitter = eventEmitter;
        this.orderService = orderService;
        this.consumerService = consumerService;
        this.kitchenService = kitchenService;
        this.accountingService = accountingService;
    }
    async createOrder(consumerId, amount, description) {
        const order = await this.orderService.createOrder(consumerId, amount, 'choreography');
        this.logger.log(`[SAGA START] Choreography saga started for order ${order.id}`);
        this.accountingPrerequisites.set(order.id, {
            consumerVerified: false,
            ticketCreated: false,
            consumerId,
            amount,
        });
        const payload = {
            orderId: order.id,
            consumerId,
            amount,
            description,
        };
        this.eventEmitter.emit(events_1.ChoreographyEvents.ORDER_CREATED, payload);
        return order;
    }
    async handleOrderCreated_VerifyConsumer(payload) {
        this.logger.log(`[Consumer Service] Verifying consumer ${payload.consumerId} for order ${payload.orderId}`);
        const isValid = await this.consumerService.verifyConsumer(payload.consumerId);
        if (isValid) {
            this.eventEmitter.emit(events_1.ChoreographyEvents.CONSUMER_VERIFIED, {
                orderId: payload.orderId,
                consumerId: payload.consumerId,
            });
        }
        else {
            this.eventEmitter.emit(events_1.ChoreographyEvents.CONSUMER_VERIFICATION_FAILED, {
                orderId: payload.orderId,
                reason: 'Consumer verification failed',
            });
        }
    }
    async handleOrderCreated_CreateTicket(payload) {
        this.logger.log(`[Kitchen Service] Creating ticket for order ${payload.orderId}`);
        const result = await this.kitchenService.createTicket(payload.orderId, payload.description);
        if (result.success) {
            this.eventEmitter.emit(events_1.ChoreographyEvents.TICKET_CREATED, {
                orderId: payload.orderId,
                ticketId: result.ticketId,
            });
        }
        else {
            this.eventEmitter.emit(events_1.ChoreographyEvents.TICKET_CREATION_FAILED, {
                orderId: payload.orderId,
                reason: result.reason,
            });
        }
    }
    async handleConsumerVerified(payload) {
        this.logger.log(`[Accounting Service] Consumer verified for order ${payload.orderId}`);
        const prereqs = this.accountingPrerequisites.get(payload.orderId);
        if (!prereqs)
            return;
        prereqs.consumerVerified = true;
        await this.tryAuthorizeCreditCard(payload.orderId);
    }
    async handleTicketCreated(payload) {
        this.logger.log(`[Accounting Service] Ticket created for order ${payload.orderId}`);
        const prereqs = this.accountingPrerequisites.get(payload.orderId);
        if (!prereqs)
            return;
        prereqs.ticketCreated = true;
        await this.tryAuthorizeCreditCard(payload.orderId);
    }
    async tryAuthorizeCreditCard(orderId) {
        const prereqs = this.accountingPrerequisites.get(orderId);
        if (!prereqs || !prereqs.consumerVerified || !prereqs.ticketCreated)
            return;
        this.logger.log(`[Accounting Service] Both prerequisites met, authorizing credit card for order ${orderId}`);
        const result = await this.accountingService.authorizeCreditCard(orderId, prereqs.consumerId, prereqs.amount);
        this.accountingPrerequisites.delete(orderId);
        if (result.success) {
            this.eventEmitter.emit(events_1.ChoreographyEvents.CREDIT_CARD_AUTHORIZED, {
                orderId,
                authorizationId: result.authorizationId,
            });
        }
        else {
            this.eventEmitter.emit(events_1.ChoreographyEvents.CREDIT_CARD_AUTHORIZATION_FAILED, {
                orderId,
                reason: result.reason,
            });
        }
    }
    async handleCreditCardAuthorized_ApproveTicket(payload) {
        this.logger.log(`[Kitchen Service] Approving ticket for order ${payload.orderId}`);
        await this.kitchenService.approveTicket(payload.orderId);
    }
    async handleCreditCardAuthorized_ApproveOrder(payload) {
        this.logger.log(`[Order Service] Approving order ${payload.orderId}`);
        await this.orderService.approveOrder(payload.orderId);
        this.logger.log(`[SAGA COMPLETE] Choreography saga completed successfully for order ${payload.orderId}`);
    }
    async handleConsumerVerificationFailed(payload) {
        this.logger.warn(`[COMPENSATION] Consumer verification failed for order ${payload.orderId}: ${payload.reason}`);
        this.accountingPrerequisites.delete(payload.orderId);
        await this.orderService.rejectOrder(payload.orderId);
        this.logger.warn(`[SAGA FAILED] Choreography saga failed for order ${payload.orderId}`);
    }
    async handleTicketCreationFailed(payload) {
        this.logger.warn(`[COMPENSATION] Ticket creation failed for order ${payload.orderId}: ${payload.reason}`);
        this.accountingPrerequisites.delete(payload.orderId);
        await this.orderService.rejectOrder(payload.orderId);
        this.logger.warn(`[SAGA FAILED] Choreography saga failed for order ${payload.orderId}`);
    }
    async handleCreditCardAuthorizationFailed(payload) {
        this.logger.warn(`[COMPENSATION] Credit card authorization failed for order ${payload.orderId}: ${payload.reason}`);
        await this.kitchenService.rejectTicket(payload.orderId);
        await this.orderService.rejectOrder(payload.orderId);
        this.logger.warn(`[SAGA FAILED] Choreography saga rolled back for order ${payload.orderId}`);
    }
};
exports.ChoreographySagaService = ChoreographySagaService;
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.ChoreographyEvents.ORDER_CREATED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChoreographySagaService.prototype, "handleOrderCreated_VerifyConsumer", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.ChoreographyEvents.ORDER_CREATED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChoreographySagaService.prototype, "handleOrderCreated_CreateTicket", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.ChoreographyEvents.CONSUMER_VERIFIED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChoreographySagaService.prototype, "handleConsumerVerified", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.ChoreographyEvents.TICKET_CREATED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChoreographySagaService.prototype, "handleTicketCreated", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.ChoreographyEvents.CREDIT_CARD_AUTHORIZED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChoreographySagaService.prototype, "handleCreditCardAuthorized_ApproveTicket", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.ChoreographyEvents.CREDIT_CARD_AUTHORIZED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChoreographySagaService.prototype, "handleCreditCardAuthorized_ApproveOrder", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.ChoreographyEvents.CONSUMER_VERIFICATION_FAILED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChoreographySagaService.prototype, "handleConsumerVerificationFailed", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.ChoreographyEvents.TICKET_CREATION_FAILED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChoreographySagaService.prototype, "handleTicketCreationFailed", null);
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.ChoreographyEvents.CREDIT_CARD_AUTHORIZATION_FAILED, { async: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChoreographySagaService.prototype, "handleCreditCardAuthorizationFailed", null);
exports.ChoreographySagaService = ChoreographySagaService = ChoreographySagaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        order_service_1.OrderService,
        consumer_service_1.ConsumerService,
        kitchen_service_1.KitchenService,
        accounting_service_1.AccountingService])
], ChoreographySagaService);
//# sourceMappingURL=choreography-saga.service.js.map