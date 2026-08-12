import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type RateDiscussionModel = runtime.Types.Result.DefaultSelection<Prisma.$RateDiscussionPayload>;
export type AggregateRateDiscussion = {
    _count: RateDiscussionCountAggregateOutputType | null;
    _avg: RateDiscussionAvgAggregateOutputType | null;
    _sum: RateDiscussionSumAggregateOutputType | null;
    _min: RateDiscussionMinAggregateOutputType | null;
    _max: RateDiscussionMaxAggregateOutputType | null;
};
export type RateDiscussionAvgAggregateOutputType = {
    rating: number | null;
};
export type RateDiscussionSumAggregateOutputType = {
    rating: number | null;
};
export type RateDiscussionMinAggregateOutputType = {
    id: string | null;
    discussionId: string | null;
    userId: string | null;
    rating: number | null;
    createdAt: Date | null;
};
export type RateDiscussionMaxAggregateOutputType = {
    id: string | null;
    discussionId: string | null;
    userId: string | null;
    rating: number | null;
    createdAt: Date | null;
};
export type RateDiscussionCountAggregateOutputType = {
    id: number;
    discussionId: number;
    userId: number;
    rating: number;
    createdAt: number;
    _all: number;
};
export type RateDiscussionAvgAggregateInputType = {
    rating?: true;
};
export type RateDiscussionSumAggregateInputType = {
    rating?: true;
};
export type RateDiscussionMinAggregateInputType = {
    id?: true;
    discussionId?: true;
    userId?: true;
    rating?: true;
    createdAt?: true;
};
export type RateDiscussionMaxAggregateInputType = {
    id?: true;
    discussionId?: true;
    userId?: true;
    rating?: true;
    createdAt?: true;
};
export type RateDiscussionCountAggregateInputType = {
    id?: true;
    discussionId?: true;
    userId?: true;
    rating?: true;
    createdAt?: true;
    _all?: true;
};
export type RateDiscussionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RateDiscussionWhereInput;
    orderBy?: Prisma.RateDiscussionOrderByWithRelationInput | Prisma.RateDiscussionOrderByWithRelationInput[];
    cursor?: Prisma.RateDiscussionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RateDiscussionCountAggregateInputType;
    _avg?: RateDiscussionAvgAggregateInputType;
    _sum?: RateDiscussionSumAggregateInputType;
    _min?: RateDiscussionMinAggregateInputType;
    _max?: RateDiscussionMaxAggregateInputType;
};
export type GetRateDiscussionAggregateType<T extends RateDiscussionAggregateArgs> = {
    [P in keyof T & keyof AggregateRateDiscussion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRateDiscussion[P]> : Prisma.GetScalarType<T[P], AggregateRateDiscussion[P]>;
};
export type RateDiscussionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RateDiscussionWhereInput;
    orderBy?: Prisma.RateDiscussionOrderByWithAggregationInput | Prisma.RateDiscussionOrderByWithAggregationInput[];
    by: Prisma.RateDiscussionScalarFieldEnum[] | Prisma.RateDiscussionScalarFieldEnum;
    having?: Prisma.RateDiscussionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RateDiscussionCountAggregateInputType | true;
    _avg?: RateDiscussionAvgAggregateInputType;
    _sum?: RateDiscussionSumAggregateInputType;
    _min?: RateDiscussionMinAggregateInputType;
    _max?: RateDiscussionMaxAggregateInputType;
};
export type RateDiscussionGroupByOutputType = {
    id: string;
    discussionId: string;
    userId: string;
    rating: number;
    createdAt: Date;
    _count: RateDiscussionCountAggregateOutputType | null;
    _avg: RateDiscussionAvgAggregateOutputType | null;
    _sum: RateDiscussionSumAggregateOutputType | null;
    _min: RateDiscussionMinAggregateOutputType | null;
    _max: RateDiscussionMaxAggregateOutputType | null;
};
export type GetRateDiscussionGroupByPayload<T extends RateDiscussionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RateDiscussionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RateDiscussionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RateDiscussionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RateDiscussionGroupByOutputType[P]>;
}>>;
export type RateDiscussionWhereInput = {
    AND?: Prisma.RateDiscussionWhereInput | Prisma.RateDiscussionWhereInput[];
    OR?: Prisma.RateDiscussionWhereInput[];
    NOT?: Prisma.RateDiscussionWhereInput | Prisma.RateDiscussionWhereInput[];
    id?: Prisma.StringFilter<"RateDiscussion"> | string;
    discussionId?: Prisma.StringFilter<"RateDiscussion"> | string;
    userId?: Prisma.StringFilter<"RateDiscussion"> | string;
    rating?: Prisma.FloatFilter<"RateDiscussion"> | number;
    createdAt?: Prisma.DateTimeFilter<"RateDiscussion"> | Date | string;
    discussion?: Prisma.XOR<Prisma.DiscussionScalarRelationFilter, Prisma.DiscussionWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
};
export type RateDiscussionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    discussionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    discussion?: Prisma.DiscussionOrderByWithRelationInput;
    user?: Prisma.UsersOrderByWithRelationInput;
};
export type RateDiscussionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    discussionId_userId?: Prisma.RateDiscussionDiscussionIdUserIdCompoundUniqueInput;
    AND?: Prisma.RateDiscussionWhereInput | Prisma.RateDiscussionWhereInput[];
    OR?: Prisma.RateDiscussionWhereInput[];
    NOT?: Prisma.RateDiscussionWhereInput | Prisma.RateDiscussionWhereInput[];
    discussionId?: Prisma.StringFilter<"RateDiscussion"> | string;
    userId?: Prisma.StringFilter<"RateDiscussion"> | string;
    rating?: Prisma.FloatFilter<"RateDiscussion"> | number;
    createdAt?: Prisma.DateTimeFilter<"RateDiscussion"> | Date | string;
    discussion?: Prisma.XOR<Prisma.DiscussionScalarRelationFilter, Prisma.DiscussionWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
}, "id" | "discussionId_userId">;
export type RateDiscussionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    discussionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RateDiscussionCountOrderByAggregateInput;
    _avg?: Prisma.RateDiscussionAvgOrderByAggregateInput;
    _max?: Prisma.RateDiscussionMaxOrderByAggregateInput;
    _min?: Prisma.RateDiscussionMinOrderByAggregateInput;
    _sum?: Prisma.RateDiscussionSumOrderByAggregateInput;
};
export type RateDiscussionScalarWhereWithAggregatesInput = {
    AND?: Prisma.RateDiscussionScalarWhereWithAggregatesInput | Prisma.RateDiscussionScalarWhereWithAggregatesInput[];
    OR?: Prisma.RateDiscussionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RateDiscussionScalarWhereWithAggregatesInput | Prisma.RateDiscussionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RateDiscussion"> | string;
    discussionId?: Prisma.StringWithAggregatesFilter<"RateDiscussion"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"RateDiscussion"> | string;
    rating?: Prisma.FloatWithAggregatesFilter<"RateDiscussion"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RateDiscussion"> | Date | string;
};
export type RateDiscussionCreateInput = {
    id?: string;
    rating: number;
    createdAt?: Date | string;
    discussion: Prisma.DiscussionCreateNestedOneWithoutRateDiscussionInput;
    user: Prisma.UsersCreateNestedOneWithoutRateDiscussionInput;
};
export type RateDiscussionUncheckedCreateInput = {
    id?: string;
    discussionId: string;
    userId: string;
    rating: number;
    createdAt?: Date | string;
};
export type RateDiscussionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discussion?: Prisma.DiscussionUpdateOneRequiredWithoutRateDiscussionNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutRateDiscussionNestedInput;
};
export type RateDiscussionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RateDiscussionCreateManyInput = {
    id?: string;
    discussionId: string;
    userId: string;
    rating: number;
    createdAt?: Date | string;
};
export type RateDiscussionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RateDiscussionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RateDiscussionListRelationFilter = {
    every?: Prisma.RateDiscussionWhereInput;
    some?: Prisma.RateDiscussionWhereInput;
    none?: Prisma.RateDiscussionWhereInput;
};
export type RateDiscussionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RateDiscussionDiscussionIdUserIdCompoundUniqueInput = {
    discussionId: string;
    userId: string;
};
export type RateDiscussionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    discussionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RateDiscussionAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
};
export type RateDiscussionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    discussionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RateDiscussionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    discussionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RateDiscussionSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
};
export type RateDiscussionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RateDiscussionCreateWithoutUserInput, Prisma.RateDiscussionUncheckedCreateWithoutUserInput> | Prisma.RateDiscussionCreateWithoutUserInput[] | Prisma.RateDiscussionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RateDiscussionCreateOrConnectWithoutUserInput | Prisma.RateDiscussionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RateDiscussionCreateManyUserInputEnvelope;
    connect?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
};
export type RateDiscussionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RateDiscussionCreateWithoutUserInput, Prisma.RateDiscussionUncheckedCreateWithoutUserInput> | Prisma.RateDiscussionCreateWithoutUserInput[] | Prisma.RateDiscussionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RateDiscussionCreateOrConnectWithoutUserInput | Prisma.RateDiscussionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RateDiscussionCreateManyUserInputEnvelope;
    connect?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
};
export type RateDiscussionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RateDiscussionCreateWithoutUserInput, Prisma.RateDiscussionUncheckedCreateWithoutUserInput> | Prisma.RateDiscussionCreateWithoutUserInput[] | Prisma.RateDiscussionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RateDiscussionCreateOrConnectWithoutUserInput | Prisma.RateDiscussionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RateDiscussionUpsertWithWhereUniqueWithoutUserInput | Prisma.RateDiscussionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RateDiscussionCreateManyUserInputEnvelope;
    set?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    disconnect?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    delete?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    connect?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    update?: Prisma.RateDiscussionUpdateWithWhereUniqueWithoutUserInput | Prisma.RateDiscussionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RateDiscussionUpdateManyWithWhereWithoutUserInput | Prisma.RateDiscussionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RateDiscussionScalarWhereInput | Prisma.RateDiscussionScalarWhereInput[];
};
export type RateDiscussionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RateDiscussionCreateWithoutUserInput, Prisma.RateDiscussionUncheckedCreateWithoutUserInput> | Prisma.RateDiscussionCreateWithoutUserInput[] | Prisma.RateDiscussionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RateDiscussionCreateOrConnectWithoutUserInput | Prisma.RateDiscussionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RateDiscussionUpsertWithWhereUniqueWithoutUserInput | Prisma.RateDiscussionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RateDiscussionCreateManyUserInputEnvelope;
    set?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    disconnect?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    delete?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    connect?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    update?: Prisma.RateDiscussionUpdateWithWhereUniqueWithoutUserInput | Prisma.RateDiscussionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RateDiscussionUpdateManyWithWhereWithoutUserInput | Prisma.RateDiscussionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RateDiscussionScalarWhereInput | Prisma.RateDiscussionScalarWhereInput[];
};
export type RateDiscussionCreateNestedManyWithoutDiscussionInput = {
    create?: Prisma.XOR<Prisma.RateDiscussionCreateWithoutDiscussionInput, Prisma.RateDiscussionUncheckedCreateWithoutDiscussionInput> | Prisma.RateDiscussionCreateWithoutDiscussionInput[] | Prisma.RateDiscussionUncheckedCreateWithoutDiscussionInput[];
    connectOrCreate?: Prisma.RateDiscussionCreateOrConnectWithoutDiscussionInput | Prisma.RateDiscussionCreateOrConnectWithoutDiscussionInput[];
    createMany?: Prisma.RateDiscussionCreateManyDiscussionInputEnvelope;
    connect?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
};
export type RateDiscussionUncheckedCreateNestedManyWithoutDiscussionInput = {
    create?: Prisma.XOR<Prisma.RateDiscussionCreateWithoutDiscussionInput, Prisma.RateDiscussionUncheckedCreateWithoutDiscussionInput> | Prisma.RateDiscussionCreateWithoutDiscussionInput[] | Prisma.RateDiscussionUncheckedCreateWithoutDiscussionInput[];
    connectOrCreate?: Prisma.RateDiscussionCreateOrConnectWithoutDiscussionInput | Prisma.RateDiscussionCreateOrConnectWithoutDiscussionInput[];
    createMany?: Prisma.RateDiscussionCreateManyDiscussionInputEnvelope;
    connect?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
};
export type RateDiscussionUpdateManyWithoutDiscussionNestedInput = {
    create?: Prisma.XOR<Prisma.RateDiscussionCreateWithoutDiscussionInput, Prisma.RateDiscussionUncheckedCreateWithoutDiscussionInput> | Prisma.RateDiscussionCreateWithoutDiscussionInput[] | Prisma.RateDiscussionUncheckedCreateWithoutDiscussionInput[];
    connectOrCreate?: Prisma.RateDiscussionCreateOrConnectWithoutDiscussionInput | Prisma.RateDiscussionCreateOrConnectWithoutDiscussionInput[];
    upsert?: Prisma.RateDiscussionUpsertWithWhereUniqueWithoutDiscussionInput | Prisma.RateDiscussionUpsertWithWhereUniqueWithoutDiscussionInput[];
    createMany?: Prisma.RateDiscussionCreateManyDiscussionInputEnvelope;
    set?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    disconnect?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    delete?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    connect?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    update?: Prisma.RateDiscussionUpdateWithWhereUniqueWithoutDiscussionInput | Prisma.RateDiscussionUpdateWithWhereUniqueWithoutDiscussionInput[];
    updateMany?: Prisma.RateDiscussionUpdateManyWithWhereWithoutDiscussionInput | Prisma.RateDiscussionUpdateManyWithWhereWithoutDiscussionInput[];
    deleteMany?: Prisma.RateDiscussionScalarWhereInput | Prisma.RateDiscussionScalarWhereInput[];
};
export type RateDiscussionUncheckedUpdateManyWithoutDiscussionNestedInput = {
    create?: Prisma.XOR<Prisma.RateDiscussionCreateWithoutDiscussionInput, Prisma.RateDiscussionUncheckedCreateWithoutDiscussionInput> | Prisma.RateDiscussionCreateWithoutDiscussionInput[] | Prisma.RateDiscussionUncheckedCreateWithoutDiscussionInput[];
    connectOrCreate?: Prisma.RateDiscussionCreateOrConnectWithoutDiscussionInput | Prisma.RateDiscussionCreateOrConnectWithoutDiscussionInput[];
    upsert?: Prisma.RateDiscussionUpsertWithWhereUniqueWithoutDiscussionInput | Prisma.RateDiscussionUpsertWithWhereUniqueWithoutDiscussionInput[];
    createMany?: Prisma.RateDiscussionCreateManyDiscussionInputEnvelope;
    set?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    disconnect?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    delete?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    connect?: Prisma.RateDiscussionWhereUniqueInput | Prisma.RateDiscussionWhereUniqueInput[];
    update?: Prisma.RateDiscussionUpdateWithWhereUniqueWithoutDiscussionInput | Prisma.RateDiscussionUpdateWithWhereUniqueWithoutDiscussionInput[];
    updateMany?: Prisma.RateDiscussionUpdateManyWithWhereWithoutDiscussionInput | Prisma.RateDiscussionUpdateManyWithWhereWithoutDiscussionInput[];
    deleteMany?: Prisma.RateDiscussionScalarWhereInput | Prisma.RateDiscussionScalarWhereInput[];
};
export type RateDiscussionCreateWithoutUserInput = {
    id?: string;
    rating: number;
    createdAt?: Date | string;
    discussion: Prisma.DiscussionCreateNestedOneWithoutRateDiscussionInput;
};
export type RateDiscussionUncheckedCreateWithoutUserInput = {
    id?: string;
    discussionId: string;
    rating: number;
    createdAt?: Date | string;
};
export type RateDiscussionCreateOrConnectWithoutUserInput = {
    where: Prisma.RateDiscussionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RateDiscussionCreateWithoutUserInput, Prisma.RateDiscussionUncheckedCreateWithoutUserInput>;
};
export type RateDiscussionCreateManyUserInputEnvelope = {
    data: Prisma.RateDiscussionCreateManyUserInput | Prisma.RateDiscussionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type RateDiscussionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.RateDiscussionWhereUniqueInput;
    update: Prisma.XOR<Prisma.RateDiscussionUpdateWithoutUserInput, Prisma.RateDiscussionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RateDiscussionCreateWithoutUserInput, Prisma.RateDiscussionUncheckedCreateWithoutUserInput>;
};
export type RateDiscussionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.RateDiscussionWhereUniqueInput;
    data: Prisma.XOR<Prisma.RateDiscussionUpdateWithoutUserInput, Prisma.RateDiscussionUncheckedUpdateWithoutUserInput>;
};
export type RateDiscussionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.RateDiscussionScalarWhereInput;
    data: Prisma.XOR<Prisma.RateDiscussionUpdateManyMutationInput, Prisma.RateDiscussionUncheckedUpdateManyWithoutUserInput>;
};
export type RateDiscussionScalarWhereInput = {
    AND?: Prisma.RateDiscussionScalarWhereInput | Prisma.RateDiscussionScalarWhereInput[];
    OR?: Prisma.RateDiscussionScalarWhereInput[];
    NOT?: Prisma.RateDiscussionScalarWhereInput | Prisma.RateDiscussionScalarWhereInput[];
    id?: Prisma.StringFilter<"RateDiscussion"> | string;
    discussionId?: Prisma.StringFilter<"RateDiscussion"> | string;
    userId?: Prisma.StringFilter<"RateDiscussion"> | string;
    rating?: Prisma.FloatFilter<"RateDiscussion"> | number;
    createdAt?: Prisma.DateTimeFilter<"RateDiscussion"> | Date | string;
};
export type RateDiscussionCreateWithoutDiscussionInput = {
    id?: string;
    rating: number;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutRateDiscussionInput;
};
export type RateDiscussionUncheckedCreateWithoutDiscussionInput = {
    id?: string;
    userId: string;
    rating: number;
    createdAt?: Date | string;
};
export type RateDiscussionCreateOrConnectWithoutDiscussionInput = {
    where: Prisma.RateDiscussionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RateDiscussionCreateWithoutDiscussionInput, Prisma.RateDiscussionUncheckedCreateWithoutDiscussionInput>;
};
export type RateDiscussionCreateManyDiscussionInputEnvelope = {
    data: Prisma.RateDiscussionCreateManyDiscussionInput | Prisma.RateDiscussionCreateManyDiscussionInput[];
    skipDuplicates?: boolean;
};
export type RateDiscussionUpsertWithWhereUniqueWithoutDiscussionInput = {
    where: Prisma.RateDiscussionWhereUniqueInput;
    update: Prisma.XOR<Prisma.RateDiscussionUpdateWithoutDiscussionInput, Prisma.RateDiscussionUncheckedUpdateWithoutDiscussionInput>;
    create: Prisma.XOR<Prisma.RateDiscussionCreateWithoutDiscussionInput, Prisma.RateDiscussionUncheckedCreateWithoutDiscussionInput>;
};
export type RateDiscussionUpdateWithWhereUniqueWithoutDiscussionInput = {
    where: Prisma.RateDiscussionWhereUniqueInput;
    data: Prisma.XOR<Prisma.RateDiscussionUpdateWithoutDiscussionInput, Prisma.RateDiscussionUncheckedUpdateWithoutDiscussionInput>;
};
export type RateDiscussionUpdateManyWithWhereWithoutDiscussionInput = {
    where: Prisma.RateDiscussionScalarWhereInput;
    data: Prisma.XOR<Prisma.RateDiscussionUpdateManyMutationInput, Prisma.RateDiscussionUncheckedUpdateManyWithoutDiscussionInput>;
};
export type RateDiscussionCreateManyUserInput = {
    id?: string;
    discussionId: string;
    rating: number;
    createdAt?: Date | string;
};
export type RateDiscussionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discussion?: Prisma.DiscussionUpdateOneRequiredWithoutRateDiscussionNestedInput;
};
export type RateDiscussionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussionId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RateDiscussionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    discussionId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RateDiscussionCreateManyDiscussionInput = {
    id?: string;
    userId: string;
    rating: number;
    createdAt?: Date | string;
};
export type RateDiscussionUpdateWithoutDiscussionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutRateDiscussionNestedInput;
};
export type RateDiscussionUncheckedUpdateWithoutDiscussionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RateDiscussionUncheckedUpdateManyWithoutDiscussionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RateDiscussionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    discussionId?: boolean;
    userId?: boolean;
    rating?: boolean;
    createdAt?: boolean;
    discussion?: boolean | Prisma.DiscussionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rateDiscussion"]>;
export type RateDiscussionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    discussionId?: boolean;
    userId?: boolean;
    rating?: boolean;
    createdAt?: boolean;
    discussion?: boolean | Prisma.DiscussionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rateDiscussion"]>;
export type RateDiscussionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    discussionId?: boolean;
    userId?: boolean;
    rating?: boolean;
    createdAt?: boolean;
    discussion?: boolean | Prisma.DiscussionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["rateDiscussion"]>;
export type RateDiscussionSelectScalar = {
    id?: boolean;
    discussionId?: boolean;
    userId?: boolean;
    rating?: boolean;
    createdAt?: boolean;
};
export type RateDiscussionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "discussionId" | "userId" | "rating" | "createdAt", ExtArgs["result"]["rateDiscussion"]>;
export type RateDiscussionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    discussion?: boolean | Prisma.DiscussionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type RateDiscussionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    discussion?: boolean | Prisma.DiscussionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type RateDiscussionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    discussion?: boolean | Prisma.DiscussionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $RateDiscussionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RateDiscussion";
    objects: {
        discussion: Prisma.$DiscussionPayload<ExtArgs>;
        user: Prisma.$UsersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        discussionId: string;
        userId: string;
        rating: number;
        createdAt: Date;
    }, ExtArgs["result"]["rateDiscussion"]>;
    composites: {};
};
export type RateDiscussionGetPayload<S extends boolean | null | undefined | RateDiscussionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RateDiscussionPayload, S>;
export type RateDiscussionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RateDiscussionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RateDiscussionCountAggregateInputType | true;
};
export interface RateDiscussionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RateDiscussion'];
        meta: {
            name: 'RateDiscussion';
        };
    };
    findUnique<T extends RateDiscussionFindUniqueArgs>(args: Prisma.SelectSubset<T, RateDiscussionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RateDiscussionClient<runtime.Types.Result.GetResult<Prisma.$RateDiscussionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RateDiscussionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RateDiscussionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RateDiscussionClient<runtime.Types.Result.GetResult<Prisma.$RateDiscussionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RateDiscussionFindFirstArgs>(args?: Prisma.SelectSubset<T, RateDiscussionFindFirstArgs<ExtArgs>>): Prisma.Prisma__RateDiscussionClient<runtime.Types.Result.GetResult<Prisma.$RateDiscussionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RateDiscussionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RateDiscussionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RateDiscussionClient<runtime.Types.Result.GetResult<Prisma.$RateDiscussionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RateDiscussionFindManyArgs>(args?: Prisma.SelectSubset<T, RateDiscussionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RateDiscussionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RateDiscussionCreateArgs>(args: Prisma.SelectSubset<T, RateDiscussionCreateArgs<ExtArgs>>): Prisma.Prisma__RateDiscussionClient<runtime.Types.Result.GetResult<Prisma.$RateDiscussionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RateDiscussionCreateManyArgs>(args?: Prisma.SelectSubset<T, RateDiscussionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RateDiscussionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RateDiscussionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RateDiscussionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RateDiscussionDeleteArgs>(args: Prisma.SelectSubset<T, RateDiscussionDeleteArgs<ExtArgs>>): Prisma.Prisma__RateDiscussionClient<runtime.Types.Result.GetResult<Prisma.$RateDiscussionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RateDiscussionUpdateArgs>(args: Prisma.SelectSubset<T, RateDiscussionUpdateArgs<ExtArgs>>): Prisma.Prisma__RateDiscussionClient<runtime.Types.Result.GetResult<Prisma.$RateDiscussionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RateDiscussionDeleteManyArgs>(args?: Prisma.SelectSubset<T, RateDiscussionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RateDiscussionUpdateManyArgs>(args: Prisma.SelectSubset<T, RateDiscussionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RateDiscussionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RateDiscussionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RateDiscussionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RateDiscussionUpsertArgs>(args: Prisma.SelectSubset<T, RateDiscussionUpsertArgs<ExtArgs>>): Prisma.Prisma__RateDiscussionClient<runtime.Types.Result.GetResult<Prisma.$RateDiscussionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RateDiscussionCountArgs>(args?: Prisma.Subset<T, RateDiscussionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RateDiscussionCountAggregateOutputType> : number>;
    aggregate<T extends RateDiscussionAggregateArgs>(args: Prisma.Subset<T, RateDiscussionAggregateArgs>): Prisma.PrismaPromise<GetRateDiscussionAggregateType<T>>;
    groupBy<T extends RateDiscussionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RateDiscussionGroupByArgs['orderBy'];
    } : {
        orderBy?: RateDiscussionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RateDiscussionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRateDiscussionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RateDiscussionFieldRefs;
}
export interface Prisma__RateDiscussionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    discussion<T extends Prisma.DiscussionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.DiscussionDefaultArgs<ExtArgs>>): Prisma.Prisma__DiscussionClient<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RateDiscussionFieldRefs {
    readonly id: Prisma.FieldRef<"RateDiscussion", 'String'>;
    readonly discussionId: Prisma.FieldRef<"RateDiscussion", 'String'>;
    readonly userId: Prisma.FieldRef<"RateDiscussion", 'String'>;
    readonly rating: Prisma.FieldRef<"RateDiscussion", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"RateDiscussion", 'DateTime'>;
}
export type RateDiscussionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateDiscussionSelect<ExtArgs> | null;
    omit?: Prisma.RateDiscussionOmit<ExtArgs> | null;
    include?: Prisma.RateDiscussionInclude<ExtArgs> | null;
    where: Prisma.RateDiscussionWhereUniqueInput;
};
export type RateDiscussionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateDiscussionSelect<ExtArgs> | null;
    omit?: Prisma.RateDiscussionOmit<ExtArgs> | null;
    include?: Prisma.RateDiscussionInclude<ExtArgs> | null;
    where: Prisma.RateDiscussionWhereUniqueInput;
};
export type RateDiscussionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RateDiscussionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RateDiscussionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RateDiscussionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateDiscussionSelect<ExtArgs> | null;
    omit?: Prisma.RateDiscussionOmit<ExtArgs> | null;
    include?: Prisma.RateDiscussionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RateDiscussionCreateInput, Prisma.RateDiscussionUncheckedCreateInput>;
};
export type RateDiscussionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RateDiscussionCreateManyInput | Prisma.RateDiscussionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RateDiscussionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateDiscussionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RateDiscussionOmit<ExtArgs> | null;
    data: Prisma.RateDiscussionCreateManyInput | Prisma.RateDiscussionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RateDiscussionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RateDiscussionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateDiscussionSelect<ExtArgs> | null;
    omit?: Prisma.RateDiscussionOmit<ExtArgs> | null;
    include?: Prisma.RateDiscussionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RateDiscussionUpdateInput, Prisma.RateDiscussionUncheckedUpdateInput>;
    where: Prisma.RateDiscussionWhereUniqueInput;
};
export type RateDiscussionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RateDiscussionUpdateManyMutationInput, Prisma.RateDiscussionUncheckedUpdateManyInput>;
    where?: Prisma.RateDiscussionWhereInput;
    limit?: number;
};
export type RateDiscussionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateDiscussionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RateDiscussionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RateDiscussionUpdateManyMutationInput, Prisma.RateDiscussionUncheckedUpdateManyInput>;
    where?: Prisma.RateDiscussionWhereInput;
    limit?: number;
    include?: Prisma.RateDiscussionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RateDiscussionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateDiscussionSelect<ExtArgs> | null;
    omit?: Prisma.RateDiscussionOmit<ExtArgs> | null;
    include?: Prisma.RateDiscussionInclude<ExtArgs> | null;
    where: Prisma.RateDiscussionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RateDiscussionCreateInput, Prisma.RateDiscussionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RateDiscussionUpdateInput, Prisma.RateDiscussionUncheckedUpdateInput>;
};
export type RateDiscussionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateDiscussionSelect<ExtArgs> | null;
    omit?: Prisma.RateDiscussionOmit<ExtArgs> | null;
    include?: Prisma.RateDiscussionInclude<ExtArgs> | null;
    where: Prisma.RateDiscussionWhereUniqueInput;
};
export type RateDiscussionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RateDiscussionWhereInput;
    limit?: number;
};
export type RateDiscussionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RateDiscussionSelect<ExtArgs> | null;
    omit?: Prisma.RateDiscussionOmit<ExtArgs> | null;
    include?: Prisma.RateDiscussionInclude<ExtArgs> | null;
};
