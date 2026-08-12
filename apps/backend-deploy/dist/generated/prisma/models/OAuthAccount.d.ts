import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type OAuthAccountModel = runtime.Types.Result.DefaultSelection<Prisma.$OAuthAccountPayload>;
export type AggregateOAuthAccount = {
    _count: OAuthAccountCountAggregateOutputType | null;
    _min: OAuthAccountMinAggregateOutputType | null;
    _max: OAuthAccountMaxAggregateOutputType | null;
};
export type OAuthAccountMinAggregateOutputType = {
    id: string | null;
    provider: string | null;
    providerUserId: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type OAuthAccountMaxAggregateOutputType = {
    id: string | null;
    provider: string | null;
    providerUserId: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type OAuthAccountCountAggregateOutputType = {
    id: number;
    provider: number;
    providerUserId: number;
    userId: number;
    createdAt: number;
    _all: number;
};
export type OAuthAccountMinAggregateInputType = {
    id?: true;
    provider?: true;
    providerUserId?: true;
    userId?: true;
    createdAt?: true;
};
export type OAuthAccountMaxAggregateInputType = {
    id?: true;
    provider?: true;
    providerUserId?: true;
    userId?: true;
    createdAt?: true;
};
export type OAuthAccountCountAggregateInputType = {
    id?: true;
    provider?: true;
    providerUserId?: true;
    userId?: true;
    createdAt?: true;
    _all?: true;
};
export type OAuthAccountAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OAuthAccountWhereInput;
    orderBy?: Prisma.OAuthAccountOrderByWithRelationInput | Prisma.OAuthAccountOrderByWithRelationInput[];
    cursor?: Prisma.OAuthAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OAuthAccountCountAggregateInputType;
    _min?: OAuthAccountMinAggregateInputType;
    _max?: OAuthAccountMaxAggregateInputType;
};
export type GetOAuthAccountAggregateType<T extends OAuthAccountAggregateArgs> = {
    [P in keyof T & keyof AggregateOAuthAccount]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOAuthAccount[P]> : Prisma.GetScalarType<T[P], AggregateOAuthAccount[P]>;
};
export type OAuthAccountGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OAuthAccountWhereInput;
    orderBy?: Prisma.OAuthAccountOrderByWithAggregationInput | Prisma.OAuthAccountOrderByWithAggregationInput[];
    by: Prisma.OAuthAccountScalarFieldEnum[] | Prisma.OAuthAccountScalarFieldEnum;
    having?: Prisma.OAuthAccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OAuthAccountCountAggregateInputType | true;
    _min?: OAuthAccountMinAggregateInputType;
    _max?: OAuthAccountMaxAggregateInputType;
};
export type OAuthAccountGroupByOutputType = {
    id: string;
    provider: string;
    providerUserId: string;
    userId: string;
    createdAt: Date;
    _count: OAuthAccountCountAggregateOutputType | null;
    _min: OAuthAccountMinAggregateOutputType | null;
    _max: OAuthAccountMaxAggregateOutputType | null;
};
export type GetOAuthAccountGroupByPayload<T extends OAuthAccountGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OAuthAccountGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OAuthAccountGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OAuthAccountGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OAuthAccountGroupByOutputType[P]>;
}>>;
export type OAuthAccountWhereInput = {
    AND?: Prisma.OAuthAccountWhereInput | Prisma.OAuthAccountWhereInput[];
    OR?: Prisma.OAuthAccountWhereInput[];
    NOT?: Prisma.OAuthAccountWhereInput | Prisma.OAuthAccountWhereInput[];
    id?: Prisma.StringFilter<"OAuthAccount"> | string;
    provider?: Prisma.StringFilter<"OAuthAccount"> | string;
    providerUserId?: Prisma.StringFilter<"OAuthAccount"> | string;
    userId?: Prisma.StringFilter<"OAuthAccount"> | string;
    createdAt?: Prisma.DateTimeFilter<"OAuthAccount"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
};
export type OAuthAccountOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UsersOrderByWithRelationInput;
};
export type OAuthAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    provider_providerUserId?: Prisma.OAuthAccountProviderProviderUserIdCompoundUniqueInput;
    AND?: Prisma.OAuthAccountWhereInput | Prisma.OAuthAccountWhereInput[];
    OR?: Prisma.OAuthAccountWhereInput[];
    NOT?: Prisma.OAuthAccountWhereInput | Prisma.OAuthAccountWhereInput[];
    provider?: Prisma.StringFilter<"OAuthAccount"> | string;
    providerUserId?: Prisma.StringFilter<"OAuthAccount"> | string;
    userId?: Prisma.StringFilter<"OAuthAccount"> | string;
    createdAt?: Prisma.DateTimeFilter<"OAuthAccount"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
}, "id" | "provider_providerUserId">;
export type OAuthAccountOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.OAuthAccountCountOrderByAggregateInput;
    _max?: Prisma.OAuthAccountMaxOrderByAggregateInput;
    _min?: Prisma.OAuthAccountMinOrderByAggregateInput;
};
export type OAuthAccountScalarWhereWithAggregatesInput = {
    AND?: Prisma.OAuthAccountScalarWhereWithAggregatesInput | Prisma.OAuthAccountScalarWhereWithAggregatesInput[];
    OR?: Prisma.OAuthAccountScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OAuthAccountScalarWhereWithAggregatesInput | Prisma.OAuthAccountScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"OAuthAccount"> | string;
    provider?: Prisma.StringWithAggregatesFilter<"OAuthAccount"> | string;
    providerUserId?: Prisma.StringWithAggregatesFilter<"OAuthAccount"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"OAuthAccount"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OAuthAccount"> | Date | string;
};
export type OAuthAccountCreateInput = {
    id?: string;
    provider: string;
    providerUserId: string;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutOauthAccountsInput;
};
export type OAuthAccountUncheckedCreateInput = {
    id?: string;
    provider: string;
    providerUserId: string;
    userId: string;
    createdAt?: Date | string;
};
export type OAuthAccountUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutOauthAccountsNestedInput;
};
export type OAuthAccountUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OAuthAccountCreateManyInput = {
    id?: string;
    provider: string;
    providerUserId: string;
    userId: string;
    createdAt?: Date | string;
};
export type OAuthAccountUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OAuthAccountUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OAuthAccountListRelationFilter = {
    every?: Prisma.OAuthAccountWhereInput;
    some?: Prisma.OAuthAccountWhereInput;
    none?: Prisma.OAuthAccountWhereInput;
};
export type OAuthAccountOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OAuthAccountProviderProviderUserIdCompoundUniqueInput = {
    provider: string;
    providerUserId: string;
};
export type OAuthAccountCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OAuthAccountMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OAuthAccountMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    providerUserId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OAuthAccountCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OAuthAccountCreateWithoutUserInput, Prisma.OAuthAccountUncheckedCreateWithoutUserInput> | Prisma.OAuthAccountCreateWithoutUserInput[] | Prisma.OAuthAccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OAuthAccountCreateOrConnectWithoutUserInput | Prisma.OAuthAccountCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OAuthAccountCreateManyUserInputEnvelope;
    connect?: Prisma.OAuthAccountWhereUniqueInput | Prisma.OAuthAccountWhereUniqueInput[];
};
export type OAuthAccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OAuthAccountCreateWithoutUserInput, Prisma.OAuthAccountUncheckedCreateWithoutUserInput> | Prisma.OAuthAccountCreateWithoutUserInput[] | Prisma.OAuthAccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OAuthAccountCreateOrConnectWithoutUserInput | Prisma.OAuthAccountCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OAuthAccountCreateManyUserInputEnvelope;
    connect?: Prisma.OAuthAccountWhereUniqueInput | Prisma.OAuthAccountWhereUniqueInput[];
};
export type OAuthAccountUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OAuthAccountCreateWithoutUserInput, Prisma.OAuthAccountUncheckedCreateWithoutUserInput> | Prisma.OAuthAccountCreateWithoutUserInput[] | Prisma.OAuthAccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OAuthAccountCreateOrConnectWithoutUserInput | Prisma.OAuthAccountCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OAuthAccountUpsertWithWhereUniqueWithoutUserInput | Prisma.OAuthAccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OAuthAccountCreateManyUserInputEnvelope;
    set?: Prisma.OAuthAccountWhereUniqueInput | Prisma.OAuthAccountWhereUniqueInput[];
    disconnect?: Prisma.OAuthAccountWhereUniqueInput | Prisma.OAuthAccountWhereUniqueInput[];
    delete?: Prisma.OAuthAccountWhereUniqueInput | Prisma.OAuthAccountWhereUniqueInput[];
    connect?: Prisma.OAuthAccountWhereUniqueInput | Prisma.OAuthAccountWhereUniqueInput[];
    update?: Prisma.OAuthAccountUpdateWithWhereUniqueWithoutUserInput | Prisma.OAuthAccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OAuthAccountUpdateManyWithWhereWithoutUserInput | Prisma.OAuthAccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OAuthAccountScalarWhereInput | Prisma.OAuthAccountScalarWhereInput[];
};
export type OAuthAccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OAuthAccountCreateWithoutUserInput, Prisma.OAuthAccountUncheckedCreateWithoutUserInput> | Prisma.OAuthAccountCreateWithoutUserInput[] | Prisma.OAuthAccountUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OAuthAccountCreateOrConnectWithoutUserInput | Prisma.OAuthAccountCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OAuthAccountUpsertWithWhereUniqueWithoutUserInput | Prisma.OAuthAccountUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OAuthAccountCreateManyUserInputEnvelope;
    set?: Prisma.OAuthAccountWhereUniqueInput | Prisma.OAuthAccountWhereUniqueInput[];
    disconnect?: Prisma.OAuthAccountWhereUniqueInput | Prisma.OAuthAccountWhereUniqueInput[];
    delete?: Prisma.OAuthAccountWhereUniqueInput | Prisma.OAuthAccountWhereUniqueInput[];
    connect?: Prisma.OAuthAccountWhereUniqueInput | Prisma.OAuthAccountWhereUniqueInput[];
    update?: Prisma.OAuthAccountUpdateWithWhereUniqueWithoutUserInput | Prisma.OAuthAccountUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OAuthAccountUpdateManyWithWhereWithoutUserInput | Prisma.OAuthAccountUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OAuthAccountScalarWhereInput | Prisma.OAuthAccountScalarWhereInput[];
};
export type OAuthAccountCreateWithoutUserInput = {
    id?: string;
    provider: string;
    providerUserId: string;
    createdAt?: Date | string;
};
export type OAuthAccountUncheckedCreateWithoutUserInput = {
    id?: string;
    provider: string;
    providerUserId: string;
    createdAt?: Date | string;
};
export type OAuthAccountCreateOrConnectWithoutUserInput = {
    where: Prisma.OAuthAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.OAuthAccountCreateWithoutUserInput, Prisma.OAuthAccountUncheckedCreateWithoutUserInput>;
};
export type OAuthAccountCreateManyUserInputEnvelope = {
    data: Prisma.OAuthAccountCreateManyUserInput | Prisma.OAuthAccountCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type OAuthAccountUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.OAuthAccountWhereUniqueInput;
    update: Prisma.XOR<Prisma.OAuthAccountUpdateWithoutUserInput, Prisma.OAuthAccountUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.OAuthAccountCreateWithoutUserInput, Prisma.OAuthAccountUncheckedCreateWithoutUserInput>;
};
export type OAuthAccountUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.OAuthAccountWhereUniqueInput;
    data: Prisma.XOR<Prisma.OAuthAccountUpdateWithoutUserInput, Prisma.OAuthAccountUncheckedUpdateWithoutUserInput>;
};
export type OAuthAccountUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.OAuthAccountScalarWhereInput;
    data: Prisma.XOR<Prisma.OAuthAccountUpdateManyMutationInput, Prisma.OAuthAccountUncheckedUpdateManyWithoutUserInput>;
};
export type OAuthAccountScalarWhereInput = {
    AND?: Prisma.OAuthAccountScalarWhereInput | Prisma.OAuthAccountScalarWhereInput[];
    OR?: Prisma.OAuthAccountScalarWhereInput[];
    NOT?: Prisma.OAuthAccountScalarWhereInput | Prisma.OAuthAccountScalarWhereInput[];
    id?: Prisma.StringFilter<"OAuthAccount"> | string;
    provider?: Prisma.StringFilter<"OAuthAccount"> | string;
    providerUserId?: Prisma.StringFilter<"OAuthAccount"> | string;
    userId?: Prisma.StringFilter<"OAuthAccount"> | string;
    createdAt?: Prisma.DateTimeFilter<"OAuthAccount"> | Date | string;
};
export type OAuthAccountCreateManyUserInput = {
    id?: string;
    provider: string;
    providerUserId: string;
    createdAt?: Date | string;
};
export type OAuthAccountUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OAuthAccountUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OAuthAccountUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.StringFieldUpdateOperationsInput | string;
    providerUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OAuthAccountSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    provider?: boolean;
    providerUserId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["oAuthAccount"]>;
export type OAuthAccountSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    provider?: boolean;
    providerUserId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["oAuthAccount"]>;
export type OAuthAccountSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    provider?: boolean;
    providerUserId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["oAuthAccount"]>;
export type OAuthAccountSelectScalar = {
    id?: boolean;
    provider?: boolean;
    providerUserId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
};
export type OAuthAccountOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "provider" | "providerUserId" | "userId" | "createdAt", ExtArgs["result"]["oAuthAccount"]>;
export type OAuthAccountInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type OAuthAccountIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type OAuthAccountIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $OAuthAccountPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OAuthAccount";
    objects: {
        user: Prisma.$UsersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        provider: string;
        providerUserId: string;
        userId: string;
        createdAt: Date;
    }, ExtArgs["result"]["oAuthAccount"]>;
    composites: {};
};
export type OAuthAccountGetPayload<S extends boolean | null | undefined | OAuthAccountDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OAuthAccountPayload, S>;
export type OAuthAccountCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OAuthAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OAuthAccountCountAggregateInputType | true;
};
export interface OAuthAccountDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OAuthAccount'];
        meta: {
            name: 'OAuthAccount';
        };
    };
    findUnique<T extends OAuthAccountFindUniqueArgs>(args: Prisma.SelectSubset<T, OAuthAccountFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OAuthAccountClient<runtime.Types.Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OAuthAccountFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OAuthAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OAuthAccountClient<runtime.Types.Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OAuthAccountFindFirstArgs>(args?: Prisma.SelectSubset<T, OAuthAccountFindFirstArgs<ExtArgs>>): Prisma.Prisma__OAuthAccountClient<runtime.Types.Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OAuthAccountFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OAuthAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OAuthAccountClient<runtime.Types.Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OAuthAccountFindManyArgs>(args?: Prisma.SelectSubset<T, OAuthAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OAuthAccountCreateArgs>(args: Prisma.SelectSubset<T, OAuthAccountCreateArgs<ExtArgs>>): Prisma.Prisma__OAuthAccountClient<runtime.Types.Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OAuthAccountCreateManyArgs>(args?: Prisma.SelectSubset<T, OAuthAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OAuthAccountCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OAuthAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OAuthAccountDeleteArgs>(args: Prisma.SelectSubset<T, OAuthAccountDeleteArgs<ExtArgs>>): Prisma.Prisma__OAuthAccountClient<runtime.Types.Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OAuthAccountUpdateArgs>(args: Prisma.SelectSubset<T, OAuthAccountUpdateArgs<ExtArgs>>): Prisma.Prisma__OAuthAccountClient<runtime.Types.Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OAuthAccountDeleteManyArgs>(args?: Prisma.SelectSubset<T, OAuthAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OAuthAccountUpdateManyArgs>(args: Prisma.SelectSubset<T, OAuthAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OAuthAccountUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OAuthAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OAuthAccountUpsertArgs>(args: Prisma.SelectSubset<T, OAuthAccountUpsertArgs<ExtArgs>>): Prisma.Prisma__OAuthAccountClient<runtime.Types.Result.GetResult<Prisma.$OAuthAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OAuthAccountCountArgs>(args?: Prisma.Subset<T, OAuthAccountCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OAuthAccountCountAggregateOutputType> : number>;
    aggregate<T extends OAuthAccountAggregateArgs>(args: Prisma.Subset<T, OAuthAccountAggregateArgs>): Prisma.PrismaPromise<GetOAuthAccountAggregateType<T>>;
    groupBy<T extends OAuthAccountGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OAuthAccountGroupByArgs['orderBy'];
    } : {
        orderBy?: OAuthAccountGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OAuthAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OAuthAccountFieldRefs;
}
export interface Prisma__OAuthAccountClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OAuthAccountFieldRefs {
    readonly id: Prisma.FieldRef<"OAuthAccount", 'String'>;
    readonly provider: Prisma.FieldRef<"OAuthAccount", 'String'>;
    readonly providerUserId: Prisma.FieldRef<"OAuthAccount", 'String'>;
    readonly userId: Prisma.FieldRef<"OAuthAccount", 'String'>;
    readonly createdAt: Prisma.FieldRef<"OAuthAccount", 'DateTime'>;
}
export type OAuthAccountFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OAuthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OAuthAccountOmit<ExtArgs> | null;
    include?: Prisma.OAuthAccountInclude<ExtArgs> | null;
    where: Prisma.OAuthAccountWhereUniqueInput;
};
export type OAuthAccountFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OAuthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OAuthAccountOmit<ExtArgs> | null;
    include?: Prisma.OAuthAccountInclude<ExtArgs> | null;
    where: Prisma.OAuthAccountWhereUniqueInput;
};
export type OAuthAccountFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OAuthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OAuthAccountOmit<ExtArgs> | null;
    include?: Prisma.OAuthAccountInclude<ExtArgs> | null;
    where?: Prisma.OAuthAccountWhereInput;
    orderBy?: Prisma.OAuthAccountOrderByWithRelationInput | Prisma.OAuthAccountOrderByWithRelationInput[];
    cursor?: Prisma.OAuthAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OAuthAccountScalarFieldEnum | Prisma.OAuthAccountScalarFieldEnum[];
};
export type OAuthAccountFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OAuthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OAuthAccountOmit<ExtArgs> | null;
    include?: Prisma.OAuthAccountInclude<ExtArgs> | null;
    where?: Prisma.OAuthAccountWhereInput;
    orderBy?: Prisma.OAuthAccountOrderByWithRelationInput | Prisma.OAuthAccountOrderByWithRelationInput[];
    cursor?: Prisma.OAuthAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OAuthAccountScalarFieldEnum | Prisma.OAuthAccountScalarFieldEnum[];
};
export type OAuthAccountFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OAuthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OAuthAccountOmit<ExtArgs> | null;
    include?: Prisma.OAuthAccountInclude<ExtArgs> | null;
    where?: Prisma.OAuthAccountWhereInput;
    orderBy?: Prisma.OAuthAccountOrderByWithRelationInput | Prisma.OAuthAccountOrderByWithRelationInput[];
    cursor?: Prisma.OAuthAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OAuthAccountScalarFieldEnum | Prisma.OAuthAccountScalarFieldEnum[];
};
export type OAuthAccountCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OAuthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OAuthAccountOmit<ExtArgs> | null;
    include?: Prisma.OAuthAccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OAuthAccountCreateInput, Prisma.OAuthAccountUncheckedCreateInput>;
};
export type OAuthAccountCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OAuthAccountCreateManyInput | Prisma.OAuthAccountCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OAuthAccountCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OAuthAccountSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OAuthAccountOmit<ExtArgs> | null;
    data: Prisma.OAuthAccountCreateManyInput | Prisma.OAuthAccountCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OAuthAccountIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OAuthAccountUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OAuthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OAuthAccountOmit<ExtArgs> | null;
    include?: Prisma.OAuthAccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OAuthAccountUpdateInput, Prisma.OAuthAccountUncheckedUpdateInput>;
    where: Prisma.OAuthAccountWhereUniqueInput;
};
export type OAuthAccountUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OAuthAccountUpdateManyMutationInput, Prisma.OAuthAccountUncheckedUpdateManyInput>;
    where?: Prisma.OAuthAccountWhereInput;
    limit?: number;
};
export type OAuthAccountUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OAuthAccountSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OAuthAccountOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OAuthAccountUpdateManyMutationInput, Prisma.OAuthAccountUncheckedUpdateManyInput>;
    where?: Prisma.OAuthAccountWhereInput;
    limit?: number;
    include?: Prisma.OAuthAccountIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OAuthAccountUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OAuthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OAuthAccountOmit<ExtArgs> | null;
    include?: Prisma.OAuthAccountInclude<ExtArgs> | null;
    where: Prisma.OAuthAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.OAuthAccountCreateInput, Prisma.OAuthAccountUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OAuthAccountUpdateInput, Prisma.OAuthAccountUncheckedUpdateInput>;
};
export type OAuthAccountDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OAuthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OAuthAccountOmit<ExtArgs> | null;
    include?: Prisma.OAuthAccountInclude<ExtArgs> | null;
    where: Prisma.OAuthAccountWhereUniqueInput;
};
export type OAuthAccountDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OAuthAccountWhereInput;
    limit?: number;
};
export type OAuthAccountDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OAuthAccountSelect<ExtArgs> | null;
    omit?: Prisma.OAuthAccountOmit<ExtArgs> | null;
    include?: Prisma.OAuthAccountInclude<ExtArgs> | null;
};
