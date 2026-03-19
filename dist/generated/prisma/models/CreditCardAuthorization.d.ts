import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CreditCardAuthorizationModel = runtime.Types.Result.DefaultSelection<Prisma.$CreditCardAuthorizationPayload>;
export type AggregateCreditCardAuthorization = {
    _count: CreditCardAuthorizationCountAggregateOutputType | null;
    _avg: CreditCardAuthorizationAvgAggregateOutputType | null;
    _sum: CreditCardAuthorizationSumAggregateOutputType | null;
    _min: CreditCardAuthorizationMinAggregateOutputType | null;
    _max: CreditCardAuthorizationMaxAggregateOutputType | null;
};
export type CreditCardAuthorizationAvgAggregateOutputType = {
    amount: number | null;
};
export type CreditCardAuthorizationSumAggregateOutputType = {
    amount: number | null;
};
export type CreditCardAuthorizationMinAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    consumerId: string | null;
    amount: number | null;
    state: $Enums.AuthorizationState | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CreditCardAuthorizationMaxAggregateOutputType = {
    id: string | null;
    orderId: string | null;
    consumerId: string | null;
    amount: number | null;
    state: $Enums.AuthorizationState | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CreditCardAuthorizationCountAggregateOutputType = {
    id: number;
    orderId: number;
    consumerId: number;
    amount: number;
    state: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CreditCardAuthorizationAvgAggregateInputType = {
    amount?: true;
};
export type CreditCardAuthorizationSumAggregateInputType = {
    amount?: true;
};
export type CreditCardAuthorizationMinAggregateInputType = {
    id?: true;
    orderId?: true;
    consumerId?: true;
    amount?: true;
    state?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CreditCardAuthorizationMaxAggregateInputType = {
    id?: true;
    orderId?: true;
    consumerId?: true;
    amount?: true;
    state?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CreditCardAuthorizationCountAggregateInputType = {
    id?: true;
    orderId?: true;
    consumerId?: true;
    amount?: true;
    state?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CreditCardAuthorizationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardAuthorizationWhereInput;
    orderBy?: Prisma.CreditCardAuthorizationOrderByWithRelationInput | Prisma.CreditCardAuthorizationOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardAuthorizationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CreditCardAuthorizationCountAggregateInputType;
    _avg?: CreditCardAuthorizationAvgAggregateInputType;
    _sum?: CreditCardAuthorizationSumAggregateInputType;
    _min?: CreditCardAuthorizationMinAggregateInputType;
    _max?: CreditCardAuthorizationMaxAggregateInputType;
};
export type GetCreditCardAuthorizationAggregateType<T extends CreditCardAuthorizationAggregateArgs> = {
    [P in keyof T & keyof AggregateCreditCardAuthorization]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCreditCardAuthorization[P]> : Prisma.GetScalarType<T[P], AggregateCreditCardAuthorization[P]>;
};
export type CreditCardAuthorizationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardAuthorizationWhereInput;
    orderBy?: Prisma.CreditCardAuthorizationOrderByWithAggregationInput | Prisma.CreditCardAuthorizationOrderByWithAggregationInput[];
    by: Prisma.CreditCardAuthorizationScalarFieldEnum[] | Prisma.CreditCardAuthorizationScalarFieldEnum;
    having?: Prisma.CreditCardAuthorizationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CreditCardAuthorizationCountAggregateInputType | true;
    _avg?: CreditCardAuthorizationAvgAggregateInputType;
    _sum?: CreditCardAuthorizationSumAggregateInputType;
    _min?: CreditCardAuthorizationMinAggregateInputType;
    _max?: CreditCardAuthorizationMaxAggregateInputType;
};
export type CreditCardAuthorizationGroupByOutputType = {
    id: string;
    orderId: string;
    consumerId: string;
    amount: number;
    state: $Enums.AuthorizationState;
    createdAt: Date;
    updatedAt: Date;
    _count: CreditCardAuthorizationCountAggregateOutputType | null;
    _avg: CreditCardAuthorizationAvgAggregateOutputType | null;
    _sum: CreditCardAuthorizationSumAggregateOutputType | null;
    _min: CreditCardAuthorizationMinAggregateOutputType | null;
    _max: CreditCardAuthorizationMaxAggregateOutputType | null;
};
type GetCreditCardAuthorizationGroupByPayload<T extends CreditCardAuthorizationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CreditCardAuthorizationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CreditCardAuthorizationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CreditCardAuthorizationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CreditCardAuthorizationGroupByOutputType[P]>;
}>>;
export type CreditCardAuthorizationWhereInput = {
    AND?: Prisma.CreditCardAuthorizationWhereInput | Prisma.CreditCardAuthorizationWhereInput[];
    OR?: Prisma.CreditCardAuthorizationWhereInput[];
    NOT?: Prisma.CreditCardAuthorizationWhereInput | Prisma.CreditCardAuthorizationWhereInput[];
    id?: Prisma.StringFilter<"CreditCardAuthorization"> | string;
    orderId?: Prisma.StringFilter<"CreditCardAuthorization"> | string;
    consumerId?: Prisma.StringFilter<"CreditCardAuthorization"> | string;
    amount?: Prisma.FloatFilter<"CreditCardAuthorization"> | number;
    state?: Prisma.EnumAuthorizationStateFilter<"CreditCardAuthorization"> | $Enums.AuthorizationState;
    createdAt?: Prisma.DateTimeFilter<"CreditCardAuthorization"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CreditCardAuthorization"> | Date | string;
};
export type CreditCardAuthorizationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    consumerId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CreditCardAuthorizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CreditCardAuthorizationWhereInput | Prisma.CreditCardAuthorizationWhereInput[];
    OR?: Prisma.CreditCardAuthorizationWhereInput[];
    NOT?: Prisma.CreditCardAuthorizationWhereInput | Prisma.CreditCardAuthorizationWhereInput[];
    orderId?: Prisma.StringFilter<"CreditCardAuthorization"> | string;
    consumerId?: Prisma.StringFilter<"CreditCardAuthorization"> | string;
    amount?: Prisma.FloatFilter<"CreditCardAuthorization"> | number;
    state?: Prisma.EnumAuthorizationStateFilter<"CreditCardAuthorization"> | $Enums.AuthorizationState;
    createdAt?: Prisma.DateTimeFilter<"CreditCardAuthorization"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CreditCardAuthorization"> | Date | string;
}, "id">;
export type CreditCardAuthorizationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    consumerId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CreditCardAuthorizationCountOrderByAggregateInput;
    _avg?: Prisma.CreditCardAuthorizationAvgOrderByAggregateInput;
    _max?: Prisma.CreditCardAuthorizationMaxOrderByAggregateInput;
    _min?: Prisma.CreditCardAuthorizationMinOrderByAggregateInput;
    _sum?: Prisma.CreditCardAuthorizationSumOrderByAggregateInput;
};
export type CreditCardAuthorizationScalarWhereWithAggregatesInput = {
    AND?: Prisma.CreditCardAuthorizationScalarWhereWithAggregatesInput | Prisma.CreditCardAuthorizationScalarWhereWithAggregatesInput[];
    OR?: Prisma.CreditCardAuthorizationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CreditCardAuthorizationScalarWhereWithAggregatesInput | Prisma.CreditCardAuthorizationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CreditCardAuthorization"> | string;
    orderId?: Prisma.StringWithAggregatesFilter<"CreditCardAuthorization"> | string;
    consumerId?: Prisma.StringWithAggregatesFilter<"CreditCardAuthorization"> | string;
    amount?: Prisma.FloatWithAggregatesFilter<"CreditCardAuthorization"> | number;
    state?: Prisma.EnumAuthorizationStateWithAggregatesFilter<"CreditCardAuthorization"> | $Enums.AuthorizationState;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CreditCardAuthorization"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CreditCardAuthorization"> | Date | string;
};
export type CreditCardAuthorizationCreateInput = {
    id?: string;
    orderId: string;
    consumerId: string;
    amount: number;
    state?: $Enums.AuthorizationState;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardAuthorizationUncheckedCreateInput = {
    id?: string;
    orderId: string;
    consumerId: string;
    amount: number;
    state?: $Enums.AuthorizationState;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardAuthorizationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    consumerId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    state?: Prisma.EnumAuthorizationStateFieldUpdateOperationsInput | $Enums.AuthorizationState;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardAuthorizationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    consumerId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    state?: Prisma.EnumAuthorizationStateFieldUpdateOperationsInput | $Enums.AuthorizationState;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardAuthorizationCreateManyInput = {
    id?: string;
    orderId: string;
    consumerId: string;
    amount: number;
    state?: $Enums.AuthorizationState;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CreditCardAuthorizationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    consumerId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    state?: Prisma.EnumAuthorizationStateFieldUpdateOperationsInput | $Enums.AuthorizationState;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardAuthorizationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.StringFieldUpdateOperationsInput | string;
    consumerId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    state?: Prisma.EnumAuthorizationStateFieldUpdateOperationsInput | $Enums.AuthorizationState;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CreditCardAuthorizationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    consumerId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CreditCardAuthorizationAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type CreditCardAuthorizationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    consumerId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CreditCardAuthorizationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    consumerId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CreditCardAuthorizationSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type EnumAuthorizationStateFieldUpdateOperationsInput = {
    set?: $Enums.AuthorizationState;
};
export type CreditCardAuthorizationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    consumerId?: boolean;
    amount?: boolean;
    state?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["creditCardAuthorization"]>;
export type CreditCardAuthorizationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    consumerId?: boolean;
    amount?: boolean;
    state?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["creditCardAuthorization"]>;
export type CreditCardAuthorizationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    orderId?: boolean;
    consumerId?: boolean;
    amount?: boolean;
    state?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["creditCardAuthorization"]>;
export type CreditCardAuthorizationSelectScalar = {
    id?: boolean;
    orderId?: boolean;
    consumerId?: boolean;
    amount?: boolean;
    state?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CreditCardAuthorizationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "orderId" | "consumerId" | "amount" | "state" | "createdAt" | "updatedAt", ExtArgs["result"]["creditCardAuthorization"]>;
export type $CreditCardAuthorizationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CreditCardAuthorization";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        orderId: string;
        consumerId: string;
        amount: number;
        state: $Enums.AuthorizationState;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["creditCardAuthorization"]>;
    composites: {};
};
export type CreditCardAuthorizationGetPayload<S extends boolean | null | undefined | CreditCardAuthorizationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CreditCardAuthorizationPayload, S>;
export type CreditCardAuthorizationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CreditCardAuthorizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CreditCardAuthorizationCountAggregateInputType | true;
};
export interface CreditCardAuthorizationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CreditCardAuthorization'];
        meta: {
            name: 'CreditCardAuthorization';
        };
    };
    findUnique<T extends CreditCardAuthorizationFindUniqueArgs>(args: Prisma.SelectSubset<T, CreditCardAuthorizationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CreditCardAuthorizationClient<runtime.Types.Result.GetResult<Prisma.$CreditCardAuthorizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CreditCardAuthorizationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CreditCardAuthorizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CreditCardAuthorizationClient<runtime.Types.Result.GetResult<Prisma.$CreditCardAuthorizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CreditCardAuthorizationFindFirstArgs>(args?: Prisma.SelectSubset<T, CreditCardAuthorizationFindFirstArgs<ExtArgs>>): Prisma.Prisma__CreditCardAuthorizationClient<runtime.Types.Result.GetResult<Prisma.$CreditCardAuthorizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CreditCardAuthorizationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CreditCardAuthorizationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CreditCardAuthorizationClient<runtime.Types.Result.GetResult<Prisma.$CreditCardAuthorizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CreditCardAuthorizationFindManyArgs>(args?: Prisma.SelectSubset<T, CreditCardAuthorizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardAuthorizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CreditCardAuthorizationCreateArgs>(args: Prisma.SelectSubset<T, CreditCardAuthorizationCreateArgs<ExtArgs>>): Prisma.Prisma__CreditCardAuthorizationClient<runtime.Types.Result.GetResult<Prisma.$CreditCardAuthorizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CreditCardAuthorizationCreateManyArgs>(args?: Prisma.SelectSubset<T, CreditCardAuthorizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CreditCardAuthorizationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CreditCardAuthorizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardAuthorizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CreditCardAuthorizationDeleteArgs>(args: Prisma.SelectSubset<T, CreditCardAuthorizationDeleteArgs<ExtArgs>>): Prisma.Prisma__CreditCardAuthorizationClient<runtime.Types.Result.GetResult<Prisma.$CreditCardAuthorizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CreditCardAuthorizationUpdateArgs>(args: Prisma.SelectSubset<T, CreditCardAuthorizationUpdateArgs<ExtArgs>>): Prisma.Prisma__CreditCardAuthorizationClient<runtime.Types.Result.GetResult<Prisma.$CreditCardAuthorizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CreditCardAuthorizationDeleteManyArgs>(args?: Prisma.SelectSubset<T, CreditCardAuthorizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CreditCardAuthorizationUpdateManyArgs>(args: Prisma.SelectSubset<T, CreditCardAuthorizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CreditCardAuthorizationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CreditCardAuthorizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CreditCardAuthorizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CreditCardAuthorizationUpsertArgs>(args: Prisma.SelectSubset<T, CreditCardAuthorizationUpsertArgs<ExtArgs>>): Prisma.Prisma__CreditCardAuthorizationClient<runtime.Types.Result.GetResult<Prisma.$CreditCardAuthorizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CreditCardAuthorizationCountArgs>(args?: Prisma.Subset<T, CreditCardAuthorizationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CreditCardAuthorizationCountAggregateOutputType> : number>;
    aggregate<T extends CreditCardAuthorizationAggregateArgs>(args: Prisma.Subset<T, CreditCardAuthorizationAggregateArgs>): Prisma.PrismaPromise<GetCreditCardAuthorizationAggregateType<T>>;
    groupBy<T extends CreditCardAuthorizationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CreditCardAuthorizationGroupByArgs['orderBy'];
    } : {
        orderBy?: CreditCardAuthorizationGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CreditCardAuthorizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditCardAuthorizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CreditCardAuthorizationFieldRefs;
}
export interface Prisma__CreditCardAuthorizationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CreditCardAuthorizationFieldRefs {
    readonly id: Prisma.FieldRef<"CreditCardAuthorization", 'String'>;
    readonly orderId: Prisma.FieldRef<"CreditCardAuthorization", 'String'>;
    readonly consumerId: Prisma.FieldRef<"CreditCardAuthorization", 'String'>;
    readonly amount: Prisma.FieldRef<"CreditCardAuthorization", 'Float'>;
    readonly state: Prisma.FieldRef<"CreditCardAuthorization", 'AuthorizationState'>;
    readonly createdAt: Prisma.FieldRef<"CreditCardAuthorization", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CreditCardAuthorization", 'DateTime'>;
}
export type CreditCardAuthorizationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardAuthorizationSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardAuthorizationOmit<ExtArgs> | null;
    where: Prisma.CreditCardAuthorizationWhereUniqueInput;
};
export type CreditCardAuthorizationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardAuthorizationSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardAuthorizationOmit<ExtArgs> | null;
    where: Prisma.CreditCardAuthorizationWhereUniqueInput;
};
export type CreditCardAuthorizationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardAuthorizationSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardAuthorizationOmit<ExtArgs> | null;
    where?: Prisma.CreditCardAuthorizationWhereInput;
    orderBy?: Prisma.CreditCardAuthorizationOrderByWithRelationInput | Prisma.CreditCardAuthorizationOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardAuthorizationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CreditCardAuthorizationScalarFieldEnum | Prisma.CreditCardAuthorizationScalarFieldEnum[];
};
export type CreditCardAuthorizationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardAuthorizationSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardAuthorizationOmit<ExtArgs> | null;
    where?: Prisma.CreditCardAuthorizationWhereInput;
    orderBy?: Prisma.CreditCardAuthorizationOrderByWithRelationInput | Prisma.CreditCardAuthorizationOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardAuthorizationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CreditCardAuthorizationScalarFieldEnum | Prisma.CreditCardAuthorizationScalarFieldEnum[];
};
export type CreditCardAuthorizationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardAuthorizationSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardAuthorizationOmit<ExtArgs> | null;
    where?: Prisma.CreditCardAuthorizationWhereInput;
    orderBy?: Prisma.CreditCardAuthorizationOrderByWithRelationInput | Prisma.CreditCardAuthorizationOrderByWithRelationInput[];
    cursor?: Prisma.CreditCardAuthorizationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CreditCardAuthorizationScalarFieldEnum | Prisma.CreditCardAuthorizationScalarFieldEnum[];
};
export type CreditCardAuthorizationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardAuthorizationSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardAuthorizationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardAuthorizationCreateInput, Prisma.CreditCardAuthorizationUncheckedCreateInput>;
};
export type CreditCardAuthorizationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CreditCardAuthorizationCreateManyInput | Prisma.CreditCardAuthorizationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CreditCardAuthorizationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardAuthorizationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CreditCardAuthorizationOmit<ExtArgs> | null;
    data: Prisma.CreditCardAuthorizationCreateManyInput | Prisma.CreditCardAuthorizationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CreditCardAuthorizationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardAuthorizationSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardAuthorizationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardAuthorizationUpdateInput, Prisma.CreditCardAuthorizationUncheckedUpdateInput>;
    where: Prisma.CreditCardAuthorizationWhereUniqueInput;
};
export type CreditCardAuthorizationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CreditCardAuthorizationUpdateManyMutationInput, Prisma.CreditCardAuthorizationUncheckedUpdateManyInput>;
    where?: Prisma.CreditCardAuthorizationWhereInput;
    limit?: number;
};
export type CreditCardAuthorizationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardAuthorizationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CreditCardAuthorizationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CreditCardAuthorizationUpdateManyMutationInput, Prisma.CreditCardAuthorizationUncheckedUpdateManyInput>;
    where?: Prisma.CreditCardAuthorizationWhereInput;
    limit?: number;
};
export type CreditCardAuthorizationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardAuthorizationSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardAuthorizationOmit<ExtArgs> | null;
    where: Prisma.CreditCardAuthorizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.CreditCardAuthorizationCreateInput, Prisma.CreditCardAuthorizationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CreditCardAuthorizationUpdateInput, Prisma.CreditCardAuthorizationUncheckedUpdateInput>;
};
export type CreditCardAuthorizationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardAuthorizationSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardAuthorizationOmit<ExtArgs> | null;
    where: Prisma.CreditCardAuthorizationWhereUniqueInput;
};
export type CreditCardAuthorizationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CreditCardAuthorizationWhereInput;
    limit?: number;
};
export type CreditCardAuthorizationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CreditCardAuthorizationSelect<ExtArgs> | null;
    omit?: Prisma.CreditCardAuthorizationOmit<ExtArgs> | null;
};
export {};
