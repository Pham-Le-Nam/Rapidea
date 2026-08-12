import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type EducationModel = runtime.Types.Result.DefaultSelection<Prisma.$EducationPayload>;
export type AggregateEducation = {
    _count: EducationCountAggregateOutputType | null;
    _avg: EducationAvgAggregateOutputType | null;
    _sum: EducationSumAggregateOutputType | null;
    _min: EducationMinAggregateOutputType | null;
    _max: EducationMaxAggregateOutputType | null;
};
export type EducationAvgAggregateOutputType = {
    order: number | null;
    logoId: number | null;
};
export type EducationSumAggregateOutputType = {
    order: number | null;
    logoId: number | null;
};
export type EducationMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    major: string | null;
    degree: string | null;
    startedAt: Date | null;
    endedAt: Date | null;
    location: string | null;
    achievement: string | null;
    order: number | null;
    userId: string | null;
    logoId: number | null;
    createdAt: Date | null;
};
export type EducationMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    major: string | null;
    degree: string | null;
    startedAt: Date | null;
    endedAt: Date | null;
    location: string | null;
    achievement: string | null;
    order: number | null;
    userId: string | null;
    logoId: number | null;
    createdAt: Date | null;
};
export type EducationCountAggregateOutputType = {
    id: number;
    name: number;
    major: number;
    degree: number;
    startedAt: number;
    endedAt: number;
    location: number;
    achievement: number;
    order: number;
    userId: number;
    logoId: number;
    createdAt: number;
    _all: number;
};
export type EducationAvgAggregateInputType = {
    order?: true;
    logoId?: true;
};
export type EducationSumAggregateInputType = {
    order?: true;
    logoId?: true;
};
export type EducationMinAggregateInputType = {
    id?: true;
    name?: true;
    major?: true;
    degree?: true;
    startedAt?: true;
    endedAt?: true;
    location?: true;
    achievement?: true;
    order?: true;
    userId?: true;
    logoId?: true;
    createdAt?: true;
};
export type EducationMaxAggregateInputType = {
    id?: true;
    name?: true;
    major?: true;
    degree?: true;
    startedAt?: true;
    endedAt?: true;
    location?: true;
    achievement?: true;
    order?: true;
    userId?: true;
    logoId?: true;
    createdAt?: true;
};
export type EducationCountAggregateInputType = {
    id?: true;
    name?: true;
    major?: true;
    degree?: true;
    startedAt?: true;
    endedAt?: true;
    location?: true;
    achievement?: true;
    order?: true;
    userId?: true;
    logoId?: true;
    createdAt?: true;
    _all?: true;
};
export type EducationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EducationWhereInput;
    orderBy?: Prisma.EducationOrderByWithRelationInput | Prisma.EducationOrderByWithRelationInput[];
    cursor?: Prisma.EducationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EducationCountAggregateInputType;
    _avg?: EducationAvgAggregateInputType;
    _sum?: EducationSumAggregateInputType;
    _min?: EducationMinAggregateInputType;
    _max?: EducationMaxAggregateInputType;
};
export type GetEducationAggregateType<T extends EducationAggregateArgs> = {
    [P in keyof T & keyof AggregateEducation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEducation[P]> : Prisma.GetScalarType<T[P], AggregateEducation[P]>;
};
export type EducationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EducationWhereInput;
    orderBy?: Prisma.EducationOrderByWithAggregationInput | Prisma.EducationOrderByWithAggregationInput[];
    by: Prisma.EducationScalarFieldEnum[] | Prisma.EducationScalarFieldEnum;
    having?: Prisma.EducationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EducationCountAggregateInputType | true;
    _avg?: EducationAvgAggregateInputType;
    _sum?: EducationSumAggregateInputType;
    _min?: EducationMinAggregateInputType;
    _max?: EducationMaxAggregateInputType;
};
export type EducationGroupByOutputType = {
    id: string;
    name: string;
    major: string | null;
    degree: string | null;
    startedAt: Date | null;
    endedAt: Date | null;
    location: string | null;
    achievement: string | null;
    order: number;
    userId: string;
    logoId: number | null;
    createdAt: Date;
    _count: EducationCountAggregateOutputType | null;
    _avg: EducationAvgAggregateOutputType | null;
    _sum: EducationSumAggregateOutputType | null;
    _min: EducationMinAggregateOutputType | null;
    _max: EducationMaxAggregateOutputType | null;
};
export type GetEducationGroupByPayload<T extends EducationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EducationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EducationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EducationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EducationGroupByOutputType[P]>;
}>>;
export type EducationWhereInput = {
    AND?: Prisma.EducationWhereInput | Prisma.EducationWhereInput[];
    OR?: Prisma.EducationWhereInput[];
    NOT?: Prisma.EducationWhereInput | Prisma.EducationWhereInput[];
    id?: Prisma.StringFilter<"Education"> | string;
    name?: Prisma.StringFilter<"Education"> | string;
    major?: Prisma.StringNullableFilter<"Education"> | string | null;
    degree?: Prisma.StringNullableFilter<"Education"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"Education"> | Date | string | null;
    endedAt?: Prisma.DateTimeNullableFilter<"Education"> | Date | string | null;
    location?: Prisma.StringNullableFilter<"Education"> | string | null;
    achievement?: Prisma.StringNullableFilter<"Education"> | string | null;
    order?: Prisma.IntFilter<"Education"> | number;
    userId?: Prisma.StringFilter<"Education"> | string;
    logoId?: Prisma.IntNullableFilter<"Education"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Education"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    logo?: Prisma.XOR<Prisma.PhotoNullableScalarRelationFilter, Prisma.PhotoWhereInput> | null;
};
export type EducationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    major?: Prisma.SortOrderInput | Prisma.SortOrder;
    degree?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    endedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    achievement?: Prisma.SortOrderInput | Prisma.SortOrder;
    order?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    logoId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UsersOrderByWithRelationInput;
    logo?: Prisma.PhotoOrderByWithRelationInput;
};
export type EducationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    logoId?: number;
    AND?: Prisma.EducationWhereInput | Prisma.EducationWhereInput[];
    OR?: Prisma.EducationWhereInput[];
    NOT?: Prisma.EducationWhereInput | Prisma.EducationWhereInput[];
    name?: Prisma.StringFilter<"Education"> | string;
    major?: Prisma.StringNullableFilter<"Education"> | string | null;
    degree?: Prisma.StringNullableFilter<"Education"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"Education"> | Date | string | null;
    endedAt?: Prisma.DateTimeNullableFilter<"Education"> | Date | string | null;
    location?: Prisma.StringNullableFilter<"Education"> | string | null;
    achievement?: Prisma.StringNullableFilter<"Education"> | string | null;
    order?: Prisma.IntFilter<"Education"> | number;
    userId?: Prisma.StringFilter<"Education"> | string;
    createdAt?: Prisma.DateTimeFilter<"Education"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    logo?: Prisma.XOR<Prisma.PhotoNullableScalarRelationFilter, Prisma.PhotoWhereInput> | null;
}, "id" | "logoId">;
export type EducationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    major?: Prisma.SortOrderInput | Prisma.SortOrder;
    degree?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    endedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    achievement?: Prisma.SortOrderInput | Prisma.SortOrder;
    order?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    logoId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.EducationCountOrderByAggregateInput;
    _avg?: Prisma.EducationAvgOrderByAggregateInput;
    _max?: Prisma.EducationMaxOrderByAggregateInput;
    _min?: Prisma.EducationMinOrderByAggregateInput;
    _sum?: Prisma.EducationSumOrderByAggregateInput;
};
export type EducationScalarWhereWithAggregatesInput = {
    AND?: Prisma.EducationScalarWhereWithAggregatesInput | Prisma.EducationScalarWhereWithAggregatesInput[];
    OR?: Prisma.EducationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EducationScalarWhereWithAggregatesInput | Prisma.EducationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Education"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Education"> | string;
    major?: Prisma.StringNullableWithAggregatesFilter<"Education"> | string | null;
    degree?: Prisma.StringNullableWithAggregatesFilter<"Education"> | string | null;
    startedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Education"> | Date | string | null;
    endedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Education"> | Date | string | null;
    location?: Prisma.StringNullableWithAggregatesFilter<"Education"> | string | null;
    achievement?: Prisma.StringNullableWithAggregatesFilter<"Education"> | string | null;
    order?: Prisma.IntWithAggregatesFilter<"Education"> | number;
    userId?: Prisma.StringWithAggregatesFilter<"Education"> | string;
    logoId?: Prisma.IntNullableWithAggregatesFilter<"Education"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Education"> | Date | string;
};
export type EducationCreateInput = {
    id?: string;
    name: string;
    major?: string | null;
    degree?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutEducationsInput;
    logo?: Prisma.PhotoCreateNestedOneWithoutEducationInput;
};
export type EducationUncheckedCreateInput = {
    id?: string;
    name: string;
    major?: string | null;
    degree?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    userId: string;
    logoId?: number | null;
    createdAt?: Date | string;
};
export type EducationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    major?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutEducationsNestedInput;
    logo?: Prisma.PhotoUpdateOneWithoutEducationNestedInput;
};
export type EducationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    major?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    logoId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EducationCreateManyInput = {
    id?: string;
    name: string;
    major?: string | null;
    degree?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    userId: string;
    logoId?: number | null;
    createdAt?: Date | string;
};
export type EducationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    major?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EducationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    major?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    logoId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EducationListRelationFilter = {
    every?: Prisma.EducationWhereInput;
    some?: Prisma.EducationWhereInput;
    none?: Prisma.EducationWhereInput;
};
export type EducationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EducationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    major?: Prisma.SortOrder;
    degree?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    achievement?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EducationAvgOrderByAggregateInput = {
    order?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
};
export type EducationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    major?: Prisma.SortOrder;
    degree?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    achievement?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EducationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    major?: Prisma.SortOrder;
    degree?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    achievement?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EducationSumOrderByAggregateInput = {
    order?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
};
export type EducationNullableScalarRelationFilter = {
    is?: Prisma.EducationWhereInput | null;
    isNot?: Prisma.EducationWhereInput | null;
};
export type EducationCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.EducationCreateWithoutUserInput, Prisma.EducationUncheckedCreateWithoutUserInput> | Prisma.EducationCreateWithoutUserInput[] | Prisma.EducationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EducationCreateOrConnectWithoutUserInput | Prisma.EducationCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.EducationCreateManyUserInputEnvelope;
    connect?: Prisma.EducationWhereUniqueInput | Prisma.EducationWhereUniqueInput[];
};
export type EducationUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.EducationCreateWithoutUserInput, Prisma.EducationUncheckedCreateWithoutUserInput> | Prisma.EducationCreateWithoutUserInput[] | Prisma.EducationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EducationCreateOrConnectWithoutUserInput | Prisma.EducationCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.EducationCreateManyUserInputEnvelope;
    connect?: Prisma.EducationWhereUniqueInput | Prisma.EducationWhereUniqueInput[];
};
export type EducationUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.EducationCreateWithoutUserInput, Prisma.EducationUncheckedCreateWithoutUserInput> | Prisma.EducationCreateWithoutUserInput[] | Prisma.EducationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EducationCreateOrConnectWithoutUserInput | Prisma.EducationCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.EducationUpsertWithWhereUniqueWithoutUserInput | Prisma.EducationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.EducationCreateManyUserInputEnvelope;
    set?: Prisma.EducationWhereUniqueInput | Prisma.EducationWhereUniqueInput[];
    disconnect?: Prisma.EducationWhereUniqueInput | Prisma.EducationWhereUniqueInput[];
    delete?: Prisma.EducationWhereUniqueInput | Prisma.EducationWhereUniqueInput[];
    connect?: Prisma.EducationWhereUniqueInput | Prisma.EducationWhereUniqueInput[];
    update?: Prisma.EducationUpdateWithWhereUniqueWithoutUserInput | Prisma.EducationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.EducationUpdateManyWithWhereWithoutUserInput | Prisma.EducationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.EducationScalarWhereInput | Prisma.EducationScalarWhereInput[];
};
export type EducationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.EducationCreateWithoutUserInput, Prisma.EducationUncheckedCreateWithoutUserInput> | Prisma.EducationCreateWithoutUserInput[] | Prisma.EducationUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.EducationCreateOrConnectWithoutUserInput | Prisma.EducationCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.EducationUpsertWithWhereUniqueWithoutUserInput | Prisma.EducationUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.EducationCreateManyUserInputEnvelope;
    set?: Prisma.EducationWhereUniqueInput | Prisma.EducationWhereUniqueInput[];
    disconnect?: Prisma.EducationWhereUniqueInput | Prisma.EducationWhereUniqueInput[];
    delete?: Prisma.EducationWhereUniqueInput | Prisma.EducationWhereUniqueInput[];
    connect?: Prisma.EducationWhereUniqueInput | Prisma.EducationWhereUniqueInput[];
    update?: Prisma.EducationUpdateWithWhereUniqueWithoutUserInput | Prisma.EducationUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.EducationUpdateManyWithWhereWithoutUserInput | Prisma.EducationUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.EducationScalarWhereInput | Prisma.EducationScalarWhereInput[];
};
export type EducationCreateNestedOneWithoutLogoInput = {
    create?: Prisma.XOR<Prisma.EducationCreateWithoutLogoInput, Prisma.EducationUncheckedCreateWithoutLogoInput>;
    connectOrCreate?: Prisma.EducationCreateOrConnectWithoutLogoInput;
    connect?: Prisma.EducationWhereUniqueInput;
};
export type EducationUncheckedCreateNestedOneWithoutLogoInput = {
    create?: Prisma.XOR<Prisma.EducationCreateWithoutLogoInput, Prisma.EducationUncheckedCreateWithoutLogoInput>;
    connectOrCreate?: Prisma.EducationCreateOrConnectWithoutLogoInput;
    connect?: Prisma.EducationWhereUniqueInput;
};
export type EducationUpdateOneWithoutLogoNestedInput = {
    create?: Prisma.XOR<Prisma.EducationCreateWithoutLogoInput, Prisma.EducationUncheckedCreateWithoutLogoInput>;
    connectOrCreate?: Prisma.EducationCreateOrConnectWithoutLogoInput;
    upsert?: Prisma.EducationUpsertWithoutLogoInput;
    disconnect?: Prisma.EducationWhereInput | boolean;
    delete?: Prisma.EducationWhereInput | boolean;
    connect?: Prisma.EducationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EducationUpdateToOneWithWhereWithoutLogoInput, Prisma.EducationUpdateWithoutLogoInput>, Prisma.EducationUncheckedUpdateWithoutLogoInput>;
};
export type EducationUncheckedUpdateOneWithoutLogoNestedInput = {
    create?: Prisma.XOR<Prisma.EducationCreateWithoutLogoInput, Prisma.EducationUncheckedCreateWithoutLogoInput>;
    connectOrCreate?: Prisma.EducationCreateOrConnectWithoutLogoInput;
    upsert?: Prisma.EducationUpsertWithoutLogoInput;
    disconnect?: Prisma.EducationWhereInput | boolean;
    delete?: Prisma.EducationWhereInput | boolean;
    connect?: Prisma.EducationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EducationUpdateToOneWithWhereWithoutLogoInput, Prisma.EducationUpdateWithoutLogoInput>, Prisma.EducationUncheckedUpdateWithoutLogoInput>;
};
export type EducationCreateWithoutUserInput = {
    id?: string;
    name: string;
    major?: string | null;
    degree?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    createdAt?: Date | string;
    logo?: Prisma.PhotoCreateNestedOneWithoutEducationInput;
};
export type EducationUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    major?: string | null;
    degree?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    logoId?: number | null;
    createdAt?: Date | string;
};
export type EducationCreateOrConnectWithoutUserInput = {
    where: Prisma.EducationWhereUniqueInput;
    create: Prisma.XOR<Prisma.EducationCreateWithoutUserInput, Prisma.EducationUncheckedCreateWithoutUserInput>;
};
export type EducationCreateManyUserInputEnvelope = {
    data: Prisma.EducationCreateManyUserInput | Prisma.EducationCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type EducationUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.EducationWhereUniqueInput;
    update: Prisma.XOR<Prisma.EducationUpdateWithoutUserInput, Prisma.EducationUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.EducationCreateWithoutUserInput, Prisma.EducationUncheckedCreateWithoutUserInput>;
};
export type EducationUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.EducationWhereUniqueInput;
    data: Prisma.XOR<Prisma.EducationUpdateWithoutUserInput, Prisma.EducationUncheckedUpdateWithoutUserInput>;
};
export type EducationUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.EducationScalarWhereInput;
    data: Prisma.XOR<Prisma.EducationUpdateManyMutationInput, Prisma.EducationUncheckedUpdateManyWithoutUserInput>;
};
export type EducationScalarWhereInput = {
    AND?: Prisma.EducationScalarWhereInput | Prisma.EducationScalarWhereInput[];
    OR?: Prisma.EducationScalarWhereInput[];
    NOT?: Prisma.EducationScalarWhereInput | Prisma.EducationScalarWhereInput[];
    id?: Prisma.StringFilter<"Education"> | string;
    name?: Prisma.StringFilter<"Education"> | string;
    major?: Prisma.StringNullableFilter<"Education"> | string | null;
    degree?: Prisma.StringNullableFilter<"Education"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"Education"> | Date | string | null;
    endedAt?: Prisma.DateTimeNullableFilter<"Education"> | Date | string | null;
    location?: Prisma.StringNullableFilter<"Education"> | string | null;
    achievement?: Prisma.StringNullableFilter<"Education"> | string | null;
    order?: Prisma.IntFilter<"Education"> | number;
    userId?: Prisma.StringFilter<"Education"> | string;
    logoId?: Prisma.IntNullableFilter<"Education"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Education"> | Date | string;
};
export type EducationCreateWithoutLogoInput = {
    id?: string;
    name: string;
    major?: string | null;
    degree?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutEducationsInput;
};
export type EducationUncheckedCreateWithoutLogoInput = {
    id?: string;
    name: string;
    major?: string | null;
    degree?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    userId: string;
    createdAt?: Date | string;
};
export type EducationCreateOrConnectWithoutLogoInput = {
    where: Prisma.EducationWhereUniqueInput;
    create: Prisma.XOR<Prisma.EducationCreateWithoutLogoInput, Prisma.EducationUncheckedCreateWithoutLogoInput>;
};
export type EducationUpsertWithoutLogoInput = {
    update: Prisma.XOR<Prisma.EducationUpdateWithoutLogoInput, Prisma.EducationUncheckedUpdateWithoutLogoInput>;
    create: Prisma.XOR<Prisma.EducationCreateWithoutLogoInput, Prisma.EducationUncheckedCreateWithoutLogoInput>;
    where?: Prisma.EducationWhereInput;
};
export type EducationUpdateToOneWithWhereWithoutLogoInput = {
    where?: Prisma.EducationWhereInput;
    data: Prisma.XOR<Prisma.EducationUpdateWithoutLogoInput, Prisma.EducationUncheckedUpdateWithoutLogoInput>;
};
export type EducationUpdateWithoutLogoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    major?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutEducationsNestedInput;
};
export type EducationUncheckedUpdateWithoutLogoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    major?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EducationCreateManyUserInput = {
    id?: string;
    name: string;
    major?: string | null;
    degree?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    logoId?: number | null;
    createdAt?: Date | string;
};
export type EducationUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    major?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logo?: Prisma.PhotoUpdateOneWithoutEducationNestedInput;
};
export type EducationUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    major?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    logoId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EducationUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    major?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    degree?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    logoId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EducationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    major?: boolean;
    degree?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    location?: boolean;
    achievement?: boolean;
    order?: boolean;
    userId?: boolean;
    logoId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Education$logoArgs<ExtArgs>;
}, ExtArgs["result"]["education"]>;
export type EducationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    major?: boolean;
    degree?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    location?: boolean;
    achievement?: boolean;
    order?: boolean;
    userId?: boolean;
    logoId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Education$logoArgs<ExtArgs>;
}, ExtArgs["result"]["education"]>;
export type EducationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    major?: boolean;
    degree?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    location?: boolean;
    achievement?: boolean;
    order?: boolean;
    userId?: boolean;
    logoId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Education$logoArgs<ExtArgs>;
}, ExtArgs["result"]["education"]>;
export type EducationSelectScalar = {
    id?: boolean;
    name?: boolean;
    major?: boolean;
    degree?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    location?: boolean;
    achievement?: boolean;
    order?: boolean;
    userId?: boolean;
    logoId?: boolean;
    createdAt?: boolean;
};
export type EducationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "major" | "degree" | "startedAt" | "endedAt" | "location" | "achievement" | "order" | "userId" | "logoId" | "createdAt", ExtArgs["result"]["education"]>;
export type EducationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Education$logoArgs<ExtArgs>;
};
export type EducationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Education$logoArgs<ExtArgs>;
};
export type EducationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Education$logoArgs<ExtArgs>;
};
export type $EducationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Education";
    objects: {
        user: Prisma.$UsersPayload<ExtArgs>;
        logo: Prisma.$PhotoPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        major: string | null;
        degree: string | null;
        startedAt: Date | null;
        endedAt: Date | null;
        location: string | null;
        achievement: string | null;
        order: number;
        userId: string;
        logoId: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["education"]>;
    composites: {};
};
export type EducationGetPayload<S extends boolean | null | undefined | EducationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EducationPayload, S>;
export type EducationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EducationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EducationCountAggregateInputType | true;
};
export interface EducationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Education'];
        meta: {
            name: 'Education';
        };
    };
    findUnique<T extends EducationFindUniqueArgs>(args: Prisma.SelectSubset<T, EducationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EducationClient<runtime.Types.Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EducationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EducationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EducationClient<runtime.Types.Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EducationFindFirstArgs>(args?: Prisma.SelectSubset<T, EducationFindFirstArgs<ExtArgs>>): Prisma.Prisma__EducationClient<runtime.Types.Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EducationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EducationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EducationClient<runtime.Types.Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EducationFindManyArgs>(args?: Prisma.SelectSubset<T, EducationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EducationCreateArgs>(args: Prisma.SelectSubset<T, EducationCreateArgs<ExtArgs>>): Prisma.Prisma__EducationClient<runtime.Types.Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EducationCreateManyArgs>(args?: Prisma.SelectSubset<T, EducationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EducationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EducationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EducationDeleteArgs>(args: Prisma.SelectSubset<T, EducationDeleteArgs<ExtArgs>>): Prisma.Prisma__EducationClient<runtime.Types.Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EducationUpdateArgs>(args: Prisma.SelectSubset<T, EducationUpdateArgs<ExtArgs>>): Prisma.Prisma__EducationClient<runtime.Types.Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EducationDeleteManyArgs>(args?: Prisma.SelectSubset<T, EducationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EducationUpdateManyArgs>(args: Prisma.SelectSubset<T, EducationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EducationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EducationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EducationUpsertArgs>(args: Prisma.SelectSubset<T, EducationUpsertArgs<ExtArgs>>): Prisma.Prisma__EducationClient<runtime.Types.Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EducationCountArgs>(args?: Prisma.Subset<T, EducationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EducationCountAggregateOutputType> : number>;
    aggregate<T extends EducationAggregateArgs>(args: Prisma.Subset<T, EducationAggregateArgs>): Prisma.PrismaPromise<GetEducationAggregateType<T>>;
    groupBy<T extends EducationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EducationGroupByArgs['orderBy'];
    } : {
        orderBy?: EducationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EducationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEducationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EducationFieldRefs;
}
export interface Prisma__EducationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    logo<T extends Prisma.Education$logoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Education$logoArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EducationFieldRefs {
    readonly id: Prisma.FieldRef<"Education", 'String'>;
    readonly name: Prisma.FieldRef<"Education", 'String'>;
    readonly major: Prisma.FieldRef<"Education", 'String'>;
    readonly degree: Prisma.FieldRef<"Education", 'String'>;
    readonly startedAt: Prisma.FieldRef<"Education", 'DateTime'>;
    readonly endedAt: Prisma.FieldRef<"Education", 'DateTime'>;
    readonly location: Prisma.FieldRef<"Education", 'String'>;
    readonly achievement: Prisma.FieldRef<"Education", 'String'>;
    readonly order: Prisma.FieldRef<"Education", 'Int'>;
    readonly userId: Prisma.FieldRef<"Education", 'String'>;
    readonly logoId: Prisma.FieldRef<"Education", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Education", 'DateTime'>;
}
export type EducationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EducationSelect<ExtArgs> | null;
    omit?: Prisma.EducationOmit<ExtArgs> | null;
    include?: Prisma.EducationInclude<ExtArgs> | null;
    where: Prisma.EducationWhereUniqueInput;
};
export type EducationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EducationSelect<ExtArgs> | null;
    omit?: Prisma.EducationOmit<ExtArgs> | null;
    include?: Prisma.EducationInclude<ExtArgs> | null;
    where: Prisma.EducationWhereUniqueInput;
};
export type EducationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EducationSelect<ExtArgs> | null;
    omit?: Prisma.EducationOmit<ExtArgs> | null;
    include?: Prisma.EducationInclude<ExtArgs> | null;
    where?: Prisma.EducationWhereInput;
    orderBy?: Prisma.EducationOrderByWithRelationInput | Prisma.EducationOrderByWithRelationInput[];
    cursor?: Prisma.EducationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EducationScalarFieldEnum | Prisma.EducationScalarFieldEnum[];
};
export type EducationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EducationSelect<ExtArgs> | null;
    omit?: Prisma.EducationOmit<ExtArgs> | null;
    include?: Prisma.EducationInclude<ExtArgs> | null;
    where?: Prisma.EducationWhereInput;
    orderBy?: Prisma.EducationOrderByWithRelationInput | Prisma.EducationOrderByWithRelationInput[];
    cursor?: Prisma.EducationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EducationScalarFieldEnum | Prisma.EducationScalarFieldEnum[];
};
export type EducationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EducationSelect<ExtArgs> | null;
    omit?: Prisma.EducationOmit<ExtArgs> | null;
    include?: Prisma.EducationInclude<ExtArgs> | null;
    where?: Prisma.EducationWhereInput;
    orderBy?: Prisma.EducationOrderByWithRelationInput | Prisma.EducationOrderByWithRelationInput[];
    cursor?: Prisma.EducationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EducationScalarFieldEnum | Prisma.EducationScalarFieldEnum[];
};
export type EducationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EducationSelect<ExtArgs> | null;
    omit?: Prisma.EducationOmit<ExtArgs> | null;
    include?: Prisma.EducationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EducationCreateInput, Prisma.EducationUncheckedCreateInput>;
};
export type EducationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EducationCreateManyInput | Prisma.EducationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EducationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EducationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EducationOmit<ExtArgs> | null;
    data: Prisma.EducationCreateManyInput | Prisma.EducationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.EducationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type EducationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EducationSelect<ExtArgs> | null;
    omit?: Prisma.EducationOmit<ExtArgs> | null;
    include?: Prisma.EducationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EducationUpdateInput, Prisma.EducationUncheckedUpdateInput>;
    where: Prisma.EducationWhereUniqueInput;
};
export type EducationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EducationUpdateManyMutationInput, Prisma.EducationUncheckedUpdateManyInput>;
    where?: Prisma.EducationWhereInput;
    limit?: number;
};
export type EducationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EducationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EducationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EducationUpdateManyMutationInput, Prisma.EducationUncheckedUpdateManyInput>;
    where?: Prisma.EducationWhereInput;
    limit?: number;
    include?: Prisma.EducationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type EducationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EducationSelect<ExtArgs> | null;
    omit?: Prisma.EducationOmit<ExtArgs> | null;
    include?: Prisma.EducationInclude<ExtArgs> | null;
    where: Prisma.EducationWhereUniqueInput;
    create: Prisma.XOR<Prisma.EducationCreateInput, Prisma.EducationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EducationUpdateInput, Prisma.EducationUncheckedUpdateInput>;
};
export type EducationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EducationSelect<ExtArgs> | null;
    omit?: Prisma.EducationOmit<ExtArgs> | null;
    include?: Prisma.EducationInclude<ExtArgs> | null;
    where: Prisma.EducationWhereUniqueInput;
};
export type EducationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EducationWhereInput;
    limit?: number;
};
export type Education$logoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where?: Prisma.PhotoWhereInput;
};
export type EducationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EducationSelect<ExtArgs> | null;
    omit?: Prisma.EducationOmit<ExtArgs> | null;
    include?: Prisma.EducationInclude<ExtArgs> | null;
};
