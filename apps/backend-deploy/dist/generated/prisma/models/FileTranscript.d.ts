import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type FileTranscriptModel = runtime.Types.Result.DefaultSelection<Prisma.$FileTranscriptPayload>;
export type AggregateFileTranscript = {
    _count: FileTranscriptCountAggregateOutputType | null;
    _avg: FileTranscriptAvgAggregateOutputType | null;
    _sum: FileTranscriptSumAggregateOutputType | null;
    _min: FileTranscriptMinAggregateOutputType | null;
    _max: FileTranscriptMaxAggregateOutputType | null;
};
export type FileTranscriptAvgAggregateOutputType = {
    durationSec: number | null;
};
export type FileTranscriptSumAggregateOutputType = {
    durationSec: number | null;
};
export type FileTranscriptMinAggregateOutputType = {
    id: string | null;
    fileId: string | null;
    status: $Enums.TranscriptStatus | null;
    text: string | null;
    language: string | null;
    durationSec: number | null;
    provider: string | null;
    model: string | null;
    errorMessage: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FileTranscriptMaxAggregateOutputType = {
    id: string | null;
    fileId: string | null;
    status: $Enums.TranscriptStatus | null;
    text: string | null;
    language: string | null;
    durationSec: number | null;
    provider: string | null;
    model: string | null;
    errorMessage: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FileTranscriptCountAggregateOutputType = {
    id: number;
    fileId: number;
    status: number;
    text: number;
    language: number;
    durationSec: number;
    provider: number;
    model: number;
    errorMessage: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FileTranscriptAvgAggregateInputType = {
    durationSec?: true;
};
export type FileTranscriptSumAggregateInputType = {
    durationSec?: true;
};
export type FileTranscriptMinAggregateInputType = {
    id?: true;
    fileId?: true;
    status?: true;
    text?: true;
    language?: true;
    durationSec?: true;
    provider?: true;
    model?: true;
    errorMessage?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FileTranscriptMaxAggregateInputType = {
    id?: true;
    fileId?: true;
    status?: true;
    text?: true;
    language?: true;
    durationSec?: true;
    provider?: true;
    model?: true;
    errorMessage?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FileTranscriptCountAggregateInputType = {
    id?: true;
    fileId?: true;
    status?: true;
    text?: true;
    language?: true;
    durationSec?: true;
    provider?: true;
    model?: true;
    errorMessage?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FileTranscriptAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileTranscriptWhereInput;
    orderBy?: Prisma.FileTranscriptOrderByWithRelationInput | Prisma.FileTranscriptOrderByWithRelationInput[];
    cursor?: Prisma.FileTranscriptWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FileTranscriptCountAggregateInputType;
    _avg?: FileTranscriptAvgAggregateInputType;
    _sum?: FileTranscriptSumAggregateInputType;
    _min?: FileTranscriptMinAggregateInputType;
    _max?: FileTranscriptMaxAggregateInputType;
};
export type GetFileTranscriptAggregateType<T extends FileTranscriptAggregateArgs> = {
    [P in keyof T & keyof AggregateFileTranscript]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFileTranscript[P]> : Prisma.GetScalarType<T[P], AggregateFileTranscript[P]>;
};
export type FileTranscriptGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileTranscriptWhereInput;
    orderBy?: Prisma.FileTranscriptOrderByWithAggregationInput | Prisma.FileTranscriptOrderByWithAggregationInput[];
    by: Prisma.FileTranscriptScalarFieldEnum[] | Prisma.FileTranscriptScalarFieldEnum;
    having?: Prisma.FileTranscriptScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FileTranscriptCountAggregateInputType | true;
    _avg?: FileTranscriptAvgAggregateInputType;
    _sum?: FileTranscriptSumAggregateInputType;
    _min?: FileTranscriptMinAggregateInputType;
    _max?: FileTranscriptMaxAggregateInputType;
};
export type FileTranscriptGroupByOutputType = {
    id: string;
    fileId: string;
    status: $Enums.TranscriptStatus;
    text: string | null;
    language: string | null;
    durationSec: number | null;
    provider: string | null;
    model: string | null;
    errorMessage: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: FileTranscriptCountAggregateOutputType | null;
    _avg: FileTranscriptAvgAggregateOutputType | null;
    _sum: FileTranscriptSumAggregateOutputType | null;
    _min: FileTranscriptMinAggregateOutputType | null;
    _max: FileTranscriptMaxAggregateOutputType | null;
};
export type GetFileTranscriptGroupByPayload<T extends FileTranscriptGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FileTranscriptGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FileTranscriptGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FileTranscriptGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FileTranscriptGroupByOutputType[P]>;
}>>;
export type FileTranscriptWhereInput = {
    AND?: Prisma.FileTranscriptWhereInput | Prisma.FileTranscriptWhereInput[];
    OR?: Prisma.FileTranscriptWhereInput[];
    NOT?: Prisma.FileTranscriptWhereInput | Prisma.FileTranscriptWhereInput[];
    id?: Prisma.StringFilter<"FileTranscript"> | string;
    fileId?: Prisma.StringFilter<"FileTranscript"> | string;
    status?: Prisma.EnumTranscriptStatusFilter<"FileTranscript"> | $Enums.TranscriptStatus;
    text?: Prisma.StringNullableFilter<"FileTranscript"> | string | null;
    language?: Prisma.StringNullableFilter<"FileTranscript"> | string | null;
    durationSec?: Prisma.IntNullableFilter<"FileTranscript"> | number | null;
    provider?: Prisma.StringNullableFilter<"FileTranscript"> | string | null;
    model?: Prisma.StringNullableFilter<"FileTranscript"> | string | null;
    errorMessage?: Prisma.StringNullableFilter<"FileTranscript"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"FileTranscript"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FileTranscript"> | Date | string;
    file?: Prisma.XOR<Prisma.FileScalarRelationFilter, Prisma.FileWhereInput>;
};
export type FileTranscriptOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    text?: Prisma.SortOrderInput | Prisma.SortOrder;
    language?: Prisma.SortOrderInput | Prisma.SortOrder;
    durationSec?: Prisma.SortOrderInput | Prisma.SortOrder;
    provider?: Prisma.SortOrderInput | Prisma.SortOrder;
    model?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    file?: Prisma.FileOrderByWithRelationInput;
};
export type FileTranscriptWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    fileId?: string;
    AND?: Prisma.FileTranscriptWhereInput | Prisma.FileTranscriptWhereInput[];
    OR?: Prisma.FileTranscriptWhereInput[];
    NOT?: Prisma.FileTranscriptWhereInput | Prisma.FileTranscriptWhereInput[];
    status?: Prisma.EnumTranscriptStatusFilter<"FileTranscript"> | $Enums.TranscriptStatus;
    text?: Prisma.StringNullableFilter<"FileTranscript"> | string | null;
    language?: Prisma.StringNullableFilter<"FileTranscript"> | string | null;
    durationSec?: Prisma.IntNullableFilter<"FileTranscript"> | number | null;
    provider?: Prisma.StringNullableFilter<"FileTranscript"> | string | null;
    model?: Prisma.StringNullableFilter<"FileTranscript"> | string | null;
    errorMessage?: Prisma.StringNullableFilter<"FileTranscript"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"FileTranscript"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FileTranscript"> | Date | string;
    file?: Prisma.XOR<Prisma.FileScalarRelationFilter, Prisma.FileWhereInput>;
}, "id" | "fileId">;
export type FileTranscriptOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    text?: Prisma.SortOrderInput | Prisma.SortOrder;
    language?: Prisma.SortOrderInput | Prisma.SortOrder;
    durationSec?: Prisma.SortOrderInput | Prisma.SortOrder;
    provider?: Prisma.SortOrderInput | Prisma.SortOrder;
    model?: Prisma.SortOrderInput | Prisma.SortOrder;
    errorMessage?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FileTranscriptCountOrderByAggregateInput;
    _avg?: Prisma.FileTranscriptAvgOrderByAggregateInput;
    _max?: Prisma.FileTranscriptMaxOrderByAggregateInput;
    _min?: Prisma.FileTranscriptMinOrderByAggregateInput;
    _sum?: Prisma.FileTranscriptSumOrderByAggregateInput;
};
export type FileTranscriptScalarWhereWithAggregatesInput = {
    AND?: Prisma.FileTranscriptScalarWhereWithAggregatesInput | Prisma.FileTranscriptScalarWhereWithAggregatesInput[];
    OR?: Prisma.FileTranscriptScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FileTranscriptScalarWhereWithAggregatesInput | Prisma.FileTranscriptScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FileTranscript"> | string;
    fileId?: Prisma.StringWithAggregatesFilter<"FileTranscript"> | string;
    status?: Prisma.EnumTranscriptStatusWithAggregatesFilter<"FileTranscript"> | $Enums.TranscriptStatus;
    text?: Prisma.StringNullableWithAggregatesFilter<"FileTranscript"> | string | null;
    language?: Prisma.StringNullableWithAggregatesFilter<"FileTranscript"> | string | null;
    durationSec?: Prisma.IntNullableWithAggregatesFilter<"FileTranscript"> | number | null;
    provider?: Prisma.StringNullableWithAggregatesFilter<"FileTranscript"> | string | null;
    model?: Prisma.StringNullableWithAggregatesFilter<"FileTranscript"> | string | null;
    errorMessage?: Prisma.StringNullableWithAggregatesFilter<"FileTranscript"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FileTranscript"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FileTranscript"> | Date | string;
};
export type FileTranscriptCreateInput = {
    id?: string;
    status?: $Enums.TranscriptStatus;
    text?: string | null;
    language?: string | null;
    durationSec?: number | null;
    provider?: string | null;
    model?: string | null;
    errorMessage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    file: Prisma.FileCreateNestedOneWithoutTranscriptInput;
};
export type FileTranscriptUncheckedCreateInput = {
    id?: string;
    fileId: string;
    status?: $Enums.TranscriptStatus;
    text?: string | null;
    language?: string | null;
    durationSec?: number | null;
    provider?: string | null;
    model?: string | null;
    errorMessage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FileTranscriptUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTranscriptStatusFieldUpdateOperationsInput | $Enums.TranscriptStatus;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    provider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    model?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileUpdateOneRequiredWithoutTranscriptNestedInput;
};
export type FileTranscriptUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTranscriptStatusFieldUpdateOperationsInput | $Enums.TranscriptStatus;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    provider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    model?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileTranscriptCreateManyInput = {
    id?: string;
    fileId: string;
    status?: $Enums.TranscriptStatus;
    text?: string | null;
    language?: string | null;
    durationSec?: number | null;
    provider?: string | null;
    model?: string | null;
    errorMessage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FileTranscriptUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTranscriptStatusFieldUpdateOperationsInput | $Enums.TranscriptStatus;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    provider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    model?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileTranscriptUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTranscriptStatusFieldUpdateOperationsInput | $Enums.TranscriptStatus;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    provider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    model?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileTranscriptNullableScalarRelationFilter = {
    is?: Prisma.FileTranscriptWhereInput | null;
    isNot?: Prisma.FileTranscriptWhereInput | null;
};
export type FileTranscriptCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    durationSec?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FileTranscriptAvgOrderByAggregateInput = {
    durationSec?: Prisma.SortOrder;
};
export type FileTranscriptMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    durationSec?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FileTranscriptMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fileId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    language?: Prisma.SortOrder;
    durationSec?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    errorMessage?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FileTranscriptSumOrderByAggregateInput = {
    durationSec?: Prisma.SortOrder;
};
export type FileTranscriptCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.FileTranscriptCreateWithoutFileInput, Prisma.FileTranscriptUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.FileTranscriptCreateOrConnectWithoutFileInput;
    connect?: Prisma.FileTranscriptWhereUniqueInput;
};
export type FileTranscriptUncheckedCreateNestedOneWithoutFileInput = {
    create?: Prisma.XOR<Prisma.FileTranscriptCreateWithoutFileInput, Prisma.FileTranscriptUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.FileTranscriptCreateOrConnectWithoutFileInput;
    connect?: Prisma.FileTranscriptWhereUniqueInput;
};
export type FileTranscriptUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.FileTranscriptCreateWithoutFileInput, Prisma.FileTranscriptUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.FileTranscriptCreateOrConnectWithoutFileInput;
    upsert?: Prisma.FileTranscriptUpsertWithoutFileInput;
    disconnect?: Prisma.FileTranscriptWhereInput | boolean;
    delete?: Prisma.FileTranscriptWhereInput | boolean;
    connect?: Prisma.FileTranscriptWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FileTranscriptUpdateToOneWithWhereWithoutFileInput, Prisma.FileTranscriptUpdateWithoutFileInput>, Prisma.FileTranscriptUncheckedUpdateWithoutFileInput>;
};
export type FileTranscriptUncheckedUpdateOneWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.FileTranscriptCreateWithoutFileInput, Prisma.FileTranscriptUncheckedCreateWithoutFileInput>;
    connectOrCreate?: Prisma.FileTranscriptCreateOrConnectWithoutFileInput;
    upsert?: Prisma.FileTranscriptUpsertWithoutFileInput;
    disconnect?: Prisma.FileTranscriptWhereInput | boolean;
    delete?: Prisma.FileTranscriptWhereInput | boolean;
    connect?: Prisma.FileTranscriptWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FileTranscriptUpdateToOneWithWhereWithoutFileInput, Prisma.FileTranscriptUpdateWithoutFileInput>, Prisma.FileTranscriptUncheckedUpdateWithoutFileInput>;
};
export type EnumTranscriptStatusFieldUpdateOperationsInput = {
    set?: $Enums.TranscriptStatus;
};
export type FileTranscriptCreateWithoutFileInput = {
    id?: string;
    status?: $Enums.TranscriptStatus;
    text?: string | null;
    language?: string | null;
    durationSec?: number | null;
    provider?: string | null;
    model?: string | null;
    errorMessage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FileTranscriptUncheckedCreateWithoutFileInput = {
    id?: string;
    status?: $Enums.TranscriptStatus;
    text?: string | null;
    language?: string | null;
    durationSec?: number | null;
    provider?: string | null;
    model?: string | null;
    errorMessage?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FileTranscriptCreateOrConnectWithoutFileInput = {
    where: Prisma.FileTranscriptWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileTranscriptCreateWithoutFileInput, Prisma.FileTranscriptUncheckedCreateWithoutFileInput>;
};
export type FileTranscriptUpsertWithoutFileInput = {
    update: Prisma.XOR<Prisma.FileTranscriptUpdateWithoutFileInput, Prisma.FileTranscriptUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.FileTranscriptCreateWithoutFileInput, Prisma.FileTranscriptUncheckedCreateWithoutFileInput>;
    where?: Prisma.FileTranscriptWhereInput;
};
export type FileTranscriptUpdateToOneWithWhereWithoutFileInput = {
    where?: Prisma.FileTranscriptWhereInput;
    data: Prisma.XOR<Prisma.FileTranscriptUpdateWithoutFileInput, Prisma.FileTranscriptUncheckedUpdateWithoutFileInput>;
};
export type FileTranscriptUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTranscriptStatusFieldUpdateOperationsInput | $Enums.TranscriptStatus;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    provider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    model?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileTranscriptUncheckedUpdateWithoutFileInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTranscriptStatusFieldUpdateOperationsInput | $Enums.TranscriptStatus;
    text?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    language?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationSec?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    provider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    model?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    errorMessage?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileTranscriptSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fileId?: boolean;
    status?: boolean;
    text?: boolean;
    language?: boolean;
    durationSec?: boolean;
    provider?: boolean;
    model?: boolean;
    errorMessage?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileTranscript"]>;
export type FileTranscriptSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fileId?: boolean;
    status?: boolean;
    text?: boolean;
    language?: boolean;
    durationSec?: boolean;
    provider?: boolean;
    model?: boolean;
    errorMessage?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileTranscript"]>;
export type FileTranscriptSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fileId?: boolean;
    status?: boolean;
    text?: boolean;
    language?: boolean;
    durationSec?: boolean;
    provider?: boolean;
    model?: boolean;
    errorMessage?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileTranscript"]>;
export type FileTranscriptSelectScalar = {
    id?: boolean;
    fileId?: boolean;
    status?: boolean;
    text?: boolean;
    language?: boolean;
    durationSec?: boolean;
    provider?: boolean;
    model?: boolean;
    errorMessage?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FileTranscriptOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fileId" | "status" | "text" | "language" | "durationSec" | "provider" | "model" | "errorMessage" | "createdAt" | "updatedAt", ExtArgs["result"]["fileTranscript"]>;
export type FileTranscriptInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
};
export type FileTranscriptIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
};
export type FileTranscriptIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
};
export type $FileTranscriptPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FileTranscript";
    objects: {
        file: Prisma.$FilePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        fileId: string;
        status: $Enums.TranscriptStatus;
        text: string | null;
        language: string | null;
        durationSec: number | null;
        provider: string | null;
        model: string | null;
        errorMessage: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["fileTranscript"]>;
    composites: {};
};
export type FileTranscriptGetPayload<S extends boolean | null | undefined | FileTranscriptDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FileTranscriptPayload, S>;
export type FileTranscriptCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FileTranscriptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FileTranscriptCountAggregateInputType | true;
};
export interface FileTranscriptDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FileTranscript'];
        meta: {
            name: 'FileTranscript';
        };
    };
    findUnique<T extends FileTranscriptFindUniqueArgs>(args: Prisma.SelectSubset<T, FileTranscriptFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FileTranscriptClient<runtime.Types.Result.GetResult<Prisma.$FileTranscriptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FileTranscriptFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FileTranscriptFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FileTranscriptClient<runtime.Types.Result.GetResult<Prisma.$FileTranscriptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FileTranscriptFindFirstArgs>(args?: Prisma.SelectSubset<T, FileTranscriptFindFirstArgs<ExtArgs>>): Prisma.Prisma__FileTranscriptClient<runtime.Types.Result.GetResult<Prisma.$FileTranscriptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FileTranscriptFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FileTranscriptFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FileTranscriptClient<runtime.Types.Result.GetResult<Prisma.$FileTranscriptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FileTranscriptFindManyArgs>(args?: Prisma.SelectSubset<T, FileTranscriptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileTranscriptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FileTranscriptCreateArgs>(args: Prisma.SelectSubset<T, FileTranscriptCreateArgs<ExtArgs>>): Prisma.Prisma__FileTranscriptClient<runtime.Types.Result.GetResult<Prisma.$FileTranscriptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FileTranscriptCreateManyArgs>(args?: Prisma.SelectSubset<T, FileTranscriptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FileTranscriptCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FileTranscriptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileTranscriptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FileTranscriptDeleteArgs>(args: Prisma.SelectSubset<T, FileTranscriptDeleteArgs<ExtArgs>>): Prisma.Prisma__FileTranscriptClient<runtime.Types.Result.GetResult<Prisma.$FileTranscriptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FileTranscriptUpdateArgs>(args: Prisma.SelectSubset<T, FileTranscriptUpdateArgs<ExtArgs>>): Prisma.Prisma__FileTranscriptClient<runtime.Types.Result.GetResult<Prisma.$FileTranscriptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FileTranscriptDeleteManyArgs>(args?: Prisma.SelectSubset<T, FileTranscriptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FileTranscriptUpdateManyArgs>(args: Prisma.SelectSubset<T, FileTranscriptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FileTranscriptUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FileTranscriptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileTranscriptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FileTranscriptUpsertArgs>(args: Prisma.SelectSubset<T, FileTranscriptUpsertArgs<ExtArgs>>): Prisma.Prisma__FileTranscriptClient<runtime.Types.Result.GetResult<Prisma.$FileTranscriptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FileTranscriptCountArgs>(args?: Prisma.Subset<T, FileTranscriptCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FileTranscriptCountAggregateOutputType> : number>;
    aggregate<T extends FileTranscriptAggregateArgs>(args: Prisma.Subset<T, FileTranscriptAggregateArgs>): Prisma.PrismaPromise<GetFileTranscriptAggregateType<T>>;
    groupBy<T extends FileTranscriptGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FileTranscriptGroupByArgs['orderBy'];
    } : {
        orderBy?: FileTranscriptGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FileTranscriptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileTranscriptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FileTranscriptFieldRefs;
}
export interface Prisma__FileTranscriptClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    file<T extends Prisma.FileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileDefaultArgs<ExtArgs>>): Prisma.Prisma__FileClient<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FileTranscriptFieldRefs {
    readonly id: Prisma.FieldRef<"FileTranscript", 'String'>;
    readonly fileId: Prisma.FieldRef<"FileTranscript", 'String'>;
    readonly status: Prisma.FieldRef<"FileTranscript", 'TranscriptStatus'>;
    readonly text: Prisma.FieldRef<"FileTranscript", 'String'>;
    readonly language: Prisma.FieldRef<"FileTranscript", 'String'>;
    readonly durationSec: Prisma.FieldRef<"FileTranscript", 'Int'>;
    readonly provider: Prisma.FieldRef<"FileTranscript", 'String'>;
    readonly model: Prisma.FieldRef<"FileTranscript", 'String'>;
    readonly errorMessage: Prisma.FieldRef<"FileTranscript", 'String'>;
    readonly createdAt: Prisma.FieldRef<"FileTranscript", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"FileTranscript", 'DateTime'>;
}
export type FileTranscriptFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTranscriptSelect<ExtArgs> | null;
    omit?: Prisma.FileTranscriptOmit<ExtArgs> | null;
    include?: Prisma.FileTranscriptInclude<ExtArgs> | null;
    where: Prisma.FileTranscriptWhereUniqueInput;
};
export type FileTranscriptFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTranscriptSelect<ExtArgs> | null;
    omit?: Prisma.FileTranscriptOmit<ExtArgs> | null;
    include?: Prisma.FileTranscriptInclude<ExtArgs> | null;
    where: Prisma.FileTranscriptWhereUniqueInput;
};
export type FileTranscriptFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTranscriptSelect<ExtArgs> | null;
    omit?: Prisma.FileTranscriptOmit<ExtArgs> | null;
    include?: Prisma.FileTranscriptInclude<ExtArgs> | null;
    where?: Prisma.FileTranscriptWhereInput;
    orderBy?: Prisma.FileTranscriptOrderByWithRelationInput | Prisma.FileTranscriptOrderByWithRelationInput[];
    cursor?: Prisma.FileTranscriptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FileTranscriptScalarFieldEnum | Prisma.FileTranscriptScalarFieldEnum[];
};
export type FileTranscriptFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTranscriptSelect<ExtArgs> | null;
    omit?: Prisma.FileTranscriptOmit<ExtArgs> | null;
    include?: Prisma.FileTranscriptInclude<ExtArgs> | null;
    where?: Prisma.FileTranscriptWhereInput;
    orderBy?: Prisma.FileTranscriptOrderByWithRelationInput | Prisma.FileTranscriptOrderByWithRelationInput[];
    cursor?: Prisma.FileTranscriptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FileTranscriptScalarFieldEnum | Prisma.FileTranscriptScalarFieldEnum[];
};
export type FileTranscriptFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTranscriptSelect<ExtArgs> | null;
    omit?: Prisma.FileTranscriptOmit<ExtArgs> | null;
    include?: Prisma.FileTranscriptInclude<ExtArgs> | null;
    where?: Prisma.FileTranscriptWhereInput;
    orderBy?: Prisma.FileTranscriptOrderByWithRelationInput | Prisma.FileTranscriptOrderByWithRelationInput[];
    cursor?: Prisma.FileTranscriptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FileTranscriptScalarFieldEnum | Prisma.FileTranscriptScalarFieldEnum[];
};
export type FileTranscriptCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTranscriptSelect<ExtArgs> | null;
    omit?: Prisma.FileTranscriptOmit<ExtArgs> | null;
    include?: Prisma.FileTranscriptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileTranscriptCreateInput, Prisma.FileTranscriptUncheckedCreateInput>;
};
export type FileTranscriptCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FileTranscriptCreateManyInput | Prisma.FileTranscriptCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FileTranscriptCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTranscriptSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FileTranscriptOmit<ExtArgs> | null;
    data: Prisma.FileTranscriptCreateManyInput | Prisma.FileTranscriptCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FileTranscriptIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FileTranscriptUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTranscriptSelect<ExtArgs> | null;
    omit?: Prisma.FileTranscriptOmit<ExtArgs> | null;
    include?: Prisma.FileTranscriptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileTranscriptUpdateInput, Prisma.FileTranscriptUncheckedUpdateInput>;
    where: Prisma.FileTranscriptWhereUniqueInput;
};
export type FileTranscriptUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FileTranscriptUpdateManyMutationInput, Prisma.FileTranscriptUncheckedUpdateManyInput>;
    where?: Prisma.FileTranscriptWhereInput;
    limit?: number;
};
export type FileTranscriptUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTranscriptSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FileTranscriptOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileTranscriptUpdateManyMutationInput, Prisma.FileTranscriptUncheckedUpdateManyInput>;
    where?: Prisma.FileTranscriptWhereInput;
    limit?: number;
    include?: Prisma.FileTranscriptIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FileTranscriptUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTranscriptSelect<ExtArgs> | null;
    omit?: Prisma.FileTranscriptOmit<ExtArgs> | null;
    include?: Prisma.FileTranscriptInclude<ExtArgs> | null;
    where: Prisma.FileTranscriptWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileTranscriptCreateInput, Prisma.FileTranscriptUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FileTranscriptUpdateInput, Prisma.FileTranscriptUncheckedUpdateInput>;
};
export type FileTranscriptDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTranscriptSelect<ExtArgs> | null;
    omit?: Prisma.FileTranscriptOmit<ExtArgs> | null;
    include?: Prisma.FileTranscriptInclude<ExtArgs> | null;
    where: Prisma.FileTranscriptWhereUniqueInput;
};
export type FileTranscriptDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileTranscriptWhereInput;
    limit?: number;
};
export type FileTranscriptDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileTranscriptSelect<ExtArgs> | null;
    omit?: Prisma.FileTranscriptOmit<ExtArgs> | null;
    include?: Prisma.FileTranscriptInclude<ExtArgs> | null;
};
