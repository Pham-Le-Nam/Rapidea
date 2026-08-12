import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ExperienceModel = runtime.Types.Result.DefaultSelection<Prisma.$ExperiencePayload>;
export type AggregateExperience = {
    _count: ExperienceCountAggregateOutputType | null;
    _avg: ExperienceAvgAggregateOutputType | null;
    _sum: ExperienceSumAggregateOutputType | null;
    _min: ExperienceMinAggregateOutputType | null;
    _max: ExperienceMaxAggregateOutputType | null;
};
export type ExperienceAvgAggregateOutputType = {
    order: number | null;
    logoId: number | null;
};
export type ExperienceSumAggregateOutputType = {
    order: number | null;
    logoId: number | null;
};
export type ExperienceMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    position: string | null;
    role: string | null;
    startedAt: Date | null;
    endedAt: Date | null;
    location: string | null;
    achievement: string | null;
    order: number | null;
    userId: string | null;
    logoId: number | null;
    createdAt: Date | null;
};
export type ExperienceMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    position: string | null;
    role: string | null;
    startedAt: Date | null;
    endedAt: Date | null;
    location: string | null;
    achievement: string | null;
    order: number | null;
    userId: string | null;
    logoId: number | null;
    createdAt: Date | null;
};
export type ExperienceCountAggregateOutputType = {
    id: number;
    name: number;
    position: number;
    role: number;
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
export type ExperienceAvgAggregateInputType = {
    order?: true;
    logoId?: true;
};
export type ExperienceSumAggregateInputType = {
    order?: true;
    logoId?: true;
};
export type ExperienceMinAggregateInputType = {
    id?: true;
    name?: true;
    position?: true;
    role?: true;
    startedAt?: true;
    endedAt?: true;
    location?: true;
    achievement?: true;
    order?: true;
    userId?: true;
    logoId?: true;
    createdAt?: true;
};
export type ExperienceMaxAggregateInputType = {
    id?: true;
    name?: true;
    position?: true;
    role?: true;
    startedAt?: true;
    endedAt?: true;
    location?: true;
    achievement?: true;
    order?: true;
    userId?: true;
    logoId?: true;
    createdAt?: true;
};
export type ExperienceCountAggregateInputType = {
    id?: true;
    name?: true;
    position?: true;
    role?: true;
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
export type ExperienceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExperienceWhereInput;
    orderBy?: Prisma.ExperienceOrderByWithRelationInput | Prisma.ExperienceOrderByWithRelationInput[];
    cursor?: Prisma.ExperienceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ExperienceCountAggregateInputType;
    _avg?: ExperienceAvgAggregateInputType;
    _sum?: ExperienceSumAggregateInputType;
    _min?: ExperienceMinAggregateInputType;
    _max?: ExperienceMaxAggregateInputType;
};
export type GetExperienceAggregateType<T extends ExperienceAggregateArgs> = {
    [P in keyof T & keyof AggregateExperience]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateExperience[P]> : Prisma.GetScalarType<T[P], AggregateExperience[P]>;
};
export type ExperienceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExperienceWhereInput;
    orderBy?: Prisma.ExperienceOrderByWithAggregationInput | Prisma.ExperienceOrderByWithAggregationInput[];
    by: Prisma.ExperienceScalarFieldEnum[] | Prisma.ExperienceScalarFieldEnum;
    having?: Prisma.ExperienceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ExperienceCountAggregateInputType | true;
    _avg?: ExperienceAvgAggregateInputType;
    _sum?: ExperienceSumAggregateInputType;
    _min?: ExperienceMinAggregateInputType;
    _max?: ExperienceMaxAggregateInputType;
};
export type ExperienceGroupByOutputType = {
    id: string;
    name: string;
    position: string | null;
    role: string | null;
    startedAt: Date | null;
    endedAt: Date | null;
    location: string | null;
    achievement: string | null;
    order: number;
    userId: string;
    logoId: number | null;
    createdAt: Date;
    _count: ExperienceCountAggregateOutputType | null;
    _avg: ExperienceAvgAggregateOutputType | null;
    _sum: ExperienceSumAggregateOutputType | null;
    _min: ExperienceMinAggregateOutputType | null;
    _max: ExperienceMaxAggregateOutputType | null;
};
export type GetExperienceGroupByPayload<T extends ExperienceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ExperienceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ExperienceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ExperienceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ExperienceGroupByOutputType[P]>;
}>>;
export type ExperienceWhereInput = {
    AND?: Prisma.ExperienceWhereInput | Prisma.ExperienceWhereInput[];
    OR?: Prisma.ExperienceWhereInput[];
    NOT?: Prisma.ExperienceWhereInput | Prisma.ExperienceWhereInput[];
    id?: Prisma.StringFilter<"Experience"> | string;
    name?: Prisma.StringFilter<"Experience"> | string;
    position?: Prisma.StringNullableFilter<"Experience"> | string | null;
    role?: Prisma.StringNullableFilter<"Experience"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"Experience"> | Date | string | null;
    endedAt?: Prisma.DateTimeNullableFilter<"Experience"> | Date | string | null;
    location?: Prisma.StringNullableFilter<"Experience"> | string | null;
    achievement?: Prisma.StringNullableFilter<"Experience"> | string | null;
    order?: Prisma.IntFilter<"Experience"> | number;
    userId?: Prisma.StringFilter<"Experience"> | string;
    logoId?: Prisma.IntNullableFilter<"Experience"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Experience"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    logo?: Prisma.XOR<Prisma.PhotoNullableScalarRelationFilter, Prisma.PhotoWhereInput> | null;
};
export type ExperienceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    position?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrderInput | Prisma.SortOrder;
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
export type ExperienceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    logoId?: number;
    AND?: Prisma.ExperienceWhereInput | Prisma.ExperienceWhereInput[];
    OR?: Prisma.ExperienceWhereInput[];
    NOT?: Prisma.ExperienceWhereInput | Prisma.ExperienceWhereInput[];
    name?: Prisma.StringFilter<"Experience"> | string;
    position?: Prisma.StringNullableFilter<"Experience"> | string | null;
    role?: Prisma.StringNullableFilter<"Experience"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"Experience"> | Date | string | null;
    endedAt?: Prisma.DateTimeNullableFilter<"Experience"> | Date | string | null;
    location?: Prisma.StringNullableFilter<"Experience"> | string | null;
    achievement?: Prisma.StringNullableFilter<"Experience"> | string | null;
    order?: Prisma.IntFilter<"Experience"> | number;
    userId?: Prisma.StringFilter<"Experience"> | string;
    createdAt?: Prisma.DateTimeFilter<"Experience"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    logo?: Prisma.XOR<Prisma.PhotoNullableScalarRelationFilter, Prisma.PhotoWhereInput> | null;
}, "id" | "logoId">;
export type ExperienceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    position?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrderInput | Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    endedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    location?: Prisma.SortOrderInput | Prisma.SortOrder;
    achievement?: Prisma.SortOrderInput | Prisma.SortOrder;
    order?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    logoId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ExperienceCountOrderByAggregateInput;
    _avg?: Prisma.ExperienceAvgOrderByAggregateInput;
    _max?: Prisma.ExperienceMaxOrderByAggregateInput;
    _min?: Prisma.ExperienceMinOrderByAggregateInput;
    _sum?: Prisma.ExperienceSumOrderByAggregateInput;
};
export type ExperienceScalarWhereWithAggregatesInput = {
    AND?: Prisma.ExperienceScalarWhereWithAggregatesInput | Prisma.ExperienceScalarWhereWithAggregatesInput[];
    OR?: Prisma.ExperienceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ExperienceScalarWhereWithAggregatesInput | Prisma.ExperienceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Experience"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Experience"> | string;
    position?: Prisma.StringNullableWithAggregatesFilter<"Experience"> | string | null;
    role?: Prisma.StringNullableWithAggregatesFilter<"Experience"> | string | null;
    startedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Experience"> | Date | string | null;
    endedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Experience"> | Date | string | null;
    location?: Prisma.StringNullableWithAggregatesFilter<"Experience"> | string | null;
    achievement?: Prisma.StringNullableWithAggregatesFilter<"Experience"> | string | null;
    order?: Prisma.IntWithAggregatesFilter<"Experience"> | number;
    userId?: Prisma.StringWithAggregatesFilter<"Experience"> | string;
    logoId?: Prisma.IntNullableWithAggregatesFilter<"Experience"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Experience"> | Date | string;
};
export type ExperienceCreateInput = {
    id?: string;
    name: string;
    position?: string | null;
    role?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutExperienceInput;
    logo?: Prisma.PhotoCreateNestedOneWithoutExperienceInput;
};
export type ExperienceUncheckedCreateInput = {
    id?: string;
    name: string;
    position?: string | null;
    role?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    userId: string;
    logoId?: number | null;
    createdAt?: Date | string;
};
export type ExperienceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutExperienceNestedInput;
    logo?: Prisma.PhotoUpdateOneWithoutExperienceNestedInput;
};
export type ExperienceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    logoId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExperienceCreateManyInput = {
    id?: string;
    name: string;
    position?: string | null;
    role?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    userId: string;
    logoId?: number | null;
    createdAt?: Date | string;
};
export type ExperienceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExperienceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    logoId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExperienceListRelationFilter = {
    every?: Prisma.ExperienceWhereInput;
    some?: Prisma.ExperienceWhereInput;
    none?: Prisma.ExperienceWhereInput;
};
export type ExperienceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ExperienceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    achievement?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ExperienceAvgOrderByAggregateInput = {
    order?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
};
export type ExperienceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    achievement?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ExperienceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    location?: Prisma.SortOrder;
    achievement?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ExperienceSumOrderByAggregateInput = {
    order?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
};
export type ExperienceNullableScalarRelationFilter = {
    is?: Prisma.ExperienceWhereInput | null;
    isNot?: Prisma.ExperienceWhereInput | null;
};
export type ExperienceCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutUserInput, Prisma.ExperienceUncheckedCreateWithoutUserInput> | Prisma.ExperienceCreateWithoutUserInput[] | Prisma.ExperienceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutUserInput | Prisma.ExperienceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ExperienceCreateManyUserInputEnvelope;
    connect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
};
export type ExperienceUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutUserInput, Prisma.ExperienceUncheckedCreateWithoutUserInput> | Prisma.ExperienceCreateWithoutUserInput[] | Prisma.ExperienceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutUserInput | Prisma.ExperienceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ExperienceCreateManyUserInputEnvelope;
    connect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
};
export type ExperienceUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutUserInput, Prisma.ExperienceUncheckedCreateWithoutUserInput> | Prisma.ExperienceCreateWithoutUserInput[] | Prisma.ExperienceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutUserInput | Prisma.ExperienceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ExperienceUpsertWithWhereUniqueWithoutUserInput | Prisma.ExperienceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ExperienceCreateManyUserInputEnvelope;
    set?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    disconnect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    delete?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    connect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    update?: Prisma.ExperienceUpdateWithWhereUniqueWithoutUserInput | Prisma.ExperienceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ExperienceUpdateManyWithWhereWithoutUserInput | Prisma.ExperienceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ExperienceScalarWhereInput | Prisma.ExperienceScalarWhereInput[];
};
export type ExperienceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutUserInput, Prisma.ExperienceUncheckedCreateWithoutUserInput> | Prisma.ExperienceCreateWithoutUserInput[] | Prisma.ExperienceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutUserInput | Prisma.ExperienceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ExperienceUpsertWithWhereUniqueWithoutUserInput | Prisma.ExperienceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ExperienceCreateManyUserInputEnvelope;
    set?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    disconnect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    delete?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    connect?: Prisma.ExperienceWhereUniqueInput | Prisma.ExperienceWhereUniqueInput[];
    update?: Prisma.ExperienceUpdateWithWhereUniqueWithoutUserInput | Prisma.ExperienceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ExperienceUpdateManyWithWhereWithoutUserInput | Prisma.ExperienceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ExperienceScalarWhereInput | Prisma.ExperienceScalarWhereInput[];
};
export type ExperienceCreateNestedOneWithoutLogoInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutLogoInput, Prisma.ExperienceUncheckedCreateWithoutLogoInput>;
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutLogoInput;
    connect?: Prisma.ExperienceWhereUniqueInput;
};
export type ExperienceUncheckedCreateNestedOneWithoutLogoInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutLogoInput, Prisma.ExperienceUncheckedCreateWithoutLogoInput>;
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutLogoInput;
    connect?: Prisma.ExperienceWhereUniqueInput;
};
export type ExperienceUpdateOneWithoutLogoNestedInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutLogoInput, Prisma.ExperienceUncheckedCreateWithoutLogoInput>;
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutLogoInput;
    upsert?: Prisma.ExperienceUpsertWithoutLogoInput;
    disconnect?: Prisma.ExperienceWhereInput | boolean;
    delete?: Prisma.ExperienceWhereInput | boolean;
    connect?: Prisma.ExperienceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ExperienceUpdateToOneWithWhereWithoutLogoInput, Prisma.ExperienceUpdateWithoutLogoInput>, Prisma.ExperienceUncheckedUpdateWithoutLogoInput>;
};
export type ExperienceUncheckedUpdateOneWithoutLogoNestedInput = {
    create?: Prisma.XOR<Prisma.ExperienceCreateWithoutLogoInput, Prisma.ExperienceUncheckedCreateWithoutLogoInput>;
    connectOrCreate?: Prisma.ExperienceCreateOrConnectWithoutLogoInput;
    upsert?: Prisma.ExperienceUpsertWithoutLogoInput;
    disconnect?: Prisma.ExperienceWhereInput | boolean;
    delete?: Prisma.ExperienceWhereInput | boolean;
    connect?: Prisma.ExperienceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ExperienceUpdateToOneWithWhereWithoutLogoInput, Prisma.ExperienceUpdateWithoutLogoInput>, Prisma.ExperienceUncheckedUpdateWithoutLogoInput>;
};
export type ExperienceCreateWithoutUserInput = {
    id?: string;
    name: string;
    position?: string | null;
    role?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    createdAt?: Date | string;
    logo?: Prisma.PhotoCreateNestedOneWithoutExperienceInput;
};
export type ExperienceUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    position?: string | null;
    role?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    logoId?: number | null;
    createdAt?: Date | string;
};
export type ExperienceCreateOrConnectWithoutUserInput = {
    where: Prisma.ExperienceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExperienceCreateWithoutUserInput, Prisma.ExperienceUncheckedCreateWithoutUserInput>;
};
export type ExperienceCreateManyUserInputEnvelope = {
    data: Prisma.ExperienceCreateManyUserInput | Prisma.ExperienceCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ExperienceUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ExperienceWhereUniqueInput;
    update: Prisma.XOR<Prisma.ExperienceUpdateWithoutUserInput, Prisma.ExperienceUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ExperienceCreateWithoutUserInput, Prisma.ExperienceUncheckedCreateWithoutUserInput>;
};
export type ExperienceUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ExperienceWhereUniqueInput;
    data: Prisma.XOR<Prisma.ExperienceUpdateWithoutUserInput, Prisma.ExperienceUncheckedUpdateWithoutUserInput>;
};
export type ExperienceUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ExperienceScalarWhereInput;
    data: Prisma.XOR<Prisma.ExperienceUpdateManyMutationInput, Prisma.ExperienceUncheckedUpdateManyWithoutUserInput>;
};
export type ExperienceScalarWhereInput = {
    AND?: Prisma.ExperienceScalarWhereInput | Prisma.ExperienceScalarWhereInput[];
    OR?: Prisma.ExperienceScalarWhereInput[];
    NOT?: Prisma.ExperienceScalarWhereInput | Prisma.ExperienceScalarWhereInput[];
    id?: Prisma.StringFilter<"Experience"> | string;
    name?: Prisma.StringFilter<"Experience"> | string;
    position?: Prisma.StringNullableFilter<"Experience"> | string | null;
    role?: Prisma.StringNullableFilter<"Experience"> | string | null;
    startedAt?: Prisma.DateTimeNullableFilter<"Experience"> | Date | string | null;
    endedAt?: Prisma.DateTimeNullableFilter<"Experience"> | Date | string | null;
    location?: Prisma.StringNullableFilter<"Experience"> | string | null;
    achievement?: Prisma.StringNullableFilter<"Experience"> | string | null;
    order?: Prisma.IntFilter<"Experience"> | number;
    userId?: Prisma.StringFilter<"Experience"> | string;
    logoId?: Prisma.IntNullableFilter<"Experience"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Experience"> | Date | string;
};
export type ExperienceCreateWithoutLogoInput = {
    id?: string;
    name: string;
    position?: string | null;
    role?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutExperienceInput;
};
export type ExperienceUncheckedCreateWithoutLogoInput = {
    id?: string;
    name: string;
    position?: string | null;
    role?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    userId: string;
    createdAt?: Date | string;
};
export type ExperienceCreateOrConnectWithoutLogoInput = {
    where: Prisma.ExperienceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExperienceCreateWithoutLogoInput, Prisma.ExperienceUncheckedCreateWithoutLogoInput>;
};
export type ExperienceUpsertWithoutLogoInput = {
    update: Prisma.XOR<Prisma.ExperienceUpdateWithoutLogoInput, Prisma.ExperienceUncheckedUpdateWithoutLogoInput>;
    create: Prisma.XOR<Prisma.ExperienceCreateWithoutLogoInput, Prisma.ExperienceUncheckedCreateWithoutLogoInput>;
    where?: Prisma.ExperienceWhereInput;
};
export type ExperienceUpdateToOneWithWhereWithoutLogoInput = {
    where?: Prisma.ExperienceWhereInput;
    data: Prisma.XOR<Prisma.ExperienceUpdateWithoutLogoInput, Prisma.ExperienceUncheckedUpdateWithoutLogoInput>;
};
export type ExperienceUpdateWithoutLogoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutExperienceNestedInput;
};
export type ExperienceUncheckedUpdateWithoutLogoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExperienceCreateManyUserInput = {
    id?: string;
    name: string;
    position?: string | null;
    role?: string | null;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    location?: string | null;
    achievement?: string | null;
    order: number;
    logoId?: number | null;
    createdAt?: Date | string;
};
export type ExperienceUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logo?: Prisma.PhotoUpdateOneWithoutExperienceNestedInput;
};
export type ExperienceUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    logoId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExperienceUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    location?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    achievement?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    logoId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ExperienceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    position?: boolean;
    role?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    location?: boolean;
    achievement?: boolean;
    order?: boolean;
    userId?: boolean;
    logoId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Experience$logoArgs<ExtArgs>;
}, ExtArgs["result"]["experience"]>;
export type ExperienceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    position?: boolean;
    role?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    location?: boolean;
    achievement?: boolean;
    order?: boolean;
    userId?: boolean;
    logoId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Experience$logoArgs<ExtArgs>;
}, ExtArgs["result"]["experience"]>;
export type ExperienceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    position?: boolean;
    role?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    location?: boolean;
    achievement?: boolean;
    order?: boolean;
    userId?: boolean;
    logoId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Experience$logoArgs<ExtArgs>;
}, ExtArgs["result"]["experience"]>;
export type ExperienceSelectScalar = {
    id?: boolean;
    name?: boolean;
    position?: boolean;
    role?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    location?: boolean;
    achievement?: boolean;
    order?: boolean;
    userId?: boolean;
    logoId?: boolean;
    createdAt?: boolean;
};
export type ExperienceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "position" | "role" | "startedAt" | "endedAt" | "location" | "achievement" | "order" | "userId" | "logoId" | "createdAt", ExtArgs["result"]["experience"]>;
export type ExperienceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Experience$logoArgs<ExtArgs>;
};
export type ExperienceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Experience$logoArgs<ExtArgs>;
};
export type ExperienceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Experience$logoArgs<ExtArgs>;
};
export type $ExperiencePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Experience";
    objects: {
        user: Prisma.$UsersPayload<ExtArgs>;
        logo: Prisma.$PhotoPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        position: string | null;
        role: string | null;
        startedAt: Date | null;
        endedAt: Date | null;
        location: string | null;
        achievement: string | null;
        order: number;
        userId: string;
        logoId: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["experience"]>;
    composites: {};
};
export type ExperienceGetPayload<S extends boolean | null | undefined | ExperienceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ExperiencePayload, S>;
export type ExperienceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ExperienceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ExperienceCountAggregateInputType | true;
};
export interface ExperienceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Experience'];
        meta: {
            name: 'Experience';
        };
    };
    findUnique<T extends ExperienceFindUniqueArgs>(args: Prisma.SelectSubset<T, ExperienceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ExperienceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ExperienceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ExperienceFindFirstArgs>(args?: Prisma.SelectSubset<T, ExperienceFindFirstArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ExperienceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ExperienceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ExperienceFindManyArgs>(args?: Prisma.SelectSubset<T, ExperienceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ExperienceCreateArgs>(args: Prisma.SelectSubset<T, ExperienceCreateArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ExperienceCreateManyArgs>(args?: Prisma.SelectSubset<T, ExperienceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ExperienceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ExperienceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ExperienceDeleteArgs>(args: Prisma.SelectSubset<T, ExperienceDeleteArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ExperienceUpdateArgs>(args: Prisma.SelectSubset<T, ExperienceUpdateArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ExperienceDeleteManyArgs>(args?: Prisma.SelectSubset<T, ExperienceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ExperienceUpdateManyArgs>(args: Prisma.SelectSubset<T, ExperienceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ExperienceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ExperienceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ExperienceUpsertArgs>(args: Prisma.SelectSubset<T, ExperienceUpsertArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ExperienceCountArgs>(args?: Prisma.Subset<T, ExperienceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ExperienceCountAggregateOutputType> : number>;
    aggregate<T extends ExperienceAggregateArgs>(args: Prisma.Subset<T, ExperienceAggregateArgs>): Prisma.PrismaPromise<GetExperienceAggregateType<T>>;
    groupBy<T extends ExperienceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ExperienceGroupByArgs['orderBy'];
    } : {
        orderBy?: ExperienceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ExperienceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExperienceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ExperienceFieldRefs;
}
export interface Prisma__ExperienceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    logo<T extends Prisma.Experience$logoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Experience$logoArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ExperienceFieldRefs {
    readonly id: Prisma.FieldRef<"Experience", 'String'>;
    readonly name: Prisma.FieldRef<"Experience", 'String'>;
    readonly position: Prisma.FieldRef<"Experience", 'String'>;
    readonly role: Prisma.FieldRef<"Experience", 'String'>;
    readonly startedAt: Prisma.FieldRef<"Experience", 'DateTime'>;
    readonly endedAt: Prisma.FieldRef<"Experience", 'DateTime'>;
    readonly location: Prisma.FieldRef<"Experience", 'String'>;
    readonly achievement: Prisma.FieldRef<"Experience", 'String'>;
    readonly order: Prisma.FieldRef<"Experience", 'Int'>;
    readonly userId: Prisma.FieldRef<"Experience", 'String'>;
    readonly logoId: Prisma.FieldRef<"Experience", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Experience", 'DateTime'>;
}
export type ExperienceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExperienceSelect<ExtArgs> | null;
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    include?: Prisma.ExperienceInclude<ExtArgs> | null;
    where: Prisma.ExperienceWhereUniqueInput;
};
export type ExperienceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExperienceSelect<ExtArgs> | null;
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    include?: Prisma.ExperienceInclude<ExtArgs> | null;
    where: Prisma.ExperienceWhereUniqueInput;
};
export type ExperienceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExperienceSelect<ExtArgs> | null;
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    include?: Prisma.ExperienceInclude<ExtArgs> | null;
    where?: Prisma.ExperienceWhereInput;
    orderBy?: Prisma.ExperienceOrderByWithRelationInput | Prisma.ExperienceOrderByWithRelationInput[];
    cursor?: Prisma.ExperienceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExperienceScalarFieldEnum | Prisma.ExperienceScalarFieldEnum[];
};
export type ExperienceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExperienceSelect<ExtArgs> | null;
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    include?: Prisma.ExperienceInclude<ExtArgs> | null;
    where?: Prisma.ExperienceWhereInput;
    orderBy?: Prisma.ExperienceOrderByWithRelationInput | Prisma.ExperienceOrderByWithRelationInput[];
    cursor?: Prisma.ExperienceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExperienceScalarFieldEnum | Prisma.ExperienceScalarFieldEnum[];
};
export type ExperienceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExperienceSelect<ExtArgs> | null;
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    include?: Prisma.ExperienceInclude<ExtArgs> | null;
    where?: Prisma.ExperienceWhereInput;
    orderBy?: Prisma.ExperienceOrderByWithRelationInput | Prisma.ExperienceOrderByWithRelationInput[];
    cursor?: Prisma.ExperienceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ExperienceScalarFieldEnum | Prisma.ExperienceScalarFieldEnum[];
};
export type ExperienceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExperienceSelect<ExtArgs> | null;
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    include?: Prisma.ExperienceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExperienceCreateInput, Prisma.ExperienceUncheckedCreateInput>;
};
export type ExperienceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ExperienceCreateManyInput | Prisma.ExperienceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ExperienceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExperienceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    data: Prisma.ExperienceCreateManyInput | Prisma.ExperienceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ExperienceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ExperienceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExperienceSelect<ExtArgs> | null;
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    include?: Prisma.ExperienceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExperienceUpdateInput, Prisma.ExperienceUncheckedUpdateInput>;
    where: Prisma.ExperienceWhereUniqueInput;
};
export type ExperienceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ExperienceUpdateManyMutationInput, Prisma.ExperienceUncheckedUpdateManyInput>;
    where?: Prisma.ExperienceWhereInput;
    limit?: number;
};
export type ExperienceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExperienceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ExperienceUpdateManyMutationInput, Prisma.ExperienceUncheckedUpdateManyInput>;
    where?: Prisma.ExperienceWhereInput;
    limit?: number;
    include?: Prisma.ExperienceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ExperienceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExperienceSelect<ExtArgs> | null;
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    include?: Prisma.ExperienceInclude<ExtArgs> | null;
    where: Prisma.ExperienceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ExperienceCreateInput, Prisma.ExperienceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ExperienceUpdateInput, Prisma.ExperienceUncheckedUpdateInput>;
};
export type ExperienceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExperienceSelect<ExtArgs> | null;
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    include?: Prisma.ExperienceInclude<ExtArgs> | null;
    where: Prisma.ExperienceWhereUniqueInput;
};
export type ExperienceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ExperienceWhereInput;
    limit?: number;
};
export type Experience$logoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where?: Prisma.PhotoWhereInput;
};
export type ExperienceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExperienceSelect<ExtArgs> | null;
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    include?: Prisma.ExperienceInclude<ExtArgs> | null;
};
