import { PrismaService } from '../prisma/prisma.service';
export declare class ConsumerService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createConsumer(name: string, creditLimit?: number): Promise<{
        id: string;
        name: string;
        creditLimit: number;
        createdAt: Date;
    }>;
    verifyConsumer(consumerId: string): Promise<boolean>;
    findById(consumerId: string): Promise<{
        id: string;
        name: string;
        creditLimit: number;
        createdAt: Date;
    } | null>;
}
