import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type FileModel = runtime.Types.Result.DefaultSelection<Prisma.$FilePayload>;
export type AggregateFile = {
    _count: FileCountAggregateOutputType | null;
    _avg: FileAvgAggregateOutputType | null;
    _sum: FileSumAggregateOutputType | null;
    _min: FileMinAggregateOutputType | null;
    _max: FileMaxAggregateOutputType | null;
};
export type FileAvgAggregateOutputType = {
    size: number | null;
    moderationScore: number | null;
};
export type FileSumAggregateOutputType = {
    size: number | null;
    moderationScore: number | null;
};
export type FileMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    mimeType: string | null;
    size: number | null;
    userId: string | null;
    folderId: string | null;
    createdAt: Date | null;
    moderationStatus: $Enums.ModerationStatus | null;
    moderationScore: number | null;
    moderationMessage: string | null;
};
export type FileMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    mimeType: string | null;
    size: number | null;
    userId: string | null;
    folderId: string | null;
    createdAt: Date | null;
    moderationStatus: $Enums.ModerationStatus | null;
    moderationScore: number | null;
    moderationMessage: string | null;
};
export type FileCountAggregateOutputType = {
    id: number;
    name: number;
    mimeType: number;
    size: number;
    userId: number;
    folderId: number;
    createdAt: number;
    moderationStatus: number;
    moderationScore: number;
    moderationCategories: number;
    moderationMessage: number;
    _all: number;
};
export type FileAvgAggregateInputType = {
    size?: true;
    moderationScore?: true;
};
export type FileSumAggregateInputType = {
    size?: true;
    moderationScore?: true;
};
export type FileMinAggregateInputType = {
    id?: true;
    name?: true;
    mimeType?: true;
    size?: true;
    userId?: true;
    folderId?: true;
    createdAt?: true;
    moderationStatus?: true;
    moderationScore?: true;
    moderationMessage?: true;
};
export type FileMaxAggregateInputType = {
    id?: true;
    name?: true;
    mimeType?: true;
    size?: true;
    userId?: true;
    folderId?: true;
    createdAt?: true;
    moderationStatus?: true;
    moderationScore?: true;
    moderationMessage?: true;
};
export type FileCountAggregateInputType = {
    id?: true;
    name?: true;
    mimeType?: true;
    size?: true;
    userId?: true;
    folderId?: true;
    createdAt?: true;
    moderationStatus?: true;
    moderationScore?: true;
    moderationCategories?: true;
    moderationMessage?: true;
    _all?: true;
};
export type FileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileWhereInput;
    orderBy?: Prisma.FileOrderByWithRelationInput | Prisma.FileOrderByWithRelationInput[];
    cursor?: Prisma.FileWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FileCountAggregateInputType;
    _avg?: FileAvgAggregateInputType;
    _sum?: FileSumAggregateInputType;
    _min?: FileMinAggregateInputType;
    _max?: FileMaxAggregateInputType;
};
export type GetFileAggregateType<T extends FileAggregateArgs> = {
    [P in keyof T & keyof AggregateFile]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFile[P]> : Prisma.GetScalarType<T[P], AggregateFile[P]>;
};
export type FileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileWhereInput;
    orderBy?: Prisma.FileOrderByWithAggregationInput | Prisma.FileOrderByWithAggregationInput[];
    by: Prisma.FileScalarFieldEnum[] | Prisma.FileScalarFieldEnum;
    having?: Prisma.FileScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FileCountAggregateInputType | true;
    _avg?: FileAvgAggregateInputType;
    _sum?: FileSumAggregateInputType;
    _min?: FileMinAggregateInputType;
    _max?: FileMaxAggregateInputType;
};
export type FileGroupByOutputType = {
    id: string;
    name: string;
    mimeType: string;
    size: number;
    userId: string;
    folderId: string;
    createdAt: Date;
    moderationStatus: $Enums.ModerationStatus;
    moderationScore: number | null;
    moderationCategories: runtime.JsonValue | null;
    moderationMessage: string | null;
    _count: FileCountAggregateOutputType | null;
    _avg: FileAvgAggregateOutputType | null;
    _sum: FileSumAggregateOutputType | null;
    _min: FileMinAggregateOutputType | null;
    _max: FileMaxAggregateOutputType | null;
};
export type GetFileGroupByPayload<T extends FileGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FileGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FileGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FileGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FileGroupByOutputType[P]>;
}>>;
export type FileWhereInput = {
    AND?: Prisma.FileWhereInput | Prisma.FileWhereInput[];
    OR?: Prisma.FileWhereInput[];
    NOT?: Prisma.FileWhereInput | Prisma.FileWhereInput[];
    id?: Prisma.StringFilter<"File"> | string;
    name?: Prisma.StringFilter<"File"> | string;
    mimeType?: Prisma.StringFilter<"File"> | string;
    size?: Prisma.IntFilter<"File"> | number;
    userId?: Prisma.StringFilter<"File"> | string;
    folderId?: Prisma.StringFilter<"File"> | string;
    createdAt?: Prisma.DateTimeFilter<"File"> | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFilter<"File"> | $Enums.ModerationStatus;
    moderationScore?: Prisma.FloatNullableFilter<"File"> | number | null;
    moderationCategories?: Prisma.JsonNullableFilter<"File">;
    moderationMessage?: Prisma.StringNullableFilter<"File"> | string | null;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    folder?: Prisma.XOR<Prisma.FolderScalarRelationFilter, Prisma.FolderWhereInput>;
    transcript?: Prisma.XOR<Prisma.FileTranscriptNullableScalarRelationFilter, Prisma.FileTranscriptWhereInput> | null;
    inCourses?: Prisma.FileInCourseListRelationFilter;
    inPosts?: Prisma.FileInPostListRelationFilter;
    tags?: Prisma.FileTagListRelationFilter;
};
export type FileOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    folderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    moderationScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    moderationCategories?: Prisma.SortOrderInput | Prisma.SortOrder;
    moderationMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UsersOrderByWithRelationInput;
    folder?: Prisma.FolderOrderByWithRelationInput;
    transcript?: Prisma.FileTranscriptOrderByWithRelationInput;
    inCourses?: Prisma.FileInCourseOrderByRelationAggregateInput;
    inPosts?: Prisma.FileInPostOrderByRelationAggregateInput;
    tags?: Prisma.FileTagOrderByRelationAggregateInput;
};
export type FileWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    folderId_name?: Prisma.FileFolderIdNameCompoundUniqueInput;
    AND?: Prisma.FileWhereInput | Prisma.FileWhereInput[];
    OR?: Prisma.FileWhereInput[];
    NOT?: Prisma.FileWhereInput | Prisma.FileWhereInput[];
    name?: Prisma.StringFilter<"File"> | string;
    mimeType?: Prisma.StringFilter<"File"> | string;
    size?: Prisma.IntFilter<"File"> | number;
    userId?: Prisma.StringFilter<"File"> | string;
    folderId?: Prisma.StringFilter<"File"> | string;
    createdAt?: Prisma.DateTimeFilter<"File"> | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFilter<"File"> | $Enums.ModerationStatus;
    moderationScore?: Prisma.FloatNullableFilter<"File"> | number | null;
    moderationCategories?: Prisma.JsonNullableFilter<"File">;
    moderationMessage?: Prisma.StringNullableFilter<"File"> | string | null;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    folder?: Prisma.XOR<Prisma.FolderScalarRelationFilter, Prisma.FolderWhereInput>;
    transcript?: Prisma.XOR<Prisma.FileTranscriptNullableScalarRelationFilter, Prisma.FileTranscriptWhereInput> | null;
    inCourses?: Prisma.FileInCourseListRelationFilter;
    inPosts?: Prisma.FileInPostListRelationFilter;
    tags?: Prisma.FileTagListRelationFilter;
}, "id" | "folderId_name">;
export type FileOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    folderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    moderationScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    moderationCategories?: Prisma.SortOrderInput | Prisma.SortOrder;
    moderationMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.FileCountOrderByAggregateInput;
    _avg?: Prisma.FileAvgOrderByAggregateInput;
    _max?: Prisma.FileMaxOrderByAggregateInput;
    _min?: Prisma.FileMinOrderByAggregateInput;
    _sum?: Prisma.FileSumOrderByAggregateInput;
};
export type FileScalarWhereWithAggregatesInput = {
    AND?: Prisma.FileScalarWhereWithAggregatesInput | Prisma.FileScalarWhereWithAggregatesInput[];
    OR?: Prisma.FileScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FileScalarWhereWithAggregatesInput | Prisma.FileScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"File"> | string;
    name?: Prisma.StringWithAggregatesFilter<"File"> | string;
    mimeType?: Prisma.StringWithAggregatesFilter<"File"> | string;
    size?: Prisma.IntWithAggregatesFilter<"File"> | number;
    userId?: Prisma.StringWithAggregatesFilter<"File"> | string;
    folderId?: Prisma.StringWithAggregatesFilter<"File"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"File"> | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusWithAggregatesFilter<"File"> | $Enums.ModerationStatus;
    moderationScore?: Prisma.FloatNullableWithAggregatesFilter<"File"> | number | null;
    moderationCategories?: Prisma.JsonNullableWithAggregatesFilter<"File">;
    moderationMessage?: Prisma.StringNullableWithAggregatesFilter<"File"> | string | null;
};
export type FileCreateInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
    user: Prisma.UsersCreateNestedOneWithoutUploadedFilesInput;
    folder: Prisma.FolderCreateNestedOneWithoutFilesInput;
    transcript?: Prisma.FileTranscriptCreateNestedOneWithoutFileInput;
    inCourses?: Prisma.FileInCourseCreateNestedManyWithoutFileInput;
    inPosts?: Prisma.FileInPostCreateNestedManyWithoutFileInput;
    tags?: Prisma.FileTagCreateNestedManyWithoutFileInput;
};
export type FileUncheckedCreateInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    userId: string;
    folderId: string;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
    transcript?: Prisma.FileTranscriptUncheckedCreateNestedOneWithoutFileInput;
    inCourses?: Prisma.FileInCourseUncheckedCreateNestedManyWithoutFileInput;
    inPosts?: Prisma.FileInPostUncheckedCreateNestedManyWithoutFileInput;
    tags?: Prisma.FileTagUncheckedCreateNestedManyWithoutFileInput;
};
export type FileUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UsersUpdateOneRequiredWithoutUploadedFilesNestedInput;
    folder?: Prisma.FolderUpdateOneRequiredWithoutFilesNestedInput;
    transcript?: Prisma.FileTranscriptUpdateOneWithoutFileNestedInput;
    inCourses?: Prisma.FileInCourseUpdateManyWithoutFileNestedInput;
    inPosts?: Prisma.FileInPostUpdateManyWithoutFileNestedInput;
    tags?: Prisma.FileTagUpdateManyWithoutFileNestedInput;
};
export type FileUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    folderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    transcript?: Prisma.FileTranscriptUncheckedUpdateOneWithoutFileNestedInput;
    inCourses?: Prisma.FileInCourseUncheckedUpdateManyWithoutFileNestedInput;
    inPosts?: Prisma.FileInPostUncheckedUpdateManyWithoutFileNestedInput;
    tags?: Prisma.FileTagUncheckedUpdateManyWithoutFileNestedInput;
};
export type FileCreateManyInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    userId: string;
    folderId: string;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
};
export type FileUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type FileUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    folderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type FileListRelationFilter = {
    every?: Prisma.FileWhereInput;
    some?: Prisma.FileWhereInput;
    none?: Prisma.FileWhereInput;
};
export type FileOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FileFolderIdNameCompoundUniqueInput = {
    folderId: string;
    name: string;
};
export type FileCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    folderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    moderationScore?: Prisma.SortOrder;
    moderationCategories?: Prisma.SortOrder;
    moderationMessage?: Prisma.SortOrder;
};
export type FileAvgOrderByAggregateInput = {
    size?: Prisma.SortOrder;
    moderationScore?: Prisma.SortOrder;
};
export type FileMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    folderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    moderationScore?: Prisma.SortOrder;
    moderationMessage?: Prisma.SortOrder;
};
export type FileMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    size?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    folderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    moderationStatus?: Prisma.SortOrder;
    moderationScore?: Prisma.SortOrder;
    moderationMessage?: Prisma.SortOrder;
};
export type FileSumOrderByAggregateInput = {
    size?: Prisma.SortOrder;
    moderationScore?: Prisma.SortOrder;
};
export type FileScalarRelationFilter = {
    is?: Prisma.FileWhereInput;
    isNot?: Prisma.FileWhereInput;
};
export type FileCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutUserInput, Prisma.FileUncheckedCreateWithoutUserInput> | Prisma.FileCreateWithoutUserInput[] | Prisma.FileUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutUserInput | Prisma.FileCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FileCreateManyUserInputEnvelope;
    connect?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
};
export type FileUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutUserInput, Prisma.FileUncheckedCreateWithoutUserInput> | Prisma.FileCreateWithoutUserInput[] | Prisma.FileUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutUserInput | Prisma.FileCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FileCreateManyUserInputEnvelope;
    connect?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
};
export type FileUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutUserInput, Prisma.FileUncheckedCreateWithoutUserInput> | Prisma.FileCreateWithoutUserInput[] | Prisma.FileUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutUserInput | Prisma.FileCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FileUpsertWithWhereUniqueWithoutUserInput | Prisma.FileUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FileCreateManyUserInputEnvelope;
    set?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    disconnect?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    delete?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    connect?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    update?: Prisma.FileUpdateWithWhereUniqueWithoutUserInput | Prisma.FileUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FileUpdateManyWithWhereWithoutUserInput | Prisma.FileUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FileScalarWhereInput | Prisma.FileScalarWhereInput[];
};
export type FileUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutUserInput, Prisma.FileUncheckedCreateWithoutUserInput> | Prisma.FileCreateWithoutUserInput[] | Prisma.FileUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutUserInput | Prisma.FileCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FileUpsertWithWhereUniqueWithoutUserInput | Prisma.FileUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FileCreateManyUserInputEnvelope;
    set?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    disconnect?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    delete?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    connect?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    update?: Prisma.FileUpdateWithWhereUniqueWithoutUserInput | Prisma.FileUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FileUpdateManyWithWhereWithoutUserInput | Prisma.FileUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FileScalarWhereInput | Prisma.FileScalarWhereInput[];
};
export type FileCreateNestedManyWithoutFolderInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutFolderInput, Prisma.FileUncheckedCreateWithoutFolderInput> | Prisma.FileCreateWithoutFolderInput[] | Prisma.FileUncheckedCreateWithoutFolderInput[];
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutFolderInput | Prisma.FileCreateOrConnectWithoutFolderInput[];
    createMany?: Prisma.FileCreateManyFolderInputEnvelope;
    connect?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
};
export type FileUncheckedCreateNestedManyWithoutFolderInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutFolderInput, Prisma.FileUncheckedCreateWithoutFolderInput> | Prisma.FileCreateWithoutFolderInput[] | Prisma.FileUncheckedCreateWithoutFolderInput[];
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutFolderInput | Prisma.FileCreateOrConnectWithoutFolderInput[];
    createMany?: Prisma.FileCreateManyFolderInputEnvelope;
    connect?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
};
export type FileUpdateManyWithoutFolderNestedInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutFolderInput, Prisma.FileUncheckedCreateWithoutFolderInput> | Prisma.FileCreateWithoutFolderInput[] | Prisma.FileUncheckedCreateWithoutFolderInput[];
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutFolderInput | Prisma.FileCreateOrConnectWithoutFolderInput[];
    upsert?: Prisma.FileUpsertWithWhereUniqueWithoutFolderInput | Prisma.FileUpsertWithWhereUniqueWithoutFolderInput[];
    createMany?: Prisma.FileCreateManyFolderInputEnvelope;
    set?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    disconnect?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    delete?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    connect?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    update?: Prisma.FileUpdateWithWhereUniqueWithoutFolderInput | Prisma.FileUpdateWithWhereUniqueWithoutFolderInput[];
    updateMany?: Prisma.FileUpdateManyWithWhereWithoutFolderInput | Prisma.FileUpdateManyWithWhereWithoutFolderInput[];
    deleteMany?: Prisma.FileScalarWhereInput | Prisma.FileScalarWhereInput[];
};
export type FileUncheckedUpdateManyWithoutFolderNestedInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutFolderInput, Prisma.FileUncheckedCreateWithoutFolderInput> | Prisma.FileCreateWithoutFolderInput[] | Prisma.FileUncheckedCreateWithoutFolderInput[];
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutFolderInput | Prisma.FileCreateOrConnectWithoutFolderInput[];
    upsert?: Prisma.FileUpsertWithWhereUniqueWithoutFolderInput | Prisma.FileUpsertWithWhereUniqueWithoutFolderInput[];
    createMany?: Prisma.FileCreateManyFolderInputEnvelope;
    set?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    disconnect?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    delete?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    connect?: Prisma.FileWhereUniqueInput | Prisma.FileWhereUniqueInput[];
    update?: Prisma.FileUpdateWithWhereUniqueWithoutFolderInput | Prisma.FileUpdateWithWhereUniqueWithoutFolderInput[];
    updateMany?: Prisma.FileUpdateManyWithWhereWithoutFolderInput | Prisma.FileUpdateManyWithWhereWithoutFolderInput[];
    deleteMany?: Prisma.FileScalarWhereInput | Prisma.FileScalarWhereInput[];
};
export type EnumModerationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ModerationStatus;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type FileCreateNestedOneWithoutTranscriptInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutTranscriptInput, Prisma.FileUncheckedCreateWithoutTranscriptInput>;
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutTranscriptInput;
    connect?: Prisma.FileWhereUniqueInput;
};
export type FileUpdateOneRequiredWithoutTranscriptNestedInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutTranscriptInput, Prisma.FileUncheckedCreateWithoutTranscriptInput>;
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutTranscriptInput;
    upsert?: Prisma.FileUpsertWithoutTranscriptInput;
    connect?: Prisma.FileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FileUpdateToOneWithWhereWithoutTranscriptInput, Prisma.FileUpdateWithoutTranscriptInput>, Prisma.FileUncheckedUpdateWithoutTranscriptInput>;
};
export type FileCreateNestedOneWithoutTagsInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutTagsInput, Prisma.FileUncheckedCreateWithoutTagsInput>;
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutTagsInput;
    connect?: Prisma.FileWhereUniqueInput;
};
export type FileUpdateOneRequiredWithoutTagsNestedInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutTagsInput, Prisma.FileUncheckedCreateWithoutTagsInput>;
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutTagsInput;
    upsert?: Prisma.FileUpsertWithoutTagsInput;
    connect?: Prisma.FileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FileUpdateToOneWithWhereWithoutTagsInput, Prisma.FileUpdateWithoutTagsInput>, Prisma.FileUncheckedUpdateWithoutTagsInput>;
};
export type FileCreateNestedOneWithoutInCoursesInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutInCoursesInput, Prisma.FileUncheckedCreateWithoutInCoursesInput>;
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutInCoursesInput;
    connect?: Prisma.FileWhereUniqueInput;
};
export type FileUpdateOneRequiredWithoutInCoursesNestedInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutInCoursesInput, Prisma.FileUncheckedCreateWithoutInCoursesInput>;
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutInCoursesInput;
    upsert?: Prisma.FileUpsertWithoutInCoursesInput;
    connect?: Prisma.FileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FileUpdateToOneWithWhereWithoutInCoursesInput, Prisma.FileUpdateWithoutInCoursesInput>, Prisma.FileUncheckedUpdateWithoutInCoursesInput>;
};
export type FileCreateNestedOneWithoutInPostsInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutInPostsInput, Prisma.FileUncheckedCreateWithoutInPostsInput>;
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutInPostsInput;
    connect?: Prisma.FileWhereUniqueInput;
};
export type FileUpdateOneRequiredWithoutInPostsNestedInput = {
    create?: Prisma.XOR<Prisma.FileCreateWithoutInPostsInput, Prisma.FileUncheckedCreateWithoutInPostsInput>;
    connectOrCreate?: Prisma.FileCreateOrConnectWithoutInPostsInput;
    upsert?: Prisma.FileUpsertWithoutInPostsInput;
    connect?: Prisma.FileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FileUpdateToOneWithWhereWithoutInPostsInput, Prisma.FileUpdateWithoutInPostsInput>, Prisma.FileUncheckedUpdateWithoutInPostsInput>;
};
export type FileCreateWithoutUserInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
    folder: Prisma.FolderCreateNestedOneWithoutFilesInput;
    transcript?: Prisma.FileTranscriptCreateNestedOneWithoutFileInput;
    inCourses?: Prisma.FileInCourseCreateNestedManyWithoutFileInput;
    inPosts?: Prisma.FileInPostCreateNestedManyWithoutFileInput;
    tags?: Prisma.FileTagCreateNestedManyWithoutFileInput;
};
export type FileUncheckedCreateWithoutUserInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    folderId: string;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
    transcript?: Prisma.FileTranscriptUncheckedCreateNestedOneWithoutFileInput;
    inCourses?: Prisma.FileInCourseUncheckedCreateNestedManyWithoutFileInput;
    inPosts?: Prisma.FileInPostUncheckedCreateNestedManyWithoutFileInput;
    tags?: Prisma.FileTagUncheckedCreateNestedManyWithoutFileInput;
};
export type FileCreateOrConnectWithoutUserInput = {
    where: Prisma.FileWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileCreateWithoutUserInput, Prisma.FileUncheckedCreateWithoutUserInput>;
};
export type FileCreateManyUserInputEnvelope = {
    data: Prisma.FileCreateManyUserInput | Prisma.FileCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type FileUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.FileWhereUniqueInput;
    update: Prisma.XOR<Prisma.FileUpdateWithoutUserInput, Prisma.FileUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FileCreateWithoutUserInput, Prisma.FileUncheckedCreateWithoutUserInput>;
};
export type FileUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.FileWhereUniqueInput;
    data: Prisma.XOR<Prisma.FileUpdateWithoutUserInput, Prisma.FileUncheckedUpdateWithoutUserInput>;
};
export type FileUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.FileScalarWhereInput;
    data: Prisma.XOR<Prisma.FileUpdateManyMutationInput, Prisma.FileUncheckedUpdateManyWithoutUserInput>;
};
export type FileScalarWhereInput = {
    AND?: Prisma.FileScalarWhereInput | Prisma.FileScalarWhereInput[];
    OR?: Prisma.FileScalarWhereInput[];
    NOT?: Prisma.FileScalarWhereInput | Prisma.FileScalarWhereInput[];
    id?: Prisma.StringFilter<"File"> | string;
    name?: Prisma.StringFilter<"File"> | string;
    mimeType?: Prisma.StringFilter<"File"> | string;
    size?: Prisma.IntFilter<"File"> | number;
    userId?: Prisma.StringFilter<"File"> | string;
    folderId?: Prisma.StringFilter<"File"> | string;
    createdAt?: Prisma.DateTimeFilter<"File"> | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFilter<"File"> | $Enums.ModerationStatus;
    moderationScore?: Prisma.FloatNullableFilter<"File"> | number | null;
    moderationCategories?: Prisma.JsonNullableFilter<"File">;
    moderationMessage?: Prisma.StringNullableFilter<"File"> | string | null;
};
export type FileCreateWithoutFolderInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
    user: Prisma.UsersCreateNestedOneWithoutUploadedFilesInput;
    transcript?: Prisma.FileTranscriptCreateNestedOneWithoutFileInput;
    inCourses?: Prisma.FileInCourseCreateNestedManyWithoutFileInput;
    inPosts?: Prisma.FileInPostCreateNestedManyWithoutFileInput;
    tags?: Prisma.FileTagCreateNestedManyWithoutFileInput;
};
export type FileUncheckedCreateWithoutFolderInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    userId: string;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
    transcript?: Prisma.FileTranscriptUncheckedCreateNestedOneWithoutFileInput;
    inCourses?: Prisma.FileInCourseUncheckedCreateNestedManyWithoutFileInput;
    inPosts?: Prisma.FileInPostUncheckedCreateNestedManyWithoutFileInput;
    tags?: Prisma.FileTagUncheckedCreateNestedManyWithoutFileInput;
};
export type FileCreateOrConnectWithoutFolderInput = {
    where: Prisma.FileWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileCreateWithoutFolderInput, Prisma.FileUncheckedCreateWithoutFolderInput>;
};
export type FileCreateManyFolderInputEnvelope = {
    data: Prisma.FileCreateManyFolderInput | Prisma.FileCreateManyFolderInput[];
    skipDuplicates?: boolean;
};
export type FileUpsertWithWhereUniqueWithoutFolderInput = {
    where: Prisma.FileWhereUniqueInput;
    update: Prisma.XOR<Prisma.FileUpdateWithoutFolderInput, Prisma.FileUncheckedUpdateWithoutFolderInput>;
    create: Prisma.XOR<Prisma.FileCreateWithoutFolderInput, Prisma.FileUncheckedCreateWithoutFolderInput>;
};
export type FileUpdateWithWhereUniqueWithoutFolderInput = {
    where: Prisma.FileWhereUniqueInput;
    data: Prisma.XOR<Prisma.FileUpdateWithoutFolderInput, Prisma.FileUncheckedUpdateWithoutFolderInput>;
};
export type FileUpdateManyWithWhereWithoutFolderInput = {
    where: Prisma.FileScalarWhereInput;
    data: Prisma.XOR<Prisma.FileUpdateManyMutationInput, Prisma.FileUncheckedUpdateManyWithoutFolderInput>;
};
export type FileCreateWithoutTranscriptInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
    user: Prisma.UsersCreateNestedOneWithoutUploadedFilesInput;
    folder: Prisma.FolderCreateNestedOneWithoutFilesInput;
    inCourses?: Prisma.FileInCourseCreateNestedManyWithoutFileInput;
    inPosts?: Prisma.FileInPostCreateNestedManyWithoutFileInput;
    tags?: Prisma.FileTagCreateNestedManyWithoutFileInput;
};
export type FileUncheckedCreateWithoutTranscriptInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    userId: string;
    folderId: string;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
    inCourses?: Prisma.FileInCourseUncheckedCreateNestedManyWithoutFileInput;
    inPosts?: Prisma.FileInPostUncheckedCreateNestedManyWithoutFileInput;
    tags?: Prisma.FileTagUncheckedCreateNestedManyWithoutFileInput;
};
export type FileCreateOrConnectWithoutTranscriptInput = {
    where: Prisma.FileWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileCreateWithoutTranscriptInput, Prisma.FileUncheckedCreateWithoutTranscriptInput>;
};
export type FileUpsertWithoutTranscriptInput = {
    update: Prisma.XOR<Prisma.FileUpdateWithoutTranscriptInput, Prisma.FileUncheckedUpdateWithoutTranscriptInput>;
    create: Prisma.XOR<Prisma.FileCreateWithoutTranscriptInput, Prisma.FileUncheckedCreateWithoutTranscriptInput>;
    where?: Prisma.FileWhereInput;
};
export type FileUpdateToOneWithWhereWithoutTranscriptInput = {
    where?: Prisma.FileWhereInput;
    data: Prisma.XOR<Prisma.FileUpdateWithoutTranscriptInput, Prisma.FileUncheckedUpdateWithoutTranscriptInput>;
};
export type FileUpdateWithoutTranscriptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UsersUpdateOneRequiredWithoutUploadedFilesNestedInput;
    folder?: Prisma.FolderUpdateOneRequiredWithoutFilesNestedInput;
    inCourses?: Prisma.FileInCourseUpdateManyWithoutFileNestedInput;
    inPosts?: Prisma.FileInPostUpdateManyWithoutFileNestedInput;
    tags?: Prisma.FileTagUpdateManyWithoutFileNestedInput;
};
export type FileUncheckedUpdateWithoutTranscriptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    folderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    inCourses?: Prisma.FileInCourseUncheckedUpdateManyWithoutFileNestedInput;
    inPosts?: Prisma.FileInPostUncheckedUpdateManyWithoutFileNestedInput;
    tags?: Prisma.FileTagUncheckedUpdateManyWithoutFileNestedInput;
};
export type FileCreateWithoutTagsInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
    user: Prisma.UsersCreateNestedOneWithoutUploadedFilesInput;
    folder: Prisma.FolderCreateNestedOneWithoutFilesInput;
    transcript?: Prisma.FileTranscriptCreateNestedOneWithoutFileInput;
    inCourses?: Prisma.FileInCourseCreateNestedManyWithoutFileInput;
    inPosts?: Prisma.FileInPostCreateNestedManyWithoutFileInput;
};
export type FileUncheckedCreateWithoutTagsInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    userId: string;
    folderId: string;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
    transcript?: Prisma.FileTranscriptUncheckedCreateNestedOneWithoutFileInput;
    inCourses?: Prisma.FileInCourseUncheckedCreateNestedManyWithoutFileInput;
    inPosts?: Prisma.FileInPostUncheckedCreateNestedManyWithoutFileInput;
};
export type FileCreateOrConnectWithoutTagsInput = {
    where: Prisma.FileWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileCreateWithoutTagsInput, Prisma.FileUncheckedCreateWithoutTagsInput>;
};
export type FileUpsertWithoutTagsInput = {
    update: Prisma.XOR<Prisma.FileUpdateWithoutTagsInput, Prisma.FileUncheckedUpdateWithoutTagsInput>;
    create: Prisma.XOR<Prisma.FileCreateWithoutTagsInput, Prisma.FileUncheckedCreateWithoutTagsInput>;
    where?: Prisma.FileWhereInput;
};
export type FileUpdateToOneWithWhereWithoutTagsInput = {
    where?: Prisma.FileWhereInput;
    data: Prisma.XOR<Prisma.FileUpdateWithoutTagsInput, Prisma.FileUncheckedUpdateWithoutTagsInput>;
};
export type FileUpdateWithoutTagsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UsersUpdateOneRequiredWithoutUploadedFilesNestedInput;
    folder?: Prisma.FolderUpdateOneRequiredWithoutFilesNestedInput;
    transcript?: Prisma.FileTranscriptUpdateOneWithoutFileNestedInput;
    inCourses?: Prisma.FileInCourseUpdateManyWithoutFileNestedInput;
    inPosts?: Prisma.FileInPostUpdateManyWithoutFileNestedInput;
};
export type FileUncheckedUpdateWithoutTagsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    folderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    transcript?: Prisma.FileTranscriptUncheckedUpdateOneWithoutFileNestedInput;
    inCourses?: Prisma.FileInCourseUncheckedUpdateManyWithoutFileNestedInput;
    inPosts?: Prisma.FileInPostUncheckedUpdateManyWithoutFileNestedInput;
};
export type FileCreateWithoutInCoursesInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
    user: Prisma.UsersCreateNestedOneWithoutUploadedFilesInput;
    folder: Prisma.FolderCreateNestedOneWithoutFilesInput;
    transcript?: Prisma.FileTranscriptCreateNestedOneWithoutFileInput;
    inPosts?: Prisma.FileInPostCreateNestedManyWithoutFileInput;
    tags?: Prisma.FileTagCreateNestedManyWithoutFileInput;
};
export type FileUncheckedCreateWithoutInCoursesInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    userId: string;
    folderId: string;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
    transcript?: Prisma.FileTranscriptUncheckedCreateNestedOneWithoutFileInput;
    inPosts?: Prisma.FileInPostUncheckedCreateNestedManyWithoutFileInput;
    tags?: Prisma.FileTagUncheckedCreateNestedManyWithoutFileInput;
};
export type FileCreateOrConnectWithoutInCoursesInput = {
    where: Prisma.FileWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileCreateWithoutInCoursesInput, Prisma.FileUncheckedCreateWithoutInCoursesInput>;
};
export type FileUpsertWithoutInCoursesInput = {
    update: Prisma.XOR<Prisma.FileUpdateWithoutInCoursesInput, Prisma.FileUncheckedUpdateWithoutInCoursesInput>;
    create: Prisma.XOR<Prisma.FileCreateWithoutInCoursesInput, Prisma.FileUncheckedCreateWithoutInCoursesInput>;
    where?: Prisma.FileWhereInput;
};
export type FileUpdateToOneWithWhereWithoutInCoursesInput = {
    where?: Prisma.FileWhereInput;
    data: Prisma.XOR<Prisma.FileUpdateWithoutInCoursesInput, Prisma.FileUncheckedUpdateWithoutInCoursesInput>;
};
export type FileUpdateWithoutInCoursesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UsersUpdateOneRequiredWithoutUploadedFilesNestedInput;
    folder?: Prisma.FolderUpdateOneRequiredWithoutFilesNestedInput;
    transcript?: Prisma.FileTranscriptUpdateOneWithoutFileNestedInput;
    inPosts?: Prisma.FileInPostUpdateManyWithoutFileNestedInput;
    tags?: Prisma.FileTagUpdateManyWithoutFileNestedInput;
};
export type FileUncheckedUpdateWithoutInCoursesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    folderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    transcript?: Prisma.FileTranscriptUncheckedUpdateOneWithoutFileNestedInput;
    inPosts?: Prisma.FileInPostUncheckedUpdateManyWithoutFileNestedInput;
    tags?: Prisma.FileTagUncheckedUpdateManyWithoutFileNestedInput;
};
export type FileCreateWithoutInPostsInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
    user: Prisma.UsersCreateNestedOneWithoutUploadedFilesInput;
    folder: Prisma.FolderCreateNestedOneWithoutFilesInput;
    transcript?: Prisma.FileTranscriptCreateNestedOneWithoutFileInput;
    inCourses?: Prisma.FileInCourseCreateNestedManyWithoutFileInput;
    tags?: Prisma.FileTagCreateNestedManyWithoutFileInput;
};
export type FileUncheckedCreateWithoutInPostsInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    userId: string;
    folderId: string;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
    transcript?: Prisma.FileTranscriptUncheckedCreateNestedOneWithoutFileInput;
    inCourses?: Prisma.FileInCourseUncheckedCreateNestedManyWithoutFileInput;
    tags?: Prisma.FileTagUncheckedCreateNestedManyWithoutFileInput;
};
export type FileCreateOrConnectWithoutInPostsInput = {
    where: Prisma.FileWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileCreateWithoutInPostsInput, Prisma.FileUncheckedCreateWithoutInPostsInput>;
};
export type FileUpsertWithoutInPostsInput = {
    update: Prisma.XOR<Prisma.FileUpdateWithoutInPostsInput, Prisma.FileUncheckedUpdateWithoutInPostsInput>;
    create: Prisma.XOR<Prisma.FileCreateWithoutInPostsInput, Prisma.FileUncheckedCreateWithoutInPostsInput>;
    where?: Prisma.FileWhereInput;
};
export type FileUpdateToOneWithWhereWithoutInPostsInput = {
    where?: Prisma.FileWhereInput;
    data: Prisma.XOR<Prisma.FileUpdateWithoutInPostsInput, Prisma.FileUncheckedUpdateWithoutInPostsInput>;
};
export type FileUpdateWithoutInPostsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UsersUpdateOneRequiredWithoutUploadedFilesNestedInput;
    folder?: Prisma.FolderUpdateOneRequiredWithoutFilesNestedInput;
    transcript?: Prisma.FileTranscriptUpdateOneWithoutFileNestedInput;
    inCourses?: Prisma.FileInCourseUpdateManyWithoutFileNestedInput;
    tags?: Prisma.FileTagUpdateManyWithoutFileNestedInput;
};
export type FileUncheckedUpdateWithoutInPostsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    folderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    transcript?: Prisma.FileTranscriptUncheckedUpdateOneWithoutFileNestedInput;
    inCourses?: Prisma.FileInCourseUncheckedUpdateManyWithoutFileNestedInput;
    tags?: Prisma.FileTagUncheckedUpdateManyWithoutFileNestedInput;
};
export type FileCreateManyUserInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    folderId: string;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
};
export type FileUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    folder?: Prisma.FolderUpdateOneRequiredWithoutFilesNestedInput;
    transcript?: Prisma.FileTranscriptUpdateOneWithoutFileNestedInput;
    inCourses?: Prisma.FileInCourseUpdateManyWithoutFileNestedInput;
    inPosts?: Prisma.FileInPostUpdateManyWithoutFileNestedInput;
    tags?: Prisma.FileTagUpdateManyWithoutFileNestedInput;
};
export type FileUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    folderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    transcript?: Prisma.FileTranscriptUncheckedUpdateOneWithoutFileNestedInput;
    inCourses?: Prisma.FileInCourseUncheckedUpdateManyWithoutFileNestedInput;
    inPosts?: Prisma.FileInPostUncheckedUpdateManyWithoutFileNestedInput;
    tags?: Prisma.FileTagUncheckedUpdateManyWithoutFileNestedInput;
};
export type FileUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    folderId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type FileCreateManyFolderInput = {
    id?: string;
    name: string;
    mimeType: string;
    size: number;
    userId: string;
    createdAt?: Date | string;
    moderationStatus?: $Enums.ModerationStatus;
    moderationScore?: number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: string | null;
};
export type FileUpdateWithoutFolderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    user?: Prisma.UsersUpdateOneRequiredWithoutUploadedFilesNestedInput;
    transcript?: Prisma.FileTranscriptUpdateOneWithoutFileNestedInput;
    inCourses?: Prisma.FileInCourseUpdateManyWithoutFileNestedInput;
    inPosts?: Prisma.FileInPostUpdateManyWithoutFileNestedInput;
    tags?: Prisma.FileTagUpdateManyWithoutFileNestedInput;
};
export type FileUncheckedUpdateWithoutFolderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    transcript?: Prisma.FileTranscriptUncheckedUpdateOneWithoutFileNestedInput;
    inCourses?: Prisma.FileInCourseUncheckedUpdateManyWithoutFileNestedInput;
    inPosts?: Prisma.FileInPostUncheckedUpdateManyWithoutFileNestedInput;
    tags?: Prisma.FileTagUncheckedUpdateManyWithoutFileNestedInput;
};
export type FileUncheckedUpdateManyWithoutFolderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    size?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    moderationStatus?: Prisma.EnumModerationStatusFieldUpdateOperationsInput | $Enums.ModerationStatus;
    moderationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    moderationCategories?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    moderationMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type FileCountOutputType = {
    inCourses: number;
    inPosts: number;
    tags: number;
};
export type FileCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    inCourses?: boolean | FileCountOutputTypeCountInCoursesArgs;
    inPosts?: boolean | FileCountOutputTypeCountInPostsArgs;
    tags?: boolean | FileCountOutputTypeCountTagsArgs;
};
export type FileCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileCountOutputTypeSelect<ExtArgs> | null;
};
export type FileCountOutputTypeCountInCoursesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileInCourseWhereInput;
};
export type FileCountOutputTypeCountInPostsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileInPostWhereInput;
};
export type FileCountOutputTypeCountTagsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileTagWhereInput;
};
export type FileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    mimeType?: boolean;
    size?: boolean;
    userId?: boolean;
    folderId?: boolean;
    createdAt?: boolean;
    moderationStatus?: boolean;
    moderationScore?: boolean;
    moderationCategories?: boolean;
    moderationMessage?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    folder?: boolean | Prisma.FolderDefaultArgs<ExtArgs>;
    transcript?: boolean | Prisma.File$transcriptArgs<ExtArgs>;
    inCourses?: boolean | Prisma.File$inCoursesArgs<ExtArgs>;
    inPosts?: boolean | Prisma.File$inPostsArgs<ExtArgs>;
    tags?: boolean | Prisma.File$tagsArgs<ExtArgs>;
    _count?: boolean | Prisma.FileCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["file"]>;
export type FileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    mimeType?: boolean;
    size?: boolean;
    userId?: boolean;
    folderId?: boolean;
    createdAt?: boolean;
    moderationStatus?: boolean;
    moderationScore?: boolean;
    moderationCategories?: boolean;
    moderationMessage?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    folder?: boolean | Prisma.FolderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["file"]>;
export type FileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    mimeType?: boolean;
    size?: boolean;
    userId?: boolean;
    folderId?: boolean;
    createdAt?: boolean;
    moderationStatus?: boolean;
    moderationScore?: boolean;
    moderationCategories?: boolean;
    moderationMessage?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    folder?: boolean | Prisma.FolderDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["file"]>;
export type FileSelectScalar = {
    id?: boolean;
    name?: boolean;
    mimeType?: boolean;
    size?: boolean;
    userId?: boolean;
    folderId?: boolean;
    createdAt?: boolean;
    moderationStatus?: boolean;
    moderationScore?: boolean;
    moderationCategories?: boolean;
    moderationMessage?: boolean;
};
export type FileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "mimeType" | "size" | "userId" | "folderId" | "createdAt" | "moderationStatus" | "moderationScore" | "moderationCategories" | "moderationMessage", ExtArgs["result"]["file"]>;
export type FileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    folder?: boolean | Prisma.FolderDefaultArgs<ExtArgs>;
    transcript?: boolean | Prisma.File$transcriptArgs<ExtArgs>;
    inCourses?: boolean | Prisma.File$inCoursesArgs<ExtArgs>;
    inPosts?: boolean | Prisma.File$inPostsArgs<ExtArgs>;
    tags?: boolean | Prisma.File$tagsArgs<ExtArgs>;
    _count?: boolean | Prisma.FileCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    folder?: boolean | Prisma.FolderDefaultArgs<ExtArgs>;
};
export type FileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    folder?: boolean | Prisma.FolderDefaultArgs<ExtArgs>;
};
export type $FilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "File";
    objects: {
        user: Prisma.$UsersPayload<ExtArgs>;
        folder: Prisma.$FolderPayload<ExtArgs>;
        transcript: Prisma.$FileTranscriptPayload<ExtArgs> | null;
        inCourses: Prisma.$FileInCoursePayload<ExtArgs>[];
        inPosts: Prisma.$FileInPostPayload<ExtArgs>[];
        tags: Prisma.$FileTagPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        mimeType: string;
        size: number;
        userId: string;
        folderId: string;
        createdAt: Date;
        moderationStatus: $Enums.ModerationStatus;
        moderationScore: number | null;
        moderationCategories: runtime.JsonValue | null;
        moderationMessage: string | null;
    }, ExtArgs["result"]["file"]>;
    composites: {};
};
export type FileGetPayload<S extends boolean | null | undefined | FileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FilePayload, S>;
export type FileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FileCountAggregateInputType | true;
};
export interface FileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['File'];
        meta: {
            name: 'File';
        };
    };
    findUnique<T extends FileFindUniqueArgs>(args: Prisma.SelectSubset<T, FileFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FileClient<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FileFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FileFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FileClient<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FileFindFirstArgs>(args?: Prisma.SelectSubset<T, FileFindFirstArgs<ExtArgs>>): Prisma.Prisma__FileClient<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FileFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FileFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FileClient<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FileFindManyArgs>(args?: Prisma.SelectSubset<T, FileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FileCreateArgs>(args: Prisma.SelectSubset<T, FileCreateArgs<ExtArgs>>): Prisma.Prisma__FileClient<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FileCreateManyArgs>(args?: Prisma.SelectSubset<T, FileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FileCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FileDeleteArgs>(args: Prisma.SelectSubset<T, FileDeleteArgs<ExtArgs>>): Prisma.Prisma__FileClient<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FileUpdateArgs>(args: Prisma.SelectSubset<T, FileUpdateArgs<ExtArgs>>): Prisma.Prisma__FileClient<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FileDeleteManyArgs>(args?: Prisma.SelectSubset<T, FileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FileUpdateManyArgs>(args: Prisma.SelectSubset<T, FileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FileUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FileUpsertArgs>(args: Prisma.SelectSubset<T, FileUpsertArgs<ExtArgs>>): Prisma.Prisma__FileClient<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FileCountArgs>(args?: Prisma.Subset<T, FileCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FileCountAggregateOutputType> : number>;
    aggregate<T extends FileAggregateArgs>(args: Prisma.Subset<T, FileAggregateArgs>): Prisma.PrismaPromise<GetFileAggregateType<T>>;
    groupBy<T extends FileGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FileGroupByArgs['orderBy'];
    } : {
        orderBy?: FileGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FileFieldRefs;
}
export interface Prisma__FileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    folder<T extends Prisma.FolderDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FolderDefaultArgs<ExtArgs>>): Prisma.Prisma__FolderClient<runtime.Types.Result.GetResult<Prisma.$FolderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    transcript<T extends Prisma.File$transcriptArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.File$transcriptArgs<ExtArgs>>): Prisma.Prisma__FileTranscriptClient<runtime.Types.Result.GetResult<Prisma.$FileTranscriptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    inCourses<T extends Prisma.File$inCoursesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.File$inCoursesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileInCoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    inPosts<T extends Prisma.File$inPostsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.File$inPostsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileInPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    tags<T extends Prisma.File$tagsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.File$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FileFieldRefs {
    readonly id: Prisma.FieldRef<"File", 'String'>;
    readonly name: Prisma.FieldRef<"File", 'String'>;
    readonly mimeType: Prisma.FieldRef<"File", 'String'>;
    readonly size: Prisma.FieldRef<"File", 'Int'>;
    readonly userId: Prisma.FieldRef<"File", 'String'>;
    readonly folderId: Prisma.FieldRef<"File", 'String'>;
    readonly createdAt: Prisma.FieldRef<"File", 'DateTime'>;
    readonly moderationStatus: Prisma.FieldRef<"File", 'ModerationStatus'>;
    readonly moderationScore: Prisma.FieldRef<"File", 'Float'>;
    readonly moderationCategories: Prisma.FieldRef<"File", 'Json'>;
    readonly moderationMessage: Prisma.FieldRef<"File", 'String'>;
}
export type FileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileSelect<ExtArgs> | null;
    omit?: Prisma.FileOmit<ExtArgs> | null;
    include?: Prisma.FileInclude<ExtArgs> | null;
    where: Prisma.FileWhereUniqueInput;
};
export type FileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileSelect<ExtArgs> | null;
    omit?: Prisma.FileOmit<ExtArgs> | null;
    include?: Prisma.FileInclude<ExtArgs> | null;
    where: Prisma.FileWhereUniqueInput;
};
export type FileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileSelect<ExtArgs> | null;
    omit?: Prisma.FileOmit<ExtArgs> | null;
    include?: Prisma.FileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileCreateInput, Prisma.FileUncheckedCreateInput>;
};
export type FileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FileCreateManyInput | Prisma.FileCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FileOmit<ExtArgs> | null;
    data: Prisma.FileCreateManyInput | Prisma.FileCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FileIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileSelect<ExtArgs> | null;
    omit?: Prisma.FileOmit<ExtArgs> | null;
    include?: Prisma.FileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileUpdateInput, Prisma.FileUncheckedUpdateInput>;
    where: Prisma.FileWhereUniqueInput;
};
export type FileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FileUpdateManyMutationInput, Prisma.FileUncheckedUpdateManyInput>;
    where?: Prisma.FileWhereInput;
    limit?: number;
};
export type FileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FileOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileUpdateManyMutationInput, Prisma.FileUncheckedUpdateManyInput>;
    where?: Prisma.FileWhereInput;
    limit?: number;
    include?: Prisma.FileIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileSelect<ExtArgs> | null;
    omit?: Prisma.FileOmit<ExtArgs> | null;
    include?: Prisma.FileInclude<ExtArgs> | null;
    where: Prisma.FileWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileCreateInput, Prisma.FileUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FileUpdateInput, Prisma.FileUncheckedUpdateInput>;
};
export type FileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileSelect<ExtArgs> | null;
    omit?: Prisma.FileOmit<ExtArgs> | null;
    include?: Prisma.FileInclude<ExtArgs> | null;
    where: Prisma.FileWhereUniqueInput;
};
export type FileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileWhereInput;
    limit?: number;
};
export type File$transcriptArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTranscriptSelect<ExtArgs> | null;
    omit?: Prisma.FileTranscriptOmit<ExtArgs> | null;
    include?: Prisma.FileTranscriptInclude<ExtArgs> | null;
    where?: Prisma.FileTranscriptWhereInput;
};
export type File$inCoursesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInCourseSelect<ExtArgs> | null;
    omit?: Prisma.FileInCourseOmit<ExtArgs> | null;
    include?: Prisma.FileInCourseInclude<ExtArgs> | null;
    where?: Prisma.FileInCourseWhereInput;
    orderBy?: Prisma.FileInCourseOrderByWithRelationInput | Prisma.FileInCourseOrderByWithRelationInput[];
    cursor?: Prisma.FileInCourseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FileInCourseScalarFieldEnum | Prisma.FileInCourseScalarFieldEnum[];
};
export type File$inPostsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type File$tagsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTagSelect<ExtArgs> | null;
    omit?: Prisma.FileTagOmit<ExtArgs> | null;
    include?: Prisma.FileTagInclude<ExtArgs> | null;
    where?: Prisma.FileTagWhereInput;
    orderBy?: Prisma.FileTagOrderByWithRelationInput | Prisma.FileTagOrderByWithRelationInput[];
    cursor?: Prisma.FileTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FileTagScalarFieldEnum | Prisma.FileTagScalarFieldEnum[];
};
export type FileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileSelect<ExtArgs> | null;
    omit?: Prisma.FileOmit<ExtArgs> | null;
    include?: Prisma.FileInclude<ExtArgs> | null;
};
