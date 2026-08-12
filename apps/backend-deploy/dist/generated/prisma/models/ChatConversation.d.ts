import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ChatConversationModel = runtime.Types.Result.DefaultSelection<Prisma.$ChatConversationPayload>;
export type AggregateChatConversation = {
    _count: ChatConversationCountAggregateOutputType | null;
    _min: ChatConversationMinAggregateOutputType | null;
    _max: ChatConversationMaxAggregateOutputType | null;
};
export type ChatConversationMinAggregateOutputType = {
    id: string | null;
    userAId: string | null;
    userBId: string | null;
    lastMessageAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ChatConversationMaxAggregateOutputType = {
    id: string | null;
    userAId: string | null;
    userBId: string | null;
    lastMessageAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ChatConversationCountAggregateOutputType = {
    id: number;
    userAId: number;
    userBId: number;
    lastMessageAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ChatConversationMinAggregateInputType = {
    id?: true;
    userAId?: true;
    userBId?: true;
    lastMessageAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ChatConversationMaxAggregateInputType = {
    id?: true;
    userAId?: true;
    userBId?: true;
    lastMessageAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ChatConversationCountAggregateInputType = {
    id?: true;
    userAId?: true;
    userBId?: true;
    lastMessageAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ChatConversationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatConversationWhereInput;
    orderBy?: Prisma.ChatConversationOrderByWithRelationInput | Prisma.ChatConversationOrderByWithRelationInput[];
    cursor?: Prisma.ChatConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ChatConversationCountAggregateInputType;
    _min?: ChatConversationMinAggregateInputType;
    _max?: ChatConversationMaxAggregateInputType;
};
export type GetChatConversationAggregateType<T extends ChatConversationAggregateArgs> = {
    [P in keyof T & keyof AggregateChatConversation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChatConversation[P]> : Prisma.GetScalarType<T[P], AggregateChatConversation[P]>;
};
export type ChatConversationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatConversationWhereInput;
    orderBy?: Prisma.ChatConversationOrderByWithAggregationInput | Prisma.ChatConversationOrderByWithAggregationInput[];
    by: Prisma.ChatConversationScalarFieldEnum[] | Prisma.ChatConversationScalarFieldEnum;
    having?: Prisma.ChatConversationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChatConversationCountAggregateInputType | true;
    _min?: ChatConversationMinAggregateInputType;
    _max?: ChatConversationMaxAggregateInputType;
};
export type ChatConversationGroupByOutputType = {
    id: string;
    userAId: string;
    userBId: string;
    lastMessageAt: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: ChatConversationCountAggregateOutputType | null;
    _min: ChatConversationMinAggregateOutputType | null;
    _max: ChatConversationMaxAggregateOutputType | null;
};
export type GetChatConversationGroupByPayload<T extends ChatConversationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ChatConversationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ChatConversationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ChatConversationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ChatConversationGroupByOutputType[P]>;
}>>;
export type ChatConversationWhereInput = {
    AND?: Prisma.ChatConversationWhereInput | Prisma.ChatConversationWhereInput[];
    OR?: Prisma.ChatConversationWhereInput[];
    NOT?: Prisma.ChatConversationWhereInput | Prisma.ChatConversationWhereInput[];
    id?: Prisma.StringFilter<"ChatConversation"> | string;
    userAId?: Prisma.StringFilter<"ChatConversation"> | string;
    userBId?: Prisma.StringFilter<"ChatConversation"> | string;
    lastMessageAt?: Prisma.DateTimeFilter<"ChatConversation"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"ChatConversation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ChatConversation"> | Date | string;
    userA?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    userB?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    messages?: Prisma.ChatMessageListRelationFilter;
};
export type ChatConversationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userAId?: Prisma.SortOrder;
    userBId?: Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    userA?: Prisma.UsersOrderByWithRelationInput;
    userB?: Prisma.UsersOrderByWithRelationInput;
    messages?: Prisma.ChatMessageOrderByRelationAggregateInput;
};
export type ChatConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userAId_userBId?: Prisma.ChatConversationUserAIdUserBIdCompoundUniqueInput;
    AND?: Prisma.ChatConversationWhereInput | Prisma.ChatConversationWhereInput[];
    OR?: Prisma.ChatConversationWhereInput[];
    NOT?: Prisma.ChatConversationWhereInput | Prisma.ChatConversationWhereInput[];
    userAId?: Prisma.StringFilter<"ChatConversation"> | string;
    userBId?: Prisma.StringFilter<"ChatConversation"> | string;
    lastMessageAt?: Prisma.DateTimeFilter<"ChatConversation"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"ChatConversation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ChatConversation"> | Date | string;
    userA?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    userB?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
    messages?: Prisma.ChatMessageListRelationFilter;
}, "id" | "userAId_userBId">;
export type ChatConversationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userAId?: Prisma.SortOrder;
    userBId?: Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ChatConversationCountOrderByAggregateInput;
    _max?: Prisma.ChatConversationMaxOrderByAggregateInput;
    _min?: Prisma.ChatConversationMinOrderByAggregateInput;
};
export type ChatConversationScalarWhereWithAggregatesInput = {
    AND?: Prisma.ChatConversationScalarWhereWithAggregatesInput | Prisma.ChatConversationScalarWhereWithAggregatesInput[];
    OR?: Prisma.ChatConversationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ChatConversationScalarWhereWithAggregatesInput | Prisma.ChatConversationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ChatConversation"> | string;
    userAId?: Prisma.StringWithAggregatesFilter<"ChatConversation"> | string;
    userBId?: Prisma.StringWithAggregatesFilter<"ChatConversation"> | string;
    lastMessageAt?: Prisma.DateTimeWithAggregatesFilter<"ChatConversation"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ChatConversation"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ChatConversation"> | Date | string;
};
export type ChatConversationCreateInput = {
    id?: string;
    lastMessageAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userA: Prisma.UsersCreateNestedOneWithoutConversationsAsUserAInput;
    userB: Prisma.UsersCreateNestedOneWithoutConversationsAsUserBInput;
    messages?: Prisma.ChatMessageCreateNestedManyWithoutConversationInput;
};
export type ChatConversationUncheckedCreateInput = {
    id?: string;
    userAId: string;
    userBId: string;
    lastMessageAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ChatConversationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userA?: Prisma.UsersUpdateOneRequiredWithoutConversationsAsUserANestedInput;
    userB?: Prisma.UsersUpdateOneRequiredWithoutConversationsAsUserBNestedInput;
    messages?: Prisma.ChatMessageUpdateManyWithoutConversationNestedInput;
};
export type ChatConversationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userAId?: Prisma.StringFieldUpdateOperationsInput | string;
    userBId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.ChatMessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ChatConversationCreateManyInput = {
    id?: string;
    userAId: string;
    userBId: string;
    lastMessageAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChatConversationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatConversationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userAId?: Prisma.StringFieldUpdateOperationsInput | string;
    userBId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatConversationListRelationFilter = {
    every?: Prisma.ChatConversationWhereInput;
    some?: Prisma.ChatConversationWhereInput;
    none?: Prisma.ChatConversationWhereInput;
};
export type ChatConversationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ChatConversationUserAIdUserBIdCompoundUniqueInput = {
    userAId: string;
    userBId: string;
};
export type ChatConversationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userAId?: Prisma.SortOrder;
    userBId?: Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChatConversationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userAId?: Prisma.SortOrder;
    userBId?: Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChatConversationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userAId?: Prisma.SortOrder;
    userBId?: Prisma.SortOrder;
    lastMessageAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChatConversationScalarRelationFilter = {
    is?: Prisma.ChatConversationWhereInput;
    isNot?: Prisma.ChatConversationWhereInput;
};
export type ChatConversationCreateNestedManyWithoutUserAInput = {
    create?: Prisma.XOR<Prisma.ChatConversationCreateWithoutUserAInput, Prisma.ChatConversationUncheckedCreateWithoutUserAInput> | Prisma.ChatConversationCreateWithoutUserAInput[] | Prisma.ChatConversationUncheckedCreateWithoutUserAInput[];
    connectOrCreate?: Prisma.ChatConversationCreateOrConnectWithoutUserAInput | Prisma.ChatConversationCreateOrConnectWithoutUserAInput[];
    createMany?: Prisma.ChatConversationCreateManyUserAInputEnvelope;
    connect?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
};
export type ChatConversationCreateNestedManyWithoutUserBInput = {
    create?: Prisma.XOR<Prisma.ChatConversationCreateWithoutUserBInput, Prisma.ChatConversationUncheckedCreateWithoutUserBInput> | Prisma.ChatConversationCreateWithoutUserBInput[] | Prisma.ChatConversationUncheckedCreateWithoutUserBInput[];
    connectOrCreate?: Prisma.ChatConversationCreateOrConnectWithoutUserBInput | Prisma.ChatConversationCreateOrConnectWithoutUserBInput[];
    createMany?: Prisma.ChatConversationCreateManyUserBInputEnvelope;
    connect?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
};
export type ChatConversationUncheckedCreateNestedManyWithoutUserAInput = {
    create?: Prisma.XOR<Prisma.ChatConversationCreateWithoutUserAInput, Prisma.ChatConversationUncheckedCreateWithoutUserAInput> | Prisma.ChatConversationCreateWithoutUserAInput[] | Prisma.ChatConversationUncheckedCreateWithoutUserAInput[];
    connectOrCreate?: Prisma.ChatConversationCreateOrConnectWithoutUserAInput | Prisma.ChatConversationCreateOrConnectWithoutUserAInput[];
    createMany?: Prisma.ChatConversationCreateManyUserAInputEnvelope;
    connect?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
};
export type ChatConversationUncheckedCreateNestedManyWithoutUserBInput = {
    create?: Prisma.XOR<Prisma.ChatConversationCreateWithoutUserBInput, Prisma.ChatConversationUncheckedCreateWithoutUserBInput> | Prisma.ChatConversationCreateWithoutUserBInput[] | Prisma.ChatConversationUncheckedCreateWithoutUserBInput[];
    connectOrCreate?: Prisma.ChatConversationCreateOrConnectWithoutUserBInput | Prisma.ChatConversationCreateOrConnectWithoutUserBInput[];
    createMany?: Prisma.ChatConversationCreateManyUserBInputEnvelope;
    connect?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
};
export type ChatConversationUpdateManyWithoutUserANestedInput = {
    create?: Prisma.XOR<Prisma.ChatConversationCreateWithoutUserAInput, Prisma.ChatConversationUncheckedCreateWithoutUserAInput> | Prisma.ChatConversationCreateWithoutUserAInput[] | Prisma.ChatConversationUncheckedCreateWithoutUserAInput[];
    connectOrCreate?: Prisma.ChatConversationCreateOrConnectWithoutUserAInput | Prisma.ChatConversationCreateOrConnectWithoutUserAInput[];
    upsert?: Prisma.ChatConversationUpsertWithWhereUniqueWithoutUserAInput | Prisma.ChatConversationUpsertWithWhereUniqueWithoutUserAInput[];
    createMany?: Prisma.ChatConversationCreateManyUserAInputEnvelope;
    set?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    disconnect?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    delete?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    connect?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    update?: Prisma.ChatConversationUpdateWithWhereUniqueWithoutUserAInput | Prisma.ChatConversationUpdateWithWhereUniqueWithoutUserAInput[];
    updateMany?: Prisma.ChatConversationUpdateManyWithWhereWithoutUserAInput | Prisma.ChatConversationUpdateManyWithWhereWithoutUserAInput[];
    deleteMany?: Prisma.ChatConversationScalarWhereInput | Prisma.ChatConversationScalarWhereInput[];
};
export type ChatConversationUpdateManyWithoutUserBNestedInput = {
    create?: Prisma.XOR<Prisma.ChatConversationCreateWithoutUserBInput, Prisma.ChatConversationUncheckedCreateWithoutUserBInput> | Prisma.ChatConversationCreateWithoutUserBInput[] | Prisma.ChatConversationUncheckedCreateWithoutUserBInput[];
    connectOrCreate?: Prisma.ChatConversationCreateOrConnectWithoutUserBInput | Prisma.ChatConversationCreateOrConnectWithoutUserBInput[];
    upsert?: Prisma.ChatConversationUpsertWithWhereUniqueWithoutUserBInput | Prisma.ChatConversationUpsertWithWhereUniqueWithoutUserBInput[];
    createMany?: Prisma.ChatConversationCreateManyUserBInputEnvelope;
    set?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    disconnect?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    delete?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    connect?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    update?: Prisma.ChatConversationUpdateWithWhereUniqueWithoutUserBInput | Prisma.ChatConversationUpdateWithWhereUniqueWithoutUserBInput[];
    updateMany?: Prisma.ChatConversationUpdateManyWithWhereWithoutUserBInput | Prisma.ChatConversationUpdateManyWithWhereWithoutUserBInput[];
    deleteMany?: Prisma.ChatConversationScalarWhereInput | Prisma.ChatConversationScalarWhereInput[];
};
export type ChatConversationUncheckedUpdateManyWithoutUserANestedInput = {
    create?: Prisma.XOR<Prisma.ChatConversationCreateWithoutUserAInput, Prisma.ChatConversationUncheckedCreateWithoutUserAInput> | Prisma.ChatConversationCreateWithoutUserAInput[] | Prisma.ChatConversationUncheckedCreateWithoutUserAInput[];
    connectOrCreate?: Prisma.ChatConversationCreateOrConnectWithoutUserAInput | Prisma.ChatConversationCreateOrConnectWithoutUserAInput[];
    upsert?: Prisma.ChatConversationUpsertWithWhereUniqueWithoutUserAInput | Prisma.ChatConversationUpsertWithWhereUniqueWithoutUserAInput[];
    createMany?: Prisma.ChatConversationCreateManyUserAInputEnvelope;
    set?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    disconnect?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    delete?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    connect?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    update?: Prisma.ChatConversationUpdateWithWhereUniqueWithoutUserAInput | Prisma.ChatConversationUpdateWithWhereUniqueWithoutUserAInput[];
    updateMany?: Prisma.ChatConversationUpdateManyWithWhereWithoutUserAInput | Prisma.ChatConversationUpdateManyWithWhereWithoutUserAInput[];
    deleteMany?: Prisma.ChatConversationScalarWhereInput | Prisma.ChatConversationScalarWhereInput[];
};
export type ChatConversationUncheckedUpdateManyWithoutUserBNestedInput = {
    create?: Prisma.XOR<Prisma.ChatConversationCreateWithoutUserBInput, Prisma.ChatConversationUncheckedCreateWithoutUserBInput> | Prisma.ChatConversationCreateWithoutUserBInput[] | Prisma.ChatConversationUncheckedCreateWithoutUserBInput[];
    connectOrCreate?: Prisma.ChatConversationCreateOrConnectWithoutUserBInput | Prisma.ChatConversationCreateOrConnectWithoutUserBInput[];
    upsert?: Prisma.ChatConversationUpsertWithWhereUniqueWithoutUserBInput | Prisma.ChatConversationUpsertWithWhereUniqueWithoutUserBInput[];
    createMany?: Prisma.ChatConversationCreateManyUserBInputEnvelope;
    set?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    disconnect?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    delete?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    connect?: Prisma.ChatConversationWhereUniqueInput | Prisma.ChatConversationWhereUniqueInput[];
    update?: Prisma.ChatConversationUpdateWithWhereUniqueWithoutUserBInput | Prisma.ChatConversationUpdateWithWhereUniqueWithoutUserBInput[];
    updateMany?: Prisma.ChatConversationUpdateManyWithWhereWithoutUserBInput | Prisma.ChatConversationUpdateManyWithWhereWithoutUserBInput[];
    deleteMany?: Prisma.ChatConversationScalarWhereInput | Prisma.ChatConversationScalarWhereInput[];
};
export type ChatConversationCreateNestedOneWithoutMessagesInput = {
    create?: Prisma.XOR<Prisma.ChatConversationCreateWithoutMessagesInput, Prisma.ChatConversationUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.ChatConversationCreateOrConnectWithoutMessagesInput;
    connect?: Prisma.ChatConversationWhereUniqueInput;
};
export type ChatConversationUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: Prisma.XOR<Prisma.ChatConversationCreateWithoutMessagesInput, Prisma.ChatConversationUncheckedCreateWithoutMessagesInput>;
    connectOrCreate?: Prisma.ChatConversationCreateOrConnectWithoutMessagesInput;
    upsert?: Prisma.ChatConversationUpsertWithoutMessagesInput;
    connect?: Prisma.ChatConversationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ChatConversationUpdateToOneWithWhereWithoutMessagesInput, Prisma.ChatConversationUpdateWithoutMessagesInput>, Prisma.ChatConversationUncheckedUpdateWithoutMessagesInput>;
};
export type ChatConversationCreateWithoutUserAInput = {
    id?: string;
    lastMessageAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userB: Prisma.UsersCreateNestedOneWithoutConversationsAsUserBInput;
    messages?: Prisma.ChatMessageCreateNestedManyWithoutConversationInput;
};
export type ChatConversationUncheckedCreateWithoutUserAInput = {
    id?: string;
    userBId: string;
    lastMessageAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ChatConversationCreateOrConnectWithoutUserAInput = {
    where: Prisma.ChatConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChatConversationCreateWithoutUserAInput, Prisma.ChatConversationUncheckedCreateWithoutUserAInput>;
};
export type ChatConversationCreateManyUserAInputEnvelope = {
    data: Prisma.ChatConversationCreateManyUserAInput | Prisma.ChatConversationCreateManyUserAInput[];
    skipDuplicates?: boolean;
};
export type ChatConversationCreateWithoutUserBInput = {
    id?: string;
    lastMessageAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userA: Prisma.UsersCreateNestedOneWithoutConversationsAsUserAInput;
    messages?: Prisma.ChatMessageCreateNestedManyWithoutConversationInput;
};
export type ChatConversationUncheckedCreateWithoutUserBInput = {
    id?: string;
    userAId: string;
    lastMessageAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    messages?: Prisma.ChatMessageUncheckedCreateNestedManyWithoutConversationInput;
};
export type ChatConversationCreateOrConnectWithoutUserBInput = {
    where: Prisma.ChatConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChatConversationCreateWithoutUserBInput, Prisma.ChatConversationUncheckedCreateWithoutUserBInput>;
};
export type ChatConversationCreateManyUserBInputEnvelope = {
    data: Prisma.ChatConversationCreateManyUserBInput | Prisma.ChatConversationCreateManyUserBInput[];
    skipDuplicates?: boolean;
};
export type ChatConversationUpsertWithWhereUniqueWithoutUserAInput = {
    where: Prisma.ChatConversationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChatConversationUpdateWithoutUserAInput, Prisma.ChatConversationUncheckedUpdateWithoutUserAInput>;
    create: Prisma.XOR<Prisma.ChatConversationCreateWithoutUserAInput, Prisma.ChatConversationUncheckedCreateWithoutUserAInput>;
};
export type ChatConversationUpdateWithWhereUniqueWithoutUserAInput = {
    where: Prisma.ChatConversationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChatConversationUpdateWithoutUserAInput, Prisma.ChatConversationUncheckedUpdateWithoutUserAInput>;
};
export type ChatConversationUpdateManyWithWhereWithoutUserAInput = {
    where: Prisma.ChatConversationScalarWhereInput;
    data: Prisma.XOR<Prisma.ChatConversationUpdateManyMutationInput, Prisma.ChatConversationUncheckedUpdateManyWithoutUserAInput>;
};
export type ChatConversationScalarWhereInput = {
    AND?: Prisma.ChatConversationScalarWhereInput | Prisma.ChatConversationScalarWhereInput[];
    OR?: Prisma.ChatConversationScalarWhereInput[];
    NOT?: Prisma.ChatConversationScalarWhereInput | Prisma.ChatConversationScalarWhereInput[];
    id?: Prisma.StringFilter<"ChatConversation"> | string;
    userAId?: Prisma.StringFilter<"ChatConversation"> | string;
    userBId?: Prisma.StringFilter<"ChatConversation"> | string;
    lastMessageAt?: Prisma.DateTimeFilter<"ChatConversation"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"ChatConversation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ChatConversation"> | Date | string;
};
export type ChatConversationUpsertWithWhereUniqueWithoutUserBInput = {
    where: Prisma.ChatConversationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChatConversationUpdateWithoutUserBInput, Prisma.ChatConversationUncheckedUpdateWithoutUserBInput>;
    create: Prisma.XOR<Prisma.ChatConversationCreateWithoutUserBInput, Prisma.ChatConversationUncheckedCreateWithoutUserBInput>;
};
export type ChatConversationUpdateWithWhereUniqueWithoutUserBInput = {
    where: Prisma.ChatConversationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChatConversationUpdateWithoutUserBInput, Prisma.ChatConversationUncheckedUpdateWithoutUserBInput>;
};
export type ChatConversationUpdateManyWithWhereWithoutUserBInput = {
    where: Prisma.ChatConversationScalarWhereInput;
    data: Prisma.XOR<Prisma.ChatConversationUpdateManyMutationInput, Prisma.ChatConversationUncheckedUpdateManyWithoutUserBInput>;
};
export type ChatConversationCreateWithoutMessagesInput = {
    id?: string;
    lastMessageAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    userA: Prisma.UsersCreateNestedOneWithoutConversationsAsUserAInput;
    userB: Prisma.UsersCreateNestedOneWithoutConversationsAsUserBInput;
};
export type ChatConversationUncheckedCreateWithoutMessagesInput = {
    id?: string;
    userAId: string;
    userBId: string;
    lastMessageAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChatConversationCreateOrConnectWithoutMessagesInput = {
    where: Prisma.ChatConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChatConversationCreateWithoutMessagesInput, Prisma.ChatConversationUncheckedCreateWithoutMessagesInput>;
};
export type ChatConversationUpsertWithoutMessagesInput = {
    update: Prisma.XOR<Prisma.ChatConversationUpdateWithoutMessagesInput, Prisma.ChatConversationUncheckedUpdateWithoutMessagesInput>;
    create: Prisma.XOR<Prisma.ChatConversationCreateWithoutMessagesInput, Prisma.ChatConversationUncheckedCreateWithoutMessagesInput>;
    where?: Prisma.ChatConversationWhereInput;
};
export type ChatConversationUpdateToOneWithWhereWithoutMessagesInput = {
    where?: Prisma.ChatConversationWhereInput;
    data: Prisma.XOR<Prisma.ChatConversationUpdateWithoutMessagesInput, Prisma.ChatConversationUncheckedUpdateWithoutMessagesInput>;
};
export type ChatConversationUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userA?: Prisma.UsersUpdateOneRequiredWithoutConversationsAsUserANestedInput;
    userB?: Prisma.UsersUpdateOneRequiredWithoutConversationsAsUserBNestedInput;
};
export type ChatConversationUncheckedUpdateWithoutMessagesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userAId?: Prisma.StringFieldUpdateOperationsInput | string;
    userBId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatConversationCreateManyUserAInput = {
    id?: string;
    userBId: string;
    lastMessageAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChatConversationCreateManyUserBInput = {
    id?: string;
    userAId: string;
    lastMessageAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChatConversationUpdateWithoutUserAInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userB?: Prisma.UsersUpdateOneRequiredWithoutConversationsAsUserBNestedInput;
    messages?: Prisma.ChatMessageUpdateManyWithoutConversationNestedInput;
};
export type ChatConversationUncheckedUpdateWithoutUserAInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userBId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.ChatMessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ChatConversationUncheckedUpdateManyWithoutUserAInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userBId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatConversationUpdateWithoutUserBInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    userA?: Prisma.UsersUpdateOneRequiredWithoutConversationsAsUserANestedInput;
    messages?: Prisma.ChatMessageUpdateManyWithoutConversationNestedInput;
};
export type ChatConversationUncheckedUpdateWithoutUserBInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userAId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    messages?: Prisma.ChatMessageUncheckedUpdateManyWithoutConversationNestedInput;
};
export type ChatConversationUncheckedUpdateManyWithoutUserBInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userAId?: Prisma.StringFieldUpdateOperationsInput | string;
    lastMessageAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatConversationCountOutputType = {
    messages: number;
};
export type ChatConversationCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    messages?: boolean | ChatConversationCountOutputTypeCountMessagesArgs;
};
export type ChatConversationCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatConversationCountOutputTypeSelect<ExtArgs> | null;
};
export type ChatConversationCountOutputTypeCountMessagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatMessageWhereInput;
};
export type ChatConversationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userAId?: boolean;
    userBId?: boolean;
    lastMessageAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userA?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    userB?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    messages?: boolean | Prisma.ChatConversation$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.ChatConversationCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chatConversation"]>;
export type ChatConversationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userAId?: boolean;
    userBId?: boolean;
    lastMessageAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userA?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    userB?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chatConversation"]>;
export type ChatConversationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userAId?: boolean;
    userBId?: boolean;
    lastMessageAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    userA?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    userB?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chatConversation"]>;
export type ChatConversationSelectScalar = {
    id?: boolean;
    userAId?: boolean;
    userBId?: boolean;
    lastMessageAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ChatConversationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userAId" | "userBId" | "lastMessageAt" | "createdAt" | "updatedAt", ExtArgs["result"]["chatConversation"]>;
export type ChatConversationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    userA?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    userB?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    messages?: boolean | Prisma.ChatConversation$messagesArgs<ExtArgs>;
    _count?: boolean | Prisma.ChatConversationCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ChatConversationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    userA?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    userB?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type ChatConversationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    userA?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
    userB?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $ChatConversationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ChatConversation";
    objects: {
        userA: Prisma.$UsersPayload<ExtArgs>;
        userB: Prisma.$UsersPayload<ExtArgs>;
        messages: Prisma.$ChatMessagePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userAId: string;
        userBId: string;
        lastMessageAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["chatConversation"]>;
    composites: {};
};
export type ChatConversationGetPayload<S extends boolean | null | undefined | ChatConversationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload, S>;
export type ChatConversationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ChatConversationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ChatConversationCountAggregateInputType | true;
};
export interface ChatConversationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ChatConversation'];
        meta: {
            name: 'ChatConversation';
        };
    };
    findUnique<T extends ChatConversationFindUniqueArgs>(args: Prisma.SelectSubset<T, ChatConversationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ChatConversationClient<runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ChatConversationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ChatConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChatConversationClient<runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ChatConversationFindFirstArgs>(args?: Prisma.SelectSubset<T, ChatConversationFindFirstArgs<ExtArgs>>): Prisma.Prisma__ChatConversationClient<runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ChatConversationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ChatConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChatConversationClient<runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ChatConversationFindManyArgs>(args?: Prisma.SelectSubset<T, ChatConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ChatConversationCreateArgs>(args: Prisma.SelectSubset<T, ChatConversationCreateArgs<ExtArgs>>): Prisma.Prisma__ChatConversationClient<runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ChatConversationCreateManyArgs>(args?: Prisma.SelectSubset<T, ChatConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ChatConversationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ChatConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ChatConversationDeleteArgs>(args: Prisma.SelectSubset<T, ChatConversationDeleteArgs<ExtArgs>>): Prisma.Prisma__ChatConversationClient<runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ChatConversationUpdateArgs>(args: Prisma.SelectSubset<T, ChatConversationUpdateArgs<ExtArgs>>): Prisma.Prisma__ChatConversationClient<runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ChatConversationDeleteManyArgs>(args?: Prisma.SelectSubset<T, ChatConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ChatConversationUpdateManyArgs>(args: Prisma.SelectSubset<T, ChatConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ChatConversationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ChatConversationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ChatConversationUpsertArgs>(args: Prisma.SelectSubset<T, ChatConversationUpsertArgs<ExtArgs>>): Prisma.Prisma__ChatConversationClient<runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ChatConversationCountArgs>(args?: Prisma.Subset<T, ChatConversationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ChatConversationCountAggregateOutputType> : number>;
    aggregate<T extends ChatConversationAggregateArgs>(args: Prisma.Subset<T, ChatConversationAggregateArgs>): Prisma.PrismaPromise<GetChatConversationAggregateType<T>>;
    groupBy<T extends ChatConversationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ChatConversationGroupByArgs['orderBy'];
    } : {
        orderBy?: ChatConversationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ChatConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ChatConversationFieldRefs;
}
export interface Prisma__ChatConversationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    userA<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    userB<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    messages<T extends Prisma.ChatConversation$messagesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ChatConversation$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ChatConversationFieldRefs {
    readonly id: Prisma.FieldRef<"ChatConversation", 'String'>;
    readonly userAId: Prisma.FieldRef<"ChatConversation", 'String'>;
    readonly userBId: Prisma.FieldRef<"ChatConversation", 'String'>;
    readonly lastMessageAt: Prisma.FieldRef<"ChatConversation", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"ChatConversation", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ChatConversation", 'DateTime'>;
}
export type ChatConversationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatConversationSelect<ExtArgs> | null;
    omit?: Prisma.ChatConversationOmit<ExtArgs> | null;
    include?: Prisma.ChatConversationInclude<ExtArgs> | null;
    where: Prisma.ChatConversationWhereUniqueInput;
};
export type ChatConversationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatConversationSelect<ExtArgs> | null;
    omit?: Prisma.ChatConversationOmit<ExtArgs> | null;
    include?: Prisma.ChatConversationInclude<ExtArgs> | null;
    where: Prisma.ChatConversationWhereUniqueInput;
};
export type ChatConversationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatConversationSelect<ExtArgs> | null;
    omit?: Prisma.ChatConversationOmit<ExtArgs> | null;
    include?: Prisma.ChatConversationInclude<ExtArgs> | null;
    where?: Prisma.ChatConversationWhereInput;
    orderBy?: Prisma.ChatConversationOrderByWithRelationInput | Prisma.ChatConversationOrderByWithRelationInput[];
    cursor?: Prisma.ChatConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatConversationScalarFieldEnum | Prisma.ChatConversationScalarFieldEnum[];
};
export type ChatConversationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatConversationSelect<ExtArgs> | null;
    omit?: Prisma.ChatConversationOmit<ExtArgs> | null;
    include?: Prisma.ChatConversationInclude<ExtArgs> | null;
    where?: Prisma.ChatConversationWhereInput;
    orderBy?: Prisma.ChatConversationOrderByWithRelationInput | Prisma.ChatConversationOrderByWithRelationInput[];
    cursor?: Prisma.ChatConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatConversationScalarFieldEnum | Prisma.ChatConversationScalarFieldEnum[];
};
export type ChatConversationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatConversationSelect<ExtArgs> | null;
    omit?: Prisma.ChatConversationOmit<ExtArgs> | null;
    include?: Prisma.ChatConversationInclude<ExtArgs> | null;
    where?: Prisma.ChatConversationWhereInput;
    orderBy?: Prisma.ChatConversationOrderByWithRelationInput | Prisma.ChatConversationOrderByWithRelationInput[];
    cursor?: Prisma.ChatConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatConversationScalarFieldEnum | Prisma.ChatConversationScalarFieldEnum[];
};
export type ChatConversationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatConversationSelect<ExtArgs> | null;
    omit?: Prisma.ChatConversationOmit<ExtArgs> | null;
    include?: Prisma.ChatConversationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChatConversationCreateInput, Prisma.ChatConversationUncheckedCreateInput>;
};
export type ChatConversationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ChatConversationCreateManyInput | Prisma.ChatConversationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ChatConversationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatConversationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ChatConversationOmit<ExtArgs> | null;
    data: Prisma.ChatConversationCreateManyInput | Prisma.ChatConversationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ChatConversationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ChatConversationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatConversationSelect<ExtArgs> | null;
    omit?: Prisma.ChatConversationOmit<ExtArgs> | null;
    include?: Prisma.ChatConversationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChatConversationUpdateInput, Prisma.ChatConversationUncheckedUpdateInput>;
    where: Prisma.ChatConversationWhereUniqueInput;
};
export type ChatConversationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ChatConversationUpdateManyMutationInput, Prisma.ChatConversationUncheckedUpdateManyInput>;
    where?: Prisma.ChatConversationWhereInput;
    limit?: number;
};
export type ChatConversationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatConversationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ChatConversationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChatConversationUpdateManyMutationInput, Prisma.ChatConversationUncheckedUpdateManyInput>;
    where?: Prisma.ChatConversationWhereInput;
    limit?: number;
    include?: Prisma.ChatConversationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ChatConversationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatConversationSelect<ExtArgs> | null;
    omit?: Prisma.ChatConversationOmit<ExtArgs> | null;
    include?: Prisma.ChatConversationInclude<ExtArgs> | null;
    where: Prisma.ChatConversationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChatConversationCreateInput, Prisma.ChatConversationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ChatConversationUpdateInput, Prisma.ChatConversationUncheckedUpdateInput>;
};
export type ChatConversationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatConversationSelect<ExtArgs> | null;
    omit?: Prisma.ChatConversationOmit<ExtArgs> | null;
    include?: Prisma.ChatConversationInclude<ExtArgs> | null;
    where: Prisma.ChatConversationWhereUniqueInput;
};
export type ChatConversationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatConversationWhereInput;
    limit?: number;
};
export type ChatConversation$messagesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    where?: Prisma.ChatMessageWhereInput;
    orderBy?: Prisma.ChatMessageOrderByWithRelationInput | Prisma.ChatMessageOrderByWithRelationInput[];
    cursor?: Prisma.ChatMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatMessageScalarFieldEnum | Prisma.ChatMessageScalarFieldEnum[];
};
export type ChatConversationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatConversationSelect<ExtArgs> | null;
    omit?: Prisma.ChatConversationOmit<ExtArgs> | null;
    include?: Prisma.ChatConversationInclude<ExtArgs> | null;
};
