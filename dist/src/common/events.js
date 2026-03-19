"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrchestratorReplies = exports.OrchestratorCommands = exports.ChoreographyEvents = void 0;
exports.ChoreographyEvents = {
    ORDER_CREATED: 'choreography.order.created',
    ORDER_APPROVED: 'choreography.order.approved',
    ORDER_REJECTED: 'choreography.order.rejected',
    CONSUMER_VERIFIED: 'choreography.consumer.verified',
    CONSUMER_VERIFICATION_FAILED: 'choreography.consumer.verification_failed',
    TICKET_CREATED: 'choreography.ticket.created',
    TICKET_CREATION_FAILED: 'choreography.ticket.creation_failed',
    TICKET_APPROVED: 'choreography.ticket.approved',
    TICKET_REJECTED: 'choreography.ticket.rejected',
    CREDIT_CARD_AUTHORIZED: 'choreography.creditcard.authorized',
    CREDIT_CARD_AUTHORIZATION_FAILED: 'choreography.creditcard.authorization_failed',
};
exports.OrchestratorCommands = {
    VERIFY_CONSUMER: 'orchestration.command.verify_consumer',
    CREATE_TICKET: 'orchestration.command.create_ticket',
    AUTHORIZE_CARD: 'orchestration.command.authorize_card',
    APPROVE_TICKET: 'orchestration.command.approve_ticket',
    APPROVE_ORDER: 'orchestration.command.approve_order',
    REJECT_TICKET: 'orchestration.command.reject_ticket',
    REJECT_ORDER: 'orchestration.command.reject_order',
};
exports.OrchestratorReplies = {
    CONSUMER_VERIFIED: 'orchestration.reply.consumer_verified',
    CONSUMER_VERIFICATION_FAILED: 'orchestration.reply.consumer_verification_failed',
    TICKET_CREATED: 'orchestration.reply.ticket_created',
    TICKET_CREATION_FAILED: 'orchestration.reply.ticket_creation_failed',
    CARD_AUTHORIZED: 'orchestration.reply.card_authorized',
    CARD_AUTHORIZATION_FAILED: 'orchestration.reply.card_authorization_failed',
    TICKET_APPROVED: 'orchestration.reply.ticket_approved',
    TICKET_REJECTED: 'orchestration.reply.ticket_rejected',
    ORDER_APPROVED: 'orchestration.reply.order_approved',
    ORDER_REJECTED: 'orchestration.reply.order_rejected',
};
//# sourceMappingURL=events.js.map