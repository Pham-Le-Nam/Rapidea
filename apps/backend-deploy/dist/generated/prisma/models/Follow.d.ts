import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type FollowModel = runtime.Types.Result.DefaultSelection<Prisma.$FollowPayload>;
export type AggregateFollow = {
    _count: FollowCountAggregateOutputType | null;
    _min: FollowMinAggregateOutputType | null;
    _max: FollowMaxAggregateOutputType | null;
};
export type FollowMinAggregateOutputType = {
    followerId: string | null;
    followingId: string | null;
    createdAt: Date | null;
};
export type FollowMaxAggregateOutputType = {
    followerId: string | null;
    followingId: string | null;
    createdAt: Date | null;
};
export type FollowCountAggregateOutputType = {
    followerId: number;
    followingId: number;
    createdAt: number;
    _all: number;
};
export type FollowMinAggregateInputType = {
    followerId?: true;
    followingId?: true;
    createdAt?: true;
};
export type FollowMaxAggregateInputType = {
    followerId?: true;
    followingId?: true;
    createdAt?: true;
};
export type FollowCountAggregateInputType = {
    followerId?: true;
    followingId?: true;
    createdAt?: true;
    _all?: true;
};
export type FollowAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FollowWhereInput;
    orderBy?: Prisma.FollowOrderByWithRelationInput | Prisma.FollowOrderByWithRelationInput[];
    cursor?: Prisma.FollowWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FollowCountAggregateInputType;
    _min?: FollowMinAggregateInputType;
    _max?: FollowMaxAggregateInputType;
};
export type GetFollowAggregateType<T extends FollowAggregateArgs> = {
    [P in keyof T & keyof AggregateFollow]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFollow[P]> : Prisma.GetScalarType<T[P], AggregateFollow[P]>;
};
export type FollowGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FollowWhereInput;
    orderBy?: Prisma.FollowOrderByWithAggregationInput | Prisma.FollowOrderByWithAggregationInput[];
    by: Prisma.FollowScalarFieldEnum[] | Prisma.FollowScalarFieldEnum;
    having?: Prisma.FollowScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FollowCountAggregateInputType | true;
    _min?: FollowMinAggregateInputType;
    _max?: FollowMaxAggregateInputType;
};
export type FollowGroupByOutputType = {
    followerId: string;
    followingId: string;
    createdAt: Date;
    _count: FollowCountAggregateOutputType | null;
    _min: FollowMinAggregateOutputType | null;
    _max: FollowMaxAggregateOutputType | null;
};
export type GetFollowGroupByPayload<T extends FollowGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FollowGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FollowGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FollowGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FollowGroupByOutputType[P]>;
}>>;
export type FollowWhereInput = {
    AND?: Prisma.FollowWhereInput | Prisma.FollowWhereInput[];
    OR?: Prisma.FollowWhereInput[];
    NOT?: Prisma.FollowWhereInput | Prisma.FollowWhereInput[];
    followerId?: Prisma.StringFilter<"Follow"> | string;
    followingId?: Prisma.StringFilter<"Follow"> | string;
    createdAt?: Prisma.DateTimeFilter<"Follow"> | Date | string;
    follower?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    following?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
};
export type FollowOrderByWithRelationInput = {
    followerId?: Prisma.SortOrder;
    followingId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    follower?: Prisma.UsersOrderByWithRelationInput;
    following?: Prisma.UsersOrderByWithRelationInput;
};
export type FollowWhereUniqueInput = Prisma.AtLeast<{
    followerId_followingId?: Prisma.FollowFollowerIdFollowingIdCompoundUniqueInput;
    AND?: Prisma.FollowWhereInput | Prisma.FollowWhereInput[];
    OR?: Prisma.FollowWhereInput[];
    NOT?: Prisma.FollowWhereInput | Prisma.FollowWhereInput[];
    followerId?: Prisma.StringFilter<"Follow"> | string;
    followingId?: Prisma.StringFilter<"Follow"> | string;
    createdAt?: Prisma.DateTimeFilter<"Follow"> | Date | string;
    follower?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    following?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
}, "followerId_followingId">;
export type FollowOrderByWithAggregationInput = {
    followerId?: Prisma.SortOrder;
    followingId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FollowCountOrderByAggregateInput;
    _max?: Prisma.FollowMaxOrderByAggregateInput;
    _min?: Prisma.FollowMinOrderByAggregateInput;
};
export type FollowScalarWhereWithAggregatesInput = {
    AND?: Prisma.FollowScalarWhereWithAggregatesInput | Prisma.FollowScalarWhereWithAggregatesInput[];
    OR?: Prisma.FollowScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FollowScalarWhereWithAggregatesInput | Prisma.FollowScalarWhereWithAggregatesInput[];
    followerId?: Prisma.StringWithAggregatesFilter<"Follow"> | string;
    followingId?: Prisma.StringWithAggregatesFilter<"Follow"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Follow"> | Date | string;
};
export type FollowCreateInput = {
    createdAt?: Date | string;
    follower: Prisma.UsersCreateNestedOneWithoutFollowingInput;
    following: Prisma.UsersCreateNestedOneWithoutFollowersInput;
};
export type FollowUncheckedCreateInput = {
    followerId: string;
    followingId: string;
    createdAt?: Date | string;
};
export type FollowUpdateInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    follower?: Prisma.UsersUpdateOneRequiredWithoutFollowingNestedInput;
    following?: Prisma.UsersUpdateOneRequiredWithoutFollowersNestedInput;
};
export type FollowUncheckedUpdateInput = {
    followerId?: Prisma.StringFieldUpdateOperationsInput | string;
    followingId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FollowCreateManyInput = {
    followerId: string;
    followingId: string;
    createdAt?: Date | string;
};
export type FollowUpdateManyMutationInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FollowUncheckedUpdateManyInput = {
    followerId?: Prisma.StringFieldUpdateOperationsInput | string;
    followingId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FollowListRelationFilter = {
    every?: Prisma.FollowWhereInput;
    some?: Prisma.FollowWhereInput;
    none?: Prisma.FollowWhereInput;
};
export type FollowOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FollowFollowerIdFollowingIdCompoundUniqueInput = {
    followerId: string;
    followingId: string;
};
export type FollowCountOrderByAggregateInput = {
    followerId?: Prisma.SortOrder;
    followingId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FollowMaxOrderByAggregateInput = {
    followerId?: Prisma.SortOrder;
    followingId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FollowMinOrderByAggregateInput = {
    followerId?: Prisma.SortOrder;
    followingId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FollowCreateNestedManyWithoutFollowingInput = {
    create?: Prisma.XOR<Prisma.FollowCreateWithoutFollowingInput, Prisma.FollowUncheckedCreateWithoutFollowingInput> | Prisma.FollowCreateWithoutFollowingInput[] | Prisma.FollowUncheckedCreateWithoutFollowingInput[];
    connectOrCreate?: Prisma.FollowCreateOrConnectWithoutFollowingInput | Prisma.FollowCreateOrConnectWithoutFollowingInput[];
    createMany?: Prisma.FollowCreateManyFollowingInputEnvelope;
    connect?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
};
export type FollowCreateNestedManyWithoutFollowerInput = {
    create?: Prisma.XOR<Prisma.FollowCreateWithoutFollowerInput, Prisma.FollowUncheckedCreateWithoutFollowerInput> | Prisma.FollowCreateWithoutFollowerInput[] | Prisma.FollowUncheckedCreateWithoutFollowerInput[];
    connectOrCreate?: Prisma.FollowCreateOrConnectWithoutFollowerInput | Prisma.FollowCreateOrConnectWithoutFollowerInput[];
    createMany?: Prisma.FollowCreateManyFollowerInputEnvelope;
    connect?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
};
export type FollowUncheckedCreateNestedManyWithoutFollowingInput = {
    create?: Prisma.XOR<Prisma.FollowCreateWithoutFollowingInput, Prisma.FollowUncheckedCreateWithoutFollowingInput> | Prisma.FollowCreateWithoutFollowingInput[] | Prisma.FollowUncheckedCreateWithoutFollowingInput[];
    connectOrCreate?: Prisma.FollowCreateOrConnectWithoutFollowingInput | Prisma.FollowCreateOrConnectWithoutFollowingInput[];
    createMany?: Prisma.FollowCreateManyFollowingInputEnvelope;
    connect?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
};
export type FollowUncheckedCreateNestedManyWithoutFollowerInput = {
    create?: Prisma.XOR<Prisma.FollowCreateWithoutFollowerInput, Prisma.FollowUncheckedCreateWithoutFollowerInput> | Prisma.FollowCreateWithoutFollowerInput[] | Prisma.FollowUncheckedCreateWithoutFollowerInput[];
    connectOrCreate?: Prisma.FollowCreateOrConnectWithoutFollowerInput | Prisma.FollowCreateOrConnectWithoutFollowerInput[];
    createMany?: Prisma.FollowCreateManyFollowerInputEnvelope;
    connect?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
};
export type FollowUpdateManyWithoutFollowingNestedInput = {
    create?: Prisma.XOR<Prisma.FollowCreateWithoutFollowingInput, Prisma.FollowUncheckedCreateWithoutFollowingInput> | Prisma.FollowCreateWithoutFollowingInput[] | Prisma.FollowUncheckedCreateWithoutFollowingInput[];
    connectOrCreate?: Prisma.FollowCreateOrConnectWithoutFollowingInput | Prisma.FollowCreateOrConnectWithoutFollowingInput[];
    upsert?: Prisma.FollowUpsertWithWhereUniqueWithoutFollowingInput | Prisma.FollowUpsertWithWhereUniqueWithoutFollowingInput[];
    createMany?: Prisma.FollowCreateManyFollowingInputEnvelope;
    set?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    disconnect?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    delete?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    connect?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    update?: Prisma.FollowUpdateWithWhereUniqueWithoutFollowingInput | Prisma.FollowUpdateWithWhereUniqueWithoutFollowingInput[];
    updateMany?: Prisma.FollowUpdateManyWithWhereWithoutFollowingInput | Prisma.FollowUpdateManyWithWhereWithoutFollowingInput[];
    deleteMany?: Prisma.FollowScalarWhereInput | Prisma.FollowScalarWhereInput[];
};
export type FollowUpdateManyWithoutFollowerNestedInput = {
    create?: Prisma.XOR<Prisma.FollowCreateWithoutFollowerInput, Prisma.FollowUncheckedCreateWithoutFollowerInput> | Prisma.FollowCreateWithoutFollowerInput[] | Prisma.FollowUncheckedCreateWithoutFollowerInput[];
    connectOrCreate?: Prisma.FollowCreateOrConnectWithoutFollowerInput | Prisma.FollowCreateOrConnectWithoutFollowerInput[];
    upsert?: Prisma.FollowUpsertWithWhereUniqueWithoutFollowerInput | Prisma.FollowUpsertWithWhereUniqueWithoutFollowerInput[];
    createMany?: Prisma.FollowCreateManyFollowerInputEnvelope;
    set?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    disconnect?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    delete?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    connect?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    update?: Prisma.FollowUpdateWithWhereUniqueWithoutFollowerInput | Prisma.FollowUpdateWithWhereUniqueWithoutFollowerInput[];
    updateMany?: Prisma.FollowUpdateManyWithWhereWithoutFollowerInput | Prisma.FollowUpdateManyWithWhereWithoutFollowerInput[];
    deleteMany?: Prisma.FollowScalarWhereInput | Prisma.FollowScalarWhereInput[];
};
export type FollowUncheckedUpdateManyWithoutFollowingNestedInput = {
    create?: Prisma.XOR<Prisma.FollowCreateWithoutFollowingInput, Prisma.FollowUncheckedCreateWithoutFollowingInput> | Prisma.FollowCreateWithoutFollowingInput[] | Prisma.FollowUncheckedCreateWithoutFollowingInput[];
    connectOrCreate?: Prisma.FollowCreateOrConnectWithoutFollowingInput | Prisma.FollowCreateOrConnectWithoutFollowingInput[];
    upsert?: Prisma.FollowUpsertWithWhereUniqueWithoutFollowingInput | Prisma.FollowUpsertWithWhereUniqueWithoutFollowingInput[];
    createMany?: Prisma.FollowCreateManyFollowingInputEnvelope;
    set?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    disconnect?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    delete?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    connect?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    update?: Prisma.FollowUpdateWithWhereUniqueWithoutFollowingInput | Prisma.FollowUpdateWithWhereUniqueWithoutFollowingInput[];
    updateMany?: Prisma.FollowUpdateManyWithWhereWithoutFollowingInput | Prisma.FollowUpdateManyWithWhereWithoutFollowingInput[];
    deleteMany?: Prisma.FollowScalarWhereInput | Prisma.FollowScalarWhereInput[];
};
export type FollowUncheckedUpdateManyWithoutFollowerNestedInput = {
    create?: Prisma.XOR<Prisma.FollowCreateWithoutFollowerInput, Prisma.FollowUncheckedCreateWithoutFollowerInput> | Prisma.FollowCreateWithoutFollowerInput[] | Prisma.FollowUncheckedCreateWithoutFollowerInput[];
    connectOrCreate?: Prisma.FollowCreateOrConnectWithoutFollowerInput | Prisma.FollowCreateOrConnectWithoutFollowerInput[];
    upsert?: Prisma.FollowUpsertWithWhereUniqueWithoutFollowerInput | Prisma.FollowUpsertWithWhereUniqueWithoutFollowerInput[];
    createMany?: Prisma.FollowCreateManyFollowerInputEnvelope;
    set?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    disconnect?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    delete?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    connect?: Prisma.FollowWhereUniqueInput | Prisma.FollowWhereUniqueInput[];
    update?: Prisma.FollowUpdateWithWhereUniqueWithoutFollowerInput | Prisma.FollowUpdateWithWhereUniqueWithoutFollowerInput[];
    updateMany?: Prisma.FollowUpdateManyWithWhereWithoutFollowerInput | Prisma.FollowUpdateManyWithWhereWithoutFollowerInput[];
    deleteMany?: Prisma.FollowScalarWhereInput | Prisma.FollowScalarWhereInput[];
};
export type FollowCreateWithoutFollowingInput = {
    createdAt?: Date | string;
    follower: Prisma.UsersCreateNestedOneWithoutFollowingInput;
};
export type FollowUncheckedCreateWithoutFollowingInput = {
    followerId: string;
    createdAt?: Date | string;
};
export type FollowCreateOrConnectWithoutFollowingInput = {
    where: Prisma.FollowWhereUniqueInput;
    create: Prisma.XOR<Prisma.FollowCreateWithoutFollowingInput, Prisma.FollowUncheckedCreateWithoutFollowingInput>;
};
export type FollowCreateManyFollowingInputEnvelope = {
    data: Prisma.FollowCreateManyFollowingInput | Prisma.FollowCreateManyFollowingInput[];
    skipDuplicates?: boolean;
};
export type FollowCreateWithoutFollowerInput = {
    createdAt?: Date | string;
    following: Prisma.UsersCreateNestedOneWithoutFollowersInput;
};
export type FollowUncheckedCreateWithoutFollowerInput = {
    followingId: string;
    createdAt?: Date | string;
};
export type FollowCreateOrConnectWithoutFollowerInput = {
    where: Prisma.FollowWhereUniqueInput;
    create: Prisma.XOR<Prisma.FollowCreateWithoutFollowerInput, Prisma.FollowUncheckedCreateWithoutFollowerInput>;
};
export type FollowCreateManyFollowerInputEnvelope = {
    data: Prisma.FollowCreateManyFollowerInput | Prisma.FollowCreateManyFollowerInput[];
    skipDuplicates?: boolean;
};
export type FollowUpsertWithWhereUniqueWithoutFollowingInput = {
    where: Prisma.FollowWhereUniqueInput;
    update: Prisma.XOR<Prisma.FollowUpdateWithoutFollowingInput, Prisma.FollowUncheckedUpdateWithoutFollowingInput>;
    create: Prisma.XOR<Prisma.FollowCreateWithoutFollowingInput, Prisma.FollowUncheckedCreateWithoutFollowingInput>;
};
export type FollowUpdateWithWhereUniqueWithoutFollowingInput = {
    where: Prisma.FollowWhereUniqueInput;
    data: Prisma.XOR<Prisma.FollowUpdateWithoutFollowingInput, Prisma.FollowUncheckedUpdateWithoutFollowingInput>;
};
export type FollowUpdateManyWithWhereWithoutFollowingInput = {
    where: Prisma.FollowScalarWhereInput;
    data: Prisma.XOR<Prisma.FollowUpdateManyMutationInput, Prisma.FollowUncheckedUpdateManyWithoutFollowingInput>;
};
export type FollowScalarWhereInput = {
    AND?: Prisma.FollowScalarWhereInput | Prisma.FollowScalarWhereInput[];
    OR?: Prisma.FollowScalarWhereInput[];
    NOT?: Prisma.FollowScalarWhereInput | Prisma.FollowScalarWhereInput[];
    followerId?: Prisma.StringFilter<"Follow"> | string;
    followingId?: Prisma.StringFilter<"Follow"> | string;
    createdAt?: Prisma.DateTimeFilter<"Follow"> | Date | string;
};
export type FollowUpsertWithWhereUniqueWithoutFollowerInput = {
    where: Prisma.FollowWhereUniqueInput;
    update: Prisma.XOR<Prisma.FollowUpdateWithoutFollowerInput, Prisma.FollowUncheckedUpdateWithoutFollowerInput>;
    create: Prisma.XOR<Prisma.FollowCreateWithoutFollowerInput, Prisma.FollowUncheckedCreateWithoutFollowerInput>;
};
export type FollowUpdateWithWhereUniqueWithoutFollowerInput = {
    where: Prisma.FollowWhereUniqueInput;
    data: Prisma.XOR<Prisma.FollowUpdateWithoutFollowerInput, Prisma.FollowUncheckedUpdateWithoutFollowerInput>;
};
export type FollowUpdateManyWithWhereWithoutFollowerInput = {
    where: Prisma.FollowScalarWhereInput;
    data: Prisma.XOR<Prisma.FollowUpdateManyMutationInput, Prisma.FollowUncheckedUpdateManyWithoutFollowerInput>;
};
export type FollowCreateManyFollowingInput = {
    followerId: string;
    createdAt?: Date | string;
};
export type FollowCreateManyFollowerInput = {
    followingId: string;
    createdAt?: Date | string;
};
export type FollowUpdateWithoutFollowingInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    follower?: Prisma.UsersUpdateOneRequiredWithoutFollowingNestedInput;
};
export type FollowUncheckedUpdateWithoutFollowingInput = {
    followerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FollowUncheckedUpdateManyWithoutFollowingInput = {
    followerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FollowUpdateWithoutFollowerInput = {
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    following?: Prisma.UsersUpdateOneRequiredWithoutFollowersNestedInput;
};
export type FollowUncheckedUpdateWithoutFollowerInput = {
    followingId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FollowUncheckedUpdateManyWithoutFollowerInput = {
    followingId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FollowSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    followerId?: boolean;
    followingId?: boolean;
    createdAt?: boolean;
    follower?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    following?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["follow"]>;
export type FollowSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    followerId?: boolean;
    followingId?: boolean;
    createdAt?: boolean;
    follower?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    following?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["follow"]>;
export type FollowSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    followerId?: boolean;
    followingId?: boolean;
    createdAt?: boolean;
    follower?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    following?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["follow"]>;
export type FollowSelectScalar = {
    followerId?: boolean;
    followingId?: boolean;
    createdAt?: boolean;
};
export type FollowOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"followerId" | "followingId" | "createdAt", ExtArgs["result"]["follow"]>;
export type FollowInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    follower?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    following?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type FollowIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    follower?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    following?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type FollowIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    follower?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    following?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $FollowPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Follow";
    objects: {
        follower: Prisma.$UsersPayload<ExtArgs>;
        following: Prisma.$UsersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        followerId: string;
        followingId: string;
        createdAt: Date;
    }, ExtArgs["result"]["follow"]>;
    composites: {};
};
export type FollowGetPayload<S extends boolean | null | undefined | FollowDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FollowPayload, S>;
export type FollowCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FollowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FollowCountAggregateInputType | true;
};
export interface FollowDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Follow'];
        meta: {
            name: 'Follow';
        };
    };
    findUnique<T extends FollowFindUniqueArgs>(args: Prisma.SelectSubset<T, FollowFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FollowClient<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FollowFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FollowFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FollowClient<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FollowFindFirstArgs>(args?: Prisma.SelectSubset<T, FollowFindFirstArgs<ExtArgs>>): Prisma.Prisma__FollowClient<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FollowFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FollowFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FollowClient<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FollowFindManyArgs>(args?: Prisma.SelectSubset<T, FollowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FollowCreateArgs>(args: Prisma.SelectSubset<T, FollowCreateArgs<ExtArgs>>): Prisma.Prisma__FollowClient<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FollowCreateManyArgs>(args?: Prisma.SelectSubset<T, FollowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FollowCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FollowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FollowDeleteArgs>(args: Prisma.SelectSubset<T, FollowDeleteArgs<ExtArgs>>): Prisma.Prisma__FollowClient<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FollowUpdateArgs>(args: Prisma.SelectSubset<T, FollowUpdateArgs<ExtArgs>>): Prisma.Prisma__FollowClient<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FollowDeleteManyArgs>(args?: Prisma.SelectSubset<T, FollowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FollowUpdateManyArgs>(args: Prisma.SelectSubset<T, FollowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FollowUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FollowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FollowUpsertArgs>(args: Prisma.SelectSubset<T, FollowUpsertArgs<ExtArgs>>): Prisma.Prisma__FollowClient<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FollowCountArgs>(args?: Prisma.Subset<T, FollowCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FollowCountAggregateOutputType> : number>;
    aggregate<T extends FollowAggregateArgs>(args: Prisma.Subset<T, FollowAggregateArgs>): Prisma.PrismaPromise<GetFollowAggregateType<T>>;
    groupBy<T extends FollowGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FollowGroupByArgs['orderBy'];
    } : {
        orderBy?: FollowGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FollowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFollowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FollowFieldRefs;
}
export interface Prisma__FollowClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    follower<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    following<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FollowFieldRefs {
    readonly followerId: Prisma.FieldRef<"Follow", 'String'>;
    readonly followingId: Prisma.FieldRef<"Follow", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Follow", 'DateTime'>;
}
export type FollowFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSelect<ExtArgs> | null;
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    include?: Prisma.FollowInclude<ExtArgs> | null;
    where: Prisma.FollowWhereUniqueInput;
};
export type FollowFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSelect<ExtArgs> | null;
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    include?: Prisma.FollowInclude<ExtArgs> | null;
    where: Prisma.FollowWhereUniqueInput;
};
export type FollowFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSelect<ExtArgs> | null;
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    include?: Prisma.FollowInclude<ExtArgs> | null;
    where?: Prisma.FollowWhereInput;
    orderBy?: Prisma.FollowOrderByWithRelationInput | Prisma.FollowOrderByWithRelationInput[];
    cursor?: Prisma.FollowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FollowScalarFieldEnum | Prisma.FollowScalarFieldEnum[];
};
export type FollowFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSelect<ExtArgs> | null;
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    include?: Prisma.FollowInclude<ExtArgs> | null;
    where?: Prisma.FollowWhereInput;
    orderBy?: Prisma.FollowOrderByWithRelationInput | Prisma.FollowOrderByWithRelationInput[];
    cursor?: Prisma.FollowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FollowScalarFieldEnum | Prisma.FollowScalarFieldEnum[];
};
export type FollowFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSelect<ExtArgs> | null;
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    include?: Prisma.FollowInclude<ExtArgs> | null;
    where?: Prisma.FollowWhereInput;
    orderBy?: Prisma.FollowOrderByWithRelationInput | Prisma.FollowOrderByWithRelationInput[];
    cursor?: Prisma.FollowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FollowScalarFieldEnum | Prisma.FollowScalarFieldEnum[];
};
export type FollowCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSelect<ExtArgs> | null;
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    include?: Prisma.FollowInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FollowCreateInput, Prisma.FollowUncheckedCreateInput>;
};
export type FollowCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FollowCreateManyInput | Prisma.FollowCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FollowCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    data: Prisma.FollowCreateManyInput | Prisma.FollowCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FollowIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FollowUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSelect<ExtArgs> | null;
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    include?: Prisma.FollowInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FollowUpdateInput, Prisma.FollowUncheckedUpdateInput>;
    where: Prisma.FollowWhereUniqueInput;
};
export type FollowUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FollowUpdateManyMutationInput, Prisma.FollowUncheckedUpdateManyInput>;
    where?: Prisma.FollowWhereInput;
    limit?: number;
};
export type FollowUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FollowUpdateManyMutationInput, Prisma.FollowUncheckedUpdateManyInput>;
    where?: Prisma.FollowWhereInput;
    limit?: number;
    include?: Prisma.FollowIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FollowUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSelect<ExtArgs> | null;
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    include?: Prisma.FollowInclude<ExtArgs> | null;
    where: Prisma.FollowWhereUniqueInput;
    create: Prisma.XOR<Prisma.FollowCreateInput, Prisma.FollowUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FollowUpdateInput, Prisma.FollowUncheckedUpdateInput>;
};
export type FollowDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSelect<ExtArgs> | null;
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    include?: Prisma.FollowInclude<ExtArgs> | null;
    where: Prisma.FollowWhereUniqueInput;
};
export type FollowDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FollowWhereInput;
    limit?: number;
};
export type FollowDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FollowSelect<ExtArgs> | null;
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    include?: Prisma.FollowInclude<ExtArgs> | null;
};
