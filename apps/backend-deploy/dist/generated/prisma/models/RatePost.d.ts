import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type RatePostModel = runtime.Types.Result.DefaultSelection<Prisma.$RatePostPayload>;
export type AggregateRatePost = {
    _count: RatePostCountAggregateOutputType | null;
    _avg: RatePostAvgAggregateOutputType | null;
    _sum: RatePostSumAggregateOutputType | null;
    _min: RatePostMinAggregateOutputType | null;
    _max: RatePostMaxAggregateOutputType | null;
};
export type RatePostAvgAggregateOutputType = {
    rating: number | null;
};
export type RatePostSumAggregateOutputType = {
    rating: number | null;
};
export type RatePostMinAggregateOutputType = {
    id: string | null;
    postId: string | null;
    userId: string | null;
    rating: number | null;
    createdAt: Date | null;
};
export type RatePostMaxAggregateOutputType = {
    id: string | null;
    postId: string | null;
    userId: string | null;
    rating: number | null;
    createdAt: Date | null;
};
export type RatePostCountAggregateOutputType = {
    id: number;
    postId: number;
    userId: number;
    rating: number;
    createdAt: number;
    _all: number;
};
export type RatePostAvgAggregateInputType = {
    rating?: true;
};
export type RatePostSumAggregateInputType = {
    rating?: true;
};
export type RatePostMinAggregateInputType = {
    id?: true;
    postId?: true;
    userId?: true;
    rating?: true;
    createdAt?: true;
};
export type RatePostMaxAggregateInputType = {
    id?: true;
    postId?: true;
    userId?: true;
    rating?: true;
    createdAt?: true;
};
export type RatePostCountAggregateInputType = {
    id?: true;
    postId?: true;
    userId?: true;
    rating?: true;
    createdAt?: true;
    _all?: true;
};
export type RatePostAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatePostWhereInput;
    orderBy?: Prisma.RatePostOrderByWithRelationInput | Prisma.RatePostOrderByWithRelationInput[];
    cursor?: Prisma.RatePostWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RatePostCountAggregateInputType;
    _avg?: RatePostAvgAggregateInputType;
    _sum?: RatePostSumAggregateInputType;
    _min?: RatePostMinAggregateInputType;
    _max?: RatePostMaxAggregateInputType;
};
export type GetRatePostAggregateType<T extends RatePostAggregateArgs> = {
    [P in keyof T & keyof AggregateRatePost]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRatePost[P]> : Prisma.GetScalarType<T[P], AggregateRatePost[P]>;
};
export type RatePostGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatePostWhereInput;
    orderBy?: Prisma.RatePostOrderByWithAggregationInput | Prisma.RatePostOrderByWithAggregationInput[];
    by: Prisma.RatePostScalarFieldEnum[] | Prisma.RatePostScalarFieldEnum;
    having?: Prisma.RatePostScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RatePostCountAggregateInputType | true;
    _avg?: RatePostAvgAggregateInputType;
    _sum?: RatePostSumAggregateInputType;
    _min?: RatePostMinAggregateInputType;
    _max?: RatePostMaxAggregateInputType;
};
export type RatePostGroupByOutputType = {
    id: string;
    postId: string;
    userId: string;
    rating: number;
    createdAt: Date;
    _count: RatePostCountAggregateOutputType | null;
    _avg: RatePostAvgAggregateOutputType | null;
    _sum: RatePostSumAggregateOutputType | null;
    _min: RatePostMinAggregateOutputType | null;
    _max: RatePostMaxAggregateOutputType | null;
};
export type GetRatePostGroupByPayload<T extends RatePostGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RatePostGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RatePostGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RatePostGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RatePostGroupByOutputType[P]>;
}>>;
export type RatePostWhereInput = {
    AND?: Prisma.RatePostWhereInput | Prisma.RatePostWhereInput[];
    OR?: Prisma.RatePostWhereInput[];
    NOT?: Prisma.RatePostWhereInput | Prisma.RatePostWhereInput[];
    id?: Prisma.StringFilter<"RatePost"> | string;
    postId?: Prisma.StringFilter<"RatePost"> | string;
    userId?: Prisma.StringFilter<"RatePost"> | string;
    rating?: Prisma.FloatFilter<"RatePost"> | number;
    createdAt?: Prisma.DateTimeFilter<"RatePost"> | Date | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
};
export type RatePostOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    post?: Prisma.PostOrderByWithRelationInput;
    user?: Prisma.UsersOrderByWithRelationInput;
};
export type RatePostWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    postId_userId?: Prisma.RatePostPostIdUserIdCompoundUniqueInput;
    AND?: Prisma.RatePostWhereInput | Prisma.RatePostWhereInput[];
    OR?: Prisma.RatePostWhereInput[];
    NOT?: Prisma.RatePostWhereInput | Prisma.RatePostWhereInput[];
    postId?: Prisma.StringFilter<"RatePost"> | string;
    userId?: Prisma.StringFilter<"RatePost"> | string;
    rating?: Prisma.FloatFilter<"RatePost"> | number;
    createdAt?: Prisma.DateTimeFilter<"RatePost"> | Date | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
}, "id" | "postId_userId">;
export type RatePostOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RatePostCountOrderByAggregateInput;
    _avg?: Prisma.RatePostAvgOrderByAggregateInput;
    _max?: Prisma.RatePostMaxOrderByAggregateInput;
    _min?: Prisma.RatePostMinOrderByAggregateInput;
    _sum?: Prisma.RatePostSumOrderByAggregateInput;
};
export type RatePostScalarWhereWithAggregatesInput = {
    AND?: Prisma.RatePostScalarWhereWithAggregatesInput | Prisma.RatePostScalarWhereWithAggregatesInput[];
    OR?: Prisma.RatePostScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RatePostScalarWhereWithAggregatesInput | Prisma.RatePostScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RatePost"> | string;
    postId?: Prisma.StringWithAggregatesFilter<"RatePost"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"RatePost"> | string;
    rating?: Prisma.FloatWithAggregatesFilter<"RatePost"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RatePost"> | Date | string;
};
export type RatePostCreateInput = {
    id?: string;
    rating?: number;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutRatePostsInput;
    user: Prisma.UsersCreateNestedOneWithoutRatePostsInput;
};
export type RatePostUncheckedCreateInput = {
    id?: string;
    postId: string;
    userId: string;
    rating?: number;
    createdAt?: Date | string;
};
export type RatePostUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutRatePostsNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutRatePostsNestedInput;
};
export type RatePostUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatePostCreateManyInput = {
    id?: string;
    postId: string;
    userId: string;
    rating?: number;
    createdAt?: Date | string;
};
export type RatePostUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatePostUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatePostListRelationFilter = {
    every?: Prisma.RatePostWhereInput;
    some?: Prisma.RatePostWhereInput;
    none?: Prisma.RatePostWhereInput;
};
export type RatePostOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RatePostPostIdUserIdCompoundUniqueInput = {
    postId: string;
    userId: string;
};
export type RatePostCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RatePostAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
};
export type RatePostMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RatePostMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RatePostSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
};
export type RatePostCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RatePostCreateWithoutUserInput, Prisma.RatePostUncheckedCreateWithoutUserInput> | Prisma.RatePostCreateWithoutUserInput[] | Prisma.RatePostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RatePostCreateOrConnectWithoutUserInput | Prisma.RatePostCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RatePostCreateManyUserInputEnvelope;
    connect?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
};
export type RatePostUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RatePostCreateWithoutUserInput, Prisma.RatePostUncheckedCreateWithoutUserInput> | Prisma.RatePostCreateWithoutUserInput[] | Prisma.RatePostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RatePostCreateOrConnectWithoutUserInput | Prisma.RatePostCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RatePostCreateManyUserInputEnvelope;
    connect?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
};
export type RatePostUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RatePostCreateWithoutUserInput, Prisma.RatePostUncheckedCreateWithoutUserInput> | Prisma.RatePostCreateWithoutUserInput[] | Prisma.RatePostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RatePostCreateOrConnectWithoutUserInput | Prisma.RatePostCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RatePostUpsertWithWhereUniqueWithoutUserInput | Prisma.RatePostUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RatePostCreateManyUserInputEnvelope;
    set?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    disconnect?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    delete?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    connect?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    update?: Prisma.RatePostUpdateWithWhereUniqueWithoutUserInput | Prisma.RatePostUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RatePostUpdateManyWithWhereWithoutUserInput | Prisma.RatePostUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RatePostScalarWhereInput | Prisma.RatePostScalarWhereInput[];
};
export type RatePostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RatePostCreateWithoutUserInput, Prisma.RatePostUncheckedCreateWithoutUserInput> | Prisma.RatePostCreateWithoutUserInput[] | Prisma.RatePostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RatePostCreateOrConnectWithoutUserInput | Prisma.RatePostCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RatePostUpsertWithWhereUniqueWithoutUserInput | Prisma.RatePostUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RatePostCreateManyUserInputEnvelope;
    set?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    disconnect?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    delete?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    connect?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    update?: Prisma.RatePostUpdateWithWhereUniqueWithoutUserInput | Prisma.RatePostUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RatePostUpdateManyWithWhereWithoutUserInput | Prisma.RatePostUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RatePostScalarWhereInput | Prisma.RatePostScalarWhereInput[];
};
export type RatePostCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.RatePostCreateWithoutPostInput, Prisma.RatePostUncheckedCreateWithoutPostInput> | Prisma.RatePostCreateWithoutPostInput[] | Prisma.RatePostUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.RatePostCreateOrConnectWithoutPostInput | Prisma.RatePostCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.RatePostCreateManyPostInputEnvelope;
    connect?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
};
export type RatePostUncheckedCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.RatePostCreateWithoutPostInput, Prisma.RatePostUncheckedCreateWithoutPostInput> | Prisma.RatePostCreateWithoutPostInput[] | Prisma.RatePostUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.RatePostCreateOrConnectWithoutPostInput | Prisma.RatePostCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.RatePostCreateManyPostInputEnvelope;
    connect?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
};
export type RatePostUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.RatePostCreateWithoutPostInput, Prisma.RatePostUncheckedCreateWithoutPostInput> | Prisma.RatePostCreateWithoutPostInput[] | Prisma.RatePostUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.RatePostCreateOrConnectWithoutPostInput | Prisma.RatePostCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.RatePostUpsertWithWhereUniqueWithoutPostInput | Prisma.RatePostUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.RatePostCreateManyPostInputEnvelope;
    set?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    disconnect?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    delete?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    connect?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    update?: Prisma.RatePostUpdateWithWhereUniqueWithoutPostInput | Prisma.RatePostUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.RatePostUpdateManyWithWhereWithoutPostInput | Prisma.RatePostUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.RatePostScalarWhereInput | Prisma.RatePostScalarWhereInput[];
};
export type RatePostUncheckedUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.RatePostCreateWithoutPostInput, Prisma.RatePostUncheckedCreateWithoutPostInput> | Prisma.RatePostCreateWithoutPostInput[] | Prisma.RatePostUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.RatePostCreateOrConnectWithoutPostInput | Prisma.RatePostCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.RatePostUpsertWithWhereUniqueWithoutPostInput | Prisma.RatePostUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.RatePostCreateManyPostInputEnvelope;
    set?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    disconnect?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    delete?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    connect?: Prisma.RatePostWhereUniqueInput | Prisma.RatePostWhereUniqueInput[];
    update?: Prisma.RatePostUpdateWithWhereUniqueWithoutPostInput | Prisma.RatePostUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.RatePostUpdateManyWithWhereWithoutPostInput | Prisma.RatePostUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.RatePostScalarWhereInput | Prisma.RatePostScalarWhereInput[];
};
export type RatePostCreateWithoutUserInput = {
    id?: string;
    rating?: number;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutRatePostsInput;
};
export type RatePostUncheckedCreateWithoutUserInput = {
    id?: string;
    postId: string;
    rating?: number;
    createdAt?: Date | string;
};
export type RatePostCreateOrConnectWithoutUserInput = {
    where: Prisma.RatePostWhereUniqueInput;
    create: Prisma.XOR<Prisma.RatePostCreateWithoutUserInput, Prisma.RatePostUncheckedCreateWithoutUserInput>;
};
export type RatePostCreateManyUserInputEnvelope = {
    data: Prisma.RatePostCreateManyUserInput | Prisma.RatePostCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type RatePostUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.RatePostWhereUniqueInput;
    update: Prisma.XOR<Prisma.RatePostUpdateWithoutUserInput, Prisma.RatePostUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RatePostCreateWithoutUserInput, Prisma.RatePostUncheckedCreateWithoutUserInput>;
};
export type RatePostUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.RatePostWhereUniqueInput;
    data: Prisma.XOR<Prisma.RatePostUpdateWithoutUserInput, Prisma.RatePostUncheckedUpdateWithoutUserInput>;
};
export type RatePostUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.RatePostScalarWhereInput;
    data: Prisma.XOR<Prisma.RatePostUpdateManyMutationInput, Prisma.RatePostUncheckedUpdateManyWithoutUserInput>;
};
export type RatePostScalarWhereInput = {
    AND?: Prisma.RatePostScalarWhereInput | Prisma.RatePostScalarWhereInput[];
    OR?: Prisma.RatePostScalarWhereInput[];
    NOT?: Prisma.RatePostScalarWhereInput | Prisma.RatePostScalarWhereInput[];
    id?: Prisma.StringFilter<"RatePost"> | string;
    postId?: Prisma.StringFilter<"RatePost"> | string;
    userId?: Prisma.StringFilter<"RatePost"> | string;
    rating?: Prisma.FloatFilter<"RatePost"> | number;
    createdAt?: Prisma.DateTimeFilter<"RatePost"> | Date | string;
};
export type RatePostCreateWithoutPostInput = {
    id?: string;
    rating?: number;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutRatePostsInput;
};
export type RatePostUncheckedCreateWithoutPostInput = {
    id?: string;
    userId: string;
    rating?: number;
    createdAt?: Date | string;
};
export type RatePostCreateOrConnectWithoutPostInput = {
    where: Prisma.RatePostWhereUniqueInput;
    create: Prisma.XOR<Prisma.RatePostCreateWithoutPostInput, Prisma.RatePostUncheckedCreateWithoutPostInput>;
};
export type RatePostCreateManyPostInputEnvelope = {
    data: Prisma.RatePostCreateManyPostInput | Prisma.RatePostCreateManyPostInput[];
    skipDuplicates?: boolean;
};
export type RatePostUpsertWithWhereUniqueWithoutPostInput = {
    where: Prisma.RatePostWhereUniqueInput;
    update: Prisma.XOR<Prisma.RatePostUpdateWithoutPostInput, Prisma.RatePostUncheckedUpdateWithoutPostInput>;
    create: Prisma.XOR<Prisma.RatePostCreateWithoutPostInput, Prisma.RatePostUncheckedCreateWithoutPostInput>;
};
export type RatePostUpdateWithWhereUniqueWithoutPostInput = {
    where: Prisma.RatePostWhereUniqueInput;
    data: Prisma.XOR<Prisma.RatePostUpdateWithoutPostInput, Prisma.RatePostUncheckedUpdateWithoutPostInput>;
};
export type RatePostUpdateManyWithWhereWithoutPostInput = {
    where: Prisma.RatePostScalarWhereInput;
    data: Prisma.XOR<Prisma.RatePostUpdateManyMutationInput, Prisma.RatePostUncheckedUpdateManyWithoutPostInput>;
};
export type RatePostCreateManyUserInput = {
    id?: string;
    postId: string;
    rating?: number;
    createdAt?: Date | string;
};
export type RatePostUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutRatePostsNestedInput;
};
export type RatePostUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatePostUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatePostCreateManyPostInput = {
    id?: string;
    userId: string;
    rating?: number;
    createdAt?: Date | string;
};
export type RatePostUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutRatePostsNestedInput;
};
export type RatePostUncheckedUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatePostUncheckedUpdateManyWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RatePostSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    postId?: boolean;
    userId?: boolean;
    rating?: boolean;
    createdAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ratePost"]>;
export type RatePostSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    postId?: boolean;
    userId?: boolean;
    rating?: boolean;
    createdAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ratePost"]>;
export type RatePostSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    postId?: boolean;
    userId?: boolean;
    rating?: boolean;
    createdAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ratePost"]>;
export type RatePostSelectScalar = {
    id?: boolean;
    postId?: boolean;
    userId?: boolean;
    rating?: boolean;
    createdAt?: boolean;
};
export type RatePostOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "postId" | "userId" | "rating" | "createdAt", ExtArgs["result"]["ratePost"]>;
export type RatePostInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type RatePostIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type RatePostIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $RatePostPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RatePost";
    objects: {
        post: Prisma.$PostPayload<ExtArgs>;
        user: Prisma.$UsersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        postId: string;
        userId: string;
        rating: number;
        createdAt: Date;
    }, ExtArgs["result"]["ratePost"]>;
    composites: {};
};
export type RatePostGetPayload<S extends boolean | null | undefined | RatePostDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RatePostPayload, S>;
export type RatePostCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RatePostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RatePostCountAggregateInputType | true;
};
export interface RatePostDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RatePost'];
        meta: {
            name: 'RatePost';
        };
    };
    findUnique<T extends RatePostFindUniqueArgs>(args: Prisma.SelectSubset<T, RatePostFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RatePostClient<runtime.Types.Result.GetResult<Prisma.$RatePostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RatePostFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RatePostFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RatePostClient<runtime.Types.Result.GetResult<Prisma.$RatePostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RatePostFindFirstArgs>(args?: Prisma.SelectSubset<T, RatePostFindFirstArgs<ExtArgs>>): Prisma.Prisma__RatePostClient<runtime.Types.Result.GetResult<Prisma.$RatePostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RatePostFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RatePostFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RatePostClient<runtime.Types.Result.GetResult<Prisma.$RatePostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RatePostFindManyArgs>(args?: Prisma.SelectSubset<T, RatePostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RatePostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RatePostCreateArgs>(args: Prisma.SelectSubset<T, RatePostCreateArgs<ExtArgs>>): Prisma.Prisma__RatePostClient<runtime.Types.Result.GetResult<Prisma.$RatePostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RatePostCreateManyArgs>(args?: Prisma.SelectSubset<T, RatePostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RatePostCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RatePostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RatePostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RatePostDeleteArgs>(args: Prisma.SelectSubset<T, RatePostDeleteArgs<ExtArgs>>): Prisma.Prisma__RatePostClient<runtime.Types.Result.GetResult<Prisma.$RatePostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RatePostUpdateArgs>(args: Prisma.SelectSubset<T, RatePostUpdateArgs<ExtArgs>>): Prisma.Prisma__RatePostClient<runtime.Types.Result.GetResult<Prisma.$RatePostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RatePostDeleteManyArgs>(args?: Prisma.SelectSubset<T, RatePostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RatePostUpdateManyArgs>(args: Prisma.SelectSubset<T, RatePostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RatePostUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RatePostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RatePostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RatePostUpsertArgs>(args: Prisma.SelectSubset<T, RatePostUpsertArgs<ExtArgs>>): Prisma.Prisma__RatePostClient<runtime.Types.Result.GetResult<Prisma.$RatePostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RatePostCountArgs>(args?: Prisma.Subset<T, RatePostCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RatePostCountAggregateOutputType> : number>;
    aggregate<T extends RatePostAggregateArgs>(args: Prisma.Subset<T, RatePostAggregateArgs>): Prisma.PrismaPromise<GetRatePostAggregateType<T>>;
    groupBy<T extends RatePostGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RatePostGroupByArgs['orderBy'];
    } : {
        orderBy?: RatePostGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RatePostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRatePostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RatePostFieldRefs;
}
export interface Prisma__RatePostClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    post<T extends Prisma.PostDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PostDefaultArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RatePostFieldRefs {
    readonly id: Prisma.FieldRef<"RatePost", 'String'>;
    readonly postId: Prisma.FieldRef<"RatePost", 'String'>;
    readonly userId: Prisma.FieldRef<"RatePost", 'String'>;
    readonly rating: Prisma.FieldRef<"RatePost", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"RatePost", 'DateTime'>;
}
export type RatePostFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatePostSelect<ExtArgs> | null;
    omit?: Prisma.RatePostOmit<ExtArgs> | null;
    include?: Prisma.RatePostInclude<ExtArgs> | null;
    where: Prisma.RatePostWhereUniqueInput;
};
export type RatePostFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatePostSelect<ExtArgs> | null;
    omit?: Prisma.RatePostOmit<ExtArgs> | null;
    include?: Prisma.RatePostInclude<ExtArgs> | null;
    where: Prisma.RatePostWhereUniqueInput;
};
export type RatePostFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatePostSelect<ExtArgs> | null;
    omit?: Prisma.RatePostOmit<ExtArgs> | null;
    include?: Prisma.RatePostInclude<ExtArgs> | null;
    where?: Prisma.RatePostWhereInput;
    orderBy?: Prisma.RatePostOrderByWithRelationInput | Prisma.RatePostOrderByWithRelationInput[];
    cursor?: Prisma.RatePostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatePostScalarFieldEnum | Prisma.RatePostScalarFieldEnum[];
};
export type RatePostFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatePostSelect<ExtArgs> | null;
    omit?: Prisma.RatePostOmit<ExtArgs> | null;
    include?: Prisma.RatePostInclude<ExtArgs> | null;
    where?: Prisma.RatePostWhereInput;
    orderBy?: Prisma.RatePostOrderByWithRelationInput | Prisma.RatePostOrderByWithRelationInput[];
    cursor?: Prisma.RatePostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatePostScalarFieldEnum | Prisma.RatePostScalarFieldEnum[];
};
export type RatePostFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatePostSelect<ExtArgs> | null;
    omit?: Prisma.RatePostOmit<ExtArgs> | null;
    include?: Prisma.RatePostInclude<ExtArgs> | null;
    where?: Prisma.RatePostWhereInput;
    orderBy?: Prisma.RatePostOrderByWithRelationInput | Prisma.RatePostOrderByWithRelationInput[];
    cursor?: Prisma.RatePostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatePostScalarFieldEnum | Prisma.RatePostScalarFieldEnum[];
};
export type RatePostCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatePostSelect<ExtArgs> | null;
    omit?: Prisma.RatePostOmit<ExtArgs> | null;
    include?: Prisma.RatePostInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RatePostCreateInput, Prisma.RatePostUncheckedCreateInput>;
};
export type RatePostCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RatePostCreateManyInput | Prisma.RatePostCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RatePostCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatePostSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RatePostOmit<ExtArgs> | null;
    data: Prisma.RatePostCreateManyInput | Prisma.RatePostCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RatePostIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RatePostUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatePostSelect<ExtArgs> | null;
    omit?: Prisma.RatePostOmit<ExtArgs> | null;
    include?: Prisma.RatePostInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RatePostUpdateInput, Prisma.RatePostUncheckedUpdateInput>;
    where: Prisma.RatePostWhereUniqueInput;
};
export type RatePostUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RatePostUpdateManyMutationInput, Prisma.RatePostUncheckedUpdateManyInput>;
    where?: Prisma.RatePostWhereInput;
    limit?: number;
};
export type RatePostUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatePostSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RatePostOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RatePostUpdateManyMutationInput, Prisma.RatePostUncheckedUpdateManyInput>;
    where?: Prisma.RatePostWhereInput;
    limit?: number;
    include?: Prisma.RatePostIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RatePostUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatePostSelect<ExtArgs> | null;
    omit?: Prisma.RatePostOmit<ExtArgs> | null;
    include?: Prisma.RatePostInclude<ExtArgs> | null;
    where: Prisma.RatePostWhereUniqueInput;
    create: Prisma.XOR<Prisma.RatePostCreateInput, Prisma.RatePostUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RatePostUpdateInput, Prisma.RatePostUncheckedUpdateInput>;
};
export type RatePostDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatePostSelect<ExtArgs> | null;
    omit?: Prisma.RatePostOmit<ExtArgs> | null;
    include?: Prisma.RatePostInclude<ExtArgs> | null;
    where: Prisma.RatePostWhereUniqueInput;
};
export type RatePostDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatePostWhereInput;
    limit?: number;
};
export type RatePostDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatePostSelect<ExtArgs> | null;
    omit?: Prisma.RatePostOmit<ExtArgs> | null;
    include?: Prisma.RatePostInclude<ExtArgs> | null;
};
