import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PhotoModel = runtime.Types.Result.DefaultSelection<Prisma.$PhotoPayload>;
export type AggregatePhoto = {
    _count: PhotoCountAggregateOutputType | null;
    _avg: PhotoAvgAggregateOutputType | null;
    _sum: PhotoSumAggregateOutputType | null;
    _min: PhotoMinAggregateOutputType | null;
    _max: PhotoMaxAggregateOutputType | null;
};
export type PhotoAvgAggregateOutputType = {
    id: number | null;
};
export type PhotoSumAggregateOutputType = {
    id: number | null;
};
export type PhotoMinAggregateOutputType = {
    id: number | null;
    userId: string | null;
    url: string | null;
    name: string | null;
    createdAt: Date | null;
};
export type PhotoMaxAggregateOutputType = {
    id: number | null;
    userId: string | null;
    url: string | null;
    name: string | null;
    createdAt: Date | null;
};
export type PhotoCountAggregateOutputType = {
    id: number;
    userId: number;
    url: number;
    name: number;
    createdAt: number;
    _all: number;
};
export type PhotoAvgAggregateInputType = {
    id?: true;
};
export type PhotoSumAggregateInputType = {
    id?: true;
};
export type PhotoMinAggregateInputType = {
    id?: true;
    userId?: true;
    url?: true;
    name?: true;
    createdAt?: true;
};
export type PhotoMaxAggregateInputType = {
    id?: true;
    userId?: true;
    url?: true;
    name?: true;
    createdAt?: true;
};
export type PhotoCountAggregateInputType = {
    id?: true;
    userId?: true;
    url?: true;
    name?: true;
    createdAt?: true;
    _all?: true;
};
export type PhotoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PhotoWhereInput;
    orderBy?: Prisma.PhotoOrderByWithRelationInput | Prisma.PhotoOrderByWithRelationInput[];
    cursor?: Prisma.PhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PhotoCountAggregateInputType;
    _avg?: PhotoAvgAggregateInputType;
    _sum?: PhotoSumAggregateInputType;
    _min?: PhotoMinAggregateInputType;
    _max?: PhotoMaxAggregateInputType;
};
export type GetPhotoAggregateType<T extends PhotoAggregateArgs> = {
    [P in keyof T & keyof AggregatePhoto]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePhoto[P]> : Prisma.GetScalarType<T[P], AggregatePhoto[P]>;
};
export type PhotoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PhotoWhereInput;
    orderBy?: Prisma.PhotoOrderByWithAggregationInput | Prisma.PhotoOrderByWithAggregationInput[];
    by: Prisma.PhotoScalarFieldEnum[] | Prisma.PhotoScalarFieldEnum;
    having?: Prisma.PhotoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PhotoCountAggregateInputType | true;
    _avg?: PhotoAvgAggregateInputType;
    _sum?: PhotoSumAggregateInputType;
    _min?: PhotoMinAggregateInputType;
    _max?: PhotoMaxAggregateInputType;
};
export type PhotoGroupByOutputType = {
    id: number;
    userId: string;
    url: string;
    name: string;
    createdAt: Date;
    _count: PhotoCountAggregateOutputType | null;
    _avg: PhotoAvgAggregateOutputType | null;
    _sum: PhotoSumAggregateOutputType | null;
    _min: PhotoMinAggregateOutputType | null;
    _max: PhotoMaxAggregateOutputType | null;
};
export type GetPhotoGroupByPayload<T extends PhotoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PhotoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PhotoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PhotoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PhotoGroupByOutputType[P]>;
}>>;
export type PhotoWhereInput = {
    AND?: Prisma.PhotoWhereInput | Prisma.PhotoWhereInput[];
    OR?: Prisma.PhotoWhereInput[];
    NOT?: Prisma.PhotoWhereInput | Prisma.PhotoWhereInput[];
    id?: Prisma.IntFilter<"Photo"> | number;
    userId?: Prisma.StringFilter<"Photo"> | string;
    url?: Prisma.StringFilter<"Photo"> | string;
    name?: Prisma.StringFilter<"Photo"> | string;
    createdAt?: Prisma.DateTimeFilter<"Photo"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    userAvatar?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.UsersWhereInput> | null;
    userBackground?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.UsersWhereInput> | null;
    courseThumbnail?: Prisma.XOR<Prisma.CourseNullableScalarRelationFilter, Prisma.CourseWhereInput> | null;
    experience?: Prisma.XOR<Prisma.ExperienceNullableScalarRelationFilter, Prisma.ExperienceWhereInput> | null;
    education?: Prisma.XOR<Prisma.EducationNullableScalarRelationFilter, Prisma.EducationWhereInput> | null;
    project?: Prisma.XOR<Prisma.ProjectNullableScalarRelationFilter, Prisma.ProjectWhereInput> | null;
};
export type PhotoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UsersOrderByWithRelationInput;
    userAvatar?: Prisma.UsersOrderByWithRelationInput;
    userBackground?: Prisma.UsersOrderByWithRelationInput;
    courseThumbnail?: Prisma.CourseOrderByWithRelationInput;
    experience?: Prisma.ExperienceOrderByWithRelationInput;
    education?: Prisma.EducationOrderByWithRelationInput;
    project?: Prisma.ProjectOrderByWithRelationInput;
};
export type PhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    AND?: Prisma.PhotoWhereInput | Prisma.PhotoWhereInput[];
    OR?: Prisma.PhotoWhereInput[];
    NOT?: Prisma.PhotoWhereInput | Prisma.PhotoWhereInput[];
    userId?: Prisma.StringFilter<"Photo"> | string;
    url?: Prisma.StringFilter<"Photo"> | string;
    name?: Prisma.StringFilter<"Photo"> | string;
    createdAt?: Prisma.DateTimeFilter<"Photo"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    userAvatar?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.UsersWhereInput> | null;
    userBackground?: Prisma.XOR<Prisma.UsersNullableScalarRelationFilter, Prisma.UsersWhereInput> | null;
    courseThumbnail?: Prisma.XOR<Prisma.CourseNullableScalarRelationFilter, Prisma.CourseWhereInput> | null;
    experience?: Prisma.XOR<Prisma.ExperienceNullableScalarRelationFilter, Prisma.ExperienceWhereInput> | null;
    education?: Prisma.XOR<Prisma.EducationNullableScalarRelationFilter, Prisma.EducationWhereInput> | null;
    project?: Prisma.XOR<Prisma.ProjectNullableScalarRelationFilter, Prisma.ProjectWhereInput> | null;
}, "id">;
export type PhotoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PhotoCountOrderByAggregateInput;
    _avg?: Prisma.PhotoAvgOrderByAggregateInput;
    _max?: Prisma.PhotoMaxOrderByAggregateInput;
    _min?: Prisma.PhotoMinOrderByAggregateInput;
    _sum?: Prisma.PhotoSumOrderByAggregateInput;
};
export type PhotoScalarWhereWithAggregatesInput = {
    AND?: Prisma.PhotoScalarWhereWithAggregatesInput | Prisma.PhotoScalarWhereWithAggregatesInput[];
    OR?: Prisma.PhotoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PhotoScalarWhereWithAggregatesInput | Prisma.PhotoScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Photo"> | number;
    userId?: Prisma.StringWithAggregatesFilter<"Photo"> | string;
    url?: Prisma.StringWithAggregatesFilter<"Photo"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Photo"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Photo"> | Date | string;
};
export type PhotoCreateInput = {
    url?: string;
    name: string;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutUploadedPhotosInput;
    userAvatar?: Prisma.UsersCreateNestedOneWithoutAvatarInput;
    userBackground?: Prisma.UsersCreateNestedOneWithoutBackgroundInput;
    courseThumbnail?: Prisma.CourseCreateNestedOneWithoutThumbnailInput;
    experience?: Prisma.ExperienceCreateNestedOneWithoutLogoInput;
    education?: Prisma.EducationCreateNestedOneWithoutLogoInput;
    project?: Prisma.ProjectCreateNestedOneWithoutLogoInput;
};
export type PhotoUncheckedCreateInput = {
    id?: number;
    userId: string;
    url?: string;
    name: string;
    createdAt?: Date | string;
    userAvatar?: Prisma.UsersUncheckedCreateNestedOneWithoutAvatarInput;
    userBackground?: Prisma.UsersUncheckedCreateNestedOneWithoutBackgroundInput;
    courseThumbnail?: Prisma.CourseUncheckedCreateNestedOneWithoutThumbnailInput;
    experience?: Prisma.ExperienceUncheckedCreateNestedOneWithoutLogoInput;
    education?: Prisma.EducationUncheckedCreateNestedOneWithoutLogoInput;
    project?: Prisma.ProjectUncheckedCreateNestedOneWithoutLogoInput;
};
export type PhotoUpdateInput = {
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutUploadedPhotosNestedInput;
    userAvatar?: Prisma.UsersUpdateOneWithoutAvatarNestedInput;
    userBackground?: Prisma.UsersUpdateOneWithoutBackgroundNestedInput;
    courseThumbnail?: Prisma.CourseUpdateOneWithoutThumbnailNestedInput;
    experience?: Prisma.ExperienceUpdateOneWithoutLogoNestedInput;
    education?: Prisma.EducationUpdateOneWithoutLogoNestedInput;
    project?: Prisma.ProjectUpdateOneWithoutLogoNestedInput;
};
export type PhotoUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAvatar?: Prisma.UsersUncheckedUpdateOneWithoutAvatarNestedInput;
    userBackground?: Prisma.UsersUncheckedUpdateOneWithoutBackgroundNestedInput;
    courseThumbnail?: Prisma.CourseUncheckedUpdateOneWithoutThumbnailNestedInput;
    experience?: Prisma.ExperienceUncheckedUpdateOneWithoutLogoNestedInput;
    education?: Prisma.EducationUncheckedUpdateOneWithoutLogoNestedInput;
    project?: Prisma.ProjectUncheckedUpdateOneWithoutLogoNestedInput;
};
export type PhotoCreateManyInput = {
    id?: number;
    userId: string;
    url?: string;
    name: string;
    createdAt?: Date | string;
};
export type PhotoUpdateManyMutationInput = {
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhotoUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhotoNullableScalarRelationFilter = {
    is?: Prisma.PhotoWhereInput | null;
    isNot?: Prisma.PhotoWhereInput | null;
};
export type PhotoListRelationFilter = {
    every?: Prisma.PhotoWhereInput;
    some?: Prisma.PhotoWhereInput;
    none?: Prisma.PhotoWhereInput;
};
export type PhotoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PhotoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PhotoAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type PhotoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PhotoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PhotoSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type PhotoCreateNestedOneWithoutUserAvatarInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutUserAvatarInput, Prisma.PhotoUncheckedCreateWithoutUserAvatarInput>;
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutUserAvatarInput;
    connect?: Prisma.PhotoWhereUniqueInput;
};
export type PhotoCreateNestedOneWithoutUserBackgroundInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutUserBackgroundInput, Prisma.PhotoUncheckedCreateWithoutUserBackgroundInput>;
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutUserBackgroundInput;
    connect?: Prisma.PhotoWhereUniqueInput;
};
export type PhotoCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutUserInput, Prisma.PhotoUncheckedCreateWithoutUserInput> | Prisma.PhotoCreateWithoutUserInput[] | Prisma.PhotoUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutUserInput | Prisma.PhotoCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PhotoCreateManyUserInputEnvelope;
    connect?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
};
export type PhotoUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutUserInput, Prisma.PhotoUncheckedCreateWithoutUserInput> | Prisma.PhotoCreateWithoutUserInput[] | Prisma.PhotoUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutUserInput | Prisma.PhotoCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PhotoCreateManyUserInputEnvelope;
    connect?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
};
export type PhotoUpdateOneWithoutUserAvatarNestedInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutUserAvatarInput, Prisma.PhotoUncheckedCreateWithoutUserAvatarInput>;
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutUserAvatarInput;
    upsert?: Prisma.PhotoUpsertWithoutUserAvatarInput;
    disconnect?: Prisma.PhotoWhereInput | boolean;
    delete?: Prisma.PhotoWhereInput | boolean;
    connect?: Prisma.PhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PhotoUpdateToOneWithWhereWithoutUserAvatarInput, Prisma.PhotoUpdateWithoutUserAvatarInput>, Prisma.PhotoUncheckedUpdateWithoutUserAvatarInput>;
};
export type PhotoUpdateOneWithoutUserBackgroundNestedInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutUserBackgroundInput, Prisma.PhotoUncheckedCreateWithoutUserBackgroundInput>;
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutUserBackgroundInput;
    upsert?: Prisma.PhotoUpsertWithoutUserBackgroundInput;
    disconnect?: Prisma.PhotoWhereInput | boolean;
    delete?: Prisma.PhotoWhereInput | boolean;
    connect?: Prisma.PhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PhotoUpdateToOneWithWhereWithoutUserBackgroundInput, Prisma.PhotoUpdateWithoutUserBackgroundInput>, Prisma.PhotoUncheckedUpdateWithoutUserBackgroundInput>;
};
export type PhotoUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutUserInput, Prisma.PhotoUncheckedCreateWithoutUserInput> | Prisma.PhotoCreateWithoutUserInput[] | Prisma.PhotoUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutUserInput | Prisma.PhotoCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PhotoUpsertWithWhereUniqueWithoutUserInput | Prisma.PhotoUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PhotoCreateManyUserInputEnvelope;
    set?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    disconnect?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    delete?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    connect?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    update?: Prisma.PhotoUpdateWithWhereUniqueWithoutUserInput | Prisma.PhotoUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PhotoUpdateManyWithWhereWithoutUserInput | Prisma.PhotoUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PhotoScalarWhereInput | Prisma.PhotoScalarWhereInput[];
};
export type PhotoUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutUserInput, Prisma.PhotoUncheckedCreateWithoutUserInput> | Prisma.PhotoCreateWithoutUserInput[] | Prisma.PhotoUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutUserInput | Prisma.PhotoCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PhotoUpsertWithWhereUniqueWithoutUserInput | Prisma.PhotoUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PhotoCreateManyUserInputEnvelope;
    set?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    disconnect?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    delete?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    connect?: Prisma.PhotoWhereUniqueInput | Prisma.PhotoWhereUniqueInput[];
    update?: Prisma.PhotoUpdateWithWhereUniqueWithoutUserInput | Prisma.PhotoUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PhotoUpdateManyWithWhereWithoutUserInput | Prisma.PhotoUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PhotoScalarWhereInput | Prisma.PhotoScalarWhereInput[];
};
export type PhotoCreateNestedOneWithoutCourseThumbnailInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutCourseThumbnailInput, Prisma.PhotoUncheckedCreateWithoutCourseThumbnailInput>;
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutCourseThumbnailInput;
    connect?: Prisma.PhotoWhereUniqueInput;
};
export type PhotoUpdateOneWithoutCourseThumbnailNestedInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutCourseThumbnailInput, Prisma.PhotoUncheckedCreateWithoutCourseThumbnailInput>;
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutCourseThumbnailInput;
    upsert?: Prisma.PhotoUpsertWithoutCourseThumbnailInput;
    disconnect?: Prisma.PhotoWhereInput | boolean;
    delete?: Prisma.PhotoWhereInput | boolean;
    connect?: Prisma.PhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PhotoUpdateToOneWithWhereWithoutCourseThumbnailInput, Prisma.PhotoUpdateWithoutCourseThumbnailInput>, Prisma.PhotoUncheckedUpdateWithoutCourseThumbnailInput>;
};
export type PhotoCreateNestedOneWithoutExperienceInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutExperienceInput, Prisma.PhotoUncheckedCreateWithoutExperienceInput>;
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutExperienceInput;
    connect?: Prisma.PhotoWhereUniqueInput;
};
export type PhotoUpdateOneWithoutExperienceNestedInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutExperienceInput, Prisma.PhotoUncheckedCreateWithoutExperienceInput>;
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutExperienceInput;
    upsert?: Prisma.PhotoUpsertWithoutExperienceInput;
    disconnect?: Prisma.PhotoWhereInput | boolean;
    delete?: Prisma.PhotoWhereInput | boolean;
    connect?: Prisma.PhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PhotoUpdateToOneWithWhereWithoutExperienceInput, Prisma.PhotoUpdateWithoutExperienceInput>, Prisma.PhotoUncheckedUpdateWithoutExperienceInput>;
};
export type PhotoCreateNestedOneWithoutEducationInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutEducationInput, Prisma.PhotoUncheckedCreateWithoutEducationInput>;
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutEducationInput;
    connect?: Prisma.PhotoWhereUniqueInput;
};
export type PhotoUpdateOneWithoutEducationNestedInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutEducationInput, Prisma.PhotoUncheckedCreateWithoutEducationInput>;
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutEducationInput;
    upsert?: Prisma.PhotoUpsertWithoutEducationInput;
    disconnect?: Prisma.PhotoWhereInput | boolean;
    delete?: Prisma.PhotoWhereInput | boolean;
    connect?: Prisma.PhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PhotoUpdateToOneWithWhereWithoutEducationInput, Prisma.PhotoUpdateWithoutEducationInput>, Prisma.PhotoUncheckedUpdateWithoutEducationInput>;
};
export type PhotoCreateNestedOneWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutProjectInput, Prisma.PhotoUncheckedCreateWithoutProjectInput>;
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutProjectInput;
    connect?: Prisma.PhotoWhereUniqueInput;
};
export type PhotoUpdateOneWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.PhotoCreateWithoutProjectInput, Prisma.PhotoUncheckedCreateWithoutProjectInput>;
    connectOrCreate?: Prisma.PhotoCreateOrConnectWithoutProjectInput;
    upsert?: Prisma.PhotoUpsertWithoutProjectInput;
    disconnect?: Prisma.PhotoWhereInput | boolean;
    delete?: Prisma.PhotoWhereInput | boolean;
    connect?: Prisma.PhotoWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PhotoUpdateToOneWithWhereWithoutProjectInput, Prisma.PhotoUpdateWithoutProjectInput>, Prisma.PhotoUncheckedUpdateWithoutProjectInput>;
};
export type PhotoCreateWithoutUserAvatarInput = {
    url?: string;
    name: string;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutUploadedPhotosInput;
    userBackground?: Prisma.UsersCreateNestedOneWithoutBackgroundInput;
    courseThumbnail?: Prisma.CourseCreateNestedOneWithoutThumbnailInput;
    experience?: Prisma.ExperienceCreateNestedOneWithoutLogoInput;
    education?: Prisma.EducationCreateNestedOneWithoutLogoInput;
    project?: Prisma.ProjectCreateNestedOneWithoutLogoInput;
};
export type PhotoUncheckedCreateWithoutUserAvatarInput = {
    id?: number;
    userId: string;
    url?: string;
    name: string;
    createdAt?: Date | string;
    userBackground?: Prisma.UsersUncheckedCreateNestedOneWithoutBackgroundInput;
    courseThumbnail?: Prisma.CourseUncheckedCreateNestedOneWithoutThumbnailInput;
    experience?: Prisma.ExperienceUncheckedCreateNestedOneWithoutLogoInput;
    education?: Prisma.EducationUncheckedCreateNestedOneWithoutLogoInput;
    project?: Prisma.ProjectUncheckedCreateNestedOneWithoutLogoInput;
};
export type PhotoCreateOrConnectWithoutUserAvatarInput = {
    where: Prisma.PhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutUserAvatarInput, Prisma.PhotoUncheckedCreateWithoutUserAvatarInput>;
};
export type PhotoCreateWithoutUserBackgroundInput = {
    url?: string;
    name: string;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutUploadedPhotosInput;
    userAvatar?: Prisma.UsersCreateNestedOneWithoutAvatarInput;
    courseThumbnail?: Prisma.CourseCreateNestedOneWithoutThumbnailInput;
    experience?: Prisma.ExperienceCreateNestedOneWithoutLogoInput;
    education?: Prisma.EducationCreateNestedOneWithoutLogoInput;
    project?: Prisma.ProjectCreateNestedOneWithoutLogoInput;
};
export type PhotoUncheckedCreateWithoutUserBackgroundInput = {
    id?: number;
    userId: string;
    url?: string;
    name: string;
    createdAt?: Date | string;
    userAvatar?: Prisma.UsersUncheckedCreateNestedOneWithoutAvatarInput;
    courseThumbnail?: Prisma.CourseUncheckedCreateNestedOneWithoutThumbnailInput;
    experience?: Prisma.ExperienceUncheckedCreateNestedOneWithoutLogoInput;
    education?: Prisma.EducationUncheckedCreateNestedOneWithoutLogoInput;
    project?: Prisma.ProjectUncheckedCreateNestedOneWithoutLogoInput;
};
export type PhotoCreateOrConnectWithoutUserBackgroundInput = {
    where: Prisma.PhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutUserBackgroundInput, Prisma.PhotoUncheckedCreateWithoutUserBackgroundInput>;
};
export type PhotoCreateWithoutUserInput = {
    url?: string;
    name: string;
    createdAt?: Date | string;
    userAvatar?: Prisma.UsersCreateNestedOneWithoutAvatarInput;
    userBackground?: Prisma.UsersCreateNestedOneWithoutBackgroundInput;
    courseThumbnail?: Prisma.CourseCreateNestedOneWithoutThumbnailInput;
    experience?: Prisma.ExperienceCreateNestedOneWithoutLogoInput;
    education?: Prisma.EducationCreateNestedOneWithoutLogoInput;
    project?: Prisma.ProjectCreateNestedOneWithoutLogoInput;
};
export type PhotoUncheckedCreateWithoutUserInput = {
    id?: number;
    url?: string;
    name: string;
    createdAt?: Date | string;
    userAvatar?: Prisma.UsersUncheckedCreateNestedOneWithoutAvatarInput;
    userBackground?: Prisma.UsersUncheckedCreateNestedOneWithoutBackgroundInput;
    courseThumbnail?: Prisma.CourseUncheckedCreateNestedOneWithoutThumbnailInput;
    experience?: Prisma.ExperienceUncheckedCreateNestedOneWithoutLogoInput;
    education?: Prisma.EducationUncheckedCreateNestedOneWithoutLogoInput;
    project?: Prisma.ProjectUncheckedCreateNestedOneWithoutLogoInput;
};
export type PhotoCreateOrConnectWithoutUserInput = {
    where: Prisma.PhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutUserInput, Prisma.PhotoUncheckedCreateWithoutUserInput>;
};
export type PhotoCreateManyUserInputEnvelope = {
    data: Prisma.PhotoCreateManyUserInput | Prisma.PhotoCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PhotoUpsertWithoutUserAvatarInput = {
    update: Prisma.XOR<Prisma.PhotoUpdateWithoutUserAvatarInput, Prisma.PhotoUncheckedUpdateWithoutUserAvatarInput>;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutUserAvatarInput, Prisma.PhotoUncheckedCreateWithoutUserAvatarInput>;
    where?: Prisma.PhotoWhereInput;
};
export type PhotoUpdateToOneWithWhereWithoutUserAvatarInput = {
    where?: Prisma.PhotoWhereInput;
    data: Prisma.XOR<Prisma.PhotoUpdateWithoutUserAvatarInput, Prisma.PhotoUncheckedUpdateWithoutUserAvatarInput>;
};
export type PhotoUpdateWithoutUserAvatarInput = {
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutUploadedPhotosNestedInput;
    userBackground?: Prisma.UsersUpdateOneWithoutBackgroundNestedInput;
    courseThumbnail?: Prisma.CourseUpdateOneWithoutThumbnailNestedInput;
    experience?: Prisma.ExperienceUpdateOneWithoutLogoNestedInput;
    education?: Prisma.EducationUpdateOneWithoutLogoNestedInput;
    project?: Prisma.ProjectUpdateOneWithoutLogoNestedInput;
};
export type PhotoUncheckedUpdateWithoutUserAvatarInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userBackground?: Prisma.UsersUncheckedUpdateOneWithoutBackgroundNestedInput;
    courseThumbnail?: Prisma.CourseUncheckedUpdateOneWithoutThumbnailNestedInput;
    experience?: Prisma.ExperienceUncheckedUpdateOneWithoutLogoNestedInput;
    education?: Prisma.EducationUncheckedUpdateOneWithoutLogoNestedInput;
    project?: Prisma.ProjectUncheckedUpdateOneWithoutLogoNestedInput;
};
export type PhotoUpsertWithoutUserBackgroundInput = {
    update: Prisma.XOR<Prisma.PhotoUpdateWithoutUserBackgroundInput, Prisma.PhotoUncheckedUpdateWithoutUserBackgroundInput>;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutUserBackgroundInput, Prisma.PhotoUncheckedCreateWithoutUserBackgroundInput>;
    where?: Prisma.PhotoWhereInput;
};
export type PhotoUpdateToOneWithWhereWithoutUserBackgroundInput = {
    where?: Prisma.PhotoWhereInput;
    data: Prisma.XOR<Prisma.PhotoUpdateWithoutUserBackgroundInput, Prisma.PhotoUncheckedUpdateWithoutUserBackgroundInput>;
};
export type PhotoUpdateWithoutUserBackgroundInput = {
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutUploadedPhotosNestedInput;
    userAvatar?: Prisma.UsersUpdateOneWithoutAvatarNestedInput;
    courseThumbnail?: Prisma.CourseUpdateOneWithoutThumbnailNestedInput;
    experience?: Prisma.ExperienceUpdateOneWithoutLogoNestedInput;
    education?: Prisma.EducationUpdateOneWithoutLogoNestedInput;
    project?: Prisma.ProjectUpdateOneWithoutLogoNestedInput;
};
export type PhotoUncheckedUpdateWithoutUserBackgroundInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAvatar?: Prisma.UsersUncheckedUpdateOneWithoutAvatarNestedInput;
    courseThumbnail?: Prisma.CourseUncheckedUpdateOneWithoutThumbnailNestedInput;
    experience?: Prisma.ExperienceUncheckedUpdateOneWithoutLogoNestedInput;
    education?: Prisma.EducationUncheckedUpdateOneWithoutLogoNestedInput;
    project?: Prisma.ProjectUncheckedUpdateOneWithoutLogoNestedInput;
};
export type PhotoUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PhotoWhereUniqueInput;
    update: Prisma.XOR<Prisma.PhotoUpdateWithoutUserInput, Prisma.PhotoUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutUserInput, Prisma.PhotoUncheckedCreateWithoutUserInput>;
};
export type PhotoUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PhotoWhereUniqueInput;
    data: Prisma.XOR<Prisma.PhotoUpdateWithoutUserInput, Prisma.PhotoUncheckedUpdateWithoutUserInput>;
};
export type PhotoUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PhotoScalarWhereInput;
    data: Prisma.XOR<Prisma.PhotoUpdateManyMutationInput, Prisma.PhotoUncheckedUpdateManyWithoutUserInput>;
};
export type PhotoScalarWhereInput = {
    AND?: Prisma.PhotoScalarWhereInput | Prisma.PhotoScalarWhereInput[];
    OR?: Prisma.PhotoScalarWhereInput[];
    NOT?: Prisma.PhotoScalarWhereInput | Prisma.PhotoScalarWhereInput[];
    id?: Prisma.IntFilter<"Photo"> | number;
    userId?: Prisma.StringFilter<"Photo"> | string;
    url?: Prisma.StringFilter<"Photo"> | string;
    name?: Prisma.StringFilter<"Photo"> | string;
    createdAt?: Prisma.DateTimeFilter<"Photo"> | Date | string;
};
export type PhotoCreateWithoutCourseThumbnailInput = {
    url?: string;
    name: string;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutUploadedPhotosInput;
    userAvatar?: Prisma.UsersCreateNestedOneWithoutAvatarInput;
    userBackground?: Prisma.UsersCreateNestedOneWithoutBackgroundInput;
    experience?: Prisma.ExperienceCreateNestedOneWithoutLogoInput;
    education?: Prisma.EducationCreateNestedOneWithoutLogoInput;
    project?: Prisma.ProjectCreateNestedOneWithoutLogoInput;
};
export type PhotoUncheckedCreateWithoutCourseThumbnailInput = {
    id?: number;
    userId: string;
    url?: string;
    name: string;
    createdAt?: Date | string;
    userAvatar?: Prisma.UsersUncheckedCreateNestedOneWithoutAvatarInput;
    userBackground?: Prisma.UsersUncheckedCreateNestedOneWithoutBackgroundInput;
    experience?: Prisma.ExperienceUncheckedCreateNestedOneWithoutLogoInput;
    education?: Prisma.EducationUncheckedCreateNestedOneWithoutLogoInput;
    project?: Prisma.ProjectUncheckedCreateNestedOneWithoutLogoInput;
};
export type PhotoCreateOrConnectWithoutCourseThumbnailInput = {
    where: Prisma.PhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutCourseThumbnailInput, Prisma.PhotoUncheckedCreateWithoutCourseThumbnailInput>;
};
export type PhotoUpsertWithoutCourseThumbnailInput = {
    update: Prisma.XOR<Prisma.PhotoUpdateWithoutCourseThumbnailInput, Prisma.PhotoUncheckedUpdateWithoutCourseThumbnailInput>;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutCourseThumbnailInput, Prisma.PhotoUncheckedCreateWithoutCourseThumbnailInput>;
    where?: Prisma.PhotoWhereInput;
};
export type PhotoUpdateToOneWithWhereWithoutCourseThumbnailInput = {
    where?: Prisma.PhotoWhereInput;
    data: Prisma.XOR<Prisma.PhotoUpdateWithoutCourseThumbnailInput, Prisma.PhotoUncheckedUpdateWithoutCourseThumbnailInput>;
};
export type PhotoUpdateWithoutCourseThumbnailInput = {
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutUploadedPhotosNestedInput;
    userAvatar?: Prisma.UsersUpdateOneWithoutAvatarNestedInput;
    userBackground?: Prisma.UsersUpdateOneWithoutBackgroundNestedInput;
    experience?: Prisma.ExperienceUpdateOneWithoutLogoNestedInput;
    education?: Prisma.EducationUpdateOneWithoutLogoNestedInput;
    project?: Prisma.ProjectUpdateOneWithoutLogoNestedInput;
};
export type PhotoUncheckedUpdateWithoutCourseThumbnailInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAvatar?: Prisma.UsersUncheckedUpdateOneWithoutAvatarNestedInput;
    userBackground?: Prisma.UsersUncheckedUpdateOneWithoutBackgroundNestedInput;
    experience?: Prisma.ExperienceUncheckedUpdateOneWithoutLogoNestedInput;
    education?: Prisma.EducationUncheckedUpdateOneWithoutLogoNestedInput;
    project?: Prisma.ProjectUncheckedUpdateOneWithoutLogoNestedInput;
};
export type PhotoCreateWithoutExperienceInput = {
    url?: string;
    name: string;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutUploadedPhotosInput;
    userAvatar?: Prisma.UsersCreateNestedOneWithoutAvatarInput;
    userBackground?: Prisma.UsersCreateNestedOneWithoutBackgroundInput;
    courseThumbnail?: Prisma.CourseCreateNestedOneWithoutThumbnailInput;
    education?: Prisma.EducationCreateNestedOneWithoutLogoInput;
    project?: Prisma.ProjectCreateNestedOneWithoutLogoInput;
};
export type PhotoUncheckedCreateWithoutExperienceInput = {
    id?: number;
    userId: string;
    url?: string;
    name: string;
    createdAt?: Date | string;
    userAvatar?: Prisma.UsersUncheckedCreateNestedOneWithoutAvatarInput;
    userBackground?: Prisma.UsersUncheckedCreateNestedOneWithoutBackgroundInput;
    courseThumbnail?: Prisma.CourseUncheckedCreateNestedOneWithoutThumbnailInput;
    education?: Prisma.EducationUncheckedCreateNestedOneWithoutLogoInput;
    project?: Prisma.ProjectUncheckedCreateNestedOneWithoutLogoInput;
};
export type PhotoCreateOrConnectWithoutExperienceInput = {
    where: Prisma.PhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutExperienceInput, Prisma.PhotoUncheckedCreateWithoutExperienceInput>;
};
export type PhotoUpsertWithoutExperienceInput = {
    update: Prisma.XOR<Prisma.PhotoUpdateWithoutExperienceInput, Prisma.PhotoUncheckedUpdateWithoutExperienceInput>;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutExperienceInput, Prisma.PhotoUncheckedCreateWithoutExperienceInput>;
    where?: Prisma.PhotoWhereInput;
};
export type PhotoUpdateToOneWithWhereWithoutExperienceInput = {
    where?: Prisma.PhotoWhereInput;
    data: Prisma.XOR<Prisma.PhotoUpdateWithoutExperienceInput, Prisma.PhotoUncheckedUpdateWithoutExperienceInput>;
};
export type PhotoUpdateWithoutExperienceInput = {
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutUploadedPhotosNestedInput;
    userAvatar?: Prisma.UsersUpdateOneWithoutAvatarNestedInput;
    userBackground?: Prisma.UsersUpdateOneWithoutBackgroundNestedInput;
    courseThumbnail?: Prisma.CourseUpdateOneWithoutThumbnailNestedInput;
    education?: Prisma.EducationUpdateOneWithoutLogoNestedInput;
    project?: Prisma.ProjectUpdateOneWithoutLogoNestedInput;
};
export type PhotoUncheckedUpdateWithoutExperienceInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAvatar?: Prisma.UsersUncheckedUpdateOneWithoutAvatarNestedInput;
    userBackground?: Prisma.UsersUncheckedUpdateOneWithoutBackgroundNestedInput;
    courseThumbnail?: Prisma.CourseUncheckedUpdateOneWithoutThumbnailNestedInput;
    education?: Prisma.EducationUncheckedUpdateOneWithoutLogoNestedInput;
    project?: Prisma.ProjectUncheckedUpdateOneWithoutLogoNestedInput;
};
export type PhotoCreateWithoutEducationInput = {
    url?: string;
    name: string;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutUploadedPhotosInput;
    userAvatar?: Prisma.UsersCreateNestedOneWithoutAvatarInput;
    userBackground?: Prisma.UsersCreateNestedOneWithoutBackgroundInput;
    courseThumbnail?: Prisma.CourseCreateNestedOneWithoutThumbnailInput;
    experience?: Prisma.ExperienceCreateNestedOneWithoutLogoInput;
    project?: Prisma.ProjectCreateNestedOneWithoutLogoInput;
};
export type PhotoUncheckedCreateWithoutEducationInput = {
    id?: number;
    userId: string;
    url?: string;
    name: string;
    createdAt?: Date | string;
    userAvatar?: Prisma.UsersUncheckedCreateNestedOneWithoutAvatarInput;
    userBackground?: Prisma.UsersUncheckedCreateNestedOneWithoutBackgroundInput;
    courseThumbnail?: Prisma.CourseUncheckedCreateNestedOneWithoutThumbnailInput;
    experience?: Prisma.ExperienceUncheckedCreateNestedOneWithoutLogoInput;
    project?: Prisma.ProjectUncheckedCreateNestedOneWithoutLogoInput;
};
export type PhotoCreateOrConnectWithoutEducationInput = {
    where: Prisma.PhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutEducationInput, Prisma.PhotoUncheckedCreateWithoutEducationInput>;
};
export type PhotoUpsertWithoutEducationInput = {
    update: Prisma.XOR<Prisma.PhotoUpdateWithoutEducationInput, Prisma.PhotoUncheckedUpdateWithoutEducationInput>;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutEducationInput, Prisma.PhotoUncheckedCreateWithoutEducationInput>;
    where?: Prisma.PhotoWhereInput;
};
export type PhotoUpdateToOneWithWhereWithoutEducationInput = {
    where?: Prisma.PhotoWhereInput;
    data: Prisma.XOR<Prisma.PhotoUpdateWithoutEducationInput, Prisma.PhotoUncheckedUpdateWithoutEducationInput>;
};
export type PhotoUpdateWithoutEducationInput = {
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutUploadedPhotosNestedInput;
    userAvatar?: Prisma.UsersUpdateOneWithoutAvatarNestedInput;
    userBackground?: Prisma.UsersUpdateOneWithoutBackgroundNestedInput;
    courseThumbnail?: Prisma.CourseUpdateOneWithoutThumbnailNestedInput;
    experience?: Prisma.ExperienceUpdateOneWithoutLogoNestedInput;
    project?: Prisma.ProjectUpdateOneWithoutLogoNestedInput;
};
export type PhotoUncheckedUpdateWithoutEducationInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAvatar?: Prisma.UsersUncheckedUpdateOneWithoutAvatarNestedInput;
    userBackground?: Prisma.UsersUncheckedUpdateOneWithoutBackgroundNestedInput;
    courseThumbnail?: Prisma.CourseUncheckedUpdateOneWithoutThumbnailNestedInput;
    experience?: Prisma.ExperienceUncheckedUpdateOneWithoutLogoNestedInput;
    project?: Prisma.ProjectUncheckedUpdateOneWithoutLogoNestedInput;
};
export type PhotoCreateWithoutProjectInput = {
    url?: string;
    name: string;
    createdAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutUploadedPhotosInput;
    userAvatar?: Prisma.UsersCreateNestedOneWithoutAvatarInput;
    userBackground?: Prisma.UsersCreateNestedOneWithoutBackgroundInput;
    courseThumbnail?: Prisma.CourseCreateNestedOneWithoutThumbnailInput;
    experience?: Prisma.ExperienceCreateNestedOneWithoutLogoInput;
    education?: Prisma.EducationCreateNestedOneWithoutLogoInput;
};
export type PhotoUncheckedCreateWithoutProjectInput = {
    id?: number;
    userId: string;
    url?: string;
    name: string;
    createdAt?: Date | string;
    userAvatar?: Prisma.UsersUncheckedCreateNestedOneWithoutAvatarInput;
    userBackground?: Prisma.UsersUncheckedCreateNestedOneWithoutBackgroundInput;
    courseThumbnail?: Prisma.CourseUncheckedCreateNestedOneWithoutThumbnailInput;
    experience?: Prisma.ExperienceUncheckedCreateNestedOneWithoutLogoInput;
    education?: Prisma.EducationUncheckedCreateNestedOneWithoutLogoInput;
};
export type PhotoCreateOrConnectWithoutProjectInput = {
    where: Prisma.PhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutProjectInput, Prisma.PhotoUncheckedCreateWithoutProjectInput>;
};
export type PhotoUpsertWithoutProjectInput = {
    update: Prisma.XOR<Prisma.PhotoUpdateWithoutProjectInput, Prisma.PhotoUncheckedUpdateWithoutProjectInput>;
    create: Prisma.XOR<Prisma.PhotoCreateWithoutProjectInput, Prisma.PhotoUncheckedCreateWithoutProjectInput>;
    where?: Prisma.PhotoWhereInput;
};
export type PhotoUpdateToOneWithWhereWithoutProjectInput = {
    where?: Prisma.PhotoWhereInput;
    data: Prisma.XOR<Prisma.PhotoUpdateWithoutProjectInput, Prisma.PhotoUncheckedUpdateWithoutProjectInput>;
};
export type PhotoUpdateWithoutProjectInput = {
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutUploadedPhotosNestedInput;
    userAvatar?: Prisma.UsersUpdateOneWithoutAvatarNestedInput;
    userBackground?: Prisma.UsersUpdateOneWithoutBackgroundNestedInput;
    courseThumbnail?: Prisma.CourseUpdateOneWithoutThumbnailNestedInput;
    experience?: Prisma.ExperienceUpdateOneWithoutLogoNestedInput;
    education?: Prisma.EducationUpdateOneWithoutLogoNestedInput;
};
export type PhotoUncheckedUpdateWithoutProjectInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAvatar?: Prisma.UsersUncheckedUpdateOneWithoutAvatarNestedInput;
    userBackground?: Prisma.UsersUncheckedUpdateOneWithoutBackgroundNestedInput;
    courseThumbnail?: Prisma.CourseUncheckedUpdateOneWithoutThumbnailNestedInput;
    experience?: Prisma.ExperienceUncheckedUpdateOneWithoutLogoNestedInput;
    education?: Prisma.EducationUncheckedUpdateOneWithoutLogoNestedInput;
};
export type PhotoCreateManyUserInput = {
    id?: number;
    url?: string;
    name: string;
    createdAt?: Date | string;
};
export type PhotoUpdateWithoutUserInput = {
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAvatar?: Prisma.UsersUpdateOneWithoutAvatarNestedInput;
    userBackground?: Prisma.UsersUpdateOneWithoutBackgroundNestedInput;
    courseThumbnail?: Prisma.CourseUpdateOneWithoutThumbnailNestedInput;
    experience?: Prisma.ExperienceUpdateOneWithoutLogoNestedInput;
    education?: Prisma.EducationUpdateOneWithoutLogoNestedInput;
    project?: Prisma.ProjectUpdateOneWithoutLogoNestedInput;
};
export type PhotoUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userAvatar?: Prisma.UsersUncheckedUpdateOneWithoutAvatarNestedInput;
    userBackground?: Prisma.UsersUncheckedUpdateOneWithoutBackgroundNestedInput;
    courseThumbnail?: Prisma.CourseUncheckedUpdateOneWithoutThumbnailNestedInput;
    experience?: Prisma.ExperienceUncheckedUpdateOneWithoutLogoNestedInput;
    education?: Prisma.EducationUncheckedUpdateOneWithoutLogoNestedInput;
    project?: Prisma.ProjectUncheckedUpdateOneWithoutLogoNestedInput;
};
export type PhotoUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PhotoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    url?: boolean;
    name?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    userAvatar?: boolean | Prisma.Photo$userAvatarArgs<ExtArgs>;
    userBackground?: boolean | Prisma.Photo$userBackgroundArgs<ExtArgs>;
    courseThumbnail?: boolean | Prisma.Photo$courseThumbnailArgs<ExtArgs>;
    experience?: boolean | Prisma.Photo$experienceArgs<ExtArgs>;
    education?: boolean | Prisma.Photo$educationArgs<ExtArgs>;
    project?: boolean | Prisma.Photo$projectArgs<ExtArgs>;
}, ExtArgs["result"]["photo"]>;
export type PhotoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    url?: boolean;
    name?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["photo"]>;
export type PhotoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    url?: boolean;
    name?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["photo"]>;
export type PhotoSelectScalar = {
    id?: boolean;
    userId?: boolean;
    url?: boolean;
    name?: boolean;
    createdAt?: boolean;
};
export type PhotoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "url" | "name" | "createdAt", ExtArgs["result"]["photo"]>;
export type PhotoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    userAvatar?: boolean | Prisma.Photo$userAvatarArgs<ExtArgs>;
    userBackground?: boolean | Prisma.Photo$userBackgroundArgs<ExtArgs>;
    courseThumbnail?: boolean | Prisma.Photo$courseThumbnailArgs<ExtArgs>;
    experience?: boolean | Prisma.Photo$experienceArgs<ExtArgs>;
    education?: boolean | Prisma.Photo$educationArgs<ExtArgs>;
    project?: boolean | Prisma.Photo$projectArgs<ExtArgs>;
};
export type PhotoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type PhotoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $PhotoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Photo";
    objects: {
        user: Prisma.$UsersPayload<ExtArgs>;
        userAvatar: Prisma.$UsersPayload<ExtArgs> | null;
        userBackground: Prisma.$UsersPayload<ExtArgs> | null;
        courseThumbnail: Prisma.$CoursePayload<ExtArgs> | null;
        experience: Prisma.$ExperiencePayload<ExtArgs> | null;
        education: Prisma.$EducationPayload<ExtArgs> | null;
        project: Prisma.$ProjectPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        userId: string;
        url: string;
        name: string;
        createdAt: Date;
    }, ExtArgs["result"]["photo"]>;
    composites: {};
};
export type PhotoGetPayload<S extends boolean | null | undefined | PhotoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PhotoPayload, S>;
export type PhotoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PhotoCountAggregateInputType | true;
};
export interface PhotoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Photo'];
        meta: {
            name: 'Photo';
        };
    };
    findUnique<T extends PhotoFindUniqueArgs>(args: Prisma.SelectSubset<T, PhotoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PhotoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PhotoFindFirstArgs>(args?: Prisma.SelectSubset<T, PhotoFindFirstArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PhotoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PhotoFindManyArgs>(args?: Prisma.SelectSubset<T, PhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PhotoCreateArgs>(args: Prisma.SelectSubset<T, PhotoCreateArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PhotoCreateManyArgs>(args?: Prisma.SelectSubset<T, PhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PhotoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PhotoDeleteArgs>(args: Prisma.SelectSubset<T, PhotoDeleteArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PhotoUpdateArgs>(args: Prisma.SelectSubset<T, PhotoUpdateArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PhotoDeleteManyArgs>(args?: Prisma.SelectSubset<T, PhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PhotoUpdateManyArgs>(args: Prisma.SelectSubset<T, PhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PhotoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PhotoUpsertArgs>(args: Prisma.SelectSubset<T, PhotoUpsertArgs<ExtArgs>>): Prisma.Prisma__PhotoClient<runtime.Types.Result.GetResult<Prisma.$PhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PhotoCountArgs>(args?: Prisma.Subset<T, PhotoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PhotoCountAggregateOutputType> : number>;
    aggregate<T extends PhotoAggregateArgs>(args: Prisma.Subset<T, PhotoAggregateArgs>): Prisma.PrismaPromise<GetPhotoAggregateType<T>>;
    groupBy<T extends PhotoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PhotoGroupByArgs['orderBy'];
    } : {
        orderBy?: PhotoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PhotoFieldRefs;
}
export interface Prisma__PhotoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    userAvatar<T extends Prisma.Photo$userAvatarArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Photo$userAvatarArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    userBackground<T extends Prisma.Photo$userBackgroundArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Photo$userBackgroundArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    courseThumbnail<T extends Prisma.Photo$courseThumbnailArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Photo$courseThumbnailArgs<ExtArgs>>): Prisma.Prisma__CourseClient<runtime.Types.Result.GetResult<Prisma.$CoursePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    experience<T extends Prisma.Photo$experienceArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Photo$experienceArgs<ExtArgs>>): Prisma.Prisma__ExperienceClient<runtime.Types.Result.GetResult<Prisma.$ExperiencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    education<T extends Prisma.Photo$educationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Photo$educationArgs<ExtArgs>>): Prisma.Prisma__EducationClient<runtime.Types.Result.GetResult<Prisma.$EducationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    project<T extends Prisma.Photo$projectArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Photo$projectArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PhotoFieldRefs {
    readonly id: Prisma.FieldRef<"Photo", 'Int'>;
    readonly userId: Prisma.FieldRef<"Photo", 'String'>;
    readonly url: Prisma.FieldRef<"Photo", 'String'>;
    readonly name: Prisma.FieldRef<"Photo", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Photo", 'DateTime'>;
}
export type PhotoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where: Prisma.PhotoWhereUniqueInput;
};
export type PhotoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where: Prisma.PhotoWhereUniqueInput;
};
export type PhotoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where?: Prisma.PhotoWhereInput;
    orderBy?: Prisma.PhotoOrderByWithRelationInput | Prisma.PhotoOrderByWithRelationInput[];
    cursor?: Prisma.PhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PhotoScalarFieldEnum | Prisma.PhotoScalarFieldEnum[];
};
export type PhotoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where?: Prisma.PhotoWhereInput;
    orderBy?: Prisma.PhotoOrderByWithRelationInput | Prisma.PhotoOrderByWithRelationInput[];
    cursor?: Prisma.PhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PhotoScalarFieldEnum | Prisma.PhotoScalarFieldEnum[];
};
export type PhotoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where?: Prisma.PhotoWhereInput;
    orderBy?: Prisma.PhotoOrderByWithRelationInput | Prisma.PhotoOrderByWithRelationInput[];
    cursor?: Prisma.PhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PhotoScalarFieldEnum | Prisma.PhotoScalarFieldEnum[];
};
export type PhotoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PhotoCreateInput, Prisma.PhotoUncheckedCreateInput>;
};
export type PhotoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PhotoCreateManyInput | Prisma.PhotoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PhotoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    data: Prisma.PhotoCreateManyInput | Prisma.PhotoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PhotoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PhotoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PhotoUpdateInput, Prisma.PhotoUncheckedUpdateInput>;
    where: Prisma.PhotoWhereUniqueInput;
};
export type PhotoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PhotoUpdateManyMutationInput, Prisma.PhotoUncheckedUpdateManyInput>;
    where?: Prisma.PhotoWhereInput;
    limit?: number;
};
export type PhotoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PhotoUpdateManyMutationInput, Prisma.PhotoUncheckedUpdateManyInput>;
    where?: Prisma.PhotoWhereInput;
    limit?: number;
    include?: Prisma.PhotoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PhotoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where: Prisma.PhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.PhotoCreateInput, Prisma.PhotoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PhotoUpdateInput, Prisma.PhotoUncheckedUpdateInput>;
};
export type PhotoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
    where: Prisma.PhotoWhereUniqueInput;
};
export type PhotoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PhotoWhereInput;
    limit?: number;
};
export type Photo$userAvatarArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsersSelect<ExtArgs> | null;
    omit?: Prisma.UsersOmit<ExtArgs> | null;
    include?: Prisma.UsersInclude<ExtArgs> | null;
    where?: Prisma.UsersWhereInput;
};
export type Photo$userBackgroundArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UsersSelect<ExtArgs> | null;
    omit?: Prisma.UsersOmit<ExtArgs> | null;
    include?: Prisma.UsersInclude<ExtArgs> | null;
    where?: Prisma.UsersWhereInput;
};
export type Photo$courseThumbnailArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CourseSelect<ExtArgs> | null;
    omit?: Prisma.CourseOmit<ExtArgs> | null;
    include?: Prisma.CourseInclude<ExtArgs> | null;
    where?: Prisma.CourseWhereInput;
};
export type Photo$experienceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ExperienceSelect<ExtArgs> | null;
    omit?: Prisma.ExperienceOmit<ExtArgs> | null;
    include?: Prisma.ExperienceInclude<ExtArgs> | null;
    where?: Prisma.ExperienceWhereInput;
};
export type Photo$educationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EducationSelect<ExtArgs> | null;
    omit?: Prisma.EducationOmit<ExtArgs> | null;
    include?: Prisma.EducationInclude<ExtArgs> | null;
    where?: Prisma.EducationWhereInput;
};
export type Photo$projectArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
};
export type PhotoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PhotoSelect<ExtArgs> | null;
    omit?: Prisma.PhotoOmit<ExtArgs> | null;
    include?: Prisma.PhotoInclude<ExtArgs> | null;
};
