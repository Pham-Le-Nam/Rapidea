import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ProjectContributorModel = runtime.Types.Result.DefaultSelection<Prisma.$ProjectContributorPayload>;
export type AggregateProjectContributor = {
    _count: ProjectContributorCountAggregateOutputType | null;
    _min: ProjectContributorMinAggregateOutputType | null;
    _max: ProjectContributorMaxAggregateOutputType | null;
};
export type ProjectContributorMinAggregateOutputType = {
    projectId: string | null;
    userId: string | null;
    role: string | null;
    createdAt: Date | null;
};
export type ProjectContributorMaxAggregateOutputType = {
    projectId: string | null;
    userId: string | null;
    role: string | null;
    createdAt: Date | null;
};
export type ProjectContributorCountAggregateOutputType = {
    projectId: number;
    userId: number;
    role: number;
    createdAt: number;
    _all: number;
};
export type ProjectContributorMinAggregateInputType = {
    projectId?: true;
    userId?: true;
    role?: true;
    createdAt?: true;
};
export type ProjectContributorMaxAggregateInputType = {
    projectId?: true;
    userId?: true;
    role?: true;
    createdAt?: true;
};
export type ProjectContributorCountAggregateInputType = {
    projectId?: true;
    userId?: true;
    role?: true;
    createdAt?: true;
    _all?: true;
};
export type ProjectContributorAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectContributorWhereInput;
    orderBy?: Prisma.ProjectContributorOrderByWithRelationInput | Prisma.ProjectContributorOrderByWithRelationInput[];
    cursor?: Prisma.ProjectContributorWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProjectContributorCountAggregateInputType;
    _min?: ProjectContributorMinAggregateInputType;
    _max?: ProjectContributorMaxAggregateInputType;
};
export type GetProjectContributorAggregateType<T extends ProjectContributorAggregateArgs> = {
    [P in keyof T & keyof AggregateProjectContributor]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProjectContributor[P]> : Prisma.GetScalarType<T[P], AggregateProjectContributor[P]>;
};
export type ProjectContributorGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectContributorWhereInput;
    orderBy?: Prisma.ProjectContributorOrderByWithAggregationInput | Prisma.ProjectContributorOrderByWithAggregationInput[];
    by: Prisma.ProjectContributorScalarFieldEnum[] | Prisma.ProjectContributorScalarFieldEnum;
    having?: Prisma.ProjectContributorScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProjectContributorCountAggregateInputType | true;
    _min?: ProjectContributorMinAggregateInputType;
    _max?: ProjectContributorMaxAggregateInputType;
};
export type ProjectContributorGroupByOutputType = {
    projectId: string;
    userId: string;
    role: string;
    createdAt: Date;
    _count: ProjectContributorCountAggregateOutputType | null;
    _min: ProjectContributorMinAggregateOutputType | null;
    _max: ProjectContributorMaxAggregateOutputType | null;
};
export type GetProjectContributorGroupByPayload<T extends ProjectContributorGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProjectContributorGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProjectContributorGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProjectContributorGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProjectContributorGroupByOutputType[P]>;
}>>;
export type ProjectContributorWhereInput = {
    AND?: Prisma.ProjectContributorWhereInput | Prisma.ProjectContributorWhereInput[];
    OR?: Prisma.ProjectContributorWhereInput[];
    NOT?: Prisma.ProjectContributorWhereInput | Prisma.ProjectContributorWhereInput[];
    projectId?: Prisma.StringFilter<"ProjectContributor"> | string;
    userId?: Prisma.StringFilter<"ProjectContributor"> | string;
    role?: Prisma.StringFilter<"ProjectContributor"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProjectContributor"> | Date | string;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
};
export type ProjectContributorOrderByWithRelationInput = {
    projectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    project?: Prisma.ProjectOrderByWithRelationInput;
    user?: Prisma.UsersOrderByWithRelationInput;
};
export type ProjectContributorWhereUniqueInput = Prisma.AtLeast<{
    projectId_userId?: Prisma.ProjectContributorProjectIdUserIdCompoundUniqueInput;
    AND?: Prisma.ProjectContributorWhereInput | Prisma.ProjectContributorWhereInput[];
    OR?: Prisma.ProjectContributorWhereInput[];
    NOT?: Prisma.ProjectContributorWhereInput | Prisma.ProjectContributorWhereInput[];
    projectId?: Prisma.StringFilter<"ProjectContributor"> | string;
    userId?: Prisma.StringFilter<"ProjectContributor"> | string;
    role?: Prisma.StringFilter<"ProjectContributor"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProjectContributor"> | Date | string;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
}, "projectId_userId">;
export type ProjectContributorOrderByWithAggregationInput = {
    projectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ProjectContributorCountOrderByAggregateInput;
    _max?: Prisma.ProjectContributorMaxOrderByAggregateInput;
    _min?: Prisma.ProjectContributorMinOrderByAggregateInput;
};
export type ProjectContributorScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProjectContributorScalarWhereWithAggregatesInput | Prisma.ProjectContributorScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProjectContributorScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProjectContributorScalarWhereWithAggregatesInput | Prisma.ProjectContributorScalarWhereWithAggregatesInput[];
    projectId?: Prisma.StringWithAggregatesFilter<"ProjectContributor"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ProjectContributor"> | string;
    role?: Prisma.StringWithAggregatesFilter<"ProjectContributor"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProjectContributor"> | Date | string;
};
export type ProjectContributorCreateInput = {
    role: string;
    createdAt?: Date | string;
    project: Prisma.ProjectCreateNestedOneWithoutProjectContributorsInput;
    user: Prisma.UsersCreateNestedOneWithoutProjectContributorsInput;
};
export type ProjectContributorUncheckedCreateInput = {
    projectId: string;
    userId: string;
    role: string;
    createdAt?: Date | string;
};
export type ProjectContributorUpdateInput = {
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.ProjectUpdateOneRequiredWithoutProjectContributorsNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutProjectContributorsNestedInput;
};
export type ProjectContributorUncheckedUpdateInput = {
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectContributorCreateManyInput = {
    projectId: string;
    userId: string;
    role: string;
    createdAt?: Date | string;
};
export type ProjectContributorUpdateManyMutationInput = {
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectContributorUncheckedUpdateManyInput = {
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectContributorListRelationFilter = {
    every?: Prisma.ProjectContributorWhereInput;
    some?: Prisma.ProjectContributorWhereInput;
    none?: Prisma.ProjectContributorWhereInput;
};
export type ProjectContributorOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProjectContributorProjectIdUserIdCompoundUniqueInput = {
    projectId: string;
    userId: string;
};
export type ProjectContributorCountOrderByAggregateInput = {
    projectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProjectContributorMaxOrderByAggregateInput = {
    projectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProjectContributorMinOrderByAggregateInput = {
    projectId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProjectContributorCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProjectContributorCreateWithoutUserInput, Prisma.ProjectContributorUncheckedCreateWithoutUserInput> | Prisma.ProjectContributorCreateWithoutUserInput[] | Prisma.ProjectContributorUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProjectContributorCreateOrConnectWithoutUserInput | Prisma.ProjectContributorCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProjectContributorCreateManyUserInputEnvelope;
    connect?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
};
export type ProjectContributorUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProjectContributorCreateWithoutUserInput, Prisma.ProjectContributorUncheckedCreateWithoutUserInput> | Prisma.ProjectContributorCreateWithoutUserInput[] | Prisma.ProjectContributorUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProjectContributorCreateOrConnectWithoutUserInput | Prisma.ProjectContributorCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProjectContributorCreateManyUserInputEnvelope;
    connect?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
};
export type ProjectContributorUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectContributorCreateWithoutUserInput, Prisma.ProjectContributorUncheckedCreateWithoutUserInput> | Prisma.ProjectContributorCreateWithoutUserInput[] | Prisma.ProjectContributorUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProjectContributorCreateOrConnectWithoutUserInput | Prisma.ProjectContributorCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProjectContributorUpsertWithWhereUniqueWithoutUserInput | Prisma.ProjectContributorUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProjectContributorCreateManyUserInputEnvelope;
    set?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    disconnect?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    delete?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    connect?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    update?: Prisma.ProjectContributorUpdateWithWhereUniqueWithoutUserInput | Prisma.ProjectContributorUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProjectContributorUpdateManyWithWhereWithoutUserInput | Prisma.ProjectContributorUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProjectContributorScalarWhereInput | Prisma.ProjectContributorScalarWhereInput[];
};
export type ProjectContributorUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectContributorCreateWithoutUserInput, Prisma.ProjectContributorUncheckedCreateWithoutUserInput> | Prisma.ProjectContributorCreateWithoutUserInput[] | Prisma.ProjectContributorUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProjectContributorCreateOrConnectWithoutUserInput | Prisma.ProjectContributorCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProjectContributorUpsertWithWhereUniqueWithoutUserInput | Prisma.ProjectContributorUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProjectContributorCreateManyUserInputEnvelope;
    set?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    disconnect?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    delete?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    connect?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    update?: Prisma.ProjectContributorUpdateWithWhereUniqueWithoutUserInput | Prisma.ProjectContributorUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProjectContributorUpdateManyWithWhereWithoutUserInput | Prisma.ProjectContributorUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProjectContributorScalarWhereInput | Prisma.ProjectContributorScalarWhereInput[];
};
export type ProjectContributorCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.ProjectContributorCreateWithoutProjectInput, Prisma.ProjectContributorUncheckedCreateWithoutProjectInput> | Prisma.ProjectContributorCreateWithoutProjectInput[] | Prisma.ProjectContributorUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.ProjectContributorCreateOrConnectWithoutProjectInput | Prisma.ProjectContributorCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.ProjectContributorCreateManyProjectInputEnvelope;
    connect?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
};
export type ProjectContributorUncheckedCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.ProjectContributorCreateWithoutProjectInput, Prisma.ProjectContributorUncheckedCreateWithoutProjectInput> | Prisma.ProjectContributorCreateWithoutProjectInput[] | Prisma.ProjectContributorUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.ProjectContributorCreateOrConnectWithoutProjectInput | Prisma.ProjectContributorCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.ProjectContributorCreateManyProjectInputEnvelope;
    connect?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
};
export type ProjectContributorUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectContributorCreateWithoutProjectInput, Prisma.ProjectContributorUncheckedCreateWithoutProjectInput> | Prisma.ProjectContributorCreateWithoutProjectInput[] | Prisma.ProjectContributorUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.ProjectContributorCreateOrConnectWithoutProjectInput | Prisma.ProjectContributorCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.ProjectContributorUpsertWithWhereUniqueWithoutProjectInput | Prisma.ProjectContributorUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.ProjectContributorCreateManyProjectInputEnvelope;
    set?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    disconnect?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    delete?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    connect?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    update?: Prisma.ProjectContributorUpdateWithWhereUniqueWithoutProjectInput | Prisma.ProjectContributorUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.ProjectContributorUpdateManyWithWhereWithoutProjectInput | Prisma.ProjectContributorUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.ProjectContributorScalarWhereInput | Prisma.ProjectContributorScalarWhereInput[];
};
export type ProjectContributorUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectContributorCreateWithoutProjectInput, Prisma.ProjectContributorUncheckedCreateWithoutProjectInput> | Prisma.ProjectContributorCreateWithoutProjectInput[] | Prisma.ProjectContributorUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.ProjectContributorCreateOrConnectWithoutProjectInput | Prisma.ProjectContributorCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.ProjectContributorUpsertWithWhereUniqueWithoutProjectInput | Prisma.ProjectContributorUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.ProjectContributorCreateManyProjectInputEnvelope;
    set?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    disconnect?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    delete?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    connect?: Prisma.ProjectContributorWhereUniqueInput | Prisma.ProjectContributorWhereUniqueInput[];
    update?: Prisma.ProjectContributorUpdateWithWhereUniqueWithoutProjectInput | Prisma.ProjectContributorUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.ProjectContributorUpdateManyWithWhereWithoutProjectInput | Prisma.ProjectContributorUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.ProjectContributorScalarWhereInput | Prisma.ProjectContributorScalarWhereInput[];
};
export type ProjectContributorCreateWithoutUserInput = {
    role: string;
    createdAt?: Date | string;
    project: Prisma.ProjectCreateNestedOneWithoutProjectContributorsInput;
};
export type ProjectContributorUncheckedCreateWithoutUserInput = {
    projectId: string;
    role: string;
    createdAt?: Date | string;
};
export type ProjectContributorCreateOrConnectWithoutUserInput = {
    where: Prisma.ProjectContributorWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectContributorCreateWithoutUserInput, Prisma.ProjectContributorUncheckedCreateWithoutUserInput>;
};
export type ProjectContributorCreateManyUserInputEnvelope = {
    data: Prisma.ProjectContributorCreateManyUserInput | Prisma.ProjectContributorCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ProjectContributorUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProjectContributorWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectContributorUpdateWithoutUserInput, Prisma.ProjectContributorUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ProjectContributorCreateWithoutUserInput, Prisma.ProjectContributorUncheckedCreateWithoutUserInput>;
};
export type ProjectContributorUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProjectContributorWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectContributorUpdateWithoutUserInput, Prisma.ProjectContributorUncheckedUpdateWithoutUserInput>;
};
export type ProjectContributorUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ProjectContributorScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectContributorUpdateManyMutationInput, Prisma.ProjectContributorUncheckedUpdateManyWithoutUserInput>;
};
export type ProjectContributorScalarWhereInput = {
    AND?: Prisma.ProjectContributorScalarWhereInput | Prisma.ProjectContributorScalarWhereInput[];
    OR?: Prisma.ProjectContributorScalarWhereInput[];
    NOT?: Prisma.ProjectContributorScalarWhereInput | Prisma.ProjectContributorScalarWhereInput[];
    projectId?: Prisma.StringFilter<"ProjectContributor"> | string;
    userId?: Prisma.StringFilter<"ProjectContributor"> | string;
    role?: Prisma.StringFilter<"ProjectContributor"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProjectContributor"> | Date | string;
};
export type ProjectContributorCreateWithoutProjectInput = {
    role: string;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutProjectContributorsInput;
};
export type ProjectContributorUncheckedCreateWithoutProjectInput = {
    userId: string;
    role: string;
    createdAt?: Date | string;
};
export type ProjectContributorCreateOrConnectWithoutProjectInput = {
    where: Prisma.ProjectContributorWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectContributorCreateWithoutProjectInput, Prisma.ProjectContributorUncheckedCreateWithoutProjectInput>;
};
export type ProjectContributorCreateManyProjectInputEnvelope = {
    data: Prisma.ProjectContributorCreateManyProjectInput | Prisma.ProjectContributorCreateManyProjectInput[];
    skipDuplicates?: boolean;
};
export type ProjectContributorUpsertWithWhereUniqueWithoutProjectInput = {
    where: Prisma.ProjectContributorWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectContributorUpdateWithoutProjectInput, Prisma.ProjectContributorUncheckedUpdateWithoutProjectInput>;
    create: Prisma.XOR<Prisma.ProjectContributorCreateWithoutProjectInput, Prisma.ProjectContributorUncheckedCreateWithoutProjectInput>;
};
export type ProjectContributorUpdateWithWhereUniqueWithoutProjectInput = {
    where: Prisma.ProjectContributorWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectContributorUpdateWithoutProjectInput, Prisma.ProjectContributorUncheckedUpdateWithoutProjectInput>;
};
export type ProjectContributorUpdateManyWithWhereWithoutProjectInput = {
    where: Prisma.ProjectContributorScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectContributorUpdateManyMutationInput, Prisma.ProjectContributorUncheckedUpdateManyWithoutProjectInput>;
};
export type ProjectContributorCreateManyUserInput = {
    projectId: string;
    role: string;
    createdAt?: Date | string;
};
export type ProjectContributorUpdateWithoutUserInput = {
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.ProjectUpdateOneRequiredWithoutProjectContributorsNestedInput;
};
export type ProjectContributorUncheckedUpdateWithoutUserInput = {
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectContributorUncheckedUpdateManyWithoutUserInput = {
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectContributorCreateManyProjectInput = {
    userId: string;
    role: string;
    createdAt?: Date | string;
};
export type ProjectContributorUpdateWithoutProjectInput = {
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutProjectContributorsNestedInput;
};
export type ProjectContributorUncheckedUpdateWithoutProjectInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectContributorUncheckedUpdateManyWithoutProjectInput = {
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectContributorSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    projectId?: boolean;
    userId?: boolean;
    role?: boolean;
    createdAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["projectContributor"]>;
export type ProjectContributorSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    projectId?: boolean;
    userId?: boolean;
    role?: boolean;
    createdAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["projectContributor"]>;
export type ProjectContributorSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    projectId?: boolean;
    userId?: boolean;
    role?: boolean;
    createdAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["projectContributor"]>;
export type ProjectContributorSelectScalar = {
    projectId?: boolean;
    userId?: boolean;
    role?: boolean;
    createdAt?: boolean;
};
export type ProjectContributorOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"projectId" | "userId" | "role" | "createdAt", ExtArgs["result"]["projectContributor"]>;
export type ProjectContributorInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type ProjectContributorIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type ProjectContributorIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $ProjectContributorPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProjectContributor";
    objects: {
        project: Prisma.$ProjectPayload<ExtArgs>;
        user: Prisma.$UsersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        projectId: string;
        userId: string;
        role: string;
        createdAt: Date;
    }, ExtArgs["result"]["projectContributor"]>;
    composites: {};
};
export type ProjectContributorGetPayload<S extends boolean | null | undefined | ProjectContributorDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProjectContributorPayload, S>;
export type ProjectContributorCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProjectContributorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProjectContributorCountAggregateInputType | true;
};
export interface ProjectContributorDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProjectContributor'];
        meta: {
            name: 'ProjectContributor';
        };
    };
    findUnique<T extends ProjectContributorFindUniqueArgs>(args: Prisma.SelectSubset<T, ProjectContributorFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProjectContributorClient<runtime.Types.Result.GetResult<Prisma.$ProjectContributorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProjectContributorFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProjectContributorFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectContributorClient<runtime.Types.Result.GetResult<Prisma.$ProjectContributorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProjectContributorFindFirstArgs>(args?: Prisma.SelectSubset<T, ProjectContributorFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProjectContributorClient<runtime.Types.Result.GetResult<Prisma.$ProjectContributorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProjectContributorFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProjectContributorFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectContributorClient<runtime.Types.Result.GetResult<Prisma.$ProjectContributorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProjectContributorFindManyArgs>(args?: Prisma.SelectSubset<T, ProjectContributorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectContributorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProjectContributorCreateArgs>(args: Prisma.SelectSubset<T, ProjectContributorCreateArgs<ExtArgs>>): Prisma.Prisma__ProjectContributorClient<runtime.Types.Result.GetResult<Prisma.$ProjectContributorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProjectContributorCreateManyArgs>(args?: Prisma.SelectSubset<T, ProjectContributorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProjectContributorCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProjectContributorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectContributorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProjectContributorDeleteArgs>(args: Prisma.SelectSubset<T, ProjectContributorDeleteArgs<ExtArgs>>): Prisma.Prisma__ProjectContributorClient<runtime.Types.Result.GetResult<Prisma.$ProjectContributorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProjectContributorUpdateArgs>(args: Prisma.SelectSubset<T, ProjectContributorUpdateArgs<ExtArgs>>): Prisma.Prisma__ProjectContributorClient<runtime.Types.Result.GetResult<Prisma.$ProjectContributorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProjectContributorDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProjectContributorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProjectContributorUpdateManyArgs>(args: Prisma.SelectSubset<T, ProjectContributorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProjectContributorUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProjectContributorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectContributorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProjectContributorUpsertArgs>(args: Prisma.SelectSubset<T, ProjectContributorUpsertArgs<ExtArgs>>): Prisma.Prisma__ProjectContributorClient<runtime.Types.Result.GetResult<Prisma.$ProjectContributorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProjectContributorCountArgs>(args?: Prisma.Subset<T, ProjectContributorCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProjectContributorCountAggregateOutputType> : number>;
    aggregate<T extends ProjectContributorAggregateArgs>(args: Prisma.Subset<T, ProjectContributorAggregateArgs>): Prisma.PrismaPromise<GetProjectContributorAggregateType<T>>;
    groupBy<T extends ProjectContributorGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProjectContributorGroupByArgs['orderBy'];
    } : {
        orderBy?: ProjectContributorGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProjectContributorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectContributorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProjectContributorFieldRefs;
}
export interface Prisma__ProjectContributorClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    project<T extends Prisma.ProjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProjectDefaultArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProjectContributorFieldRefs {
    readonly projectId: Prisma.FieldRef<"ProjectContributor", 'String'>;
    readonly userId: Prisma.FieldRef<"ProjectContributor", 'String'>;
    readonly role: Prisma.FieldRef<"ProjectContributor", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ProjectContributor", 'DateTime'>;
}
export type ProjectContributorFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectContributorSelect<ExtArgs> | null;
    omit?: Prisma.ProjectContributorOmit<ExtArgs> | null;
    include?: Prisma.ProjectContributorInclude<ExtArgs> | null;
    where: Prisma.ProjectContributorWhereUniqueInput;
};
export type ProjectContributorFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectContributorSelect<ExtArgs> | null;
    omit?: Prisma.ProjectContributorOmit<ExtArgs> | null;
    include?: Prisma.ProjectContributorInclude<ExtArgs> | null;
    where: Prisma.ProjectContributorWhereUniqueInput;
};
export type ProjectContributorFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProjectContributorFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProjectContributorFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProjectContributorCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectContributorSelect<ExtArgs> | null;
    omit?: Prisma.ProjectContributorOmit<ExtArgs> | null;
    include?: Prisma.ProjectContributorInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectContributorCreateInput, Prisma.ProjectContributorUncheckedCreateInput>;
};
export type ProjectContributorCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProjectContributorCreateManyInput | Prisma.ProjectContributorCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProjectContributorCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectContributorSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectContributorOmit<ExtArgs> | null;
    data: Prisma.ProjectContributorCreateManyInput | Prisma.ProjectContributorCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProjectContributorIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProjectContributorUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectContributorSelect<ExtArgs> | null;
    omit?: Prisma.ProjectContributorOmit<ExtArgs> | null;
    include?: Prisma.ProjectContributorInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectContributorUpdateInput, Prisma.ProjectContributorUncheckedUpdateInput>;
    where: Prisma.ProjectContributorWhereUniqueInput;
};
export type ProjectContributorUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProjectContributorUpdateManyMutationInput, Prisma.ProjectContributorUncheckedUpdateManyInput>;
    where?: Prisma.ProjectContributorWhereInput;
    limit?: number;
};
export type ProjectContributorUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectContributorSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectContributorOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectContributorUpdateManyMutationInput, Prisma.ProjectContributorUncheckedUpdateManyInput>;
    where?: Prisma.ProjectContributorWhereInput;
    limit?: number;
    include?: Prisma.ProjectContributorIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProjectContributorUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectContributorSelect<ExtArgs> | null;
    omit?: Prisma.ProjectContributorOmit<ExtArgs> | null;
    include?: Prisma.ProjectContributorInclude<ExtArgs> | null;
    where: Prisma.ProjectContributorWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectContributorCreateInput, Prisma.ProjectContributorUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProjectContributorUpdateInput, Prisma.ProjectContributorUncheckedUpdateInput>;
};
export type ProjectContributorDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectContributorSelect<ExtArgs> | null;
    omit?: Prisma.ProjectContributorOmit<ExtArgs> | null;
    include?: Prisma.ProjectContributorInclude<ExtArgs> | null;
    where: Prisma.ProjectContributorWhereUniqueInput;
};
export type ProjectContributorDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectContributorWhereInput;
    limit?: number;
};
export type ProjectContributorDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectContributorSelect<ExtArgs> | null;
    omit?: Prisma.ProjectContributorOmit<ExtArgs> | null;
    include?: Prisma.ProjectContributorInclude<ExtArgs> | null;
};
