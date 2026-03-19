import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KitchenService {
  private readonly logger = new Logger(KitchenService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createTicket(
    orderId: string,
    description: string,
  ): Promise<{ success: boolean; ticketId?: string; reason?: string }> {
    // Simulate validation - reject if description contains "INVALID"
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

  async approveTicket(orderId: string) {
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

  async rejectTicket(orderId: string) {
    const ticket = await this.prisma.ticket.findFirst({
      where: { orderId },
    });

    if (!ticket) return;

    await this.prisma.ticket.update({
      where: { id: ticket.id },
      data: { state: 'CREATE_REJECTED' },
    });

    this.logger.log(`Ticket ${ticket.id} rejected (CREATE_REJECTED)`);
  }

  async findByOrderId(orderId: string) {
    return this.prisma.ticket.findFirst({ where: { orderId } });
  }
}
