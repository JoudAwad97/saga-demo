import * as $Enums from "./enums.js";
import type * as Prisma from "./internal/prismaNamespace.js";
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type FloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type EnumOrderStateFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderState | Prisma.EnumOrderStateFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderState[] | Prisma.ListEnumOrderStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderState[] | Prisma.ListEnumOrderStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOrderStateFilter<$PrismaModel> | $Enums.OrderState;
};
export type EnumOrderStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderState | Prisma.EnumOrderStateFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderState[] | Prisma.ListEnumOrderStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderState[] | Prisma.ListEnumOrderStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOrderStateWithAggregatesFilter<$PrismaModel> | $Enums.OrderState;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOrderStateFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOrderStateFilter<$PrismaModel>;
};
export type EnumTicketStateFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketState | Prisma.EnumTicketStateFieldRefInput<$PrismaModel>;
    in?: $Enums.TicketState[] | Prisma.ListEnumTicketStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TicketState[] | Prisma.ListEnumTicketStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTicketStateFilter<$PrismaModel> | $Enums.TicketState;
};
export type EnumTicketStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketState | Prisma.EnumTicketStateFieldRefInput<$PrismaModel>;
    in?: $Enums.TicketState[] | Prisma.ListEnumTicketStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TicketState[] | Prisma.ListEnumTicketStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTicketStateWithAggregatesFilter<$PrismaModel> | $Enums.TicketState;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTicketStateFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTicketStateFilter<$PrismaModel>;
};
export type EnumAuthorizationStateFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthorizationState | Prisma.EnumAuthorizationStateFieldRefInput<$PrismaModel>;
    in?: $Enums.AuthorizationState[] | Prisma.ListEnumAuthorizationStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AuthorizationState[] | Prisma.ListEnumAuthorizationStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAuthorizationStateFilter<$PrismaModel> | $Enums.AuthorizationState;
};
export type EnumAuthorizationStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthorizationState | Prisma.EnumAuthorizationStateFieldRefInput<$PrismaModel>;
    in?: $Enums.AuthorizationState[] | Prisma.ListEnumAuthorizationStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AuthorizationState[] | Prisma.ListEnumAuthorizationStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAuthorizationStateWithAggregatesFilter<$PrismaModel> | $Enums.AuthorizationState;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAuthorizationStateFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAuthorizationStateFilter<$PrismaModel>;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatFilter<$PrismaModel>;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedEnumOrderStateFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderState | Prisma.EnumOrderStateFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderState[] | Prisma.ListEnumOrderStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderState[] | Prisma.ListEnumOrderStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOrderStateFilter<$PrismaModel> | $Enums.OrderState;
};
export type NestedEnumOrderStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderState | Prisma.EnumOrderStateFieldRefInput<$PrismaModel>;
    in?: $Enums.OrderState[] | Prisma.ListEnumOrderStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.OrderState[] | Prisma.ListEnumOrderStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumOrderStateWithAggregatesFilter<$PrismaModel> | $Enums.OrderState;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumOrderStateFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumOrderStateFilter<$PrismaModel>;
};
export type NestedEnumTicketStateFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketState | Prisma.EnumTicketStateFieldRefInput<$PrismaModel>;
    in?: $Enums.TicketState[] | Prisma.ListEnumTicketStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TicketState[] | Prisma.ListEnumTicketStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTicketStateFilter<$PrismaModel> | $Enums.TicketState;
};
export type NestedEnumTicketStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketState | Prisma.EnumTicketStateFieldRefInput<$PrismaModel>;
    in?: $Enums.TicketState[] | Prisma.ListEnumTicketStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TicketState[] | Prisma.ListEnumTicketStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTicketStateWithAggregatesFilter<$PrismaModel> | $Enums.TicketState;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTicketStateFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTicketStateFilter<$PrismaModel>;
};
export type NestedEnumAuthorizationStateFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthorizationState | Prisma.EnumAuthorizationStateFieldRefInput<$PrismaModel>;
    in?: $Enums.AuthorizationState[] | Prisma.ListEnumAuthorizationStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AuthorizationState[] | Prisma.ListEnumAuthorizationStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAuthorizationStateFilter<$PrismaModel> | $Enums.AuthorizationState;
};
export type NestedEnumAuthorizationStateWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthorizationState | Prisma.EnumAuthorizationStateFieldRefInput<$PrismaModel>;
    in?: $Enums.AuthorizationState[] | Prisma.ListEnumAuthorizationStateFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AuthorizationState[] | Prisma.ListEnumAuthorizationStateFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAuthorizationStateWithAggregatesFilter<$PrismaModel> | $Enums.AuthorizationState;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAuthorizationStateFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAuthorizationStateFilter<$PrismaModel>;
};
