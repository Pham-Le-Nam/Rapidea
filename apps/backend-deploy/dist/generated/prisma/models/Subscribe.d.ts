import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type SubscribeModel = runtime.Types.Result.DefaultSelection<Prisma.$SubscribePayload>;
export type AggregateSubscribe = {
    _count: SubscribeCountAggregateOutputType | null;
    _avg: SubscribeAvgAggregateOutputType | null;
    _sum: SubscribeSumAggregateOutputType | null;
    _min: SubscribeMinAggregateOutputType | null;
    _max: SubscribeMaxAggregateOutputType | null;
};
export type SubscribeAvgAggregateOutputType = {
    rating: number | null;
    price: number | null;
};
export type SubscribeSumAggregateOutputType = {
    rating: number | null;
    price: number | null;
};
export type SubscribeMinAggregateOutputType = {
    id: string | null;
    courseId: string | null;
    userId: string | null;
    review: string | null;
    rating: number | null;
    price: number | null;
    currency: string | null;
    paymentSessionId: string | null;
    createdAt: Date | null;
};
export type SubscribeMaxAggregateOutputType = {
    id: string | null;
    courseId: string | null;
    userId: string | null;
    review: string | null;
    rating: number | null;
    price: number | null;
    currency: string | null;
    paymentSessionId: string | null;
    createdAt: Date | null;
};
export type SubscribeCountAggregateOutputType = {
    id: number;
    courseId: number;
    userId: number;
    review: number;
    rating: number;
    price: number;
    currency: number;
    paymentSessionId: number;
    createdAt: number;
    _all: number;
};
export type SubscribeAvgAggregateInputType = {
    rating?: true;
    price?: true;
};
export type SubscribeSumAggregateInputType = {
    rating?: true;
    price?: true;
};
export type SubscribeMinAggregateInputType = {
    id?: true;
    courseId?: true;
    userId?: true;
    review?: true;
    rating?: true;
    price?: true;
    currency?: true;
    paymentSessionId?: true;
    createdAt?: true;
};
export type SubscribeMaxAggregateInputType = {
    id?: true;
    courseId?: true;
    userId?: true;
    review?: true;
    rating?: true;
    price?: true;
    currency?: true;
    paymentSessionId?: true;
    createdAt?: true;
};
export type SubscribeCountAggregateInputType = {
    id?: true;
    courseId?: true;
    userId?: true;
    review?: true;
    rating?: true;
    price?: true;
    currency?: true;
    paymentSessionId?: true;
    createdAt?: true;
    _all?: true;
};
export type SubscribeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubscribeWhereInput;
    orderBy?: Prisma.SubscribeOrderByWithRelationInput | Prisma.SubscribeOrderByWithRelationInput[];
    cursor?: Prisma.SubscribeWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SubscribeCountAggregateInputType;
    _avg?: SubscribeAvgAggregateInputType;
    _sum?: SubscribeSumAggregateInputType;
    _min?: SubscribeMinAggregateInputType;
    _max?: SubscribeMaxAggregateInputType;
};
export type GetSubscribeAggregateType<T extends SubscribeAggregateArgs> = {
    [P in keyof T & keyof AggregateSubscribe]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSubscribe[P]> : Prisma.GetScalarType<T[P], AggregateSubscribe[P]>;
};
export type SubscribeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubscribeWhereInput;
    orderBy?: Prisma.SubscribeOrderByWithAggregationInput | Prisma.SubscribeOrderByWithAggregationInput[];
    by: Prisma.SubscribeScalarFieldEnum[] | Prisma.SubscribeScalarFieldEnum;
    having?: Prisma.SubscribeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SubscribeCountAggregateInputType | true;
    _avg?: SubscribeAvgAggregateInputType;
    _sum?: SubscribeSumAggregateInputType;
    _min?: SubscribeMinAggregateInputType;
    _max?: SubscribeMaxAggregateInputType;
};
export type SubscribeGroupByOutputType = {
    id: string;
    courseId: string;
    userId: string;
    review: string | null;
    rating: number;
    price: number;
    currency: string;
    paymentSessionId: string | null;
    createdAt: Date;
    _count: SubscribeCountAggregateOutputType | null;
    _avg: SubscribeAvgAggregateOutputType | null;
    _sum: SubscribeSumAggregateOutputType | null;
    _min: SubscribeMinAggregateOutputType | null;
    _max: SubscribeMaxAggregateOutputType | null;
};
export type GetSubscribeGroupByPayload<T extends SubscribeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SubscribeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SubscribeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SubscribeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SubscribeGroupByOutputType[P]>;
}>>;
export type SubscribeWhereInput = {
    AND?: Prisma.SubscribeWhereInput | Prisma.SubscribeWhereInput[];
    OR?: Prisma.SubscribeWhereInput[];
    NOT?: Prisma.SubscribeWhereInput | Prisma.SubscribeWhereInput[];
    id?: Prisma.StringFilter<"Subscribe"> | string;
    courseId?: Prisma.StringFilter<"Subscribe"> | string;
    userId?: Prisma.StringFilter<"Subscribe"> | string;
    review?: Prisma.StringNullableFilter<"Subscribe"> | string | null;
    rating?: Prisma.FloatFilter<"Subscribe"> | number;
    price?: Prisma.FloatFilter<"Subscribe"> | number;
    currency?: Prisma.StringFilter<"Subscribe"> | string;
    paymentSessionId?: Prisma.StringNullableFilter<"Subscribe"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Subscribe"> | Date | string;
    course?: Prisma.XOR<Prisma.CourseScalarRelationFilter, Prisma.CourseWhereInput>;
    subscriber?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
};
export type SubscribeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    review?: Prisma.SortOrderInput | Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paymentSessionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    course?: Prisma.CourseOrderByWithRelationInput;
    subscriber?: Prisma.UsersOrderByWithRelationInput;
};
export type SubscribeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    paymentSessionId?: string;
    courseId_userId?: Prisma.SubscribeCourseIdUserIdCompoundUniqueInput;
    AND?: Prisma.SubscribeWhereInput | Prisma.SubscribeWhereInput[];
    OR?: Prisma.SubscribeWhereInput[];
    NOT?: Prisma.SubscribeWhereInput | Prisma.SubscribeWhereInput[];
    courseId?: Prisma.StringFilter<"Subscribe"> | string;
    userId?: Prisma.StringFilter<"Subscribe"> | string;
    review?: Prisma.StringNullableFilter<"Subscribe"> | string | null;
    rating?: Prisma.FloatFilter<"Subscribe"> | number;
    price?: Prisma.FloatFilter<"Subscribe"> | number;
    currency?: Prisma.StringFilter<"Subscribe"> | string;
    createdAt?: Prisma.DateTimeFilter<"Subscribe"> | Date | string;
    course?: Prisma.XOR<Prisma.CourseScalarRelationFilter, Prisma.CourseWhereInput>;
    subscriber?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
}, "id" | "paymentSessionId" | "courseId_userId">;
export type SubscribeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    review?: Prisma.SortOrderInput | Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paymentSessionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SubscribeCountOrderByAggregateInput;
    _avg?: Prisma.SubscribeAvgOrderByAggregateInput;
    _max?: Prisma.SubscribeMaxOrderByAggregateInput;
    _min?: Prisma.SubscribeMinOrderByAggregateInput;
    _sum?: Prisma.SubscribeSumOrderByAggregateInput;
};
export type SubscribeScalarWhereWithAggregatesInput = {
    AND?: Prisma.SubscribeScalarWhereWithAggregatesInput | Prisma.SubscribeScalarWhereWithAggregatesInput[];
    OR?: Prisma.SubscribeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SubscribeScalarWhereWithAggregatesInput | Prisma.SubscribeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Subscribe"> | string;
    courseId?: Prisma.StringWithAggregatesFilter<"Subscribe"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Subscribe"> | string;
    review?: Prisma.StringNullableWithAggregatesFilter<"Subscribe"> | string | null;
    rating?: Prisma.FloatWithAggregatesFilter<"Subscribe"> | number;
    price?: Prisma.FloatWithAggregatesFilter<"Subscribe"> | number;
    currency?: Prisma.StringWithAggregatesFilter<"Subscribe"> | string;
    paymentSessionId?: Prisma.StringNullableWithAggregatesFilter<"Subscribe"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Subscribe"> | Date | string;
};
export type SubscribeCreateInput = {
    id?: string;
    review?: string | null;
    rating?: number;
    price?: number;
    currency?: string;
    paymentSessionId?: string | null;
    createdAt?: Date | string;
    course: Prisma.CourseCreateNestedOneWithoutSubscribersInput;
    subscriber: Prisma.UsersCreateNestedOneWithoutSubscribeInput;
};
export type SubscribeUncheckedCreateInput = {
    id?: string;
    courseId: string;
    userId: string;
    review?: string | null;
    rating?: number;
    price?: number;
    currency?: string;
    paymentSessionId?: string | null;
    createdAt?: Date | string;
};
export type SubscribeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentSessionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUpdateOneRequiredWithoutSubscribersNestedInput;
    subscriber?: Prisma.UsersUpdateOneRequiredWithoutSubscribeNestedInput;
};
export type SubscribeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentSessionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubscribeCreateManyInput = {
    id?: string;
    courseId: string;
    userId: string;
    review?: string | null;
    rating?: number;
    price?: number;
    currency?: string;
    paymentSessionId?: string | null;
    createdAt?: Date | string;
};
export type SubscribeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentSessionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubscribeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentSessionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubscribeListRelationFilter = {
    every?: Prisma.SubscribeWhereInput;
    some?: Prisma.SubscribeWhereInput;
    none?: Prisma.SubscribeWhereInput;
};
export type SubscribeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SubscribeCourseIdUserIdCompoundUniqueInput = {
    courseId: string;
    userId: string;
};
export type SubscribeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    review?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paymentSessionId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SubscribeAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
};
export type SubscribeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    review?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paymentSessionId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SubscribeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    review?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    paymentSessionId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SubscribeSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
};
export type SubscribeCreateNestedManyWithoutSubscriberInput = {
    create?: Prisma.XOR<Prisma.SubscribeCreateWithoutSubscriberInput, Prisma.SubscribeUncheckedCreateWithoutSubscriberInput> | Prisma.SubscribeCreateWithoutSubscriberInput[] | Prisma.SubscribeUncheckedCreateWithoutSubscriberInput[];
    connectOrCreate?: Prisma.SubscribeCreateOrConnectWithoutSubscriberInput | Prisma.SubscribeCreateOrConnectWithoutSubscriberInput[];
    createMany?: Prisma.SubscribeCreateManySubscriberInputEnvelope;
    connect?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
};
export type SubscribeUncheckedCreateNestedManyWithoutSubscriberInput = {
    create?: Prisma.XOR<Prisma.SubscribeCreateWithoutSubscriberInput, Prisma.SubscribeUncheckedCreateWithoutSubscriberInput> | Prisma.SubscribeCreateWithoutSubscriberInput[] | Prisma.SubscribeUncheckedCreateWithoutSubscriberInput[];
    connectOrCreate?: Prisma.SubscribeCreateOrConnectWithoutSubscriberInput | Prisma.SubscribeCreateOrConnectWithoutSubscriberInput[];
    createMany?: Prisma.SubscribeCreateManySubscriberInputEnvelope;
    connect?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
};
export type SubscribeUpdateManyWithoutSubscriberNestedInput = {
    create?: Prisma.XOR<Prisma.SubscribeCreateWithoutSubscriberInput, Prisma.SubscribeUncheckedCreateWithoutSubscriberInput> | Prisma.SubscribeCreateWithoutSubscriberInput[] | Prisma.SubscribeUncheckedCreateWithoutSubscriberInput[];
    connectOrCreate?: Prisma.SubscribeCreateOrConnectWithoutSubscriberInput | Prisma.SubscribeCreateOrConnectWithoutSubscriberInput[];
    upsert?: Prisma.SubscribeUpsertWithWhereUniqueWithoutSubscriberInput | Prisma.SubscribeUpsertWithWhereUniqueWithoutSubscriberInput[];
    createMany?: Prisma.SubscribeCreateManySubscriberInputEnvelope;
    set?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    disconnect?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    delete?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    connect?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    update?: Prisma.SubscribeUpdateWithWhereUniqueWithoutSubscriberInput | Prisma.SubscribeUpdateWithWhereUniqueWithoutSubscriberInput[];
    updateMany?: Prisma.SubscribeUpdateManyWithWhereWithoutSubscriberInput | Prisma.SubscribeUpdateManyWithWhereWithoutSubscriberInput[];
    deleteMany?: Prisma.SubscribeScalarWhereInput | Prisma.SubscribeScalarWhereInput[];
};
export type SubscribeUncheckedUpdateManyWithoutSubscriberNestedInput = {
    create?: Prisma.XOR<Prisma.SubscribeCreateWithoutSubscriberInput, Prisma.SubscribeUncheckedCreateWithoutSubscriberInput> | Prisma.SubscribeCreateWithoutSubscriberInput[] | Prisma.SubscribeUncheckedCreateWithoutSubscriberInput[];
    connectOrCreate?: Prisma.SubscribeCreateOrConnectWithoutSubscriberInput | Prisma.SubscribeCreateOrConnectWithoutSubscriberInput[];
    upsert?: Prisma.SubscribeUpsertWithWhereUniqueWithoutSubscriberInput | Prisma.SubscribeUpsertWithWhereUniqueWithoutSubscriberInput[];
    createMany?: Prisma.SubscribeCreateManySubscriberInputEnvelope;
    set?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    disconnect?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    delete?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    connect?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    update?: Prisma.SubscribeUpdateWithWhereUniqueWithoutSubscriberInput | Prisma.SubscribeUpdateWithWhereUniqueWithoutSubscriberInput[];
    updateMany?: Prisma.SubscribeUpdateManyWithWhereWithoutSubscriberInput | Prisma.SubscribeUpdateManyWithWhereWithoutSubscriberInput[];
    deleteMany?: Prisma.SubscribeScalarWhereInput | Prisma.SubscribeScalarWhereInput[];
};
export type SubscribeCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.SubscribeCreateWithoutCourseInput, Prisma.SubscribeUncheckedCreateWithoutCourseInput> | Prisma.SubscribeCreateWithoutCourseInput[] | Prisma.SubscribeUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.SubscribeCreateOrConnectWithoutCourseInput | Prisma.SubscribeCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.SubscribeCreateManyCourseInputEnvelope;
    connect?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
};
export type SubscribeUncheckedCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.SubscribeCreateWithoutCourseInput, Prisma.SubscribeUncheckedCreateWithoutCourseInput> | Prisma.SubscribeCreateWithoutCourseInput[] | Prisma.SubscribeUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.SubscribeCreateOrConnectWithoutCourseInput | Prisma.SubscribeCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.SubscribeCreateManyCourseInputEnvelope;
    connect?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
};
export type SubscribeUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.SubscribeCreateWithoutCourseInput, Prisma.SubscribeUncheckedCreateWithoutCourseInput> | Prisma.SubscribeCreateWithoutCourseInput[] | Prisma.SubscribeUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.SubscribeCreateOrConnectWithoutCourseInput | Prisma.SubscribeCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.SubscribeUpsertWithWhereUniqueWithoutCourseInput | Prisma.SubscribeUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.SubscribeCreateManyCourseInputEnvelope;
    set?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    disconnect?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    delete?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    connect?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    update?: Prisma.SubscribeUpdateWithWhereUniqueWithoutCourseInput | Prisma.SubscribeUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.SubscribeUpdateManyWithWhereWithoutCourseInput | Prisma.SubscribeUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.SubscribeScalarWhereInput | Prisma.SubscribeScalarWhereInput[];
};
export type SubscribeUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.SubscribeCreateWithoutCourseInput, Prisma.SubscribeUncheckedCreateWithoutCourseInput> | Prisma.SubscribeCreateWithoutCourseInput[] | Prisma.SubscribeUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.SubscribeCreateOrConnectWithoutCourseInput | Prisma.SubscribeCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.SubscribeUpsertWithWhereUniqueWithoutCourseInput | Prisma.SubscribeUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.SubscribeCreateManyCourseInputEnvelope;
    set?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    disconnect?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    delete?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    connect?: Prisma.SubscribeWhereUniqueInput | Prisma.SubscribeWhereUniqueInput[];
    update?: Prisma.SubscribeUpdateWithWhereUniqueWithoutCourseInput | Prisma.SubscribeUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.SubscribeUpdateManyWithWhereWithoutCourseInput | Prisma.SubscribeUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.SubscribeScalarWhereInput | Prisma.SubscribeScalarWhereInput[];
};
export type SubscribeCreateWithoutSubscriberInput = {
    id?: string;
    review?: string | null;
    rating?: number;
    price?: number;
    currency?: string;
    paymentSessionId?: string | null;
    createdAt?: Date | string;
    course: Prisma.CourseCreateNestedOneWithoutSubscribersInput;
};
export type SubscribeUncheckedCreateWithoutSubscriberInput = {
    id?: string;
    courseId: string;
    review?: string | null;
    rating?: number;
    price?: number;
    currency?: string;
    paymentSessionId?: string | null;
    createdAt?: Date | string;
};
export type SubscribeCreateOrConnectWithoutSubscriberInput = {
    where: Prisma.SubscribeWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubscribeCreateWithoutSubscriberInput, Prisma.SubscribeUncheckedCreateWithoutSubscriberInput>;
};
export type SubscribeCreateManySubscriberInputEnvelope = {
    data: Prisma.SubscribeCreateManySubscriberInput | Prisma.SubscribeCreateManySubscriberInput[];
    skipDuplicates?: boolean;
};
export type SubscribeUpsertWithWhereUniqueWithoutSubscriberInput = {
    where: Prisma.SubscribeWhereUniqueInput;
    update: Prisma.XOR<Prisma.SubscribeUpdateWithoutSubscriberInput, Prisma.SubscribeUncheckedUpdateWithoutSubscriberInput>;
    create: Prisma.XOR<Prisma.SubscribeCreateWithoutSubscriberInput, Prisma.SubscribeUncheckedCreateWithoutSubscriberInput>;
};
export type SubscribeUpdateWithWhereUniqueWithoutSubscriberInput = {
    where: Prisma.SubscribeWhereUniqueInput;
    data: Prisma.XOR<Prisma.SubscribeUpdateWithoutSubscriberInput, Prisma.SubscribeUncheckedUpdateWithoutSubscriberInput>;
};
export type SubscribeUpdateManyWithWhereWithoutSubscriberInput = {
    where: Prisma.SubscribeScalarWhereInput;
    data: Prisma.XOR<Prisma.SubscribeUpdateManyMutationInput, Prisma.SubscribeUncheckedUpdateManyWithoutSubscriberInput>;
};
export type SubscribeScalarWhereInput = {
    AND?: Prisma.SubscribeScalarWhereInput | Prisma.SubscribeScalarWhereInput[];
    OR?: Prisma.SubscribeScalarWhereInput[];
    NOT?: Prisma.SubscribeScalarWhereInput | Prisma.SubscribeScalarWhereInput[];
    id?: Prisma.StringFilter<"Subscribe"> | string;
    courseId?: Prisma.StringFilter<"Subscribe"> | string;
    userId?: Prisma.StringFilter<"Subscribe"> | string;
    review?: Prisma.StringNullableFilter<"Subscribe"> | string | null;
    rating?: Prisma.FloatFilter<"Subscribe"> | number;
    price?: Prisma.FloatFilter<"Subscribe"> | number;
    currency?: Prisma.StringFilter<"Subscribe"> | string;
    paymentSessionId?: Prisma.StringNullableFilter<"Subscribe"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Subscribe"> | Date | string;
};
export type SubscribeCreateWithoutCourseInput = {
    id?: string;
    review?: string | null;
    rating?: number;
    price?: number;
    currency?: string;
    paymentSessionId?: string | null;
    createdAt?: Date | string;
    subscriber: Prisma.UsersCreateNestedOneWithoutSubscribeInput;
};
export type SubscribeUncheckedCreateWithoutCourseInput = {
    id?: string;
    userId: string;
    review?: string | null;
    rating?: number;
    price?: number;
    currency?: string;
    paymentSessionId?: string | null;
    createdAt?: Date | string;
};
export type SubscribeCreateOrConnectWithoutCourseInput = {
    where: Prisma.SubscribeWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubscribeCreateWithoutCourseInput, Prisma.SubscribeUncheckedCreateWithoutCourseInput>;
};
export type SubscribeCreateManyCourseInputEnvelope = {
    data: Prisma.SubscribeCreateManyCourseInput | Prisma.SubscribeCreateManyCourseInput[];
    skipDuplicates?: boolean;
};
export type SubscribeUpsertWithWhereUniqueWithoutCourseInput = {
    where: Prisma.SubscribeWhereUniqueInput;
    update: Prisma.XOR<Prisma.SubscribeUpdateWithoutCourseInput, Prisma.SubscribeUncheckedUpdateWithoutCourseInput>;
    create: Prisma.XOR<Prisma.SubscribeCreateWithoutCourseInput, Prisma.SubscribeUncheckedCreateWithoutCourseInput>;
};
export type SubscribeUpdateWithWhereUniqueWithoutCourseInput = {
    where: Prisma.SubscribeWhereUniqueInput;
    data: Prisma.XOR<Prisma.SubscribeUpdateWithoutCourseInput, Prisma.SubscribeUncheckedUpdateWithoutCourseInput>;
};
export type SubscribeUpdateManyWithWhereWithoutCourseInput = {
    where: Prisma.SubscribeScalarWhereInput;
    data: Prisma.XOR<Prisma.SubscribeUpdateManyMutationInput, Prisma.SubscribeUncheckedUpdateManyWithoutCourseInput>;
};
export type SubscribeCreateManySubscriberInput = {
    id?: string;
    courseId: string;
    review?: string | null;
    rating?: number;
    price?: number;
    currency?: string;
    paymentSessionId?: string | null;
    createdAt?: Date | string;
};
export type SubscribeUpdateWithoutSubscriberInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentSessionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUpdateOneRequiredWithoutSubscribersNestedInput;
};
export type SubscribeUncheckedUpdateWithoutSubscriberInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentSessionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubscribeUncheckedUpdateManyWithoutSubscriberInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentSessionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubscribeCreateManyCourseInput = {
    id?: string;
    userId: string;
    review?: string | null;
    rating?: number;
    price?: number;
    currency?: string;
    paymentSessionId?: string | null;
    createdAt?: Date | string;
};
export type SubscribeUpdateWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentSessionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    subscriber?: Prisma.UsersUpdateOneRequiredWithoutSubscribeNestedInput;
};
export type SubscribeUncheckedUpdateWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentSessionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubscribeUncheckedUpdateManyWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    review?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    price?: Prisma.FloatFieldUpdateOperationsInput | number;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    paymentSessionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SubscribeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    courseId?: boolean;
    userId?: boolean;
    review?: boolean;
    rating?: boolean;
    price?: boolean;
    currency?: boolean;
    paymentSessionId?: boolean;
    createdAt?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    subscriber?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subscribe"]>;
export type SubscribeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    courseId?: boolean;
    userId?: boolean;
    review?: boolean;
    rating?: boolean;
    price?: boolean;
    currency?: boolean;
    paymentSessionId?: boolean;
    createdAt?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    subscriber?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subscribe"]>;
export type SubscribeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    courseId?: boolean;
    userId?: boolean;
    review?: boolean;
    rating?: boolean;
    price?: boolean;
    currency?: boolean;
    paymentSessionId?: boolean;
    createdAt?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    subscriber?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["subscribe"]>;
export type SubscribeSelectScalar = {
    id?: boolean;
    courseId?: boolean;
    userId?: boolean;
    review?: boolean;
    rating?: boolean;
    price?: boolean;
    currency?: boolean;
    paymentSessionId?: boolean;
    createdAt?: boolean;
};
export type SubscribeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "courseId" | "userId" | "review" | "rating" | "price" | "currency" | "paymentSessionId" | "createdAt", ExtArgs["result"]["subscribe"]>;
export type SubscribeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    subscriber?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type SubscribeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    subscriber?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type SubscribeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    subscriber?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $SubscribePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Subscribe";
    objects: {
        course: Prisma.$CoursePayload<ExtArgs>;
        subscriber: Prisma.$UsersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        courseId: string;
        userId: string;
        review: string | null;
        rating: number;
        price: number;
        currency: string;
        paymentSessionId: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["subscribe"]>;
    composites: {};
};
export type SubscribeGetPayload<S extends boolean | null | undefined | SubscribeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SubscribePayload, S>;
export type SubscribeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SubscribeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SubscribeCountAggregateInputType | true;
};
export interface SubscribeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Subscribe'];
        meta: {
            name: 'Subscribe';
        };
    };
    findUnique<T extends SubscribeFindUniqueArgs>(args: Prisma.SelectSubset<T, SubscribeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SubscribeClient<runtime.Types.Result.GetResult<Prisma.$SubscribePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SubscribeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SubscribeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SubscribeClient<runtime.Types.Result.GetResult<Prisma.$SubscribePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SubscribeFindFirstArgs>(args?: Prisma.SelectSubset<T, SubscribeFindFirstArgs<ExtArgs>>): Prisma.Prisma__SubscribeClient<runtime.Types.Result.GetResult<Prisma.$SubscribePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SubscribeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SubscribeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SubscribeClient<runtime.Types.Result.GetResult<Prisma.$SubscribePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SubscribeFindManyArgs>(args?: Prisma.SelectSubset<T, SubscribeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubscribePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SubscribeCreateArgs>(args: Prisma.SelectSubset<T, SubscribeCreateArgs<ExtArgs>>): Prisma.Prisma__SubscribeClient<runtime.Types.Result.GetResult<Prisma.$SubscribePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SubscribeCreateManyArgs>(args?: Prisma.SelectSubset<T, SubscribeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SubscribeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SubscribeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubscribePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SubscribeDeleteArgs>(args: Prisma.SelectSubset<T, SubscribeDeleteArgs<ExtArgs>>): Prisma.Prisma__SubscribeClient<runtime.Types.Result.GetResult<Prisma.$SubscribePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SubscribeUpdateArgs>(args: Prisma.SelectSubset<T, SubscribeUpdateArgs<ExtArgs>>): Prisma.Prisma__SubscribeClient<runtime.Types.Result.GetResult<Prisma.$SubscribePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SubscribeDeleteManyArgs>(args?: Prisma.SelectSubset<T, SubscribeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SubscribeUpdateManyArgs>(args: Prisma.SelectSubset<T, SubscribeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SubscribeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SubscribeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SubscribePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SubscribeUpsertArgs>(args: Prisma.SelectSubset<T, SubscribeUpsertArgs<ExtArgs>>): Prisma.Prisma__SubscribeClient<runtime.Types.Result.GetResult<Prisma.$SubscribePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SubscribeCountArgs>(args?: Prisma.Subset<T, SubscribeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SubscribeCountAggregateOutputType> : number>;
    aggregate<T extends SubscribeAggregateArgs>(args: Prisma.Subset<T, SubscribeAggregateArgs>): Prisma.PrismaPromise<GetSubscribeAggregateType<T>>;
    groupBy<T extends SubscribeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SubscribeGroupByArgs['orderBy'];
    } : {
        orderBy?: SubscribeGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SubscribeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscribeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SubscribeFieldRefs;
}
export interface Prisma__SubscribeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    course<T extends Prisma.CourseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CourseDefaultArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    subscriber<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SubscribeFieldRefs {
    readonly id: Prisma.FieldRef<"Subscribe", 'String'>;
    readonly courseId: Prisma.FieldRef<"Subscribe", 'String'>;
    readonly userId: Prisma.FieldRef<"Subscribe", 'String'>;
    readonly review: Prisma.FieldRef<"Subscribe", 'String'>;
    readonly rating: Prisma.FieldRef<"Subscribe", 'Float'>;
    readonly price: Prisma.FieldRef<"Subscribe", 'Float'>;
    readonly currency: Prisma.FieldRef<"Subscribe", 'String'>;
    readonly paymentSessionId: Prisma.FieldRef<"Subscribe", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Subscribe", 'DateTime'>;
}
export type SubscribeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscribeSelect<ExtArgs> | null;
    omit?: Prisma.SubscribeOmit<ExtArgs> | null;
    include?: Prisma.SubscribeInclude<ExtArgs> | null;
    where: Prisma.SubscribeWhereUniqueInput;
};
export type SubscribeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscribeSelect<ExtArgs> | null;
    omit?: Prisma.SubscribeOmit<ExtArgs> | null;
    include?: Prisma.SubscribeInclude<ExtArgs> | null;
    where: Prisma.SubscribeWhereUniqueInput;
};
export type SubscribeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscribeSelect<ExtArgs> | null;
    omit?: Prisma.SubscribeOmit<ExtArgs> | null;
    include?: Prisma.SubscribeInclude<ExtArgs> | null;
    where?: Prisma.SubscribeWhereInput;
    orderBy?: Prisma.SubscribeOrderByWithRelationInput | Prisma.SubscribeOrderByWithRelationInput[];
    cursor?: Prisma.SubscribeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubscribeScalarFieldEnum | Prisma.SubscribeScalarFieldEnum[];
};
export type SubscribeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscribeSelect<ExtArgs> | null;
    omit?: Prisma.SubscribeOmit<ExtArgs> | null;
    include?: Prisma.SubscribeInclude<ExtArgs> | null;
    where?: Prisma.SubscribeWhereInput;
    orderBy?: Prisma.SubscribeOrderByWithRelationInput | Prisma.SubscribeOrderByWithRelationInput[];
    cursor?: Prisma.SubscribeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubscribeScalarFieldEnum | Prisma.SubscribeScalarFieldEnum[];
};
export type SubscribeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscribeSelect<ExtArgs> | null;
    omit?: Prisma.SubscribeOmit<ExtArgs> | null;
    include?: Prisma.SubscribeInclude<ExtArgs> | null;
    where?: Prisma.SubscribeWhereInput;
    orderBy?: Prisma.SubscribeOrderByWithRelationInput | Prisma.SubscribeOrderByWithRelationInput[];
    cursor?: Prisma.SubscribeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SubscribeScalarFieldEnum | Prisma.SubscribeScalarFieldEnum[];
};
export type SubscribeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscribeSelect<ExtArgs> | null;
    omit?: Prisma.SubscribeOmit<ExtArgs> | null;
    include?: Prisma.SubscribeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubscribeCreateInput, Prisma.SubscribeUncheckedCreateInput>;
};
export type SubscribeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SubscribeCreateManyInput | Prisma.SubscribeCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SubscribeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscribeSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SubscribeOmit<ExtArgs> | null;
    data: Prisma.SubscribeCreateManyInput | Prisma.SubscribeCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SubscribeIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SubscribeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscribeSelect<ExtArgs> | null;
    omit?: Prisma.SubscribeOmit<ExtArgs> | null;
    include?: Prisma.SubscribeInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubscribeUpdateInput, Prisma.SubscribeUncheckedUpdateInput>;
    where: Prisma.SubscribeWhereUniqueInput;
};
export type SubscribeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SubscribeUpdateManyMutationInput, Prisma.SubscribeUncheckedUpdateManyInput>;
    where?: Prisma.SubscribeWhereInput;
    limit?: number;
};
export type SubscribeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscribeSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SubscribeOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SubscribeUpdateManyMutationInput, Prisma.SubscribeUncheckedUpdateManyInput>;
    where?: Prisma.SubscribeWhereInput;
    limit?: number;
    include?: Prisma.SubscribeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SubscribeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscribeSelect<ExtArgs> | null;
    omit?: Prisma.SubscribeOmit<ExtArgs> | null;
    include?: Prisma.SubscribeInclude<ExtArgs> | null;
    where: Prisma.SubscribeWhereUniqueInput;
    create: Prisma.XOR<Prisma.SubscribeCreateInput, Prisma.SubscribeUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SubscribeUpdateInput, Prisma.SubscribeUncheckedUpdateInput>;
};
export type SubscribeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscribeSelect<ExtArgs> | null;
    omit?: Prisma.SubscribeOmit<ExtArgs> | null;
    include?: Prisma.SubscribeInclude<ExtArgs> | null;
    where: Prisma.SubscribeWhereUniqueInput;
};
export type SubscribeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SubscribeWhereInput;
    limit?: number;
};
export type SubscribeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SubscribeSelect<ExtArgs> | null;
    omit?: Prisma.SubscribeOmit<ExtArgs> | null;
    include?: Prisma.SubscribeInclude<ExtArgs> | null;
};
