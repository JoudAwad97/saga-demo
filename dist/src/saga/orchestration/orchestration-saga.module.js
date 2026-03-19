"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrchestrationSagaModule = void 0;
const common_1 = require("@nestjs/common");
const orchestration_saga_service_1 = require("./orchestration-saga.service");
const order_module_1 = require("../../order/order.module");
const consumer_module_1 = require("../../consumer/consumer.module");
const kitchen_module_1 = require("../../kitchen/kitchen.module");
const accounting_module_1 = require("../../accounting/accounting.module");
let OrchestrationSagaModule = class OrchestrationSagaModule {
};
exports.OrchestrationSagaModule = OrchestrationSagaModule;
exports.OrchestrationSagaModule = OrchestrationSagaModule = __decorate([
    (0, common_1.Module)({
        imports: [order_module_1.OrderModule, consumer_module_1.ConsumerModule, kitchen_module_1.KitchenModule, accounting_module_1.AccountingModule],
        providers: [orchestration_saga_service_1.OrchestrationSagaService],
        exports: [orchestration_saga_service_1.OrchestrationSagaService],
    })
], OrchestrationSagaModule);
//# sourceMappingURL=orchestration-saga.module.js.map