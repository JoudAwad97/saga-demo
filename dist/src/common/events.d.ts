export declare const ChoreographyEvents: {
    readonly ORDER_CREATED: "choreography.order.created";
    readonly ORDER_APPROVED: "choreography.order.approved";
    readonly ORDER_REJECTED: "choreography.order.rejected";
    readonly CONSUMER_VERIFIED: "choreography.consumer.verified";
    readonly CONSUMER_VERIFICATION_FAILED: "choreography.consumer.verification_failed";
    readonly TICKET_CREATED: "choreography.ticket.created";
    readonly TICKET_CREATION_FAILED: "choreography.ticket.creation_failed";
    readonly TICKET_APPROVED: "choreography.ticket.approved";
    readonly TICKET_REJECTED: "choreography.ticket.rejected";
    readonly CREDIT_CARD_AUTHORIZED: "choreography.creditcard.authorized";
    readonly CREDIT_CARD_AUTHORIZATION_FAILED: "choreography.creditcard.authorization_failed";
};
export declare const OrchestratorCommands: {
    readonly VERIFY_CONSUMER: "orchestration.command.verify_consumer";
    readonly CREATE_TICKET: "orchestration.command.create_ticket";
    readonly AUTHORIZE_CARD: "orchestration.command.authorize_card";
    readonly APPROVE_TICKET: "orchestration.command.approve_ticket";
    readonly APPROVE_ORDER: "orchestration.command.approve_order";
    readonly REJECT_TICKET: "orchestration.command.reject_ticket";
    readonly REJECT_ORDER: "orchestration.command.reject_order";
};
export declare const OrchestratorReplies: {
    readonly CONSUMER_VERIFIED: "orchestration.reply.consumer_verified";
    readonly CONSUMER_VERIFICATION_FAILED: "orchestration.reply.consumer_verification_failed";
    readonly TICKET_CREATED: "orchestration.reply.ticket_created";
    readonly TICKET_CREATION_FAILED: "orchestration.reply.ticket_creation_failed";
    readonly CARD_AUTHORIZED: "orchestration.reply.card_authorized";
    readonly CARD_AUTHORIZATION_FAILED: "orchestration.reply.card_authorization_failed";
    readonly TICKET_APPROVED: "orchestration.reply.ticket_approved";
    readonly TICKET_REJECTED: "orchestration.reply.ticket_rejected";
    readonly ORDER_APPROVED: "orchestration.reply.order_approved";
    readonly ORDER_REJECTED: "orchestration.reply.order_rejected";
};
export interface OrderCreatedPayload {
    orderId: string;
    consumerId: string;
    amount: number;
    description: string;
}
export interface ConsumerVerifiedPayload {
    orderId: string;
    consumerId: string;
}
export interface TicketCreatedPayload {
    orderId: string;
    ticketId: string;
}
export interface CreditCardAuthorizedPayload {
    orderId: string;
    authorizationId: string;
}
export interface SagaFailurePayload {
    orderId: string;
    reason: string;
}
