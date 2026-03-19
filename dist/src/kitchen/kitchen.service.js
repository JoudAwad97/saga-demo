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
var KitchenService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KitchenService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let KitchenService = KitchenService_1 = class KitchenService {
    prisma;
    logger = new common_1.Logger(KitchenService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTicket(orderId, description) {
        if (description.includes('INVALID')) {
            this.logger.warn(`Ticket creation failed for order ${orderId}: invalid order details`);
            return { success: false, reason: 'Invalid order details' };
        }
        const ticket = await this.prisma.ticket.create({
            data: {
                orderId,
                description,
                state: 'CREATE_PENDING',
            },
        });
        this.logger.log(`Ticket ${ticket.id} created for order ${orderId}`);
        return { success: true, ticketId: ticket.id };
    }
    async approveTicket(orderId) {
        const ticket = await this.prisma.ticket.findFirst({
            where: { orderId },
        });
        if (!ticket) {
            this.logger.warn(`No ticket found for order ${orderId}`);
            return;
        }
        await this.prisma.ticket.update({
            where: { id: ticket.id },
            data: { state: 'AWAITING_ACCEPTANCE' },
        });
        this.logger.log(`Ticket ${ticket.id} approved (AWAITING_ACCEPTANCE)`);
    }
    async rejectTicket(orderId) {
        const ticket = await this.prisma.ticket.findFirst({
            where: { orderId },
        });
        if (!ticket)
            return;
        await this.prisma.ticket.update({
            where: { id: ticket.id },
            data: { state: 'CREATE_REJECTED' },
        });
        this.logger.log(`Ticket ${ticket.id} rejected (CREATE_REJECTED)`);
    }
    async findByOrderId(orderId) {
        return this.prisma.ticket.findFirst({ where: { orderId } });
    }
};
exports.KitchenService = KitchenService;
exports.KitchenService = KitchenService = KitchenService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KitchenService);
//# sourceMappingURL=kitchen.service.js.map