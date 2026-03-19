"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationState = exports.TicketState = exports.OrderState = void 0;
exports.OrderState = {
    APPROVAL_PENDING: 'APPROVAL_PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
};
exports.TicketState = {
    CREATE_PENDING: 'CREATE_PENDING',
    AWAITING_ACCEPTANCE: 'AWAITING_ACCEPTANCE',
    CREATE_REJECTED: 'CREATE_REJECTED'
};
exports.AuthorizationState = {
    PENDING: 'PENDING',
    AUTHORIZED: 'AUTHORIZED',
    FAILED: 'FAILED'
};
//# sourceMappingURL=enums.js.map