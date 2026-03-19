import { PrismaService } from '../prisma/prisma.service';
export declare class AccountingService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    authorizeCreditCard(orderId: string, consumerId: string, amount: number): Promise<{
        success: boolean;
        authorizationId?: string;
        reason?: string;
    }>;
    findByOrderId(orderId: string): Promise<{
        id: string;
        createdAt: Date;
        consumerId: string;
        amount: number;
        state: import("@prisma/client").$Enums.AuthorizationState;
        updatedAt: Date;
        orderId: string;
    } | null>;
}
