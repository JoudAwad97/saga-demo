import { PrismaService } from '../prisma/prisma.service';
export declare class OrderService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createOrder(consumerId: string, amount: number, sagaType?: string): Promise<{
        id: string;
        createdAt: Date;
        consumerId: string;
        amount: number;
        state: import("@prisma/client").$Enums.OrderState;
        sagaType: string;
        updatedAt: Date;
    }>;
    approveOrder(orderId: string): Promise<{
        id: string;
        createdAt: Date;
        consumerId: string;
        amount: number;
        state: import("@prisma/client").$Enums.OrderState;
        sagaType: string;
        updatedAt: Date;
    }>;
    rejectOrder(orderId: string): Promise<{
        id: string;
        createdAt: Date;
        consumerId: string;
        amount: number;
        state: import("@prisma/client").$Enums.OrderState;
        sagaType: string;
        updatedAt: Date;
    }>;
    findById(orderId: string): Promise<{
        id: string;
        createdAt: Date;
        consumerId: string;
        amount: number;
        state: import("@prisma/client").$Enums.OrderState;
        sagaType: string;
        updatedAt: Date;
    } | null>;
}
