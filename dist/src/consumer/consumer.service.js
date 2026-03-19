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
var ConsumerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ConsumerService = ConsumerService_1 = class ConsumerService {
    prisma;
    logger = new common_1.Logger(ConsumerService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createConsumer(name, creditLimit = 1000) {
        return this.prisma.consumer.create({
            data: { name, creditLimit },
        });
    }
    async verifyConsumer(consumerId) {
        const consumer = await this.prisma.consumer.findUnique({
            where: { id: consumerId },
        });
        if (!consumer) {
            this.logger.warn(`Consumer ${consumerId} not found`);
            return false;
        }
        this.logger.log(`Consumer ${consumerId} verified successfully`);
        return true;
    }
    async findById(consumerId) {
        return this.prisma.consumer.findUnique({ where: { id: consumerId } });
    }
};
exports.ConsumerService = ConsumerService;
exports.ConsumerService = ConsumerService = ConsumerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConsumerService);
//# sourceMappingURL=consumer.service.js.map