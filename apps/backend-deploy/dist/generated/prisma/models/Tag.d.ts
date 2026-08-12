import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type TagModel = runtime.Types.Result.DefaultSelection<Prisma.$TagPayload>;
export type AggregateTag = {
    _count: TagCountAggregateOutputType | null;
    _min: TagMinAggregateOutputType | null;
    _max: TagMaxAggregateOutputType | null;
};
export type TagMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
};
export type TagMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
};
export type TagCountAggregateOutputType = {
    id: number;
    name: number;
    embedding: number;
    createdAt: number;
    _all: number;
};
export type TagMinAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
};
export type TagMaxAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
};
export type TagCountAggregateInputType = {
    id?: true;
    name?: true;
    embedding?: true;
    createdAt?: true;
    _all?: true;
};
export type TagAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput | Prisma.TagOrderByWithRelationInput[];
    cursor?: Prisma.TagWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TagCountAggregateInputType;
    _min?: TagMinAggregateInputType;
    _max?: TagMaxAggregateInputType;
};
export type GetTagAggregateType<T extends TagAggregateArgs> = {
    [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTag[P]> : Prisma.GetScalarType<T[P], AggregateTag[P]>;
};
export type TagGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithAggregationInput | Prisma.TagOrderByWithAggregationInput[];
    by: Prisma.TagScalarFieldEnum[] | Prisma.TagScalarFieldEnum;
    having?: Prisma.TagScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TagCountAggregateInputType | true;
    _min?: TagMinAggregateInputType;
    _max?: TagMaxAggregateInputType;
};
export type TagGroupByOutputType = {
    id: string;
    name: string;
    embedding: runtime.JsonValue | null;
    createdAt: Date;
    _count: TagCountAggregateOutputType | null;
    _min: TagMinAggregateOutputType | null;
    _max: TagMaxAggregateOutputType | null;
};
export type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TagGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TagGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TagGroupByOutputType[P]>;
}>>;
export type TagWhereInput = {
    AND?: Prisma.TagWhereInput | Prisma.TagWhereInput[];
    OR?: Prisma.TagWhereInput[];
    NOT?: Prisma.TagWhereInput | Prisma.TagWhereInput[];
    id?: Prisma.StringFilter<"Tag"> | string;
    name?: Prisma.StringFilter<"Tag"> | string;
    embedding?: Prisma.JsonNullableFilter<"Tag">;
    createdAt?: Prisma.DateTimeFilter<"Tag"> | Date | string;
    courses?: Prisma.CourseTagListRelationFilter;
    posts?: Prisma.PostTagListRelationFilter;
    files?: Prisma.FileTagListRelationFilter;
};
export type TagOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    embedding?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    courses?: Prisma.CourseTagOrderByRelationAggregateInput;
    posts?: Prisma.PostTagOrderByRelationAggregateInput;
    files?: Prisma.FileTagOrderByRelationAggregateInput;
};
export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.TagWhereInput | Prisma.TagWhereInput[];
    OR?: Prisma.TagWhereInput[];
    NOT?: Prisma.TagWhereInput | Prisma.TagWhereInput[];
    embedding?: Prisma.JsonNullableFilter<"Tag">;
    createdAt?: Prisma.DateTimeFilter<"Tag"> | Date | string;
    courses?: Prisma.CourseTagListRelationFilter;
    posts?: Prisma.PostTagListRelationFilter;
    files?: Prisma.FileTagListRelationFilter;
}, "id" | "name">;
export type TagOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    embedding?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.TagCountOrderByAggregateInput;
    _max?: Prisma.TagMaxOrderByAggregateInput;
    _min?: Prisma.TagMinOrderByAggregateInput;
};
export type TagScalarWhereWithAggregatesInput = {
    AND?: Prisma.TagScalarWhereWithAggregatesInput | Prisma.TagScalarWhereWithAggregatesInput[];
    OR?: Prisma.TagScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TagScalarWhereWithAggregatesInput | Prisma.TagScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Tag"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Tag"> | string;
    embedding?: Prisma.JsonNullableWithAggregatesFilter<"Tag">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Tag"> | Date | string;
};
export type TagCreateInput = {
    id?: string;
    name: string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    courses?: Prisma.CourseTagCreateNestedManyWithoutTagInput;
    posts?: Prisma.PostTagCreateNestedManyWithoutTagInput;
    files?: Prisma.FileTagCreateNestedManyWithoutTagInput;
};
export type TagUncheckedCreateInput = {
    id?: string;
    name: string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    courses?: Prisma.CourseTagUncheckedCreateNestedManyWithoutTagInput;
    posts?: Prisma.PostTagUncheckedCreateNestedManyWithoutTagInput;
    files?: Prisma.FileTagUncheckedCreateNestedManyWithoutTagInput;
};
export type TagUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseTagUpdateManyWithoutTagNestedInput;
    posts?: Prisma.PostTagUpdateManyWithoutTagNestedInput;
    files?: Prisma.FileTagUpdateManyWithoutTagNestedInput;
};
export type TagUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseTagUncheckedUpdateManyWithoutTagNestedInput;
    posts?: Prisma.PostTagUncheckedUpdateManyWithoutTagNestedInput;
    files?: Prisma.FileTagUncheckedUpdateManyWithoutTagNestedInput;
};
export type TagCreateManyInput = {
    id?: string;
    name: string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type TagUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TagUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TagCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    embedding?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TagMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TagMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type TagScalarRelationFilter = {
    is?: Prisma.TagWhereInput;
    isNot?: Prisma.TagWhereInput;
};
export type TagCreateNestedOneWithoutCoursesInput = {
    create?: Prisma.XOR<Prisma.TagCreateWithoutCoursesInput, Prisma.TagUncheckedCreateWithoutCoursesInput>;
    connectOrCreate?: Prisma.TagCreateOrConnectWithoutCoursesInput;
    connect?: Prisma.TagWhereUniqueInput;
};
export type TagUpdateOneRequiredWithoutCoursesNestedInput = {
    create?: Prisma.XOR<Prisma.TagCreateWithoutCoursesInput, Prisma.TagUncheckedCreateWithoutCoursesInput>;
    connectOrCreate?: Prisma.TagCreateOrConnectWithoutCoursesInput;
    upsert?: Prisma.TagUpsertWithoutCoursesInput;
    connect?: Prisma.TagWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TagUpdateToOneWithWhereWithoutCoursesInput, Prisma.TagUpdateWithoutCoursesInput>, Prisma.TagUncheckedUpdateWithoutCoursesInput>;
};
export type TagCreateNestedOneWithoutPostsInput = {
    create?: Prisma.XOR<Prisma.TagCreateWithoutPostsInput, Prisma.TagUncheckedCreateWithoutPostsInput>;
    connectOrCreate?: Prisma.TagCreateOrConnectWithoutPostsInput;
    connect?: Prisma.TagWhereUniqueInput;
};
export type TagUpdateOneRequiredWithoutPostsNestedInput = {
    create?: Prisma.XOR<Prisma.TagCreateWithoutPostsInput, Prisma.TagUncheckedCreateWithoutPostsInput>;
    connectOrCreate?: Prisma.TagCreateOrConnectWithoutPostsInput;
    upsert?: Prisma.TagUpsertWithoutPostsInput;
    connect?: Prisma.TagWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TagUpdateToOneWithWhereWithoutPostsInput, Prisma.TagUpdateWithoutPostsInput>, Prisma.TagUncheckedUpdateWithoutPostsInput>;
};
export type TagCreateNestedOneWithoutFilesInput = {
    create?: Prisma.XOR<Prisma.TagCreateWithoutFilesInput, Prisma.TagUncheckedCreateWithoutFilesInput>;
    connectOrCreate?: Prisma.TagCreateOrConnectWithoutFilesInput;
    connect?: Prisma.TagWhereUniqueInput;
};
export type TagUpdateOneRequiredWithoutFilesNestedInput = {
    create?: Prisma.XOR<Prisma.TagCreateWithoutFilesInput, Prisma.TagUncheckedCreateWithoutFilesInput>;
    connectOrCreate?: Prisma.TagCreateOrConnectWithoutFilesInput;
    upsert?: Prisma.TagUpsertWithoutFilesInput;
    connect?: Prisma.TagWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TagUpdateToOneWithWhereWithoutFilesInput, Prisma.TagUpdateWithoutFilesInput>, Prisma.TagUncheckedUpdateWithoutFilesInput>;
};
export type TagCreateWithoutCoursesInput = {
    id?: string;
    name: string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    posts?: Prisma.PostTagCreateNestedManyWithoutTagInput;
    files?: Prisma.FileTagCreateNestedManyWithoutTagInput;
};
export type TagUncheckedCreateWithoutCoursesInput = {
    id?: string;
    name: string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    posts?: Prisma.PostTagUncheckedCreateNestedManyWithoutTagInput;
    files?: Prisma.FileTagUncheckedCreateNestedManyWithoutTagInput;
};
export type TagCreateOrConnectWithoutCoursesInput = {
    where: Prisma.TagWhereUniqueInput;
    create: Prisma.XOR<Prisma.TagCreateWithoutCoursesInput, Prisma.TagUncheckedCreateWithoutCoursesInput>;
};
export type TagUpsertWithoutCoursesInput = {
    update: Prisma.XOR<Prisma.TagUpdateWithoutCoursesInput, Prisma.TagUncheckedUpdateWithoutCoursesInput>;
    create: Prisma.XOR<Prisma.TagCreateWithoutCoursesInput, Prisma.TagUncheckedCreateWithoutCoursesInput>;
    where?: Prisma.TagWhereInput;
};
export type TagUpdateToOneWithWhereWithoutCoursesInput = {
    where?: Prisma.TagWhereInput;
    data: Prisma.XOR<Prisma.TagUpdateWithoutCoursesInput, Prisma.TagUncheckedUpdateWithoutCoursesInput>;
};
export type TagUpdateWithoutCoursesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    posts?: Prisma.PostTagUpdateManyWithoutTagNestedInput;
    files?: Prisma.FileTagUpdateManyWithoutTagNestedInput;
};
export type TagUncheckedUpdateWithoutCoursesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    posts?: Prisma.PostTagUncheckedUpdateManyWithoutTagNestedInput;
    files?: Prisma.FileTagUncheckedUpdateManyWithoutTagNestedInput;
};
export type TagCreateWithoutPostsInput = {
    id?: string;
    name: string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    courses?: Prisma.CourseTagCreateNestedManyWithoutTagInput;
    files?: Prisma.FileTagCreateNestedManyWithoutTagInput;
};
export type TagUncheckedCreateWithoutPostsInput = {
    id?: string;
    name: string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    courses?: Prisma.CourseTagUncheckedCreateNestedManyWithoutTagInput;
    files?: Prisma.FileTagUncheckedCreateNestedManyWithoutTagInput;
};
export type TagCreateOrConnectWithoutPostsInput = {
    where: Prisma.TagWhereUniqueInput;
    create: Prisma.XOR<Prisma.TagCreateWithoutPostsInput, Prisma.TagUncheckedCreateWithoutPostsInput>;
};
export type TagUpsertWithoutPostsInput = {
    update: Prisma.XOR<Prisma.TagUpdateWithoutPostsInput, Prisma.TagUncheckedUpdateWithoutPostsInput>;
    create: Prisma.XOR<Prisma.TagCreateWithoutPostsInput, Prisma.TagUncheckedCreateWithoutPostsInput>;
    where?: Prisma.TagWhereInput;
};
export type TagUpdateToOneWithWhereWithoutPostsInput = {
    where?: Prisma.TagWhereInput;
    data: Prisma.XOR<Prisma.TagUpdateWithoutPostsInput, Prisma.TagUncheckedUpdateWithoutPostsInput>;
};
export type TagUpdateWithoutPostsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseTagUpdateManyWithoutTagNestedInput;
    files?: Prisma.FileTagUpdateManyWithoutTagNestedInput;
};
export type TagUncheckedUpdateWithoutPostsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseTagUncheckedUpdateManyWithoutTagNestedInput;
    files?: Prisma.FileTagUncheckedUpdateManyWithoutTagNestedInput;
};
export type TagCreateWithoutFilesInput = {
    id?: string;
    name: string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    courses?: Prisma.CourseTagCreateNestedManyWithoutTagInput;
    posts?: Prisma.PostTagCreateNestedManyWithoutTagInput;
};
export type TagUncheckedCreateWithoutFilesInput = {
    id?: string;
    name: string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    courses?: Prisma.CourseTagUncheckedCreateNestedManyWithoutTagInput;
    posts?: Prisma.PostTagUncheckedCreateNestedManyWithoutTagInput;
};
export type TagCreateOrConnectWithoutFilesInput = {
    where: Prisma.TagWhereUniqueInput;
    create: Prisma.XOR<Prisma.TagCreateWithoutFilesInput, Prisma.TagUncheckedCreateWithoutFilesInput>;
};
export type TagUpsertWithoutFilesInput = {
    update: Prisma.XOR<Prisma.TagUpdateWithoutFilesInput, Prisma.TagUncheckedUpdateWithoutFilesInput>;
    create: Prisma.XOR<Prisma.TagCreateWithoutFilesInput, Prisma.TagUncheckedCreateWithoutFilesInput>;
    where?: Prisma.TagWhereInput;
};
export type TagUpdateToOneWithWhereWithoutFilesInput = {
    where?: Prisma.TagWhereInput;
    data: Prisma.XOR<Prisma.TagUpdateWithoutFilesInput, Prisma.TagUncheckedUpdateWithoutFilesInput>;
};
export type TagUpdateWithoutFilesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseTagUpdateManyWithoutTagNestedInput;
    posts?: Prisma.PostTagUpdateManyWithoutTagNestedInput;
};
export type TagUncheckedUpdateWithoutFilesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    embedding?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    courses?: Prisma.CourseTagUncheckedUpdateManyWithoutTagNestedInput;
    posts?: Prisma.PostTagUncheckedUpdateManyWithoutTagNestedInput;
};
export type TagCountOutputType = {
    courses: number;
    posts: number;
    files: number;
};
export type TagCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    courses?: boolean | TagCountOutputTypeCountCoursesArgs;
    posts?: boolean | TagCountOutputTypeCountPostsArgs;
    files?: boolean | TagCountOutputTypeCountFilesArgs;
};
export type TagCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagCountOutputTypeSelect<ExtArgs> | null;
};
export type TagCountOutputTypeCountCoursesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CourseTagWhereInput;
};
export type TagCountOutputTypeCountPostsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostTagWhereInput;
};
export type TagCountOutputTypeCountFilesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileTagWhereInput;
};
export type TagSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    embedding?: boolean;
    createdAt?: boolean;
    courses?: boolean | Prisma.Tag$coursesArgs<ExtArgs>;
    posts?: boolean | Prisma.Tag$postsArgs<ExtArgs>;
    files?: boolean | Prisma.Tag$filesArgs<ExtArgs>;
    _count?: boolean | Prisma.TagCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["tag"]>;
export type TagSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    embedding?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["tag"]>;
export type TagSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    embedding?: boolean;
    createdAt?: boolean;
}, ExtArgs["result"]["tag"]>;
export type TagSelectScalar = {
    id?: boolean;
    name?: boolean;
    embedding?: boolean;
    createdAt?: boolean;
};
export type TagOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "embedding" | "createdAt", ExtArgs["result"]["tag"]>;
export type TagInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    courses?: boolean | Prisma.Tag$coursesArgs<ExtArgs>;
    posts?: boolean | Prisma.Tag$postsArgs<ExtArgs>;
    files?: boolean | Prisma.Tag$filesArgs<ExtArgs>;
    _count?: boolean | Prisma.TagCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TagIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type TagIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $TagPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Tag";
    objects: {
        courses: Prisma.$CourseTagPayload<ExtArgs>[];
        posts: Prisma.$PostTagPayload<ExtArgs>[];
        files: Prisma.$FileTagPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        embedding: runtime.JsonValue | null;
        createdAt: Date;
    }, ExtArgs["result"]["tag"]>;
    composites: {};
};
export type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TagPayload, S>;
export type TagCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TagCountAggregateInputType | true;
};
export interface TagDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Tag'];
        meta: {
            name: 'Tag';
        };
    };
    findUnique<T extends TagFindUniqueArgs>(args: Prisma.SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TagFindFirstArgs>(args?: Prisma.SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TagFindManyArgs>(args?: Prisma.SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TagCreateArgs>(args: Prisma.SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TagCreateManyArgs>(args?: Prisma.SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TagDeleteArgs>(args: Prisma.SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TagUpdateArgs>(args: Prisma.SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TagDeleteManyArgs>(args?: Prisma.SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TagUpdateManyArgs>(args: Prisma.SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TagUpsertArgs>(args: Prisma.SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma.Prisma__TagClient<runtime.Types.Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TagCountArgs>(args?: Prisma.Subset<T, TagCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TagCountAggregateOutputType> : number>;
    aggregate<T extends TagAggregateArgs>(args: Prisma.Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>;
    groupBy<T extends TagGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TagGroupByArgs['orderBy'];
    } : {
        orderBy?: TagGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TagFieldRefs;
}
export interface Prisma__TagClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    courses<T extends Prisma.Tag$coursesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tag$coursesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CourseTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    posts<T extends Prisma.Tag$postsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tag$postsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    files<T extends Prisma.Tag$filesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Tag$filesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TagFieldRefs {
    readonly id: Prisma.FieldRef<"Tag", 'String'>;
    readonly name: Prisma.FieldRef<"Tag", 'String'>;
    readonly embedding: Prisma.FieldRef<"Tag", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"Tag", 'DateTime'>;
}
export type TagFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where: Prisma.TagWhereUniqueInput;
};
export type TagFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where: Prisma.TagWhereUniqueInput;
};
export type TagFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput | Prisma.TagOrderByWithRelationInput[];
    cursor?: Prisma.TagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TagScalarFieldEnum | Prisma.TagScalarFieldEnum[];
};
export type TagFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput | Prisma.TagOrderByWithRelationInput[];
    cursor?: Prisma.TagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TagScalarFieldEnum | Prisma.TagScalarFieldEnum[];
};
export type TagFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput | Prisma.TagOrderByWithRelationInput[];
    cursor?: Prisma.TagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TagScalarFieldEnum | Prisma.TagScalarFieldEnum[];
};
export type TagCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TagCreateInput, Prisma.TagUncheckedCreateInput>;
};
export type TagCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TagCreateManyInput | Prisma.TagCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TagCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    data: Prisma.TagCreateManyInput | Prisma.TagCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TagUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TagUpdateInput, Prisma.TagUncheckedUpdateInput>;
    where: Prisma.TagWhereUniqueInput;
};
export type TagUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TagUpdateManyMutationInput, Prisma.TagUncheckedUpdateManyInput>;
    where?: Prisma.TagWhereInput;
    limit?: number;
};
export type TagUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TagUpdateManyMutationInput, Prisma.TagUncheckedUpdateManyInput>;
    where?: Prisma.TagWhereInput;
    limit?: number;
};
export type TagUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where: Prisma.TagWhereUniqueInput;
    create: Prisma.XOR<Prisma.TagCreateInput, Prisma.TagUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TagUpdateInput, Prisma.TagUncheckedUpdateInput>;
};
export type TagDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
    where: Prisma.TagWhereUniqueInput;
};
export type TagDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TagWhereInput;
    limit?: number;
};
export type Tag$coursesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseTagSelect<ExtArgs> | null;
    omit?: Prisma.CourseTagOmit<ExtArgs> | null;
    include?: Prisma.CourseTagInclude<ExtArgs> | null;
    where?: Prisma.CourseTagWhereInput;
    orderBy?: Prisma.CourseTagOrderByWithRelationInput | Prisma.CourseTagOrderByWithRelationInput[];
    cursor?: Prisma.CourseTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CourseTagScalarFieldEnum | Prisma.CourseTagScalarFieldEnum[];
};
export type Tag$postsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostTagSelect<ExtArgs> | null;
    omit?: Prisma.PostTagOmit<ExtArgs> | null;
    include?: Prisma.PostTagInclude<ExtArgs> | null;
    where?: Prisma.PostTagWhereInput;
    orderBy?: Prisma.PostTagOrderByWithRelationInput | Prisma.PostTagOrderByWithRelationInput[];
    cursor?: Prisma.PostTagWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostTagScalarFieldEnum | Prisma.PostTagScalarFieldEnum[];
};
export type Tag$filesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TagDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TagSelect<ExtArgs> | null;
    omit?: Prisma.TagOmit<ExtArgs> | null;
    include?: Prisma.TagInclude<ExtArgs> | null;
};
