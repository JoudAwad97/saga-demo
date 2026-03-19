export declare const OrderState: {
    readonly APPROVAL_PENDING: "APPROVAL_PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type OrderState = (typeof OrderState)[keyof typeof OrderState];
export declare const TicketState: {
    readonly CREATE_PENDING: "CREATE_PENDING";
    readonly AWAITING_ACCEPTANCE: "AWAITING_ACCEPTANCE";
    readonly CREATE_REJECTED: "CREATE_REJECTED";
};
export type TicketState = (typeof TicketState)[keyof typeof TicketState];
export declare const AuthorizationState: {
    readonly PENDING: "PENDING";
    readonly AUTHORIZED: "AUTHORIZED";
    readonly FAILED: "FAILED";
};
export type AuthorizationState = (typeof AuthorizationState)[keyof typeof AuthorizationState];
