"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const prisma_module_1 = require("./prisma/prisma.module");
const consumer_module_1 = require("./consumer/consumer.module");
const kitchen_module_1 = require("./kitchen/kitchen.module");
const accounting_module_1 = require("./accounting/accounting.module");
const order_module_1 = require("./order/order.module");
const choreography_saga_module_1 = require("./saga/choreography/choreography-saga.module");
const orchestration_saga_module_1 = require("./saga/orchestration/orchestration-saga.module");
const saga_controller_1 = require("./saga/saga.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot(),
            prisma_module_1.PrismaModule,
            consumer_module_1.ConsumerModule,
            kitchen_module_1.KitchenModule,
            accounting_module_1.AccountingModule,
            order_module_1.OrderModule,
            choreography_saga_module_1.ChoreographySagaModule,
            orchestration_saga_module_1.OrchestrationSagaModule,
        ],
        controllers: [saga_controller_1.SagaController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map