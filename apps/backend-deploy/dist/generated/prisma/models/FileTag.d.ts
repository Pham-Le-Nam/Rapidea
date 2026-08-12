import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type FileTagModel = runtime.Types.Result.DefaultSelection<Prisma.$FileTagPayload>;
export type AggregateFileTag = {
    _count: FileTagCountAggregateOutputType | null;
    _avg: FileTagAvgAggregateOutputType | null;
    _sum: FileTagSumAggregateOutputType | null;
    _min: FileTagMinAggregateOutputType | null;
    _max: FileTagMaxAggregateOutputType | null;
};
export type FileTagAvgAggregateOutputType = {
    score: number | null;
};
export type FileTagSumAggregateOutputType = {
    score: number | null;
};
export type FileTagMinAggregateOutputType = {
    fileId: string | null;
    tagId: string | null;
    isSuggested: boolean | null;
    score: number | null;
    createdAt: Date | null;
};
export type FileTagMaxAggregateOutputType = {
    fileId: string | null;
    tagId: string | null;
    isSuggested: boolean | null;
    score: number | null;
    createdAt: Date | null;
};
export type FileTagCountAggregateOutputType = {
    fileId: number;
    tagId: number;
    isSuggested: number;
    score: number;
    createdAt: number;
    _all: number;
};
export type FileTagAvgAggregateInputType = {
    score?: true;
};
export type FileTagSumAggregateInputType = {
    score?: true;
};
export type FileTagMinAggregateInputType = {
    fileId?: true;
    tagId?: true;
    isSuggested?: true;
    score?: true;
    createdAt?: true;
};
export type FileTagMaxAggregateInputType = {
    fileId?: true;
    tagId?: true;
    isSuggested?: true;
    score?: true;
    createdAt?: true;
};
export type FileTagCountAggregateInputType = {
    fileId?: true;
    tagId?: true;
    isSuggested?: true;
    score?: true;
    createdAt?: true;
    _all?: true;
};
export type FileTagAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileTagWhereInput;
    orderBy?: Prisma.FileTagOrderByWithRelationInput | Prisma.FileTagOrderByWithRelationInput[];
    cursor?: Prisma.FileTagWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FileTagCountAggregateInputType;
    _avg?: FileTagAvgAggregateInputType;
    _sum?: FileTagSumAggregateInputType;
    _min?: FileTagMinAggregateInputType;
    _max?: FileTagMaxAggregateInputType;
};
export type GetFileTagAggregateType<T extends FileTagAggregateArgs> = {
    [P in keyof T & keyof AggregateFileTag]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFileTag[P]> : Prisma.GetScalarType<T[P], AggregateFileTag[P]>;
};
export type FileTagGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileTagWhereInput;
    orderBy?: Prisma.FileTagOrderByWithAggregationInput | Prisma.FileTagOrderByWithAggregationInput[];
    by: Prisma.FileTagScalarFieldEnum[] | Prisma.FileTagScalarFieldEnum;
    having?: Prisma.FileTagScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FileTagCountAggregateInputType | true;
    _avg?: FileTagAvgAggregateInputType;
    _sum?: FileTagSumAggregateInputType;
    _min?: FileTagMinAggregateInputType;
    _max?: FileTagMaxAggregateInputType;
};
export type FileTagGroupByOutputType = {
    fileId: string;
    tagId: string;
    isSuggested: boolean;
    score: number | null;
    createdAt: Date;
    _count: FileTagCountAggregateOutputType | null;
    _avg: FileTagAvgAggregateOutputType | null;
    _sum: FileTagSumAggregateOutputType | null;
    _min: FileTagMinAggregateOutputType | null;
    _max: FileTagMaxAggregateOutputType | null;
};
export type GetFileTagGroupByPayload<T extends FileTagGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FileTagGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FileTagGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FileTagGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FileTagGroupByOutputType[P]>;
}>>;
export type FileTagWhereInput = {
    AND?: Prisma.FileTagWhereInput | Prisma.FileTagWhereInput[];
    OR?: Prisma.FileTagWhereInput[];
    NOT?: Prisma.FileTagWhereInput | Prisma.FileTagWhereInput[];
    fileId?: Prisma.StringFilter<"FileTag"> | string;
    tagId?: Prisma.StringFilter<"FileTag"> | string;
    isSuggested?: Prisma.BoolFilter<"FileTag"> | boolean;
    score?: Prisma.FloatNullableFilter<"FileTag"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"FileTag"> | Date | string;
    file?: Prisma.XOR<Prisma.FileScalarRelationFilter, Prisma.FileWhereInput>;
    tag?: Prisma.XOR<Prisma.TagScalarRelationFilter, Prisma.TagWhereInput>;
};
export type FileTagOrderByWithRelationInput = {
    fileId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    file?: Prisma.FileOrderByWithRelationInput;
    tag?: Prisma.TagOrderByWithRelationInput;
};
export type FileTagWhereUniqueInput = Prisma.AtLeast<{
    fileId_tagId?: Prisma.FileTagFileIdTagIdCompoundUniqueInput;
    AND?: Prisma.FileTagWhereInput | Prisma.FileTagWhereInput[];
    OR?: Prisma.FileTagWhereInput[];
    NOT?: Prisma.FileTagWhereInput | Prisma.FileTagWhereInput[];
    fileId?: Prisma.StringFilter<"FileTag"> | string;
    tagId?: Prisma.StringFilter<"FileTag"> | string;
    isSuggested?: Prisma.BoolFilter<"FileTag"> | boolean;
    score?: Prisma.FloatNullableFilter<"FileTag"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"FileTag"> | Date | string;
    file?: Prisma.XOR<Prisma.FileScalarRelationFilter, Prisma.FileWhereInput>;
    tag?: Prisma.XOR<Prisma.TagScalarRelationFilter, Prisma.TagWhereInput>;
}, "fileId_tagId">;
export type FileTagOrderByWithAggregationInput = {
    fileId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FileTagCountOrderByAggregateInput;
    _avg?: Prisma.FileTagAvgOrderByAggregateInput;
    _max?: Prisma.FileTagMaxOrderByAggregateInput;
    _min?: Prisma.FileTagMinOrderByAggregateInput;
    _sum?: Prisma.FileTagSumOrderByAggregateInput;
};
export type FileTagScalarWhereWithAggregatesInput = {
    AND?: Prisma.FileTagScalarWhereWithAggregatesInput | Prisma.FileTagScalarWhereWithAggregatesInput[];
    OR?: Prisma.FileTagScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FileTagScalarWhereWithAggregatesInput | Prisma.FileTagScalarWhereWithAggregatesInput[];
    fileId?: Prisma.StringWithAggregatesFilter<"FileTag"> | string;
    tagId?: Prisma.StringWithAggregatesFilter<"FileTag"> | string;
    isSuggested?: Prisma.BoolWithAggregatesFilter<"FileTag"> | boolean;
    score?: Prisma.FloatNullableWithAggregatesFilter<"FileTag"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FileTag"> | Date | string;
};
export type FileTagCreateInput = {
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
    file: Prisma.FileCreateNestedOneWithoutTagsInput;
    tag: Prisma.TagCreateNestedOneWithoutFilesInput;
};
export type FileTagUncheckedCreateInput = {
    fileId: string;
    tagId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type FileTagUpdateInput = {
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileUpdateOneRequiredWithoutTagsNestedInput;
    tag?: Prisma.TagUpdateOneRequiredWithoutFilesNestedInput;
};
export type FileTagUncheckedUpdateInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileTagCreateManyInput = {
    fileId: string;
    tagId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type FileTagUpdateManyMutationInput = {
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileTagUncheckedUpdateManyInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileTagListRelationFilter = {
    every?: Prisma.FileTagWhereInput;
    some?: Prisma.FileTagWhereInput;
    none?: Prisma.FileTagWhereInput;
};
export type FileTagOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FileTagFileIdTagIdCompoundUniqueInput = {
    fileId: string;
    tagId: string;
};
export type FileTagCountOrderByAggregateInput = {
    fileId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FileTagAvgOrderByAggregateInput = {
    score?: Prisma.SortOrder;
};
export type FileTagMaxOrderByAggregateInput = {
    fileId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FileTagMinOrderByAggregateInput = {
    fileId?: Prisma.SortOrder;
    tagId?: Prisma.SortOrder;
    isSuggested?: Prisma.SortOrder;
    score?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FileTagSumOrderByAggregateInput = {
    score?: Prisma.SortOrder;
};
export type FileTagCreateNestedManyWithoutFileInput = {
    create?: Prisma.XOR<Prisma.FileTagCreateWithoutFileInput, Prisma.FileTagUncheckedCreateWithoutFileInput> | Prisma.FileTagCreateWithoutFileInput[] | Prisma.FileTagUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.FileTagCreateOrConnectWithoutFileInput | Prisma.FileTagCreateOrConnectWithoutFileInput[];
    createMany?: Prisma.FileTagCreateManyFileInputEnvelope;
    connect?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
};
export type FileTagUncheckedCreateNestedManyWithoutFileInput = {
    create?: Prisma.XOR<Prisma.FileTagCreateWithoutFileInput, Prisma.FileTagUncheckedCreateWithoutFileInput> | Prisma.FileTagCreateWithoutFileInput[] | Prisma.FileTagUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.FileTagCreateOrConnectWithoutFileInput | Prisma.FileTagCreateOrConnectWithoutFileInput[];
    createMany?: Prisma.FileTagCreateManyFileInputEnvelope;
    connect?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
};
export type FileTagUpdateManyWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.FileTagCreateWithoutFileInput, Prisma.FileTagUncheckedCreateWithoutFileInput> | Prisma.FileTagCreateWithoutFileInput[] | Prisma.FileTagUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.FileTagCreateOrConnectWithoutFileInput | Prisma.FileTagCreateOrConnectWithoutFileInput[];
    upsert?: Prisma.FileTagUpsertWithWhereUniqueWithoutFileInput | Prisma.FileTagUpsertWithWhereUniqueWithoutFileInput[];
    createMany?: Prisma.FileTagCreateManyFileInputEnvelope;
    set?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    disconnect?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    delete?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    connect?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    update?: Prisma.FileTagUpdateWithWhereUniqueWithoutFileInput | Prisma.FileTagUpdateWithWhereUniqueWithoutFileInput[];
    updateMany?: Prisma.FileTagUpdateManyWithWhereWithoutFileInput | Prisma.FileTagUpdateManyWithWhereWithoutFileInput[];
    deleteMany?: Prisma.FileTagScalarWhereInput | Prisma.FileTagScalarWhereInput[];
};
export type FileTagUncheckedUpdateManyWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.FileTagCreateWithoutFileInput, Prisma.FileTagUncheckedCreateWithoutFileInput> | Prisma.FileTagCreateWithoutFileInput[] | Prisma.FileTagUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.FileTagCreateOrConnectWithoutFileInput | Prisma.FileTagCreateOrConnectWithoutFileInput[];
    upsert?: Prisma.FileTagUpsertWithWhereUniqueWithoutFileInput | Prisma.FileTagUpsertWithWhereUniqueWithoutFileInput[];
    createMany?: Prisma.FileTagCreateManyFileInputEnvelope;
    set?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    disconnect?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    delete?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    connect?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    update?: Prisma.FileTagUpdateWithWhereUniqueWithoutFileInput | Prisma.FileTagUpdateWithWhereUniqueWithoutFileInput[];
    updateMany?: Prisma.FileTagUpdateManyWithWhereWithoutFileInput | Prisma.FileTagUpdateManyWithWhereWithoutFileInput[];
    deleteMany?: Prisma.FileTagScalarWhereInput | Prisma.FileTagScalarWhereInput[];
};
export type FileTagCreateNestedManyWithoutTagInput = {
    create?: Prisma.XOR<Prisma.FileTagCreateWithoutTagInput, Prisma.FileTagUncheckedCreateWithoutTagInput> | Prisma.FileTagCreateWithoutTagInput[] | Prisma.FileTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.FileTagCreateOrConnectWithoutTagInput | Prisma.FileTagCreateOrConnectWithoutTagInput[];
    createMany?: Prisma.FileTagCreateManyTagInputEnvelope;
    connect?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
};
export type FileTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: Prisma.XOR<Prisma.FileTagCreateWithoutTagInput, Prisma.FileTagUncheckedCreateWithoutTagInput> | Prisma.FileTagCreateWithoutTagInput[] | Prisma.FileTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.FileTagCreateOrConnectWithoutTagInput | Prisma.FileTagCreateOrConnectWithoutTagInput[];
    createMany?: Prisma.FileTagCreateManyTagInputEnvelope;
    connect?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
};
export type FileTagUpdateManyWithoutTagNestedInput = {
    create?: Prisma.XOR<Prisma.FileTagCreateWithoutTagInput, Prisma.FileTagUncheckedCreateWithoutTagInput> | Prisma.FileTagCreateWithoutTagInput[] | Prisma.FileTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.FileTagCreateOrConnectWithoutTagInput | Prisma.FileTagCreateOrConnectWithoutTagInput[];
    upsert?: Prisma.FileTagUpsertWithWhereUniqueWithoutTagInput | Prisma.FileTagUpsertWithWhereUniqueWithoutTagInput[];
    createMany?: Prisma.FileTagCreateManyTagInputEnvelope;
    set?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    disconnect?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    delete?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    connect?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    update?: Prisma.FileTagUpdateWithWhereUniqueWithoutTagInput | Prisma.FileTagUpdateWithWhereUniqueWithoutTagInput[];
    updateMany?: Prisma.FileTagUpdateManyWithWhereWithoutTagInput | Prisma.FileTagUpdateManyWithWhereWithoutTagInput[];
    deleteMany?: Prisma.FileTagScalarWhereInput | Prisma.FileTagScalarWhereInput[];
};
export type FileTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: Prisma.XOR<Prisma.FileTagCreateWithoutTagInput, Prisma.FileTagUncheckedCreateWithoutTagInput> | Prisma.FileTagCreateWithoutTagInput[] | Prisma.FileTagUncheckedCreateWithoutTagInput[];
    connectOrCreate?: Prisma.FileTagCreateOrConnectWithoutTagInput | Prisma.FileTagCreateOrConnectWithoutTagInput[];
    upsert?: Prisma.FileTagUpsertWithWhereUniqueWithoutTagInput | Prisma.FileTagUpsertWithWhereUniqueWithoutTagInput[];
    createMany?: Prisma.FileTagCreateManyTagInputEnvelope;
    set?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    disconnect?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    delete?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    connect?: Prisma.FileTagWhereUniqueInput | Prisma.FileTagWhereUniqueInput[];
    update?: Prisma.FileTagUpdateWithWhereUniqueWithoutTagInput | Prisma.FileTagUpdateWithWhereUniqueWithoutTagInput[];
    updateMany?: Prisma.FileTagUpdateManyWithWhereWithoutTagInput | Prisma.FileTagUpdateManyWithWhereWithoutTagInput[];
    deleteMany?: Prisma.FileTagScalarWhereInput | Prisma.FileTagScalarWhereInput[];
};
export type FileTagCreateWithoutFileInput = {
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
    tag: Prisma.TagCreateNestedOneWithoutFilesInput;
};
export type FileTagUncheckedCreateWithoutFileInput = {
    tagId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type FileTagCreateOrConnectWithoutFileInput = {
    where: Prisma.FileTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileTagCreateWithoutFileInput, Prisma.FileTagUncheckedCreateWithoutFileInput>;
};
export type FileTagCreateManyFileInputEnvelope = {
    data: Prisma.FileTagCreateManyFileInput | Prisma.FileTagCreateManyFileInput[];
    skipDuplicates?: boolean;
};
export type FileTagUpsertWithWhereUniqueWithoutFileInput = {
    where: Prisma.FileTagWhereUniqueInput;
    update: Prisma.XOR<Prisma.FileTagUpdateWithoutFileInput, Prisma.FileTagUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.FileTagCreateWithoutFileInput, Prisma.FileTagUncheckedCreateWithoutFileInput>;
};
export type FileTagUpdateWithWhereUniqueWithoutFileInput = {
    where: Prisma.FileTagWhereUniqueInput;
    data: Prisma.XOR<Prisma.FileTagUpdateWithoutFileInput, Prisma.FileTagUncheckedUpdateWithoutFileInput>;
};
export type FileTagUpdateManyWithWhereWithoutFileInput = {
    where: Prisma.FileTagScalarWhereInput;
    data: Prisma.XOR<Prisma.FileTagUpdateManyMutationInput, Prisma.FileTagUncheckedUpdateManyWithoutFileInput>;
};
export type FileTagScalarWhereInput = {
    AND?: Prisma.FileTagScalarWhereInput | Prisma.FileTagScalarWhereInput[];
    OR?: Prisma.FileTagScalarWhereInput[];
    NOT?: Prisma.FileTagScalarWhereInput | Prisma.FileTagScalarWhereInput[];
    fileId?: Prisma.StringFilter<"FileTag"> | string;
    tagId?: Prisma.StringFilter<"FileTag"> | string;
    isSuggested?: Prisma.BoolFilter<"FileTag"> | boolean;
    score?: Prisma.FloatNullableFilter<"FileTag"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"FileTag"> | Date | string;
};
export type FileTagCreateWithoutTagInput = {
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
    file: Prisma.FileCreateNestedOneWithoutTagsInput;
};
export type FileTagUncheckedCreateWithoutTagInput = {
    fileId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type FileTagCreateOrConnectWithoutTagInput = {
    where: Prisma.FileTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileTagCreateWithoutTagInput, Prisma.FileTagUncheckedCreateWithoutTagInput>;
};
export type FileTagCreateManyTagInputEnvelope = {
    data: Prisma.FileTagCreateManyTagInput | Prisma.FileTagCreateManyTagInput[];
    skipDuplicates?: boolean;
};
export type FileTagUpsertWithWhereUniqueWithoutTagInput = {
    where: Prisma.FileTagWhereUniqueInput;
    update: Prisma.XOR<Prisma.FileTagUpdateWithoutTagInput, Prisma.FileTagUncheckedUpdateWithoutTagInput>;
    create: Prisma.XOR<Prisma.FileTagCreateWithoutTagInput, Prisma.FileTagUncheckedCreateWithoutTagInput>;
};
export type FileTagUpdateWithWhereUniqueWithoutTagInput = {
    where: Prisma.FileTagWhereUniqueInput;
    data: Prisma.XOR<Prisma.FileTagUpdateWithoutTagInput, Prisma.FileTagUncheckedUpdateWithoutTagInput>;
};
export type FileTagUpdateManyWithWhereWithoutTagInput = {
    where: Prisma.FileTagScalarWhereInput;
    data: Prisma.XOR<Prisma.FileTagUpdateManyMutationInput, Prisma.FileTagUncheckedUpdateManyWithoutTagInput>;
};
export type FileTagCreateManyFileInput = {
    tagId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type FileTagUpdateWithoutFileInput = {
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tag?: Prisma.TagUpdateOneRequiredWithoutFilesNestedInput;
};
export type FileTagUncheckedUpdateWithoutFileInput = {
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileTagUncheckedUpdateManyWithoutFileInput = {
    tagId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileTagCreateManyTagInput = {
    fileId: string;
    isSuggested?: boolean;
    score?: number | null;
    createdAt?: Date | string;
};
export type FileTagUpdateWithoutTagInput = {
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileUpdateOneRequiredWithoutTagsNestedInput;
};
export type FileTagUncheckedUpdateWithoutTagInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileTagUncheckedUpdateManyWithoutTagInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    isSuggested?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    score?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileTagSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    fileId?: boolean;
    tagId?: boolean;
    isSuggested?: boolean;
    score?: boolean;
    createdAt?: boolean;
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileTag"]>;
export type FileTagSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    fileId?: boolean;
    tagId?: boolean;
    isSuggested?: boolean;
    score?: boolean;
    createdAt?: boolean;
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileTag"]>;
export type FileTagSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    fileId?: boolean;
    tagId?: boolean;
    isSuggested?: boolean;
    score?: boolean;
    createdAt?: boolean;
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileTag"]>;
export type FileTagSelectScalar = {
    fileId?: boolean;
    tagId?: boolean;
    isSuggested?: boolean;
    score?: boolean;
    createdAt?: boolean;
};
export type FileTagOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"fileId" | "tagId" | "isSuggested" | "score" | "createdAt", ExtArgs["result"]["fileTag"]>;
export type FileTagInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type FileTagIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type FileTagIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    tag?: boolean | Prisma.TagDefaultArgs<ExtArgs>;
};
export type $FileTagPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FileTag";
    objects: {
        file: Prisma.$FilePayload<ExtArgs>;
        tag: Prisma.$TagPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        fileId: string;
        tagId: string;
        isSuggested: boolean;
        score: number | null;
        createdAt: Date;
    }, ExtArgs["result"]["fileTag"]>;
    composites: {};
};
export type FileTagGetPayload<S extends boolean | null | undefined | FileTagDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FileTagPayload, S>;
export type FileTagCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FileTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FileTagCountAggregateInputType | true;
};
export interface FileTagDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FileTag'];
        meta: {
            name: 'FileTag';
        };
    };
    findUnique<T extends FileTagFindUniqueArgs>(args: Prisma.SelectSubset<T, FileTagFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FileTagClient<runtime.Types.Result.GetResult<Prisma.$FileTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FileTagFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FileTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FileTagClient<runtime.Types.Result.GetResult<Prisma.$FileTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FileTagFindFirstArgs>(args?: Prisma.SelectSubset<T, FileTagFindFirstArgs<ExtArgs>>): Prisma.Prisma__FileTagClient<runtime.Types.Result.GetResult<Prisma.$FileTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FileTagFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FileTagFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FileTagClient<runtime.Types.Result.GetResult<Prisma.$FileTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FileTagFindManyArgs>(args?: Prisma.SelectSubset<T, FileTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FileTagCreateArgs>(args: Prisma.SelectSubset<T, FileTagCreateArgs<ExtArgs>>): Prisma.Prisma__FileTagClient<runtime.Types.Result.GetResult<Prisma.$FileTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FileTagCreateManyArgs>(args?: Prisma.SelectSubset<T, FileTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FileTagCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FileTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FileTagDeleteArgs>(args: Prisma.SelectSubset<T, FileTagDeleteArgs<ExtArgs>>): Prisma.Prisma__FileTagClient<runtime.Types.Result.GetResult<Prisma.$FileTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FileTagUpdateArgs>(args: Prisma.SelectSubset<T, FileTagUpdateArgs<ExtArgs>>): Prisma.Prisma__FileTagClient<runtime.Types.Result.GetResult<Prisma.$FileTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FileTagDeleteManyArgs>(args?: Prisma.SelectSubset<T, FileTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FileTagUpdateManyArgs>(args: Prisma.SelectSubset<T, FileTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FileTagUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FileTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FileTagUpsertArgs>(args: Prisma.SelectSubset<T, FileTagUpsertArgs<ExtArgs>>): Prisma.Prisma__FileTagClient<runtime.Types.Result.GetResult<Prisma.$FileTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FileTagCountArgs>(args?: Prisma.Subset<T, FileTagCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FileTagCountAggregateOutputType> : number>;
    aggregate<T extends FileTagAggregateArgs>(args: Prisma.Subset<T, FileTagAggregateArgs>): Prisma.PrismaPromise<GetFileTagAggregateType<T>>;
    groupBy<T extends FileTagGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FileTagGroupByArgs['orderBy'];
    } : {
        orderBy?: FileTagGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FileTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FileTagFieldRefs;
}
export interface Prisma__FileTagClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    file<T extends Prisma.FileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileDefaultArgs<ExtArgs>>): Prisma.Prisma__FileClient<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tag<T extends Prisma.TagDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TagDefaultArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FileTagFieldRefs {
    readonly fileId: Prisma.FieldRef<"FileTag", 'String'>;
    readonly tagId: Prisma.FieldRef<"FileTag", 'String'>;
    readonly isSuggested: Prisma.FieldRef<"FileTag", 'Boolean'>;
    readonly score: Prisma.FieldRef<"FileTag", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"FileTag", 'DateTime'>;
}
export type FileTagFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTagSelect<ExtArgs> | null;
    omit?: Prisma.FileTagOmit<ExtArgs> | null;
    include?: Prisma.FileTagInclude<ExtArgs> | null;
    where: Prisma.FileTagWhereUniqueInput;
};
export type FileTagFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTagSelect<ExtArgs> | null;
    omit?: Prisma.FileTagOmit<ExtArgs> | null;
    include?: Prisma.FileTagInclude<ExtArgs> | null;
    where: Prisma.FileTagWhereUniqueInput;
};
export type FileTagFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FileTagFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FileTagFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FileTagCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTagSelect<ExtArgs> | null;
    omit?: Prisma.FileTagOmit<ExtArgs> | null;
    include?: Prisma.FileTagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileTagCreateInput, Prisma.FileTagUncheckedCreateInput>;
};
export type FileTagCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FileTagCreateManyInput | Prisma.FileTagCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FileTagCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTagSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FileTagOmit<ExtArgs> | null;
    data: Prisma.FileTagCreateManyInput | Prisma.FileTagCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FileTagIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FileTagUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTagSelect<ExtArgs> | null;
    omit?: Prisma.FileTagOmit<ExtArgs> | null;
    include?: Prisma.FileTagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileTagUpdateInput, Prisma.FileTagUncheckedUpdateInput>;
    where: Prisma.FileTagWhereUniqueInput;
};
export type FileTagUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FileTagUpdateManyMutationInput, Prisma.FileTagUncheckedUpdateManyInput>;
    where?: Prisma.FileTagWhereInput;
    limit?: number;
};
export type FileTagUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTagSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FileTagOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileTagUpdateManyMutationInput, Prisma.FileTagUncheckedUpdateManyInput>;
    where?: Prisma.FileTagWhereInput;
    limit?: number;
    include?: Prisma.FileTagIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FileTagUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTagSelect<ExtArgs> | null;
    omit?: Prisma.FileTagOmit<ExtArgs> | null;
    include?: Prisma.FileTagInclude<ExtArgs> | null;
    where: Prisma.FileTagWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileTagCreateInput, Prisma.FileTagUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FileTagUpdateInput, Prisma.FileTagUncheckedUpdateInput>;
};
export type FileTagDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTagSelect<ExtArgs> | null;
    omit?: Prisma.FileTagOmit<ExtArgs> | null;
    include?: Prisma.FileTagInclude<ExtArgs> | null;
    where: Prisma.FileTagWhereUniqueInput;
};
export type FileTagDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileTagWhereInput;
    limit?: number;
};
export type FileTagDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTagSelect<ExtArgs> | null;
    omit?: Prisma.FileTagOmit<ExtArgs> | null;
    include?: Prisma.FileTagInclude<ExtArgs> | null;
};
