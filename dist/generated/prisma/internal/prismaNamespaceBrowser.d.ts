import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Consumer: "Consumer";
    readonly Order: "Order";
    readonly Ticket: "Ticket";
    readonly CreditCardAuthorization: "CreditCardAuthorization";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const ConsumerScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly creditLimit: "creditLimit";
    readonly createdAt: "createdAt";
};
export type ConsumerScalarFieldEnum = (typeof ConsumerScalarFieldEnum)[keyof typeof ConsumerScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly consumerId: "consumerId";
    readonly amount: "amount";
    readonly state: "state";
    readonly sagaType: "sagaType";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const TicketScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly description: "description";
    readonly state: "state";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TicketScalarFieldEnum = (typeof TicketScalarFieldEnum)[keyof typeof TicketScalarFieldEnum];
export declare const CreditCardAuthorizationScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly consumerId: "consumerId";
    readonly amount: "amount";
    readonly state: "state";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CreditCardAuthorizationScalarFieldEnum = (typeof CreditCardAuthorizationScalarFieldEnum)[keyof typeof CreditCardAuthorizationScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
