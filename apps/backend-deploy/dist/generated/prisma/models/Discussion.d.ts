import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type DiscussionModel = runtime.Types.Result.DefaultSelection<Prisma.$DiscussionPayload>;
export type AggregateDiscussion = {
    _count: DiscussionCountAggregateOutputType | null;
    _avg: DiscussionAvgAggregateOutputType | null;
    _sum: DiscussionSumAggregateOutputType | null;
    _min: DiscussionMinAggregateOutputType | null;
    _max: DiscussionMaxAggregateOutputType | null;
};
export type DiscussionAvgAggregateOutputType = {
    ratingCount: number | null;
    ratingTotal: number | null;
    rating: number | null;
};
export type DiscussionSumAggregateOutputType = {
    ratingCount: number | null;
    ratingTotal: number | null;
    rating: number | null;
};
export type DiscussionMinAggregateOutputType = {
    id: string | null;
    ratingCount: number | null;
    ratingTotal: number | null;
    rating: number | null;
    postId: string | null;
    userId: string | null;
    parentId: string | null;
    repliedId: string | null;
    createdAt: Date | null;
};
export type DiscussionMaxAggregateOutputType = {
    id: string | null;
    ratingCount: number | null;
    ratingTotal: number | null;
    rating: number | null;
    postId: string | null;
    userId: string | null;
    parentId: string | null;
    repliedId: string | null;
    createdAt: Date | null;
};
export type DiscussionCountAggregateOutputType = {
    id: number;
    discussion: number;
    ratingCount: number;
    ratingTotal: number;
    rating: number;
    postId: number;
    userId: number;
    parentId: number;
    repliedId: number;
    createdAt: number;
    _all: number;
};
export type DiscussionAvgAggregateInputType = {
    ratingCount?: true;
    ratingTotal?: true;
    rating?: true;
};
export type DiscussionSumAggregateInputType = {
    ratingCount?: true;
    ratingTotal?: true;
    rating?: true;
};
export type DiscussionMinAggregateInputType = {
    id?: true;
    ratingCount?: true;
    ratingTotal?: true;
    rating?: true;
    postId?: true;
    userId?: true;
    parentId?: true;
    repliedId?: true;
    createdAt?: true;
};
export type DiscussionMaxAggregateInputType = {
    id?: true;
    ratingCount?: true;
    ratingTotal?: true;
    rating?: true;
    postId?: true;
    userId?: true;
    parentId?: true;
    repliedId?: true;
    createdAt?: true;
};
export type DiscussionCountAggregateInputType = {
    id?: true;
    discussion?: true;
    ratingCount?: true;
    ratingTotal?: true;
    rating?: true;
    postId?: true;
    userId?: true;
    parentId?: true;
    repliedId?: true;
    createdAt?: true;
    _all?: true;
};
export type DiscussionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiscussionWhereInput;
    orderBy?: Prisma.DiscussionOrderByWithRelationInput | Prisma.DiscussionOrderByWithRelationInput[];
    cursor?: Prisma.DiscussionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | DiscussionCountAggregateInputType;
    _avg?: DiscussionAvgAggregateInputType;
    _sum?: DiscussionSumAggregateInputType;
    _min?: DiscussionMinAggregateInputType;
    _max?: DiscussionMaxAggregateInputType;
};
export type GetDiscussionAggregateType<T extends DiscussionAggregateArgs> = {
    [P in keyof T & keyof AggregateDiscussion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDiscussion[P]> : Prisma.GetScalarType<T[P], AggregateDiscussion[P]>;
};
export type DiscussionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiscussionWhereInput;
    orderBy?: Prisma.DiscussionOrderByWithAggregationInput | Prisma.DiscussionOrderByWithAggregationInput[];
    by: Prisma.DiscussionScalarFieldEnum[] | Prisma.DiscussionScalarFieldEnum;
    having?: Prisma.DiscussionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DiscussionCountAggregateInputType | true;
    _avg?: DiscussionAvgAggregateInputType;
    _sum?: DiscussionSumAggregateInputType;
    _min?: DiscussionMinAggregateInputType;
    _max?: DiscussionMaxAggregateInputType;
};
export type DiscussionGroupByOutputType = {
    id: string;
    discussion: runtime.JsonValue;
    ratingCount: number;
    ratingTotal: number;
    rating: number;
    postId: string;
    userId: string;
    parentId: string | null;
    repliedId: string | null;
    createdAt: Date;
    _count: DiscussionCountAggregateOutputType | null;
    _avg: DiscussionAvgAggregateOutputType | null;
    _sum: DiscussionSumAggregateOutputType | null;
    _min: DiscussionMinAggregateOutputType | null;
    _max: DiscussionMaxAggregateOutputType | null;
};
export type GetDiscussionGroupByPayload<T extends DiscussionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DiscussionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DiscussionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DiscussionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DiscussionGroupByOutputType[P]>;
}>>;
export type DiscussionWhereInput = {
    AND?: Prisma.DiscussionWhereInput | Prisma.DiscussionWhereInput[];
    OR?: Prisma.DiscussionWhereInput[];
    NOT?: Prisma.DiscussionWhereInput | Prisma.DiscussionWhereInput[];
    id?: Prisma.StringFilter<"Discussion"> | string;
    discussion?: Prisma.JsonFilter<"Discussion">;
    ratingCount?: Prisma.IntFilter<"Discussion"> | number;
    ratingTotal?: Prisma.FloatFilter<"Discussion"> | number;
    rating?: Prisma.FloatFilter<"Discussion"> | number;
    postId?: Prisma.StringFilter<"Discussion"> | string;
    userId?: Prisma.StringFilter<"Discussion"> | string;
    parentId?: Prisma.StringNullableFilter<"Discussion"> | string | null;
    repliedId?: Prisma.StringNullableFilter<"Discussion"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Discussion"> | Date | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    parentDiscussion?: Prisma.XOR<Prisma.DiscussionNullableScalarRelationFilter, Prisma.DiscussionWhereInput> | null;
    repliedDiscussion?: Prisma.XOR<Prisma.DiscussionNullableScalarRelationFilter, Prisma.DiscussionWhereInput> | null;
    rateDiscussion?: Prisma.RateDiscussionListRelationFilter;
    childrenDiscussion?: Prisma.DiscussionListRelationFilter;
    replyingDiscussions?: Prisma.DiscussionListRelationFilter;
};
export type DiscussionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    discussion?: Prisma.SortOrder;
    ratingCount?: Prisma.SortOrder;
    ratingTotal?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    repliedId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    post?: Prisma.PostOrderByWithRelationInput;
    user?: Prisma.UsersOrderByWithRelationInput;
    parentDiscussion?: Prisma.DiscussionOrderByWithRelationInput;
    repliedDiscussion?: Prisma.DiscussionOrderByWithRelationInput;
    rateDiscussion?: Prisma.RateDiscussionOrderByRelationAggregateInput;
    childrenDiscussion?: Prisma.DiscussionOrderByRelationAggregateInput;
    replyingDiscussions?: Prisma.DiscussionOrderByRelationAggregateInput;
};
export type DiscussionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.DiscussionWhereInput | Prisma.DiscussionWhereInput[];
    OR?: Prisma.DiscussionWhereInput[];
    NOT?: Prisma.DiscussionWhereInput | Prisma.DiscussionWhereInput[];
    discussion?: Prisma.JsonFilter<"Discussion">;
    ratingCount?: Prisma.IntFilter<"Discussion"> | number;
    ratingTotal?: Prisma.FloatFilter<"Discussion"> | number;
    rating?: Prisma.FloatFilter<"Discussion"> | number;
    postId?: Prisma.StringFilter<"Discussion"> | string;
    userId?: Prisma.StringFilter<"Discussion"> | string;
    parentId?: Prisma.StringNullableFilter<"Discussion"> | string | null;
    repliedId?: Prisma.StringNullableFilter<"Discussion"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Discussion"> | Date | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    parentDiscussion?: Prisma.XOR<Prisma.DiscussionNullableScalarRelationFilter, Prisma.DiscussionWhereInput> | null;
    repliedDiscussion?: Prisma.XOR<Prisma.DiscussionNullableScalarRelationFilter, Prisma.DiscussionWhereInput> | null;
    rateDiscussion?: Prisma.RateDiscussionListRelationFilter;
    childrenDiscussion?: Prisma.DiscussionListRelationFilter;
    replyingDiscussions?: Prisma.DiscussionListRelationFilter;
}, "id">;
export type DiscussionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    discussion?: Prisma.SortOrder;
    ratingCount?: Prisma.SortOrder;
    ratingTotal?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    repliedId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.DiscussionCountOrderByAggregateInput;
    _avg?: Prisma.DiscussionAvgOrderByAggregateInput;
    _max?: Prisma.DiscussionMaxOrderByAggregateInput;
    _min?: Prisma.DiscussionMinOrderByAggregateInput;
    _sum?: Prisma.DiscussionSumOrderByAggregateInput;
};
export type DiscussionScalarWhereWithAggregatesInput = {
    AND?: Prisma.DiscussionScalarWhereWithAggregatesInput | Prisma.DiscussionScalarWhereWithAggregatesInput[];
    OR?: Prisma.DiscussionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.DiscussionScalarWhereWithAggregatesInput | Prisma.DiscussionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Discussion"> | string;
    discussion?: Prisma.JsonWithAggregatesFilter<"Discussion">;
    ratingCount?: Prisma.IntWithAggregatesFilter<"Discussion"> | number;
    ratingTotal?: Prisma.FloatWithAggregatesFilter<"Discussion"> | number;
    rating?: Prisma.FloatWithAggregatesFilter<"Discussion"> | number;
    postId?: Prisma.StringWithAggregatesFilter<"Discussion"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Discussion"> | string;
    parentId?: Prisma.StringNullableWithAggregatesFilter<"Discussion"> | string | null;
    repliedId?: Prisma.StringNullableWithAggregatesFilter<"Discussion"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Discussion"> | Date | string;
};
export type DiscussionCreateInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutDiscussionsInput;
    user: Prisma.UsersCreateNestedOneWithoutDiscussionsInput;
    parentDiscussion?: Prisma.DiscussionCreateNestedOneWithoutChildrenDiscussionInput;
    repliedDiscussion?: Prisma.DiscussionCreateNestedOneWithoutReplyingDiscussionsInput;
    rateDiscussion?: Prisma.RateDiscussionCreateNestedManyWithoutDiscussionInput;
    childrenDiscussion?: Prisma.DiscussionCreateNestedManyWithoutParentDiscussionInput;
    replyingDiscussions?: Prisma.DiscussionCreateNestedManyWithoutRepliedDiscussionInput;
};
export type DiscussionUncheckedCreateInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    postId: string;
    userId: string;
    parentId?: string | null;
    repliedId?: string | null;
    createdAt?: Date | string;
    rateDiscussion?: Prisma.RateDiscussionUncheckedCreateNestedManyWithoutDiscussionInput;
    childrenDiscussion?: Prisma.DiscussionUncheckedCreateNestedManyWithoutParentDiscussionInput;
    replyingDiscussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutRepliedDiscussionInput;
};
export type DiscussionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutDiscussionsNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutDiscussionsNestedInput;
    parentDiscussion?: Prisma.DiscussionUpdateOneWithoutChildrenDiscussionNestedInput;
    repliedDiscussion?: Prisma.DiscussionUpdateOneWithoutReplyingDiscussionsNestedInput;
    rateDiscussion?: Prisma.RateDiscussionUpdateManyWithoutDiscussionNestedInput;
    childrenDiscussion?: Prisma.DiscussionUpdateManyWithoutParentDiscussionNestedInput;
    replyingDiscussions?: Prisma.DiscussionUpdateManyWithoutRepliedDiscussionNestedInput;
};
export type DiscussionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repliedId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateDiscussion?: Prisma.RateDiscussionUncheckedUpdateManyWithoutDiscussionNestedInput;
    childrenDiscussion?: Prisma.DiscussionUncheckedUpdateManyWithoutParentDiscussionNestedInput;
    replyingDiscussions?: Prisma.DiscussionUncheckedUpdateManyWithoutRepliedDiscussionNestedInput;
};
export type DiscussionCreateManyInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    postId: string;
    userId: string;
    parentId?: string | null;
    repliedId?: string | null;
    createdAt?: Date | string;
};
export type DiscussionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscussionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repliedId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscussionListRelationFilter = {
    every?: Prisma.DiscussionWhereInput;
    some?: Prisma.DiscussionWhereInput;
    none?: Prisma.DiscussionWhereInput;
};
export type DiscussionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DiscussionNullableScalarRelationFilter = {
    is?: Prisma.DiscussionWhereInput | null;
    isNot?: Prisma.DiscussionWhereInput | null;
};
export type DiscussionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    discussion?: Prisma.SortOrder;
    ratingCount?: Prisma.SortOrder;
    ratingTotal?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    repliedId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DiscussionAvgOrderByAggregateInput = {
    ratingCount?: Prisma.SortOrder;
    ratingTotal?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
};
export type DiscussionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ratingCount?: Prisma.SortOrder;
    ratingTotal?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    repliedId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DiscussionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ratingCount?: Prisma.SortOrder;
    ratingTotal?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    repliedId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type DiscussionSumOrderByAggregateInput = {
    ratingCount?: Prisma.SortOrder;
    ratingTotal?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
};
export type DiscussionScalarRelationFilter = {
    is?: Prisma.DiscussionWhereInput;
    isNot?: Prisma.DiscussionWhereInput;
};
export type DiscussionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutUserInput, Prisma.DiscussionUncheckedCreateWithoutUserInput> | Prisma.DiscussionCreateWithoutUserInput[] | Prisma.DiscussionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutUserInput | Prisma.DiscussionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DiscussionCreateManyUserInputEnvelope;
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
};
export type DiscussionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutUserInput, Prisma.DiscussionUncheckedCreateWithoutUserInput> | Prisma.DiscussionCreateWithoutUserInput[] | Prisma.DiscussionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutUserInput | Prisma.DiscussionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.DiscussionCreateManyUserInputEnvelope;
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
};
export type DiscussionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutUserInput, Prisma.DiscussionUncheckedCreateWithoutUserInput> | Prisma.DiscussionCreateWithoutUserInput[] | Prisma.DiscussionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutUserInput | Prisma.DiscussionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DiscussionUpsertWithWhereUniqueWithoutUserInput | Prisma.DiscussionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DiscussionCreateManyUserInputEnvelope;
    set?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    disconnect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    delete?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    update?: Prisma.DiscussionUpdateWithWhereUniqueWithoutUserInput | Prisma.DiscussionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DiscussionUpdateManyWithWhereWithoutUserInput | Prisma.DiscussionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DiscussionScalarWhereInput | Prisma.DiscussionScalarWhereInput[];
};
export type DiscussionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutUserInput, Prisma.DiscussionUncheckedCreateWithoutUserInput> | Prisma.DiscussionCreateWithoutUserInput[] | Prisma.DiscussionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutUserInput | Prisma.DiscussionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.DiscussionUpsertWithWhereUniqueWithoutUserInput | Prisma.DiscussionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.DiscussionCreateManyUserInputEnvelope;
    set?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    disconnect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    delete?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    update?: Prisma.DiscussionUpdateWithWhereUniqueWithoutUserInput | Prisma.DiscussionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.DiscussionUpdateManyWithWhereWithoutUserInput | Prisma.DiscussionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.DiscussionScalarWhereInput | Prisma.DiscussionScalarWhereInput[];
};
export type DiscussionCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutPostInput, Prisma.DiscussionUncheckedCreateWithoutPostInput> | Prisma.DiscussionCreateWithoutPostInput[] | Prisma.DiscussionUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutPostInput | Prisma.DiscussionCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.DiscussionCreateManyPostInputEnvelope;
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
};
export type DiscussionUncheckedCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutPostInput, Prisma.DiscussionUncheckedCreateWithoutPostInput> | Prisma.DiscussionCreateWithoutPostInput[] | Prisma.DiscussionUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutPostInput | Prisma.DiscussionCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.DiscussionCreateManyPostInputEnvelope;
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
};
export type DiscussionUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutPostInput, Prisma.DiscussionUncheckedCreateWithoutPostInput> | Prisma.DiscussionCreateWithoutPostInput[] | Prisma.DiscussionUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutPostInput | Prisma.DiscussionCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.DiscussionUpsertWithWhereUniqueWithoutPostInput | Prisma.DiscussionUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.DiscussionCreateManyPostInputEnvelope;
    set?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    disconnect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    delete?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    update?: Prisma.DiscussionUpdateWithWhereUniqueWithoutPostInput | Prisma.DiscussionUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.DiscussionUpdateManyWithWhereWithoutPostInput | Prisma.DiscussionUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.DiscussionScalarWhereInput | Prisma.DiscussionScalarWhereInput[];
};
export type DiscussionUncheckedUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutPostInput, Prisma.DiscussionUncheckedCreateWithoutPostInput> | Prisma.DiscussionCreateWithoutPostInput[] | Prisma.DiscussionUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutPostInput | Prisma.DiscussionCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.DiscussionUpsertWithWhereUniqueWithoutPostInput | Prisma.DiscussionUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.DiscussionCreateManyPostInputEnvelope;
    set?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    disconnect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    delete?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    update?: Prisma.DiscussionUpdateWithWhereUniqueWithoutPostInput | Prisma.DiscussionUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.DiscussionUpdateManyWithWhereWithoutPostInput | Prisma.DiscussionUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.DiscussionScalarWhereInput | Prisma.DiscussionScalarWhereInput[];
};
export type DiscussionCreateNestedOneWithoutChildrenDiscussionInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutChildrenDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutChildrenDiscussionInput>;
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutChildrenDiscussionInput;
    connect?: Prisma.DiscussionWhereUniqueInput;
};
export type DiscussionCreateNestedOneWithoutReplyingDiscussionsInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutReplyingDiscussionsInput, Prisma.DiscussionUncheckedCreateWithoutReplyingDiscussionsInput>;
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutReplyingDiscussionsInput;
    connect?: Prisma.DiscussionWhereUniqueInput;
};
export type DiscussionCreateNestedManyWithoutParentDiscussionInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutParentDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutParentDiscussionInput> | Prisma.DiscussionCreateWithoutParentDiscussionInput[] | Prisma.DiscussionUncheckedCreateWithoutParentDiscussionInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutParentDiscussionInput | Prisma.DiscussionCreateOrConnectWithoutParentDiscussionInput[];
    createMany?: Prisma.DiscussionCreateManyParentDiscussionInputEnvelope;
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
};
export type DiscussionCreateNestedManyWithoutRepliedDiscussionInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutRepliedDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutRepliedDiscussionInput> | Prisma.DiscussionCreateWithoutRepliedDiscussionInput[] | Prisma.DiscussionUncheckedCreateWithoutRepliedDiscussionInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutRepliedDiscussionInput | Prisma.DiscussionCreateOrConnectWithoutRepliedDiscussionInput[];
    createMany?: Prisma.DiscussionCreateManyRepliedDiscussionInputEnvelope;
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
};
export type DiscussionUncheckedCreateNestedManyWithoutParentDiscussionInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutParentDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutParentDiscussionInput> | Prisma.DiscussionCreateWithoutParentDiscussionInput[] | Prisma.DiscussionUncheckedCreateWithoutParentDiscussionInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutParentDiscussionInput | Prisma.DiscussionCreateOrConnectWithoutParentDiscussionInput[];
    createMany?: Prisma.DiscussionCreateManyParentDiscussionInputEnvelope;
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
};
export type DiscussionUncheckedCreateNestedManyWithoutRepliedDiscussionInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutRepliedDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutRepliedDiscussionInput> | Prisma.DiscussionCreateWithoutRepliedDiscussionInput[] | Prisma.DiscussionUncheckedCreateWithoutRepliedDiscussionInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutRepliedDiscussionInput | Prisma.DiscussionCreateOrConnectWithoutRepliedDiscussionInput[];
    createMany?: Prisma.DiscussionCreateManyRepliedDiscussionInputEnvelope;
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
};
export type DiscussionUpdateOneWithoutChildrenDiscussionNestedInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutChildrenDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutChildrenDiscussionInput>;
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutChildrenDiscussionInput;
    upsert?: Prisma.DiscussionUpsertWithoutChildrenDiscussionInput;
    disconnect?: Prisma.DiscussionWhereInput | boolean;
    delete?: Prisma.DiscussionWhereInput | boolean;
    connect?: Prisma.DiscussionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DiscussionUpdateToOneWithWhereWithoutChildrenDiscussionInput, Prisma.DiscussionUpdateWithoutChildrenDiscussionInput>, Prisma.DiscussionUncheckedUpdateWithoutChildrenDiscussionInput>;
};
export type DiscussionUpdateOneWithoutReplyingDiscussionsNestedInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutReplyingDiscussionsInput, Prisma.DiscussionUncheckedCreateWithoutReplyingDiscussionsInput>;
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutReplyingDiscussionsInput;
    upsert?: Prisma.DiscussionUpsertWithoutReplyingDiscussionsInput;
    disconnect?: Prisma.DiscussionWhereInput | boolean;
    delete?: Prisma.DiscussionWhereInput | boolean;
    connect?: Prisma.DiscussionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DiscussionUpdateToOneWithWhereWithoutReplyingDiscussionsInput, Prisma.DiscussionUpdateWithoutReplyingDiscussionsInput>, Prisma.DiscussionUncheckedUpdateWithoutReplyingDiscussionsInput>;
};
export type DiscussionUpdateManyWithoutParentDiscussionNestedInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutParentDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutParentDiscussionInput> | Prisma.DiscussionCreateWithoutParentDiscussionInput[] | Prisma.DiscussionUncheckedCreateWithoutParentDiscussionInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutParentDiscussionInput | Prisma.DiscussionCreateOrConnectWithoutParentDiscussionInput[];
    upsert?: Prisma.DiscussionUpsertWithWhereUniqueWithoutParentDiscussionInput | Prisma.DiscussionUpsertWithWhereUniqueWithoutParentDiscussionInput[];
    createMany?: Prisma.DiscussionCreateManyParentDiscussionInputEnvelope;
    set?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    disconnect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    delete?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    update?: Prisma.DiscussionUpdateWithWhereUniqueWithoutParentDiscussionInput | Prisma.DiscussionUpdateWithWhereUniqueWithoutParentDiscussionInput[];
    updateMany?: Prisma.DiscussionUpdateManyWithWhereWithoutParentDiscussionInput | Prisma.DiscussionUpdateManyWithWhereWithoutParentDiscussionInput[];
    deleteMany?: Prisma.DiscussionScalarWhereInput | Prisma.DiscussionScalarWhereInput[];
};
export type DiscussionUpdateManyWithoutRepliedDiscussionNestedInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutRepliedDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutRepliedDiscussionInput> | Prisma.DiscussionCreateWithoutRepliedDiscussionInput[] | Prisma.DiscussionUncheckedCreateWithoutRepliedDiscussionInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutRepliedDiscussionInput | Prisma.DiscussionCreateOrConnectWithoutRepliedDiscussionInput[];
    upsert?: Prisma.DiscussionUpsertWithWhereUniqueWithoutRepliedDiscussionInput | Prisma.DiscussionUpsertWithWhereUniqueWithoutRepliedDiscussionInput[];
    createMany?: Prisma.DiscussionCreateManyRepliedDiscussionInputEnvelope;
    set?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    disconnect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    delete?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    update?: Prisma.DiscussionUpdateWithWhereUniqueWithoutRepliedDiscussionInput | Prisma.DiscussionUpdateWithWhereUniqueWithoutRepliedDiscussionInput[];
    updateMany?: Prisma.DiscussionUpdateManyWithWhereWithoutRepliedDiscussionInput | Prisma.DiscussionUpdateManyWithWhereWithoutRepliedDiscussionInput[];
    deleteMany?: Prisma.DiscussionScalarWhereInput | Prisma.DiscussionScalarWhereInput[];
};
export type DiscussionUncheckedUpdateManyWithoutParentDiscussionNestedInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutParentDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutParentDiscussionInput> | Prisma.DiscussionCreateWithoutParentDiscussionInput[] | Prisma.DiscussionUncheckedCreateWithoutParentDiscussionInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutParentDiscussionInput | Prisma.DiscussionCreateOrConnectWithoutParentDiscussionInput[];
    upsert?: Prisma.DiscussionUpsertWithWhereUniqueWithoutParentDiscussionInput | Prisma.DiscussionUpsertWithWhereUniqueWithoutParentDiscussionInput[];
    createMany?: Prisma.DiscussionCreateManyParentDiscussionInputEnvelope;
    set?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    disconnect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    delete?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    update?: Prisma.DiscussionUpdateWithWhereUniqueWithoutParentDiscussionInput | Prisma.DiscussionUpdateWithWhereUniqueWithoutParentDiscussionInput[];
    updateMany?: Prisma.DiscussionUpdateManyWithWhereWithoutParentDiscussionInput | Prisma.DiscussionUpdateManyWithWhereWithoutParentDiscussionInput[];
    deleteMany?: Prisma.DiscussionScalarWhereInput | Prisma.DiscussionScalarWhereInput[];
};
export type DiscussionUncheckedUpdateManyWithoutRepliedDiscussionNestedInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutRepliedDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutRepliedDiscussionInput> | Prisma.DiscussionCreateWithoutRepliedDiscussionInput[] | Prisma.DiscussionUncheckedCreateWithoutRepliedDiscussionInput[];
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutRepliedDiscussionInput | Prisma.DiscussionCreateOrConnectWithoutRepliedDiscussionInput[];
    upsert?: Prisma.DiscussionUpsertWithWhereUniqueWithoutRepliedDiscussionInput | Prisma.DiscussionUpsertWithWhereUniqueWithoutRepliedDiscussionInput[];
    createMany?: Prisma.DiscussionCreateManyRepliedDiscussionInputEnvelope;
    set?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    disconnect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    delete?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    connect?: Prisma.DiscussionWhereUniqueInput | Prisma.DiscussionWhereUniqueInput[];
    update?: Prisma.DiscussionUpdateWithWhereUniqueWithoutRepliedDiscussionInput | Prisma.DiscussionUpdateWithWhereUniqueWithoutRepliedDiscussionInput[];
    updateMany?: Prisma.DiscussionUpdateManyWithWhereWithoutRepliedDiscussionInput | Prisma.DiscussionUpdateManyWithWhereWithoutRepliedDiscussionInput[];
    deleteMany?: Prisma.DiscussionScalarWhereInput | Prisma.DiscussionScalarWhereInput[];
};
export type DiscussionCreateNestedOneWithoutRateDiscussionInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutRateDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutRateDiscussionInput>;
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutRateDiscussionInput;
    connect?: Prisma.DiscussionWhereUniqueInput;
};
export type DiscussionUpdateOneRequiredWithoutRateDiscussionNestedInput = {
    create?: Prisma.XOR<Prisma.DiscussionCreateWithoutRateDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutRateDiscussionInput>;
    connectOrCreate?: Prisma.DiscussionCreateOrConnectWithoutRateDiscussionInput;
    upsert?: Prisma.DiscussionUpsertWithoutRateDiscussionInput;
    connect?: Prisma.DiscussionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.DiscussionUpdateToOneWithWhereWithoutRateDiscussionInput, Prisma.DiscussionUpdateWithoutRateDiscussionInput>, Prisma.DiscussionUncheckedUpdateWithoutRateDiscussionInput>;
};
export type DiscussionCreateWithoutUserInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutDiscussionsInput;
    parentDiscussion?: Prisma.DiscussionCreateNestedOneWithoutChildrenDiscussionInput;
    repliedDiscussion?: Prisma.DiscussionCreateNestedOneWithoutReplyingDiscussionsInput;
    rateDiscussion?: Prisma.RateDiscussionCreateNestedManyWithoutDiscussionInput;
    childrenDiscussion?: Prisma.DiscussionCreateNestedManyWithoutParentDiscussionInput;
    replyingDiscussions?: Prisma.DiscussionCreateNestedManyWithoutRepliedDiscussionInput;
};
export type DiscussionUncheckedCreateWithoutUserInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    postId: string;
    parentId?: string | null;
    repliedId?: string | null;
    createdAt?: Date | string;
    rateDiscussion?: Prisma.RateDiscussionUncheckedCreateNestedManyWithoutDiscussionInput;
    childrenDiscussion?: Prisma.DiscussionUncheckedCreateNestedManyWithoutParentDiscussionInput;
    replyingDiscussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutRepliedDiscussionInput;
};
export type DiscussionCreateOrConnectWithoutUserInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiscussionCreateWithoutUserInput, Prisma.DiscussionUncheckedCreateWithoutUserInput>;
};
export type DiscussionCreateManyUserInputEnvelope = {
    data: Prisma.DiscussionCreateManyUserInput | Prisma.DiscussionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type DiscussionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    update: Prisma.XOR<Prisma.DiscussionUpdateWithoutUserInput, Prisma.DiscussionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.DiscussionCreateWithoutUserInput, Prisma.DiscussionUncheckedCreateWithoutUserInput>;
};
export type DiscussionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    data: Prisma.XOR<Prisma.DiscussionUpdateWithoutUserInput, Prisma.DiscussionUncheckedUpdateWithoutUserInput>;
};
export type DiscussionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.DiscussionScalarWhereInput;
    data: Prisma.XOR<Prisma.DiscussionUpdateManyMutationInput, Prisma.DiscussionUncheckedUpdateManyWithoutUserInput>;
};
export type DiscussionScalarWhereInput = {
    AND?: Prisma.DiscussionScalarWhereInput | Prisma.DiscussionScalarWhereInput[];
    OR?: Prisma.DiscussionScalarWhereInput[];
    NOT?: Prisma.DiscussionScalarWhereInput | Prisma.DiscussionScalarWhereInput[];
    id?: Prisma.StringFilter<"Discussion"> | string;
    discussion?: Prisma.JsonFilter<"Discussion">;
    ratingCount?: Prisma.IntFilter<"Discussion"> | number;
    ratingTotal?: Prisma.FloatFilter<"Discussion"> | number;
    rating?: Prisma.FloatFilter<"Discussion"> | number;
    postId?: Prisma.StringFilter<"Discussion"> | string;
    userId?: Prisma.StringFilter<"Discussion"> | string;
    parentId?: Prisma.StringNullableFilter<"Discussion"> | string | null;
    repliedId?: Prisma.StringNullableFilter<"Discussion"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Discussion"> | Date | string;
};
export type DiscussionCreateWithoutPostInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutDiscussionsInput;
    parentDiscussion?: Prisma.DiscussionCreateNestedOneWithoutChildrenDiscussionInput;
    repliedDiscussion?: Prisma.DiscussionCreateNestedOneWithoutReplyingDiscussionsInput;
    rateDiscussion?: Prisma.RateDiscussionCreateNestedManyWithoutDiscussionInput;
    childrenDiscussion?: Prisma.DiscussionCreateNestedManyWithoutParentDiscussionInput;
    replyingDiscussions?: Prisma.DiscussionCreateNestedManyWithoutRepliedDiscussionInput;
};
export type DiscussionUncheckedCreateWithoutPostInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    userId: string;
    parentId?: string | null;
    repliedId?: string | null;
    createdAt?: Date | string;
    rateDiscussion?: Prisma.RateDiscussionUncheckedCreateNestedManyWithoutDiscussionInput;
    childrenDiscussion?: Prisma.DiscussionUncheckedCreateNestedManyWithoutParentDiscussionInput;
    replyingDiscussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutRepliedDiscussionInput;
};
export type DiscussionCreateOrConnectWithoutPostInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiscussionCreateWithoutPostInput, Prisma.DiscussionUncheckedCreateWithoutPostInput>;
};
export type DiscussionCreateManyPostInputEnvelope = {
    data: Prisma.DiscussionCreateManyPostInput | Prisma.DiscussionCreateManyPostInput[];
    skipDuplicates?: boolean;
};
export type DiscussionUpsertWithWhereUniqueWithoutPostInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    update: Prisma.XOR<Prisma.DiscussionUpdateWithoutPostInput, Prisma.DiscussionUncheckedUpdateWithoutPostInput>;
    create: Prisma.XOR<Prisma.DiscussionCreateWithoutPostInput, Prisma.DiscussionUncheckedCreateWithoutPostInput>;
};
export type DiscussionUpdateWithWhereUniqueWithoutPostInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    data: Prisma.XOR<Prisma.DiscussionUpdateWithoutPostInput, Prisma.DiscussionUncheckedUpdateWithoutPostInput>;
};
export type DiscussionUpdateManyWithWhereWithoutPostInput = {
    where: Prisma.DiscussionScalarWhereInput;
    data: Prisma.XOR<Prisma.DiscussionUpdateManyMutationInput, Prisma.DiscussionUncheckedUpdateManyWithoutPostInput>;
};
export type DiscussionCreateWithoutChildrenDiscussionInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutDiscussionsInput;
    user: Prisma.UsersCreateNestedOneWithoutDiscussionsInput;
    parentDiscussion?: Prisma.DiscussionCreateNestedOneWithoutChildrenDiscussionInput;
    repliedDiscussion?: Prisma.DiscussionCreateNestedOneWithoutReplyingDiscussionsInput;
    rateDiscussion?: Prisma.RateDiscussionCreateNestedManyWithoutDiscussionInput;
    replyingDiscussions?: Prisma.DiscussionCreateNestedManyWithoutRepliedDiscussionInput;
};
export type DiscussionUncheckedCreateWithoutChildrenDiscussionInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    postId: string;
    userId: string;
    parentId?: string | null;
    repliedId?: string | null;
    createdAt?: Date | string;
    rateDiscussion?: Prisma.RateDiscussionUncheckedCreateNestedManyWithoutDiscussionInput;
    replyingDiscussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutRepliedDiscussionInput;
};
export type DiscussionCreateOrConnectWithoutChildrenDiscussionInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiscussionCreateWithoutChildrenDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutChildrenDiscussionInput>;
};
export type DiscussionCreateWithoutReplyingDiscussionsInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutDiscussionsInput;
    user: Prisma.UsersCreateNestedOneWithoutDiscussionsInput;
    parentDiscussion?: Prisma.DiscussionCreateNestedOneWithoutChildrenDiscussionInput;
    repliedDiscussion?: Prisma.DiscussionCreateNestedOneWithoutReplyingDiscussionsInput;
    rateDiscussion?: Prisma.RateDiscussionCreateNestedManyWithoutDiscussionInput;
    childrenDiscussion?: Prisma.DiscussionCreateNestedManyWithoutParentDiscussionInput;
};
export type DiscussionUncheckedCreateWithoutReplyingDiscussionsInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    postId: string;
    userId: string;
    parentId?: string | null;
    repliedId?: string | null;
    createdAt?: Date | string;
    rateDiscussion?: Prisma.RateDiscussionUncheckedCreateNestedManyWithoutDiscussionInput;
    childrenDiscussion?: Prisma.DiscussionUncheckedCreateNestedManyWithoutParentDiscussionInput;
};
export type DiscussionCreateOrConnectWithoutReplyingDiscussionsInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiscussionCreateWithoutReplyingDiscussionsInput, Prisma.DiscussionUncheckedCreateWithoutReplyingDiscussionsInput>;
};
export type DiscussionCreateWithoutParentDiscussionInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutDiscussionsInput;
    user: Prisma.UsersCreateNestedOneWithoutDiscussionsInput;
    repliedDiscussion?: Prisma.DiscussionCreateNestedOneWithoutReplyingDiscussionsInput;
    rateDiscussion?: Prisma.RateDiscussionCreateNestedManyWithoutDiscussionInput;
    childrenDiscussion?: Prisma.DiscussionCreateNestedManyWithoutParentDiscussionInput;
    replyingDiscussions?: Prisma.DiscussionCreateNestedManyWithoutRepliedDiscussionInput;
};
export type DiscussionUncheckedCreateWithoutParentDiscussionInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    postId: string;
    userId: string;
    repliedId?: string | null;
    createdAt?: Date | string;
    rateDiscussion?: Prisma.RateDiscussionUncheckedCreateNestedManyWithoutDiscussionInput;
    childrenDiscussion?: Prisma.DiscussionUncheckedCreateNestedManyWithoutParentDiscussionInput;
    replyingDiscussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutRepliedDiscussionInput;
};
export type DiscussionCreateOrConnectWithoutParentDiscussionInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiscussionCreateWithoutParentDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutParentDiscussionInput>;
};
export type DiscussionCreateManyParentDiscussionInputEnvelope = {
    data: Prisma.DiscussionCreateManyParentDiscussionInput | Prisma.DiscussionCreateManyParentDiscussionInput[];
    skipDuplicates?: boolean;
};
export type DiscussionCreateWithoutRepliedDiscussionInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutDiscussionsInput;
    user: Prisma.UsersCreateNestedOneWithoutDiscussionsInput;
    parentDiscussion?: Prisma.DiscussionCreateNestedOneWithoutChildrenDiscussionInput;
    rateDiscussion?: Prisma.RateDiscussionCreateNestedManyWithoutDiscussionInput;
    childrenDiscussion?: Prisma.DiscussionCreateNestedManyWithoutParentDiscussionInput;
    replyingDiscussions?: Prisma.DiscussionCreateNestedManyWithoutRepliedDiscussionInput;
};
export type DiscussionUncheckedCreateWithoutRepliedDiscussionInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    postId: string;
    userId: string;
    parentId?: string | null;
    createdAt?: Date | string;
    rateDiscussion?: Prisma.RateDiscussionUncheckedCreateNestedManyWithoutDiscussionInput;
    childrenDiscussion?: Prisma.DiscussionUncheckedCreateNestedManyWithoutParentDiscussionInput;
    replyingDiscussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutRepliedDiscussionInput;
};
export type DiscussionCreateOrConnectWithoutRepliedDiscussionInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiscussionCreateWithoutRepliedDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutRepliedDiscussionInput>;
};
export type DiscussionCreateManyRepliedDiscussionInputEnvelope = {
    data: Prisma.DiscussionCreateManyRepliedDiscussionInput | Prisma.DiscussionCreateManyRepliedDiscussionInput[];
    skipDuplicates?: boolean;
};
export type DiscussionUpsertWithoutChildrenDiscussionInput = {
    update: Prisma.XOR<Prisma.DiscussionUpdateWithoutChildrenDiscussionInput, Prisma.DiscussionUncheckedUpdateWithoutChildrenDiscussionInput>;
    create: Prisma.XOR<Prisma.DiscussionCreateWithoutChildrenDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutChildrenDiscussionInput>;
    where?: Prisma.DiscussionWhereInput;
};
export type DiscussionUpdateToOneWithWhereWithoutChildrenDiscussionInput = {
    where?: Prisma.DiscussionWhereInput;
    data: Prisma.XOR<Prisma.DiscussionUpdateWithoutChildrenDiscussionInput, Prisma.DiscussionUncheckedUpdateWithoutChildrenDiscussionInput>;
};
export type DiscussionUpdateWithoutChildrenDiscussionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutDiscussionsNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutDiscussionsNestedInput;
    parentDiscussion?: Prisma.DiscussionUpdateOneWithoutChildrenDiscussionNestedInput;
    repliedDiscussion?: Prisma.DiscussionUpdateOneWithoutReplyingDiscussionsNestedInput;
    rateDiscussion?: Prisma.RateDiscussionUpdateManyWithoutDiscussionNestedInput;
    replyingDiscussions?: Prisma.DiscussionUpdateManyWithoutRepliedDiscussionNestedInput;
};
export type DiscussionUncheckedUpdateWithoutChildrenDiscussionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repliedId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateDiscussion?: Prisma.RateDiscussionUncheckedUpdateManyWithoutDiscussionNestedInput;
    replyingDiscussions?: Prisma.DiscussionUncheckedUpdateManyWithoutRepliedDiscussionNestedInput;
};
export type DiscussionUpsertWithoutReplyingDiscussionsInput = {
    update: Prisma.XOR<Prisma.DiscussionUpdateWithoutReplyingDiscussionsInput, Prisma.DiscussionUncheckedUpdateWithoutReplyingDiscussionsInput>;
    create: Prisma.XOR<Prisma.DiscussionCreateWithoutReplyingDiscussionsInput, Prisma.DiscussionUncheckedCreateWithoutReplyingDiscussionsInput>;
    where?: Prisma.DiscussionWhereInput;
};
export type DiscussionUpdateToOneWithWhereWithoutReplyingDiscussionsInput = {
    where?: Prisma.DiscussionWhereInput;
    data: Prisma.XOR<Prisma.DiscussionUpdateWithoutReplyingDiscussionsInput, Prisma.DiscussionUncheckedUpdateWithoutReplyingDiscussionsInput>;
};
export type DiscussionUpdateWithoutReplyingDiscussionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutDiscussionsNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutDiscussionsNestedInput;
    parentDiscussion?: Prisma.DiscussionUpdateOneWithoutChildrenDiscussionNestedInput;
    repliedDiscussion?: Prisma.DiscussionUpdateOneWithoutReplyingDiscussionsNestedInput;
    rateDiscussion?: Prisma.RateDiscussionUpdateManyWithoutDiscussionNestedInput;
    childrenDiscussion?: Prisma.DiscussionUpdateManyWithoutParentDiscussionNestedInput;
};
export type DiscussionUncheckedUpdateWithoutReplyingDiscussionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repliedId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateDiscussion?: Prisma.RateDiscussionUncheckedUpdateManyWithoutDiscussionNestedInput;
    childrenDiscussion?: Prisma.DiscussionUncheckedUpdateManyWithoutParentDiscussionNestedInput;
};
export type DiscussionUpsertWithWhereUniqueWithoutParentDiscussionInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    update: Prisma.XOR<Prisma.DiscussionUpdateWithoutParentDiscussionInput, Prisma.DiscussionUncheckedUpdateWithoutParentDiscussionInput>;
    create: Prisma.XOR<Prisma.DiscussionCreateWithoutParentDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutParentDiscussionInput>;
};
export type DiscussionUpdateWithWhereUniqueWithoutParentDiscussionInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    data: Prisma.XOR<Prisma.DiscussionUpdateWithoutParentDiscussionInput, Prisma.DiscussionUncheckedUpdateWithoutParentDiscussionInput>;
};
export type DiscussionUpdateManyWithWhereWithoutParentDiscussionInput = {
    where: Prisma.DiscussionScalarWhereInput;
    data: Prisma.XOR<Prisma.DiscussionUpdateManyMutationInput, Prisma.DiscussionUncheckedUpdateManyWithoutParentDiscussionInput>;
};
export type DiscussionUpsertWithWhereUniqueWithoutRepliedDiscussionInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    update: Prisma.XOR<Prisma.DiscussionUpdateWithoutRepliedDiscussionInput, Prisma.DiscussionUncheckedUpdateWithoutRepliedDiscussionInput>;
    create: Prisma.XOR<Prisma.DiscussionCreateWithoutRepliedDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutRepliedDiscussionInput>;
};
export type DiscussionUpdateWithWhereUniqueWithoutRepliedDiscussionInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    data: Prisma.XOR<Prisma.DiscussionUpdateWithoutRepliedDiscussionInput, Prisma.DiscussionUncheckedUpdateWithoutRepliedDiscussionInput>;
};
export type DiscussionUpdateManyWithWhereWithoutRepliedDiscussionInput = {
    where: Prisma.DiscussionScalarWhereInput;
    data: Prisma.XOR<Prisma.DiscussionUpdateManyMutationInput, Prisma.DiscussionUncheckedUpdateManyWithoutRepliedDiscussionInput>;
};
export type DiscussionCreateWithoutRateDiscussionInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutDiscussionsInput;
    user: Prisma.UsersCreateNestedOneWithoutDiscussionsInput;
    parentDiscussion?: Prisma.DiscussionCreateNestedOneWithoutChildrenDiscussionInput;
    repliedDiscussion?: Prisma.DiscussionCreateNestedOneWithoutReplyingDiscussionsInput;
    childrenDiscussion?: Prisma.DiscussionCreateNestedManyWithoutParentDiscussionInput;
    replyingDiscussions?: Prisma.DiscussionCreateNestedManyWithoutRepliedDiscussionInput;
};
export type DiscussionUncheckedCreateWithoutRateDiscussionInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    postId: string;
    userId: string;
    parentId?: string | null;
    repliedId?: string | null;
    createdAt?: Date | string;
    childrenDiscussion?: Prisma.DiscussionUncheckedCreateNestedManyWithoutParentDiscussionInput;
    replyingDiscussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutRepliedDiscussionInput;
};
export type DiscussionCreateOrConnectWithoutRateDiscussionInput = {
    where: Prisma.DiscussionWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiscussionCreateWithoutRateDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutRateDiscussionInput>;
};
export type DiscussionUpsertWithoutRateDiscussionInput = {
    update: Prisma.XOR<Prisma.DiscussionUpdateWithoutRateDiscussionInput, Prisma.DiscussionUncheckedUpdateWithoutRateDiscussionInput>;
    create: Prisma.XOR<Prisma.DiscussionCreateWithoutRateDiscussionInput, Prisma.DiscussionUncheckedCreateWithoutRateDiscussionInput>;
    where?: Prisma.DiscussionWhereInput;
};
export type DiscussionUpdateToOneWithWhereWithoutRateDiscussionInput = {
    where?: Prisma.DiscussionWhereInput;
    data: Prisma.XOR<Prisma.DiscussionUpdateWithoutRateDiscussionInput, Prisma.DiscussionUncheckedUpdateWithoutRateDiscussionInput>;
};
export type DiscussionUpdateWithoutRateDiscussionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutDiscussionsNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutDiscussionsNestedInput;
    parentDiscussion?: Prisma.DiscussionUpdateOneWithoutChildrenDiscussionNestedInput;
    repliedDiscussion?: Prisma.DiscussionUpdateOneWithoutReplyingDiscussionsNestedInput;
    childrenDiscussion?: Prisma.DiscussionUpdateManyWithoutParentDiscussionNestedInput;
    replyingDiscussions?: Prisma.DiscussionUpdateManyWithoutRepliedDiscussionNestedInput;
};
export type DiscussionUncheckedUpdateWithoutRateDiscussionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repliedId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    childrenDiscussion?: Prisma.DiscussionUncheckedUpdateManyWithoutParentDiscussionNestedInput;
    replyingDiscussions?: Prisma.DiscussionUncheckedUpdateManyWithoutRepliedDiscussionNestedInput;
};
export type DiscussionCreateManyUserInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    postId: string;
    parentId?: string | null;
    repliedId?: string | null;
    createdAt?: Date | string;
};
export type DiscussionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutDiscussionsNestedInput;
    parentDiscussion?: Prisma.DiscussionUpdateOneWithoutChildrenDiscussionNestedInput;
    repliedDiscussion?: Prisma.DiscussionUpdateOneWithoutReplyingDiscussionsNestedInput;
    rateDiscussion?: Prisma.RateDiscussionUpdateManyWithoutDiscussionNestedInput;
    childrenDiscussion?: Prisma.DiscussionUpdateManyWithoutParentDiscussionNestedInput;
    replyingDiscussions?: Prisma.DiscussionUpdateManyWithoutRepliedDiscussionNestedInput;
};
export type DiscussionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repliedId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateDiscussion?: Prisma.RateDiscussionUncheckedUpdateManyWithoutDiscussionNestedInput;
    childrenDiscussion?: Prisma.DiscussionUncheckedUpdateManyWithoutParentDiscussionNestedInput;
    replyingDiscussions?: Prisma.DiscussionUncheckedUpdateManyWithoutRepliedDiscussionNestedInput;
};
export type DiscussionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repliedId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscussionCreateManyPostInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    userId: string;
    parentId?: string | null;
    repliedId?: string | null;
    createdAt?: Date | string;
};
export type DiscussionUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutDiscussionsNestedInput;
    parentDiscussion?: Prisma.DiscussionUpdateOneWithoutChildrenDiscussionNestedInput;
    repliedDiscussion?: Prisma.DiscussionUpdateOneWithoutReplyingDiscussionsNestedInput;
    rateDiscussion?: Prisma.RateDiscussionUpdateManyWithoutDiscussionNestedInput;
    childrenDiscussion?: Prisma.DiscussionUpdateManyWithoutParentDiscussionNestedInput;
    replyingDiscussions?: Prisma.DiscussionUpdateManyWithoutRepliedDiscussionNestedInput;
};
export type DiscussionUncheckedUpdateWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repliedId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateDiscussion?: Prisma.RateDiscussionUncheckedUpdateManyWithoutDiscussionNestedInput;
    childrenDiscussion?: Prisma.DiscussionUncheckedUpdateManyWithoutParentDiscussionNestedInput;
    replyingDiscussions?: Prisma.DiscussionUncheckedUpdateManyWithoutRepliedDiscussionNestedInput;
};
export type DiscussionUncheckedUpdateManyWithoutPostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    repliedId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscussionCreateManyParentDiscussionInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    postId: string;
    userId: string;
    repliedId?: string | null;
    createdAt?: Date | string;
};
export type DiscussionCreateManyRepliedDiscussionInput = {
    id?: string;
    discussion: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    postId: string;
    userId: string;
    parentId?: string | null;
    createdAt?: Date | string;
};
export type DiscussionUpdateWithoutParentDiscussionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutDiscussionsNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutDiscussionsNestedInput;
    repliedDiscussion?: Prisma.DiscussionUpdateOneWithoutReplyingDiscussionsNestedInput;
    rateDiscussion?: Prisma.RateDiscussionUpdateManyWithoutDiscussionNestedInput;
    childrenDiscussion?: Prisma.DiscussionUpdateManyWithoutParentDiscussionNestedInput;
    replyingDiscussions?: Prisma.DiscussionUpdateManyWithoutRepliedDiscussionNestedInput;
};
export type DiscussionUncheckedUpdateWithoutParentDiscussionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    repliedId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateDiscussion?: Prisma.RateDiscussionUncheckedUpdateManyWithoutDiscussionNestedInput;
    childrenDiscussion?: Prisma.DiscussionUncheckedUpdateManyWithoutParentDiscussionNestedInput;
    replyingDiscussions?: Prisma.DiscussionUncheckedUpdateManyWithoutRepliedDiscussionNestedInput;
};
export type DiscussionUncheckedUpdateManyWithoutParentDiscussionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    repliedId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscussionUpdateWithoutRepliedDiscussionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutDiscussionsNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutDiscussionsNestedInput;
    parentDiscussion?: Prisma.DiscussionUpdateOneWithoutChildrenDiscussionNestedInput;
    rateDiscussion?: Prisma.RateDiscussionUpdateManyWithoutDiscussionNestedInput;
    childrenDiscussion?: Prisma.DiscussionUpdateManyWithoutParentDiscussionNestedInput;
    replyingDiscussions?: Prisma.DiscussionUpdateManyWithoutRepliedDiscussionNestedInput;
};
export type DiscussionUncheckedUpdateWithoutRepliedDiscussionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    rateDiscussion?: Prisma.RateDiscussionUncheckedUpdateManyWithoutDiscussionNestedInput;
    childrenDiscussion?: Prisma.DiscussionUncheckedUpdateManyWithoutParentDiscussionNestedInput;
    replyingDiscussions?: Prisma.DiscussionUncheckedUpdateManyWithoutRepliedDiscussionNestedInput;
};
export type DiscussionUncheckedUpdateManyWithoutRepliedDiscussionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussion?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type DiscussionCountOutputType = {
    rateDiscussion: number;
    childrenDiscussion: number;
    replyingDiscussions: number;
};
export type DiscussionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    rateDiscussion?: boolean | DiscussionCountOutputTypeCountRateDiscussionArgs;
    childrenDiscussion?: boolean | DiscussionCountOutputTypeCountChildrenDiscussionArgs;
    replyingDiscussions?: boolean | DiscussionCountOutputTypeCountReplyingDiscussionsArgs;
};
export type DiscussionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionCountOutputTypeSelect<ExtArgs> | null;
};
export type DiscussionCountOutputTypeCountRateDiscussionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RateDiscussionWhereInput;
};
export type DiscussionCountOutputTypeCountChildrenDiscussionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiscussionWhereInput;
};
export type DiscussionCountOutputTypeCountReplyingDiscussionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiscussionWhereInput;
};
export type DiscussionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    discussion?: boolean;
    ratingCount?: boolean;
    ratingTotal?: boolean;
    rating?: boolean;
    postId?: boolean;
    userId?: boolean;
    parentId?: boolean;
    repliedId?: boolean;
    createdAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    parentDiscussion?: boolean | Prisma.Discussion$parentDiscussionArgs<ExtArgs>;
    repliedDiscussion?: boolean | Prisma.Discussion$repliedDiscussionArgs<ExtArgs>;
    rateDiscussion?: boolean | Prisma.Discussion$rateDiscussionArgs<ExtArgs>;
    childrenDiscussion?: boolean | Prisma.Discussion$childrenDiscussionArgs<ExtArgs>;
    replyingDiscussions?: boolean | Prisma.Discussion$replyingDiscussionsArgs<ExtArgs>;
    _count?: boolean | Prisma.DiscussionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["discussion"]>;
export type DiscussionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    discussion?: boolean;
    ratingCount?: boolean;
    ratingTotal?: boolean;
    rating?: boolean;
    postId?: boolean;
    userId?: boolean;
    parentId?: boolean;
    repliedId?: boolean;
    createdAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    parentDiscussion?: boolean | Prisma.Discussion$parentDiscussionArgs<ExtArgs>;
    repliedDiscussion?: boolean | Prisma.Discussion$repliedDiscussionArgs<ExtArgs>;
}, ExtArgs["result"]["discussion"]>;
export type DiscussionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    discussion?: boolean;
    ratingCount?: boolean;
    ratingTotal?: boolean;
    rating?: boolean;
    postId?: boolean;
    userId?: boolean;
    parentId?: boolean;
    repliedId?: boolean;
    createdAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    parentDiscussion?: boolean | Prisma.Discussion$parentDiscussionArgs<ExtArgs>;
    repliedDiscussion?: boolean | Prisma.Discussion$repliedDiscussionArgs<ExtArgs>;
}, ExtArgs["result"]["discussion"]>;
export type DiscussionSelectScalar = {
    id?: boolean;
    discussion?: boolean;
    ratingCount?: boolean;
    ratingTotal?: boolean;
    rating?: boolean;
    postId?: boolean;
    userId?: boolean;
    parentId?: boolean;
    repliedId?: boolean;
    createdAt?: boolean;
};
export type DiscussionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "discussion" | "ratingCount" | "ratingTotal" | "rating" | "postId" | "userId" | "parentId" | "repliedId" | "createdAt", ExtArgs["result"]["discussion"]>;
export type DiscussionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    parentDiscussion?: boolean | Prisma.Discussion$parentDiscussionArgs<ExtArgs>;
    repliedDiscussion?: boolean | Prisma.Discussion$repliedDiscussionArgs<ExtArgs>;
    rateDiscussion?: boolean | Prisma.Discussion$rateDiscussionArgs<ExtArgs>;
    childrenDiscussion?: boolean | Prisma.Discussion$childrenDiscussionArgs<ExtArgs>;
    replyingDiscussions?: boolean | Prisma.Discussion$replyingDiscussionsArgs<ExtArgs>;
    _count?: boolean | Prisma.DiscussionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type DiscussionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    parentDiscussion?: boolean | Prisma.Discussion$parentDiscussionArgs<ExtArgs>;
    repliedDiscussion?: boolean | Prisma.Discussion$repliedDiscussionArgs<ExtArgs>;
};
export type DiscussionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    parentDiscussion?: boolean | Prisma.Discussion$parentDiscussionArgs<ExtArgs>;
    repliedDiscussion?: boolean | Prisma.Discussion$repliedDiscussionArgs<ExtArgs>;
};
export type $DiscussionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Discussion";
    objects: {
        post: Prisma.$PostPayload<ExtArgs>;
        user: Prisma.$UsersPayload<ExtArgs>;
        parentDiscussion: Prisma.$DiscussionPayload<ExtArgs> | null;
        repliedDiscussion: Prisma.$DiscussionPayload<ExtArgs> | null;
        rateDiscussion: Prisma.$RateDiscussionPayload<ExtArgs>[];
        childrenDiscussion: Prisma.$DiscussionPayload<ExtArgs>[];
        replyingDiscussions: Prisma.$DiscussionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        discussion: runtime.JsonValue;
        ratingCount: number;
        ratingTotal: number;
        rating: number;
        postId: string;
        userId: string;
        parentId: string | null;
        repliedId: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["discussion"]>;
    composites: {};
};
export type DiscussionGetPayload<S extends boolean | null | undefined | DiscussionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$DiscussionPayload, S>;
export type DiscussionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<DiscussionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DiscussionCountAggregateInputType | true;
};
export interface DiscussionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Discussion'];
        meta: {
            name: 'Discussion';
        };
    };
    findUnique<T extends DiscussionFindUniqueArgs>(args: Prisma.SelectSubset<T, DiscussionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__DiscussionClient<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends DiscussionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, DiscussionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiscussionClient<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends DiscussionFindFirstArgs>(args?: Prisma.SelectSubset<T, DiscussionFindFirstArgs<ExtArgs>>): Prisma.Prisma__DiscussionClient<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends DiscussionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, DiscussionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__DiscussionClient<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends DiscussionFindManyArgs>(args?: Prisma.SelectSubset<T, DiscussionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends DiscussionCreateArgs>(args: Prisma.SelectSubset<T, DiscussionCreateArgs<ExtArgs>>): Prisma.Prisma__DiscussionClient<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends DiscussionCreateManyArgs>(args?: Prisma.SelectSubset<T, DiscussionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends DiscussionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, DiscussionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends DiscussionDeleteArgs>(args: Prisma.SelectSubset<T, DiscussionDeleteArgs<ExtArgs>>): Prisma.Prisma__DiscussionClient<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends DiscussionUpdateArgs>(args: Prisma.SelectSubset<T, DiscussionUpdateArgs<ExtArgs>>): Prisma.Prisma__DiscussionClient<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends DiscussionDeleteManyArgs>(args?: Prisma.SelectSubset<T, DiscussionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends DiscussionUpdateManyArgs>(args: Prisma.SelectSubset<T, DiscussionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends DiscussionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, DiscussionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends DiscussionUpsertArgs>(args: Prisma.SelectSubset<T, DiscussionUpsertArgs<ExtArgs>>): Prisma.Prisma__DiscussionClient<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends DiscussionCountArgs>(args?: Prisma.Subset<T, DiscussionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DiscussionCountAggregateOutputType> : number>;
    aggregate<T extends DiscussionAggregateArgs>(args: Prisma.Subset<T, DiscussionAggregateArgs>): Prisma.PrismaPromise<GetDiscussionAggregateType<T>>;
    groupBy<T extends DiscussionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: DiscussionGroupByArgs['orderBy'];
    } : {
        orderBy?: DiscussionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, DiscussionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiscussionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: DiscussionFieldRefs;
}
export interface Prisma__DiscussionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    post<T extends Prisma.PostDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PostDefaultArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    parentDiscussion<T extends Prisma.Discussion$parentDiscussionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Discussion$parentDiscussionArgs<ExtArgs>>): Prisma.Prisma__DiscussionClient<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    repliedDiscussion<T extends Prisma.Discussion$repliedDiscussionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Discussion$repliedDiscussionArgs<ExtArgs>>): Prisma.Prisma__DiscussionClient<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    rateDiscussion<T extends Prisma.Discussion$rateDiscussionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Discussion$rateDiscussionArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RateDiscussionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    childrenDiscussion<T extends Prisma.Discussion$childrenDiscussionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Discussion$childrenDiscussionArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    replyingDiscussions<T extends Prisma.Discussion$replyingDiscussionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Discussion$replyingDiscussionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface DiscussionFieldRefs {
    readonly id: Prisma.FieldRef<"Discussion", 'String'>;
    readonly discussion: Prisma.FieldRef<"Discussion", 'Json'>;
    readonly ratingCount: Prisma.FieldRef<"Discussion", 'Int'>;
    readonly ratingTotal: Prisma.FieldRef<"Discussion", 'Float'>;
    readonly rating: Prisma.FieldRef<"Discussion", 'Float'>;
    readonly postId: Prisma.FieldRef<"Discussion", 'String'>;
    readonly userId: Prisma.FieldRef<"Discussion", 'String'>;
    readonly parentId: Prisma.FieldRef<"Discussion", 'String'>;
    readonly repliedId: Prisma.FieldRef<"Discussion", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Discussion", 'DateTime'>;
}
export type DiscussionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    where: Prisma.DiscussionWhereUniqueInput;
};
export type DiscussionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    where: Prisma.DiscussionWhereUniqueInput;
};
export type DiscussionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    where?: Prisma.DiscussionWhereInput;
    orderBy?: Prisma.DiscussionOrderByWithRelationInput | Prisma.DiscussionOrderByWithRelationInput[];
    cursor?: Prisma.DiscussionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiscussionScalarFieldEnum | Prisma.DiscussionScalarFieldEnum[];
};
export type DiscussionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    where?: Prisma.DiscussionWhereInput;
    orderBy?: Prisma.DiscussionOrderByWithRelationInput | Prisma.DiscussionOrderByWithRelationInput[];
    cursor?: Prisma.DiscussionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiscussionScalarFieldEnum | Prisma.DiscussionScalarFieldEnum[];
};
export type DiscussionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    where?: Prisma.DiscussionWhereInput;
    orderBy?: Prisma.DiscussionOrderByWithRelationInput | Prisma.DiscussionOrderByWithRelationInput[];
    cursor?: Prisma.DiscussionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiscussionScalarFieldEnum | Prisma.DiscussionScalarFieldEnum[];
};
export type DiscussionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiscussionCreateInput, Prisma.DiscussionUncheckedCreateInput>;
};
export type DiscussionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.DiscussionCreateManyInput | Prisma.DiscussionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type DiscussionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    data: Prisma.DiscussionCreateManyInput | Prisma.DiscussionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.DiscussionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type DiscussionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiscussionUpdateInput, Prisma.DiscussionUncheckedUpdateInput>;
    where: Prisma.DiscussionWhereUniqueInput;
};
export type DiscussionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.DiscussionUpdateManyMutationInput, Prisma.DiscussionUncheckedUpdateManyInput>;
    where?: Prisma.DiscussionWhereInput;
    limit?: number;
};
export type DiscussionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.DiscussionUpdateManyMutationInput, Prisma.DiscussionUncheckedUpdateManyInput>;
    where?: Prisma.DiscussionWhereInput;
    limit?: number;
    include?: Prisma.DiscussionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type DiscussionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    where: Prisma.DiscussionWhereUniqueInput;
    create: Prisma.XOR<Prisma.DiscussionCreateInput, Prisma.DiscussionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.DiscussionUpdateInput, Prisma.DiscussionUncheckedUpdateInput>;
};
export type DiscussionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    where: Prisma.DiscussionWhereUniqueInput;
};
export type DiscussionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiscussionWhereInput;
    limit?: number;
};
export type Discussion$parentDiscussionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    where?: Prisma.DiscussionWhereInput;
};
export type Discussion$repliedDiscussionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    where?: Prisma.DiscussionWhereInput;
};
export type Discussion$rateDiscussionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateDiscussionSelect<ExtArgs> | null;
    omit?: Prisma.RateDiscussionOmit<ExtArgs> | null;
    include?: Prisma.RateDiscussionInclude<ExtArgs> | null;
    where?: Prisma.RateDiscussionWhereInput;
    orderBy?: Prisma.RateDiscussionOrderByWithRelationInput | Prisma.RateDiscussionOrderByWithRelationInput[];
    cursor?: Prisma.RateDiscussionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RateDiscussionScalarFieldEnum | Prisma.RateDiscussionScalarFieldEnum[];
};
export type Discussion$childrenDiscussionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    where?: Prisma.DiscussionWhereInput;
    orderBy?: Prisma.DiscussionOrderByWithRelationInput | Prisma.DiscussionOrderByWithRelationInput[];
    cursor?: Prisma.DiscussionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiscussionScalarFieldEnum | Prisma.DiscussionScalarFieldEnum[];
};
export type Discussion$replyingDiscussionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    where?: Prisma.DiscussionWhereInput;
    orderBy?: Prisma.DiscussionOrderByWithRelationInput | Prisma.DiscussionOrderByWithRelationInput[];
    cursor?: Prisma.DiscussionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiscussionScalarFieldEnum | Prisma.DiscussionScalarFieldEnum[];
};
export type DiscussionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
};
