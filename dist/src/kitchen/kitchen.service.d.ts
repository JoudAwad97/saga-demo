import { PrismaService } from '../prisma/prisma.service';
export declare class KitchenService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createTicket(orderId: string, description: string): Promise<{
        success: boolean;
        ticketId?: string;
        reason?: string;
    }>;
    approveTicket(orderId: string): Promise<void>;
    rejectTicket(orderId: string): Promise<void>;
    findByOrderId(orderId: string): Promise<{
        id: string;
        createdAt: Date;
        state: import("@prisma/client").$Enums.TicketState;
        updatedAt: Date;
        orderId: string;
        description: string;
    } | null>;
}
