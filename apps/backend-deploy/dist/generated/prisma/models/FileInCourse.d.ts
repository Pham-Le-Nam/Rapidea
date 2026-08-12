import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type FileInCourseModel = runtime.Types.Result.DefaultSelection<Prisma.$FileInCoursePayload>;
export type AggregateFileInCourse = {
    _count: FileInCourseCountAggregateOutputType | null;
    _min: FileInCourseMinAggregateOutputType | null;
    _max: FileInCourseMaxAggregateOutputType | null;
};
export type FileInCourseMinAggregateOutputType = {
    fileId: string | null;
    courseId: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type FileInCourseMaxAggregateOutputType = {
    fileId: string | null;
    courseId: string | null;
    userId: string | null;
    createdAt: Date | null;
};
export type FileInCourseCountAggregateOutputType = {
    fileId: number;
    courseId: number;
    userId: number;
    createdAt: number;
    _all: number;
};
export type FileInCourseMinAggregateInputType = {
    fileId?: true;
    courseId?: true;
    userId?: true;
    createdAt?: true;
};
export type FileInCourseMaxAggregateInputType = {
    fileId?: true;
    courseId?: true;
    userId?: true;
    createdAt?: true;
};
export type FileInCourseCountAggregateInputType = {
    fileId?: true;
    courseId?: true;
    userId?: true;
    createdAt?: true;
    _all?: true;
};
export type FileInCourseAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileInCourseWhereInput;
    orderBy?: Prisma.FileInCourseOrderByWithRelationInput | Prisma.FileInCourseOrderByWithRelationInput[];
    cursor?: Prisma.FileInCourseWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FileInCourseCountAggregateInputType;
    _min?: FileInCourseMinAggregateInputType;
    _max?: FileInCourseMaxAggregateInputType;
};
export type GetFileInCourseAggregateType<T extends FileInCourseAggregateArgs> = {
    [P in keyof T & keyof AggregateFileInCourse]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFileInCourse[P]> : Prisma.GetScalarType<T[P], AggregateFileInCourse[P]>;
};
export type FileInCourseGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileInCourseWhereInput;
    orderBy?: Prisma.FileInCourseOrderByWithAggregationInput | Prisma.FileInCourseOrderByWithAggregationInput[];
    by: Prisma.FileInCourseScalarFieldEnum[] | Prisma.FileInCourseScalarFieldEnum;
    having?: Prisma.FileInCourseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FileInCourseCountAggregateInputType | true;
    _min?: FileInCourseMinAggregateInputType;
    _max?: FileInCourseMaxAggregateInputType;
};
export type FileInCourseGroupByOutputType = {
    fileId: string;
    courseId: string;
    userId: string;
    createdAt: Date;
    _count: FileInCourseCountAggregateOutputType | null;
    _min: FileInCourseMinAggregateOutputType | null;
    _max: FileInCourseMaxAggregateOutputType | null;
};
export type GetFileInCourseGroupByPayload<T extends FileInCourseGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FileInCourseGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FileInCourseGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FileInCourseGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FileInCourseGroupByOutputType[P]>;
}>>;
export type FileInCourseWhereInput = {
    AND?: Prisma.FileInCourseWhereInput | Prisma.FileInCourseWhereInput[];
    OR?: Prisma.FileInCourseWhereInput[];
    NOT?: Prisma.FileInCourseWhereInput | Prisma.FileInCourseWhereInput[];
    fileId?: Prisma.StringFilter<"FileInCourse"> | string;
    courseId?: Prisma.StringFilter<"FileInCourse"> | string;
    userId?: Prisma.StringFilter<"FileInCourse"> | string;
    createdAt?: Prisma.DateTimeFilter<"FileInCourse"> | Date | string;
    file?: Prisma.XOR<Prisma.FileScalarRelationFilter, Prisma.FileWhereInput>;
    course?: Prisma.XOR<Prisma.CourseScalarRelationFilter, Prisma.CourseWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
};
export type FileInCourseOrderByWithRelationInput = {
    fileId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    file?: Prisma.FileOrderByWithRelationInput;
    course?: Prisma.CourseOrderByWithRelationInput;
    user?: Prisma.UsersOrderByWithRelationInput;
};
export type FileInCourseWhereUniqueInput = Prisma.AtLeast<{
    fileId_courseId?: Prisma.FileInCourseFileIdCourseIdCompoundUniqueInput;
    AND?: Prisma.FileInCourseWhereInput | Prisma.FileInCourseWhereInput[];
    OR?: Prisma.FileInCourseWhereInput[];
    NOT?: Prisma.FileInCourseWhereInput | Prisma.FileInCourseWhereInput[];
    fileId?: Prisma.StringFilter<"FileInCourse"> | string;
    courseId?: Prisma.StringFilter<"FileInCourse"> | string;
    userId?: Prisma.StringFilter<"FileInCourse"> | string;
    createdAt?: Prisma.DateTimeFilter<"FileInCourse"> | Date | string;
    file?: Prisma.XOR<Prisma.FileScalarRelationFilter, Prisma.FileWhereInput>;
    course?: Prisma.XOR<Prisma.CourseScalarRelationFilter, Prisma.CourseWhereInput>;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
}, "fileId_courseId">;
export type FileInCourseOrderByWithAggregationInput = {
    fileId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FileInCourseCountOrderByAggregateInput;
    _max?: Prisma.FileInCourseMaxOrderByAggregateInput;
    _min?: Prisma.FileInCourseMinOrderByAggregateInput;
};
export type FileInCourseScalarWhereWithAggregatesInput = {
    AND?: Prisma.FileInCourseScalarWhereWithAggregatesInput | Prisma.FileInCourseScalarWhereWithAggregatesInput[];
    OR?: Prisma.FileInCourseScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FileInCourseScalarWhereWithAggregatesInput | Prisma.FileInCourseScalarWhereWithAggregatesInput[];
    fileId?: Prisma.StringWithAggregatesFilter<"FileInCourse"> | string;
    courseId?: Prisma.StringWithAggregatesFilter<"FileInCourse"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"FileInCourse"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FileInCourse"> | Date | string;
};
export type FileInCourseCreateInput = {
    createdAt?: Date | string;
    file: Prisma.FileCreateNestedOneWithoutInCoursesInput;
    course: Prisma.CourseCreateNestedOneWithoutFilesInput;
    user: Prisma.UsersCreateNestedOneWithoutFilesInCoursesInput;
};
export type FileInCourseUncheckedCreateInput = {
    fileId: string;
    courseId: string;
    userId: string;
    createdAt?: Date | string;
};
export type FileInCourseUpdateInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileUpdateOneRequiredWithoutInCoursesNestedInput;
    course?: Prisma.CourseUpdateOneRequiredWithoutFilesNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutFilesInCoursesNestedInput;
};
export type FileInCourseUncheckedUpdateInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInCourseCreateManyInput = {
    fileId: string;
    courseId: string;
    userId: string;
    createdAt?: Date | string;
};
export type FileInCourseUpdateManyMutationInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInCourseUncheckedUpdateManyInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInCourseListRelationFilter = {
    every?: Prisma.FileInCourseWhereInput;
    some?: Prisma.FileInCourseWhereInput;
    none?: Prisma.FileInCourseWhereInput;
};
export type FileInCourseOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FileInCourseFileIdCourseIdCompoundUniqueInput = {
    fileId: string;
    courseId: string;
};
export type FileInCourseCountOrderByAggregateInput = {
    fileId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FileInCourseMaxOrderByAggregateInput = {
    fileId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FileInCourseMinOrderByAggregateInput = {
    fileId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FileInCourseCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FileInCourseCreateWithoutUserInput, Prisma.FileInCourseUncheckedCreateWithoutUserInput> | Prisma.FileInCourseCreateWithoutUserInput[] | Prisma.FileInCourseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FileInCourseCreateOrConnectWithoutUserInput | Prisma.FileInCourseCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FileInCourseCreateManyUserInputEnvelope;
    connect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
};
export type FileInCourseUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FileInCourseCreateWithoutUserInput, Prisma.FileInCourseUncheckedCreateWithoutUserInput> | Prisma.FileInCourseCreateWithoutUserInput[] | Prisma.FileInCourseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FileInCourseCreateOrConnectWithoutUserInput | Prisma.FileInCourseCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FileInCourseCreateManyUserInputEnvelope;
    connect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
};
export type FileInCourseUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FileInCourseCreateWithoutUserInput, Prisma.FileInCourseUncheckedCreateWithoutUserInput> | Prisma.FileInCourseCreateWithoutUserInput[] | Prisma.FileInCourseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FileInCourseCreateOrConnectWithoutUserInput | Prisma.FileInCourseCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FileInCourseUpsertWithWhereUniqueWithoutUserInput | Prisma.FileInCourseUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FileInCourseCreateManyUserInputEnvelope;
    set?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    disconnect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    delete?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    connect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    update?: Prisma.FileInCourseUpdateWithWhereUniqueWithoutUserInput | Prisma.FileInCourseUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FileInCourseUpdateManyWithWhereWithoutUserInput | Prisma.FileInCourseUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FileInCourseScalarWhereInput | Prisma.FileInCourseScalarWhereInput[];
};
export type FileInCourseUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FileInCourseCreateWithoutUserInput, Prisma.FileInCourseUncheckedCreateWithoutUserInput> | Prisma.FileInCourseCreateWithoutUserInput[] | Prisma.FileInCourseUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FileInCourseCreateOrConnectWithoutUserInput | Prisma.FileInCourseCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FileInCourseUpsertWithWhereUniqueWithoutUserInput | Prisma.FileInCourseUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FileInCourseCreateManyUserInputEnvelope;
    set?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    disconnect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    delete?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    connect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    update?: Prisma.FileInCourseUpdateWithWhereUniqueWithoutUserInput | Prisma.FileInCourseUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FileInCourseUpdateManyWithWhereWithoutUserInput | Prisma.FileInCourseUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FileInCourseScalarWhereInput | Prisma.FileInCourseScalarWhereInput[];
};
export type FileInCourseCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.FileInCourseCreateWithoutCourseInput, Prisma.FileInCourseUncheckedCreateWithoutCourseInput> | Prisma.FileInCourseCreateWithoutCourseInput[] | Prisma.FileInCourseUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.FileInCourseCreateOrConnectWithoutCourseInput | Prisma.FileInCourseCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.FileInCourseCreateManyCourseInputEnvelope;
    connect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
};
export type FileInCourseUncheckedCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.FileInCourseCreateWithoutCourseInput, Prisma.FileInCourseUncheckedCreateWithoutCourseInput> | Prisma.FileInCourseCreateWithoutCourseInput[] | Prisma.FileInCourseUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.FileInCourseCreateOrConnectWithoutCourseInput | Prisma.FileInCourseCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.FileInCourseCreateManyCourseInputEnvelope;
    connect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
};
export type FileInCourseUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.FileInCourseCreateWithoutCourseInput, Prisma.FileInCourseUncheckedCreateWithoutCourseInput> | Prisma.FileInCourseCreateWithoutCourseInput[] | Prisma.FileInCourseUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.FileInCourseCreateOrConnectWithoutCourseInput | Prisma.FileInCourseCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.FileInCourseUpsertWithWhereUniqueWithoutCourseInput | Prisma.FileInCourseUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.FileInCourseCreateManyCourseInputEnvelope;
    set?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    disconnect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    delete?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    connect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    update?: Prisma.FileInCourseUpdateWithWhereUniqueWithoutCourseInput | Prisma.FileInCourseUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.FileInCourseUpdateManyWithWhereWithoutCourseInput | Prisma.FileInCourseUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.FileInCourseScalarWhereInput | Prisma.FileInCourseScalarWhereInput[];
};
export type FileInCourseUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.FileInCourseCreateWithoutCourseInput, Prisma.FileInCourseUncheckedCreateWithoutCourseInput> | Prisma.FileInCourseCreateWithoutCourseInput[] | Prisma.FileInCourseUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.FileInCourseCreateOrConnectWithoutCourseInput | Prisma.FileInCourseCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.FileInCourseUpsertWithWhereUniqueWithoutCourseInput | Prisma.FileInCourseUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.FileInCourseCreateManyCourseInputEnvelope;
    set?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    disconnect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    delete?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    connect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    update?: Prisma.FileInCourseUpdateWithWhereUniqueWithoutCourseInput | Prisma.FileInCourseUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.FileInCourseUpdateManyWithWhereWithoutCourseInput | Prisma.FileInCourseUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.FileInCourseScalarWhereInput | Prisma.FileInCourseScalarWhereInput[];
};
export type FileInCourseCreateNestedManyWithoutFileInput = {
    create?: Prisma.XOR<Prisma.FileInCourseCreateWithoutFileInput, Prisma.FileInCourseUncheckedCreateWithoutFileInput> | Prisma.FileInCourseCreateWithoutFileInput[] | Prisma.FileInCourseUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.FileInCourseCreateOrConnectWithoutFileInput | Prisma.FileInCourseCreateOrConnectWithoutFileInput[];
    createMany?: Prisma.FileInCourseCreateManyFileInputEnvelope;
    connect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
};
export type FileInCourseUncheckedCreateNestedManyWithoutFileInput = {
    create?: Prisma.XOR<Prisma.FileInCourseCreateWithoutFileInput, Prisma.FileInCourseUncheckedCreateWithoutFileInput> | Prisma.FileInCourseCreateWithoutFileInput[] | Prisma.FileInCourseUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.FileInCourseCreateOrConnectWithoutFileInput | Prisma.FileInCourseCreateOrConnectWithoutFileInput[];
    createMany?: Prisma.FileInCourseCreateManyFileInputEnvelope;
    connect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
};
export type FileInCourseUpdateManyWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.FileInCourseCreateWithoutFileInput, Prisma.FileInCourseUncheckedCreateWithoutFileInput> | Prisma.FileInCourseCreateWithoutFileInput[] | Prisma.FileInCourseUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.FileInCourseCreateOrConnectWithoutFileInput | Prisma.FileInCourseCreateOrConnectWithoutFileInput[];
    upsert?: Prisma.FileInCourseUpsertWithWhereUniqueWithoutFileInput | Prisma.FileInCourseUpsertWithWhereUniqueWithoutFileInput[];
    createMany?: Prisma.FileInCourseCreateManyFileInputEnvelope;
    set?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    disconnect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    delete?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    connect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    update?: Prisma.FileInCourseUpdateWithWhereUniqueWithoutFileInput | Prisma.FileInCourseUpdateWithWhereUniqueWithoutFileInput[];
    updateMany?: Prisma.FileInCourseUpdateManyWithWhereWithoutFileInput | Prisma.FileInCourseUpdateManyWithWhereWithoutFileInput[];
    deleteMany?: Prisma.FileInCourseScalarWhereInput | Prisma.FileInCourseScalarWhereInput[];
};
export type FileInCourseUncheckedUpdateManyWithoutFileNestedInput = {
    create?: Prisma.XOR<Prisma.FileInCourseCreateWithoutFileInput, Prisma.FileInCourseUncheckedCreateWithoutFileInput> | Prisma.FileInCourseCreateWithoutFileInput[] | Prisma.FileInCourseUncheckedCreateWithoutFileInput[];
    connectOrCreate?: Prisma.FileInCourseCreateOrConnectWithoutFileInput | Prisma.FileInCourseCreateOrConnectWithoutFileInput[];
    upsert?: Prisma.FileInCourseUpsertWithWhereUniqueWithoutFileInput | Prisma.FileInCourseUpsertWithWhereUniqueWithoutFileInput[];
    createMany?: Prisma.FileInCourseCreateManyFileInputEnvelope;
    set?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    disconnect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    delete?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    connect?: Prisma.FileInCourseWhereUniqueInput | Prisma.FileInCourseWhereUniqueInput[];
    update?: Prisma.FileInCourseUpdateWithWhereUniqueWithoutFileInput | Prisma.FileInCourseUpdateWithWhereUniqueWithoutFileInput[];
    updateMany?: Prisma.FileInCourseUpdateManyWithWhereWithoutFileInput | Prisma.FileInCourseUpdateManyWithWhereWithoutFileInput[];
    deleteMany?: Prisma.FileInCourseScalarWhereInput | Prisma.FileInCourseScalarWhereInput[];
};
export type FileInCourseCreateWithoutUserInput = {
    createdAt?: Date | string;
    file: Prisma.FileCreateNestedOneWithoutInCoursesInput;
    course: Prisma.CourseCreateNestedOneWithoutFilesInput;
};
export type FileInCourseUncheckedCreateWithoutUserInput = {
    fileId: string;
    courseId: string;
    createdAt?: Date | string;
};
export type FileInCourseCreateOrConnectWithoutUserInput = {
    where: Prisma.FileInCourseWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileInCourseCreateWithoutUserInput, Prisma.FileInCourseUncheckedCreateWithoutUserInput>;
};
export type FileInCourseCreateManyUserInputEnvelope = {
    data: Prisma.FileInCourseCreateManyUserInput | Prisma.FileInCourseCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type FileInCourseUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.FileInCourseWhereUniqueInput;
    update: Prisma.XOR<Prisma.FileInCourseUpdateWithoutUserInput, Prisma.FileInCourseUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FileInCourseCreateWithoutUserInput, Prisma.FileInCourseUncheckedCreateWithoutUserInput>;
};
export type FileInCourseUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.FileInCourseWhereUniqueInput;
    data: Prisma.XOR<Prisma.FileInCourseUpdateWithoutUserInput, Prisma.FileInCourseUncheckedUpdateWithoutUserInput>;
};
export type FileInCourseUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.FileInCourseScalarWhereInput;
    data: Prisma.XOR<Prisma.FileInCourseUpdateManyMutationInput, Prisma.FileInCourseUncheckedUpdateManyWithoutUserInput>;
};
export type FileInCourseScalarWhereInput = {
    AND?: Prisma.FileInCourseScalarWhereInput | Prisma.FileInCourseScalarWhereInput[];
    OR?: Prisma.FileInCourseScalarWhereInput[];
    NOT?: Prisma.FileInCourseScalarWhereInput | Prisma.FileInCourseScalarWhereInput[];
    fileId?: Prisma.StringFilter<"FileInCourse"> | string;
    courseId?: Prisma.StringFilter<"FileInCourse"> | string;
    userId?: Prisma.StringFilter<"FileInCourse"> | string;
    createdAt?: Prisma.DateTimeFilter<"FileInCourse"> | Date | string;
};
export type FileInCourseCreateWithoutCourseInput = {
    createdAt?: Date | string;
    file: Prisma.FileCreateNestedOneWithoutInCoursesInput;
    user: Prisma.UsersCreateNestedOneWithoutFilesInCoursesInput;
};
export type FileInCourseUncheckedCreateWithoutCourseInput = {
    fileId: string;
    userId: string;
    createdAt?: Date | string;
};
export type FileInCourseCreateOrConnectWithoutCourseInput = {
    where: Prisma.FileInCourseWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileInCourseCreateWithoutCourseInput, Prisma.FileInCourseUncheckedCreateWithoutCourseInput>;
};
export type FileInCourseCreateManyCourseInputEnvelope = {
    data: Prisma.FileInCourseCreateManyCourseInput | Prisma.FileInCourseCreateManyCourseInput[];
    skipDuplicates?: boolean;
};
export type FileInCourseUpsertWithWhereUniqueWithoutCourseInput = {
    where: Prisma.FileInCourseWhereUniqueInput;
    update: Prisma.XOR<Prisma.FileInCourseUpdateWithoutCourseInput, Prisma.FileInCourseUncheckedUpdateWithoutCourseInput>;
    create: Prisma.XOR<Prisma.FileInCourseCreateWithoutCourseInput, Prisma.FileInCourseUncheckedCreateWithoutCourseInput>;
};
export type FileInCourseUpdateWithWhereUniqueWithoutCourseInput = {
    where: Prisma.FileInCourseWhereUniqueInput;
    data: Prisma.XOR<Prisma.FileInCourseUpdateWithoutCourseInput, Prisma.FileInCourseUncheckedUpdateWithoutCourseInput>;
};
export type FileInCourseUpdateManyWithWhereWithoutCourseInput = {
    where: Prisma.FileInCourseScalarWhereInput;
    data: Prisma.XOR<Prisma.FileInCourseUpdateManyMutationInput, Prisma.FileInCourseUncheckedUpdateManyWithoutCourseInput>;
};
export type FileInCourseCreateWithoutFileInput = {
    createdAt?: Date | string;
    course: Prisma.CourseCreateNestedOneWithoutFilesInput;
    user: Prisma.UsersCreateNestedOneWithoutFilesInCoursesInput;
};
export type FileInCourseUncheckedCreateWithoutFileInput = {
    courseId: string;
    userId: string;
    createdAt?: Date | string;
};
export type FileInCourseCreateOrConnectWithoutFileInput = {
    where: Prisma.FileInCourseWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileInCourseCreateWithoutFileInput, Prisma.FileInCourseUncheckedCreateWithoutFileInput>;
};
export type FileInCourseCreateManyFileInputEnvelope = {
    data: Prisma.FileInCourseCreateManyFileInput | Prisma.FileInCourseCreateManyFileInput[];
    skipDuplicates?: boolean;
};
export type FileInCourseUpsertWithWhereUniqueWithoutFileInput = {
    where: Prisma.FileInCourseWhereUniqueInput;
    update: Prisma.XOR<Prisma.FileInCourseUpdateWithoutFileInput, Prisma.FileInCourseUncheckedUpdateWithoutFileInput>;
    create: Prisma.XOR<Prisma.FileInCourseCreateWithoutFileInput, Prisma.FileInCourseUncheckedCreateWithoutFileInput>;
};
export type FileInCourseUpdateWithWhereUniqueWithoutFileInput = {
    where: Prisma.FileInCourseWhereUniqueInput;
    data: Prisma.XOR<Prisma.FileInCourseUpdateWithoutFileInput, Prisma.FileInCourseUncheckedUpdateWithoutFileInput>;
};
export type FileInCourseUpdateManyWithWhereWithoutFileInput = {
    where: Prisma.FileInCourseScalarWhereInput;
    data: Prisma.XOR<Prisma.FileInCourseUpdateManyMutationInput, Prisma.FileInCourseUncheckedUpdateManyWithoutFileInput>;
};
export type FileInCourseCreateManyUserInput = {
    fileId: string;
    courseId: string;
    createdAt?: Date | string;
};
export type FileInCourseUpdateWithoutUserInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileUpdateOneRequiredWithoutInCoursesNestedInput;
    course?: Prisma.CourseUpdateOneRequiredWithoutFilesNestedInput;
};
export type FileInCourseUncheckedUpdateWithoutUserInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInCourseUncheckedUpdateManyWithoutUserInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInCourseCreateManyCourseInput = {
    fileId: string;
    userId: string;
    createdAt?: Date | string;
};
export type FileInCourseUpdateWithoutCourseInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    file?: Prisma.FileUpdateOneRequiredWithoutInCoursesNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutFilesInCoursesNestedInput;
};
export type FileInCourseUncheckedUpdateWithoutCourseInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInCourseUncheckedUpdateManyWithoutCourseInput = {
    fileId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInCourseCreateManyFileInput = {
    courseId: string;
    userId: string;
    createdAt?: Date | string;
};
export type FileInCourseUpdateWithoutFileInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUpdateOneRequiredWithoutFilesNestedInput;
    user?: Prisma.UsersUpdateOneRequiredWithoutFilesInCoursesNestedInput;
};
export type FileInCourseUncheckedUpdateWithoutFileInput = {
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInCourseUncheckedUpdateManyWithoutFileInput = {
    courseId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FileInCourseSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    fileId?: boolean;
    courseId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileInCourse"]>;
export type FileInCourseSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    fileId?: boolean;
    courseId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileInCourse"]>;
export type FileInCourseSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    fileId?: boolean;
    courseId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["fileInCourse"]>;
export type FileInCourseSelectScalar = {
    fileId?: boolean;
    courseId?: boolean;
    userId?: boolean;
    createdAt?: boolean;
};
export type FileInCourseOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"fileId" | "courseId" | "userId" | "createdAt", ExtArgs["result"]["fileInCourse"]>;
export type FileInCourseInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type FileInCourseIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type FileInCourseIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    file?: boolean | Prisma.FileDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.CourseDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $FileInCoursePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FileInCourse";
    objects: {
        file: Prisma.$FilePayload<ExtArgs>;
        course: Prisma.$CoursePayload<ExtArgs>;
        user: Prisma.$UsersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        fileId: string;
        courseId: string;
        userId: string;
        createdAt: Date;
    }, ExtArgs["result"]["fileInCourse"]>;
    composites: {};
};
export type FileInCourseGetPayload<S extends boolean | null | undefined | FileInCourseDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FileInCoursePayload, S>;
export type FileInCourseCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FileInCourseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FileInCourseCountAggregateInputType | true;
};
export interface FileInCourseDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FileInCourse'];
        meta: {
            name: 'FileInCourse';
        };
    };
    findUnique<T extends FileInCourseFindUniqueArgs>(args: Prisma.SelectSubset<T, FileInCourseFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FileInCourseClient<runtime.Types.Result.GetResult<Prisma.$FileInCoursePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FileInCourseFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FileInCourseFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FileInCourseClient<runtime.Types.Result.GetResult<Prisma.$FileInCoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FileInCourseFindFirstArgs>(args?: Prisma.SelectSubset<T, FileInCourseFindFirstArgs<ExtArgs>>): Prisma.Prisma__FileInCourseClient<runtime.Types.Result.GetResult<Prisma.$FileInCoursePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FileInCourseFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FileInCourseFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FileInCourseClient<runtime.Types.Result.GetResult<Prisma.$FileInCoursePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FileInCourseFindManyArgs>(args?: Prisma.SelectSubset<T, FileInCourseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileInCoursePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FileInCourseCreateArgs>(args: Prisma.SelectSubset<T, FileInCourseCreateArgs<ExtArgs>>): Prisma.Prisma__FileInCourseClient<runtime.Types.Result.GetResult<Prisma.$FileInCoursePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FileInCourseCreateManyArgs>(args?: Prisma.SelectSubset<T, FileInCourseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FileInCourseCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FileInCourseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileInCoursePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FileInCourseDeleteArgs>(args: Prisma.SelectSubset<T, FileInCourseDeleteArgs<ExtArgs>>): Prisma.Prisma__FileInCourseClient<runtime.Types.Result.GetResult<Prisma.$FileInCoursePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FileInCourseUpdateArgs>(args: Prisma.SelectSubset<T, FileInCourseUpdateArgs<ExtArgs>>): Prisma.Prisma__FileInCourseClient<runtime.Types.Result.GetResult<Prisma.$FileInCoursePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FileInCourseDeleteManyArgs>(args?: Prisma.SelectSubset<T, FileInCourseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FileInCourseUpdateManyArgs>(args: Prisma.SelectSubset<T, FileInCourseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FileInCourseUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FileInCourseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileInCoursePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FileInCourseUpsertArgs>(args: Prisma.SelectSubset<T, FileInCourseUpsertArgs<ExtArgs>>): Prisma.Prisma__FileInCourseClient<runtime.Types.Result.GetResult<Prisma.$FileInCoursePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FileInCourseCountArgs>(args?: Prisma.Subset<T, FileInCourseCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FileInCourseCountAggregateOutputType> : number>;
    aggregate<T extends FileInCourseAggregateArgs>(args: Prisma.Subset<T, FileInCourseAggregateArgs>): Prisma.PrismaPromise<GetFileInCourseAggregateType<T>>;
    groupBy<T extends FileInCourseGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FileInCourseGroupByArgs['orderBy'];
    } : {
        orderBy?: FileInCourseGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FileInCourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFileInCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FileInCourseFieldRefs;
}
export interface Prisma__FileInCourseClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    file<T extends Prisma.FileDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FileDefaultArgs<ExtArgs>>): Prisma.Prisma__FileClient<runtime.Types.Result.GetResult<Prisma.$FilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    course<T extends Prisma.CourseDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CourseDefaultArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FileInCourseFieldRefs {
    readonly fileId: Prisma.FieldRef<"FileInCourse", 'String'>;
    readonly courseId: Prisma.FieldRef<"FileInCourse", 'String'>;
    readonly userId: Prisma.FieldRef<"FileInCourse", 'String'>;
    readonly createdAt: Prisma.FieldRef<"FileInCourse", 'DateTime'>;
}
export type FileInCourseFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInCourseSelect<ExtArgs> | null;
    omit?: Prisma.FileInCourseOmit<ExtArgs> | null;
    include?: Prisma.FileInCourseInclude<ExtArgs> | null;
    where: Prisma.FileInCourseWhereUniqueInput;
};
export type FileInCourseFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInCourseSelect<ExtArgs> | null;
    omit?: Prisma.FileInCourseOmit<ExtArgs> | null;
    include?: Prisma.FileInCourseInclude<ExtArgs> | null;
    where: Prisma.FileInCourseWhereUniqueInput;
};
export type FileInCourseFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FileInCourseFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FileInCourseFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FileInCourseCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInCourseSelect<ExtArgs> | null;
    omit?: Prisma.FileInCourseOmit<ExtArgs> | null;
    include?: Prisma.FileInCourseInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileInCourseCreateInput, Prisma.FileInCourseUncheckedCreateInput>;
};
export type FileInCourseCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FileInCourseCreateManyInput | Prisma.FileInCourseCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FileInCourseCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInCourseSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FileInCourseOmit<ExtArgs> | null;
    data: Prisma.FileInCourseCreateManyInput | Prisma.FileInCourseCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FileInCourseIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FileInCourseUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInCourseSelect<ExtArgs> | null;
    omit?: Prisma.FileInCourseOmit<ExtArgs> | null;
    include?: Prisma.FileInCourseInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileInCourseUpdateInput, Prisma.FileInCourseUncheckedUpdateInput>;
    where: Prisma.FileInCourseWhereUniqueInput;
};
export type FileInCourseUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FileInCourseUpdateManyMutationInput, Prisma.FileInCourseUncheckedUpdateManyInput>;
    where?: Prisma.FileInCourseWhereInput;
    limit?: number;
};
export type FileInCourseUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInCourseSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FileInCourseOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FileInCourseUpdateManyMutationInput, Prisma.FileInCourseUncheckedUpdateManyInput>;
    where?: Prisma.FileInCourseWhereInput;
    limit?: number;
    include?: Prisma.FileInCourseIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FileInCourseUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInCourseSelect<ExtArgs> | null;
    omit?: Prisma.FileInCourseOmit<ExtArgs> | null;
    include?: Prisma.FileInCourseInclude<ExtArgs> | null;
    where: Prisma.FileInCourseWhereUniqueInput;
    create: Prisma.XOR<Prisma.FileInCourseCreateInput, Prisma.FileInCourseUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FileInCourseUpdateInput, Prisma.FileInCourseUncheckedUpdateInput>;
};
export type FileInCourseDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInCourseSelect<ExtArgs> | null;
    omit?: Prisma.FileInCourseOmit<ExtArgs> | null;
    include?: Prisma.FileInCourseInclude<ExtArgs> | null;
    where: Prisma.FileInCourseWhereUniqueInput;
};
export type FileInCourseDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileInCourseWhereInput;
    limit?: number;
};
export type FileInCourseDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FileInCourseSelect<ExtArgs> | null;
    omit?: Prisma.FileInCourseOmit<ExtArgs> | null;
    include?: Prisma.FileInCourseInclude<ExtArgs> | null;
};
