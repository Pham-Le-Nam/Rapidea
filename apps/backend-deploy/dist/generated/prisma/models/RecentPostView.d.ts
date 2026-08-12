import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type RecentPostViewModel = runtime.Types.Result.DefaultSelection<Prisma.$RecentPostViewPayload>;
export type AggregateRecentPostView = {
    _count: RecentPostViewCountAggregateOutputType | null;
    _min: RecentPostViewMinAggregateOutputType | null;
    _max: RecentPostViewMaxAggregateOutputType | null;
};
export type RecentPostViewMinAggregateOutputType = {
    id: string | null;
    postId: string | null;
    userId: string | null;
    viewedAt: Date | null;
};
export type RecentPostViewMaxAggregateOutputType = {
    id: string | null;
    postId: string | null;
    userId: string | null;
    viewedAt: Date | null;
};
export type RecentPostViewCountAggregateOutputType = {
    id: number;
    postId: number;
    userId: number;
    viewedAt: number;
    _all: number;
};
export type RecentPostViewMinAggregateInputType = {
    id?: true;
    postId?: true;
    userId?: true;
    viewedAt?: true;
};
export type RecentPostViewMaxAggregateInputType = {
    id?: true;
    postId?: true;
    userId?: true;
    viewedAt?: true;
};
export type RecentPostViewCountAggregateInputType = {
    id?: true;
    postId?: true;
    userId?: true;
    viewedAt?: true;
    _all?: true;
};
export type RecentPostViewAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecentPostViewWhereInput;
    orderBy?: Prisma.RecentPostViewOrderByWithRelationInput | Prisma.RecentPostViewOrderByWithRelationInput[];
    cursor?: Prisma.RecentPostViewWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RecentPostViewCountAggregateInputType;
    _min?: RecentPostViewMinAggregateInputType;
    _max?: RecentPostViewMaxAggregateInputType;
};
export type GetRecentPostViewAggregateType<T extends RecentPostViewAggregateArgs> = {
    [P in keyof T & keyof AggregateRecentPostView]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRecentPostView[P]> : Prisma.GetScalarType<T[P], AggregateRecentPostView[P]>;
};
export type RecentPostViewGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecentPostViewWhereInput;
    orderBy?: Prisma.RecentPostViewOrderByWithAggregationInput | Prisma.RecentPostViewOrderByWithAggregationInput[];
    by: Prisma.RecentPostViewScalarFieldEnum[] | Prisma.RecentPostViewScalarFieldEnum;
    having?: Prisma.RecentPostViewScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RecentPostViewCountAggregateInputType | true;
    _min?: RecentPostViewMinAggregateInputType;
    _max?: RecentPostViewMaxAggregateInputType;
};
export type RecentPostViewGroupByOutputType = {
    id: string;
    postId: string;
    userId: string;
    viewedAt: Date;
    _count: RecentPostViewCountAggregateOutputType | null;
    _min: RecentPostViewMinAggregateOutputType | null;
    _max: RecentPostViewMaxAggregateOutputType | null;
};
export type GetRecentPostViewGroupByPayload<T extends RecentPostViewGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RecentPostViewGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RecentPostViewGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RecentPostViewGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RecentPostViewGroupByOutputType[P]>;
}>>;
export type RecentPostViewWhereInput = {
    AND?: Prisma.RecentPostViewWhereInput | Prisma.RecentPostViewWhereInput[];
    OR?: Prisma.RecentPostViewWhereInput[];
    NOT?: Prisma.RecentPostViewWhereInput | Prisma.RecentPostViewWhereInput[];
    id?: Prisma.StringFilter<"RecentPostView"> | string;
    postId?: Prisma.StringFilter<"RecentPostView"> | string;
    userId?: Prisma.StringFilter<"RecentPostView"> | string;
    viewedAt?: Prisma.DateTimeFilter<"RecentPostView"> | Date | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
};
export type RecentPostViewOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
    post?: Prisma.PostOrderByWithRelationInput;
    user?: Prisma.UsersOrderByWithRelationInput;
};
export type RecentPostViewWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    postId_userId?: Prisma.RecentPostViewPostIdUserIdCompoundUniqueInput;
    AND?: Prisma.RecentPostViewWhereInput | Prisma.RecentPostViewWhereInput[];
    OR?: Prisma.RecentPostViewWhereInput[];
    NOT?: Prisma.RecentPostViewWhereInput | Prisma.RecentPostViewWhereInput[];
    postId?: Prisma.StringFilter<"RecentPostView"> | string;
    userId?: Prisma.StringFilter<"RecentPostView"> | string;
    viewedAt?: Prisma.DateTimeFilter<"RecentPostView"> | Date | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
}, "id" | "postId_userId">;
export type RecentPostViewOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
    _count?: Prisma.RecentPostViewCountOrderByAggregateInput;
    _max?: Prisma.RecentPostViewMaxOrderByAggregateInput;
    _min?: Prisma.RecentPostViewMinOrderByAggregateInput;
};
export type RecentPostViewScalarWhereWithAggregatesInput = {
    AND?: Prisma.RecentPostViewScalarWhereWithAggregatesInput | Prisma.RecentPostViewScalarWhereWithAggregatesInput[];
    OR?: Prisma.RecentPostViewScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RecentPostViewScalarWhereWithAggregatesInput | Prisma.RecentPostViewScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RecentPostView"> | string;
    postId?: Prisma.StringWithAggregatesFilter<"RecentPostView"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"RecentPostView"> | string;
    viewedAt?: Prisma.DateTimeWithAggregatesFilter<"RecentPostView"> | Date | string;
};
export type RecentPostViewCreateInput = {
    id?: string;
    viewedAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutRecentViewsInput;
    user: Prisma.UsersCreateNestedOneWithoutRecentPostViewsInput;
};
export type RecentPostViewUncheckedCreateInput = {
    id?: string;
    postId: string;
    userId: string;
    viewedAt?: Date | string;
};
export type RecentPostViewUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutRecentViewsNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutRecentPostViewsNestedInput;
};
export type RecentPostViewUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentPostViewCreateManyInput = {
    id?: string;
    postId: string;
    userId: string;
    viewedAt?: Date | string;
};
export type RecentPostViewUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentPostViewUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentPostViewListRelationFilter = {
    every?: Prisma.RecentPostViewWhereInput;
    some?: Prisma.RecentPostViewWhereInput;
    none?: Prisma.RecentPostViewWhereInput;
};
export type RecentPostViewOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RecentPostViewPostIdUserIdCompoundUniqueInput = {
    postId: string;
    userId: string;
};
export type RecentPostViewCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
};
export type RecentPostViewMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
};
export type RecentPostViewMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
};
export type RecentPostViewCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RecentPostViewCreateWithoutUserInput, Prisma.RecentPostViewUncheckedCreateWithoutUserInput> | Prisma.RecentPostViewCreateWithoutUserInput[] | Prisma.RecentPostViewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecentPostViewCreateOrConnectWithoutUserInput | Prisma.RecentPostViewCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RecentPostViewCreateManyUserInputEnvelope;
    connect?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
};
export type RecentPostViewUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RecentPostViewCreateWithoutUserInput, Prisma.RecentPostViewUncheckedCreateWithoutUserInput> | Prisma.RecentPostViewCreateWithoutUserInput[] | Prisma.RecentPostViewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecentPostViewCreateOrConnectWithoutUserInput | Prisma.RecentPostViewCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RecentPostViewCreateManyUserInputEnvelope;
    connect?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
};
export type RecentPostViewUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RecentPostViewCreateWithoutUserInput, Prisma.RecentPostViewUncheckedCreateWithoutUserInput> | Prisma.RecentPostViewCreateWithoutUserInput[] | Prisma.RecentPostViewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecentPostViewCreateOrConnectWithoutUserInput | Prisma.RecentPostViewCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RecentPostViewUpsertWithWhereUniqueWithoutUserInput | Prisma.RecentPostViewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RecentPostViewCreateManyUserInputEnvelope;
    set?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    disconnect?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    delete?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    connect?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    update?: Prisma.RecentPostViewUpdateWithWhereUniqueWithoutUserInput | Prisma.RecentPostViewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RecentPostViewUpdateManyWithWhereWithoutUserInput | Prisma.RecentPostViewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RecentPostViewScalarWhereInput | Prisma.RecentPostViewScalarWhereInput[];
};
export type RecentPostViewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RecentPostViewCreateWithoutUserInput, Prisma.RecentPostViewUncheckedCreateWithoutUserInput> | Prisma.RecentPostViewCreateWithoutUserInput[] | Prisma.RecentPostViewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecentPostViewCreateOrConnectWithoutUserInput | Prisma.RecentPostViewCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RecentPostViewUpsertWithWhereUniqueWithoutUserInput | Prisma.RecentPostViewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RecentPostViewCreateManyUserInputEnvelope;
    set?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    disconnect?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    delete?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    connect?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    update?: Prisma.RecentPostViewUpdateWithWhereUniqueWithoutUserInput | Prisma.RecentPostViewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RecentPostViewUpdateManyWithWhereWithoutUserInput | Prisma.RecentPostViewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RecentPostViewScalarWhereInput | Prisma.RecentPostViewScalarWhereInput[];
};
export type RecentPostViewCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.RecentPostViewCreateWithoutPostInput, Prisma.RecentPostViewUncheckedCreateWithoutPostInput> | Prisma.RecentPostViewCreateWithoutPostInput[] | Prisma.RecentPostViewUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.RecentPostViewCreateOrConnectWithoutPostInput | Prisma.RecentPostViewCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.RecentPostViewCreateManyPostInputEnvelope;
    connect?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
};
export type RecentPostViewUncheckedCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.RecentPostViewCreateWithoutPostInput, Prisma.RecentPostViewUncheckedCreateWithoutPostInput> | Prisma.RecentPostViewCreateWithoutPostInput[] | Prisma.RecentPostViewUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.RecentPostViewCreateOrConnectWithoutPostInput | Prisma.RecentPostViewCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.RecentPostViewCreateManyPostInputEnvelope;
    connect?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
};
export type RecentPostViewUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.RecentPostViewCreateWithoutPostInput, Prisma.RecentPostViewUncheckedCreateWithoutPostInput> | Prisma.RecentPostViewCreateWithoutPostInput[] | Prisma.RecentPostViewUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.RecentPostViewCreateOrConnectWithoutPostInput | Prisma.RecentPostViewCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.RecentPostViewUpsertWithWhereUniqueWithoutPostInput | Prisma.RecentPostViewUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.RecentPostViewCreateManyPostInputEnvelope;
    set?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    disconnect?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    delete?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    connect?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    update?: Prisma.RecentPostViewUpdateWithWhereUniqueWithoutPostInput | Prisma.RecentPostViewUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.RecentPostViewUpdateManyWithWhereWithoutPostInput | Prisma.RecentPostViewUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.RecentPostViewScalarWhereInput | Prisma.RecentPostViewScalarWhereInput[];
};
export type RecentPostViewUncheckedUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.RecentPostViewCreateWithoutPostInput, Prisma.RecentPostViewUncheckedCreateWithoutPostInput> | Prisma.RecentPostViewCreateWithoutPostInput[] | Prisma.RecentPostViewUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.RecentPostViewCreateOrConnectWithoutPostInput | Prisma.RecentPostViewCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.RecentPostViewUpsertWithWhereUniqueWithoutPostInput | Prisma.RecentPostViewUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.RecentPostViewCreateManyPostInputEnvelope;
    set?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    disconnect?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    delete?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    connect?: Prisma.RecentPostViewWhereUniqueInput | Prisma.RecentPostViewWhereUniqueInput[];
    update?: Prisma.RecentPostViewUpdateWithWhereUniqueWithoutPostInput | Prisma.RecentPostViewUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.RecentPostViewUpdateManyWithWhereWithoutPostInput | Prisma.RecentPostViewUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.RecentPostViewScalarWhereInput | Prisma.RecentPostViewScalarWhereInput[];
};
export type RecentPostViewCreateWithoutUserInput = {
    id?: string;
    viewedAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutRecentViewsInput;
};
export type RecentPostViewUncheckedCreateWithoutUserInput = {
    id?: string;
    postId: string;
    viewedAt?: Date | string;
};
export type RecentPostViewCreateOrConnectWithoutUserInput = {
    where: Prisma.RecentPostViewWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecentPostViewCreateWithoutUserInput, Prisma.RecentPostViewUncheckedCreateWithoutUserInput>;
};
export type RecentPostViewCreateManyUserInputEnvelope = {
    data: Prisma.RecentPostViewCreateManyUserInput | Prisma.RecentPostViewCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type RecentPostViewUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.RecentPostViewWhereUniqueInput;
    update: Prisma.XOR<Prisma.RecentPostViewUpdateWithoutUserInput, Prisma.RecentPostViewUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RecentPostViewCreateWithoutUserInput, Prisma.RecentPostViewUncheckedCreateWithoutUserInput>;
};
export type RecentPostViewUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.RecentPostViewWhereUniqueInput;
    data: Prisma.XOR<Prisma.RecentPostViewUpdateWithoutUserInput, Prisma.RecentPostViewUncheckedUpdateWithoutUserInput>;
};
export type RecentPostViewUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.RecentPostViewScalarWhereInput;
    data: Prisma.XOR<Prisma.RecentPostViewUpdateManyMutationInput, Prisma.RecentPostViewUncheckedUpdateManyWithoutUserInput>;
};
export type RecentPostViewScalarWhereInput = {
    AND?: Prisma.RecentPostViewScalarWhereInput | Prisma.RecentPostViewScalarWhereInput[];
    OR?: Prisma.RecentPostViewScalarWhereInput[];
    NOT?: Prisma.RecentPostViewScalarWhereInput | Prisma.RecentPostViewScalarWhereInput[];
    id?: Prisma.StringFilter<"RecentPostView"> | string;
    postId?: Prisma.StringFilter<"RecentPostView"> | string;
    userId?: Prisma.StringFilter<"RecentPostView"> | string;
    viewedAt?: Prisma.DateTimeFilter<"RecentPostView"> | Date | string;
};
export type RecentPostViewCreateWithoutPostInput = {
    id?: string;
    viewedAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutRecentPostViewsInput;
};
export type RecentPostViewUncheckedCreateWithoutPostInput = {
    id?: string;
    userId: string;
    viewedAt?: Date | string;
};
export type RecentPostViewCreateOrConnectWithoutPostInput = {
    where: Prisma.RecentPostViewWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecentPostViewCreateWithoutPostInput, Prisma.RecentPostViewUncheckedCreateWithoutPostInput>;
};
export type RecentPostViewCreateManyPostInputEnvelope = {
    data: Prisma.RecentPostViewCreateManyPostInput | Prisma.RecentPostViewCreateManyPostInput[];
    skipDuplicates?: boolean;
};
export type RecentPostViewUpsertWithWhereUniqueWithoutPostInput = {
    where: Prisma.RecentPostViewWhereUniqueInput;
    update: Prisma.XOR<Prisma.RecentPostViewUpdateWithoutPostInput, Prisma.RecentPostViewUncheckedUpdateWithoutPostInput>;
    create: Prisma.XOR<Prisma.RecentPostViewCreateWithoutPostInput, Prisma.RecentPostViewUncheckedCreateWithoutPostInput>;
};
export type RecentPostViewUpdateWithWhereUniqueWithoutPostInput = {
    where: Prisma.RecentPostViewWhereUniqueInput;
    data: Prisma.XOR<Prisma.RecentPostViewUpdateWithoutPostInput, Prisma.RecentPostViewUncheckedUpdateWithoutPostInput>;
};
export type RecentPostViewUpdateManyWithWhereWithoutPostInput = {
    where: Prisma.RecentPostViewScalarWhereInput;
    data: Prisma.XOR<Prisma.RecentPostViewUpdateManyMutationInput, Prisma.RecentPostViewUncheckedUpdateManyWithoutPostInput>;
};
export type RecentPostViewCreateManyUserInput = {
    id?: string;
    postId: string;
    viewedAt?: Date | string;
};
export type RecentPostViewUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutRecentViewsNestedInput;
};
export type RecentPostViewUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentPostViewUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentPostViewCreateManyPostInput = {
    id?: string;
    userId: string;
    viewedAt?: Date | string;
};
export type RecentPostViewUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutRecentPostViewsNestedInput;
};
export type RecentPostViewUncheckedUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentPostViewUncheckedUpdateManyWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentPostViewSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    postId?: boolean;
    userId?: boolean;
    viewedAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recentPostView"]>;
export type RecentPostViewSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    postId?: boolean;
    userId?: boolean;
    viewedAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recentPostView"]>;
export type RecentPostViewSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    postId?: boolean;
    userId?: boolean;
    viewedAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recentPostView"]>;
export type RecentPostViewSelectScalar = {
    id?: boolean;
    postId?: boolean;
    userId?: boolean;
    viewedAt?: boolean;
};
export type RecentPostViewOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "postId" | "userId" | "viewedAt", ExtArgs["result"]["recentPostView"]>;
export type RecentPostViewInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type RecentPostViewIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type RecentPostViewIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $RecentPostViewPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RecentPostView";
    objects: {
        post: Prisma.$PostPayload<ExtArgs>;
        user: Prisma.$UsersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        postId: string;
        userId: string;
        viewedAt: Date;
    }, ExtArgs["result"]["recentPostView"]>;
    composites: {};
};
export type RecentPostViewGetPayload<S extends boolean | null | undefined | RecentPostViewDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RecentPostViewPayload, S>;
export type RecentPostViewCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RecentPostViewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RecentPostViewCountAggregateInputType | true;
};
export interface RecentPostViewDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RecentPostView'];
        meta: {
            name: 'RecentPostView';
        };
    };
    findUnique<T extends RecentPostViewFindUniqueArgs>(args: Prisma.SelectSubset<T, RecentPostViewFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RecentPostViewClient<runtime.Types.Result.GetResult<Prisma.$RecentPostViewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RecentPostViewFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RecentPostViewFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecentPostViewClient<runtime.Types.Result.GetResult<Prisma.$RecentPostViewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RecentPostViewFindFirstArgs>(args?: Prisma.SelectSubset<T, RecentPostViewFindFirstArgs<ExtArgs>>): Prisma.Prisma__RecentPostViewClient<runtime.Types.Result.GetResult<Prisma.$RecentPostViewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RecentPostViewFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RecentPostViewFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecentPostViewClient<runtime.Types.Result.GetResult<Prisma.$RecentPostViewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RecentPostViewFindManyArgs>(args?: Prisma.SelectSubset<T, RecentPostViewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecentPostViewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RecentPostViewCreateArgs>(args: Prisma.SelectSubset<T, RecentPostViewCreateArgs<ExtArgs>>): Prisma.Prisma__RecentPostViewClient<runtime.Types.Result.GetResult<Prisma.$RecentPostViewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RecentPostViewCreateManyArgs>(args?: Prisma.SelectSubset<T, RecentPostViewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RecentPostViewCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RecentPostViewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecentPostViewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RecentPostViewDeleteArgs>(args: Prisma.SelectSubset<T, RecentPostViewDeleteArgs<ExtArgs>>): Prisma.Prisma__RecentPostViewClient<runtime.Types.Result.GetResult<Prisma.$RecentPostViewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RecentPostViewUpdateArgs>(args: Prisma.SelectSubset<T, RecentPostViewUpdateArgs<ExtArgs>>): Prisma.Prisma__RecentPostViewClient<runtime.Types.Result.GetResult<Prisma.$RecentPostViewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RecentPostViewDeleteManyArgs>(args?: Prisma.SelectSubset<T, RecentPostViewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RecentPostViewUpdateManyArgs>(args: Prisma.SelectSubset<T, RecentPostViewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RecentPostViewUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RecentPostViewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecentPostViewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RecentPostViewUpsertArgs>(args: Prisma.SelectSubset<T, RecentPostViewUpsertArgs<ExtArgs>>): Prisma.Prisma__RecentPostViewClient<runtime.Types.Result.GetResult<Prisma.$RecentPostViewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RecentPostViewCountArgs>(args?: Prisma.Subset<T, RecentPostViewCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RecentPostViewCountAggregateOutputType> : number>;
    aggregate<T extends RecentPostViewAggregateArgs>(args: Prisma.Subset<T, RecentPostViewAggregateArgs>): Prisma.PrismaPromise<GetRecentPostViewAggregateType<T>>;
    groupBy<T extends RecentPostViewGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RecentPostViewGroupByArgs['orderBy'];
    } : {
        orderBy?: RecentPostViewGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RecentPostViewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecentPostViewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RecentPostViewFieldRefs;
}
export interface Prisma__RecentPostViewClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    post<T extends Prisma.PostDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PostDefaultArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RecentPostViewFieldRefs {
    readonly id: Prisma.FieldRef<"RecentPostView", 'String'>;
    readonly postId: Prisma.FieldRef<"RecentPostView", 'String'>;
    readonly userId: Prisma.FieldRef<"RecentPostView", 'String'>;
    readonly viewedAt: Prisma.FieldRef<"RecentPostView", 'DateTime'>;
}
export type RecentPostViewFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentPostViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentPostViewOmit<ExtArgs> | null;
    include?: Prisma.RecentPostViewInclude<ExtArgs> | null;
    where: Prisma.RecentPostViewWhereUniqueInput;
};
export type RecentPostViewFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentPostViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentPostViewOmit<ExtArgs> | null;
    include?: Prisma.RecentPostViewInclude<ExtArgs> | null;
    where: Prisma.RecentPostViewWhereUniqueInput;
};
export type RecentPostViewFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentPostViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentPostViewOmit<ExtArgs> | null;
    include?: Prisma.RecentPostViewInclude<ExtArgs> | null;
    where?: Prisma.RecentPostViewWhereInput;
    orderBy?: Prisma.RecentPostViewOrderByWithRelationInput | Prisma.RecentPostViewOrderByWithRelationInput[];
    cursor?: Prisma.RecentPostViewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecentPostViewScalarFieldEnum | Prisma.RecentPostViewScalarFieldEnum[];
};
export type RecentPostViewFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentPostViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentPostViewOmit<ExtArgs> | null;
    include?: Prisma.RecentPostViewInclude<ExtArgs> | null;
    where?: Prisma.RecentPostViewWhereInput;
    orderBy?: Prisma.RecentPostViewOrderByWithRelationInput | Prisma.RecentPostViewOrderByWithRelationInput[];
    cursor?: Prisma.RecentPostViewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecentPostViewScalarFieldEnum | Prisma.RecentPostViewScalarFieldEnum[];
};
export type RecentPostViewFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentPostViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentPostViewOmit<ExtArgs> | null;
    include?: Prisma.RecentPostViewInclude<ExtArgs> | null;
    where?: Prisma.RecentPostViewWhereInput;
    orderBy?: Prisma.RecentPostViewOrderByWithRelationInput | Prisma.RecentPostViewOrderByWithRelationInput[];
    cursor?: Prisma.RecentPostViewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecentPostViewScalarFieldEnum | Prisma.RecentPostViewScalarFieldEnum[];
};
export type RecentPostViewCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentPostViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentPostViewOmit<ExtArgs> | null;
    include?: Prisma.RecentPostViewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecentPostViewCreateInput, Prisma.RecentPostViewUncheckedCreateInput>;
};
export type RecentPostViewCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RecentPostViewCreateManyInput | Prisma.RecentPostViewCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RecentPostViewCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentPostViewSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecentPostViewOmit<ExtArgs> | null;
    data: Prisma.RecentPostViewCreateManyInput | Prisma.RecentPostViewCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RecentPostViewIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RecentPostViewUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentPostViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentPostViewOmit<ExtArgs> | null;
    include?: Prisma.RecentPostViewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecentPostViewUpdateInput, Prisma.RecentPostViewUncheckedUpdateInput>;
    where: Prisma.RecentPostViewWhereUniqueInput;
};
export type RecentPostViewUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RecentPostViewUpdateManyMutationInput, Prisma.RecentPostViewUncheckedUpdateManyInput>;
    where?: Prisma.RecentPostViewWhereInput;
    limit?: number;
};
export type RecentPostViewUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentPostViewSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecentPostViewOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecentPostViewUpdateManyMutationInput, Prisma.RecentPostViewUncheckedUpdateManyInput>;
    where?: Prisma.RecentPostViewWhereInput;
    limit?: number;
    include?: Prisma.RecentPostViewIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RecentPostViewUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentPostViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentPostViewOmit<ExtArgs> | null;
    include?: Prisma.RecentPostViewInclude<ExtArgs> | null;
    where: Prisma.RecentPostViewWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecentPostViewCreateInput, Prisma.RecentPostViewUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RecentPostViewUpdateInput, Prisma.RecentPostViewUncheckedUpdateInput>;
};
export type RecentPostViewDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentPostViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentPostViewOmit<ExtArgs> | null;
    include?: Prisma.RecentPostViewInclude<ExtArgs> | null;
    where: Prisma.RecentPostViewWhereUniqueInput;
};
export type RecentPostViewDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecentPostViewWhereInput;
    limit?: number;
};
export type RecentPostViewDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentPostViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentPostViewOmit<ExtArgs> | null;
    include?: Prisma.RecentPostViewInclude<ExtArgs> | null;
};
