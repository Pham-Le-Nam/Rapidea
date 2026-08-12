import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PostModel = runtime.Types.Result.DefaultSelection<Prisma.$PostPayload>;
export type AggregatePost = {
    _count: PostCountAggregateOutputType | null;
    _avg: PostAvgAggregateOutputType | null;
    _sum: PostSumAggregateOutputType | null;
    _min: PostMinAggregateOutputType | null;
    _max: PostMaxAggregateOutputType | null;
};
export type PostAvgAggregateOutputType = {
    ratingCount: number | null;
    ratingTotal: number | null;
    rating: number | null;
};
export type PostSumAggregateOutputType = {
    ratingCount: number | null;
    ratingTotal: number | null;
    rating: number | null;
};
export type PostMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    userId: string | null;
    courseId: string | null;
    isPreview: boolean | null;
    ratingCount: number | null;
    ratingTotal: number | null;
    rating: number | null;
    createdAt: Date | null;
    lastUpdated: Date | null;
};
export type PostMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    userId: string | null;
    courseId: string | null;
    isPreview: boolean | null;
    ratingCount: number | null;
    ratingTotal: number | null;
    rating: number | null;
    createdAt: Date | null;
    lastUpdated: Date | null;
};
export type PostCountAggregateOutputType = {
    id: number;
    title: number;
    content: number;
    userId: number;
    courseId: number;
    isPreview: number;
    ratingCount: number;
    ratingTotal: number;
    rating: number;
    createdAt: number;
    lastUpdated: number;
    _all: number;
};
export type PostAvgAggregateInputType = {
    ratingCount?: true;
    ratingTotal?: true;
    rating?: true;
};
export type PostSumAggregateInputType = {
    ratingCount?: true;
    ratingTotal?: true;
    rating?: true;
};
export type PostMinAggregateInputType = {
    id?: true;
    title?: true;
    userId?: true;
    courseId?: true;
    isPreview?: true;
    ratingCount?: true;
    ratingTotal?: true;
    rating?: true;
    createdAt?: true;
    lastUpdated?: true;
};
export type PostMaxAggregateInputType = {
    id?: true;
    title?: true;
    userId?: true;
    courseId?: true;
    isPreview?: true;
    ratingCount?: true;
    ratingTotal?: true;
    rating?: true;
    createdAt?: true;
    lastUpdated?: true;
};
export type PostCountAggregateInputType = {
    id?: true;
    title?: true;
    content?: true;
    userId?: true;
    courseId?: true;
    isPreview?: true;
    ratingCount?: true;
    ratingTotal?: true;
    rating?: true;
    createdAt?: true;
    lastUpdated?: true;
    _all?: true;
};
export type PostAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];
    cursor?: Prisma.PostWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PostCountAggregateInputType;
    _avg?: PostAvgAggregateInputType;
    _sum?: PostSumAggregateInputType;
    _min?: PostMinAggregateInputType;
    _max?: PostMaxAggregateInputType;
};
export type GetPostAggregateType<T extends PostAggregateArgs> = {
    [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePost[P]> : Prisma.GetScalarType<T[P], AggregatePost[P]>;
};
export type PostGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithAggregationInput | Prisma.PostOrderByWithAggregationInput[];
    by: Prisma.PostScalarFieldEnum[] | Prisma.PostScalarFieldEnum;
    having?: Prisma.PostScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PostCountAggregateInputType | true;
    _avg?: PostAvgAggregateInputType;
    _sum?: PostSumAggregateInputType;
    _min?: PostMinAggregateInputType;
    _max?: PostMaxAggregateInputType;
};
export type PostGroupByOutputType = {
    id: string;
    title: string | null;
    content: runtime.JsonValue | null;
    userId: string;
    courseId: string | null;
    isPreview: boolean;
    ratingCount: number;
    ratingTotal: number;
    rating: number;
    createdAt: Date;
    lastUpdated: Date;
    _count: PostCountAggregateOutputType | null;
    _avg: PostAvgAggregateOutputType | null;
    _sum: PostSumAggregateOutputType | null;
    _min: PostMinAggregateOutputType | null;
    _max: PostMaxAggregateOutputType | null;
};
export type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PostGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PostGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PostGroupByOutputType[P]>;
}>>;
export type PostWhereInput = {
    AND?: Prisma.PostWhereInput | Prisma.PostWhereInput[];
    OR?: Prisma.PostWhereInput[];
    NOT?: Prisma.PostWhereInput | Prisma.PostWhereInput[];
    id?: Prisma.StringFilter<"Post"> | string;
    title?: Prisma.StringNullableFilter<"Post"> | string | null;
    content?: Prisma.JsonNullableFilter<"Post">;
    userId?: Prisma.StringFilter<"Post"> | string;
    courseId?: Prisma.StringNullableFilter<"Post"> | string | null;
    isPreview?: Prisma.BoolFilter<"Post"> | boolean;
    ratingCount?: Prisma.IntFilter<"Post"> | number;
    ratingTotal?: Prisma.FloatFilter<"Post"> | number;
    rating?: Prisma.FloatFilter<"Post"> | number;
    createdAt?: Prisma.DateTimeFilter<"Post"> | Date | string;
    lastUpdated?: Prisma.DateTimeFilter<"Post"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    course?: Prisma.XOR<Prisma.CourseNullableScalarRelationFilter, Prisma.CourseWhereInput> | null;
    discussions?: Prisma.DiscussionListRelationFilter;
    ratePosts?: Prisma.RatePostListRelationFilter;
    files?: Prisma.FileInPostListRelationFilter;
    recentViews?: Prisma.RecentPostViewListRelationFilter;
    tags?: Prisma.PostTagListRelationFilter;
};
export type PostOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrderInput | Prisma.SortOrder;
    isPreview?: Prisma.SortOrder;
    ratingCount?: Prisma.SortOrder;
    ratingTotal?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    lastUpdated?: Prisma.SortOrder;
    user?: Prisma.UsersOrderByWithRelationInput;
    course?: Prisma.CourseOrderByWithRelationInput;
    discussions?: Prisma.DiscussionOrderByRelationAggregateInput;
    ratePosts?: Prisma.RatePostOrderByRelationAggregateInput;
    files?: Prisma.FileInPostOrderByRelationAggregateInput;
    recentViews?: Prisma.RecentPostViewOrderByRelationAggregateInput;
    tags?: Prisma.PostTagOrderByRelationAggregateInput;
};
export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PostWhereInput | Prisma.PostWhereInput[];
    OR?: Prisma.PostWhereInput[];
    NOT?: Prisma.PostWhereInput | Prisma.PostWhereInput[];
    title?: Prisma.StringNullableFilter<"Post"> | string | null;
    content?: Prisma.JsonNullableFilter<"Post">;
    userId?: Prisma.StringFilter<"Post"> | string;
    courseId?: Prisma.StringNullableFilter<"Post"> | string | null;
    isPreview?: Prisma.BoolFilter<"Post"> | boolean;
    ratingCount?: Prisma.IntFilter<"Post"> | number;
    ratingTotal?: Prisma.FloatFilter<"Post"> | number;
    rating?: Prisma.FloatFilter<"Post"> | number;
    createdAt?: Prisma.DateTimeFilter<"Post"> | Date | string;
    lastUpdated?: Prisma.DateTimeFilter<"Post"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    course?: Prisma.XOR<Prisma.CourseNullableScalarRelationFilter, Prisma.CourseWhereInput> | null;
    discussions?: Prisma.DiscussionListRelationFilter;
    ratePosts?: Prisma.RatePostListRelationFilter;
    files?: Prisma.FileInPostListRelationFilter;
    recentViews?: Prisma.RecentPostViewListRelationFilter;
    tags?: Prisma.PostTagListRelationFilter;
}, "id">;
export type PostOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrderInput | Prisma.SortOrder;
    isPreview?: Prisma.SortOrder;
    ratingCount?: Prisma.SortOrder;
    ratingTotal?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    lastUpdated?: Prisma.SortOrder;
    _count?: Prisma.PostCountOrderByAggregateInput;
    _avg?: Prisma.PostAvgOrderByAggregateInput;
    _max?: Prisma.PostMaxOrderByAggregateInput;
    _min?: Prisma.PostMinOrderByAggregateInput;
    _sum?: Prisma.PostSumOrderByAggregateInput;
};
export type PostScalarWhereWithAggregatesInput = {
    AND?: Prisma.PostScalarWhereWithAggregatesInput | Prisma.PostScalarWhereWithAggregatesInput[];
    OR?: Prisma.PostScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PostScalarWhereWithAggregatesInput | Prisma.PostScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Post"> | string;
    title?: Prisma.StringNullableWithAggregatesFilter<"Post"> | string | null;
    content?: Prisma.JsonNullableWithAggregatesFilter<"Post">;
    userId?: Prisma.StringWithAggregatesFilter<"Post"> | string;
    courseId?: Prisma.StringNullableWithAggregatesFilter<"Post"> | string | null;
    isPreview?: Prisma.BoolWithAggregatesFilter<"Post"> | boolean;
    ratingCount?: Prisma.IntWithAggregatesFilter<"Post"> | number;
    ratingTotal?: Prisma.FloatWithAggregatesFilter<"Post"> | number;
    rating?: Prisma.FloatWithAggregatesFilter<"Post"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Post"> | Date | string;
    lastUpdated?: Prisma.DateTimeWithAggregatesFilter<"Post"> | Date | string;
};
export type PostCreateInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutPostsInput;
    course?: Prisma.CourseCreateNestedOneWithoutPostsInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutPostInput;
    ratePosts?: Prisma.RatePostCreateNestedManyWithoutPostInput;
    files?: Prisma.FileInPostCreateNestedManyWithoutPostInput;
    recentViews?: Prisma.RecentPostViewCreateNestedManyWithoutPostInput;
    tags?: Prisma.PostTagCreateNestedManyWithoutPostInput;
};
export type PostUncheckedCreateInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId: string;
    courseId?: string | null;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutPostInput;
    ratePosts?: Prisma.RatePostUncheckedCreateNestedManyWithoutPostInput;
    files?: Prisma.FileInPostUncheckedCreateNestedManyWithoutPostInput;
    recentViews?: Prisma.RecentPostViewUncheckedCreateNestedManyWithoutPostInput;
    tags?: Prisma.PostTagUncheckedCreateNestedManyWithoutPostInput;
};
export type PostUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutPostsNestedInput;
    course?: Prisma.CourseUpdateOneWithoutPostsNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutPostNestedInput;
    ratePosts?: Prisma.RatePostUpdateManyWithoutPostNestedInput;
    files?: Prisma.FileInPostUpdateManyWithoutPostNestedInput;
    recentViews?: Prisma.RecentPostViewUpdateManyWithoutPostNestedInput;
    tags?: Prisma.PostTagUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutPostNestedInput;
    ratePosts?: Prisma.RatePostUncheckedUpdateManyWithoutPostNestedInput;
    files?: Prisma.FileInPostUncheckedUpdateManyWithoutPostNestedInput;
    recentViews?: Prisma.RecentPostViewUncheckedUpdateManyWithoutPostNestedInput;
    tags?: Prisma.PostTagUncheckedUpdateManyWithoutPostNestedInput;
};
export type PostCreateManyInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId: string;
    courseId?: string | null;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
};
export type PostUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostListRelationFilter = {
    every?: Prisma.PostWhereInput;
    some?: Prisma.PostWhereInput;
    none?: Prisma.PostWhereInput;
};
export type PostOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PostCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    isPreview?: Prisma.SortOrder;
    ratingCount?: Prisma.SortOrder;
    ratingTotal?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    lastUpdated?: Prisma.SortOrder;
};
export type PostAvgOrderByAggregateInput = {
    ratingCount?: Prisma.SortOrder;
    ratingTotal?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
};
export type PostMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    isPreview?: Prisma.SortOrder;
    ratingCount?: Prisma.SortOrder;
    ratingTotal?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    lastUpdated?: Prisma.SortOrder;
};
export type PostMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    courseId?: Prisma.SortOrder;
    isPreview?: Prisma.SortOrder;
    ratingCount?: Prisma.SortOrder;
    ratingTotal?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    lastUpdated?: Prisma.SortOrder;
};
export type PostSumOrderByAggregateInput = {
    ratingCount?: Prisma.SortOrder;
    ratingTotal?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
};
export type PostScalarRelationFilter = {
    is?: Prisma.PostWhereInput;
    isNot?: Prisma.PostWhereInput;
};
export type PostCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutUserInput, Prisma.PostUncheckedCreateWithoutUserInput> | Prisma.PostCreateWithoutUserInput[] | Prisma.PostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutUserInput | Prisma.PostCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PostCreateManyUserInputEnvelope;
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
};
export type PostUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutUserInput, Prisma.PostUncheckedCreateWithoutUserInput> | Prisma.PostCreateWithoutUserInput[] | Prisma.PostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutUserInput | Prisma.PostCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PostCreateManyUserInputEnvelope;
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
};
export type PostUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutUserInput, Prisma.PostUncheckedCreateWithoutUserInput> | Prisma.PostCreateWithoutUserInput[] | Prisma.PostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutUserInput | Prisma.PostCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PostUpsertWithWhereUniqueWithoutUserInput | Prisma.PostUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PostCreateManyUserInputEnvelope;
    set?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    disconnect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    delete?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    update?: Prisma.PostUpdateWithWhereUniqueWithoutUserInput | Prisma.PostUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PostUpdateManyWithWhereWithoutUserInput | Prisma.PostUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
};
export type PostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutUserInput, Prisma.PostUncheckedCreateWithoutUserInput> | Prisma.PostCreateWithoutUserInput[] | Prisma.PostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutUserInput | Prisma.PostCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PostUpsertWithWhereUniqueWithoutUserInput | Prisma.PostUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PostCreateManyUserInputEnvelope;
    set?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    disconnect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    delete?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    update?: Prisma.PostUpdateWithWhereUniqueWithoutUserInput | Prisma.PostUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PostUpdateManyWithWhereWithoutUserInput | Prisma.PostUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
};
export type PostCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutCourseInput, Prisma.PostUncheckedCreateWithoutCourseInput> | Prisma.PostCreateWithoutCourseInput[] | Prisma.PostUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutCourseInput | Prisma.PostCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.PostCreateManyCourseInputEnvelope;
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
};
export type PostUncheckedCreateNestedManyWithoutCourseInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutCourseInput, Prisma.PostUncheckedCreateWithoutCourseInput> | Prisma.PostCreateWithoutCourseInput[] | Prisma.PostUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutCourseInput | Prisma.PostCreateOrConnectWithoutCourseInput[];
    createMany?: Prisma.PostCreateManyCourseInputEnvelope;
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
};
export type PostUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutCourseInput, Prisma.PostUncheckedCreateWithoutCourseInput> | Prisma.PostCreateWithoutCourseInput[] | Prisma.PostUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutCourseInput | Prisma.PostCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.PostUpsertWithWhereUniqueWithoutCourseInput | Prisma.PostUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.PostCreateManyCourseInputEnvelope;
    set?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    disconnect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    delete?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    update?: Prisma.PostUpdateWithWhereUniqueWithoutCourseInput | Prisma.PostUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.PostUpdateManyWithWhereWithoutCourseInput | Prisma.PostUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
};
export type PostUncheckedUpdateManyWithoutCourseNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutCourseInput, Prisma.PostUncheckedCreateWithoutCourseInput> | Prisma.PostCreateWithoutCourseInput[] | Prisma.PostUncheckedCreateWithoutCourseInput[];
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutCourseInput | Prisma.PostCreateOrConnectWithoutCourseInput[];
    upsert?: Prisma.PostUpsertWithWhereUniqueWithoutCourseInput | Prisma.PostUpsertWithWhereUniqueWithoutCourseInput[];
    createMany?: Prisma.PostCreateManyCourseInputEnvelope;
    set?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    disconnect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    delete?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    connect?: Prisma.PostWhereUniqueInput | Prisma.PostWhereUniqueInput[];
    update?: Prisma.PostUpdateWithWhereUniqueWithoutCourseInput | Prisma.PostUpdateWithWhereUniqueWithoutCourseInput[];
    updateMany?: Prisma.PostUpdateManyWithWhereWithoutCourseInput | Prisma.PostUpdateManyWithWhereWithoutCourseInput[];
    deleteMany?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
};
export type PostCreateNestedOneWithoutRecentViewsInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutRecentViewsInput, Prisma.PostUncheckedCreateWithoutRecentViewsInput>;
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutRecentViewsInput;
    connect?: Prisma.PostWhereUniqueInput;
};
export type PostUpdateOneRequiredWithoutRecentViewsNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutRecentViewsInput, Prisma.PostUncheckedCreateWithoutRecentViewsInput>;
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutRecentViewsInput;
    upsert?: Prisma.PostUpsertWithoutRecentViewsInput;
    connect?: Prisma.PostWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PostUpdateToOneWithWhereWithoutRecentViewsInput, Prisma.PostUpdateWithoutRecentViewsInput>, Prisma.PostUncheckedUpdateWithoutRecentViewsInput>;
};
export type PostCreateNestedOneWithoutRatePostsInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutRatePostsInput, Prisma.PostUncheckedCreateWithoutRatePostsInput>;
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutRatePostsInput;
    connect?: Prisma.PostWhereUniqueInput;
};
export type PostUpdateOneRequiredWithoutRatePostsNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutRatePostsInput, Prisma.PostUncheckedCreateWithoutRatePostsInput>;
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutRatePostsInput;
    upsert?: Prisma.PostUpsertWithoutRatePostsInput;
    connect?: Prisma.PostWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PostUpdateToOneWithWhereWithoutRatePostsInput, Prisma.PostUpdateWithoutRatePostsInput>, Prisma.PostUncheckedUpdateWithoutRatePostsInput>;
};
export type PostCreateNestedOneWithoutDiscussionsInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutDiscussionsInput, Prisma.PostUncheckedCreateWithoutDiscussionsInput>;
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutDiscussionsInput;
    connect?: Prisma.PostWhereUniqueInput;
};
export type PostUpdateOneRequiredWithoutDiscussionsNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutDiscussionsInput, Prisma.PostUncheckedCreateWithoutDiscussionsInput>;
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutDiscussionsInput;
    upsert?: Prisma.PostUpsertWithoutDiscussionsInput;
    connect?: Prisma.PostWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PostUpdateToOneWithWhereWithoutDiscussionsInput, Prisma.PostUpdateWithoutDiscussionsInput>, Prisma.PostUncheckedUpdateWithoutDiscussionsInput>;
};
export type PostCreateNestedOneWithoutTagsInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutTagsInput, Prisma.PostUncheckedCreateWithoutTagsInput>;
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutTagsInput;
    connect?: Prisma.PostWhereUniqueInput;
};
export type PostUpdateOneRequiredWithoutTagsNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutTagsInput, Prisma.PostUncheckedCreateWithoutTagsInput>;
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutTagsInput;
    upsert?: Prisma.PostUpsertWithoutTagsInput;
    connect?: Prisma.PostWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PostUpdateToOneWithWhereWithoutTagsInput, Prisma.PostUpdateWithoutTagsInput>, Prisma.PostUncheckedUpdateWithoutTagsInput>;
};
export type PostCreateNestedOneWithoutFilesInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutFilesInput, Prisma.PostUncheckedCreateWithoutFilesInput>;
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutFilesInput;
    connect?: Prisma.PostWhereUniqueInput;
};
export type PostUpdateOneRequiredWithoutFilesNestedInput = {
    create?: Prisma.XOR<Prisma.PostCreateWithoutFilesInput, Prisma.PostUncheckedCreateWithoutFilesInput>;
    connectOrCreate?: Prisma.PostCreateOrConnectWithoutFilesInput;
    upsert?: Prisma.PostUpsertWithoutFilesInput;
    connect?: Prisma.PostWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PostUpdateToOneWithWhereWithoutFilesInput, Prisma.PostUpdateWithoutFilesInput>, Prisma.PostUncheckedUpdateWithoutFilesInput>;
};
export type PostCreateWithoutUserInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    course?: Prisma.CourseCreateNestedOneWithoutPostsInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutPostInput;
    ratePosts?: Prisma.RatePostCreateNestedManyWithoutPostInput;
    files?: Prisma.FileInPostCreateNestedManyWithoutPostInput;
    recentViews?: Prisma.RecentPostViewCreateNestedManyWithoutPostInput;
    tags?: Prisma.PostTagCreateNestedManyWithoutPostInput;
};
export type PostUncheckedCreateWithoutUserInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    courseId?: string | null;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutPostInput;
    ratePosts?: Prisma.RatePostUncheckedCreateNestedManyWithoutPostInput;
    files?: Prisma.FileInPostUncheckedCreateNestedManyWithoutPostInput;
    recentViews?: Prisma.RecentPostViewUncheckedCreateNestedManyWithoutPostInput;
    tags?: Prisma.PostTagUncheckedCreateNestedManyWithoutPostInput;
};
export type PostCreateOrConnectWithoutUserInput = {
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateWithoutUserInput, Prisma.PostUncheckedCreateWithoutUserInput>;
};
export type PostCreateManyUserInputEnvelope = {
    data: Prisma.PostCreateManyUserInput | Prisma.PostCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PostUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PostWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostUpdateWithoutUserInput, Prisma.PostUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PostCreateWithoutUserInput, Prisma.PostUncheckedCreateWithoutUserInput>;
};
export type PostUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostUpdateWithoutUserInput, Prisma.PostUncheckedUpdateWithoutUserInput>;
};
export type PostUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PostScalarWhereInput;
    data: Prisma.XOR<Prisma.PostUpdateManyMutationInput, Prisma.PostUncheckedUpdateManyWithoutUserInput>;
};
export type PostScalarWhereInput = {
    AND?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
    OR?: Prisma.PostScalarWhereInput[];
    NOT?: Prisma.PostScalarWhereInput | Prisma.PostScalarWhereInput[];
    id?: Prisma.StringFilter<"Post"> | string;
    title?: Prisma.StringNullableFilter<"Post"> | string | null;
    content?: Prisma.JsonNullableFilter<"Post">;
    userId?: Prisma.StringFilter<"Post"> | string;
    courseId?: Prisma.StringNullableFilter<"Post"> | string | null;
    isPreview?: Prisma.BoolFilter<"Post"> | boolean;
    ratingCount?: Prisma.IntFilter<"Post"> | number;
    ratingTotal?: Prisma.FloatFilter<"Post"> | number;
    rating?: Prisma.FloatFilter<"Post"> | number;
    createdAt?: Prisma.DateTimeFilter<"Post"> | Date | string;
    lastUpdated?: Prisma.DateTimeFilter<"Post"> | Date | string;
};
export type PostCreateWithoutCourseInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutPostsInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutPostInput;
    ratePosts?: Prisma.RatePostCreateNestedManyWithoutPostInput;
    files?: Prisma.FileInPostCreateNestedManyWithoutPostInput;
    recentViews?: Prisma.RecentPostViewCreateNestedManyWithoutPostInput;
    tags?: Prisma.PostTagCreateNestedManyWithoutPostInput;
};
export type PostUncheckedCreateWithoutCourseInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId: string;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutPostInput;
    ratePosts?: Prisma.RatePostUncheckedCreateNestedManyWithoutPostInput;
    files?: Prisma.FileInPostUncheckedCreateNestedManyWithoutPostInput;
    recentViews?: Prisma.RecentPostViewUncheckedCreateNestedManyWithoutPostInput;
    tags?: Prisma.PostTagUncheckedCreateNestedManyWithoutPostInput;
};
export type PostCreateOrConnectWithoutCourseInput = {
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateWithoutCourseInput, Prisma.PostUncheckedCreateWithoutCourseInput>;
};
export type PostCreateManyCourseInputEnvelope = {
    data: Prisma.PostCreateManyCourseInput | Prisma.PostCreateManyCourseInput[];
    skipDuplicates?: boolean;
};
export type PostUpsertWithWhereUniqueWithoutCourseInput = {
    where: Prisma.PostWhereUniqueInput;
    update: Prisma.XOR<Prisma.PostUpdateWithoutCourseInput, Prisma.PostUncheckedUpdateWithoutCourseInput>;
    create: Prisma.XOR<Prisma.PostCreateWithoutCourseInput, Prisma.PostUncheckedCreateWithoutCourseInput>;
};
export type PostUpdateWithWhereUniqueWithoutCourseInput = {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.XOR<Prisma.PostUpdateWithoutCourseInput, Prisma.PostUncheckedUpdateWithoutCourseInput>;
};
export type PostUpdateManyWithWhereWithoutCourseInput = {
    where: Prisma.PostScalarWhereInput;
    data: Prisma.XOR<Prisma.PostUpdateManyMutationInput, Prisma.PostUncheckedUpdateManyWithoutCourseInput>;
};
export type PostCreateWithoutRecentViewsInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutPostsInput;
    course?: Prisma.CourseCreateNestedOneWithoutPostsInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutPostInput;
    ratePosts?: Prisma.RatePostCreateNestedManyWithoutPostInput;
    files?: Prisma.FileInPostCreateNestedManyWithoutPostInput;
    tags?: Prisma.PostTagCreateNestedManyWithoutPostInput;
};
export type PostUncheckedCreateWithoutRecentViewsInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId: string;
    courseId?: string | null;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutPostInput;
    ratePosts?: Prisma.RatePostUncheckedCreateNestedManyWithoutPostInput;
    files?: Prisma.FileInPostUncheckedCreateNestedManyWithoutPostInput;
    tags?: Prisma.PostTagUncheckedCreateNestedManyWithoutPostInput;
};
export type PostCreateOrConnectWithoutRecentViewsInput = {
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateWithoutRecentViewsInput, Prisma.PostUncheckedCreateWithoutRecentViewsInput>;
};
export type PostUpsertWithoutRecentViewsInput = {
    update: Prisma.XOR<Prisma.PostUpdateWithoutRecentViewsInput, Prisma.PostUncheckedUpdateWithoutRecentViewsInput>;
    create: Prisma.XOR<Prisma.PostCreateWithoutRecentViewsInput, Prisma.PostUncheckedCreateWithoutRecentViewsInput>;
    where?: Prisma.PostWhereInput;
};
export type PostUpdateToOneWithWhereWithoutRecentViewsInput = {
    where?: Prisma.PostWhereInput;
    data: Prisma.XOR<Prisma.PostUpdateWithoutRecentViewsInput, Prisma.PostUncheckedUpdateWithoutRecentViewsInput>;
};
export type PostUpdateWithoutRecentViewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutPostsNestedInput;
    course?: Prisma.CourseUpdateOneWithoutPostsNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutPostNestedInput;
    ratePosts?: Prisma.RatePostUpdateManyWithoutPostNestedInput;
    files?: Prisma.FileInPostUpdateManyWithoutPostNestedInput;
    tags?: Prisma.PostTagUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateWithoutRecentViewsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutPostNestedInput;
    ratePosts?: Prisma.RatePostUncheckedUpdateManyWithoutPostNestedInput;
    files?: Prisma.FileInPostUncheckedUpdateManyWithoutPostNestedInput;
    tags?: Prisma.PostTagUncheckedUpdateManyWithoutPostNestedInput;
};
export type PostCreateWithoutRatePostsInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutPostsInput;
    course?: Prisma.CourseCreateNestedOneWithoutPostsInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutPostInput;
    files?: Prisma.FileInPostCreateNestedManyWithoutPostInput;
    recentViews?: Prisma.RecentPostViewCreateNestedManyWithoutPostInput;
    tags?: Prisma.PostTagCreateNestedManyWithoutPostInput;
};
export type PostUncheckedCreateWithoutRatePostsInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId: string;
    courseId?: string | null;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutPostInput;
    files?: Prisma.FileInPostUncheckedCreateNestedManyWithoutPostInput;
    recentViews?: Prisma.RecentPostViewUncheckedCreateNestedManyWithoutPostInput;
    tags?: Prisma.PostTagUncheckedCreateNestedManyWithoutPostInput;
};
export type PostCreateOrConnectWithoutRatePostsInput = {
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateWithoutRatePostsInput, Prisma.PostUncheckedCreateWithoutRatePostsInput>;
};
export type PostUpsertWithoutRatePostsInput = {
    update: Prisma.XOR<Prisma.PostUpdateWithoutRatePostsInput, Prisma.PostUncheckedUpdateWithoutRatePostsInput>;
    create: Prisma.XOR<Prisma.PostCreateWithoutRatePostsInput, Prisma.PostUncheckedCreateWithoutRatePostsInput>;
    where?: Prisma.PostWhereInput;
};
export type PostUpdateToOneWithWhereWithoutRatePostsInput = {
    where?: Prisma.PostWhereInput;
    data: Prisma.XOR<Prisma.PostUpdateWithoutRatePostsInput, Prisma.PostUncheckedUpdateWithoutRatePostsInput>;
};
export type PostUpdateWithoutRatePostsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutPostsNestedInput;
    course?: Prisma.CourseUpdateOneWithoutPostsNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutPostNestedInput;
    files?: Prisma.FileInPostUpdateManyWithoutPostNestedInput;
    recentViews?: Prisma.RecentPostViewUpdateManyWithoutPostNestedInput;
    tags?: Prisma.PostTagUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateWithoutRatePostsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutPostNestedInput;
    files?: Prisma.FileInPostUncheckedUpdateManyWithoutPostNestedInput;
    recentViews?: Prisma.RecentPostViewUncheckedUpdateManyWithoutPostNestedInput;
    tags?: Prisma.PostTagUncheckedUpdateManyWithoutPostNestedInput;
};
export type PostCreateWithoutDiscussionsInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutPostsInput;
    course?: Prisma.CourseCreateNestedOneWithoutPostsInput;
    ratePosts?: Prisma.RatePostCreateNestedManyWithoutPostInput;
    files?: Prisma.FileInPostCreateNestedManyWithoutPostInput;
    recentViews?: Prisma.RecentPostViewCreateNestedManyWithoutPostInput;
    tags?: Prisma.PostTagCreateNestedManyWithoutPostInput;
};
export type PostUncheckedCreateWithoutDiscussionsInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId: string;
    courseId?: string | null;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    ratePosts?: Prisma.RatePostUncheckedCreateNestedManyWithoutPostInput;
    files?: Prisma.FileInPostUncheckedCreateNestedManyWithoutPostInput;
    recentViews?: Prisma.RecentPostViewUncheckedCreateNestedManyWithoutPostInput;
    tags?: Prisma.PostTagUncheckedCreateNestedManyWithoutPostInput;
};
export type PostCreateOrConnectWithoutDiscussionsInput = {
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateWithoutDiscussionsInput, Prisma.PostUncheckedCreateWithoutDiscussionsInput>;
};
export type PostUpsertWithoutDiscussionsInput = {
    update: Prisma.XOR<Prisma.PostUpdateWithoutDiscussionsInput, Prisma.PostUncheckedUpdateWithoutDiscussionsInput>;
    create: Prisma.XOR<Prisma.PostCreateWithoutDiscussionsInput, Prisma.PostUncheckedCreateWithoutDiscussionsInput>;
    where?: Prisma.PostWhereInput;
};
export type PostUpdateToOneWithWhereWithoutDiscussionsInput = {
    where?: Prisma.PostWhereInput;
    data: Prisma.XOR<Prisma.PostUpdateWithoutDiscussionsInput, Prisma.PostUncheckedUpdateWithoutDiscussionsInput>;
};
export type PostUpdateWithoutDiscussionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutPostsNestedInput;
    course?: Prisma.CourseUpdateOneWithoutPostsNestedInput;
    ratePosts?: Prisma.RatePostUpdateManyWithoutPostNestedInput;
    files?: Prisma.FileInPostUpdateManyWithoutPostNestedInput;
    recentViews?: Prisma.RecentPostViewUpdateManyWithoutPostNestedInput;
    tags?: Prisma.PostTagUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateWithoutDiscussionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ratePosts?: Prisma.RatePostUncheckedUpdateManyWithoutPostNestedInput;
    files?: Prisma.FileInPostUncheckedUpdateManyWithoutPostNestedInput;
    recentViews?: Prisma.RecentPostViewUncheckedUpdateManyWithoutPostNestedInput;
    tags?: Prisma.PostTagUncheckedUpdateManyWithoutPostNestedInput;
};
export type PostCreateWithoutTagsInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutPostsInput;
    course?: Prisma.CourseCreateNestedOneWithoutPostsInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutPostInput;
    ratePosts?: Prisma.RatePostCreateNestedManyWithoutPostInput;
    files?: Prisma.FileInPostCreateNestedManyWithoutPostInput;
    recentViews?: Prisma.RecentPostViewCreateNestedManyWithoutPostInput;
};
export type PostUncheckedCreateWithoutTagsInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId: string;
    courseId?: string | null;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutPostInput;
    ratePosts?: Prisma.RatePostUncheckedCreateNestedManyWithoutPostInput;
    files?: Prisma.FileInPostUncheckedCreateNestedManyWithoutPostInput;
    recentViews?: Prisma.RecentPostViewUncheckedCreateNestedManyWithoutPostInput;
};
export type PostCreateOrConnectWithoutTagsInput = {
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateWithoutTagsInput, Prisma.PostUncheckedCreateWithoutTagsInput>;
};
export type PostUpsertWithoutTagsInput = {
    update: Prisma.XOR<Prisma.PostUpdateWithoutTagsInput, Prisma.PostUncheckedUpdateWithoutTagsInput>;
    create: Prisma.XOR<Prisma.PostCreateWithoutTagsInput, Prisma.PostUncheckedCreateWithoutTagsInput>;
    where?: Prisma.PostWhereInput;
};
export type PostUpdateToOneWithWhereWithoutTagsInput = {
    where?: Prisma.PostWhereInput;
    data: Prisma.XOR<Prisma.PostUpdateWithoutTagsInput, Prisma.PostUncheckedUpdateWithoutTagsInput>;
};
export type PostUpdateWithoutTagsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutPostsNestedInput;
    course?: Prisma.CourseUpdateOneWithoutPostsNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutPostNestedInput;
    ratePosts?: Prisma.RatePostUpdateManyWithoutPostNestedInput;
    files?: Prisma.FileInPostUpdateManyWithoutPostNestedInput;
    recentViews?: Prisma.RecentPostViewUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateWithoutTagsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutPostNestedInput;
    ratePosts?: Prisma.RatePostUncheckedUpdateManyWithoutPostNestedInput;
    files?: Prisma.FileInPostUncheckedUpdateManyWithoutPostNestedInput;
    recentViews?: Prisma.RecentPostViewUncheckedUpdateManyWithoutPostNestedInput;
};
export type PostCreateWithoutFilesInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutPostsInput;
    course?: Prisma.CourseCreateNestedOneWithoutPostsInput;
    discussions?: Prisma.DiscussionCreateNestedManyWithoutPostInput;
    ratePosts?: Prisma.RatePostCreateNestedManyWithoutPostInput;
    recentViews?: Prisma.RecentPostViewCreateNestedManyWithoutPostInput;
    tags?: Prisma.PostTagCreateNestedManyWithoutPostInput;
};
export type PostUncheckedCreateWithoutFilesInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId: string;
    courseId?: string | null;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
    discussions?: Prisma.DiscussionUncheckedCreateNestedManyWithoutPostInput;
    ratePosts?: Prisma.RatePostUncheckedCreateNestedManyWithoutPostInput;
    recentViews?: Prisma.RecentPostViewUncheckedCreateNestedManyWithoutPostInput;
    tags?: Prisma.PostTagUncheckedCreateNestedManyWithoutPostInput;
};
export type PostCreateOrConnectWithoutFilesInput = {
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateWithoutFilesInput, Prisma.PostUncheckedCreateWithoutFilesInput>;
};
export type PostUpsertWithoutFilesInput = {
    update: Prisma.XOR<Prisma.PostUpdateWithoutFilesInput, Prisma.PostUncheckedUpdateWithoutFilesInput>;
    create: Prisma.XOR<Prisma.PostCreateWithoutFilesInput, Prisma.PostUncheckedCreateWithoutFilesInput>;
    where?: Prisma.PostWhereInput;
};
export type PostUpdateToOneWithWhereWithoutFilesInput = {
    where?: Prisma.PostWhereInput;
    data: Prisma.XOR<Prisma.PostUpdateWithoutFilesInput, Prisma.PostUncheckedUpdateWithoutFilesInput>;
};
export type PostUpdateWithoutFilesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutPostsNestedInput;
    course?: Prisma.CourseUpdateOneWithoutPostsNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutPostNestedInput;
    ratePosts?: Prisma.RatePostUpdateManyWithoutPostNestedInput;
    recentViews?: Prisma.RecentPostViewUpdateManyWithoutPostNestedInput;
    tags?: Prisma.PostTagUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateWithoutFilesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    courseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutPostNestedInput;
    ratePosts?: Prisma.RatePostUncheckedUpdateManyWithoutPostNestedInput;
    recentViews?: Prisma.RecentPostViewUncheckedUpdateManyWithoutPostNestedInput;
    tags?: Prisma.PostTagUncheckedUpdateManyWithoutPostNestedInput;
};
export type PostCreateManyUserInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    courseId?: string | null;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
};
export type PostUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    course?: Prisma.CourseUpdateOneWithoutPostsNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutPostNestedInput;
    ratePosts?: Prisma.RatePostUpdateManyWithoutPostNestedInput;
    files?: Prisma.FileInPostUpdateManyWithoutPostNestedInput;
    recentViews?: Prisma.RecentPostViewUpdateManyWithoutPostNestedInput;
    tags?: Prisma.PostTagUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    courseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutPostNestedInput;
    ratePosts?: Prisma.RatePostUncheckedUpdateManyWithoutPostNestedInput;
    files?: Prisma.FileInPostUncheckedUpdateManyWithoutPostNestedInput;
    recentViews?: Prisma.RecentPostViewUncheckedUpdateManyWithoutPostNestedInput;
    tags?: Prisma.PostTagUncheckedUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    courseId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostCreateManyCourseInput = {
    id?: string;
    title?: string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId: string;
    isPreview?: boolean;
    ratingCount?: number;
    ratingTotal?: number;
    rating?: number;
    createdAt?: Date | string;
    lastUpdated?: Date | string;
};
export type PostUpdateWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutPostsNestedInput;
    discussions?: Prisma.DiscussionUpdateManyWithoutPostNestedInput;
    ratePosts?: Prisma.RatePostUpdateManyWithoutPostNestedInput;
    files?: Prisma.FileInPostUpdateManyWithoutPostNestedInput;
    recentViews?: Prisma.RecentPostViewUpdateManyWithoutPostNestedInput;
    tags?: Prisma.PostTagUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    discussions?: Prisma.DiscussionUncheckedUpdateManyWithoutPostNestedInput;
    ratePosts?: Prisma.RatePostUncheckedUpdateManyWithoutPostNestedInput;
    files?: Prisma.FileInPostUncheckedUpdateManyWithoutPostNestedInput;
    recentViews?: Prisma.RecentPostViewUncheckedUpdateManyWithoutPostNestedInput;
    tags?: Prisma.PostTagUncheckedUpdateManyWithoutPostNestedInput;
};
export type PostUncheckedUpdateManyWithoutCourseInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isPreview?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ratingCount?: Prisma.IntFieldUpdateOperationsInput | number;
    ratingTotal?: Prisma.FloatFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lastUpdated?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PostCountOutputType = {
    discussions: number;
    ratePosts: number;
    files: number;
    recentViews: number;
    tags: number;
};
export type PostCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    discussions?: boolean | PostCountOutputTypeCountDiscussionsArgs;
    ratePosts?: boolean | PostCountOutputTypeCountRatePostsArgs;
    files?: boolean | PostCountOutputTypeCountFilesArgs;
    recentViews?: boolean | PostCountOutputTypeCountRecentViewsArgs;
    tags?: boolean | PostCountOutputTypeCountTagsArgs;
};
export type PostCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostCountOutputTypeSelect<ExtArgs> | null;
};
export type PostCountOutputTypeCountDiscussionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DiscussionWhereInput;
};
export type PostCountOutputTypeCountRatePostsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RatePostWhereInput;
};
export type PostCountOutputTypeCountFilesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FileInPostWhereInput;
};
export type PostCountOutputTypeCountRecentViewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecentPostViewWhereInput;
};
export type PostCountOutputTypeCountTagsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostTagWhereInput;
};
export type PostSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    userId?: boolean;
    courseId?: boolean;
    isPreview?: boolean;
    ratingCount?: boolean;
    ratingTotal?: boolean;
    rating?: boolean;
    createdAt?: boolean;
    lastUpdated?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.Post$courseArgs<ExtArgs>;
    discussions?: boolean | Prisma.Post$discussionsArgs<ExtArgs>;
    ratePosts?: boolean | Prisma.Post$ratePostsArgs<ExtArgs>;
    files?: boolean | Prisma.Post$filesArgs<ExtArgs>;
    recentViews?: boolean | Prisma.Post$recentViewsArgs<ExtArgs>;
    tags?: boolean | Prisma.Post$tagsArgs<ExtArgs>;
    _count?: boolean | Prisma.PostCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["post"]>;
export type PostSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    userId?: boolean;
    courseId?: boolean;
    isPreview?: boolean;
    ratingCount?: boolean;
    ratingTotal?: boolean;
    rating?: boolean;
    createdAt?: boolean;
    lastUpdated?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.Post$courseArgs<ExtArgs>;
}, ExtArgs["result"]["post"]>;
export type PostSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    content?: boolean;
    userId?: boolean;
    courseId?: boolean;
    isPreview?: boolean;
    ratingCount?: boolean;
    ratingTotal?: boolean;
    rating?: boolean;
    createdAt?: boolean;
    lastUpdated?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.Post$courseArgs<ExtArgs>;
}, ExtArgs["result"]["post"]>;
export type PostSelectScalar = {
    id?: boolean;
    title?: boolean;
    content?: boolean;
    userId?: boolean;
    courseId?: boolean;
    isPreview?: boolean;
    ratingCount?: boolean;
    ratingTotal?: boolean;
    rating?: boolean;
    createdAt?: boolean;
    lastUpdated?: boolean;
};
export type PostOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "content" | "userId" | "courseId" | "isPreview" | "ratingCount" | "ratingTotal" | "rating" | "createdAt" | "lastUpdated", ExtArgs["result"]["post"]>;
export type PostInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.Post$courseArgs<ExtArgs>;
    discussions?: boolean | Prisma.Post$discussionsArgs<ExtArgs>;
    ratePosts?: boolean | Prisma.Post$ratePostsArgs<ExtArgs>;
    files?: boolean | Prisma.Post$filesArgs<ExtArgs>;
    recentViews?: boolean | Prisma.Post$recentViewsArgs<ExtArgs>;
    tags?: boolean | Prisma.Post$tagsArgs<ExtArgs>;
    _count?: boolean | Prisma.PostCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PostIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.Post$courseArgs<ExtArgs>;
};
export type PostIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    course?: boolean | Prisma.Post$courseArgs<ExtArgs>;
};
export type $PostPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Post";
    objects: {
        user: Prisma.$UsersPayload<ExtArgs>;
        course: Prisma.$CoursePayload<ExtArgs> | null;
        discussions: Prisma.$DiscussionPayload<ExtArgs>[];
        ratePosts: Prisma.$RatePostPayload<ExtArgs>[];
        files: Prisma.$FileInPostPayload<ExtArgs>[];
        recentViews: Prisma.$RecentPostViewPayload<ExtArgs>[];
        tags: Prisma.$PostTagPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string | null;
        content: runtime.JsonValue | null;
        userId: string;
        courseId: string | null;
        isPreview: boolean;
        ratingCount: number;
        ratingTotal: number;
        rating: number;
        createdAt: Date;
        lastUpdated: Date;
    }, ExtArgs["result"]["post"]>;
    composites: {};
};
export type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PostPayload, S>;
export type PostCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PostCountAggregateInputType | true;
};
export interface PostDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Post'];
        meta: {
            name: 'Post';
        };
    };
    findUnique<T extends PostFindUniqueArgs>(args: Prisma.SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PostFindFirstArgs>(args?: Prisma.SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PostFindManyArgs>(args?: Prisma.SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PostCreateArgs>(args: Prisma.SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PostCreateManyArgs>(args?: Prisma.SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PostDeleteArgs>(args: Prisma.SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PostUpdateArgs>(args: Prisma.SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PostDeleteManyArgs>(args?: Prisma.SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PostUpdateManyArgs>(args: Prisma.SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PostUpsertArgs>(args: Prisma.SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma.Prisma__PostClient<runtime.Types.Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PostCountArgs>(args?: Prisma.Subset<T, PostCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PostCountAggregateOutputType> : number>;
    aggregate<T extends PostAggregateArgs>(args: Prisma.Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>;
    groupBy<T extends PostGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PostGroupByArgs['orderBy'];
    } : {
        orderBy?: PostGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PostFieldRefs;
}
export interface Prisma__PostClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    course<T extends Prisma.Post$courseArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Post$courseArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    discussions<T extends Prisma.Post$discussionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Post$discussionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DiscussionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    ratePosts<T extends Prisma.Post$ratePostsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Post$ratePostsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RatePostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    files<T extends Prisma.Post$filesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Post$filesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FileInPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    recentViews<T extends Prisma.Post$recentViewsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Post$recentViewsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecentPostViewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    tags<T extends Prisma.Post$tagsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Post$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PostTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PostFieldRefs {
    readonly id: Prisma.FieldRef<"Post", 'String'>;
    readonly title: Prisma.FieldRef<"Post", 'String'>;
    readonly content: Prisma.FieldRef<"Post", 'Json'>;
    readonly userId: Prisma.FieldRef<"Post", 'String'>;
    readonly courseId: Prisma.FieldRef<"Post", 'String'>;
    readonly isPreview: Prisma.FieldRef<"Post", 'Boolean'>;
    readonly ratingCount: Prisma.FieldRef<"Post", 'Int'>;
    readonly ratingTotal: Prisma.FieldRef<"Post", 'Float'>;
    readonly rating: Prisma.FieldRef<"Post", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"Post", 'DateTime'>;
    readonly lastUpdated: Prisma.FieldRef<"Post", 'DateTime'>;
}
export type PostFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where: Prisma.PostWhereUniqueInput;
};
export type PostFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where: Prisma.PostWhereUniqueInput;
};
export type PostFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];
    cursor?: Prisma.PostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostScalarFieldEnum | Prisma.PostScalarFieldEnum[];
};
export type PostFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];
    cursor?: Prisma.PostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostScalarFieldEnum | Prisma.PostScalarFieldEnum[];
};
export type PostFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput | Prisma.PostOrderByWithRelationInput[];
    cursor?: Prisma.PostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PostScalarFieldEnum | Prisma.PostScalarFieldEnum[];
};
export type PostCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostCreateInput, Prisma.PostUncheckedCreateInput>;
};
export type PostCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PostCreateManyInput | Prisma.PostCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PostCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    data: Prisma.PostCreateManyInput | Prisma.PostCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PostIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PostUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostUpdateInput, Prisma.PostUncheckedUpdateInput>;
    where: Prisma.PostWhereUniqueInput;
};
export type PostUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PostUpdateManyMutationInput, Prisma.PostUncheckedUpdateManyInput>;
    where?: Prisma.PostWhereInput;
    limit?: number;
};
export type PostUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PostUpdateManyMutationInput, Prisma.PostUncheckedUpdateManyInput>;
    where?: Prisma.PostWhereInput;
    limit?: number;
    include?: Prisma.PostIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PostUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where: Prisma.PostWhereUniqueInput;
    create: Prisma.XOR<Prisma.PostCreateInput, Prisma.PostUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PostUpdateInput, Prisma.PostUncheckedUpdateInput>;
};
export type PostDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
    where: Prisma.PostWhereUniqueInput;
};
export type PostDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PostWhereInput;
    limit?: number;
};
export type Post$courseArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseSelect<ExtArgs> | null;
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    include?: Prisma.CourseInclude<ExtArgs> | null;
    where?: Prisma.CourseWhereInput;
};
export type Post$discussionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.DiscussionSelect<ExtArgs> | null;
    omit?: Prisma.DiscussionOmit<ExtArgs> | null;
    include?: Prisma.DiscussionInclude<ExtArgs> | null;
    where?: Prisma.DiscussionWhereInput;
    orderBy?: Prisma.DiscussionOrderByWithRelationInput | Prisma.DiscussionOrderByWithRelationInput[];
    cursor?: Prisma.DiscussionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiscussionScalarFieldEnum | Prisma.DiscussionScalarFieldEnum[];
};
export type Post$ratePostsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RatePostSelect<ExtArgs> | null;
    omit?: Prisma.RatePostOmit<ExtArgs> | null;
    include?: Prisma.RatePostInclude<ExtArgs> | null;
    where?: Prisma.RatePostWhereInput;
    orderBy?: Prisma.RatePostOrderByWithRelationInput | Prisma.RatePostOrderByWithRelationInput[];
    cursor?: Prisma.RatePostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RatePostScalarFieldEnum | Prisma.RatePostScalarFieldEnum[];
};
export type Post$filesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Post$recentViewsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecentPostViewSelect<ExtArgs> | null;
    omit?: Prisma.RecentPostViewOmit<ExtArgs> | null;
    include?: Prisma.RecentPostViewInclude<ExtArgs> | null;
    where?: Prisma.RecentPostViewWhereInput;
    orderBy?: Prisma.RecentPostViewOrderByWithRelationInput | Prisma.RecentPostViewOrderByWithRelationInput[];
    cursor?: Prisma.RecentPostViewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecentPostViewScalarFieldEnum | Prisma.RecentPostViewScalarFieldEnum[];
};
export type Post$tagsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PostDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PostSelect<ExtArgs> | null;
    omit?: Prisma.PostOmit<ExtArgs> | null;
    include?: Prisma.PostInclude<ExtArgs> | null;
};
