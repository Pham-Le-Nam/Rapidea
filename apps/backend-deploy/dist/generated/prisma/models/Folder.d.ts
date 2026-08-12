import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type FolderModel = runtime.Types.Result.DefaultSelection<Prisma.$FolderPayload>;
export type AggregateFolder = {
    _count: FolderCountAggregateOutputType | null;
    _min: FolderMinAggregateOutputType | null;
    _max: FolderMaxAggregateOutputType | null;
};
export type FolderMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    parentId: string | null;
    createdAt: Date | null;
};
export type FolderMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    name: string | null;
    parentId: string | null;
    createdAt: Date | null;
};
export type FolderCountAggregateOutputType = {
    id: number;
    userId: number;
    name: number;
    parentId: number;
    createdAt: number;
    _all: number;
};
export type FolderMinAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    parentId?: true;
    createdAt?: true;
};
export type FolderMaxAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    parentId?: true;
    createdAt?: true;
};
export type FolderCountAggregateInputType = {
    id?: true;
    userId?: true;
    name?: true;
    parentId?: true;
    createdAt?: true;
    _all?: true;
};
export type FolderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FolderWhereInput;
    orderBy?: Prisma.FolderOrderByWithRelationInput | Prisma.FolderOrderByWithRelationInput[];
    cursor?: Prisma.FolderWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FolderCountAggregateInputType;
    _min?: FolderMinAggregateInputType;
    _max?: FolderMaxAggregateInputType;
};
export type GetFolderAggregateType<T extends FolderAggregateArgs> = {
    [P in keyof T & keyof AggregateFolder]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFolder[P]> : Prisma.GetScalarType<T[P], AggregateFolder[P]>;
};
export type FolderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FolderWhereInput;
    orderBy?: Prisma.FolderOrderByWithAggregationInput | Prisma.FolderOrderByWithAggregationInput[];
    by: Prisma.FolderScalarFieldEnum[] | Prisma.FolderScalarFieldEnum;
    having?: Prisma.FolderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FolderCountAggregateInputType | true;
    _min?: FolderMinAggregateInputType;
    _max?: FolderMaxAggregateInputType;
};
export type FolderGroupByOutputType = {
    id: string;
    userId: string;
    name: string;
    parentId: string | null;
    createdAt: Date;
    _count: FolderCountAggregateOutputType | null;
    _min: FolderMinAggregateOutputType | null;
    _max: FolderMaxAggregateOutputType | null;
};
export type GetFolderGroupByPayload<T extends FolderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FolderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FolderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FolderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FolderGroupByOutputType[P]>;
}>>;
export type FolderWhereInput = {
    AND?: Prisma.FolderWhereInput | Prisma.FolderWhereInput[];
    OR?: Prisma.FolderWhereInput[];
    NOT?: Prisma.FolderWhereInput | Prisma.FolderWhereInput[];
    id?: Prisma.StringFilter<"Folder"> | string;
    userId?: Prisma.StringFilter<"Folder"> | string;
    name?: Prisma.StringFilter<"Folder"> | string;
    parentId?: Prisma.StringNullableFilter<"Folder"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Folder"> | Date | string;
    parentFolder?: Prisma.XOR<Prisma.FolderNullableScalarRelationFilter, Prisma.FolderWhereInput> | null;
    course?: Prisma.XOR<Prisma.CourseNullableScalarRelationFilter, Prisma.CourseWhereInput> | null;
    files?: Prisma.FileListRelationFilter;
    childrenFolders?: Prisma.FolderListRelationFilter;
};
export type FolderOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    parentFolder?: Prisma.FolderOrderByWithRelationInput;
    course?: Prisma.CourseOrderByWithRelationInput;
    files?: Prisma.FileOrderByRelationAggregateInput;
    childrenFolders?: Prisma.FolderOrderByRelationAggregateInput;
};
export type FolderWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    parentId_name?: Prisma.FolderParentIdNameCompoundUniqueInput;
    AND?: Prisma.FolderWhereInput | Prisma.FolderWhereInput[];
    OR?: Prisma.FolderWhereInput[];
    NOT?: Prisma.FolderWhereInput | Prisma.FolderWhereInput[];
    userId?: Prisma.StringFilter<"Folder"> | string;
    name?: Prisma.StringFilter<"Folder"> | string;
    parentId?: Prisma.StringNullableFilter<"Folder"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Folder"> | Date | string;
    parentFolder?: Prisma.XOR<Prisma.FolderNullableScalarRelationFilter, Prisma.FolderWhereInput> | null;
    course?: Prisma.XOR<Prisma.CourseNullableScalarRelationFilter, Prisma.CourseWhereInput> | null;
    files?: Prisma.FileListRelationFilter;
    childrenFolders?: Prisma.FolderListRelationFilter;
}, "id" | "parentId_name">;
export type FolderOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    parentId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FolderCountOrderByAggregateInput;
    _max?: Prisma.FolderMaxOrderByAggregateInput;
    _min?: Prisma.FolderMinOrderByAggregateInput;
};
export type FolderScalarWhereWithAggregatesInput = {
    AND?: Prisma.FolderScalarWhereWithAggregatesInput | Prisma.FolderScalarWhereWithAggregatesInput[];
    OR?: Prisma.FolderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FolderScalarWhereWithAggregatesInput | Prisma.FolderScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Folder"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Folder"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Folder"> | string;
    parentId?: Prisma.StringNullableWithAggregatesFilter<"Folder"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Folder"> | Date | string;
};
export type FolderCreateInput = {
    id?: string;
    userId: string;
    name: string;
    createdAt?: Date | string;
    parentFolder?: Prisma.FolderCreateNestedOneWithoutChildrenFoldersInput;
    course?: Prisma.CourseCreateNestedOneWithoutFolderInput;
    files?: Prisma.FileCreateNestedManyWithoutFolderInput;
    childrenFolders?: Prisma.FolderCreateNestedManyWithoutParentFolderInput;
};
export type FolderUncheckedCreateInput = {
    id?: string;
    userId: string;
    name: string;
    parentId?: string | null;
    createdAt?: Date | string;
    course?: Prisma.CourseUncheckedCreateNestedOneWithoutFolderInput;
    files?: Prisma.FileUncheckedCreateNestedManyWithoutFolderInput;
    childrenFolders?: Prisma.FolderUncheckedCreateNestedManyWithoutParentFolderInput;
};
export type FolderUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parentFolder?: Prisma.FolderUpdateOneWithoutChildrenFoldersNestedInput;
    course?: Prisma.CourseUpdateOneWithoutFolderNestedInput;
    files?: Prisma.FileUpdateManyWithoutFolderNestedInput;
    childrenFolders?: Prisma.FolderUpdateManyWithoutParentFolderNestedInput;
};
export type FolderUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUncheckedUpdateOneWithoutFolderNestedInput;
    files?: Prisma.FileUncheckedUpdateManyWithoutFolderNestedInput;
    childrenFolders?: Prisma.FolderUncheckedUpdateManyWithoutParentFolderNestedInput;
};
export type FolderCreateManyInput = {
    id?: string;
    userId: string;
    name: string;
    parentId?: string | null;
    createdAt?: Date | string;
};
export type FolderUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FolderUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FolderScalarRelationFilter = {
    is?: Prisma.FolderWhereInput;
    isNot?: Prisma.FolderWhereInput;
};
export type FolderNullableScalarRelationFilter = {
    is?: Prisma.FolderWhereInput | null;
    isNot?: Prisma.FolderWhereInput | null;
};
export type FolderListRelationFilter = {
    every?: Prisma.FolderWhereInput;
    some?: Prisma.FolderWhereInput;
    none?: Prisma.FolderWhereInput;
};
export type FolderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FolderParentIdNameCompoundUniqueInput = {
    parentId: string;
    name: string;
};
export type FolderCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FolderMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FolderMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    parentId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FolderCreateNestedOneWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.FolderCreateWithoutCourseInput, Prisma.FolderUncheckedCreateWithoutCourseInput>;
    connectOrCreate?: Prisma.FolderCreateOrConnectWithoutCourseInput;
    connect?: Prisma.FolderWhereUniqueInput;
};
export type FolderUpdateOneRequiredWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.FolderCreateWithoutCourseInput, Prisma.FolderUncheckedCreateWithoutCourseInput>;
    connectOrCreate?: Prisma.FolderCreateOrConnectWithoutCourseInput;
    upsert?: Prisma.FolderUpsertWithoutCourseInput;
    connect?: Prisma.FolderWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FolderUpdateToOneWithWhereWithoutCourseInput, Prisma.FolderUpdateWithoutCourseInput>, Prisma.FolderUncheckedUpdateWithoutCourseInput>;
};
export type FolderCreateNestedOneWithoutChildrenFoldersInput = {
    create?: Prisma.XOR<Prisma.FolderCreateWithoutChildrenFoldersInput, Prisma.FolderUncheckedCreateWithoutChildrenFoldersInput>;
    connectOrCreate?: Prisma.FolderCreateOrConnectWithoutChildrenFoldersInput;
    connect?: Prisma.FolderWhereUniqueInput;
};
export type FolderCreateNestedManyWithoutParentFolderInput = {
    create?: Prisma.XOR<Prisma.FolderCreateWithoutParentFolderInput, Prisma.FolderUncheckedCreateWithoutParentFolderInput> | Prisma.FolderCreateWithoutParentFolderInput[] | Prisma.FolderUncheckedCreateWithoutParentFolderInput[];
    connectOrCreate?: Prisma.FolderCreateOrConnectWithoutParentFolderInput | Prisma.FolderCreateOrConnectWithoutParentFolderInput[];
    createMany?: Prisma.FolderCreateManyParentFolderInputEnvelope;
    connect?: Prisma.FolderWhereUniqueInput | Prisma.FolderWhereUniqueInput[];
};
export type FolderUncheckedCreateNestedManyWithoutParentFolderInput = {
    create?: Prisma.XOR<Prisma.FolderCreateWithoutParentFolderInput, Prisma.FolderUncheckedCreateWithoutParentFolderInput> | Prisma.FolderCreateWithoutParentFolderInput[] | Prisma.FolderUncheckedCreateWithoutParentFolderInput[];
    connectOrCreate?: Prisma.FolderCreateOrConnectWithoutParentFolderInput | Prisma.FolderCreateOrConnectWithoutParentFolderInput[];
    createMany?: Prisma.FolderCreateManyParentFolderInputEnvelope;
    connect?: Prisma.FolderWhereUniqueInput | Prisma.FolderWhereUniqueInput[];
};
export type FolderUpdateOneWithoutChildrenFoldersNestedInput = {
    create?: Prisma.XOR<Prisma.FolderCreateWithoutChildrenFoldersInput, Prisma.FolderUncheckedCreateWithoutChildrenFoldersInput>;
    connectOrCreate?: Prisma.FolderCreateOrConnectWithoutChildrenFoldersInput;
    upsert?: Prisma.FolderUpsertWithoutChildrenFoldersInput;
    disconnect?: Prisma.FolderWhereInput | boolean;
    delete?: Prisma.FolderWhereInput | boolean;
    connect?: Prisma.FolderWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FolderUpdateToOneWithWhereWithoutChildrenFoldersInput, Prisma.FolderUpdateWithoutChildrenFoldersInput>, Prisma.FolderUncheckedUpdateWithoutChildrenFoldersInput>;
};
export type FolderUpdateManyWithoutParentFolderNestedInput = {
    create?: Prisma.XOR<Prisma.FolderCreateWithoutParentFolderInput, Prisma.FolderUncheckedCreateWithoutParentFolderInput> | Prisma.FolderCreateWithoutParentFolderInput[] | Prisma.FolderUncheckedCreateWithoutParentFolderInput[];
    connectOrCreate?: Prisma.FolderCreateOrConnectWithoutParentFolderInput | Prisma.FolderCreateOrConnectWithoutParentFolderInput[];
    upsert?: Prisma.FolderUpsertWithWhereUniqueWithoutParentFolderInput | Prisma.FolderUpsertWithWhereUniqueWithoutParentFolderInput[];
    createMany?: Prisma.FolderCreateManyParentFolderInputEnvelope;
    set?: Prisma.FolderWhereUniqueInput | Prisma.FolderWhereUniqueInput[];
    disconnect?: Prisma.FolderWhereUniqueInput | Prisma.FolderWhereUniqueInput[];
    delete?: Prisma.FolderWhereUniqueInput | Prisma.FolderWhereUniqueInput[];
    connect?: Prisma.FolderWhereUniqueInput | Prisma.FolderWhereUniqueInput[];
    update?: Prisma.FolderUpdateWithWhereUniqueWithoutParentFolderInput | Prisma.FolderUpdateWithWhereUniqueWithoutParentFolderInput[];
    updateMany?: Prisma.FolderUpdateManyWithWhereWithoutParentFolderInput | Prisma.FolderUpdateManyWithWhereWithoutParentFolderInput[];
    deleteMany?: Prisma.FolderScalarWhereInput | Prisma.FolderScalarWhereInput[];
};
export type FolderUncheckedUpdateManyWithoutParentFolderNestedInput = {
    create?: Prisma.XOR<Prisma.FolderCreateWithoutParentFolderInput, Prisma.FolderUncheckedCreateWithoutParentFolderInput> | Prisma.FolderCreateWithoutParentFolderInput[] | Prisma.FolderUncheckedCreateWithoutParentFolderInput[];
    connectOrCreate?: Prisma.FolderCreateOrConnectWithoutParentFolderInput | Prisma.FolderCreateOrConnectWithoutParentFolderInput[];
    upsert?: Prisma.FolderUpsertWithWhereUniqueWithoutParentFolderInput | Prisma.FolderUpsertWithWhereUniqueWithoutParentFolderInput[];
    createMany?: Prisma.FolderCreateManyParentFolderInputEnvelope;
    set?: Prisma.FolderWhereUniqueInput | Prisma.FolderWhereUniqueInput[];
    disconnect?: Prisma.FolderWhereUniqueInput | Prisma.FolderWhereUniqueInput[];
    delete?: Prisma.FolderWhereUniqueInput | Prisma.FolderWhereUniqueInput[];
    connect?: Prisma.FolderWhereUniqueInput | Prisma.FolderWhereUniqueInput[];
    update?: Prisma.FolderUpdateWithWhereUniqueWithoutParentFolderInput | Prisma.FolderUpdateWithWhereUniqueWithoutParentFolderInput[];
    updateMany?: Prisma.FolderUpdateManyWithWhereWithoutParentFolderInput | Prisma.FolderUpdateManyWithWhereWithoutParentFolderInput[];
    deleteMany?: Prisma.FolderScalarWhereInput | Prisma.FolderScalarWhereInput[];
};
export type FolderCreateNestedOneWithoutFilesInput = {
    create?: Prisma.XOR<Prisma.FolderCreateWithoutFilesInput, Prisma.FolderUncheckedCreateWithoutFilesInput>;
    connectOrCreate?: Prisma.FolderCreateOrConnectWithoutFilesInput;
    connect?: Prisma.FolderWhereUniqueInput;
};
export type FolderUpdateOneRequiredWithoutFilesNestedInput = {
    create?: Prisma.XOR<Prisma.FolderCreateWithoutFilesInput, Prisma.FolderUncheckedCreateWithoutFilesInput>;
    connectOrCreate?: Prisma.FolderCreateOrConnectWithoutFilesInput;
    upsert?: Prisma.FolderUpsertWithoutFilesInput;
    connect?: Prisma.FolderWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FolderUpdateToOneWithWhereWithoutFilesInput, Prisma.FolderUpdateWithoutFilesInput>, Prisma.FolderUncheckedUpdateWithoutFilesInput>;
};
export type FolderCreateWithoutCourseInput = {
    id?: string;
    userId: string;
    name: string;
    createdAt?: Date | string;
    parentFolder?: Prisma.FolderCreateNestedOneWithoutChildrenFoldersInput;
    files?: Prisma.FileCreateNestedManyWithoutFolderInput;
    childrenFolders?: Prisma.FolderCreateNestedManyWithoutParentFolderInput;
};
export type FolderUncheckedCreateWithoutCourseInput = {
    id?: string;
    userId: string;
    name: string;
    parentId?: string | null;
    createdAt?: Date | string;
    files?: Prisma.FileUncheckedCreateNestedManyWithoutFolderInput;
    childrenFolders?: Prisma.FolderUncheckedCreateNestedManyWithoutParentFolderInput;
};
export type FolderCreateOrConnectWithoutCourseInput = {
    where: Prisma.FolderWhereUniqueInput;
    create: Prisma.XOR<Prisma.FolderCreateWithoutCourseInput, Prisma.FolderUncheckedCreateWithoutCourseInput>;
};
export type FolderUpsertWithoutCourseInput = {
    update: Prisma.XOR<Prisma.FolderUpdateWithoutCourseInput, Prisma.FolderUncheckedUpdateWithoutCourseInput>;
    create: Prisma.XOR<Prisma.FolderCreateWithoutCourseInput, Prisma.FolderUncheckedCreateWithoutCourseInput>;
    where?: Prisma.FolderWhereInput;
};
export type FolderUpdateToOneWithWhereWithoutCourseInput = {
    where?: Prisma.FolderWhereInput;
    data: Prisma.XOR<Prisma.FolderUpdateWithoutCourseInput, Prisma.FolderUncheckedUpdateWithoutCourseInput>;
};
export type FolderUpdateWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parentFolder?: Prisma.FolderUpdateOneWithoutChildrenFoldersNestedInput;
    files?: Prisma.FileUpdateManyWithoutFolderNestedInput;
    childrenFolders?: Prisma.FolderUpdateManyWithoutParentFolderNestedInput;
};
export type FolderUncheckedUpdateWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    files?: Prisma.FileUncheckedUpdateManyWithoutFolderNestedInput;
    childrenFolders?: Prisma.FolderUncheckedUpdateManyWithoutParentFolderNestedInput;
};
export type FolderCreateWithoutChildrenFoldersInput = {
    id?: string;
    userId: string;
    name: string;
    createdAt?: Date | string;
    parentFolder?: Prisma.FolderCreateNestedOneWithoutChildrenFoldersInput;
    course?: Prisma.CourseCreateNestedOneWithoutFolderInput;
    files?: Prisma.FileCreateNestedManyWithoutFolderInput;
};
export type FolderUncheckedCreateWithoutChildrenFoldersInput = {
    id?: string;
    userId: string;
    name: string;
    parentId?: string | null;
    createdAt?: Date | string;
    course?: Prisma.CourseUncheckedCreateNestedOneWithoutFolderInput;
    files?: Prisma.FileUncheckedCreateNestedManyWithoutFolderInput;
};
export type FolderCreateOrConnectWithoutChildrenFoldersInput = {
    where: Prisma.FolderWhereUniqueInput;
    create: Prisma.XOR<Prisma.FolderCreateWithoutChildrenFoldersInput, Prisma.FolderUncheckedCreateWithoutChildrenFoldersInput>;
};
export type FolderCreateWithoutParentFolderInput = {
    id?: string;
    userId: string;
    name: string;
    createdAt?: Date | string;
    course?: Prisma.CourseCreateNestedOneWithoutFolderInput;
    files?: Prisma.FileCreateNestedManyWithoutFolderInput;
    childrenFolders?: Prisma.FolderCreateNestedManyWithoutParentFolderInput;
};
export type FolderUncheckedCreateWithoutParentFolderInput = {
    id?: string;
    userId: string;
    name: string;
    createdAt?: Date | string;
    course?: Prisma.CourseUncheckedCreateNestedOneWithoutFolderInput;
    files?: Prisma.FileUncheckedCreateNestedManyWithoutFolderInput;
    childrenFolders?: Prisma.FolderUncheckedCreateNestedManyWithoutParentFolderInput;
};
export type FolderCreateOrConnectWithoutParentFolderInput = {
    where: Prisma.FolderWhereUniqueInput;
    create: Prisma.XOR<Prisma.FolderCreateWithoutParentFolderInput, Prisma.FolderUncheckedCreateWithoutParentFolderInput>;
};
export type FolderCreateManyParentFolderInputEnvelope = {
    data: Prisma.FolderCreateManyParentFolderInput | Prisma.FolderCreateManyParentFolderInput[];
    skipDuplicates?: boolean;
};
export type FolderUpsertWithoutChildrenFoldersInput = {
    update: Prisma.XOR<Prisma.FolderUpdateWithoutChildrenFoldersInput, Prisma.FolderUncheckedUpdateWithoutChildrenFoldersInput>;
    create: Prisma.XOR<Prisma.FolderCreateWithoutChildrenFoldersInput, Prisma.FolderUncheckedCreateWithoutChildrenFoldersInput>;
    where?: Prisma.FolderWhereInput;
};
export type FolderUpdateToOneWithWhereWithoutChildrenFoldersInput = {
    where?: Prisma.FolderWhereInput;
    data: Prisma.XOR<Prisma.FolderUpdateWithoutChildrenFoldersInput, Prisma.FolderUncheckedUpdateWithoutChildrenFoldersInput>;
};
export type FolderUpdateWithoutChildrenFoldersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parentFolder?: Prisma.FolderUpdateOneWithoutChildrenFoldersNestedInput;
    course?: Prisma.CourseUpdateOneWithoutFolderNestedInput;
    files?: Prisma.FileUpdateManyWithoutFolderNestedInput;
};
export type FolderUncheckedUpdateWithoutChildrenFoldersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUncheckedUpdateOneWithoutFolderNestedInput;
    files?: Prisma.FileUncheckedUpdateManyWithoutFolderNestedInput;
};
export type FolderUpsertWithWhereUniqueWithoutParentFolderInput = {
    where: Prisma.FolderWhereUniqueInput;
    update: Prisma.XOR<Prisma.FolderUpdateWithoutParentFolderInput, Prisma.FolderUncheckedUpdateWithoutParentFolderInput>;
    create: Prisma.XOR<Prisma.FolderCreateWithoutParentFolderInput, Prisma.FolderUncheckedCreateWithoutParentFolderInput>;
};
export type FolderUpdateWithWhereUniqueWithoutParentFolderInput = {
    where: Prisma.FolderWhereUniqueInput;
    data: Prisma.XOR<Prisma.FolderUpdateWithoutParentFolderInput, Prisma.FolderUncheckedUpdateWithoutParentFolderInput>;
};
export type FolderUpdateManyWithWhereWithoutParentFolderInput = {
    where: Prisma.FolderScalarWhereInput;
    data: Prisma.XOR<Prisma.FolderUpdateManyMutationInput, Prisma.FolderUncheckedUpdateManyWithoutParentFolderInput>;
};
export type FolderScalarWhereInput = {
    AND?: Prisma.FolderScalarWhereInput | Prisma.FolderScalarWhereInput[];
    OR?: Prisma.FolderScalarWhereInput[];
    NOT?: Prisma.FolderScalarWhereInput | Prisma.FolderScalarWhereInput[];
    id?: Prisma.StringFilter<"Folder"> | string;
    userId?: Prisma.StringFilter<"Folder"> | string;
    name?: Prisma.StringFilter<"Folder"> | string;
    parentId?: Prisma.StringNullableFilter<"Folder"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Folder"> | Date | string;
};
export type FolderCreateWithoutFilesInput = {
    id?: string;
    userId: string;
    name: string;
    createdAt?: Date | string;
    parentFolder?: Prisma.FolderCreateNestedOneWithoutChildrenFoldersInput;
    course?: Prisma.CourseCreateNestedOneWithoutFolderInput;
    childrenFolders?: Prisma.FolderCreateNestedManyWithoutParentFolderInput;
};
export type FolderUncheckedCreateWithoutFilesInput = {
    id?: string;
    userId: string;
    name: string;
    parentId?: string | null;
    createdAt?: Date | string;
    course?: Prisma.CourseUncheckedCreateNestedOneWithoutFolderInput;
    childrenFolders?: Prisma.FolderUncheckedCreateNestedManyWithoutParentFolderInput;
};
export type FolderCreateOrConnectWithoutFilesInput = {
    where: Prisma.FolderWhereUniqueInput;
    create: Prisma.XOR<Prisma.FolderCreateWithoutFilesInput, Prisma.FolderUncheckedCreateWithoutFilesInput>;
};
export type FolderUpsertWithoutFilesInput = {
    update: Prisma.XOR<Prisma.FolderUpdateWithoutFilesInput, Prisma.FolderUncheckedUpdateWithoutFilesInput>;
    create: Prisma.XOR<Prisma.FolderCreateWithoutFilesInput, Prisma.FolderUncheckedCreateWithoutFilesInput>;
    where?: Prisma.FolderWhereInput;
};
export type FolderUpdateToOneWithWhereWithoutFilesInput = {
    where?: Prisma.FolderWhereInput;
    data: Prisma.XOR<Prisma.FolderUpdateWithoutFilesInput, Prisma.FolderUncheckedUpdateWithoutFilesInput>;
};
export type FolderUpdateWithoutFilesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    parentFolder?: Prisma.FolderUpdateOneWithoutChildrenFoldersNestedInput;
    course?: Prisma.CourseUpdateOneWithoutFolderNestedInput;
    childrenFolders?: Prisma.FolderUpdateManyWithoutParentFolderNestedInput;
};
export type FolderUncheckedUpdateWithoutFilesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    parentId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUncheckedUpdateOneWithoutFolderNestedInput;
    childrenFolders?: Prisma.FolderUncheckedUpdateManyWithoutParentFolderNestedInput;
};
export type FolderCreateManyParentFolderInput = {
    id?: string;
    userId: string;
    name: string;
    createdAt?: Date | string;
};
export type FolderUpdateWithoutParentFolderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUpdateOneWithoutFolderNestedInput;
    files?: Prisma.FileUpdateManyWithoutFolderNestedInput;
    childrenFolders?: Prisma.FolderUpdateManyWithoutParentFolderNestedInput;
};
export type FolderUncheckedUpdateWithoutParentFolderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUncheckedUpdateOneWithoutFolderNestedInput;
    files?: Prisma.FileUncheckedUpdateManyWithoutFolderNestedInput;
    childrenFolders?: Prisma.FolderUncheckedUpdateManyWithoutParentFolderNestedInput;
};
export type FolderUncheckedUpdateManyWithoutParentFolderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FolderCountOutputType = {
    files: number;
    childrenFolders: number;
};
export type FolderCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    files?: boolean | FolderCountOutputTypeCountFilesArgs;
    childrenFolders?: boolean | FolderCountOutputTypeCountChildrenFoldersArgs;
};
export type FolderCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderCountOutputTypeSelect<ExtArgs> | null;
};
export type FolderCountOutputTypeCountFilesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileWhereInput;
};
export type FolderCountOutputTypeCountChildrenFoldersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FolderWhereInput;
};
export type FolderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    parentId?: boolean;
    createdAt?: boolean;
    parentFolder?: boolean | Prisma.Folder$parentFolderArgs<ExtArgs>;
    course?: boolean | Prisma.Folder$courseArgs<ExtArgs>;
    files?: boolean | Prisma.Folder$filesArgs<ExtArgs>;
    childrenFolders?: boolean | Prisma.Folder$childrenFoldersArgs<ExtArgs>;
    _count?: boolean | Prisma.FolderCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["folder"]>;
export type FolderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    parentId?: boolean;
    createdAt?: boolean;
    parentFolder?: boolean | Prisma.Folder$parentFolderArgs<ExtArgs>;
}, ExtArgs["result"]["folder"]>;
export type FolderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    parentId?: boolean;
    createdAt?: boolean;
    parentFolder?: boolean | Prisma.Folder$parentFolderArgs<ExtArgs>;
}, ExtArgs["result"]["folder"]>;
export type FolderSelectScalar = {
    id?: boolean;
    userId?: boolean;
    name?: boolean;
    parentId?: boolean;
    createdAt?: boolean;
};
export type FolderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "name" | "parentId" | "createdAt", ExtArgs["result"]["folder"]>;
export type FolderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parentFolder?: boolean | Prisma.Folder$parentFolderArgs<ExtArgs>;
    course?: boolean | Prisma.Folder$courseArgs<ExtArgs>;
    files?: boolean | Prisma.Folder$filesArgs<ExtArgs>;
    childrenFolders?: boolean | Prisma.Folder$childrenFoldersArgs<ExtArgs>;
    _count?: boolean | Prisma.FolderCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FolderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parentFolder?: boolean | Prisma.Folder$parentFolderArgs<ExtArgs>;
};
export type FolderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    parentFolder?: boolean | Prisma.Folder$parentFolderArgs<ExtArgs>;
};
export type $FolderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Folder";
    objects: {
        parentFolder: Prisma.$FolderPayload<ExtArgs> | null;
        course: Prisma.$CoursePayload<ExtArgs> | null;
        files: Prisma.$FilePayload<ExtArgs>[];
        childrenFolders: Prisma.$FolderPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        name: string;
        parentId: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["folder"]>;
    composites: {};
};
export type FolderGetPayload<S extends boolean | null | undefined | FolderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FolderPayload, S>;
export type FolderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FolderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FolderCountAggregateInputType | true;
};
export interface FolderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Folder'];
        meta: {
            name: 'Folder';
        };
    };
    findUnique<T extends FolderFindUniqueArgs>(args: Prisma.SelectSubset<T, FolderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FolderClient<runtime.Types.Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FolderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FolderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FolderClient<runtime.Types.Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FolderFindFirstArgs>(args?: Prisma.SelectSubset<T, FolderFindFirstArgs<ExtArgs>>): Prisma.Prisma__FolderClient<runtime.Types.Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FolderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FolderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FolderClient<runtime.Types.Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FolderFindManyArgs>(args?: Prisma.SelectSubset<T, FolderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FolderCreateArgs>(args: Prisma.SelectSubset<T, FolderCreateArgs<ExtArgs>>): Prisma.Prisma__FolderClient<runtime.Types.Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FolderCreateManyArgs>(args?: Prisma.SelectSubset<T, FolderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FolderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FolderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FolderDeleteArgs>(args: Prisma.SelectSubset<T, FolderDeleteArgs<ExtArgs>>): Prisma.Prisma__FolderClient<runtime.Types.Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FolderUpdateArgs>(args: Prisma.SelectSubset<T, FolderUpdateArgs<ExtArgs>>): Prisma.Prisma__FolderClient<runtime.Types.Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FolderDeleteManyArgs>(args?: Prisma.SelectSubset<T, FolderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FolderUpdateManyArgs>(args: Prisma.SelectSubset<T, FolderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FolderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FolderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FolderUpsertArgs>(args: Prisma.SelectSubset<T, FolderUpsertArgs<ExtArgs>>): Prisma.Prisma__FolderClient<runtime.Types.Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FolderCountArgs>(args?: Prisma.Subset<T, FolderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FolderCountAggregateOutputType> : number>;
    aggregate<T extends FolderAggregateArgs>(args: Prisma.Subset<T, FolderAggregateArgs>): Prisma.PrismaPromise<GetFolderAggregateType<T>>;
    groupBy<T extends FolderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FolderGroupByArgs['orderBy'];
    } : {
        orderBy?: FolderGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FolderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFolderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FolderFieldRefs;
}
export interface Prisma__FolderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    parentFolder<T extends Prisma.Folder$parentFolderArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Folder$parentFolderArgs<ExtArgs>>): Prisma.Prisma__FolderClient<runtime.Types.Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    course<T extends Prisma.Folder$courseArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Folder$courseArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    files<T extends Prisma.Folder$filesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Folder$filesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    childrenFolders<T extends Prisma.Folder$childrenFoldersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Folder$childrenFoldersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FolderFieldRefs {
    readonly id: Prisma.FieldRef<"Folder", 'String'>;
    readonly userId: Prisma.FieldRef<"Folder", 'String'>;
    readonly name: Prisma.FieldRef<"Folder", 'String'>;
    readonly parentId: Prisma.FieldRef<"Folder", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Folder", 'DateTime'>;
}
export type FolderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderSelect<ExtArgs> | null;
    omit?: Prisma.FolderOmit<ExtArgs> | null;
    include?: Prisma.FolderInclude<ExtArgs> | null;
    where: Prisma.FolderWhereUniqueInput;
};
export type FolderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderSelect<ExtArgs> | null;
    omit?: Prisma.FolderOmit<ExtArgs> | null;
    include?: Prisma.FolderInclude<ExtArgs> | null;
    where: Prisma.FolderWhereUniqueInput;
};
export type FolderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderSelect<ExtArgs> | null;
    omit?: Prisma.FolderOmit<ExtArgs> | null;
    include?: Prisma.FolderInclude<ExtArgs> | null;
    where?: Prisma.FolderWhereInput;
    orderBy?: Prisma.FolderOrderByWithRelationInput | Prisma.FolderOrderByWithRelationInput[];
    cursor?: Prisma.FolderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FolderScalarFieldEnum | Prisma.FolderScalarFieldEnum[];
};
export type FolderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderSelect<ExtArgs> | null;
    omit?: Prisma.FolderOmit<ExtArgs> | null;
    include?: Prisma.FolderInclude<ExtArgs> | null;
    where?: Prisma.FolderWhereInput;
    orderBy?: Prisma.FolderOrderByWithRelationInput | Prisma.FolderOrderByWithRelationInput[];
    cursor?: Prisma.FolderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FolderScalarFieldEnum | Prisma.FolderScalarFieldEnum[];
};
export type FolderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderSelect<ExtArgs> | null;
    omit?: Prisma.FolderOmit<ExtArgs> | null;
    include?: Prisma.FolderInclude<ExtArgs> | null;
    where?: Prisma.FolderWhereInput;
    orderBy?: Prisma.FolderOrderByWithRelationInput | Prisma.FolderOrderByWithRelationInput[];
    cursor?: Prisma.FolderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FolderScalarFieldEnum | Prisma.FolderScalarFieldEnum[];
};
export type FolderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderSelect<ExtArgs> | null;
    omit?: Prisma.FolderOmit<ExtArgs> | null;
    include?: Prisma.FolderInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FolderCreateInput, Prisma.FolderUncheckedCreateInput>;
};
export type FolderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FolderCreateManyInput | Prisma.FolderCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FolderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FolderOmit<ExtArgs> | null;
    data: Prisma.FolderCreateManyInput | Prisma.FolderCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FolderIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FolderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderSelect<ExtArgs> | null;
    omit?: Prisma.FolderOmit<ExtArgs> | null;
    include?: Prisma.FolderInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FolderUpdateInput, Prisma.FolderUncheckedUpdateInput>;
    where: Prisma.FolderWhereUniqueInput;
};
export type FolderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FolderUpdateManyMutationInput, Prisma.FolderUncheckedUpdateManyInput>;
    where?: Prisma.FolderWhereInput;
    limit?: number;
};
export type FolderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FolderOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FolderUpdateManyMutationInput, Prisma.FolderUncheckedUpdateManyInput>;
    where?: Prisma.FolderWhereInput;
    limit?: number;
    include?: Prisma.FolderIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FolderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderSelect<ExtArgs> | null;
    omit?: Prisma.FolderOmit<ExtArgs> | null;
    include?: Prisma.FolderInclude<ExtArgs> | null;
    where: Prisma.FolderWhereUniqueInput;
    create: Prisma.XOR<Prisma.FolderCreateInput, Prisma.FolderUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FolderUpdateInput, Prisma.FolderUncheckedUpdateInput>;
};
export type FolderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderSelect<ExtArgs> | null;
    omit?: Prisma.FolderOmit<ExtArgs> | null;
    include?: Prisma.FolderInclude<ExtArgs> | null;
    where: Prisma.FolderWhereUniqueInput;
};
export type FolderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FolderWhereInput;
    limit?: number;
};
export type Folder$parentFolderArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderSelect<ExtArgs> | null;
    omit?: Prisma.FolderOmit<ExtArgs> | null;
    include?: Prisma.FolderInclude<ExtArgs> | null;
    where?: Prisma.FolderWhereInput;
};
export type Folder$courseArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseSelect<ExtArgs> | null;
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    include?: Prisma.CourseInclude<ExtArgs> | null;
    where?: Prisma.CourseWhereInput;
};
export type Folder$filesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileSelect<ExtArgs> | null;
    omit?: Prisma.FileOmit<ExtArgs> | null;
    include?: Prisma.FileInclude<ExtArgs> | null;
    where?: Prisma.FileWhereInput;
    orderBy?: Prisma.FileOrderByWithRelationInput | Prisma.FileOrderByWithRelationInput[];
    cursor?: Prisma.FileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FileScalarFieldEnum | Prisma.FileScalarFieldEnum[];
};
export type Folder$childrenFoldersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderSelect<ExtArgs> | null;
    omit?: Prisma.FolderOmit<ExtArgs> | null;
    include?: Prisma.FolderInclude<ExtArgs> | null;
    where?: Prisma.FolderWhereInput;
    orderBy?: Prisma.FolderOrderByWithRelationInput | Prisma.FolderOrderByWithRelationInput[];
    cursor?: Prisma.FolderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FolderScalarFieldEnum | Prisma.FolderScalarFieldEnum[];
};
export type FolderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FolderSelect<ExtArgs> | null;
    omit?: Prisma.FolderOmit<ExtArgs> | null;
    include?: Prisma.FolderInclude<ExtArgs> | null;
};
