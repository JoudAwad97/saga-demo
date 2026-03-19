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
var OrderService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrderService = OrderService_1 = class OrderService {
    prisma;
    logger = new common_1.Logger(OrderService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(consumerId, amount, sagaType = 'choreography') {
        const order = await this.prisma.order.create({
            data: {
                consumerId,
                amount,
                state: 'APPROVAL_PENDING',
                sagaType,
            },
        });
        this.logger.log(`Order ${order.id} created in APPROVAL_PENDING state (${sagaType})`);
        return order;
    }
    async approveOrder(orderId) {
        const order = await this.prisma.order.update({
            where: { id: orderId },
            data: { state: 'APPROVED' },
        });
        this.logger.log(`Order ${orderId} APPROVED`);
        return order;
    }
    async rejectOrder(orderId) {
        const order = await this.prisma.order.update({
            where: { id: orderId },
            data: { state: 'REJECTED' },
        });
        this.logger.log(`Order ${orderId} REJECTED`);
        return order;
    }
    async findById(orderId) {
        return this.prisma.order.findUnique({ where: { id: orderId } });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = OrderService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map