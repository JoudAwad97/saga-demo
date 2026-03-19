import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createOrder(consumerId: string, amount: number, sagaType: string = 'choreography') {
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

  async approveOrder(orderId: string) {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { state: 'APPROVED' },
    });

    this.logger.log(`Order ${orderId} APPROVED`);
    return order;
  }

  async rejectOrder(orderId: string) {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { state: 'REJECTED' },
    });

    this.logger.log(`Order ${orderId} REJECTED`);
    return order;
  }

  async findById(orderId: string) {
    return this.prisma.order.findUnique({ where: { id: orderId } });
  }
}
