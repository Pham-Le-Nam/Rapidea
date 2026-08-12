import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type SocialLinkModel = runtime.Types.Result.DefaultSelection<Prisma.$SocialLinkPayload>;
export type AggregateSocialLink = {
    _count: SocialLinkCountAggregateOutputType | null;
    _min: SocialLinkMinAggregateOutputType | null;
    _max: SocialLinkMaxAggregateOutputType | null;
};
export type SocialLinkMinAggregateOutputType = {
    id: string | null;
    platform: $Enums.SocialPlatform | null;
    url: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type SocialLinkMaxAggregateOutputType = {
    id: string | null;
    platform: $Enums.SocialPlatform | null;
    url: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type SocialLinkCountAggregateOutputType = {
    id: number;
    platform: number;
    url: number;
    userId: number;
    createdAt: number;
    _all: number;
};
export type SocialLinkMinAggregateInputType = {
    id?: true;
    platform?: true;
    url?: true;
    userId?: true;
    createdAt?: true;
};
export type SocialLinkMaxAggregateInputType = {
    id?: true;
    platform?: true;
    url?: true;
    userId?: true;
    createdAt?: true;
};
export type SocialLinkCountAggregateInputType = {
    id?: true;
    platform?: true;
    url?: true;
    userId?: true;
    createdAt?: true;
    _all?: true;
};
export type SocialLinkAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SocialLinkWhereInput;
    orderBy?: Prisma.SocialLinkOrderByWithRelationInput | Prisma.SocialLinkOrderByWithRelationInput[];
    cursor?: Prisma.SocialLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SocialLinkCountAggregateInputType;
    _min?: SocialLinkMinAggregateInputType;
    _max?: SocialLinkMaxAggregateInputType;
};
export type GetSocialLinkAggregateType<T extends SocialLinkAggregateArgs> = {
    [P in keyof T & keyof AggregateSocialLink]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSocialLink[P]> : Prisma.GetScalarType<T[P], AggregateSocialLink[P]>;
};
export type SocialLinkGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SocialLinkWhereInput;
    orderBy?: Prisma.SocialLinkOrderByWithAggregationInput | Prisma.SocialLinkOrderByWithAggregationInput[];
    by: Prisma.SocialLinkScalarFieldEnum[] | Prisma.SocialLinkScalarFieldEnum;
    having?: Prisma.SocialLinkScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SocialLinkCountAggregateInputType | true;
    _min?: SocialLinkMinAggregateInputType;
    _max?: SocialLinkMaxAggregateInputType;
};
export type SocialLinkGroupByOutputType = {
    id: string;
    platform: $Enums.SocialPlatform;
    url: string;
    userId: string;
    createdAt: Date;
    _count: SocialLinkCountAggregateOutputType | null;
    _min: SocialLinkMinAggregateOutputType | null;
    _max: SocialLinkMaxAggregateOutputType | null;
};
export type GetSocialLinkGroupByPayload<T extends SocialLinkGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SocialLinkGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SocialLinkGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SocialLinkGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SocialLinkGroupByOutputType[P]>;
}>>;
export type SocialLinkWhereInput = {
    AND?: Prisma.SocialLinkWhereInput | Prisma.SocialLinkWhereInput[];
    OR?: Prisma.SocialLinkWhereInput[];
    NOT?: Prisma.SocialLinkWhereInput | Prisma.SocialLinkWhereInput[];
    id?: Prisma.StringFilter<"SocialLink"> | string;
    platform?: Prisma.EnumSocialPlatformFilter<"SocialLink"> | $Enums.SocialPlatform;
    url?: Prisma.StringFilter<"SocialLink"> | string;
    userId?: Prisma.StringFilter<"SocialLink"> | string;
    createdAt?: Prisma.DateTimeFilter<"SocialLink"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
};
export type SocialLinkOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UsersOrderByWithRelationInput;
};
export type SocialLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_platform?: Prisma.SocialLinkUserIdPlatformCompoundUniqueInput;
    AND?: Prisma.SocialLinkWhereInput | Prisma.SocialLinkWhereInput[];
    OR?: Prisma.SocialLinkWhereInput[];
    NOT?: Prisma.SocialLinkWhereInput | Prisma.SocialLinkWhereInput[];
    platform?: Prisma.EnumSocialPlatformFilter<"SocialLink"> | $Enums.SocialPlatform;
    url?: Prisma.StringFilter<"SocialLink"> | string;
    userId?: Prisma.StringFilter<"SocialLink"> | string;
    createdAt?: Prisma.DateTimeFilter<"SocialLink"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
}, "id" | "userId_platform">;
export type SocialLinkOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SocialLinkCountOrderByAggregateInput;
    _max?: Prisma.SocialLinkMaxOrderByAggregateInput;
    _min?: Prisma.SocialLinkMinOrderByAggregateInput;
};
export type SocialLinkScalarWhereWithAggregatesInput = {
    AND?: Prisma.SocialLinkScalarWhereWithAggregatesInput | Prisma.SocialLinkScalarWhereWithAggregatesInput[];
    OR?: Prisma.SocialLinkScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SocialLinkScalarWhereWithAggregatesInput | Prisma.SocialLinkScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SocialLink"> | string;
    platform?: Prisma.EnumSocialPlatformWithAggregatesFilter<"SocialLink"> | $Enums.SocialPlatform;
    url?: Prisma.StringWithAggregatesFilter<"SocialLink"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"SocialLink"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SocialLink"> | Date | string;
};
export type SocialLinkCreateInput = {
    id?: string;
    platform: $Enums.SocialPlatform;
    url: string;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutSocialLinksInput;
};
export type SocialLinkUncheckedCreateInput = {
    id?: string;
    platform: $Enums.SocialPlatform;
    url: string;
    userId: string;
    createdAt?: Date | string;
};
export type SocialLinkUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSocialPlatformFieldUpdateOperationsInput | $Enums.SocialPlatform;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutSocialLinksNestedInput;
};
export type SocialLinkUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSocialPlatformFieldUpdateOperationsInput | $Enums.SocialPlatform;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SocialLinkCreateManyInput = {
    id?: string;
    platform: $Enums.SocialPlatform;
    url: string;
    userId: string;
    createdAt?: Date | string;
};
export type SocialLinkUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSocialPlatformFieldUpdateOperationsInput | $Enums.SocialPlatform;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SocialLinkUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSocialPlatformFieldUpdateOperationsInput | $Enums.SocialPlatform;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SocialLinkListRelationFilter = {
    every?: Prisma.SocialLinkWhereInput;
    some?: Prisma.SocialLinkWhereInput;
    none?: Prisma.SocialLinkWhereInput;
};
export type SocialLinkOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SocialLinkUserIdPlatformCompoundUniqueInput = {
    userId: string;
    platform: $Enums.SocialPlatform;
};
export type SocialLinkCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SocialLinkMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SocialLinkMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    platform?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SocialLinkCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SocialLinkCreateWithoutUserInput, Prisma.SocialLinkUncheckedCreateWithoutUserInput> | Prisma.SocialLinkCreateWithoutUserInput[] | Prisma.SocialLinkUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SocialLinkCreateOrConnectWithoutUserInput | Prisma.SocialLinkCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SocialLinkCreateManyUserInputEnvelope;
    connect?: Prisma.SocialLinkWhereUniqueInput | Prisma.SocialLinkWhereUniqueInput[];
};
export type SocialLinkUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SocialLinkCreateWithoutUserInput, Prisma.SocialLinkUncheckedCreateWithoutUserInput> | Prisma.SocialLinkCreateWithoutUserInput[] | Prisma.SocialLinkUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SocialLinkCreateOrConnectWithoutUserInput | Prisma.SocialLinkCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SocialLinkCreateManyUserInputEnvelope;
    connect?: Prisma.SocialLinkWhereUniqueInput | Prisma.SocialLinkWhereUniqueInput[];
};
export type SocialLinkUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SocialLinkCreateWithoutUserInput, Prisma.SocialLinkUncheckedCreateWithoutUserInput> | Prisma.SocialLinkCreateWithoutUserInput[] | Prisma.SocialLinkUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SocialLinkCreateOrConnectWithoutUserInput | Prisma.SocialLinkCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SocialLinkUpsertWithWhereUniqueWithoutUserInput | Prisma.SocialLinkUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SocialLinkCreateManyUserInputEnvelope;
    set?: Prisma.SocialLinkWhereUniqueInput | Prisma.SocialLinkWhereUniqueInput[];
    disconnect?: Prisma.SocialLinkWhereUniqueInput | Prisma.SocialLinkWhereUniqueInput[];
    delete?: Prisma.SocialLinkWhereUniqueInput | Prisma.SocialLinkWhereUniqueInput[];
    connect?: Prisma.SocialLinkWhereUniqueInput | Prisma.SocialLinkWhereUniqueInput[];
    update?: Prisma.SocialLinkUpdateWithWhereUniqueWithoutUserInput | Prisma.SocialLinkUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SocialLinkUpdateManyWithWhereWithoutUserInput | Prisma.SocialLinkUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SocialLinkScalarWhereInput | Prisma.SocialLinkScalarWhereInput[];
};
export type SocialLinkUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SocialLinkCreateWithoutUserInput, Prisma.SocialLinkUncheckedCreateWithoutUserInput> | Prisma.SocialLinkCreateWithoutUserInput[] | Prisma.SocialLinkUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SocialLinkCreateOrConnectWithoutUserInput | Prisma.SocialLinkCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SocialLinkUpsertWithWhereUniqueWithoutUserInput | Prisma.SocialLinkUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SocialLinkCreateManyUserInputEnvelope;
    set?: Prisma.SocialLinkWhereUniqueInput | Prisma.SocialLinkWhereUniqueInput[];
    disconnect?: Prisma.SocialLinkWhereUniqueInput | Prisma.SocialLinkWhereUniqueInput[];
    delete?: Prisma.SocialLinkWhereUniqueInput | Prisma.SocialLinkWhereUniqueInput[];
    connect?: Prisma.SocialLinkWhereUniqueInput | Prisma.SocialLinkWhereUniqueInput[];
    update?: Prisma.SocialLinkUpdateWithWhereUniqueWithoutUserInput | Prisma.SocialLinkUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SocialLinkUpdateManyWithWhereWithoutUserInput | Prisma.SocialLinkUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SocialLinkScalarWhereInput | Prisma.SocialLinkScalarWhereInput[];
};
export type EnumSocialPlatformFieldUpdateOperationsInput = {
    set?: $Enums.SocialPlatform;
};
export type SocialLinkCreateWithoutUserInput = {
    id?: string;
    platform: $Enums.SocialPlatform;
    url: string;
    createdAt?: Date | string;
};
export type SocialLinkUncheckedCreateWithoutUserInput = {
    id?: string;
    platform: $Enums.SocialPlatform;
    url: string;
    createdAt?: Date | string;
};
export type SocialLinkCreateOrConnectWithoutUserInput = {
    where: Prisma.SocialLinkWhereUniqueInput;
    create: Prisma.XOR<Prisma.SocialLinkCreateWithoutUserInput, Prisma.SocialLinkUncheckedCreateWithoutUserInput>;
};
export type SocialLinkCreateManyUserInputEnvelope = {
    data: Prisma.SocialLinkCreateManyUserInput | Prisma.SocialLinkCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type SocialLinkUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.SocialLinkWhereUniqueInput;
    update: Prisma.XOR<Prisma.SocialLinkUpdateWithoutUserInput, Prisma.SocialLinkUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.SocialLinkCreateWithoutUserInput, Prisma.SocialLinkUncheckedCreateWithoutUserInput>;
};
export type SocialLinkUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.SocialLinkWhereUniqueInput;
    data: Prisma.XOR<Prisma.SocialLinkUpdateWithoutUserInput, Prisma.SocialLinkUncheckedUpdateWithoutUserInput>;
};
export type SocialLinkUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.SocialLinkScalarWhereInput;
    data: Prisma.XOR<Prisma.SocialLinkUpdateManyMutationInput, Prisma.SocialLinkUncheckedUpdateManyWithoutUserInput>;
};
export type SocialLinkScalarWhereInput = {
    AND?: Prisma.SocialLinkScalarWhereInput | Prisma.SocialLinkScalarWhereInput[];
    OR?: Prisma.SocialLinkScalarWhereInput[];
    NOT?: Prisma.SocialLinkScalarWhereInput | Prisma.SocialLinkScalarWhereInput[];
    id?: Prisma.StringFilter<"SocialLink"> | string;
    platform?: Prisma.EnumSocialPlatformFilter<"SocialLink"> | $Enums.SocialPlatform;
    url?: Prisma.StringFilter<"SocialLink"> | string;
    userId?: Prisma.StringFilter<"SocialLink"> | string;
    createdAt?: Prisma.DateTimeFilter<"SocialLink"> | Date | string;
};
export type SocialLinkCreateManyUserInput = {
    id?: string;
    platform: $Enums.SocialPlatform;
    url: string;
    createdAt?: Date | string;
};
export type SocialLinkUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSocialPlatformFieldUpdateOperationsInput | $Enums.SocialPlatform;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SocialLinkUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSocialPlatformFieldUpdateOperationsInput | $Enums.SocialPlatform;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SocialLinkUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    platform?: Prisma.EnumSocialPlatformFieldUpdateOperationsInput | $Enums.SocialPlatform;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SocialLinkSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    platform?: boolean;
    url?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["socialLink"]>;
export type SocialLinkSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    platform?: boolean;
    url?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["socialLink"]>;
export type SocialLinkSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    platform?: boolean;
    url?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["socialLink"]>;
export type SocialLinkSelectScalar = {
    id?: boolean;
    platform?: boolean;
    url?: boolean;
    userId?: boolean;
    createdAt?: boolean;
};
export type SocialLinkOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "platform" | "url" | "userId" | "createdAt", ExtArgs["result"]["socialLink"]>;
export type SocialLinkInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type SocialLinkIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type SocialLinkIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $SocialLinkPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SocialLink";
    objects: {
        user: Prisma.$UsersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        platform: $Enums.SocialPlatform;
        url: string;
        userId: string;
        createdAt: Date;
    }, ExtArgs["result"]["socialLink"]>;
    composites: {};
};
export type SocialLinkGetPayload<S extends boolean | null | undefined | SocialLinkDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SocialLinkPayload, S>;
export type SocialLinkCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SocialLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SocialLinkCountAggregateInputType | true;
};
export interface SocialLinkDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SocialLink'];
        meta: {
            name: 'SocialLink';
        };
    };
    findUnique<T extends SocialLinkFindUniqueArgs>(args: Prisma.SelectSubset<T, SocialLinkFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SocialLinkClient<runtime.Types.Result.GetResult<Prisma.$SocialLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SocialLinkFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SocialLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SocialLinkClient<runtime.Types.Result.GetResult<Prisma.$SocialLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SocialLinkFindFirstArgs>(args?: Prisma.SelectSubset<T, SocialLinkFindFirstArgs<ExtArgs>>): Prisma.Prisma__SocialLinkClient<runtime.Types.Result.GetResult<Prisma.$SocialLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SocialLinkFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SocialLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SocialLinkClient<runtime.Types.Result.GetResult<Prisma.$SocialLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SocialLinkFindManyArgs>(args?: Prisma.SelectSubset<T, SocialLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SocialLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SocialLinkCreateArgs>(args: Prisma.SelectSubset<T, SocialLinkCreateArgs<ExtArgs>>): Prisma.Prisma__SocialLinkClient<runtime.Types.Result.GetResult<Prisma.$SocialLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SocialLinkCreateManyArgs>(args?: Prisma.SelectSubset<T, SocialLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SocialLinkCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SocialLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SocialLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SocialLinkDeleteArgs>(args: Prisma.SelectSubset<T, SocialLinkDeleteArgs<ExtArgs>>): Prisma.Prisma__SocialLinkClient<runtime.Types.Result.GetResult<Prisma.$SocialLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SocialLinkUpdateArgs>(args: Prisma.SelectSubset<T, SocialLinkUpdateArgs<ExtArgs>>): Prisma.Prisma__SocialLinkClient<runtime.Types.Result.GetResult<Prisma.$SocialLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SocialLinkDeleteManyArgs>(args?: Prisma.SelectSubset<T, SocialLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SocialLinkUpdateManyArgs>(args: Prisma.SelectSubset<T, SocialLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SocialLinkUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SocialLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SocialLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SocialLinkUpsertArgs>(args: Prisma.SelectSubset<T, SocialLinkUpsertArgs<ExtArgs>>): Prisma.Prisma__SocialLinkClient<runtime.Types.Result.GetResult<Prisma.$SocialLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SocialLinkCountArgs>(args?: Prisma.Subset<T, SocialLinkCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SocialLinkCountAggregateOutputType> : number>;
    aggregate<T extends SocialLinkAggregateArgs>(args: Prisma.Subset<T, SocialLinkAggregateArgs>): Prisma.PrismaPromise<GetSocialLinkAggregateType<T>>;
    groupBy<T extends SocialLinkGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SocialLinkGroupByArgs['orderBy'];
    } : {
        orderBy?: SocialLinkGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SocialLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSocialLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SocialLinkFieldRefs;
}
export interface Prisma__SocialLinkClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SocialLinkFieldRefs {
    readonly id: Prisma.FieldRef<"SocialLink", 'String'>;
    readonly platform: Prisma.FieldRef<"SocialLink", 'SocialPlatform'>;
    readonly url: Prisma.FieldRef<"SocialLink", 'String'>;
    readonly userId: Prisma.FieldRef<"SocialLink", 'String'>;
    readonly createdAt: Prisma.FieldRef<"SocialLink", 'DateTime'>;
}
export type SocialLinkFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialLinkSelect<ExtArgs> | null;
    omit?: Prisma.SocialLinkOmit<ExtArgs> | null;
    include?: Prisma.SocialLinkInclude<ExtArgs> | null;
    where: Prisma.SocialLinkWhereUniqueInput;
};
export type SocialLinkFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialLinkSelect<ExtArgs> | null;
    omit?: Prisma.SocialLinkOmit<ExtArgs> | null;
    include?: Prisma.SocialLinkInclude<ExtArgs> | null;
    where: Prisma.SocialLinkWhereUniqueInput;
};
export type SocialLinkFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialLinkSelect<ExtArgs> | null;
    omit?: Prisma.SocialLinkOmit<ExtArgs> | null;
    include?: Prisma.SocialLinkInclude<ExtArgs> | null;
    where?: Prisma.SocialLinkWhereInput;
    orderBy?: Prisma.SocialLinkOrderByWithRelationInput | Prisma.SocialLinkOrderByWithRelationInput[];
    cursor?: Prisma.SocialLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SocialLinkScalarFieldEnum | Prisma.SocialLinkScalarFieldEnum[];
};
export type SocialLinkFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialLinkSelect<ExtArgs> | null;
    omit?: Prisma.SocialLinkOmit<ExtArgs> | null;
    include?: Prisma.SocialLinkInclude<ExtArgs> | null;
    where?: Prisma.SocialLinkWhereInput;
    orderBy?: Prisma.SocialLinkOrderByWithRelationInput | Prisma.SocialLinkOrderByWithRelationInput[];
    cursor?: Prisma.SocialLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SocialLinkScalarFieldEnum | Prisma.SocialLinkScalarFieldEnum[];
};
export type SocialLinkFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialLinkSelect<ExtArgs> | null;
    omit?: Prisma.SocialLinkOmit<ExtArgs> | null;
    include?: Prisma.SocialLinkInclude<ExtArgs> | null;
    where?: Prisma.SocialLinkWhereInput;
    orderBy?: Prisma.SocialLinkOrderByWithRelationInput | Prisma.SocialLinkOrderByWithRelationInput[];
    cursor?: Prisma.SocialLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SocialLinkScalarFieldEnum | Prisma.SocialLinkScalarFieldEnum[];
};
export type SocialLinkCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialLinkSelect<ExtArgs> | null;
    omit?: Prisma.SocialLinkOmit<ExtArgs> | null;
    include?: Prisma.SocialLinkInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SocialLinkCreateInput, Prisma.SocialLinkUncheckedCreateInput>;
};
export type SocialLinkCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SocialLinkCreateManyInput | Prisma.SocialLinkCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SocialLinkCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialLinkSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SocialLinkOmit<ExtArgs> | null;
    data: Prisma.SocialLinkCreateManyInput | Prisma.SocialLinkCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SocialLinkIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SocialLinkUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialLinkSelect<ExtArgs> | null;
    omit?: Prisma.SocialLinkOmit<ExtArgs> | null;
    include?: Prisma.SocialLinkInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SocialLinkUpdateInput, Prisma.SocialLinkUncheckedUpdateInput>;
    where: Prisma.SocialLinkWhereUniqueInput;
};
export type SocialLinkUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SocialLinkUpdateManyMutationInput, Prisma.SocialLinkUncheckedUpdateManyInput>;
    where?: Prisma.SocialLinkWhereInput;
    limit?: number;
};
export type SocialLinkUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialLinkSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SocialLinkOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SocialLinkUpdateManyMutationInput, Prisma.SocialLinkUncheckedUpdateManyInput>;
    where?: Prisma.SocialLinkWhereInput;
    limit?: number;
    include?: Prisma.SocialLinkIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SocialLinkUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialLinkSelect<ExtArgs> | null;
    omit?: Prisma.SocialLinkOmit<ExtArgs> | null;
    include?: Prisma.SocialLinkInclude<ExtArgs> | null;
    where: Prisma.SocialLinkWhereUniqueInput;
    create: Prisma.XOR<Prisma.SocialLinkCreateInput, Prisma.SocialLinkUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SocialLinkUpdateInput, Prisma.SocialLinkUncheckedUpdateInput>;
};
export type SocialLinkDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialLinkSelect<ExtArgs> | null;
    omit?: Prisma.SocialLinkOmit<ExtArgs> | null;
    include?: Prisma.SocialLinkInclude<ExtArgs> | null;
    where: Prisma.SocialLinkWhereUniqueInput;
};
export type SocialLinkDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SocialLinkWhereInput;
    limit?: number;
};
export type SocialLinkDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SocialLinkSelect<ExtArgs> | null;
    omit?: Prisma.SocialLinkOmit<ExtArgs> | null;
    include?: Prisma.SocialLinkInclude<ExtArgs> | null;
};
