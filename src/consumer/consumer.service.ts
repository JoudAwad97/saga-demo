import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createConsumer(name: string, creditLimit: number = 1000) {
    return this.prisma.consumer.create({
      data: { name, creditLimit },
    });
  }

  async verifyConsumer(consumerId: string): Promise<boolean> {
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

  async findById(consumerId: string) {
    return this.prisma.consumer.findUnique({ where: { id: consumerId } });
  }
}
