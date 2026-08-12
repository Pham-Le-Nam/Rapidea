import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type EmailAuthTokenModel = runtime.Types.Result.DefaultSelection<Prisma.$EmailAuthTokenPayload>;
export type AggregateEmailAuthToken = {
    _count: EmailAuthTokenCountAggregateOutputType | null;
    _min: EmailAuthTokenMinAggregateOutputType | null;
    _max: EmailAuthTokenMaxAggregateOutputType | null;
};
export type EmailAuthTokenMinAggregateOutputType = {
    id: string | null;
    tokenHash: string | null;
    email: string | null;
    purpose: string | null;
    expiresAt: Date | null;
    usedAt: Date | null;
    createdAt: Date | null;
};
export type EmailAuthTokenMaxAggregateOutputType = {
    id: string | null;
    tokenHash: string | null;
    email: string | null;
    purpose: string | null;
    expiresAt: Date | null;
    usedAt: Date | null;
    createdAt: Date | null;
};
export type EmailAuthTokenCountAggregateOutputType = {
    id: number;
    tokenHash: number;
    email: number;
    purpose: number;
    pendingUser: number;
    expiresAt: number;
    usedAt: number;
    createdAt: number;
    _all: number;
};
export type EmailAuthTokenMinAggregateInputType = {
    id?: true;
    tokenHash?: true;
    email?: true;
    purpose?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
};
export type EmailAuthTokenMaxAggregateInputType = {
    id?: true;
    tokenHash?: true;
    email?: true;
    purpose?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
};
export type EmailAuthTokenCountAggregateInputType = {
    id?: true;
    tokenHash?: true;
    email?: true;
    purpose?: true;
    pendingUser?: true;
    expiresAt?: true;
    usedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type EmailAuthTokenAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailAuthTokenWhereInput;
    orderBy?: Prisma.EmailAuthTokenOrderByWithRelationInput | Prisma.EmailAuthTokenOrderByWithRelationInput[];
    cursor?: Prisma.EmailAuthTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EmailAuthTokenCountAggregateInputType;
    _min?: EmailAuthTokenMinAggregateInputType;
    _max?: EmailAuthTokenMaxAggregateInputType;
};
export type GetEmailAuthTokenAggregateType<T extends EmailAuthTokenAggregateArgs> = {
    [P in keyof T & keyof AggregateEmailAuthToken]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEmailAuthToken[P]> : Prisma.GetScalarType<T[P], AggregateEmailAuthToken[P]>;
};
export type EmailAuthTokenGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailAuthTokenWhereInput;
    orderBy?: Prisma.EmailAuthTokenOrderByWithAggregationInput | Prisma.EmailAuthTokenOrderByWithAggregationInput[];
    by: Prisma.EmailAuthTokenScalarFieldEnum[] | Prisma.EmailAuthTokenScalarFieldEnum;
    having?: Prisma.EmailAuthTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EmailAuthTokenCountAggregateInputType | true;
    _min?: EmailAuthTokenMinAggregateInputType;
    _max?: EmailAuthTokenMaxAggregateInputType;
};
export type EmailAuthTokenGroupByOutputType = {
    id: string;
    tokenHash: string;
    email: string;
    purpose: string;
    pendingUser: runtime.JsonValue | null;
    expiresAt: Date;
    usedAt: Date | null;
    createdAt: Date;
    _count: EmailAuthTokenCountAggregateOutputType | null;
    _min: EmailAuthTokenMinAggregateOutputType | null;
    _max: EmailAuthTokenMaxAggregateOutputType | null;
};
export type GetEmailAuthTokenGroupByPayload<T extends EmailAuthTokenGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EmailAuthTokenGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EmailAuthTokenGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EmailAuthTokenGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EmailAuthTokenGroupByOutputType[P]>;
}>>;
export type EmailAuthTokenWhereInput = {
    AND?: Prisma.EmailAuthTokenWhereInput | Prisma.EmailAuthTokenWhereInput[];
    OR?: Prisma.EmailAuthTokenWhereInput[];
    NOT?: Prisma.EmailAuthTokenWhereInput | Prisma.EmailAuthTokenWhereInput[];
    id?: Prisma.StringFilter<"EmailAuthToken"> | string;
    tokenHash?: Prisma.StringFilter<"EmailAuthToken"> | string;
    email?: Prisma.StringFilter<"EmailAuthToken"> | string;
    purpose?: Prisma.StringFilter<"EmailAuthToken"> | string;
    pendingUser?: Prisma.JsonNullableFilter<"EmailAuthToken">;
    expiresAt?: Prisma.DateTimeFilter<"EmailAuthToken"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"EmailAuthToken"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"EmailAuthToken"> | Date | string;
};
export type EmailAuthTokenOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    pendingUser?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EmailAuthTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tokenHash?: string;
    AND?: Prisma.EmailAuthTokenWhereInput | Prisma.EmailAuthTokenWhereInput[];
    OR?: Prisma.EmailAuthTokenWhereInput[];
    NOT?: Prisma.EmailAuthTokenWhereInput | Prisma.EmailAuthTokenWhereInput[];
    email?: Prisma.StringFilter<"EmailAuthToken"> | string;
    purpose?: Prisma.StringFilter<"EmailAuthToken"> | string;
    pendingUser?: Prisma.JsonNullableFilter<"EmailAuthToken">;
    expiresAt?: Prisma.DateTimeFilter<"EmailAuthToken"> | Date | string;
    usedAt?: Prisma.DateTimeNullableFilter<"EmailAuthToken"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"EmailAuthToken"> | Date | string;
}, "id" | "tokenHash">;
export type EmailAuthTokenOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    pendingUser?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.EmailAuthTokenCountOrderByAggregateInput;
    _max?: Prisma.EmailAuthTokenMaxOrderByAggregateInput;
    _min?: Prisma.EmailAuthTokenMinOrderByAggregateInput;
};
export type EmailAuthTokenScalarWhereWithAggregatesInput = {
    AND?: Prisma.EmailAuthTokenScalarWhereWithAggregatesInput | Prisma.EmailAuthTokenScalarWhereWithAggregatesInput[];
    OR?: Prisma.EmailAuthTokenScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EmailAuthTokenScalarWhereWithAggregatesInput | Prisma.EmailAuthTokenScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"EmailAuthToken"> | string;
    tokenHash?: Prisma.StringWithAggregatesFilter<"EmailAuthToken"> | string;
    email?: Prisma.StringWithAggregatesFilter<"EmailAuthToken"> | string;
    purpose?: Prisma.StringWithAggregatesFilter<"EmailAuthToken"> | string;
    pendingUser?: Prisma.JsonNullableWithAggregatesFilter<"EmailAuthToken">;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"EmailAuthToken"> | Date | string;
    usedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"EmailAuthToken"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"EmailAuthToken"> | Date | string;
};
export type EmailAuthTokenCreateInput = {
    id?: string;
    tokenHash: string;
    email: string;
    purpose: string;
    pendingUser?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type EmailAuthTokenUncheckedCreateInput = {
    id?: string;
    tokenHash: string;
    email: string;
    purpose: string;
    pendingUser?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type EmailAuthTokenUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.StringFieldUpdateOperationsInput | string;
    pendingUser?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailAuthTokenUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.StringFieldUpdateOperationsInput | string;
    pendingUser?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailAuthTokenCreateManyInput = {
    id?: string;
    tokenHash: string;
    email: string;
    purpose: string;
    pendingUser?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt: Date | string;
    usedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type EmailAuthTokenUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.StringFieldUpdateOperationsInput | string;
    pendingUser?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailAuthTokenUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    purpose?: Prisma.StringFieldUpdateOperationsInput | string;
    pendingUser?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    usedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailAuthTokenCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    pendingUser?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EmailAuthTokenMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EmailAuthTokenMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    purpose?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    usedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EmailAuthTokenSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenHash?: boolean;
    email?: boolean;
    purpose?: boolean;
    pendingUser?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["emailAuthToken"]>;
export type EmailAuthTokenSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenHash?: boolean;
    email?: boolean;
    purpose?: boolean;
    pendingUser?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["emailAuthToken"]>;
export type EmailAuthTokenSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    tokenHash?: boolean;
    email?: boolean;
    purpose?: boolean;
    pendingUser?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["emailAuthToken"]>;
export type EmailAuthTokenSelectScalar = {
    id?: boolean;
    tokenHash?: boolean;
    email?: boolean;
    purpose?: boolean;
    pendingUser?: boolean;
    expiresAt?: boolean;
    usedAt?: boolean;
    createdAt?: boolean;
};
export type EmailAuthTokenOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "tokenHash" | "email" | "purpose" | "pendingUser" | "expiresAt" | "usedAt" | "createdAt", ExtArgs["result"]["emailAuthToken"]>;
export type $EmailAuthTokenPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EmailAuthToken";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        tokenHash: string;
        email: string;
        purpose: string;
        pendingUser: runtime.JsonValue | null;
        expiresAt: Date;
        usedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["emailAuthToken"]>;
    composites: {};
};
export type EmailAuthTokenGetPayload<S extends boolean | null | undefined | EmailAuthTokenDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EmailAuthTokenPayload, S>;
export type EmailAuthTokenCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EmailAuthTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EmailAuthTokenCountAggregateInputType | true;
};
export interface EmailAuthTokenDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EmailAuthToken'];
        meta: {
            name: 'EmailAuthToken';
        };
    };
    findUnique<T extends EmailAuthTokenFindUniqueArgs>(args: Prisma.SelectSubset<T, EmailAuthTokenFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EmailAuthTokenClient<runtime.Types.Result.GetResult<Prisma.$EmailAuthTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EmailAuthTokenFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EmailAuthTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailAuthTokenClient<runtime.Types.Result.GetResult<Prisma.$EmailAuthTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EmailAuthTokenFindFirstArgs>(args?: Prisma.SelectSubset<T, EmailAuthTokenFindFirstArgs<ExtArgs>>): Prisma.Prisma__EmailAuthTokenClient<runtime.Types.Result.GetResult<Prisma.$EmailAuthTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EmailAuthTokenFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EmailAuthTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailAuthTokenClient<runtime.Types.Result.GetResult<Prisma.$EmailAuthTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EmailAuthTokenFindManyArgs>(args?: Prisma.SelectSubset<T, EmailAuthTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailAuthTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EmailAuthTokenCreateArgs>(args: Prisma.SelectSubset<T, EmailAuthTokenCreateArgs<ExtArgs>>): Prisma.Prisma__EmailAuthTokenClient<runtime.Types.Result.GetResult<Prisma.$EmailAuthTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EmailAuthTokenCreateManyArgs>(args?: Prisma.SelectSubset<T, EmailAuthTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EmailAuthTokenCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EmailAuthTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailAuthTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EmailAuthTokenDeleteArgs>(args: Prisma.SelectSubset<T, EmailAuthTokenDeleteArgs<ExtArgs>>): Prisma.Prisma__EmailAuthTokenClient<runtime.Types.Result.GetResult<Prisma.$EmailAuthTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EmailAuthTokenUpdateArgs>(args: Prisma.SelectSubset<T, EmailAuthTokenUpdateArgs<ExtArgs>>): Prisma.Prisma__EmailAuthTokenClient<runtime.Types.Result.GetResult<Prisma.$EmailAuthTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EmailAuthTokenDeleteManyArgs>(args?: Prisma.SelectSubset<T, EmailAuthTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EmailAuthTokenUpdateManyArgs>(args: Prisma.SelectSubset<T, EmailAuthTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EmailAuthTokenUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EmailAuthTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailAuthTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EmailAuthTokenUpsertArgs>(args: Prisma.SelectSubset<T, EmailAuthTokenUpsertArgs<ExtArgs>>): Prisma.Prisma__EmailAuthTokenClient<runtime.Types.Result.GetResult<Prisma.$EmailAuthTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EmailAuthTokenCountArgs>(args?: Prisma.Subset<T, EmailAuthTokenCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EmailAuthTokenCountAggregateOutputType> : number>;
    aggregate<T extends EmailAuthTokenAggregateArgs>(args: Prisma.Subset<T, EmailAuthTokenAggregateArgs>): Prisma.PrismaPromise<GetEmailAuthTokenAggregateType<T>>;
    groupBy<T extends EmailAuthTokenGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EmailAuthTokenGroupByArgs['orderBy'];
    } : {
        orderBy?: EmailAuthTokenGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EmailAuthTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailAuthTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EmailAuthTokenFieldRefs;
}
export interface Prisma__EmailAuthTokenClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EmailAuthTokenFieldRefs {
    readonly id: Prisma.FieldRef<"EmailAuthToken", 'String'>;
    readonly tokenHash: Prisma.FieldRef<"EmailAuthToken", 'String'>;
    readonly email: Prisma.FieldRef<"EmailAuthToken", 'String'>;
    readonly purpose: Prisma.FieldRef<"EmailAuthToken", 'String'>;
    readonly pendingUser: Prisma.FieldRef<"EmailAuthToken", 'Json'>;
    readonly expiresAt: Prisma.FieldRef<"EmailAuthToken", 'DateTime'>;
    readonly usedAt: Prisma.FieldRef<"EmailAuthToken", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"EmailAuthToken", 'DateTime'>;
}
export type EmailAuthTokenFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailAuthTokenSelect<ExtArgs> | null;
    omit?: Prisma.EmailAuthTokenOmit<ExtArgs> | null;
    where: Prisma.EmailAuthTokenWhereUniqueInput;
};
export type EmailAuthTokenFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailAuthTokenSelect<ExtArgs> | null;
    omit?: Prisma.EmailAuthTokenOmit<ExtArgs> | null;
    where: Prisma.EmailAuthTokenWhereUniqueInput;
};
export type EmailAuthTokenFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailAuthTokenSelect<ExtArgs> | null;
    omit?: Prisma.EmailAuthTokenOmit<ExtArgs> | null;
    where?: Prisma.EmailAuthTokenWhereInput;
    orderBy?: Prisma.EmailAuthTokenOrderByWithRelationInput | Prisma.EmailAuthTokenOrderByWithRelationInput[];
    cursor?: Prisma.EmailAuthTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailAuthTokenScalarFieldEnum | Prisma.EmailAuthTokenScalarFieldEnum[];
};
export type EmailAuthTokenFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailAuthTokenSelect<ExtArgs> | null;
    omit?: Prisma.EmailAuthTokenOmit<ExtArgs> | null;
    where?: Prisma.EmailAuthTokenWhereInput;
    orderBy?: Prisma.EmailAuthTokenOrderByWithRelationInput | Prisma.EmailAuthTokenOrderByWithRelationInput[];
    cursor?: Prisma.EmailAuthTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailAuthTokenScalarFieldEnum | Prisma.EmailAuthTokenScalarFieldEnum[];
};
export type EmailAuthTokenFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailAuthTokenSelect<ExtArgs> | null;
    omit?: Prisma.EmailAuthTokenOmit<ExtArgs> | null;
    where?: Prisma.EmailAuthTokenWhereInput;
    orderBy?: Prisma.EmailAuthTokenOrderByWithRelationInput | Prisma.EmailAuthTokenOrderByWithRelationInput[];
    cursor?: Prisma.EmailAuthTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailAuthTokenScalarFieldEnum | Prisma.EmailAuthTokenScalarFieldEnum[];
};
export type EmailAuthTokenCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailAuthTokenSelect<ExtArgs> | null;
    omit?: Prisma.EmailAuthTokenOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailAuthTokenCreateInput, Prisma.EmailAuthTokenUncheckedCreateInput>;
};
export type EmailAuthTokenCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EmailAuthTokenCreateManyInput | Prisma.EmailAuthTokenCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EmailAuthTokenCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailAuthTokenSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EmailAuthTokenOmit<ExtArgs> | null;
    data: Prisma.EmailAuthTokenCreateManyInput | Prisma.EmailAuthTokenCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EmailAuthTokenUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailAuthTokenSelect<ExtArgs> | null;
    omit?: Prisma.EmailAuthTokenOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailAuthTokenUpdateInput, Prisma.EmailAuthTokenUncheckedUpdateInput>;
    where: Prisma.EmailAuthTokenWhereUniqueInput;
};
export type EmailAuthTokenUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EmailAuthTokenUpdateManyMutationInput, Prisma.EmailAuthTokenUncheckedUpdateManyInput>;
    where?: Prisma.EmailAuthTokenWhereInput;
    limit?: number;
};
export type EmailAuthTokenUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailAuthTokenSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EmailAuthTokenOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailAuthTokenUpdateManyMutationInput, Prisma.EmailAuthTokenUncheckedUpdateManyInput>;
    where?: Prisma.EmailAuthTokenWhereInput;
    limit?: number;
};
export type EmailAuthTokenUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailAuthTokenSelect<ExtArgs> | null;
    omit?: Prisma.EmailAuthTokenOmit<ExtArgs> | null;
    where: Prisma.EmailAuthTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmailAuthTokenCreateInput, Prisma.EmailAuthTokenUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EmailAuthTokenUpdateInput, Prisma.EmailAuthTokenUncheckedUpdateInput>;
};
export type EmailAuthTokenDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailAuthTokenSelect<ExtArgs> | null;
    omit?: Prisma.EmailAuthTokenOmit<ExtArgs> | null;
    where: Prisma.EmailAuthTokenWhereUniqueInput;
};
export type EmailAuthTokenDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailAuthTokenWhereInput;
    limit?: number;
};
export type EmailAuthTokenDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailAuthTokenSelect<ExtArgs> | null;
    omit?: Prisma.EmailAuthTokenOmit<ExtArgs> | null;
};
