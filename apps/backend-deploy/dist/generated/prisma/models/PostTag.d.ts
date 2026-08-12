import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PostTagModel = runtime.Types.Result.DefaultSelection<Prisma.$PostTagPayload>;
export type AggregatePostTag = {
    _count: PostTagCountAggregateOutputType | null;
    _avg: PostTagAvgAggregateOutputType | null;
    _sum: PostTagSumAggregateOutputType | null;
    _min: PostTagMinAggregateOutputType | null;
    _max: PostTagMaxAggregateOutputType | null;
};
export type PostTagAvgAggregateOutputType = {
    score: number | null;
};
export type PostTagSumAggregateOutputType = {
    score: number | null;
};
export type PostTagMinAggregateOutputType = {
    postId: string | null;
    tagId: string | null;
    isSuggested: boolean | null;
    score: number | null;
    createdAt: Date | null;
};
export type PostTagMaxAggregateOutputType = {
    postId: string | null;
    tagId: string | null;
    isSuggested: boolean | null;
    score: number | null;
    createdAt: Date | null;
};
export type PostTagCountAggregateOutputType = {
    postId: number;
    tagId: number;
    isSuggested: number;
    score: number;
    createdAt: number;
    _all: number;
};
export type PostTagAvgAggregateInputType = {
    score?: true;
};
export type PostTagSumAggregateInputType = {
    score?: true;
};
export type PostTagMinAggregateInputType = {
    postId?: true;
    tagId?: true;
    isSuggested?: true;
    score?: true;
    createdAt?: true;
};
export type PostTagMaxAggregateInputType = {
    postId?: true;
    tagId?: true;
    isSuggested?: true;
    score?: true;
    createdAt?: true;
};
export type PostTagCountAggregateInputType = {
    postId?: true;
    tagId?: true;
    isSuggested?: true;
    score?: true;
    createdAt?: true;
    _all?: true;
};
export type PostTagAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostTagWhereInput;
    orderBy?: Prisma.PostTagOrderByWithRelationInput | Prisma.PostTagOrderByWithRelationInput[];
    cursor?: Prisma.PostTagWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PostTagCountAggregateInputType;
    _avg?: PostTagAvgAggregateInputType;
    _sum?: PostTagSumAggregateInputType;
    _min?: PostTagMinAggregateInputType;
    _max?: PostTagMaxAggregateInputType;
};
export type GetPostTagAggregateType<T extends PostTagAggregateArgs> = {
    [P in keyof T & keyof AggregatePostTag]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePostTag[P]> : Prisma.GetScalarType<T[P], AggregatePostTag[P]>;
};
export type PostTagGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostTagWhereInput;
    orderBy?: Prisma.PostTagOrderByWithAggregationInput | Prisma.PostTagOrderByWithAggregationInput[];
    by: Prisma.PostTagScalarFieldEnum[] | Prisma.PostTagScalarFieldEnum;
    having?: Prisma.PostTagScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PostTagCountAggregateInputType | true;
    _avg?: PostTagAvgAggregateInputType;
    _sum?: PostTagSumAggregateInputType;
    _min?: PostTagMinAggregateInputType;
    _max?: PostTagMaxAggregateInputType;
};
export type PostTagGroupByOutputType = {
    postId: string;
    tagId: string;
    isSuggested: boolean;
    score: number | null;
    createdAt: Date;
    _count: PostTagCountAggregateOutputType | null;
    _avg: PostTagAvgAggregateOutputType | null;
    _sum: PostTagSumAggregateOutputType | null;
    _min: PostTagMinAggregateOutputType | null;
    _max: PostTagMaxAggregateOutputType | null;
};
export type GetPostTagGroupByPayload<T extends PostTagGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PostTagGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PostTagGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PostTagGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PostTagGroupByOutputType[P]>;
}>>;
export type PostTagWhereInput = {
    AND?: Prisma.PostTagWhereInput | Prisma.PostTagWhereInput[];
    OR?: Prisma.PostTagWhereInput[];
    NOT?: Prisma.PostTagWhereInput | Prisma.PostTagWhereInput[];
    postId?: Prisma.StringFilter<"PostTag"> | string;
    tagId?: Prisma.StringFilter<"PostTag"> | string;
    isSuggested?: Prisma.BoolFilter<"PostTag"> | boolean;
    score?: Prisma.FloatNullableFilter<"PostTag"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"PostTag"> | Date | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    tag?: Prisma.XOR<Prisma.TagScalarRelationFilter, Prisma.TagWhereInput>;
};
export type PostTagOrderByWithRelationInput = {
    postId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    post?: Prisma.PostOrderByWithRelationInput;
    tag?: Prisma.TagOrderByWithRelationInput;
};
export type PostTagWhereUniqueInput = Prisma.AtLeast<{
    postId_tagId?: Prisma.PostTagPostIdTagIdCompoundUniqueInput;
    AND?: Prisma.PostTagWhereInput | Prisma.PostTagWhereInput[];
    OR?: Prisma.PostTagWhereInput[];
    NOT?: Prisma.PostTagWhereInput | Prisma.PostTagWhereInput[];
    postId?: Prisma.StringFilter<"PostTag"> | string;
    tagId?: Prisma.StringFilter<"PostTag"> | string;
    isSuggested?: Prisma.BoolFilter<"PostTag"> | boolean;
    score?: Prisma.FloatNullableFilter<"PostTag"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"PostTag"> | Date | string;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    tag?: Prisma.XOR<Prisma.TagScalarRelationFilter, Prisma.TagWhereInput>;
}, "postId_tagId">;
export type PostTagOrderByWithAggregationInput = {
    postId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PostTagCountOrderByAggregateInput;
    _avg?: Prisma.PostTagAvgOrderByAggregateInput;
    _max?: Prisma.PostTagMaxOrderByAggregateInput;
    _min?: Prisma.PostTagMinOrderByAggregateInput;
    _sum?: Prisma.PostTagSumOrderByAggregateInput;
};
export type PostTagScalarWhereWithAggregatesInput = {
    AND?: Prisma.PostTagScalarWhereWithAggregatesInput | Prisma.PostTagScalarWhereWithAggregatesInput[];
    OR?: Prisma.PostTagScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PostTagScalarWhereWithAggregatesInput | Prisma.PostTagScalarWhereWithAggregatesInput[];
    postId?: Prisma.StringWithAggregatesFilter<"PostTag"> | string;
    tagId?: Prisma.StringWithAggregatesFilter<"PostTag"> | string;
    isSuggested?: Prisma.BoolWithAggregatesFilter<"PostTag"> | boolean;
    score?: Prisma.FloatNullableWithAggregatesFilter<"PostTag"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PostTag"> | Date | string;
};
export type PostTagCreateInput = {
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutTagsInput;
    tag: Prisma.TagCreateNestedOneWithoutPostsInput;
};
export type PostTagUncheckedCreateInput = {
    postId: string;
    tagId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type PostTagUpdateInput = {
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutTagsNestedInput;
    tag?: Prisma.TagUpdateOneRequiredWithoutPostsNestedInput;
};
export type PostTagUncheckedUpdateInput = {
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostTagCreateManyInput = {
    postId: string;
    tagId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type PostTagUpdateManyMutationInput = {
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostTagUncheckedUpdateManyInput = {
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostTagListRelationFilter = {
    every?: Prisma.PostTagWhereInput;
    some?: Prisma.PostTagWhereInput;
    none?: Prisma.PostTagWhereInput;
};
export type PostTagOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PostTagPostIdTagIdCompoundUniqueInput = {
    postId: string;
    tagId: string;
};
export type PostTagCountOrderByAggregateInput = {
    postId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PostTagAvgOrderByAggregateInput = {
    score?: Prisma.SortOrder;
};
export type PostTagMaxOrderByAggregateInput = {
    postId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PostTagMinOrderByAggregateInput = {
    postId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PostTagSumOrderByAggregateInput = {
    score?: Prisma.SortOrder;
};
export type PostTagCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.PostTagCreateWithoutPostInput, Prisma.PostTagUncheckedCreateWithoutPostInput> | Prisma.PostTagCreateWithoutPostInput[] | Prisma.PostTagUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostTagCreateOrConnectWithoutPostInput | Prisma.PostTagCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.PostTagCreateManyPostInputEnvelope;
    connect?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
};
export type PostTagUncheckedCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.PostTagCreateWithoutPostInput, Prisma.PostTagUncheckedCreateWithoutPostInput> | Prisma.PostTagCreateWithoutPostInput[] | Prisma.PostTagUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostTagCreateOrConnectWithoutPostInput | Prisma.PostTagCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.PostTagCreateManyPostInputEnvelope;
    connect?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
};
export type PostTagUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.PostTagCreateWithoutPostInput, Prisma.PostTagUncheckedCreateWithoutPostInput> | Prisma.PostTagCreateWithoutPostInput[] | Prisma.PostTagUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostTagCreateOrConnectWithoutPostInput | Prisma.PostTagCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.PostTagUpsertWithWhereUniqueWithoutPostInput | Prisma.PostTagUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.PostTagCreateManyPostInputEnvelope;
    set?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    disconnect?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    delete?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    connect?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    update?: Prisma.PostTagUpdateWithWhereUniqueWithoutPostInput | Prisma.PostTagUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.PostTagUpdateManyWithWhereWithoutPostInput | Prisma.PostTagUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.PostTagScalarWhereInput | Prisma.PostTagScalarWhereInput[];
};
export type PostTagUncheckedUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.PostTagCreateWithoutPostInput, Prisma.PostTagUncheckedCreateWithoutPostInput> | Prisma.PostTagCreateWithoutPostInput[] | Prisma.PostTagUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.PostTagCreateOrConnectWithoutPostInput | Prisma.PostTagCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.PostTagUpsertWithWhereUniqueWithoutPostInput | Prisma.PostTagUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.PostTagCreateManyPostInputEnvelope;
    set?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    disconnect?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    delete?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    connect?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    update?: Prisma.PostTagUpdateWithWhereUniqueWithoutPostInput | Prisma.PostTagUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.PostTagUpdateManyWithWhereWithoutPostInput | Prisma.PostTagUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.PostTagScalarWhereInput | Prisma.PostTagScalarWhereInput[];
};
export type PostTagCreateNestedManyWithoutTagInput = {
    create?: Prisma.XOR<Prisma.PostTagCreateWithoutTagInput, Prisma.PostTagUncheckedCreateWithoutTagInput> | Prisma.PostTagCreateWithoutTagInput[] | Prisma.PostTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.PostTagCreateOrConnectWithoutTagInput | Prisma.PostTagCreateOrConnectWithoutTagInput[];
    createMany?: Prisma.PostTagCreateManyTagInputEnvelope;
    connect?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
};
export type PostTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: Prisma.XOR<Prisma.PostTagCreateWithoutTagInput, Prisma.PostTagUncheckedCreateWithoutTagInput> | Prisma.PostTagCreateWithoutTagInput[] | Prisma.PostTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.PostTagCreateOrConnectWithoutTagInput | Prisma.PostTagCreateOrConnectWithoutTagInput[];
    createMany?: Prisma.PostTagCreateManyTagInputEnvelope;
    connect?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
};
export type PostTagUpdateManyWithoutTagNestedInput = {
    create?: Prisma.XOR<Prisma.PostTagCreateWithoutTagInput, Prisma.PostTagUncheckedCreateWithoutTagInput> | Prisma.PostTagCreateWithoutTagInput[] | Prisma.PostTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.PostTagCreateOrConnectWithoutTagInput | Prisma.PostTagCreateOrConnectWithoutTagInput[];
    upsert?: Prisma.PostTagUpsertWithWhereUniqueWithoutTagInput | Prisma.PostTagUpsertWithWhereUniqueWithoutTagInput[];
    createMany?: Prisma.PostTagCreateManyTagInputEnvelope;
    set?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    disconnect?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    delete?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    connect?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    update?: Prisma.PostTagUpdateWithWhereUniqueWithoutTagInput | Prisma.PostTagUpdateWithWhereUniqueWithoutTagInput[];
    updateMany?: Prisma.PostTagUpdateManyWithWhereWithoutTagInput | Prisma.PostTagUpdateManyWithWhereWithoutTagInput[];
    deleteMany?: Prisma.PostTagScalarWhereInput | Prisma.PostTagScalarWhereInput[];
};
export type PostTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: Prisma.XOR<Prisma.PostTagCreateWithoutTagInput, Prisma.PostTagUncheckedCreateWithoutTagInput> | Prisma.PostTagCreateWithoutTagInput[] | Prisma.PostTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.PostTagCreateOrConnectWithoutTagInput | Prisma.PostTagCreateOrConnectWithoutTagInput[];
    upsert?: Prisma.PostTagUpsertWithWhereUniqueWithoutTagInput | Prisma.PostTagUpsertWithWhereUniqueWithoutTagInput[];
    createMany?: Prisma.PostTagCreateManyTagInputEnvelope;
    set?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    disconnect?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    delete?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    connect?: Prisma.PostTagWhereUniqueInput | Prisma.PostTagWhereUniqueInput[];
    update?: Prisma.PostTagUpdateWithWhereUniqueWithoutTagInput | Prisma.PostTagUpdateWithWhereUniqueWithoutTagInput[];
    updateMany?: Prisma.PostTagUpdateManyWithWhereWithoutTagInput | Prisma.PostTagUpdateManyWithWhereWithoutTagInput[];
    deleteMany?: Prisma.PostTagScalarWhereInput | Prisma.PostTagScalarWhereInput[];
};
export type PostTagCreateWithoutPostInput = {
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
    tag: Prisma.TagCreateNestedOneWithoutPostsInput;
};
export type PostTagUncheckedCreateWithoutPostInput = {
    tagId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type PostTagCreateOrConnectWithoutPostInput = {
    where: Prisma.PostTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostTagCreateWithoutPostInput, Prisma.PostTagUncheckedCreateWithoutPostInput>;
};
export type PostTagCreateManyPostInputEnvelope = {
    data: Prisma.PostTagCreateManyPostInput | Prisma.PostTagCreateManyPostInput[];
    skipDuplicates?: boolean;
};
export type PostTagUpsertWithWhereUniqueWithoutPostInput = {
    where: Prisma.PostTagWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostTagUpdateWithoutPostInput, Prisma.PostTagUncheckedUpdateWithoutPostInput>;
    create: Prisma.XOR<Prisma.PostTagCreateWithoutPostInput, Prisma.PostTagUncheckedCreateWithoutPostInput>;
};
export type PostTagUpdateWithWhereUniqueWithoutPostInput = {
    where: Prisma.PostTagWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostTagUpdateWithoutPostInput, Prisma.PostTagUncheckedUpdateWithoutPostInput>;
};
export type PostTagUpdateManyWithWhereWithoutPostInput = {
    where: Prisma.PostTagScalarWhereInput;
    data: Prisma.XOR<Prisma.PostTagUpdateManyMutationInput, Prisma.PostTagUncheckedUpdateManyWithoutPostInput>;
};
export type PostTagScalarWhereInput = {
    AND?: Prisma.PostTagScalarWhereInput | Prisma.PostTagScalarWhereInput[];
    OR?: Prisma.PostTagScalarWhereInput[];
    NOT?: Prisma.PostTagScalarWhereInput | Prisma.PostTagScalarWhereInput[];
    postId?: Prisma.StringFilter<"PostTag"> | string;
    tagId?: Prisma.StringFilter<"PostTag"> | string;
    isSuggested?: Prisma.BoolFilter<"PostTag"> | boolean;
    score?: Prisma.FloatNullableFilter<"PostTag"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"PostTag"> | Date | string;
};
export type PostTagCreateWithoutTagInput = {
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutTagsInput;
};
export type PostTagUncheckedCreateWithoutTagInput = {
    postId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type PostTagCreateOrConnectWithoutTagInput = {
    where: Prisma.PostTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostTagCreateWithoutTagInput, Prisma.PostTagUncheckedCreateWithoutTagInput>;
};
export type PostTagCreateManyTagInputEnvelope = {
    data: Prisma.PostTagCreateManyTagInput | Prisma.PostTagCreateManyTagInput[];
    skipDuplicates?: boolean;
};
export type PostTagUpsertWithWhereUniqueWithoutTagInput = {
    where: Prisma.PostTagWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostTagUpdateWithoutTagInput, Prisma.PostTagUncheckedUpdateWithoutTagInput>;
    create: Prisma.XOR<Prisma.PostTagCreateWithoutTagInput, Prisma.PostTagUncheckedCreateWithoutTagInput>;
};
export type PostTagUpdateWithWhereUniqueWithoutTagInput = {
    where: Prisma.PostTagWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostTagUpdateWithoutTagInput, Prisma.PostTagUncheckedUpdateWithoutTagInput>;
};
export type PostTagUpdateManyWithWhereWithoutTagInput = {
    where: Prisma.PostTagScalarWhereInput;
    data: Prisma.XOR<Prisma.PostTagUpdateManyMutationInput, Prisma.PostTagUncheckedUpdateManyWithoutTagInput>;
};
export type PostTagCreateManyPostInput = {
    tagId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type PostTagUpdateWithoutPostInput = {
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tag?: Prisma.TagUpdateOneRequiredWithoutPostsNestedInput;
};
export type PostTagUncheckedUpdateWithoutPostInput = {
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostTagUncheckedUpdateManyWithoutPostInput = {
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostTagCreateManyTagInput = {
    postId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type PostTagUpdateWithoutTagInput = {
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutTagsNestedInput;
};
export type PostTagUncheckedUpdateWithoutTagInput = {
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostTagUncheckedUpdateManyWithoutTagInput = {
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostTagSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    postId?: boolean;
    tagId?: boolean;
    isSuggested?: boolean;
    score?: boolean;
    createdAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postTag"]>;
export type PostTagSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    postId?: boolean;
    tagId?: boolean;
    isSuggested?: boolean;
    score?: boolean;
    createdAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postTag"]>;
export type PostTagSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    postId?: boolean;
    tagId?: boolean;
    isSuggested?: boolean;
    score?: boolean;
    createdAt?: boolean;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["postTag"]>;
export type PostTagSelectScalar = {
    postId?: boolean;
    tagId?: boolean;
    isSuggested?: boolean;
    score?: boolean;
    createdAt?: boolean;
};
export type PostTagOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"postId" | "tagId" | "isSuggested" | "score" | "createdAt", ExtArgs["result"]["postTag"]>;
export type PostTagInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type PostTagIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type PostTagIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type $PostTagPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PostTag";
    objects: {
        post: Prisma.$PostPayload<ExtArgs>;
        tag: Prisma.$TagPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        postId: string;
        tagId: string;
        isSuggested: boolean;
        score: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["postTag"]>;
    composites: {};
};
export type PostTagGetPayload<S extends boolean | null | undefined | PostTagDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PostTagPayload, S>;
export type PostTagCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PostTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PostTagCountAggregateInputType | true;
};
export interface PostTagDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PostTag'];
        meta: {
            name: 'PostTag';
        };
    };
    findUnique<T extends PostTagFindUniqueArgs>(args: Prisma.SelectSubset<T, PostTagFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PostTagClient<runtime.Types.Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PostTagFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PostTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostTagClient<runtime.Types.Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PostTagFindFirstArgs>(args?: Prisma.SelectSubset<T, PostTagFindFirstArgs<ExtArgs>>): Prisma.Prisma__PostTagClient<runtime.Types.Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PostTagFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PostTagFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostTagClient<runtime.Types.Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PostTagFindManyArgs>(args?: Prisma.SelectSubset<T, PostTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PostTagCreateArgs>(args: Prisma.SelectSubset<T, PostTagCreateArgs<ExtArgs>>): Prisma.Prisma__PostTagClient<runtime.Types.Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PostTagCreateManyArgs>(args?: Prisma.SelectSubset<T, PostTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PostTagCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PostTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PostTagDeleteArgs>(args: Prisma.SelectSubset<T, PostTagDeleteArgs<ExtArgs>>): Prisma.Prisma__PostTagClient<runtime.Types.Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PostTagUpdateArgs>(args: Prisma.SelectSubset<T, PostTagUpdateArgs<ExtArgs>>): Prisma.Prisma__PostTagClient<runtime.Types.Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PostTagDeleteManyArgs>(args?: Prisma.SelectSubset<T, PostTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PostTagUpdateManyArgs>(args: Prisma.SelectSubset<T, PostTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PostTagUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PostTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PostTagUpsertArgs>(args: Prisma.SelectSubset<T, PostTagUpsertArgs<ExtArgs>>): Prisma.Prisma__PostTagClient<runtime.Types.Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PostTagCountArgs>(args?: Prisma.Subset<T, PostTagCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PostTagCountAggregateOutputType> : number>;
    aggregate<T extends PostTagAggregateArgs>(args: Prisma.Subset<T, PostTagAggregateArgs>): Prisma.PrismaPromise<GetPostTagAggregateType<T>>;
    groupBy<T extends PostTagGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PostTagGroupByArgs['orderBy'];
    } : {
        orderBy?: PostTagGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PostTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PostTagFieldRefs;
}
export interface Prisma__PostTagClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    post<T extends Prisma.PostDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PostDefaultArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tag<T extends Prisma.TagDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TagDefaultArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PostTagFieldRefs {
    readonly postId: Prisma.FieldRef<"PostTag", 'String'>;
    readonly tagId: Prisma.FieldRef<"PostTag", 'String'>;
    readonly isSuggested: Prisma.FieldRef<"PostTag", 'Boolean'>;
    readonly score: Prisma.FieldRef<"PostTag", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"PostTag", 'DateTime'>;
}
export type PostTagFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostTagSelect<ExtArgs> | null;
    omit?: Prisma.PostTagOmit<ExtArgs> | null;
    include?: Prisma.PostTagInclude<ExtArgs> | null;
    where: Prisma.PostTagWhereUniqueInput;
};
export type PostTagFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostTagSelect<ExtArgs> | null;
    omit?: Prisma.PostTagOmit<ExtArgs> | null;
    include?: Prisma.PostTagInclude<ExtArgs> | null;
    where: Prisma.PostTagWhereUniqueInput;
};
export type PostTagFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostTagSelect<ExtArgs> | null;
    omit?: Prisma.PostTagOmit<ExtArgs> | null;
    include?: Prisma.PostTagInclude<ExtArgs> | null;
    where?: Prisma.PostTagWhereInput;
    orderBy?: Prisma.PostTagOrderByWithRelationInput | Prisma.PostTagOrderByWithRelationInput[];
    cursor?: Prisma.PostTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostTagScalarFieldEnum | Prisma.PostTagScalarFieldEnum[];
};
export type PostTagFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostTagSelect<ExtArgs> | null;
    omit?: Prisma.PostTagOmit<ExtArgs> | null;
    include?: Prisma.PostTagInclude<ExtArgs> | null;
    where?: Prisma.PostTagWhereInput;
    orderBy?: Prisma.PostTagOrderByWithRelationInput | Prisma.PostTagOrderByWithRelationInput[];
    cursor?: Prisma.PostTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostTagScalarFieldEnum | Prisma.PostTagScalarFieldEnum[];
};
export type PostTagFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostTagSelect<ExtArgs> | null;
    omit?: Prisma.PostTagOmit<ExtArgs> | null;
    include?: Prisma.PostTagInclude<ExtArgs> | null;
    where?: Prisma.PostTagWhereInput;
    orderBy?: Prisma.PostTagOrderByWithRelationInput | Prisma.PostTagOrderByWithRelationInput[];
    cursor?: Prisma.PostTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostTagScalarFieldEnum | Prisma.PostTagScalarFieldEnum[];
};
export type PostTagCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostTagSelect<ExtArgs> | null;
    omit?: Prisma.PostTagOmit<ExtArgs> | null;
    include?: Prisma.PostTagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostTagCreateInput, Prisma.PostTagUncheckedCreateInput>;
};
export type PostTagCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PostTagCreateManyInput | Prisma.PostTagCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PostTagCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostTagSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostTagOmit<ExtArgs> | null;
    data: Prisma.PostTagCreateManyInput | Prisma.PostTagCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PostTagIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PostTagUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostTagSelect<ExtArgs> | null;
    omit?: Prisma.PostTagOmit<ExtArgs> | null;
    include?: Prisma.PostTagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostTagUpdateInput, Prisma.PostTagUncheckedUpdateInput>;
    where: Prisma.PostTagWhereUniqueInput;
};
export type PostTagUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PostTagUpdateManyMutationInput, Prisma.PostTagUncheckedUpdateManyInput>;
    where?: Prisma.PostTagWhereInput;
    limit?: number;
};
export type PostTagUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostTagSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostTagOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostTagUpdateManyMutationInput, Prisma.PostTagUncheckedUpdateManyInput>;
    where?: Prisma.PostTagWhereInput;
    limit?: number;
    include?: Prisma.PostTagIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PostTagUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostTagSelect<ExtArgs> | null;
    omit?: Prisma.PostTagOmit<ExtArgs> | null;
    include?: Prisma.PostTagInclude<ExtArgs> | null;
    where: Prisma.PostTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostTagCreateInput, Prisma.PostTagUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PostTagUpdateInput, Prisma.PostTagUncheckedUpdateInput>;
};
export type PostTagDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostTagSelect<ExtArgs> | null;
    omit?: Prisma.PostTagOmit<ExtArgs> | null;
    include?: Prisma.PostTagInclude<ExtArgs> | null;
    where: Prisma.PostTagWhereUniqueInput;
};
export type PostTagDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostTagWhereInput;
    limit?: number;
};
export type PostTagDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostTagSelect<ExtArgs> | null;
    omit?: Prisma.PostTagOmit<ExtArgs> | null;
    include?: Prisma.PostTagInclude<ExtArgs> | null;
};
