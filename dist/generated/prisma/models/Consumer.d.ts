import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ConsumerModel = runtime.Types.Result.DefaultSelection<Prisma.$ConsumerPayload>;
export type AggregateConsumer = {
    _count: ConsumerCountAggregateOutputType | null;
    _avg: ConsumerAvgAggregateOutputType | null;
    _sum: ConsumerSumAggregateOutputType | null;
    _min: ConsumerMinAggregateOutputType | null;
    _max: ConsumerMaxAggregateOutputType | null;
};
export type ConsumerAvgAggregateOutputType = {
    creditLimit: number | null;
};
export type ConsumerSumAggregateOutputType = {
    creditLimit: number | null;
};
export type ConsumerMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    creditLimit: number | null;
    createdAt: Date | null;
};
export type ConsumerMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    creditLimit: number | null;
    createdAt: Date | null;
};
export type ConsumerCountAggregateOutputType = {
    id: number;
    name: number;
    creditLimit: number;
    createdAt: number;
    _all: number;
};
export type ConsumerAvgAggregateInputType = {
    creditLimit?: true;
};
export type ConsumerSumAggregateInputType = {
    creditLimit?: true;
};
export type ConsumerMinAggregateInputType = {
    id?: true;
    name?: true;
    creditLimit?: true;
    createdAt?: true;
};
export type ConsumerMaxAggregateInputType = {
    id?: true;
    name?: true;
    creditLimit?: true;
    createdAt?: true;
};
export type ConsumerCountAggregateInputType = {
    id?: true;
    name?: true;
    creditLimit?: true;
    createdAt?: true;
    _all?: true;
};
export type ConsumerAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsumerWhereInput;
    orderBy?: Prisma.ConsumerOrderByWithRelationInput | Prisma.ConsumerOrderByWithRelationInput[];
    cursor?: Prisma.ConsumerWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ConsumerCountAggregateInputType;
    _avg?: ConsumerAvgAggregateInputType;
    _sum?: ConsumerSumAggregateInputType;
    _min?: ConsumerMinAggregateInputType;
    _max?: ConsumerMaxAggregateInputType;
};
export type GetConsumerAggregateType<T extends ConsumerAggregateArgs> = {
    [P in keyof T & keyof AggregateConsumer]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateConsumer[P]> : Prisma.GetScalarType<T[P], AggregateConsumer[P]>;
};
export type ConsumerGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsumerWhereInput;
    orderBy?: Prisma.ConsumerOrderByWithAggregationInput | Prisma.ConsumerOrderByWithAggregationInput[];
    by: Prisma.ConsumerScalarFieldEnum[] | Prisma.ConsumerScalarFieldEnum;
    having?: Prisma.ConsumerScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ConsumerCountAggregateInputType | true;
    _avg?: ConsumerAvgAggregateInputType;
    _sum?: ConsumerSumAggregateInputType;
    _min?: ConsumerMinAggregateInputType;
    _max?: ConsumerMaxAggregateInputType;
};
export type ConsumerGroupByOutputType = {
    id: string;
    name: string;
    creditLimit: number;
    createdAt: Date;
    _count: ConsumerCountAggregateOutputType | null;
    _avg: ConsumerAvgAggregateOutputType | null;
    _sum: ConsumerSumAggregateOutputType | null;
    _min: ConsumerMinAggregateOutputType | null;
    _max: ConsumerMaxAggregateOutputType | null;
};
type GetConsumerGroupByPayload<T extends ConsumerGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ConsumerGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ConsumerGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ConsumerGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ConsumerGroupByOutputType[P]>;
}>>;
export type ConsumerWhereInput = {
    AND?: Prisma.ConsumerWhereInput | Prisma.ConsumerWhereInput[];
    OR?: Prisma.ConsumerWhereInput[];
    NOT?: Prisma.ConsumerWhereInput | Prisma.ConsumerWhereInput[];
    id?: Prisma.StringFilter<"Consumer"> | string;
    name?: Prisma.StringFilter<"Consumer"> | string;
    creditLimit?: Prisma.FloatFilter<"Consumer"> | number;
    createdAt?: Prisma.DateTimeFilter<"Consumer"> | Date | string;
};
export type ConsumerOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    creditLimit?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ConsumerWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ConsumerWhereInput | Prisma.ConsumerWhereInput[];
    OR?: Prisma.ConsumerWhereInput[];
    NOT?: Prisma.ConsumerWhereInput | Prisma.ConsumerWhereInput[];
    name?: Prisma.StringFilter<"Consumer"> | string;
    creditLimit?: Prisma.FloatFilter<"Consumer"> | number;
    createdAt?: Prisma.DateTimeFilter<"Consumer"> | Date | string;
}, "id">;
export type ConsumerOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    creditLimit?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ConsumerCountOrderByAggregateInput;
    _avg?: Prisma.ConsumerAvgOrderByAggregateInput;
    _max?: Prisma.ConsumerMaxOrderByAggregateInput;
    _min?: Prisma.ConsumerMinOrderByAggregateInput;
    _sum?: Prisma.ConsumerSumOrderByAggregateInput;
};
export type ConsumerScalarWhereWithAggregatesInput = {
    AND?: Prisma.ConsumerScalarWhereWithAggregatesInput | Prisma.ConsumerScalarWhereWithAggregatesInput[];
    OR?: Prisma.ConsumerScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ConsumerScalarWhereWithAggregatesInput | Prisma.ConsumerScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Consumer"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Consumer"> | string;
    creditLimit?: Prisma.FloatWithAggregatesFilter<"Consumer"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Consumer"> | Date | string;
};
export type ConsumerCreateInput = {
    id?: string;
    name: string;
    creditLimit?: number;
    createdAt?: Date | string;
};
export type ConsumerUncheckedCreateInput = {
    id?: string;
    name: string;
    creditLimit?: number;
    createdAt?: Date | string;
};
export type ConsumerUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    creditLimit?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConsumerUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    creditLimit?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConsumerCreateManyInput = {
    id?: string;
    name: string;
    creditLimit?: number;
    createdAt?: Date | string;
};
export type ConsumerUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    creditLimit?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConsumerUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    creditLimit?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ConsumerCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    creditLimit?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ConsumerAvgOrderByAggregateInput = {
    creditLimit?: Prisma.SortOrder;
};
export type ConsumerMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    creditLimit?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ConsumerMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    creditLimit?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ConsumerSumOrderByAggregateInput = {
    creditLimit?: Prisma.SortOrder;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type ConsumerSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    creditLimit?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["consumer"]>;
export type ConsumerSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    creditLimit?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["consumer"]>;
export type ConsumerSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    creditLimit?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["consumer"]>;
export type ConsumerSelectScalar = {
    id?: boolean;
    name?: boolean;
    creditLimit?: boolean;
    createdAt?: boolean;
};
export type ConsumerOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "creditLimit" | "createdAt", ExtArgs["result"]["consumer"]>;
export type $ConsumerPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Consumer";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        creditLimit: number;
        createdAt: Date;
    }, ExtArgs["result"]["consumer"]>;
    composites: {};
};
export type ConsumerGetPayload<S extends boolean | null | undefined | ConsumerDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ConsumerPayload, S>;
export type ConsumerCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ConsumerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ConsumerCountAggregateInputType | true;
};
export interface ConsumerDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Consumer'];
        meta: {
            name: 'Consumer';
        };
    };
    findUnique<T extends ConsumerFindUniqueArgs>(args: Prisma.SelectSubset<T, ConsumerFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ConsumerClient<runtime.Types.Result.GetResult<Prisma.$ConsumerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ConsumerFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ConsumerFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConsumerClient<runtime.Types.Result.GetResult<Prisma.$ConsumerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ConsumerFindFirstArgs>(args?: Prisma.SelectSubset<T, ConsumerFindFirstArgs<ExtArgs>>): Prisma.Prisma__ConsumerClient<runtime.Types.Result.GetResult<Prisma.$ConsumerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ConsumerFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ConsumerFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ConsumerClient<runtime.Types.Result.GetResult<Prisma.$ConsumerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ConsumerFindManyArgs>(args?: Prisma.SelectSubset<T, ConsumerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsumerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ConsumerCreateArgs>(args: Prisma.SelectSubset<T, ConsumerCreateArgs<ExtArgs>>): Prisma.Prisma__ConsumerClient<runtime.Types.Result.GetResult<Prisma.$ConsumerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ConsumerCreateManyArgs>(args?: Prisma.SelectSubset<T, ConsumerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ConsumerCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ConsumerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsumerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ConsumerDeleteArgs>(args: Prisma.SelectSubset<T, ConsumerDeleteArgs<ExtArgs>>): Prisma.Prisma__ConsumerClient<runtime.Types.Result.GetResult<Prisma.$ConsumerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ConsumerUpdateArgs>(args: Prisma.SelectSubset<T, ConsumerUpdateArgs<ExtArgs>>): Prisma.Prisma__ConsumerClient<runtime.Types.Result.GetResult<Prisma.$ConsumerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ConsumerDeleteManyArgs>(args?: Prisma.SelectSubset<T, ConsumerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ConsumerUpdateManyArgs>(args: Prisma.SelectSubset<T, ConsumerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ConsumerUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ConsumerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ConsumerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ConsumerUpsertArgs>(args: Prisma.SelectSubset<T, ConsumerUpsertArgs<ExtArgs>>): Prisma.Prisma__ConsumerClient<runtime.Types.Result.GetResult<Prisma.$ConsumerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ConsumerCountArgs>(args?: Prisma.Subset<T, ConsumerCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ConsumerCountAggregateOutputType> : number>;
    aggregate<T extends ConsumerAggregateArgs>(args: Prisma.Subset<T, ConsumerAggregateArgs>): Prisma.PrismaPromise<GetConsumerAggregateType<T>>;
    groupBy<T extends ConsumerGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ConsumerGroupByArgs['orderBy'];
    } : {
        orderBy?: ConsumerGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ConsumerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConsumerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ConsumerFieldRefs;
}
export interface Prisma__ConsumerClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ConsumerFieldRefs {
    readonly id: Prisma.FieldRef<"Consumer", 'String'>;
    readonly name: Prisma.FieldRef<"Consumer", 'String'>;
    readonly creditLimit: Prisma.FieldRef<"Consumer", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"Consumer", 'DateTime'>;
}
export type ConsumerFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumerSelect<ExtArgs> | null;
    omit?: Prisma.ConsumerOmit<ExtArgs> | null;
    where: Prisma.ConsumerWhereUniqueInput;
};
export type ConsumerFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumerSelect<ExtArgs> | null;
    omit?: Prisma.ConsumerOmit<ExtArgs> | null;
    where: Prisma.ConsumerWhereUniqueInput;
};
export type ConsumerFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumerSelect<ExtArgs> | null;
    omit?: Prisma.ConsumerOmit<ExtArgs> | null;
    where?: Prisma.ConsumerWhereInput;
    orderBy?: Prisma.ConsumerOrderByWithRelationInput | Prisma.ConsumerOrderByWithRelationInput[];
    cursor?: Prisma.ConsumerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConsumerScalarFieldEnum | Prisma.ConsumerScalarFieldEnum[];
};
export type ConsumerFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumerSelect<ExtArgs> | null;
    omit?: Prisma.ConsumerOmit<ExtArgs> | null;
    where?: Prisma.ConsumerWhereInput;
    orderBy?: Prisma.ConsumerOrderByWithRelationInput | Prisma.ConsumerOrderByWithRelationInput[];
    cursor?: Prisma.ConsumerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConsumerScalarFieldEnum | Prisma.ConsumerScalarFieldEnum[];
};
export type ConsumerFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumerSelect<ExtArgs> | null;
    omit?: Prisma.ConsumerOmit<ExtArgs> | null;
    where?: Prisma.ConsumerWhereInput;
    orderBy?: Prisma.ConsumerOrderByWithRelationInput | Prisma.ConsumerOrderByWithRelationInput[];
    cursor?: Prisma.ConsumerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ConsumerScalarFieldEnum | Prisma.ConsumerScalarFieldEnum[];
};
export type ConsumerCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumerSelect<ExtArgs> | null;
    omit?: Prisma.ConsumerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConsumerCreateInput, Prisma.ConsumerUncheckedCreateInput>;
};
export type ConsumerCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ConsumerCreateManyInput | Prisma.ConsumerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ConsumerCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumerSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConsumerOmit<ExtArgs> | null;
    data: Prisma.ConsumerCreateManyInput | Prisma.ConsumerCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ConsumerUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumerSelect<ExtArgs> | null;
    omit?: Prisma.ConsumerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConsumerUpdateInput, Prisma.ConsumerUncheckedUpdateInput>;
    where: Prisma.ConsumerWhereUniqueInput;
};
export type ConsumerUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ConsumerUpdateManyMutationInput, Prisma.ConsumerUncheckedUpdateManyInput>;
    where?: Prisma.ConsumerWhereInput;
    limit?: number;
};
export type ConsumerUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumerSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ConsumerOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ConsumerUpdateManyMutationInput, Prisma.ConsumerUncheckedUpdateManyInput>;
    where?: Prisma.ConsumerWhereInput;
    limit?: number;
};
export type ConsumerUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumerSelect<ExtArgs> | null;
    omit?: Prisma.ConsumerOmit<ExtArgs> | null;
    where: Prisma.ConsumerWhereUniqueInput;
    create: Prisma.XOR<Prisma.ConsumerCreateInput, Prisma.ConsumerUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ConsumerUpdateInput, Prisma.ConsumerUncheckedUpdateInput>;
};
export type ConsumerDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumerSelect<ExtArgs> | null;
    omit?: Prisma.ConsumerOmit<ExtArgs> | null;
    where: Prisma.ConsumerWhereUniqueInput;
};
export type ConsumerDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ConsumerWhereInput;
    limit?: number;
};
export type ConsumerDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ConsumerSelect<ExtArgs> | null;
    omit?: Prisma.ConsumerOmit<ExtArgs> | null;
};
export {};
