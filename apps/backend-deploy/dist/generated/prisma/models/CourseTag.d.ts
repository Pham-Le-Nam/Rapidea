import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type CourseTagModel = runtime.Types.Result.DefaultSelection<Prisma.$CourseTagPayload>;
export type AggregateCourseTag = {
    _count: CourseTagCountAggregateOutputType | null;
    _avg: CourseTagAvgAggregateOutputType | null;
    _sum: CourseTagSumAggregateOutputType | null;
    _min: CourseTagMinAggregateOutputType | null;
    _max: CourseTagMaxAggregateOutputType | null;
};
export type CourseTagAvgAggregateOutputType = {
    score: number | null;
};
export type CourseTagSumAggregateOutputType = {
    score: number | null;
};
export type CourseTagMinAggregateOutputType = {
    courseId: string | null;
    tagId: string | null;
    isSuggested: boolean | null;
    score: number | null;
    createdAt: Date | null;
};
export type CourseTagMaxAggregateOutputType = {
    courseId: string | null;
    tagId: string | null;
    isSuggested: boolean | null;
    score: number | null;
    createdAt: Date | null;
};
export type CourseTagCountAggregateOutputType = {
    courseId: number;
    tagId: number;
    isSuggested: number;
    score: number;
    createdAt: number;
    _all: number;
};
export type CourseTagAvgAggregateInputType = {
    score?: true;
};
export type CourseTagSumAggregateInputType = {
    score?: true;
};
export type CourseTagMinAggregateInputType = {
    courseId?: true;
    tagId?: true;
    isSuggested?: true;
    score?: true;
    createdAt?: true;
};
export type CourseTagMaxAggregateInputType = {
    courseId?: true;
    tagId?: true;
    isSuggested?: true;
    score?: true;
    createdAt?: true;
};
export type CourseTagCountAggregateInputType = {
    courseId?: true;
    tagId?: true;
    isSuggested?: true;
    score?: true;
    createdAt?: true;
    _all?: true;
};
export type CourseTagAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CourseTagWhereInput;
    orderBy?: Prisma.CourseTagOrderByWithRelationInput | Prisma.CourseTagOrderByWithRelationInput[];
    cursor?: Prisma.CourseTagWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CourseTagCountAggregateInputType;
    _avg?: CourseTagAvgAggregateInputType;
    _sum?: CourseTagSumAggregateInputType;
    _min?: CourseTagMinAggregateInputType;
    _max?: CourseTagMaxAggregateInputType;
};
export type GetCourseTagAggregateType<T extends CourseTagAggregateArgs> = {
    [P in keyof T & keyof AggregateCourseTag]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCourseTag[P]> : Prisma.GetScalarType<T[P], AggregateCourseTag[P]>;
};
export type CourseTagGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CourseTagWhereInput;
    orderBy?: Prisma.CourseTagOrderByWithAggregationInput | Prisma.CourseTagOrderByWithAggregationInput[];
    by: Prisma.CourseTagScalarFieldEnum[] | Prisma.CourseTagScalarFieldEnum;
    having?: Prisma.CourseTagScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CourseTagCountAggregateInputType | true;
    _avg?: CourseTagAvgAggregateInputType;
    _sum?: CourseTagSumAggregateInputType;
    _min?: CourseTagMinAggregateInputType;
    _max?: CourseTagMaxAggregateInputType;
};
export type CourseTagGroupByOutputType = {
    courseId: string;
    tagId: string;
    isSuggested: boolean;
    score: number | null;
    createdAt: Date;
    _count: CourseTagCountAggregateOutputType | null;
    _avg: CourseTagAvgAggregateOutputType | null;
    _sum: CourseTagSumAggregateOutputType | null;
    _min: CourseTagMinAggregateOutputType | null;
    _max: CourseTagMaxAggregateOutputType | null;
};
export type GetCourseTagGroupByPayload<T extends CourseTagGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CourseTagGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CourseTagGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CourseTagGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CourseTagGroupByOutputType[P]>;
}>>;
export type CourseTagWhereInput = {
    AND?: Prisma.CourseTagWhereInput | Prisma.CourseTagWhereInput[];
    OR?: Prisma.CourseTagWhereInput[];
    NOT?: Prisma.CourseTagWhereInput | Prisma.CourseTagWhereInput[];
    courseId?: Prisma.StringFilter<"CourseTag"> | string;
    tagId?: Prisma.StringFilter<"CourseTag"> | string;
    isSuggested?: Prisma.BoolFilter<"CourseTag"> | boolean;
    score?: Prisma.FloatNullableFilter<"CourseTag"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"CourseTag"> | Date | string;
    course?: Prisma.XOR<Prisma.CourseScalarRelationFilter, Prisma.CourseWhereInput>;
    tag?: Prisma.XOR<Prisma.TagScalarRelationFilter, Prisma.TagWhereInput>;
};
export type CourseTagOrderByWithRelationInput = {
    courseId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    course?: Prisma.CourseOrderByWithRelationInput;
    tag?: Prisma.TagOrderByWithRelationInput;
};
export type CourseTagWhereUniqueInput = Prisma.AtLeast<{
    courseId_tagId?: Prisma.CourseTagCourseIdTagIdCompoundUniqueInput;
    AND?: Prisma.CourseTagWhereInput | Prisma.CourseTagWhereInput[];
    OR?: Prisma.CourseTagWhereInput[];
    NOT?: Prisma.CourseTagWhereInput | Prisma.CourseTagWhereInput[];
    courseId?: Prisma.StringFilter<"CourseTag"> | string;
    tagId?: Prisma.StringFilter<"CourseTag"> | string;
    isSuggested?: Prisma.BoolFilter<"CourseTag"> | boolean;
    score?: Prisma.FloatNullableFilter<"CourseTag"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"CourseTag"> | Date | string;
    course?: Prisma.XOR<Prisma.CourseScalarRelationFilter, Prisma.CourseWhereInput>;
    tag?: Prisma.XOR<Prisma.TagScalarRelationFilter, Prisma.TagWhereInput>;
}, "courseId_tagId">;
export type CourseTagOrderByWithAggregationInput = {
    courseId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.CourseTagCountOrderByAggregateInput;
    _avg?: Prisma.CourseTagAvgOrderByAggregateInput;
    _max?: Prisma.CourseTagMaxOrderByAggregateInput;
    _min?: Prisma.CourseTagMinOrderByAggregateInput;
    _sum?: Prisma.CourseTagSumOrderByAggregateInput;
};
export type CourseTagScalarWhereWithAggregatesInput = {
    AND?: Prisma.CourseTagScalarWhereWithAggregatesInput | Prisma.CourseTagScalarWhereWithAggregatesInput[];
    OR?: Prisma.CourseTagScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CourseTagScalarWhereWithAggregatesInput | Prisma.CourseTagScalarWhereWithAggregatesInput[];
    courseId?: Prisma.StringWithAggregatesFilter<"CourseTag"> | string;
    tagId?: Prisma.StringWithAggregatesFilter<"CourseTag"> | string;
    isSuggested?: Prisma.BoolWithAggregatesFilter<"CourseTag"> | boolean;
    score?: Prisma.FloatNullableWithAggregatesFilter<"CourseTag"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CourseTag"> | Date | string;
};
export type CourseTagCreateInput = {
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
    course: Prisma.CourseCreateNestedOneWithoutTagsInput;
    tag: Prisma.TagCreateNestedOneWithoutCoursesInput;
};
export type CourseTagUncheckedCreateInput = {
    courseId: string;
    tagId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type CourseTagUpdateInput = {
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUpdateOneRequiredWithoutTagsNestedInput;
    tag?: Prisma.TagUpdateOneRequiredWithoutCoursesNestedInput;
};
export type CourseTagUncheckedUpdateInput = {
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseTagCreateManyInput = {
    courseId: string;
    tagId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type CourseTagUpdateManyMutationInput = {
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseTagUncheckedUpdateManyInput = {
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseTagListRelationFilter = {
    every?: Prisma.CourseTagWhereInput;
    some?: Prisma.CourseTagWhereInput;
    none?: Prisma.CourseTagWhereInput;
};
export type CourseTagOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CourseTagCourseIdTagIdCompoundUniqueInput = {
    courseId: string;
    tagId: string;
};
export type CourseTagCountOrderByAggregateInput = {
    courseId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CourseTagAvgOrderByAggregateInput = {
    score?: Prisma.SortOrder;
};
export type CourseTagMaxOrderByAggregateInput = {
    courseId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CourseTagMinOrderByAggregateInput = {
    courseId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type CourseTagSumOrderByAggregateInput = {
    score?: Prisma.SortOrder;
};
export type CourseTagCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.CourseTagCreateWithoutCourseInput, Prisma.CourseTagUncheckedCreateWithoutCourseInput> | Prisma.CourseTagCreateWithoutCourseInput[] | Prisma.CourseTagUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.CourseTagCreateOrConnectWithoutCourseInput | Prisma.CourseTagCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.CourseTagCreateManyCourseInputEnvelope;
    connect?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
};
export type CourseTagUncheckedCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.CourseTagCreateWithoutCourseInput, Prisma.CourseTagUncheckedCreateWithoutCourseInput> | Prisma.CourseTagCreateWithoutCourseInput[] | Prisma.CourseTagUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.CourseTagCreateOrConnectWithoutCourseInput | Prisma.CourseTagCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.CourseTagCreateManyCourseInputEnvelope;
    connect?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
};
export type CourseTagUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.CourseTagCreateWithoutCourseInput, Prisma.CourseTagUncheckedCreateWithoutCourseInput> | Prisma.CourseTagCreateWithoutCourseInput[] | Prisma.CourseTagUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.CourseTagCreateOrConnectWithoutCourseInput | Prisma.CourseTagCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.CourseTagUpsertWithWhereUniqueWithoutCourseInput | Prisma.CourseTagUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.CourseTagCreateManyCourseInputEnvelope;
    set?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    disconnect?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    delete?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    connect?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    update?: Prisma.CourseTagUpdateWithWhereUniqueWithoutCourseInput | Prisma.CourseTagUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.CourseTagUpdateManyWithWhereWithoutCourseInput | Prisma.CourseTagUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.CourseTagScalarWhereInput | Prisma.CourseTagScalarWhereInput[];
};
export type CourseTagUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.CourseTagCreateWithoutCourseInput, Prisma.CourseTagUncheckedCreateWithoutCourseInput> | Prisma.CourseTagCreateWithoutCourseInput[] | Prisma.CourseTagUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.CourseTagCreateOrConnectWithoutCourseInput | Prisma.CourseTagCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.CourseTagUpsertWithWhereUniqueWithoutCourseInput | Prisma.CourseTagUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.CourseTagCreateManyCourseInputEnvelope;
    set?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    disconnect?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    delete?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    connect?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    update?: Prisma.CourseTagUpdateWithWhereUniqueWithoutCourseInput | Prisma.CourseTagUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.CourseTagUpdateManyWithWhereWithoutCourseInput | Prisma.CourseTagUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.CourseTagScalarWhereInput | Prisma.CourseTagScalarWhereInput[];
};
export type CourseTagCreateNestedManyWithoutTagInput = {
    create?: Prisma.XOR<Prisma.CourseTagCreateWithoutTagInput, Prisma.CourseTagUncheckedCreateWithoutTagInput> | Prisma.CourseTagCreateWithoutTagInput[] | Prisma.CourseTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.CourseTagCreateOrConnectWithoutTagInput | Prisma.CourseTagCreateOrConnectWithoutTagInput[];
    createMany?: Prisma.CourseTagCreateManyTagInputEnvelope;
    connect?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
};
export type CourseTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: Prisma.XOR<Prisma.CourseTagCreateWithoutTagInput, Prisma.CourseTagUncheckedCreateWithoutTagInput> | Prisma.CourseTagCreateWithoutTagInput[] | Prisma.CourseTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.CourseTagCreateOrConnectWithoutTagInput | Prisma.CourseTagCreateOrConnectWithoutTagInput[];
    createMany?: Prisma.CourseTagCreateManyTagInputEnvelope;
    connect?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
};
export type CourseTagUpdateManyWithoutTagNestedInput = {
    create?: Prisma.XOR<Prisma.CourseTagCreateWithoutTagInput, Prisma.CourseTagUncheckedCreateWithoutTagInput> | Prisma.CourseTagCreateWithoutTagInput[] | Prisma.CourseTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.CourseTagCreateOrConnectWithoutTagInput | Prisma.CourseTagCreateOrConnectWithoutTagInput[];
    upsert?: Prisma.CourseTagUpsertWithWhereUniqueWithoutTagInput | Prisma.CourseTagUpsertWithWhereUniqueWithoutTagInput[];
    createMany?: Prisma.CourseTagCreateManyTagInputEnvelope;
    set?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    disconnect?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    delete?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    connect?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    update?: Prisma.CourseTagUpdateWithWhereUniqueWithoutTagInput | Prisma.CourseTagUpdateWithWhereUniqueWithoutTagInput[];
    updateMany?: Prisma.CourseTagUpdateManyWithWhereWithoutTagInput | Prisma.CourseTagUpdateManyWithWhereWithoutTagInput[];
    deleteMany?: Prisma.CourseTagScalarWhereInput | Prisma.CourseTagScalarWhereInput[];
};
export type CourseTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: Prisma.XOR<Prisma.CourseTagCreateWithoutTagInput, Prisma.CourseTagUncheckedCreateWithoutTagInput> | Prisma.CourseTagCreateWithoutTagInput[] | Prisma.CourseTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.CourseTagCreateOrConnectWithoutTagInput | Prisma.CourseTagCreateOrConnectWithoutTagInput[];
    upsert?: Prisma.CourseTagUpsertWithWhereUniqueWithoutTagInput | Prisma.CourseTagUpsertWithWhereUniqueWithoutTagInput[];
    createMany?: Prisma.CourseTagCreateManyTagInputEnvelope;
    set?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    disconnect?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    delete?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    connect?: Prisma.CourseTagWhereUniqueInput | Prisma.CourseTagWhereUniqueInput[];
    update?: Prisma.CourseTagUpdateWithWhereUniqueWithoutTagInput | Prisma.CourseTagUpdateWithWhereUniqueWithoutTagInput[];
    updateMany?: Prisma.CourseTagUpdateManyWithWhereWithoutTagInput | Prisma.CourseTagUpdateManyWithWhereWithoutTagInput[];
    deleteMany?: Prisma.CourseTagScalarWhereInput | Prisma.CourseTagScalarWhereInput[];
};
export type CourseTagCreateWithoutCourseInput = {
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
    tag: Prisma.TagCreateNestedOneWithoutCoursesInput;
};
export type CourseTagUncheckedCreateWithoutCourseInput = {
    tagId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type CourseTagCreateOrConnectWithoutCourseInput = {
    where: Prisma.CourseTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.CourseTagCreateWithoutCourseInput, Prisma.CourseTagUncheckedCreateWithoutCourseInput>;
};
export type CourseTagCreateManyCourseInputEnvelope = {
    data: Prisma.CourseTagCreateManyCourseInput | Prisma.CourseTagCreateManyCourseInput[];
    skipDuplicates?: boolean;
};
export type CourseTagUpsertWithWhereUniqueWithoutCourseInput = {
    where: Prisma.CourseTagWhereUniqueInput;
    update: Prisma.XOR<Prisma.CourseTagUpdateWithoutCourseInput, Prisma.CourseTagUncheckedUpdateWithoutCourseInput>;
    create: Prisma.XOR<Prisma.CourseTagCreateWithoutCourseInput, Prisma.CourseTagUncheckedCreateWithoutCourseInput>;
};
export type CourseTagUpdateWithWhereUniqueWithoutCourseInput = {
    where: Prisma.CourseTagWhereUniqueInput;
    data: Prisma.XOR<Prisma.CourseTagUpdateWithoutCourseInput, Prisma.CourseTagUncheckedUpdateWithoutCourseInput>;
};
export type CourseTagUpdateManyWithWhereWithoutCourseInput = {
    where: Prisma.CourseTagScalarWhereInput;
    data: Prisma.XOR<Prisma.CourseTagUpdateManyMutationInput, Prisma.CourseTagUncheckedUpdateManyWithoutCourseInput>;
};
export type CourseTagScalarWhereInput = {
    AND?: Prisma.CourseTagScalarWhereInput | Prisma.CourseTagScalarWhereInput[];
    OR?: Prisma.CourseTagScalarWhereInput[];
    NOT?: Prisma.CourseTagScalarWhereInput | Prisma.CourseTagScalarWhereInput[];
    courseId?: Prisma.StringFilter<"CourseTag"> | string;
    tagId?: Prisma.StringFilter<"CourseTag"> | string;
    isSuggested?: Prisma.BoolFilter<"CourseTag"> | boolean;
    score?: Prisma.FloatNullableFilter<"CourseTag"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"CourseTag"> | Date | string;
};
export type CourseTagCreateWithoutTagInput = {
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
    course: Prisma.CourseCreateNestedOneWithoutTagsInput;
};
export type CourseTagUncheckedCreateWithoutTagInput = {
    courseId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type CourseTagCreateOrConnectWithoutTagInput = {
    where: Prisma.CourseTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.CourseTagCreateWithoutTagInput, Prisma.CourseTagUncheckedCreateWithoutTagInput>;
};
export type CourseTagCreateManyTagInputEnvelope = {
    data: Prisma.CourseTagCreateManyTagInput | Prisma.CourseTagCreateManyTagInput[];
    skipDuplicates?: boolean;
};
export type CourseTagUpsertWithWhereUniqueWithoutTagInput = {
    where: Prisma.CourseTagWhereUniqueInput;
    update: Prisma.XOR<Prisma.CourseTagUpdateWithoutTagInput, Prisma.CourseTagUncheckedUpdateWithoutTagInput>;
    create: Prisma.XOR<Prisma.CourseTagCreateWithoutTagInput, Prisma.CourseTagUncheckedCreateWithoutTagInput>;
};
export type CourseTagUpdateWithWhereUniqueWithoutTagInput = {
    where: Prisma.CourseTagWhereUniqueInput;
    data: Prisma.XOR<Prisma.CourseTagUpdateWithoutTagInput, Prisma.CourseTagUncheckedUpdateWithoutTagInput>;
};
export type CourseTagUpdateManyWithWhereWithoutTagInput = {
    where: Prisma.CourseTagScalarWhereInput;
    data: Prisma.XOR<Prisma.CourseTagUpdateManyMutationInput, Prisma.CourseTagUncheckedUpdateManyWithoutTagInput>;
};
export type CourseTagCreateManyCourseInput = {
    tagId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type CourseTagUpdateWithoutCourseInput = {
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tag?: Prisma.TagUpdateOneRequiredWithoutCoursesNestedInput;
};
export type CourseTagUncheckedUpdateWithoutCourseInput = {
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseTagUncheckedUpdateManyWithoutCourseInput = {
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseTagCreateManyTagInput = {
    courseId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type CourseTagUpdateWithoutTagInput = {
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUpdateOneRequiredWithoutTagsNestedInput;
};
export type CourseTagUncheckedUpdateWithoutTagInput = {
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseTagUncheckedUpdateManyWithoutTagInput = {
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CourseTagSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    courseId?: boolean;
    tagId?: boolean;
    isSuggested?: boolean;
    score?: boolean;
    createdAt?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["courseTag"]>;
export type CourseTagSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    courseId?: boolean;
    tagId?: boolean;
    isSuggested?: boolean;
    score?: boolean;
    createdAt?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["courseTag"]>;
export type CourseTagSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    courseId?: boolean;
    tagId?: boolean;
    isSuggested?: boolean;
    score?: boolean;
    createdAt?: boolean;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["courseTag"]>;
export type CourseTagSelectScalar = {
    courseId?: boolean;
    tagId?: boolean;
    isSuggested?: boolean;
    score?: boolean;
    createdAt?: boolean;
};
export type CourseTagOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"courseId" | "tagId" | "isSuggested" | "score" | "createdAt", ExtArgs["result"]["courseTag"]>;
export type CourseTagInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type CourseTagIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type CourseTagIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type $CourseTagPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CourseTag";
    objects: {
        course: Prisma.$CoursePayload<ExtArgs>;
        tag: Prisma.$TagPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        courseId: string;
        tagId: string;
        isSuggested: boolean;
        score: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["courseTag"]>;
    composites: {};
};
export type CourseTagGetPayload<S extends boolean | null | undefined | CourseTagDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CourseTagPayload, S>;
export type CourseTagCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CourseTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CourseTagCountAggregateInputType | true;
};
export interface CourseTagDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CourseTag'];
        meta: {
            name: 'CourseTag';
        };
    };
    findUnique<T extends CourseTagFindUniqueArgs>(args: Prisma.SelectSubset<T, CourseTagFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CourseTagClient<runtime.Types.Result.GetResult<Prisma.$CourseTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CourseTagFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CourseTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CourseTagClient<runtime.Types.Result.GetResult<Prisma.$CourseTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CourseTagFindFirstArgs>(args?: Prisma.SelectSubset<T, CourseTagFindFirstArgs<ExtArgs>>): Prisma.Prisma__CourseTagClient<runtime.Types.Result.GetResult<Prisma.$CourseTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CourseTagFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CourseTagFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CourseTagClient<runtime.Types.Result.GetResult<Prisma.$CourseTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CourseTagFindManyArgs>(args?: Prisma.SelectSubset<T, CourseTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CourseTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CourseTagCreateArgs>(args: Prisma.SelectSubset<T, CourseTagCreateArgs<ExtArgs>>): Prisma.Prisma__CourseTagClient<runtime.Types.Result.GetResult<Prisma.$CourseTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CourseTagCreateManyArgs>(args?: Prisma.SelectSubset<T, CourseTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CourseTagCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CourseTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CourseTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CourseTagDeleteArgs>(args: Prisma.SelectSubset<T, CourseTagDeleteArgs<ExtArgs>>): Prisma.Prisma__CourseTagClient<runtime.Types.Result.GetResult<Prisma.$CourseTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CourseTagUpdateArgs>(args: Prisma.SelectSubset<T, CourseTagUpdateArgs<ExtArgs>>): Prisma.Prisma__CourseTagClient<runtime.Types.Result.GetResult<Prisma.$CourseTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CourseTagDeleteManyArgs>(args?: Prisma.SelectSubset<T, CourseTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CourseTagUpdateManyArgs>(args: Prisma.SelectSubset<T, CourseTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CourseTagUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CourseTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CourseTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CourseTagUpsertArgs>(args: Prisma.SelectSubset<T, CourseTagUpsertArgs<ExtArgs>>): Prisma.Prisma__CourseTagClient<runtime.Types.Result.GetResult<Prisma.$CourseTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CourseTagCountArgs>(args?: Prisma.Subset<T, CourseTagCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CourseTagCountAggregateOutputType> : number>;
    aggregate<T extends CourseTagAggregateArgs>(args: Prisma.Subset<T, CourseTagAggregateArgs>): Prisma.PrismaPromise<GetCourseTagAggregateType<T>>;
    groupBy<T extends CourseTagGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CourseTagGroupByArgs['orderBy'];
    } : {
        orderBy?: CourseTagGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CourseTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCourseTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CourseTagFieldRefs;
}
export interface Prisma__CourseTagClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    course<T extends Prisma.CourseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CourseDefaultArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tag<T extends Prisma.TagDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TagDefaultArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CourseTagFieldRefs {
    readonly courseId: Prisma.FieldRef<"CourseTag", 'String'>;
    readonly tagId: Prisma.FieldRef<"CourseTag", 'String'>;
    readonly isSuggested: Prisma.FieldRef<"CourseTag", 'Boolean'>;
    readonly score: Prisma.FieldRef<"CourseTag", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"CourseTag", 'DateTime'>;
}
export type CourseTagFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseTagSelect<ExtArgs> | null;
    omit?: Prisma.CourseTagOmit<ExtArgs> | null;
    include?: Prisma.CourseTagInclude<ExtArgs> | null;
    where: Prisma.CourseTagWhereUniqueInput;
};
export type CourseTagFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseTagSelect<ExtArgs> | null;
    omit?: Prisma.CourseTagOmit<ExtArgs> | null;
    include?: Prisma.CourseTagInclude<ExtArgs> | null;
    where: Prisma.CourseTagWhereUniqueInput;
};
export type CourseTagFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseTagSelect<ExtArgs> | null;
    omit?: Prisma.CourseTagOmit<ExtArgs> | null;
    include?: Prisma.CourseTagInclude<ExtArgs> | null;
    where?: Prisma.CourseTagWhereInput;
    orderBy?: Prisma.CourseTagOrderByWithRelationInput | Prisma.CourseTagOrderByWithRelationInput[];
    cursor?: Prisma.CourseTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CourseTagScalarFieldEnum | Prisma.CourseTagScalarFieldEnum[];
};
export type CourseTagFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseTagSelect<ExtArgs> | null;
    omit?: Prisma.CourseTagOmit<ExtArgs> | null;
    include?: Prisma.CourseTagInclude<ExtArgs> | null;
    where?: Prisma.CourseTagWhereInput;
    orderBy?: Prisma.CourseTagOrderByWithRelationInput | Prisma.CourseTagOrderByWithRelationInput[];
    cursor?: Prisma.CourseTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CourseTagScalarFieldEnum | Prisma.CourseTagScalarFieldEnum[];
};
export type CourseTagFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseTagSelect<ExtArgs> | null;
    omit?: Prisma.CourseTagOmit<ExtArgs> | null;
    include?: Prisma.CourseTagInclude<ExtArgs> | null;
    where?: Prisma.CourseTagWhereInput;
    orderBy?: Prisma.CourseTagOrderByWithRelationInput | Prisma.CourseTagOrderByWithRelationInput[];
    cursor?: Prisma.CourseTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CourseTagScalarFieldEnum | Prisma.CourseTagScalarFieldEnum[];
};
export type CourseTagCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseTagSelect<ExtArgs> | null;
    omit?: Prisma.CourseTagOmit<ExtArgs> | null;
    include?: Prisma.CourseTagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CourseTagCreateInput, Prisma.CourseTagUncheckedCreateInput>;
};
export type CourseTagCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CourseTagCreateManyInput | Prisma.CourseTagCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CourseTagCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseTagSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CourseTagOmit<ExtArgs> | null;
    data: Prisma.CourseTagCreateManyInput | Prisma.CourseTagCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CourseTagIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CourseTagUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseTagSelect<ExtArgs> | null;
    omit?: Prisma.CourseTagOmit<ExtArgs> | null;
    include?: Prisma.CourseTagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CourseTagUpdateInput, Prisma.CourseTagUncheckedUpdateInput>;
    where: Prisma.CourseTagWhereUniqueInput;
};
export type CourseTagUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CourseTagUpdateManyMutationInput, Prisma.CourseTagUncheckedUpdateManyInput>;
    where?: Prisma.CourseTagWhereInput;
    limit?: number;
};
export type CourseTagUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseTagSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CourseTagOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CourseTagUpdateManyMutationInput, Prisma.CourseTagUncheckedUpdateManyInput>;
    where?: Prisma.CourseTagWhereInput;
    limit?: number;
    include?: Prisma.CourseTagIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CourseTagUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseTagSelect<ExtArgs> | null;
    omit?: Prisma.CourseTagOmit<ExtArgs> | null;
    include?: Prisma.CourseTagInclude<ExtArgs> | null;
    where: Prisma.CourseTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.CourseTagCreateInput, Prisma.CourseTagUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CourseTagUpdateInput, Prisma.CourseTagUncheckedUpdateInput>;
};
export type CourseTagDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseTagSelect<ExtArgs> | null;
    omit?: Prisma.CourseTagOmit<ExtArgs> | null;
    include?: Prisma.CourseTagInclude<ExtArgs> | null;
    where: Prisma.CourseTagWhereUniqueInput;
};
export type CourseTagDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CourseTagWhereInput;
    limit?: number;
};
export type CourseTagDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseTagSelect<ExtArgs> | null;
    omit?: Prisma.CourseTagOmit<ExtArgs> | null;
    include?: Prisma.CourseTagInclude<ExtArgs> | null;
};
