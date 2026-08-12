import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type FileInPostModel = runtime.Types.Result.DefaultSelection<Prisma.$FileInPostPayload>;
export type AggregateFileInPost = {
    _count: FileInPostCountAggregateOutputType | null;
    _min: FileInPostMinAggregateOutputType | null;
    _max: FileInPostMaxAggregateOutputType | null;
};
export type FileInPostMinAggregateOutputType = {
    fileId: string | null;
    postId: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type FileInPostMaxAggregateOutputType = {
    fileId: string | null;
    postId: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type FileInPostCountAggregateOutputType = {
    fileId: number;
    postId: number;
    userId: number;
    createdAt: number;
    _all: number;
};
export type FileInPostMinAggregateInputType = {
    fileId?: true;
    postId?: true;
    userId?: true;
    createdAt?: true;
};
export type FileInPostMaxAggregateInputType = {
    fileId?: true;
    postId?: true;
    userId?: true;
    createdAt?: true;
};
export type FileInPostCountAggregateInputType = {
    fileId?: true;
    postId?: true;
    userId?: true;
    createdAt?: true;
    _all?: true;
};
export type FileInPostAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileInPostWhereInput;
    orderBy?: Prisma.FileInPostOrderByWithRelationInput | Prisma.FileInPostOrderByWithRelationInput[];
    cursor?: Prisma.FileInPostWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FileInPostCountAggregateInputType;
    _min?: FileInPostMinAggregateInputType;
    _max?: FileInPostMaxAggregateInputType;
};
export type GetFileInPostAggregateType<T extends FileInPostAggregateArgs> = {
    [P in keyof T & keyof AggregateFileInPost]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFileInPost[P]> : Prisma.GetScalarType<T[P], AggregateFileInPost[P]>;
};
export type FileInPostGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileInPostWhereInput;
    orderBy?: Prisma.FileInPostOrderByWithAggregationInput | Prisma.FileInPostOrderByWithAggregationInput[];
    by: Prisma.FileInPostScalarFieldEnum[] | Prisma.FileInPostScalarFieldEnum;
    having?: Prisma.FileInPostScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FileInPostCountAggregateInputType | true;
    _min?: FileInPostMinAggregateInputType;
    _max?: FileInPostMaxAggregateInputType;
};
export type FileInPostGroupByOutputType = {
    fileId: string;
    postId: string;
    userId: string;
    createdAt: Date;
    _count: FileInPostCountAggregateOutputType | null;
    _min: FileInPostMinAggregateOutputType | null;
    _max: FileInPostMaxAggregateOutputType | null;
};
export type GetFileInPostGroupByPayload<T extends FileInPostGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FileInPostGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FileInPostGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FileInPostGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FileInPostGroupByOutputType[P]>;
}>>;
export type FileInPostWhereInput = {
    AND?: Prisma.FileInPostWhereInput | Prisma.FileInPostWhereInput[];
    OR?: Prisma.FileInPostWhereInput[];
    NOT?: Prisma.FileInPostWhereInput | Prisma.FileInPostWhereInput[];
    fileId?: Prisma.StringFilter<"FileInPost"> | string;
    postId?: Prisma.StringFilter<"FileInPost"> | string;
    userId?: Prisma.StringFilter<"FileInPost"> | string;
    createdAt?: Prisma.DateTimeFilter<"FileInPost"> | Date | string;
    file?: Prisma.XOR<Prisma.FileScalarRelationFilter, Prisma.FileWhereInput>;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
};
export type FileInPostOrderByWithRelationInput = {
    fileId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    file?: Prisma.FileOrderByWithRelationInput;
    post?: Prisma.PostOrderByWithRelationInput;
    user?: Prisma.UsersOrderByWithRelationInput;
};
export type FileInPostWhereUniqueInput = Prisma.AtLeast<{
    fileId_postId?: Prisma.FileInPostFileIdPostIdCompoundUniqueInput;
    AND?: Prisma.FileInPostWhereInput | Prisma.FileInPostWhereInput[];
    OR?: Prisma.FileInPostWhereInput[];
    NOT?: Prisma.FileInPostWhereInput | Prisma.FileInPostWhereInput[];
    fileId?: Prisma.StringFilter<"FileInPost"> | string;
    postId?: Prisma.StringFilter<"FileInPost"> | string;
    userId?: Prisma.StringFilter<"FileInPost"> | string;
    createdAt?: Prisma.DateTimeFilter<"FileInPost"> | Date | string;
    file?: Prisma.XOR<Prisma.FileScalarRelationFilter, Prisma.FileWhereInput>;
    post?: Prisma.XOR<Prisma.PostScalarRelationFilter, Prisma.PostWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
}, "fileId_postId">;
export type FileInPostOrderByWithAggregationInput = {
    fileId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FileInPostCountOrderByAggregateInput;
    _max?: Prisma.FileInPostMaxOrderByAggregateInput;
    _min?: Prisma.FileInPostMinOrderByAggregateInput;
};
export type FileInPostScalarWhereWithAggregatesInput = {
    AND?: Prisma.FileInPostScalarWhereWithAggregatesInput | Prisma.FileInPostScalarWhereWithAggregatesInput[];
    OR?: Prisma.FileInPostScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FileInPostScalarWhereWithAggregatesInput | Prisma.FileInPostScalarWhereWithAggregatesInput[];
    fileId?: Prisma.StringWithAggregatesFilter<"FileInPost"> | string;
    postId?: Prisma.StringWithAggregatesFilter<"FileInPost"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"FileInPost"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FileInPost"> | Date | string;
};
export type FileInPostCreateInput = {
    createdAt?: Date | string;
    file: Prisma.FileCreateNestedOneWithoutInPostsInput;
    post: Prisma.PostCreateNestedOneWithoutFilesInput;
    user: Prisma.UsersCreateNestedOneWithoutFilesInPostsInput;
};
export type FileInPostUncheckedCreateInput = {
    fileId: string;
    postId: string;
    userId: string;
    createdAt?: Date | string;
};
export type FileInPostUpdateInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileUpdateOneRequiredWithoutInPostsNestedInput;
    post?: Prisma.PostUpdateOneRequiredWithoutFilesNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutFilesInPostsNestedInput;
};
export type FileInPostUncheckedUpdateInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInPostCreateManyInput = {
    fileId: string;
    postId: string;
    userId: string;
    createdAt?: Date | string;
};
export type FileInPostUpdateManyMutationInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInPostUncheckedUpdateManyInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInPostListRelationFilter = {
    every?: Prisma.FileInPostWhereInput;
    some?: Prisma.FileInPostWhereInput;
    none?: Prisma.FileInPostWhereInput;
};
export type FileInPostOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FileInPostFileIdPostIdCompoundUniqueInput = {
    fileId: string;
    postId: string;
};
export type FileInPostCountOrderByAggregateInput = {
    fileId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FileInPostMaxOrderByAggregateInput = {
    fileId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FileInPostMinOrderByAggregateInput = {
    fileId?: Prisma.SortOrder;
    postId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FileInPostCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FileInPostCreateWithoutUserInput, Prisma.FileInPostUncheckedCreateWithoutUserInput> | Prisma.FileInPostCreateWithoutUserInput[] | Prisma.FileInPostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FileInPostCreateOrConnectWithoutUserInput | Prisma.FileInPostCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FileInPostCreateManyUserInputEnvelope;
    connect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
};
export type FileInPostUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FileInPostCreateWithoutUserInput, Prisma.FileInPostUncheckedCreateWithoutUserInput> | Prisma.FileInPostCreateWithoutUserInput[] | Prisma.FileInPostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FileInPostCreateOrConnectWithoutUserInput | Prisma.FileInPostCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FileInPostCreateManyUserInputEnvelope;
    connect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
};
export type FileInPostUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FileInPostCreateWithoutUserInput, Prisma.FileInPostUncheckedCreateWithoutUserInput> | Prisma.FileInPostCreateWithoutUserInput[] | Prisma.FileInPostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FileInPostCreateOrConnectWithoutUserInput | Prisma.FileInPostCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FileInPostUpsertWithWhereUniqueWithoutUserInput | Prisma.FileInPostUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FileInPostCreateManyUserInputEnvelope;
    set?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    disconnect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    delete?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    connect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    update?: Prisma.FileInPostUpdateWithWhereUniqueWithoutUserInput | Prisma.FileInPostUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FileInPostUpdateManyWithWhereWithoutUserInput | Prisma.FileInPostUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FileInPostScalarWhereInput | Prisma.FileInPostScalarWhereInput[];
};
export type FileInPostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FileInPostCreateWithoutUserInput, Prisma.FileInPostUncheckedCreateWithoutUserInput> | Prisma.FileInPostCreateWithoutUserInput[] | Prisma.FileInPostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FileInPostCreateOrConnectWithoutUserInput | Prisma.FileInPostCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FileInPostUpsertWithWhereUniqueWithoutUserInput | Prisma.FileInPostUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FileInPostCreateManyUserInputEnvelope;
    set?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    disconnect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    delete?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    connect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    update?: Prisma.FileInPostUpdateWithWhereUniqueWithoutUserInput | Prisma.FileInPostUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FileInPostUpdateManyWithWhereWithoutUserInput | Prisma.FileInPostUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FileInPostScalarWhereInput | Prisma.FileInPostScalarWhereInput[];
};
export type FileInPostCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.FileInPostCreateWithoutPostInput, Prisma.FileInPostUncheckedCreateWithoutPostInput> | Prisma.FileInPostCreateWithoutPostInput[] | Prisma.FileInPostUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.FileInPostCreateOrConnectWithoutPostInput | Prisma.FileInPostCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.FileInPostCreateManyPostInputEnvelope;
    connect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
};
export type FileInPostUncheckedCreateNestedManyWithoutPostInput = {
    create?: Prisma.XOR<Prisma.FileInPostCreateWithoutPostInput, Prisma.FileInPostUncheckedCreateWithoutPostInput> | Prisma.FileInPostCreateWithoutPostInput[] | Prisma.FileInPostUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.FileInPostCreateOrConnectWithoutPostInput | Prisma.FileInPostCreateOrConnectWithoutPostInput[];
    createMany?: Prisma.FileInPostCreateManyPostInputEnvelope;
    connect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
};
export type FileInPostUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.FileInPostCreateWithoutPostInput, Prisma.FileInPostUncheckedCreateWithoutPostInput> | Prisma.FileInPostCreateWithoutPostInput[] | Prisma.FileInPostUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.FileInPostCreateOrConnectWithoutPostInput | Prisma.FileInPostCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.FileInPostUpsertWithWhereUniqueWithoutPostInput | Prisma.FileInPostUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.FileInPostCreateManyPostInputEnvelope;
    set?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    disconnect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    delete?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    connect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    update?: Prisma.FileInPostUpdateWithWhereUniqueWithoutPostInput | Prisma.FileInPostUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.FileInPostUpdateManyWithWhereWithoutPostInput | Prisma.FileInPostUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.FileInPostScalarWhereInput | Prisma.FileInPostScalarWhereInput[];
};
export type FileInPostUncheckedUpdateManyWithoutPostNestedInput = {
    create?: Prisma.XOR<Prisma.FileInPostCreateWithoutPostInput, Prisma.FileInPostUncheckedCreateWithoutPostInput> | Prisma.FileInPostCreateWithoutPostInput[] | Prisma.FileInPostUncheckedCreateWithoutPostInput[];
    connectOrCreate?: Prisma.FileInPostCreateOrConnectWithoutPostInput | Prisma.FileInPostCreateOrConnectWithoutPostInput[];
    upsert?: Prisma.FileInPostUpsertWithWhereUniqueWithoutPostInput | Prisma.FileInPostUpsertWithWhereUniqueWithoutPostInput[];
    createMany?: Prisma.FileInPostCreateManyPostInputEnvelope;
    set?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    disconnect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    delete?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    connect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    update?: Prisma.FileInPostUpdateWithWhereUniqueWithoutPostInput | Prisma.FileInPostUpdateWithWhereUniqueWithoutPostInput[];
    updateMany?: Prisma.FileInPostUpdateManyWithWhereWithoutPostInput | Prisma.FileInPostUpdateManyWithWhereWithoutPostInput[];
    deleteMany?: Prisma.FileInPostScalarWhereInput | Prisma.FileInPostScalarWhereInput[];
};
export type FileInPostCreateNestedManyWithoutFileInput = {
    create?: Prisma.XOR<Prisma.FileInPostCreateWithoutFileInput, Prisma.FileInPostUncheckedCreateWithoutFileInput> | Prisma.FileInPostCreateWithoutFileInput[] | Prisma.FileInPostUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.FileInPostCreateOrConnectWithoutFileInput | Prisma.FileInPostCreateOrConnectWithoutFileInput[];
    createMany?: Prisma.FileInPostCreateManyFileInputEnvelope;
    connect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
};
export type FileInPostUncheckedCreateNestedManyWithoutFileInput = {
    create?: Prisma.XOR<Prisma.FileInPostCreateWithoutFileInput, Prisma.FileInPostUncheckedCreateWithoutFileInput> | Prisma.FileInPostCreateWithoutFileInput[] | Prisma.FileInPostUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.FileInPostCreateOrConnectWithoutFileInput | Prisma.FileInPostCreateOrConnectWithoutFileInput[];
    createMany?: Prisma.FileInPostCreateManyFileInputEnvelope;
    connect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
};
export type FileInPostUpdateManyWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.FileInPostCreateWithoutFileInput, Prisma.FileInPostUncheckedCreateWithoutFileInput> | Prisma.FileInPostCreateWithoutFileInput[] | Prisma.FileInPostUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.FileInPostCreateOrConnectWithoutFileInput | Prisma.FileInPostCreateOrConnectWithoutFileInput[];
    upsert?: Prisma.FileInPostUpsertWithWhereUniqueWithoutFileInput | Prisma.FileInPostUpsertWithWhereUniqueWithoutFileInput[];
    createMany?: Prisma.FileInPostCreateManyFileInputEnvelope;
    set?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    disconnect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    delete?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    connect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    update?: Prisma.FileInPostUpdateWithWhereUniqueWithoutFileInput | Prisma.FileInPostUpdateWithWhereUniqueWithoutFileInput[];
    updateMany?: Prisma.FileInPostUpdateManyWithWhereWithoutFileInput | Prisma.FileInPostUpdateManyWithWhereWithoutFileInput[];
    deleteMany?: Prisma.FileInPostScalarWhereInput | Prisma.FileInPostScalarWhereInput[];
};
export type FileInPostUncheckedUpdateManyWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.FileInPostCreateWithoutFileInput, Prisma.FileInPostUncheckedCreateWithoutFileInput> | Prisma.FileInPostCreateWithoutFileInput[] | Prisma.FileInPostUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.FileInPostCreateOrConnectWithoutFileInput | Prisma.FileInPostCreateOrConnectWithoutFileInput[];
    upsert?: Prisma.FileInPostUpsertWithWhereUniqueWithoutFileInput | Prisma.FileInPostUpsertWithWhereUniqueWithoutFileInput[];
    createMany?: Prisma.FileInPostCreateManyFileInputEnvelope;
    set?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    disconnect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    delete?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    connect?: Prisma.FileInPostWhereUniqueInput | Prisma.FileInPostWhereUniqueInput[];
    update?: Prisma.FileInPostUpdateWithWhereUniqueWithoutFileInput | Prisma.FileInPostUpdateWithWhereUniqueWithoutFileInput[];
    updateMany?: Prisma.FileInPostUpdateManyWithWhereWithoutFileInput | Prisma.FileInPostUpdateManyWithWhereWithoutFileInput[];
    deleteMany?: Prisma.FileInPostScalarWhereInput | Prisma.FileInPostScalarWhereInput[];
};
export type FileInPostCreateWithoutUserInput = {
    createdAt?: Date | string;
    file: Prisma.FileCreateNestedOneWithoutInPostsInput;
    post: Prisma.PostCreateNestedOneWithoutFilesInput;
};
export type FileInPostUncheckedCreateWithoutUserInput = {
    fileId: string;
    postId: string;
    createdAt?: Date | string;
};
export type FileInPostCreateOrConnectWithoutUserInput = {
    where: Prisma.FileInPostWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileInPostCreateWithoutUserInput, Prisma.FileInPostUncheckedCreateWithoutUserInput>;
};
export type FileInPostCreateManyUserInputEnvelope = {
    data: Prisma.FileInPostCreateManyUserInput | Prisma.FileInPostCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type FileInPostUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.FileInPostWhereUniqueInput;
    update: Prisma.XOR<Prisma.FileInPostUpdateWithoutUserInput, Prisma.FileInPostUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FileInPostCreateWithoutUserInput, Prisma.FileInPostUncheckedCreateWithoutUserInput>;
};
export type FileInPostUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.FileInPostWhereUniqueInput;
    data: Prisma.XOR<Prisma.FileInPostUpdateWithoutUserInput, Prisma.FileInPostUncheckedUpdateWithoutUserInput>;
};
export type FileInPostUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.FileInPostScalarWhereInput;
    data: Prisma.XOR<Prisma.FileInPostUpdateManyMutationInput, Prisma.FileInPostUncheckedUpdateManyWithoutUserInput>;
};
export type FileInPostScalarWhereInput = {
    AND?: Prisma.FileInPostScalarWhereInput | Prisma.FileInPostScalarWhereInput[];
    OR?: Prisma.FileInPostScalarWhereInput[];
    NOT?: Prisma.FileInPostScalarWhereInput | Prisma.FileInPostScalarWhereInput[];
    fileId?: Prisma.StringFilter<"FileInPost"> | string;
    postId?: Prisma.StringFilter<"FileInPost"> | string;
    userId?: Prisma.StringFilter<"FileInPost"> | string;
    createdAt?: Prisma.DateTimeFilter<"FileInPost"> | Date | string;
};
export type FileInPostCreateWithoutPostInput = {
    createdAt?: Date | string;
    file: Prisma.FileCreateNestedOneWithoutInPostsInput;
    user: Prisma.UsersCreateNestedOneWithoutFilesInPostsInput;
};
export type FileInPostUncheckedCreateWithoutPostInput = {
    fileId: string;
    userId: string;
    createdAt?: Date | string;
};
export type FileInPostCreateOrConnectWithoutPostInput = {
    where: Prisma.FileInPostWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileInPostCreateWithoutPostInput, Prisma.FileInPostUncheckedCreateWithoutPostInput>;
};
export type FileInPostCreateManyPostInputEnvelope = {
    data: Prisma.FileInPostCreateManyPostInput | Prisma.FileInPostCreateManyPostInput[];
    skipDuplicates?: boolean;
};
export type FileInPostUpsertWithWhereUniqueWithoutPostInput = {
    where: Prisma.FileInPostWhereUniqueInput;
    update: Prisma.XOR<Prisma.FileInPostUpdateWithoutPostInput, Prisma.FileInPostUncheckedUpdateWithoutPostInput>;
    create: Prisma.XOR<Prisma.FileInPostCreateWithoutPostInput, Prisma.FileInPostUncheckedCreateWithoutPostInput>;
};
export type FileInPostUpdateWithWhereUniqueWithoutPostInput = {
    where: Prisma.FileInPostWhereUniqueInput;
    data: Prisma.XOR<Prisma.FileInPostUpdateWithoutPostInput, Prisma.FileInPostUncheckedUpdateWithoutPostInput>;
};
export type FileInPostUpdateManyWithWhereWithoutPostInput = {
    where: Prisma.FileInPostScalarWhereInput;
    data: Prisma.XOR<Prisma.FileInPostUpdateManyMutationInput, Prisma.FileInPostUncheckedUpdateManyWithoutPostInput>;
};
export type FileInPostCreateWithoutFileInput = {
    createdAt?: Date | string;
    post: Prisma.PostCreateNestedOneWithoutFilesInput;
    user: Prisma.UsersCreateNestedOneWithoutFilesInPostsInput;
};
export type FileInPostUncheckedCreateWithoutFileInput = {
    postId: string;
    userId: string;
    createdAt?: Date | string;
};
export type FileInPostCreateOrConnectWithoutFileInput = {
    where: Prisma.FileInPostWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileInPostCreateWithoutFileInput, Prisma.FileInPostUncheckedCreateWithoutFileInput>;
};
export type FileInPostCreateManyFileInputEnvelope = {
    data: Prisma.FileInPostCreateManyFileInput | Prisma.FileInPostCreateManyFileInput[];
    skipDuplicates?: boolean;
};
export type FileInPostUpsertWithWhereUniqueWithoutFileInput = {
    where: Prisma.FileInPostWhereUniqueInput;
    update: Prisma.XOR<Prisma.FileInPostUpdateWithoutFileInput, Prisma.FileInPostUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.FileInPostCreateWithoutFileInput, Prisma.FileInPostUncheckedCreateWithoutFileInput>;
};
export type FileInPostUpdateWithWhereUniqueWithoutFileInput = {
    where: Prisma.FileInPostWhereUniqueInput;
    data: Prisma.XOR<Prisma.FileInPostUpdateWithoutFileInput, Prisma.FileInPostUncheckedUpdateWithoutFileInput>;
};
export type FileInPostUpdateManyWithWhereWithoutFileInput = {
    where: Prisma.FileInPostScalarWhereInput;
    data: Prisma.XOR<Prisma.FileInPostUpdateManyMutationInput, Prisma.FileInPostUncheckedUpdateManyWithoutFileInput>;
};
export type FileInPostCreateManyUserInput = {
    fileId: string;
    postId: string;
    createdAt?: Date | string;
};
export type FileInPostUpdateWithoutUserInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileUpdateOneRequiredWithoutInPostsNestedInput;
    post?: Prisma.PostUpdateOneRequiredWithoutFilesNestedInput;
};
export type FileInPostUncheckedUpdateWithoutUserInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInPostUncheckedUpdateManyWithoutUserInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInPostCreateManyPostInput = {
    fileId: string;
    userId: string;
    createdAt?: Date | string;
};
export type FileInPostUpdateWithoutPostInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileUpdateOneRequiredWithoutInPostsNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutFilesInPostsNestedInput;
};
export type FileInPostUncheckedUpdateWithoutPostInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInPostUncheckedUpdateManyWithoutPostInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInPostCreateManyFileInput = {
    postId: string;
    userId: string;
    createdAt?: Date | string;
};
export type FileInPostUpdateWithoutFileInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    post?: Prisma.PostUpdateOneRequiredWithoutFilesNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutFilesInPostsNestedInput;
};
export type FileInPostUncheckedUpdateWithoutFileInput = {
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInPostUncheckedUpdateManyWithoutFileInput = {
    postId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInPostSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    fileId?: boolean;
    postId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileInPost"]>;
export type FileInPostSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    fileId?: boolean;
    postId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileInPost"]>;
export type FileInPostSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    fileId?: boolean;
    postId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileInPost"]>;
export type FileInPostSelectScalar = {
    fileId?: boolean;
    postId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
};
export type FileInPostOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"fileId" | "postId" | "userId" | "createdAt", ExtArgs["result"]["fileInPost"]>;
export type FileInPostInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type FileInPostIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type FileInPostIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    post?: boolean | Prisma.PostDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $FileInPostPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FileInPost";
    objects: {
        file: Prisma.$FilePayload<ExtArgs>;
        post: Prisma.$PostPayload<ExtArgs>;
        user: Prisma.$UsersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        fileId: string;
        postId: string;
        userId: string;
        createdAt: Date;
    }, ExtArgs["result"]["fileInPost"]>;
    composites: {};
};
export type FileInPostGetPayload<S extends boolean | null | undefined | FileInPostDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FileInPostPayload, S>;
export type FileInPostCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FileInPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FileInPostCountAggregateInputType | true;
};
export interface FileInPostDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FileInPost'];
        meta: {
            name: 'FileInPost';
        };
    };
    findUnique<T extends FileInPostFindUniqueArgs>(args: Prisma.SelectSubset<T, FileInPostFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FileInPostClient<runtime.Types.Result.GetResult<Prisma.$FileInPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FileInPostFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FileInPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FileInPostClient<runtime.Types.Result.GetResult<Prisma.$FileInPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FileInPostFindFirstArgs>(args?: Prisma.SelectSubset<T, FileInPostFindFirstArgs<ExtArgs>>): Prisma.Prisma__FileInPostClient<runtime.Types.Result.GetResult<Prisma.$FileInPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FileInPostFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FileInPostFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FileInPostClient<runtime.Types.Result.GetResult<Prisma.$FileInPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FileInPostFindManyArgs>(args?: Prisma.SelectSubset<T, FileInPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileInPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FileInPostCreateArgs>(args: Prisma.SelectSubset<T, FileInPostCreateArgs<ExtArgs>>): Prisma.Prisma__FileInPostClient<runtime.Types.Result.GetResult<Prisma.$FileInPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FileInPostCreateManyArgs>(args?: Prisma.SelectSubset<T, FileInPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FileInPostCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FileInPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileInPostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FileInPostDeleteArgs>(args: Prisma.SelectSubset<T, FileInPostDeleteArgs<ExtArgs>>): Prisma.Prisma__FileInPostClient<runtime.Types.Result.GetResult<Prisma.$FileInPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FileInPostUpdateArgs>(args: Prisma.SelectSubset<T, FileInPostUpdateArgs<ExtArgs>>): Prisma.Prisma__FileInPostClient<runtime.Types.Result.GetResult<Prisma.$FileInPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FileInPostDeleteManyArgs>(args?: Prisma.SelectSubset<T, FileInPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FileInPostUpdateManyArgs>(args: Prisma.SelectSubset<T, FileInPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FileInPostUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FileInPostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileInPostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FileInPostUpsertArgs>(args: Prisma.SelectSubset<T, FileInPostUpsertArgs<ExtArgs>>): Prisma.Prisma__FileInPostClient<runtime.Types.Result.GetResult<Prisma.$FileInPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FileInPostCountArgs>(args?: Prisma.Subset<T, FileInPostCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FileInPostCountAggregateOutputType> : number>;
    aggregate<T extends FileInPostAggregateArgs>(args: Prisma.Subset<T, FileInPostAggregateArgs>): Prisma.PrismaPromise<GetFileInPostAggregateType<T>>;
    groupBy<T extends FileInPostGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FileInPostGroupByArgs['orderBy'];
    } : {
        orderBy?: FileInPostGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FileInPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileInPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FileInPostFieldRefs;
}
export interface Prisma__FileInPostClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    file<T extends Prisma.FileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileDefaultArgs<ExtArgs>>): Prisma.Prisma__FileClient<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    post<T extends Prisma.PostDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PostDefaultArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FileInPostFieldRefs {
    readonly fileId: Prisma.FieldRef<"FileInPost", 'String'>;
    readonly postId: Prisma.FieldRef<"FileInPost", 'String'>;
    readonly userId: Prisma.FieldRef<"FileInPost", 'String'>;
    readonly createdAt: Prisma.FieldRef<"FileInPost", 'DateTime'>;
}
export type FileInPostFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInPostSelect<ExtArgs> | null;
    omit?: Prisma.FileInPostOmit<ExtArgs> | null;
    include?: Prisma.FileInPostInclude<ExtArgs> | null;
    where: Prisma.FileInPostWhereUniqueInput;
};
export type FileInPostFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInPostSelect<ExtArgs> | null;
    omit?: Prisma.FileInPostOmit<ExtArgs> | null;
    include?: Prisma.FileInPostInclude<ExtArgs> | null;
    where: Prisma.FileInPostWhereUniqueInput;
};
export type FileInPostFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInPostSelect<ExtArgs> | null;
    omit?: Prisma.FileInPostOmit<ExtArgs> | null;
    include?: Prisma.FileInPostInclude<ExtArgs> | null;
    where?: Prisma.FileInPostWhereInput;
    orderBy?: Prisma.FileInPostOrderByWithRelationInput | Prisma.FileInPostOrderByWithRelationInput[];
    cursor?: Prisma.FileInPostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FileInPostScalarFieldEnum | Prisma.FileInPostScalarFieldEnum[];
};
export type FileInPostFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInPostSelect<ExtArgs> | null;
    omit?: Prisma.FileInPostOmit<ExtArgs> | null;
    include?: Prisma.FileInPostInclude<ExtArgs> | null;
    where?: Prisma.FileInPostWhereInput;
    orderBy?: Prisma.FileInPostOrderByWithRelationInput | Prisma.FileInPostOrderByWithRelationInput[];
    cursor?: Prisma.FileInPostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FileInPostScalarFieldEnum | Prisma.FileInPostScalarFieldEnum[];
};
export type FileInPostFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInPostSelect<ExtArgs> | null;
    omit?: Prisma.FileInPostOmit<ExtArgs> | null;
    include?: Prisma.FileInPostInclude<ExtArgs> | null;
    where?: Prisma.FileInPostWhereInput;
    orderBy?: Prisma.FileInPostOrderByWithRelationInput | Prisma.FileInPostOrderByWithRelationInput[];
    cursor?: Prisma.FileInPostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FileInPostScalarFieldEnum | Prisma.FileInPostScalarFieldEnum[];
};
export type FileInPostCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInPostSelect<ExtArgs> | null;
    omit?: Prisma.FileInPostOmit<ExtArgs> | null;
    include?: Prisma.FileInPostInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileInPostCreateInput, Prisma.FileInPostUncheckedCreateInput>;
};
export type FileInPostCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FileInPostCreateManyInput | Prisma.FileInPostCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FileInPostCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInPostSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FileInPostOmit<ExtArgs> | null;
    data: Prisma.FileInPostCreateManyInput | Prisma.FileInPostCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FileInPostIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FileInPostUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInPostSelect<ExtArgs> | null;
    omit?: Prisma.FileInPostOmit<ExtArgs> | null;
    include?: Prisma.FileInPostInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileInPostUpdateInput, Prisma.FileInPostUncheckedUpdateInput>;
    where: Prisma.FileInPostWhereUniqueInput;
};
export type FileInPostUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FileInPostUpdateManyMutationInput, Prisma.FileInPostUncheckedUpdateManyInput>;
    where?: Prisma.FileInPostWhereInput;
    limit?: number;
};
export type FileInPostUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInPostSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FileInPostOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileInPostUpdateManyMutationInput, Prisma.FileInPostUncheckedUpdateManyInput>;
    where?: Prisma.FileInPostWhereInput;
    limit?: number;
    include?: Prisma.FileInPostIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FileInPostUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInPostSelect<ExtArgs> | null;
    omit?: Prisma.FileInPostOmit<ExtArgs> | null;
    include?: Prisma.FileInPostInclude<ExtArgs> | null;
    where: Prisma.FileInPostWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileInPostCreateInput, Prisma.FileInPostUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FileInPostUpdateInput, Prisma.FileInPostUncheckedUpdateInput>;
};
export type FileInPostDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInPostSelect<ExtArgs> | null;
    omit?: Prisma.FileInPostOmit<ExtArgs> | null;
    include?: Prisma.FileInPostInclude<ExtArgs> | null;
    where: Prisma.FileInPostWhereUniqueInput;
};
export type FileInPostDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileInPostWhereInput;
    limit?: number;
};
export type FileInPostDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInPostSelect<ExtArgs> | null;
    omit?: Prisma.FileInPostOmit<ExtArgs> | null;
    include?: Prisma.FileInPostInclude<ExtArgs> | null;
};
