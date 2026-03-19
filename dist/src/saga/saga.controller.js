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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SagaController = void 0;
const common_1 = require("@nestjs/common");
const choreography_saga_service_1 = require("./choreography/choreography-saga.service");
const orchestration_saga_service_1 = require("./orchestration/orchestration-saga.service");
const order_service_1 = require("../order/order.service");
const consumer_service_1 = require("../consumer/consumer.service");
const kitchen_service_1 = require("../kitchen/kitchen.service");
const accounting_service_1 = require("../accounting/accounting.service");
class CreateOrderDto {
    consumerId;
    amount;
    description;
}
class CreateConsumerDto {
    name;
    creditLimit;
}
let SagaController = class SagaController {
    choreographySaga;
    orchestrationSaga;
    orderService;
    consumerService;
    kitchenService;
    accountingService;
    constructor(choreographySaga, orchestrationSaga, orderService, consumerService, kitchenService, accountingService) {
        this.choreographySaga = choreographySaga;
        this.orchestrationSaga = orchestrationSaga;
        this.orderService = orderService;
        this.consumerService = consumerService;
        this.kitchenService = kitchenService;
        this.accountingService = accountingService;
    }
    async createConsumer(dto) {
        return this.consumerService.createConsumer(dto.name, dto.creditLimit);
    }
    async createOrderChoreography(dto) {
        return this.choreographySaga.createOrder(dto.consumerId, dto.amount, dto.description);
    }
    async createOrderOrchestration(dto) {
        return this.orchestrationSaga.createOrder(dto.consumerId, dto.amount, dto.description);
    }
    async getOrder(id) {
        const order = await this.orderService.findById(id);
        const ticket = await this.kitchenService.findByOrderId(id);
        const authorization = await this.accountingService.findByOrderId(id);
        return { order, ticket, authorization };
    }
};
exports.SagaController = SagaController;
__decorate([
    (0, common_1.Post)('consumers'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateConsumerDto]),
    __metadata("design:returntype", Promise)
], SagaController.prototype, "createConsumer", null);
__decorate([
    (0, common_1.Post)('choreography/orders'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrderDto]),
    __metadata("design:returntype", Promise)
], SagaController.prototype, "createOrderChoreography", null);
__decorate([
    (0, common_1.Post)('orchestration/orders'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateOrderDto]),
    __metadata("design:returntype", Promise)
], SagaController.prototype, "createOrderOrchestration", null);
__decorate([
    (0, common_1.Get)('orders/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SagaController.prototype, "getOrder", null);
exports.SagaController = SagaController = __decorate([
    (0, common_1.Controller)('saga'),
    __metadata("design:paramtypes", [choreography_saga_service_1.ChoreographySagaService,
        orchestration_saga_service_1.OrchestrationSagaService,
        order_service_1.OrderService,
        consumer_service_1.ConsumerService,
        kitchen_service_1.KitchenService,
        accounting_service_1.AccountingService])
], SagaController);
//# sourceMappingURL=saga.controller.js.map