import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ProjectLinkModel = runtime.Types.Result.DefaultSelection<Prisma.$ProjectLinkPayload>;
export type AggregateProjectLink = {
    _count: ProjectLinkCountAggregateOutputType | null;
    _min: ProjectLinkMinAggregateOutputType | null;
    _max: ProjectLinkMaxAggregateOutputType | null;
};
export type ProjectLinkMinAggregateOutputType = {
    id: string | null;
    projectId: string | null;
    name: string | null;
    url: string | null;
    createdAt: Date | null;
};
export type ProjectLinkMaxAggregateOutputType = {
    id: string | null;
    projectId: string | null;
    name: string | null;
    url: string | null;
    createdAt: Date | null;
};
export type ProjectLinkCountAggregateOutputType = {
    id: number;
    projectId: number;
    name: number;
    url: number;
    createdAt: number;
    _all: number;
};
export type ProjectLinkMinAggregateInputType = {
    id?: true;
    projectId?: true;
    name?: true;
    url?: true;
    createdAt?: true;
};
export type ProjectLinkMaxAggregateInputType = {
    id?: true;
    projectId?: true;
    name?: true;
    url?: true;
    createdAt?: true;
};
export type ProjectLinkCountAggregateInputType = {
    id?: true;
    projectId?: true;
    name?: true;
    url?: true;
    createdAt?: true;
    _all?: true;
};
export type ProjectLinkAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectLinkWhereInput;
    orderBy?: Prisma.ProjectLinkOrderByWithRelationInput | Prisma.ProjectLinkOrderByWithRelationInput[];
    cursor?: Prisma.ProjectLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProjectLinkCountAggregateInputType;
    _min?: ProjectLinkMinAggregateInputType;
    _max?: ProjectLinkMaxAggregateInputType;
};
export type GetProjectLinkAggregateType<T extends ProjectLinkAggregateArgs> = {
    [P in keyof T & keyof AggregateProjectLink]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProjectLink[P]> : Prisma.GetScalarType<T[P], AggregateProjectLink[P]>;
};
export type ProjectLinkGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectLinkWhereInput;
    orderBy?: Prisma.ProjectLinkOrderByWithAggregationInput | Prisma.ProjectLinkOrderByWithAggregationInput[];
    by: Prisma.ProjectLinkScalarFieldEnum[] | Prisma.ProjectLinkScalarFieldEnum;
    having?: Prisma.ProjectLinkScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProjectLinkCountAggregateInputType | true;
    _min?: ProjectLinkMinAggregateInputType;
    _max?: ProjectLinkMaxAggregateInputType;
};
export type ProjectLinkGroupByOutputType = {
    id: string;
    projectId: string;
    name: string;
    url: string;
    createdAt: Date;
    _count: ProjectLinkCountAggregateOutputType | null;
    _min: ProjectLinkMinAggregateOutputType | null;
    _max: ProjectLinkMaxAggregateOutputType | null;
};
export type GetProjectLinkGroupByPayload<T extends ProjectLinkGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProjectLinkGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProjectLinkGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProjectLinkGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProjectLinkGroupByOutputType[P]>;
}>>;
export type ProjectLinkWhereInput = {
    AND?: Prisma.ProjectLinkWhereInput | Prisma.ProjectLinkWhereInput[];
    OR?: Prisma.ProjectLinkWhereInput[];
    NOT?: Prisma.ProjectLinkWhereInput | Prisma.ProjectLinkWhereInput[];
    id?: Prisma.StringFilter<"ProjectLink"> | string;
    projectId?: Prisma.StringFilter<"ProjectLink"> | string;
    name?: Prisma.StringFilter<"ProjectLink"> | string;
    url?: Prisma.StringFilter<"ProjectLink"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProjectLink"> | Date | string;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
};
export type ProjectLinkOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    project?: Prisma.ProjectOrderByWithRelationInput;
};
export type ProjectLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProjectLinkWhereInput | Prisma.ProjectLinkWhereInput[];
    OR?: Prisma.ProjectLinkWhereInput[];
    NOT?: Prisma.ProjectLinkWhereInput | Prisma.ProjectLinkWhereInput[];
    projectId?: Prisma.StringFilter<"ProjectLink"> | string;
    name?: Prisma.StringFilter<"ProjectLink"> | string;
    url?: Prisma.StringFilter<"ProjectLink"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProjectLink"> | Date | string;
    project?: Prisma.XOR<Prisma.ProjectScalarRelationFilter, Prisma.ProjectWhereInput>;
}, "id">;
export type ProjectLinkOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ProjectLinkCountOrderByAggregateInput;
    _max?: Prisma.ProjectLinkMaxOrderByAggregateInput;
    _min?: Prisma.ProjectLinkMinOrderByAggregateInput;
};
export type ProjectLinkScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProjectLinkScalarWhereWithAggregatesInput | Prisma.ProjectLinkScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProjectLinkScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProjectLinkScalarWhereWithAggregatesInput | Prisma.ProjectLinkScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ProjectLink"> | string;
    projectId?: Prisma.StringWithAggregatesFilter<"ProjectLink"> | string;
    name?: Prisma.StringWithAggregatesFilter<"ProjectLink"> | string;
    url?: Prisma.StringWithAggregatesFilter<"ProjectLink"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ProjectLink"> | Date | string;
};
export type ProjectLinkCreateInput = {
    id?: string;
    name: string;
    url: string;
    createdAt?: Date | string;
    project: Prisma.ProjectCreateNestedOneWithoutProjectLinksInput;
};
export type ProjectLinkUncheckedCreateInput = {
    id?: string;
    projectId: string;
    name: string;
    url: string;
    createdAt?: Date | string;
};
export type ProjectLinkUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    project?: Prisma.ProjectUpdateOneRequiredWithoutProjectLinksNestedInput;
};
export type ProjectLinkUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectLinkCreateManyInput = {
    id?: string;
    projectId: string;
    name: string;
    url: string;
    createdAt?: Date | string;
};
export type ProjectLinkUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectLinkUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    projectId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectLinkListRelationFilter = {
    every?: Prisma.ProjectLinkWhereInput;
    some?: Prisma.ProjectLinkWhereInput;
    none?: Prisma.ProjectLinkWhereInput;
};
export type ProjectLinkOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProjectLinkCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProjectLinkMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProjectLinkMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    projectId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ProjectLinkCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.ProjectLinkCreateWithoutProjectInput, Prisma.ProjectLinkUncheckedCreateWithoutProjectInput> | Prisma.ProjectLinkCreateWithoutProjectInput[] | Prisma.ProjectLinkUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.ProjectLinkCreateOrConnectWithoutProjectInput | Prisma.ProjectLinkCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.ProjectLinkCreateManyProjectInputEnvelope;
    connect?: Prisma.ProjectLinkWhereUniqueInput | Prisma.ProjectLinkWhereUniqueInput[];
};
export type ProjectLinkUncheckedCreateNestedManyWithoutProjectInput = {
    create?: Prisma.XOR<Prisma.ProjectLinkCreateWithoutProjectInput, Prisma.ProjectLinkUncheckedCreateWithoutProjectInput> | Prisma.ProjectLinkCreateWithoutProjectInput[] | Prisma.ProjectLinkUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.ProjectLinkCreateOrConnectWithoutProjectInput | Prisma.ProjectLinkCreateOrConnectWithoutProjectInput[];
    createMany?: Prisma.ProjectLinkCreateManyProjectInputEnvelope;
    connect?: Prisma.ProjectLinkWhereUniqueInput | Prisma.ProjectLinkWhereUniqueInput[];
};
export type ProjectLinkUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectLinkCreateWithoutProjectInput, Prisma.ProjectLinkUncheckedCreateWithoutProjectInput> | Prisma.ProjectLinkCreateWithoutProjectInput[] | Prisma.ProjectLinkUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.ProjectLinkCreateOrConnectWithoutProjectInput | Prisma.ProjectLinkCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.ProjectLinkUpsertWithWhereUniqueWithoutProjectInput | Prisma.ProjectLinkUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.ProjectLinkCreateManyProjectInputEnvelope;
    set?: Prisma.ProjectLinkWhereUniqueInput | Prisma.ProjectLinkWhereUniqueInput[];
    disconnect?: Prisma.ProjectLinkWhereUniqueInput | Prisma.ProjectLinkWhereUniqueInput[];
    delete?: Prisma.ProjectLinkWhereUniqueInput | Prisma.ProjectLinkWhereUniqueInput[];
    connect?: Prisma.ProjectLinkWhereUniqueInput | Prisma.ProjectLinkWhereUniqueInput[];
    update?: Prisma.ProjectLinkUpdateWithWhereUniqueWithoutProjectInput | Prisma.ProjectLinkUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.ProjectLinkUpdateManyWithWhereWithoutProjectInput | Prisma.ProjectLinkUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.ProjectLinkScalarWhereInput | Prisma.ProjectLinkScalarWhereInput[];
};
export type ProjectLinkUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectLinkCreateWithoutProjectInput, Prisma.ProjectLinkUncheckedCreateWithoutProjectInput> | Prisma.ProjectLinkCreateWithoutProjectInput[] | Prisma.ProjectLinkUncheckedCreateWithoutProjectInput[];
    connectOrCreate?: Prisma.ProjectLinkCreateOrConnectWithoutProjectInput | Prisma.ProjectLinkCreateOrConnectWithoutProjectInput[];
    upsert?: Prisma.ProjectLinkUpsertWithWhereUniqueWithoutProjectInput | Prisma.ProjectLinkUpsertWithWhereUniqueWithoutProjectInput[];
    createMany?: Prisma.ProjectLinkCreateManyProjectInputEnvelope;
    set?: Prisma.ProjectLinkWhereUniqueInput | Prisma.ProjectLinkWhereUniqueInput[];
    disconnect?: Prisma.ProjectLinkWhereUniqueInput | Prisma.ProjectLinkWhereUniqueInput[];
    delete?: Prisma.ProjectLinkWhereUniqueInput | Prisma.ProjectLinkWhereUniqueInput[];
    connect?: Prisma.ProjectLinkWhereUniqueInput | Prisma.ProjectLinkWhereUniqueInput[];
    update?: Prisma.ProjectLinkUpdateWithWhereUniqueWithoutProjectInput | Prisma.ProjectLinkUpdateWithWhereUniqueWithoutProjectInput[];
    updateMany?: Prisma.ProjectLinkUpdateManyWithWhereWithoutProjectInput | Prisma.ProjectLinkUpdateManyWithWhereWithoutProjectInput[];
    deleteMany?: Prisma.ProjectLinkScalarWhereInput | Prisma.ProjectLinkScalarWhereInput[];
};
export type ProjectLinkCreateWithoutProjectInput = {
    id?: string;
    name: string;
    url: string;
    createdAt?: Date | string;
};
export type ProjectLinkUncheckedCreateWithoutProjectInput = {
    id?: string;
    name: string;
    url: string;
    createdAt?: Date | string;
};
export type ProjectLinkCreateOrConnectWithoutProjectInput = {
    where: Prisma.ProjectLinkWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectLinkCreateWithoutProjectInput, Prisma.ProjectLinkUncheckedCreateWithoutProjectInput>;
};
export type ProjectLinkCreateManyProjectInputEnvelope = {
    data: Prisma.ProjectLinkCreateManyProjectInput | Prisma.ProjectLinkCreateManyProjectInput[];
    skipDuplicates?: boolean;
};
export type ProjectLinkUpsertWithWhereUniqueWithoutProjectInput = {
    where: Prisma.ProjectLinkWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectLinkUpdateWithoutProjectInput, Prisma.ProjectLinkUncheckedUpdateWithoutProjectInput>;
    create: Prisma.XOR<Prisma.ProjectLinkCreateWithoutProjectInput, Prisma.ProjectLinkUncheckedCreateWithoutProjectInput>;
};
export type ProjectLinkUpdateWithWhereUniqueWithoutProjectInput = {
    where: Prisma.ProjectLinkWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectLinkUpdateWithoutProjectInput, Prisma.ProjectLinkUncheckedUpdateWithoutProjectInput>;
};
export type ProjectLinkUpdateManyWithWhereWithoutProjectInput = {
    where: Prisma.ProjectLinkScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectLinkUpdateManyMutationInput, Prisma.ProjectLinkUncheckedUpdateManyWithoutProjectInput>;
};
export type ProjectLinkScalarWhereInput = {
    AND?: Prisma.ProjectLinkScalarWhereInput | Prisma.ProjectLinkScalarWhereInput[];
    OR?: Prisma.ProjectLinkScalarWhereInput[];
    NOT?: Prisma.ProjectLinkScalarWhereInput | Prisma.ProjectLinkScalarWhereInput[];
    id?: Prisma.StringFilter<"ProjectLink"> | string;
    projectId?: Prisma.StringFilter<"ProjectLink"> | string;
    name?: Prisma.StringFilter<"ProjectLink"> | string;
    url?: Prisma.StringFilter<"ProjectLink"> | string;
    createdAt?: Prisma.DateTimeFilter<"ProjectLink"> | Date | string;
};
export type ProjectLinkCreateManyProjectInput = {
    id?: string;
    name: string;
    url: string;
    createdAt?: Date | string;
};
export type ProjectLinkUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectLinkUncheckedUpdateWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectLinkUncheckedUpdateManyWithoutProjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProjectLinkSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    name?: boolean;
    url?: boolean;
    createdAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["projectLink"]>;
export type ProjectLinkSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    name?: boolean;
    url?: boolean;
    createdAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["projectLink"]>;
export type ProjectLinkSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    projectId?: boolean;
    name?: boolean;
    url?: boolean;
    createdAt?: boolean;
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["projectLink"]>;
export type ProjectLinkSelectScalar = {
    id?: boolean;
    projectId?: boolean;
    name?: boolean;
    url?: boolean;
    createdAt?: boolean;
};
export type ProjectLinkOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "projectId" | "name" | "url" | "createdAt", ExtArgs["result"]["projectLink"]>;
export type ProjectLinkInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
};
export type ProjectLinkIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
};
export type ProjectLinkIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    project?: boolean | Prisma.ProjectDefaultArgs<ExtArgs>;
};
export type $ProjectLinkPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ProjectLink";
    objects: {
        project: Prisma.$ProjectPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        projectId: string;
        name: string;
        url: string;
        createdAt: Date;
    }, ExtArgs["result"]["projectLink"]>;
    composites: {};
};
export type ProjectLinkGetPayload<S extends boolean | null | undefined | ProjectLinkDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProjectLinkPayload, S>;
export type ProjectLinkCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProjectLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProjectLinkCountAggregateInputType | true;
};
export interface ProjectLinkDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ProjectLink'];
        meta: {
            name: 'ProjectLink';
        };
    };
    findUnique<T extends ProjectLinkFindUniqueArgs>(args: Prisma.SelectSubset<T, ProjectLinkFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProjectLinkClient<runtime.Types.Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProjectLinkFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProjectLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectLinkClient<runtime.Types.Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProjectLinkFindFirstArgs>(args?: Prisma.SelectSubset<T, ProjectLinkFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProjectLinkClient<runtime.Types.Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProjectLinkFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProjectLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectLinkClient<runtime.Types.Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProjectLinkFindManyArgs>(args?: Prisma.SelectSubset<T, ProjectLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProjectLinkCreateArgs>(args: Prisma.SelectSubset<T, ProjectLinkCreateArgs<ExtArgs>>): Prisma.Prisma__ProjectLinkClient<runtime.Types.Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProjectLinkCreateManyArgs>(args?: Prisma.SelectSubset<T, ProjectLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProjectLinkCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProjectLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProjectLinkDeleteArgs>(args: Prisma.SelectSubset<T, ProjectLinkDeleteArgs<ExtArgs>>): Prisma.Prisma__ProjectLinkClient<runtime.Types.Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProjectLinkUpdateArgs>(args: Prisma.SelectSubset<T, ProjectLinkUpdateArgs<ExtArgs>>): Prisma.Prisma__ProjectLinkClient<runtime.Types.Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProjectLinkDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProjectLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProjectLinkUpdateManyArgs>(args: Prisma.SelectSubset<T, ProjectLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProjectLinkUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProjectLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProjectLinkUpsertArgs>(args: Prisma.SelectSubset<T, ProjectLinkUpsertArgs<ExtArgs>>): Prisma.Prisma__ProjectLinkClient<runtime.Types.Result.GetResult<Prisma.$ProjectLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProjectLinkCountArgs>(args?: Prisma.Subset<T, ProjectLinkCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProjectLinkCountAggregateOutputType> : number>;
    aggregate<T extends ProjectLinkAggregateArgs>(args: Prisma.Subset<T, ProjectLinkAggregateArgs>): Prisma.PrismaPromise<GetProjectLinkAggregateType<T>>;
    groupBy<T extends ProjectLinkGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProjectLinkGroupByArgs['orderBy'];
    } : {
        orderBy?: ProjectLinkGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProjectLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProjectLinkFieldRefs;
}
export interface Prisma__ProjectLinkClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    project<T extends Prisma.ProjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProjectDefaultArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProjectLinkFieldRefs {
    readonly id: Prisma.FieldRef<"ProjectLink", 'String'>;
    readonly projectId: Prisma.FieldRef<"ProjectLink", 'String'>;
    readonly name: Prisma.FieldRef<"ProjectLink", 'String'>;
    readonly url: Prisma.FieldRef<"ProjectLink", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ProjectLink", 'DateTime'>;
}
export type ProjectLinkFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectLinkSelect<ExtArgs> | null;
    omit?: Prisma.ProjectLinkOmit<ExtArgs> | null;
    include?: Prisma.ProjectLinkInclude<ExtArgs> | null;
    where: Prisma.ProjectLinkWhereUniqueInput;
};
export type ProjectLinkFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectLinkSelect<ExtArgs> | null;
    omit?: Prisma.ProjectLinkOmit<ExtArgs> | null;
    include?: Prisma.ProjectLinkInclude<ExtArgs> | null;
    where: Prisma.ProjectLinkWhereUniqueInput;
};
export type ProjectLinkFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectLinkSelect<ExtArgs> | null;
    omit?: Prisma.ProjectLinkOmit<ExtArgs> | null;
    include?: Prisma.ProjectLinkInclude<ExtArgs> | null;
    where?: Prisma.ProjectLinkWhereInput;
    orderBy?: Prisma.ProjectLinkOrderByWithRelationInput | Prisma.ProjectLinkOrderByWithRelationInput[];
    cursor?: Prisma.ProjectLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectLinkScalarFieldEnum | Prisma.ProjectLinkScalarFieldEnum[];
};
export type ProjectLinkFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectLinkSelect<ExtArgs> | null;
    omit?: Prisma.ProjectLinkOmit<ExtArgs> | null;
    include?: Prisma.ProjectLinkInclude<ExtArgs> | null;
    where?: Prisma.ProjectLinkWhereInput;
    orderBy?: Prisma.ProjectLinkOrderByWithRelationInput | Prisma.ProjectLinkOrderByWithRelationInput[];
    cursor?: Prisma.ProjectLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectLinkScalarFieldEnum | Prisma.ProjectLinkScalarFieldEnum[];
};
export type ProjectLinkFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectLinkSelect<ExtArgs> | null;
    omit?: Prisma.ProjectLinkOmit<ExtArgs> | null;
    include?: Prisma.ProjectLinkInclude<ExtArgs> | null;
    where?: Prisma.ProjectLinkWhereInput;
    orderBy?: Prisma.ProjectLinkOrderByWithRelationInput | Prisma.ProjectLinkOrderByWithRelationInput[];
    cursor?: Prisma.ProjectLinkWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectLinkScalarFieldEnum | Prisma.ProjectLinkScalarFieldEnum[];
};
export type ProjectLinkCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectLinkSelect<ExtArgs> | null;
    omit?: Prisma.ProjectLinkOmit<ExtArgs> | null;
    include?: Prisma.ProjectLinkInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectLinkCreateInput, Prisma.ProjectLinkUncheckedCreateInput>;
};
export type ProjectLinkCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProjectLinkCreateManyInput | Prisma.ProjectLinkCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProjectLinkCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectLinkSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectLinkOmit<ExtArgs> | null;
    data: Prisma.ProjectLinkCreateManyInput | Prisma.ProjectLinkCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProjectLinkIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProjectLinkUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectLinkSelect<ExtArgs> | null;
    omit?: Prisma.ProjectLinkOmit<ExtArgs> | null;
    include?: Prisma.ProjectLinkInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectLinkUpdateInput, Prisma.ProjectLinkUncheckedUpdateInput>;
    where: Prisma.ProjectLinkWhereUniqueInput;
};
export type ProjectLinkUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProjectLinkUpdateManyMutationInput, Prisma.ProjectLinkUncheckedUpdateManyInput>;
    where?: Prisma.ProjectLinkWhereInput;
    limit?: number;
};
export type ProjectLinkUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectLinkSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectLinkOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectLinkUpdateManyMutationInput, Prisma.ProjectLinkUncheckedUpdateManyInput>;
    where?: Prisma.ProjectLinkWhereInput;
    limit?: number;
    include?: Prisma.ProjectLinkIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProjectLinkUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectLinkSelect<ExtArgs> | null;
    omit?: Prisma.ProjectLinkOmit<ExtArgs> | null;
    include?: Prisma.ProjectLinkInclude<ExtArgs> | null;
    where: Prisma.ProjectLinkWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectLinkCreateInput, Prisma.ProjectLinkUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProjectLinkUpdateInput, Prisma.ProjectLinkUncheckedUpdateInput>;
};
export type ProjectLinkDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectLinkSelect<ExtArgs> | null;
    omit?: Prisma.ProjectLinkOmit<ExtArgs> | null;
    include?: Prisma.ProjectLinkInclude<ExtArgs> | null;
    where: Prisma.ProjectLinkWhereUniqueInput;
};
export type ProjectLinkDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectLinkWhereInput;
    limit?: number;
};
export type ProjectLinkDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectLinkSelect<ExtArgs> | null;
    omit?: Prisma.ProjectLinkOmit<ExtArgs> | null;
    include?: Prisma.ProjectLinkInclude<ExtArgs> | null;
};
