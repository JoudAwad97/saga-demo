import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccountingService {
  private readonly logger = new Logger(AccountingService.name);

  constructor(private readonly prisma: PrismaService) {}

  async authorizeCreditCard(
    orderId: string,
    consumerId: string,
    amount: number,
  ): Promise<{ success: boolean; authorizationId?: string; reason?: string }> {
    // Simulate authorization failure if amount > consumer's credit limit
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
      this.logger.warn(
        `Credit card authorization failed for order ${orderId}: amount ${amount} exceeds limit ${consumer.creditLimit}`,
      );
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

  async findByOrderId(orderId: string) {
    return this.prisma.creditCardAuthorization.findFirst({ where: { orderId } });
  }
}
