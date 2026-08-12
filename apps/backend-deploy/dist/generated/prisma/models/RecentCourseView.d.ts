import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type RecentCourseViewModel = runtime.Types.Result.DefaultSelection<Prisma.$RecentCourseViewPayload>;
export type AggregateRecentCourseView = {
    _count: RecentCourseViewCountAggregateOutputType | null;
    _min: RecentCourseViewMinAggregateOutputType | null;
    _max: RecentCourseViewMaxAggregateOutputType | null;
};
export type RecentCourseViewMinAggregateOutputType = {
    id: string | null;
    courseId: string | null;
    userId: string | null;
    viewedAt: Date | null;
};
export type RecentCourseViewMaxAggregateOutputType = {
    id: string | null;
    courseId: string | null;
    userId: string | null;
    viewedAt: Date | null;
};
export type RecentCourseViewCountAggregateOutputType = {
    id: number;
    courseId: number;
    userId: number;
    viewedAt: number;
    _all: number;
};
export type RecentCourseViewMinAggregateInputType = {
    id?: true;
    courseId?: true;
    userId?: true;
    viewedAt?: true;
};
export type RecentCourseViewMaxAggregateInputType = {
    id?: true;
    courseId?: true;
    userId?: true;
    viewedAt?: true;
};
export type RecentCourseViewCountAggregateInputType = {
    id?: true;
    courseId?: true;
    userId?: true;
    viewedAt?: true;
    _all?: true;
};
export type RecentCourseViewAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecentCourseViewWhereInput;
    orderBy?: Prisma.RecentCourseViewOrderByWithRelationInput | Prisma.RecentCourseViewOrderByWithRelationInput[];
    cursor?: Prisma.RecentCourseViewWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RecentCourseViewCountAggregateInputType;
    _min?: RecentCourseViewMinAggregateInputType;
    _max?: RecentCourseViewMaxAggregateInputType;
};
export type GetRecentCourseViewAggregateType<T extends RecentCourseViewAggregateArgs> = {
    [P in keyof T & keyof AggregateRecentCourseView]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRecentCourseView[P]> : Prisma.GetScalarType<T[P], AggregateRecentCourseView[P]>;
};
export type RecentCourseViewGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecentCourseViewWhereInput;
    orderBy?: Prisma.RecentCourseViewOrderByWithAggregationInput | Prisma.RecentCourseViewOrderByWithAggregationInput[];
    by: Prisma.RecentCourseViewScalarFieldEnum[] | Prisma.RecentCourseViewScalarFieldEnum;
    having?: Prisma.RecentCourseViewScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RecentCourseViewCountAggregateInputType | true;
    _min?: RecentCourseViewMinAggregateInputType;
    _max?: RecentCourseViewMaxAggregateInputType;
};
export type RecentCourseViewGroupByOutputType = {
    id: string;
    courseId: string;
    userId: string;
    viewedAt: Date;
    _count: RecentCourseViewCountAggregateOutputType | null;
    _min: RecentCourseViewMinAggregateOutputType | null;
    _max: RecentCourseViewMaxAggregateOutputType | null;
};
export type GetRecentCourseViewGroupByPayload<T extends RecentCourseViewGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RecentCourseViewGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RecentCourseViewGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RecentCourseViewGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RecentCourseViewGroupByOutputType[P]>;
}>>;
export type RecentCourseViewWhereInput = {
    AND?: Prisma.RecentCourseViewWhereInput | Prisma.RecentCourseViewWhereInput[];
    OR?: Prisma.RecentCourseViewWhereInput[];
    NOT?: Prisma.RecentCourseViewWhereInput | Prisma.RecentCourseViewWhereInput[];
    id?: Prisma.StringFilter<"RecentCourseView"> | string;
    courseId?: Prisma.StringFilter<"RecentCourseView"> | string;
    userId?: Prisma.StringFilter<"RecentCourseView"> | string;
    viewedAt?: Prisma.DateTimeFilter<"RecentCourseView"> | Date | string;
    course?: Prisma.XOR<Prisma.CourseScalarRelationFilter, Prisma.CourseWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
};
export type RecentCourseViewOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
    course?: Prisma.CourseOrderByWithRelationInput;
    user?: Prisma.UsersOrderByWithRelationInput;
};
export type RecentCourseViewWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    courseId_userId?: Prisma.RecentCourseViewCourseIdUserIdCompoundUniqueInput;
    AND?: Prisma.RecentCourseViewWhereInput | Prisma.RecentCourseViewWhereInput[];
    OR?: Prisma.RecentCourseViewWhereInput[];
    NOT?: Prisma.RecentCourseViewWhereInput | Prisma.RecentCourseViewWhereInput[];
    courseId?: Prisma.StringFilter<"RecentCourseView"> | string;
    userId?: Prisma.StringFilter<"RecentCourseView"> | string;
    viewedAt?: Prisma.DateTimeFilter<"RecentCourseView"> | Date | string;
    course?: Prisma.XOR<Prisma.CourseScalarRelationFilter, Prisma.CourseWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
}, "id" | "courseId_userId">;
export type RecentCourseViewOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
    _count?: Prisma.RecentCourseViewCountOrderByAggregateInput;
    _max?: Prisma.RecentCourseViewMaxOrderByAggregateInput;
    _min?: Prisma.RecentCourseViewMinOrderByAggregateInput;
};
export type RecentCourseViewScalarWhereWithAggregatesInput = {
    AND?: Prisma.RecentCourseViewScalarWhereWithAggregatesInput | Prisma.RecentCourseViewScalarWhereWithAggregatesInput[];
    OR?: Prisma.RecentCourseViewScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RecentCourseViewScalarWhereWithAggregatesInput | Prisma.RecentCourseViewScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RecentCourseView"> | string;
    courseId?: Prisma.StringWithAggregatesFilter<"RecentCourseView"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"RecentCourseView"> | string;
    viewedAt?: Prisma.DateTimeWithAggregatesFilter<"RecentCourseView"> | Date | string;
};
export type RecentCourseViewCreateInput = {
    id?: string;
    viewedAt?: Date | string;
    course: Prisma.CourseCreateNestedOneWithoutRecentViewsInput;
    user: Prisma.UsersCreateNestedOneWithoutRecentCourseViewsInput;
};
export type RecentCourseViewUncheckedCreateInput = {
    id?: string;
    courseId: string;
    userId: string;
    viewedAt?: Date | string;
};
export type RecentCourseViewUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUpdateOneRequiredWithoutRecentViewsNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutRecentCourseViewsNestedInput;
};
export type RecentCourseViewUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentCourseViewCreateManyInput = {
    id?: string;
    courseId: string;
    userId: string;
    viewedAt?: Date | string;
};
export type RecentCourseViewUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentCourseViewUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentCourseViewListRelationFilter = {
    every?: Prisma.RecentCourseViewWhereInput;
    some?: Prisma.RecentCourseViewWhereInput;
    none?: Prisma.RecentCourseViewWhereInput;
};
export type RecentCourseViewOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RecentCourseViewCourseIdUserIdCompoundUniqueInput = {
    courseId: string;
    userId: string;
};
export type RecentCourseViewCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
};
export type RecentCourseViewMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
};
export type RecentCourseViewMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    viewedAt?: Prisma.SortOrder;
};
export type RecentCourseViewCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RecentCourseViewCreateWithoutUserInput, Prisma.RecentCourseViewUncheckedCreateWithoutUserInput> | Prisma.RecentCourseViewCreateWithoutUserInput[] | Prisma.RecentCourseViewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecentCourseViewCreateOrConnectWithoutUserInput | Prisma.RecentCourseViewCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RecentCourseViewCreateManyUserInputEnvelope;
    connect?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
};
export type RecentCourseViewUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RecentCourseViewCreateWithoutUserInput, Prisma.RecentCourseViewUncheckedCreateWithoutUserInput> | Prisma.RecentCourseViewCreateWithoutUserInput[] | Prisma.RecentCourseViewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecentCourseViewCreateOrConnectWithoutUserInput | Prisma.RecentCourseViewCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RecentCourseViewCreateManyUserInputEnvelope;
    connect?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
};
export type RecentCourseViewUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RecentCourseViewCreateWithoutUserInput, Prisma.RecentCourseViewUncheckedCreateWithoutUserInput> | Prisma.RecentCourseViewCreateWithoutUserInput[] | Prisma.RecentCourseViewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecentCourseViewCreateOrConnectWithoutUserInput | Prisma.RecentCourseViewCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RecentCourseViewUpsertWithWhereUniqueWithoutUserInput | Prisma.RecentCourseViewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RecentCourseViewCreateManyUserInputEnvelope;
    set?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    disconnect?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    delete?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    connect?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    update?: Prisma.RecentCourseViewUpdateWithWhereUniqueWithoutUserInput | Prisma.RecentCourseViewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RecentCourseViewUpdateManyWithWhereWithoutUserInput | Prisma.RecentCourseViewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RecentCourseViewScalarWhereInput | Prisma.RecentCourseViewScalarWhereInput[];
};
export type RecentCourseViewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RecentCourseViewCreateWithoutUserInput, Prisma.RecentCourseViewUncheckedCreateWithoutUserInput> | Prisma.RecentCourseViewCreateWithoutUserInput[] | Prisma.RecentCourseViewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RecentCourseViewCreateOrConnectWithoutUserInput | Prisma.RecentCourseViewCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RecentCourseViewUpsertWithWhereUniqueWithoutUserInput | Prisma.RecentCourseViewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RecentCourseViewCreateManyUserInputEnvelope;
    set?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    disconnect?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    delete?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    connect?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    update?: Prisma.RecentCourseViewUpdateWithWhereUniqueWithoutUserInput | Prisma.RecentCourseViewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RecentCourseViewUpdateManyWithWhereWithoutUserInput | Prisma.RecentCourseViewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RecentCourseViewScalarWhereInput | Prisma.RecentCourseViewScalarWhereInput[];
};
export type RecentCourseViewCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.RecentCourseViewCreateWithoutCourseInput, Prisma.RecentCourseViewUncheckedCreateWithoutCourseInput> | Prisma.RecentCourseViewCreateWithoutCourseInput[] | Prisma.RecentCourseViewUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.RecentCourseViewCreateOrConnectWithoutCourseInput | Prisma.RecentCourseViewCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.RecentCourseViewCreateManyCourseInputEnvelope;
    connect?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
};
export type RecentCourseViewUncheckedCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.RecentCourseViewCreateWithoutCourseInput, Prisma.RecentCourseViewUncheckedCreateWithoutCourseInput> | Prisma.RecentCourseViewCreateWithoutCourseInput[] | Prisma.RecentCourseViewUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.RecentCourseViewCreateOrConnectWithoutCourseInput | Prisma.RecentCourseViewCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.RecentCourseViewCreateManyCourseInputEnvelope;
    connect?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
};
export type RecentCourseViewUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.RecentCourseViewCreateWithoutCourseInput, Prisma.RecentCourseViewUncheckedCreateWithoutCourseInput> | Prisma.RecentCourseViewCreateWithoutCourseInput[] | Prisma.RecentCourseViewUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.RecentCourseViewCreateOrConnectWithoutCourseInput | Prisma.RecentCourseViewCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.RecentCourseViewUpsertWithWhereUniqueWithoutCourseInput | Prisma.RecentCourseViewUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.RecentCourseViewCreateManyCourseInputEnvelope;
    set?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    disconnect?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    delete?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    connect?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    update?: Prisma.RecentCourseViewUpdateWithWhereUniqueWithoutCourseInput | Prisma.RecentCourseViewUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.RecentCourseViewUpdateManyWithWhereWithoutCourseInput | Prisma.RecentCourseViewUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.RecentCourseViewScalarWhereInput | Prisma.RecentCourseViewScalarWhereInput[];
};
export type RecentCourseViewUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.RecentCourseViewCreateWithoutCourseInput, Prisma.RecentCourseViewUncheckedCreateWithoutCourseInput> | Prisma.RecentCourseViewCreateWithoutCourseInput[] | Prisma.RecentCourseViewUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.RecentCourseViewCreateOrConnectWithoutCourseInput | Prisma.RecentCourseViewCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.RecentCourseViewUpsertWithWhereUniqueWithoutCourseInput | Prisma.RecentCourseViewUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.RecentCourseViewCreateManyCourseInputEnvelope;
    set?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    disconnect?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    delete?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    connect?: Prisma.RecentCourseViewWhereUniqueInput | Prisma.RecentCourseViewWhereUniqueInput[];
    update?: Prisma.RecentCourseViewUpdateWithWhereUniqueWithoutCourseInput | Prisma.RecentCourseViewUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.RecentCourseViewUpdateManyWithWhereWithoutCourseInput | Prisma.RecentCourseViewUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.RecentCourseViewScalarWhereInput | Prisma.RecentCourseViewScalarWhereInput[];
};
export type RecentCourseViewCreateWithoutUserInput = {
    id?: string;
    viewedAt?: Date | string;
    course: Prisma.CourseCreateNestedOneWithoutRecentViewsInput;
};
export type RecentCourseViewUncheckedCreateWithoutUserInput = {
    id?: string;
    courseId: string;
    viewedAt?: Date | string;
};
export type RecentCourseViewCreateOrConnectWithoutUserInput = {
    where: Prisma.RecentCourseViewWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecentCourseViewCreateWithoutUserInput, Prisma.RecentCourseViewUncheckedCreateWithoutUserInput>;
};
export type RecentCourseViewCreateManyUserInputEnvelope = {
    data: Prisma.RecentCourseViewCreateManyUserInput | Prisma.RecentCourseViewCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type RecentCourseViewUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.RecentCourseViewWhereUniqueInput;
    update: Prisma.XOR<Prisma.RecentCourseViewUpdateWithoutUserInput, Prisma.RecentCourseViewUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RecentCourseViewCreateWithoutUserInput, Prisma.RecentCourseViewUncheckedCreateWithoutUserInput>;
};
export type RecentCourseViewUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.RecentCourseViewWhereUniqueInput;
    data: Prisma.XOR<Prisma.RecentCourseViewUpdateWithoutUserInput, Prisma.RecentCourseViewUncheckedUpdateWithoutUserInput>;
};
export type RecentCourseViewUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.RecentCourseViewScalarWhereInput;
    data: Prisma.XOR<Prisma.RecentCourseViewUpdateManyMutationInput, Prisma.RecentCourseViewUncheckedUpdateManyWithoutUserInput>;
};
export type RecentCourseViewScalarWhereInput = {
    AND?: Prisma.RecentCourseViewScalarWhereInput | Prisma.RecentCourseViewScalarWhereInput[];
    OR?: Prisma.RecentCourseViewScalarWhereInput[];
    NOT?: Prisma.RecentCourseViewScalarWhereInput | Prisma.RecentCourseViewScalarWhereInput[];
    id?: Prisma.StringFilter<"RecentCourseView"> | string;
    courseId?: Prisma.StringFilter<"RecentCourseView"> | string;
    userId?: Prisma.StringFilter<"RecentCourseView"> | string;
    viewedAt?: Prisma.DateTimeFilter<"RecentCourseView"> | Date | string;
};
export type RecentCourseViewCreateWithoutCourseInput = {
    id?: string;
    viewedAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutRecentCourseViewsInput;
};
export type RecentCourseViewUncheckedCreateWithoutCourseInput = {
    id?: string;
    userId: string;
    viewedAt?: Date | string;
};
export type RecentCourseViewCreateOrConnectWithoutCourseInput = {
    where: Prisma.RecentCourseViewWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecentCourseViewCreateWithoutCourseInput, Prisma.RecentCourseViewUncheckedCreateWithoutCourseInput>;
};
export type RecentCourseViewCreateManyCourseInputEnvelope = {
    data: Prisma.RecentCourseViewCreateManyCourseInput | Prisma.RecentCourseViewCreateManyCourseInput[];
    skipDuplicates?: boolean;
};
export type RecentCourseViewUpsertWithWhereUniqueWithoutCourseInput = {
    where: Prisma.RecentCourseViewWhereUniqueInput;
    update: Prisma.XOR<Prisma.RecentCourseViewUpdateWithoutCourseInput, Prisma.RecentCourseViewUncheckedUpdateWithoutCourseInput>;
    create: Prisma.XOR<Prisma.RecentCourseViewCreateWithoutCourseInput, Prisma.RecentCourseViewUncheckedCreateWithoutCourseInput>;
};
export type RecentCourseViewUpdateWithWhereUniqueWithoutCourseInput = {
    where: Prisma.RecentCourseViewWhereUniqueInput;
    data: Prisma.XOR<Prisma.RecentCourseViewUpdateWithoutCourseInput, Prisma.RecentCourseViewUncheckedUpdateWithoutCourseInput>;
};
export type RecentCourseViewUpdateManyWithWhereWithoutCourseInput = {
    where: Prisma.RecentCourseViewScalarWhereInput;
    data: Prisma.XOR<Prisma.RecentCourseViewUpdateManyMutationInput, Prisma.RecentCourseViewUncheckedUpdateManyWithoutCourseInput>;
};
export type RecentCourseViewCreateManyUserInput = {
    id?: string;
    courseId: string;
    viewedAt?: Date | string;
};
export type RecentCourseViewUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUpdateOneRequiredWithoutRecentViewsNestedInput;
};
export type RecentCourseViewUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentCourseViewUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentCourseViewCreateManyCourseInput = {
    id?: string;
    userId: string;
    viewedAt?: Date | string;
};
export type RecentCourseViewUpdateWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutRecentCourseViewsNestedInput;
};
export type RecentCourseViewUncheckedUpdateWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentCourseViewUncheckedUpdateManyWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    viewedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecentCourseViewSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    courseId?: boolean;
    userId?: boolean;
    viewedAt?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recentCourseView"]>;
export type RecentCourseViewSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    courseId?: boolean;
    userId?: boolean;
    viewedAt?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recentCourseView"]>;
export type RecentCourseViewSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    courseId?: boolean;
    userId?: boolean;
    viewedAt?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recentCourseView"]>;
export type RecentCourseViewSelectScalar = {
    id?: boolean;
    courseId?: boolean;
    userId?: boolean;
    viewedAt?: boolean;
};
export type RecentCourseViewOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "courseId" | "userId" | "viewedAt", ExtArgs["result"]["recentCourseView"]>;
export type RecentCourseViewInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type RecentCourseViewIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type RecentCourseViewIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $RecentCourseViewPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RecentCourseView";
    objects: {
        course: Prisma.$CoursePayload<ExtArgs>;
        user: Prisma.$UsersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        courseId: string;
        userId: string;
        viewedAt: Date;
    }, ExtArgs["result"]["recentCourseView"]>;
    composites: {};
};
export type RecentCourseViewGetPayload<S extends boolean | null | undefined | RecentCourseViewDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RecentCourseViewPayload, S>;
export type RecentCourseViewCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RecentCourseViewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RecentCourseViewCountAggregateInputType | true;
};
export interface RecentCourseViewDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RecentCourseView'];
        meta: {
            name: 'RecentCourseView';
        };
    };
    findUnique<T extends RecentCourseViewFindUniqueArgs>(args: Prisma.SelectSubset<T, RecentCourseViewFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RecentCourseViewClient<runtime.Types.Result.GetResult<Prisma.$RecentCourseViewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RecentCourseViewFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RecentCourseViewFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecentCourseViewClient<runtime.Types.Result.GetResult<Prisma.$RecentCourseViewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RecentCourseViewFindFirstArgs>(args?: Prisma.SelectSubset<T, RecentCourseViewFindFirstArgs<ExtArgs>>): Prisma.Prisma__RecentCourseViewClient<runtime.Types.Result.GetResult<Prisma.$RecentCourseViewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RecentCourseViewFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RecentCourseViewFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecentCourseViewClient<runtime.Types.Result.GetResult<Prisma.$RecentCourseViewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RecentCourseViewFindManyArgs>(args?: Prisma.SelectSubset<T, RecentCourseViewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecentCourseViewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RecentCourseViewCreateArgs>(args: Prisma.SelectSubset<T, RecentCourseViewCreateArgs<ExtArgs>>): Prisma.Prisma__RecentCourseViewClient<runtime.Types.Result.GetResult<Prisma.$RecentCourseViewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RecentCourseViewCreateManyArgs>(args?: Prisma.SelectSubset<T, RecentCourseViewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RecentCourseViewCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RecentCourseViewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecentCourseViewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RecentCourseViewDeleteArgs>(args: Prisma.SelectSubset<T, RecentCourseViewDeleteArgs<ExtArgs>>): Prisma.Prisma__RecentCourseViewClient<runtime.Types.Result.GetResult<Prisma.$RecentCourseViewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RecentCourseViewUpdateArgs>(args: Prisma.SelectSubset<T, RecentCourseViewUpdateArgs<ExtArgs>>): Prisma.Prisma__RecentCourseViewClient<runtime.Types.Result.GetResult<Prisma.$RecentCourseViewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RecentCourseViewDeleteManyArgs>(args?: Prisma.SelectSubset<T, RecentCourseViewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RecentCourseViewUpdateManyArgs>(args: Prisma.SelectSubset<T, RecentCourseViewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RecentCourseViewUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RecentCourseViewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecentCourseViewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RecentCourseViewUpsertArgs>(args: Prisma.SelectSubset<T, RecentCourseViewUpsertArgs<ExtArgs>>): Prisma.Prisma__RecentCourseViewClient<runtime.Types.Result.GetResult<Prisma.$RecentCourseViewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RecentCourseViewCountArgs>(args?: Prisma.Subset<T, RecentCourseViewCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RecentCourseViewCountAggregateOutputType> : number>;
    aggregate<T extends RecentCourseViewAggregateArgs>(args: Prisma.Subset<T, RecentCourseViewAggregateArgs>): Prisma.PrismaPromise<GetRecentCourseViewAggregateType<T>>;
    groupBy<T extends RecentCourseViewGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RecentCourseViewGroupByArgs['orderBy'];
    } : {
        orderBy?: RecentCourseViewGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RecentCourseViewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecentCourseViewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RecentCourseViewFieldRefs;
}
export interface Prisma__RecentCourseViewClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    course<T extends Prisma.CourseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CourseDefaultArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RecentCourseViewFieldRefs {
    readonly id: Prisma.FieldRef<"RecentCourseView", 'String'>;
    readonly courseId: Prisma.FieldRef<"RecentCourseView", 'String'>;
    readonly userId: Prisma.FieldRef<"RecentCourseView", 'String'>;
    readonly viewedAt: Prisma.FieldRef<"RecentCourseView", 'DateTime'>;
}
export type RecentCourseViewFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentCourseViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentCourseViewOmit<ExtArgs> | null;
    include?: Prisma.RecentCourseViewInclude<ExtArgs> | null;
    where: Prisma.RecentCourseViewWhereUniqueInput;
};
export type RecentCourseViewFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentCourseViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentCourseViewOmit<ExtArgs> | null;
    include?: Prisma.RecentCourseViewInclude<ExtArgs> | null;
    where: Prisma.RecentCourseViewWhereUniqueInput;
};
export type RecentCourseViewFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentCourseViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentCourseViewOmit<ExtArgs> | null;
    include?: Prisma.RecentCourseViewInclude<ExtArgs> | null;
    where?: Prisma.RecentCourseViewWhereInput;
    orderBy?: Prisma.RecentCourseViewOrderByWithRelationInput | Prisma.RecentCourseViewOrderByWithRelationInput[];
    cursor?: Prisma.RecentCourseViewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecentCourseViewScalarFieldEnum | Prisma.RecentCourseViewScalarFieldEnum[];
};
export type RecentCourseViewFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentCourseViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentCourseViewOmit<ExtArgs> | null;
    include?: Prisma.RecentCourseViewInclude<ExtArgs> | null;
    where?: Prisma.RecentCourseViewWhereInput;
    orderBy?: Prisma.RecentCourseViewOrderByWithRelationInput | Prisma.RecentCourseViewOrderByWithRelationInput[];
    cursor?: Prisma.RecentCourseViewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecentCourseViewScalarFieldEnum | Prisma.RecentCourseViewScalarFieldEnum[];
};
export type RecentCourseViewFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentCourseViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentCourseViewOmit<ExtArgs> | null;
    include?: Prisma.RecentCourseViewInclude<ExtArgs> | null;
    where?: Prisma.RecentCourseViewWhereInput;
    orderBy?: Prisma.RecentCourseViewOrderByWithRelationInput | Prisma.RecentCourseViewOrderByWithRelationInput[];
    cursor?: Prisma.RecentCourseViewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecentCourseViewScalarFieldEnum | Prisma.RecentCourseViewScalarFieldEnum[];
};
export type RecentCourseViewCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentCourseViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentCourseViewOmit<ExtArgs> | null;
    include?: Prisma.RecentCourseViewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecentCourseViewCreateInput, Prisma.RecentCourseViewUncheckedCreateInput>;
};
export type RecentCourseViewCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RecentCourseViewCreateManyInput | Prisma.RecentCourseViewCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RecentCourseViewCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentCourseViewSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecentCourseViewOmit<ExtArgs> | null;
    data: Prisma.RecentCourseViewCreateManyInput | Prisma.RecentCourseViewCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RecentCourseViewIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RecentCourseViewUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentCourseViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentCourseViewOmit<ExtArgs> | null;
    include?: Prisma.RecentCourseViewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecentCourseViewUpdateInput, Prisma.RecentCourseViewUncheckedUpdateInput>;
    where: Prisma.RecentCourseViewWhereUniqueInput;
};
export type RecentCourseViewUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RecentCourseViewUpdateManyMutationInput, Prisma.RecentCourseViewUncheckedUpdateManyInput>;
    where?: Prisma.RecentCourseViewWhereInput;
    limit?: number;
};
export type RecentCourseViewUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentCourseViewSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecentCourseViewOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecentCourseViewUpdateManyMutationInput, Prisma.RecentCourseViewUncheckedUpdateManyInput>;
    where?: Prisma.RecentCourseViewWhereInput;
    limit?: number;
    include?: Prisma.RecentCourseViewIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RecentCourseViewUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentCourseViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentCourseViewOmit<ExtArgs> | null;
    include?: Prisma.RecentCourseViewInclude<ExtArgs> | null;
    where: Prisma.RecentCourseViewWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecentCourseViewCreateInput, Prisma.RecentCourseViewUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RecentCourseViewUpdateInput, Prisma.RecentCourseViewUncheckedUpdateInput>;
};
export type RecentCourseViewDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentCourseViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentCourseViewOmit<ExtArgs> | null;
    include?: Prisma.RecentCourseViewInclude<ExtArgs> | null;
    where: Prisma.RecentCourseViewWhereUniqueInput;
};
export type RecentCourseViewDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecentCourseViewWhereInput;
    limit?: number;
};
export type RecentCourseViewDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentCourseViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentCourseViewOmit<ExtArgs> | null;
    include?: Prisma.RecentCourseViewInclude<ExtArgs> | null;
};
