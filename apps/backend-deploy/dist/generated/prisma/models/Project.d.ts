import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ProjectModel = runtime.Types.Result.DefaultSelection<Prisma.$ProjectPayload>;
export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null;
    _avg: ProjectAvgAggregateOutputType | null;
    _sum: ProjectSumAggregateOutputType | null;
    _min: ProjectMinAggregateOutputType | null;
    _max: ProjectMaxAggregateOutputType | null;
};
export type ProjectAvgAggregateOutputType = {
    order: number | null;
    logoId: number | null;
};
export type ProjectSumAggregateOutputType = {
    order: number | null;
    logoId: number | null;
};
export type ProjectMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    role: string | null;
    startedAt: Date | null;
    endedAt: Date | null;
    details: string | null;
    order: number | null;
    userId: string | null;
    logoId: number | null;
    createdAt: Date | null;
};
export type ProjectMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    role: string | null;
    startedAt: Date | null;
    endedAt: Date | null;
    details: string | null;
    order: number | null;
    userId: string | null;
    logoId: number | null;
    createdAt: Date | null;
};
export type ProjectCountAggregateOutputType = {
    id: number;
    name: number;
    role: number;
    startedAt: number;
    endedAt: number;
    details: number;
    order: number;
    userId: number;
    logoId: number;
    createdAt: number;
    _all: number;
};
export type ProjectAvgAggregateInputType = {
    order?: true;
    logoId?: true;
};
export type ProjectSumAggregateInputType = {
    order?: true;
    logoId?: true;
};
export type ProjectMinAggregateInputType = {
    id?: true;
    name?: true;
    role?: true;
    startedAt?: true;
    endedAt?: true;
    details?: true;
    order?: true;
    userId?: true;
    logoId?: true;
    createdAt?: true;
};
export type ProjectMaxAggregateInputType = {
    id?: true;
    name?: true;
    role?: true;
    startedAt?: true;
    endedAt?: true;
    details?: true;
    order?: true;
    userId?: true;
    logoId?: true;
    createdAt?: true;
};
export type ProjectCountAggregateInputType = {
    id?: true;
    name?: true;
    role?: true;
    startedAt?: true;
    endedAt?: true;
    details?: true;
    order?: true;
    userId?: true;
    logoId?: true;
    createdAt?: true;
    _all?: true;
};
export type ProjectAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProjectCountAggregateInputType;
    _avg?: ProjectAvgAggregateInputType;
    _sum?: ProjectSumAggregateInputType;
    _min?: ProjectMinAggregateInputType;
    _max?: ProjectMaxAggregateInputType;
};
export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
    [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProject[P]> : Prisma.GetScalarType<T[P], AggregateProject[P]>;
};
export type ProjectGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithAggregationInput | Prisma.ProjectOrderByWithAggregationInput[];
    by: Prisma.ProjectScalarFieldEnum[] | Prisma.ProjectScalarFieldEnum;
    having?: Prisma.ProjectScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProjectCountAggregateInputType | true;
    _avg?: ProjectAvgAggregateInputType;
    _sum?: ProjectSumAggregateInputType;
    _min?: ProjectMinAggregateInputType;
    _max?: ProjectMaxAggregateInputType;
};
export type ProjectGroupByOutputType = {
    id: string;
    name: string;
    role: string;
    startedAt: Date | null;
    endedAt: Date | null;
    details: string | null;
    order: number;
    userId: string;
    logoId: number | null;
    createdAt: Date;
    _count: ProjectCountAggregateOutputType | null;
    _avg: ProjectAvgAggregateOutputType | null;
    _sum: ProjectSumAggregateOutputType | null;
    _min: ProjectMinAggregateOutputType | null;
    _max: ProjectMaxAggregateOutputType | null;
};
export type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProjectGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProjectGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProjectGroupByOutputType[P]>;
}>>;
export type ProjectWhereInput = {
    AND?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    OR?: Prisma.ProjectWhereInput[];
    NOT?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    id?: Prisma.StringFilter<"Project"> | string;
    name?: Prisma.StringFilter<"Project"> | string;
    role?: Prisma.StringFilter<"Project"> | string;
    startedAt?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
    endedAt?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
    details?: Prisma.StringNullableFilter<"Project"> | string | null;
    order?: Prisma.IntFilter<"Project"> | number;
    userId?: Prisma.StringFilter<"Project"> | string;
    logoId?: Prisma.IntNullableFilter<"Project"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    logo?: Prisma.XOR<Prisma.PhotoNullableScalarRelationFilter, Prisma.PhotoWhereInput> | null;
    projectContributors?: Prisma.ProjectContributorListRelationFilter;
    projectLinks?: Prisma.ProjectLinkListRelationFilter;
};
export type ProjectOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    endedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    details?: Prisma.SortOrderInput | Prisma.SortOrder;
    order?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    logoId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UsersOrderByWithRelationInput;
    logo?: Prisma.PhotoOrderByWithRelationInput;
    projectContributors?: Prisma.ProjectContributorOrderByRelationAggregateInput;
    projectLinks?: Prisma.ProjectLinkOrderByRelationAggregateInput;
};
export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    logoId?: number;
    AND?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    OR?: Prisma.ProjectWhereInput[];
    NOT?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    name?: Prisma.StringFilter<"Project"> | string;
    role?: Prisma.StringFilter<"Project"> | string;
    startedAt?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
    endedAt?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
    details?: Prisma.StringNullableFilter<"Project"> | string | null;
    order?: Prisma.IntFilter<"Project"> | number;
    userId?: Prisma.StringFilter<"Project"> | string;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    logo?: Prisma.XOR<Prisma.PhotoNullableScalarRelationFilter, Prisma.PhotoWhereInput> | null;
    projectContributors?: Prisma.ProjectContributorListRelationFilter;
    projectLinks?: Prisma.ProjectLinkListRelationFilter;
}, "id" | "logoId">;
export type ProjectOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    endedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    details?: Prisma.SortOrderInput | Prisma.SortOrder;
    order?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    logoId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ProjectCountOrderByAggregateInput;
    _avg?: Prisma.ProjectAvgOrderByAggregateInput;
    _max?: Prisma.ProjectMaxOrderByAggregateInput;
    _min?: Prisma.ProjectMinOrderByAggregateInput;
    _sum?: Prisma.ProjectSumOrderByAggregateInput;
};
export type ProjectScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProjectScalarWhereWithAggregatesInput | Prisma.ProjectScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProjectScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProjectScalarWhereWithAggregatesInput | Prisma.ProjectScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    role?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    startedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null;
    endedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null;
    details?: Prisma.StringNullableWithAggregatesFilter<"Project"> | string | null;
    order?: Prisma.IntWithAggregatesFilter<"Project"> | number;
    userId?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    logoId?: Prisma.IntNullableWithAggregatesFilter<"Project"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Project"> | Date | string;
};
export type ProjectCreateInput = {
    id?: string;
    name: string;
    role: string;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    details?: string | null;
    order: number;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutProjectsInput;
    logo?: Prisma.PhotoCreateNestedOneWithoutProjectInput;
    projectContributors?: Prisma.ProjectContributorCreateNestedManyWithoutProjectInput;
    projectLinks?: Prisma.ProjectLinkCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateInput = {
    id?: string;
    name: string;
    role: string;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    details?: string | null;
    order: number;
    userId: string;
    logoId?: number | null;
    createdAt?: Date | string;
    projectContributors?: Prisma.ProjectContributorUncheckedCreateNestedManyWithoutProjectInput;
    projectLinks?: Prisma.ProjectLinkUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutProjectsNestedInput;
    logo?: Prisma.PhotoUpdateOneWithoutProjectNestedInput;
    projectContributors?: Prisma.ProjectContributorUpdateManyWithoutProjectNestedInput;
    projectLinks?: Prisma.ProjectLinkUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    logoId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectContributors?: Prisma.ProjectContributorUncheckedUpdateManyWithoutProjectNestedInput;
    projectLinks?: Prisma.ProjectLinkUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateManyInput = {
    id?: string;
    name: string;
    role: string;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    details?: string | null;
    order: number;
    userId: string;
    logoId?: number | null;
    createdAt?: Date | string;
};
export type ProjectUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    logoId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectListRelationFilter = {
    every?: Prisma.ProjectWhereInput;
    some?: Prisma.ProjectWhereInput;
    none?: Prisma.ProjectWhereInput;
};
export type ProjectOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProjectCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProjectAvgOrderByAggregateInput = {
    order?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
};
export type ProjectMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProjectMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    endedAt?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    order?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProjectSumOrderByAggregateInput = {
    order?: Prisma.SortOrder;
    logoId?: Prisma.SortOrder;
};
export type ProjectScalarRelationFilter = {
    is?: Prisma.ProjectWhereInput;
    isNot?: Prisma.ProjectWhereInput;
};
export type ProjectNullableScalarRelationFilter = {
    is?: Prisma.ProjectWhereInput | null;
    isNot?: Prisma.ProjectWhereInput | null;
};
export type ProjectCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutUserInput, Prisma.ProjectUncheckedCreateWithoutUserInput> | Prisma.ProjectCreateWithoutUserInput[] | Prisma.ProjectUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutUserInput | Prisma.ProjectCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProjectCreateManyUserInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutUserInput, Prisma.ProjectUncheckedCreateWithoutUserInput> | Prisma.ProjectCreateWithoutUserInput[] | Prisma.ProjectUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutUserInput | Prisma.ProjectCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProjectCreateManyUserInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutUserInput, Prisma.ProjectUncheckedCreateWithoutUserInput> | Prisma.ProjectCreateWithoutUserInput[] | Prisma.ProjectUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutUserInput | Prisma.ProjectCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutUserInput | Prisma.ProjectUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProjectCreateManyUserInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutUserInput | Prisma.ProjectUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutUserInput | Prisma.ProjectUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutUserInput, Prisma.ProjectUncheckedCreateWithoutUserInput> | Prisma.ProjectCreateWithoutUserInput[] | Prisma.ProjectUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutUserInput | Prisma.ProjectCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutUserInput | Prisma.ProjectUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProjectCreateManyUserInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutUserInput | Prisma.ProjectUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutUserInput | Prisma.ProjectUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type ProjectCreateNestedOneWithoutProjectContributorsInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutProjectContributorsInput, Prisma.ProjectUncheckedCreateWithoutProjectContributorsInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutProjectContributorsInput;
    connect?: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateOneRequiredWithoutProjectContributorsNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutProjectContributorsInput, Prisma.ProjectUncheckedCreateWithoutProjectContributorsInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutProjectContributorsInput;
    upsert?: Prisma.ProjectUpsertWithoutProjectContributorsInput;
    connect?: Prisma.ProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProjectUpdateToOneWithWhereWithoutProjectContributorsInput, Prisma.ProjectUpdateWithoutProjectContributorsInput>, Prisma.ProjectUncheckedUpdateWithoutProjectContributorsInput>;
};
export type ProjectCreateNestedOneWithoutProjectLinksInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutProjectLinksInput, Prisma.ProjectUncheckedCreateWithoutProjectLinksInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutProjectLinksInput;
    connect?: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateOneRequiredWithoutProjectLinksNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutProjectLinksInput, Prisma.ProjectUncheckedCreateWithoutProjectLinksInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutProjectLinksInput;
    upsert?: Prisma.ProjectUpsertWithoutProjectLinksInput;
    connect?: Prisma.ProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProjectUpdateToOneWithWhereWithoutProjectLinksInput, Prisma.ProjectUpdateWithoutProjectLinksInput>, Prisma.ProjectUncheckedUpdateWithoutProjectLinksInput>;
};
export type ProjectCreateNestedOneWithoutLogoInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutLogoInput, Prisma.ProjectUncheckedCreateWithoutLogoInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutLogoInput;
    connect?: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUncheckedCreateNestedOneWithoutLogoInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutLogoInput, Prisma.ProjectUncheckedCreateWithoutLogoInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutLogoInput;
    connect?: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateOneWithoutLogoNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutLogoInput, Prisma.ProjectUncheckedCreateWithoutLogoInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutLogoInput;
    upsert?: Prisma.ProjectUpsertWithoutLogoInput;
    disconnect?: Prisma.ProjectWhereInput | boolean;
    delete?: Prisma.ProjectWhereInput | boolean;
    connect?: Prisma.ProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProjectUpdateToOneWithWhereWithoutLogoInput, Prisma.ProjectUpdateWithoutLogoInput>, Prisma.ProjectUncheckedUpdateWithoutLogoInput>;
};
export type ProjectUncheckedUpdateOneWithoutLogoNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutLogoInput, Prisma.ProjectUncheckedCreateWithoutLogoInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutLogoInput;
    upsert?: Prisma.ProjectUpsertWithoutLogoInput;
    disconnect?: Prisma.ProjectWhereInput | boolean;
    delete?: Prisma.ProjectWhereInput | boolean;
    connect?: Prisma.ProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProjectUpdateToOneWithWhereWithoutLogoInput, Prisma.ProjectUpdateWithoutLogoInput>, Prisma.ProjectUncheckedUpdateWithoutLogoInput>;
};
export type ProjectCreateWithoutUserInput = {
    id?: string;
    name: string;
    role: string;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    details?: string | null;
    order: number;
    createdAt?: Date | string;
    logo?: Prisma.PhotoCreateNestedOneWithoutProjectInput;
    projectContributors?: Prisma.ProjectContributorCreateNestedManyWithoutProjectInput;
    projectLinks?: Prisma.ProjectLinkCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    role: string;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    details?: string | null;
    order: number;
    logoId?: number | null;
    createdAt?: Date | string;
    projectContributors?: Prisma.ProjectContributorUncheckedCreateNestedManyWithoutProjectInput;
    projectLinks?: Prisma.ProjectLinkUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutUserInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutUserInput, Prisma.ProjectUncheckedCreateWithoutUserInput>;
};
export type ProjectCreateManyUserInputEnvelope = {
    data: Prisma.ProjectCreateManyUserInput | Prisma.ProjectCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProjectWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutUserInput, Prisma.ProjectUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutUserInput, Prisma.ProjectUncheckedCreateWithoutUserInput>;
};
export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutUserInput, Prisma.ProjectUncheckedUpdateWithoutUserInput>;
};
export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ProjectScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyWithoutUserInput>;
};
export type ProjectScalarWhereInput = {
    AND?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
    OR?: Prisma.ProjectScalarWhereInput[];
    NOT?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
    id?: Prisma.StringFilter<"Project"> | string;
    name?: Prisma.StringFilter<"Project"> | string;
    role?: Prisma.StringFilter<"Project"> | string;
    startedAt?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
    endedAt?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
    details?: Prisma.StringNullableFilter<"Project"> | string | null;
    order?: Prisma.IntFilter<"Project"> | number;
    userId?: Prisma.StringFilter<"Project"> | string;
    logoId?: Prisma.IntNullableFilter<"Project"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
};
export type ProjectCreateWithoutProjectContributorsInput = {
    id?: string;
    name: string;
    role: string;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    details?: string | null;
    order: number;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutProjectsInput;
    logo?: Prisma.PhotoCreateNestedOneWithoutProjectInput;
    projectLinks?: Prisma.ProjectLinkCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutProjectContributorsInput = {
    id?: string;
    name: string;
    role: string;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    details?: string | null;
    order: number;
    userId: string;
    logoId?: number | null;
    createdAt?: Date | string;
    projectLinks?: Prisma.ProjectLinkUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutProjectContributorsInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutProjectContributorsInput, Prisma.ProjectUncheckedCreateWithoutProjectContributorsInput>;
};
export type ProjectUpsertWithoutProjectContributorsInput = {
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutProjectContributorsInput, Prisma.ProjectUncheckedUpdateWithoutProjectContributorsInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutProjectContributorsInput, Prisma.ProjectUncheckedCreateWithoutProjectContributorsInput>;
    where?: Prisma.ProjectWhereInput;
};
export type ProjectUpdateToOneWithWhereWithoutProjectContributorsInput = {
    where?: Prisma.ProjectWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutProjectContributorsInput, Prisma.ProjectUncheckedUpdateWithoutProjectContributorsInput>;
};
export type ProjectUpdateWithoutProjectContributorsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutProjectsNestedInput;
    logo?: Prisma.PhotoUpdateOneWithoutProjectNestedInput;
    projectLinks?: Prisma.ProjectLinkUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutProjectContributorsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    logoId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectLinks?: Prisma.ProjectLinkUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateWithoutProjectLinksInput = {
    id?: string;
    name: string;
    role: string;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    details?: string | null;
    order: number;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutProjectsInput;
    logo?: Prisma.PhotoCreateNestedOneWithoutProjectInput;
    projectContributors?: Prisma.ProjectContributorCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutProjectLinksInput = {
    id?: string;
    name: string;
    role: string;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    details?: string | null;
    order: number;
    userId: string;
    logoId?: number | null;
    createdAt?: Date | string;
    projectContributors?: Prisma.ProjectContributorUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutProjectLinksInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutProjectLinksInput, Prisma.ProjectUncheckedCreateWithoutProjectLinksInput>;
};
export type ProjectUpsertWithoutProjectLinksInput = {
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutProjectLinksInput, Prisma.ProjectUncheckedUpdateWithoutProjectLinksInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutProjectLinksInput, Prisma.ProjectUncheckedCreateWithoutProjectLinksInput>;
    where?: Prisma.ProjectWhereInput;
};
export type ProjectUpdateToOneWithWhereWithoutProjectLinksInput = {
    where?: Prisma.ProjectWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutProjectLinksInput, Prisma.ProjectUncheckedUpdateWithoutProjectLinksInput>;
};
export type ProjectUpdateWithoutProjectLinksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutProjectsNestedInput;
    logo?: Prisma.PhotoUpdateOneWithoutProjectNestedInput;
    projectContributors?: Prisma.ProjectContributorUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutProjectLinksInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    logoId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectContributors?: Prisma.ProjectContributorUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateWithoutLogoInput = {
    id?: string;
    name: string;
    role: string;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    details?: string | null;
    order: number;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutProjectsInput;
    projectContributors?: Prisma.ProjectContributorCreateNestedManyWithoutProjectInput;
    projectLinks?: Prisma.ProjectLinkCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutLogoInput = {
    id?: string;
    name: string;
    role: string;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    details?: string | null;
    order: number;
    userId: string;
    createdAt?: Date | string;
    projectContributors?: Prisma.ProjectContributorUncheckedCreateNestedManyWithoutProjectInput;
    projectLinks?: Prisma.ProjectLinkUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutLogoInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutLogoInput, Prisma.ProjectUncheckedCreateWithoutLogoInput>;
};
export type ProjectUpsertWithoutLogoInput = {
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutLogoInput, Prisma.ProjectUncheckedUpdateWithoutLogoInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutLogoInput, Prisma.ProjectUncheckedCreateWithoutLogoInput>;
    where?: Prisma.ProjectWhereInput;
};
export type ProjectUpdateToOneWithWhereWithoutLogoInput = {
    where?: Prisma.ProjectWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutLogoInput, Prisma.ProjectUncheckedUpdateWithoutLogoInput>;
};
export type ProjectUpdateWithoutLogoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutProjectsNestedInput;
    projectContributors?: Prisma.ProjectContributorUpdateManyWithoutProjectNestedInput;
    projectLinks?: Prisma.ProjectLinkUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutLogoInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectContributors?: Prisma.ProjectContributorUncheckedUpdateManyWithoutProjectNestedInput;
    projectLinks?: Prisma.ProjectLinkUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateManyUserInput = {
    id?: string;
    name: string;
    role: string;
    startedAt?: Date | string | null;
    endedAt?: Date | string | null;
    details?: string | null;
    order: number;
    logoId?: number | null;
    createdAt?: Date | string;
};
export type ProjectUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    logo?: Prisma.PhotoUpdateOneWithoutProjectNestedInput;
    projectContributors?: Prisma.ProjectContributorUpdateManyWithoutProjectNestedInput;
    projectLinks?: Prisma.ProjectLinkUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    logoId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    projectContributors?: Prisma.ProjectContributorUncheckedUpdateManyWithoutProjectNestedInput;
    projectLinks?: Prisma.ProjectLinkUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    startedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    endedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    order?: Prisma.IntFieldUpdateOperationsInput | number;
    logoId?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectCountOutputType = {
    projectContributors: number;
    projectLinks: number;
};
export type ProjectCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    projectContributors?: boolean | ProjectCountOutputTypeCountProjectContributorsArgs;
    projectLinks?: boolean | ProjectCountOutputTypeCountProjectLinksArgs;
};
export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectCountOutputTypeSelect<ExtArgs> | null;
};
export type ProjectCountOutputTypeCountProjectContributorsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectContributorWhereInput;
};
export type ProjectCountOutputTypeCountProjectLinksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectLinkWhereInput;
};
export type ProjectSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    role?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    details?: boolean;
    order?: boolean;
    userId?: boolean;
    logoId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Project$logoArgs<ExtArgs>;
    projectContributors?: boolean | Prisma.Project$projectContributorsArgs<ExtArgs>;
    projectLinks?: boolean | Prisma.Project$projectLinksArgs<ExtArgs>;
    _count?: boolean | Prisma.ProjectCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    role?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    details?: boolean;
    order?: boolean;
    userId?: boolean;
    logoId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Project$logoArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    role?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    details?: boolean;
    order?: boolean;
    userId?: boolean;
    logoId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Project$logoArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectScalar = {
    id?: boolean;
    name?: boolean;
    role?: boolean;
    startedAt?: boolean;
    endedAt?: boolean;
    details?: boolean;
    order?: boolean;
    userId?: boolean;
    logoId?: boolean;
    createdAt?: boolean;
};
export type ProjectOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "role" | "startedAt" | "endedAt" | "details" | "order" | "userId" | "logoId" | "createdAt", ExtArgs["result"]["project"]>;
export type ProjectInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Project$logoArgs<ExtArgs>;
    projectContributors?: boolean | Prisma.Project$projectContributorsArgs<ExtArgs>;
    projectLinks?: boolean | Prisma.Project$projectLinksArgs<ExtArgs>;
    _count?: boolean | Prisma.ProjectCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProjectIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Project$logoArgs<ExtArgs>;
};
export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    logo?: boolean | Prisma.Project$logoArgs<ExtArgs>;
};
export type $ProjectPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Project";
    objects: {
        user: Prisma.$UsersPayload<ExtArgs>;
        logo: Prisma.$PhotoPayload<ExtArgs> | null;
        projectContributors: Prisma.$ProjectContributorPayload<ExtArgs>[];
        projectLinks: Prisma.$ProjectLinkPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        role: string;
        startedAt: Date | null;
        endedAt: Date | null;
        details: string | null;
        order: number;
        userId: string;
        logoId: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["project"]>;
    composites: {};
};
export type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProjectPayload, S>;
export type ProjectCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProjectCountAggregateInputType | true;
};
export interface ProjectDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Project'];
        meta: {
            name: 'Project';
        };
    };
    findUnique<T extends ProjectFindUniqueArgs>(args: Prisma.SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProjectFindFirstArgs>(args?: Prisma.SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProjectFindManyArgs>(args?: Prisma.SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProjectCreateArgs>(args: Prisma.SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProjectCreateManyArgs>(args?: Prisma.SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProjectDeleteArgs>(args: Prisma.SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProjectUpdateArgs>(args: Prisma.SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProjectDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProjectUpdateManyArgs>(args: Prisma.SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProjectUpsertArgs>(args: Prisma.SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProjectCountArgs>(args?: Prisma.Subset<T, ProjectCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProjectCountAggregateOutputType> : number>;
    aggregate<T extends ProjectAggregateArgs>(args: Prisma.Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>;
    groupBy<T extends ProjectGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProjectGroupByArgs['orderBy'];
    } : {
        orderBy?: ProjectGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProjectFieldRefs;
}
export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    logo<T extends Prisma.Project$logoArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Project$logoArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    projectContributors<T extends Prisma.Project$projectContributorsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Project$projectContributorsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectContributorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    projectLinks<T extends Prisma.Project$projectLinksArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Project$projectLinksArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProjectFieldRefs {
    readonly id: Prisma.FieldRef<"Project", 'String'>;
    readonly name: Prisma.FieldRef<"Project", 'String'>;
    readonly role: Prisma.FieldRef<"Project", 'String'>;
    readonly startedAt: Prisma.FieldRef<"Project", 'DateTime'>;
    readonly endedAt: Prisma.FieldRef<"Project", 'DateTime'>;
    readonly details: Prisma.FieldRef<"Project", 'String'>;
    readonly order: Prisma.FieldRef<"Project", 'Int'>;
    readonly userId: Prisma.FieldRef<"Project", 'String'>;
    readonly logoId: Prisma.FieldRef<"Project", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Project", 'DateTime'>;
}
export type ProjectFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type ProjectFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type ProjectFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type ProjectCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectCreateInput, Prisma.ProjectUncheckedCreateInput>;
};
export type ProjectCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProjectCreateManyInput | Prisma.ProjectCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProjectCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    data: Prisma.ProjectCreateManyInput | Prisma.ProjectCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProjectIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProjectUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectUpdateInput, Prisma.ProjectUncheckedUpdateInput>;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyInput>;
    where?: Prisma.ProjectWhereInput;
    limit?: number;
};
export type ProjectUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyInput>;
    where?: Prisma.ProjectWhereInput;
    limit?: number;
    include?: Prisma.ProjectIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProjectUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateInput, Prisma.ProjectUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProjectUpdateInput, Prisma.ProjectUncheckedUpdateInput>;
};
export type ProjectDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    limit?: number;
};
export type Project$logoArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where?: Prisma.PhotoWhereInput;
};
export type Project$projectContributorsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectContributorSelect<ExtArgs> | null;
    omit?: Prisma.ProjectContributorOmit<ExtArgs> | null;
    include?: Prisma.ProjectContributorInclude<ExtArgs> | null;
    where?: Prisma.ProjectContributorWhereInput;
    orderBy?: Prisma.ProjectContributorOrderByWithRelationInput | Prisma.ProjectContributorOrderByWithRelationInput[];
    cursor?: Prisma.ProjectContributorWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectContributorScalarFieldEnum | Prisma.ProjectContributorScalarFieldEnum[];
};
export type Project$projectLinksArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectLinkSelect<ExtArgs> | null;
    omit?: Prisma.ProjectLinkOmit<ExtArgs> | null;
    include?: Prisma.ProjectLinkInclude<ExtArgs> | null;
    where?: Prisma.ProjectLinkWhereInput;
    orderBy?: Prisma.ProjectLinkOrderByWithRelationInput | Prisma.ProjectLinkOrderByWithRelationInput[];
    cursor?: Prisma.ProjectLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectLinkScalarFieldEnum | Prisma.ProjectLinkScalarFieldEnum[];
};
export type ProjectDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
};
