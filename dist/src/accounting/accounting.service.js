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
var AccountingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AccountingService = AccountingService_1 = class AccountingService {
    prisma;
    logger = new common_1.Logger(AccountingService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async authorizeCreditCard(orderId, consumerId, amount) {
        const consumer = await this.prisma.consumer.findUnique({
            where: { id: consumerId },
        });
        if (!consumer) {
            const auth = await this.prisma.creditCardAuthorization.create({
                data: { orderId, consumerId, amount, state: 'FAILED' },
            });
            this.logger.warn(`Credit card authorization failed for order ${orderId}: consumer not found`);
            return { success: false, authorizationId: auth.id, reason: 'Consumer not found' };
        }
        if (amount > consumer.creditLimit) {
            const auth = await this.prisma.creditCardAuthorization.create({
                data: { orderId, consumerId, amount, state: 'FAILED' },
            });
            this.logger.warn(`Credit card authorization failed for order ${orderId}: amount ${amount} exceeds limit ${consumer.creditLimit}`);
            return {
                success: false,
                authorizationId: auth.id,
                reason: `Amount ${amount} exceeds credit limit ${consumer.creditLimit}`,
            };
        }
        const auth = await this.prisma.creditCardAuthorization.create({
            data: { orderId, consumerId, amount, state: 'AUTHORIZED' },
        });
        this.logger.log(`Credit card authorized for order ${orderId}, authorization ${auth.id}`);
        return { success: true, authorizationId: auth.id };
    }
    async findByOrderId(orderId) {
        return this.prisma.creditCardAuthorization.findFirst({ where: { orderId } });
    }
};
exports.AccountingService = AccountingService;
exports.AccountingService = AccountingService = AccountingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountingService);
//# sourceMappingURL=accounting.service.js.map