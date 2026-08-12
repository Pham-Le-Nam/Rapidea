import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ChatMessageModel = runtime.Types.Result.DefaultSelection<Prisma.$ChatMessagePayload>;
export type AggregateChatMessage = {
    _count: ChatMessageCountAggregateOutputType | null;
    _min: ChatMessageMinAggregateOutputType | null;
    _max: ChatMessageMaxAggregateOutputType | null;
};
export type ChatMessageMinAggregateOutputType = {
    id: string | null;
    conversationId: string | null;
    senderId: string | null;
    text: string | null;
    readAt: Date | null;
    createdAt: Date | null;
};
export type ChatMessageMaxAggregateOutputType = {
    id: string | null;
    conversationId: string | null;
    senderId: string | null;
    text: string | null;
    readAt: Date | null;
    createdAt: Date | null;
};
export type ChatMessageCountAggregateOutputType = {
    id: number;
    conversationId: number;
    senderId: number;
    text: number;
    readAt: number;
    createdAt: number;
    _all: number;
};
export type ChatMessageMinAggregateInputType = {
    id?: true;
    conversationId?: true;
    senderId?: true;
    text?: true;
    readAt?: true;
    createdAt?: true;
};
export type ChatMessageMaxAggregateInputType = {
    id?: true;
    conversationId?: true;
    senderId?: true;
    text?: true;
    readAt?: true;
    createdAt?: true;
};
export type ChatMessageCountAggregateInputType = {
    id?: true;
    conversationId?: true;
    senderId?: true;
    text?: true;
    readAt?: true;
    createdAt?: true;
    _all?: true;
};
export type ChatMessageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatMessageWhereInput;
    orderBy?: Prisma.ChatMessageOrderByWithRelationInput | Prisma.ChatMessageOrderByWithRelationInput[];
    cursor?: Prisma.ChatMessageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ChatMessageCountAggregateInputType;
    _min?: ChatMessageMinAggregateInputType;
    _max?: ChatMessageMaxAggregateInputType;
};
export type GetChatMessageAggregateType<T extends ChatMessageAggregateArgs> = {
    [P in keyof T & keyof AggregateChatMessage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChatMessage[P]> : Prisma.GetScalarType<T[P], AggregateChatMessage[P]>;
};
export type ChatMessageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatMessageWhereInput;
    orderBy?: Prisma.ChatMessageOrderByWithAggregationInput | Prisma.ChatMessageOrderByWithAggregationInput[];
    by: Prisma.ChatMessageScalarFieldEnum[] | Prisma.ChatMessageScalarFieldEnum;
    having?: Prisma.ChatMessageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChatMessageCountAggregateInputType | true;
    _min?: ChatMessageMinAggregateInputType;
    _max?: ChatMessageMaxAggregateInputType;
};
export type ChatMessageGroupByOutputType = {
    id: string;
    conversationId: string;
    senderId: string;
    text: string;
    readAt: Date | null;
    createdAt: Date;
    _count: ChatMessageCountAggregateOutputType | null;
    _min: ChatMessageMinAggregateOutputType | null;
    _max: ChatMessageMaxAggregateOutputType | null;
};
export type GetChatMessageGroupByPayload<T extends ChatMessageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ChatMessageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ChatMessageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ChatMessageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ChatMessageGroupByOutputType[P]>;
}>>;
export type ChatMessageWhereInput = {
    AND?: Prisma.ChatMessageWhereInput | Prisma.ChatMessageWhereInput[];
    OR?: Prisma.ChatMessageWhereInput[];
    NOT?: Prisma.ChatMessageWhereInput | Prisma.ChatMessageWhereInput[];
    id?: Prisma.StringFilter<"ChatMessage"> | string;
    conversationId?: Prisma.StringFilter<"ChatMessage"> | string;
    senderId?: Prisma.StringFilter<"ChatMessage"> | string;
    text?: Prisma.StringFilter<"ChatMessage"> | string;
    readAt?: Prisma.DateTimeNullableFilter<"ChatMessage"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ChatMessage"> | Date | string;
    conversation?: Prisma.XOR<Prisma.ChatConversationScalarRelationFilter, Prisma.ChatConversationWhereInput>;
    sender?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
};
export type ChatMessageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    readAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    conversation?: Prisma.ChatConversationOrderByWithRelationInput;
    sender?: Prisma.UsersOrderByWithRelationInput;
};
export type ChatMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ChatMessageWhereInput | Prisma.ChatMessageWhereInput[];
    OR?: Prisma.ChatMessageWhereInput[];
    NOT?: Prisma.ChatMessageWhereInput | Prisma.ChatMessageWhereInput[];
    conversationId?: Prisma.StringFilter<"ChatMessage"> | string;
    senderId?: Prisma.StringFilter<"ChatMessage"> | string;
    text?: Prisma.StringFilter<"ChatMessage"> | string;
    readAt?: Prisma.DateTimeNullableFilter<"ChatMessage"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ChatMessage"> | Date | string;
    conversation?: Prisma.XOR<Prisma.ChatConversationScalarRelationFilter, Prisma.ChatConversationWhereInput>;
    sender?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
}, "id">;
export type ChatMessageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    readAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ChatMessageCountOrderByAggregateInput;
    _max?: Prisma.ChatMessageMaxOrderByAggregateInput;
    _min?: Prisma.ChatMessageMinOrderByAggregateInput;
};
export type ChatMessageScalarWhereWithAggregatesInput = {
    AND?: Prisma.ChatMessageScalarWhereWithAggregatesInput | Prisma.ChatMessageScalarWhereWithAggregatesInput[];
    OR?: Prisma.ChatMessageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ChatMessageScalarWhereWithAggregatesInput | Prisma.ChatMessageScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ChatMessage"> | string;
    conversationId?: Prisma.StringWithAggregatesFilter<"ChatMessage"> | string;
    senderId?: Prisma.StringWithAggregatesFilter<"ChatMessage"> | string;
    text?: Prisma.StringWithAggregatesFilter<"ChatMessage"> | string;
    readAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ChatMessage"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ChatMessage"> | Date | string;
};
export type ChatMessageCreateInput = {
    id?: string;
    text: string;
    readAt?: Date | string | null;
    createdAt?: Date | string;
    conversation: Prisma.ChatConversationCreateNestedOneWithoutMessagesInput;
    sender: Prisma.UsersCreateNestedOneWithoutSentChatMessagesInput;
};
export type ChatMessageUncheckedCreateInput = {
    id?: string;
    conversationId: string;
    senderId: string;
    text: string;
    readAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ChatMessageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    conversation?: Prisma.ChatConversationUpdateOneRequiredWithoutMessagesNestedInput;
    sender?: Prisma.UsersUpdateOneRequiredWithoutSentChatMessagesNestedInput;
};
export type ChatMessageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageCreateManyInput = {
    id?: string;
    conversationId: string;
    senderId: string;
    text: string;
    readAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ChatMessageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageListRelationFilter = {
    every?: Prisma.ChatMessageWhereInput;
    some?: Prisma.ChatMessageWhereInput;
    none?: Prisma.ChatMessageWhereInput;
};
export type ChatMessageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ChatMessageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    readAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ChatMessageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    readAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ChatMessageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    conversationId?: Prisma.SortOrder;
    senderId?: Prisma.SortOrder;
    text?: Prisma.SortOrder;
    readAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ChatMessageCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutSenderInput, Prisma.ChatMessageUncheckedCreateWithoutSenderInput> | Prisma.ChatMessageCreateWithoutSenderInput[] | Prisma.ChatMessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutSenderInput | Prisma.ChatMessageCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.ChatMessageCreateManySenderInputEnvelope;
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
};
export type ChatMessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutSenderInput, Prisma.ChatMessageUncheckedCreateWithoutSenderInput> | Prisma.ChatMessageCreateWithoutSenderInput[] | Prisma.ChatMessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutSenderInput | Prisma.ChatMessageCreateOrConnectWithoutSenderInput[];
    createMany?: Prisma.ChatMessageCreateManySenderInputEnvelope;
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
};
export type ChatMessageUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutSenderInput, Prisma.ChatMessageUncheckedCreateWithoutSenderInput> | Prisma.ChatMessageCreateWithoutSenderInput[] | Prisma.ChatMessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutSenderInput | Prisma.ChatMessageCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.ChatMessageUpsertWithWhereUniqueWithoutSenderInput | Prisma.ChatMessageUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.ChatMessageCreateManySenderInputEnvelope;
    set?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    disconnect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    delete?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    update?: Prisma.ChatMessageUpdateWithWhereUniqueWithoutSenderInput | Prisma.ChatMessageUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.ChatMessageUpdateManyWithWhereWithoutSenderInput | Prisma.ChatMessageUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.ChatMessageScalarWhereInput | Prisma.ChatMessageScalarWhereInput[];
};
export type ChatMessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutSenderInput, Prisma.ChatMessageUncheckedCreateWithoutSenderInput> | Prisma.ChatMessageCreateWithoutSenderInput[] | Prisma.ChatMessageUncheckedCreateWithoutSenderInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutSenderInput | Prisma.ChatMessageCreateOrConnectWithoutSenderInput[];
    upsert?: Prisma.ChatMessageUpsertWithWhereUniqueWithoutSenderInput | Prisma.ChatMessageUpsertWithWhereUniqueWithoutSenderInput[];
    createMany?: Prisma.ChatMessageCreateManySenderInputEnvelope;
    set?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    disconnect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    delete?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    update?: Prisma.ChatMessageUpdateWithWhereUniqueWithoutSenderInput | Prisma.ChatMessageUpdateWithWhereUniqueWithoutSenderInput[];
    updateMany?: Prisma.ChatMessageUpdateManyWithWhereWithoutSenderInput | Prisma.ChatMessageUpdateManyWithWhereWithoutSenderInput[];
    deleteMany?: Prisma.ChatMessageScalarWhereInput | Prisma.ChatMessageScalarWhereInput[];
};
export type ChatMessageCreateNestedManyWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutConversationInput, Prisma.ChatMessageUncheckedCreateWithoutConversationInput> | Prisma.ChatMessageCreateWithoutConversationInput[] | Prisma.ChatMessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutConversationInput | Prisma.ChatMessageCreateOrConnectWithoutConversationInput[];
    createMany?: Prisma.ChatMessageCreateManyConversationInputEnvelope;
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
};
export type ChatMessageUncheckedCreateNestedManyWithoutConversationInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutConversationInput, Prisma.ChatMessageUncheckedCreateWithoutConversationInput> | Prisma.ChatMessageCreateWithoutConversationInput[] | Prisma.ChatMessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutConversationInput | Prisma.ChatMessageCreateOrConnectWithoutConversationInput[];
    createMany?: Prisma.ChatMessageCreateManyConversationInputEnvelope;
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
};
export type ChatMessageUpdateManyWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutConversationInput, Prisma.ChatMessageUncheckedCreateWithoutConversationInput> | Prisma.ChatMessageCreateWithoutConversationInput[] | Prisma.ChatMessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutConversationInput | Prisma.ChatMessageCreateOrConnectWithoutConversationInput[];
    upsert?: Prisma.ChatMessageUpsertWithWhereUniqueWithoutConversationInput | Prisma.ChatMessageUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: Prisma.ChatMessageCreateManyConversationInputEnvelope;
    set?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    disconnect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    delete?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    update?: Prisma.ChatMessageUpdateWithWhereUniqueWithoutConversationInput | Prisma.ChatMessageUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?: Prisma.ChatMessageUpdateManyWithWhereWithoutConversationInput | Prisma.ChatMessageUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: Prisma.ChatMessageScalarWhereInput | Prisma.ChatMessageScalarWhereInput[];
};
export type ChatMessageUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: Prisma.XOR<Prisma.ChatMessageCreateWithoutConversationInput, Prisma.ChatMessageUncheckedCreateWithoutConversationInput> | Prisma.ChatMessageCreateWithoutConversationInput[] | Prisma.ChatMessageUncheckedCreateWithoutConversationInput[];
    connectOrCreate?: Prisma.ChatMessageCreateOrConnectWithoutConversationInput | Prisma.ChatMessageCreateOrConnectWithoutConversationInput[];
    upsert?: Prisma.ChatMessageUpsertWithWhereUniqueWithoutConversationInput | Prisma.ChatMessageUpsertWithWhereUniqueWithoutConversationInput[];
    createMany?: Prisma.ChatMessageCreateManyConversationInputEnvelope;
    set?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    disconnect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    delete?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    connect?: Prisma.ChatMessageWhereUniqueInput | Prisma.ChatMessageWhereUniqueInput[];
    update?: Prisma.ChatMessageUpdateWithWhereUniqueWithoutConversationInput | Prisma.ChatMessageUpdateWithWhereUniqueWithoutConversationInput[];
    updateMany?: Prisma.ChatMessageUpdateManyWithWhereWithoutConversationInput | Prisma.ChatMessageUpdateManyWithWhereWithoutConversationInput[];
    deleteMany?: Prisma.ChatMessageScalarWhereInput | Prisma.ChatMessageScalarWhereInput[];
};
export type ChatMessageCreateWithoutSenderInput = {
    id?: string;
    text: string;
    readAt?: Date | string | null;
    createdAt?: Date | string;
    conversation: Prisma.ChatConversationCreateNestedOneWithoutMessagesInput;
};
export type ChatMessageUncheckedCreateWithoutSenderInput = {
    id?: string;
    conversationId: string;
    text: string;
    readAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ChatMessageCreateOrConnectWithoutSenderInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChatMessageCreateWithoutSenderInput, Prisma.ChatMessageUncheckedCreateWithoutSenderInput>;
};
export type ChatMessageCreateManySenderInputEnvelope = {
    data: Prisma.ChatMessageCreateManySenderInput | Prisma.ChatMessageCreateManySenderInput[];
    skipDuplicates?: boolean;
};
export type ChatMessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChatMessageUpdateWithoutSenderInput, Prisma.ChatMessageUncheckedUpdateWithoutSenderInput>;
    create: Prisma.XOR<Prisma.ChatMessageCreateWithoutSenderInput, Prisma.ChatMessageUncheckedCreateWithoutSenderInput>;
};
export type ChatMessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChatMessageUpdateWithoutSenderInput, Prisma.ChatMessageUncheckedUpdateWithoutSenderInput>;
};
export type ChatMessageUpdateManyWithWhereWithoutSenderInput = {
    where: Prisma.ChatMessageScalarWhereInput;
    data: Prisma.XOR<Prisma.ChatMessageUpdateManyMutationInput, Prisma.ChatMessageUncheckedUpdateManyWithoutSenderInput>;
};
export type ChatMessageScalarWhereInput = {
    AND?: Prisma.ChatMessageScalarWhereInput | Prisma.ChatMessageScalarWhereInput[];
    OR?: Prisma.ChatMessageScalarWhereInput[];
    NOT?: Prisma.ChatMessageScalarWhereInput | Prisma.ChatMessageScalarWhereInput[];
    id?: Prisma.StringFilter<"ChatMessage"> | string;
    conversationId?: Prisma.StringFilter<"ChatMessage"> | string;
    senderId?: Prisma.StringFilter<"ChatMessage"> | string;
    text?: Prisma.StringFilter<"ChatMessage"> | string;
    readAt?: Prisma.DateTimeNullableFilter<"ChatMessage"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ChatMessage"> | Date | string;
};
export type ChatMessageCreateWithoutConversationInput = {
    id?: string;
    text: string;
    readAt?: Date | string | null;
    createdAt?: Date | string;
    sender: Prisma.UsersCreateNestedOneWithoutSentChatMessagesInput;
};
export type ChatMessageUncheckedCreateWithoutConversationInput = {
    id?: string;
    senderId: string;
    text: string;
    readAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ChatMessageCreateOrConnectWithoutConversationInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChatMessageCreateWithoutConversationInput, Prisma.ChatMessageUncheckedCreateWithoutConversationInput>;
};
export type ChatMessageCreateManyConversationInputEnvelope = {
    data: Prisma.ChatMessageCreateManyConversationInput | Prisma.ChatMessageCreateManyConversationInput[];
    skipDuplicates?: boolean;
};
export type ChatMessageUpsertWithWhereUniqueWithoutConversationInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChatMessageUpdateWithoutConversationInput, Prisma.ChatMessageUncheckedUpdateWithoutConversationInput>;
    create: Prisma.XOR<Prisma.ChatMessageCreateWithoutConversationInput, Prisma.ChatMessageUncheckedCreateWithoutConversationInput>;
};
export type ChatMessageUpdateWithWhereUniqueWithoutConversationInput = {
    where: Prisma.ChatMessageWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChatMessageUpdateWithoutConversationInput, Prisma.ChatMessageUncheckedUpdateWithoutConversationInput>;
};
export type ChatMessageUpdateManyWithWhereWithoutConversationInput = {
    where: Prisma.ChatMessageScalarWhereInput;
    data: Prisma.XOR<Prisma.ChatMessageUpdateManyMutationInput, Prisma.ChatMessageUncheckedUpdateManyWithoutConversationInput>;
};
export type ChatMessageCreateManySenderInput = {
    id?: string;
    conversationId: string;
    text: string;
    readAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ChatMessageUpdateWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    conversation?: Prisma.ChatConversationUpdateOneRequiredWithoutMessagesNestedInput;
};
export type ChatMessageUncheckedUpdateWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageUncheckedUpdateManyWithoutSenderInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    conversationId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageCreateManyConversationInput = {
    id?: string;
    senderId: string;
    text: string;
    readAt?: Date | string | null;
    createdAt?: Date | string;
};
export type ChatMessageUpdateWithoutConversationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sender?: Prisma.UsersUpdateOneRequiredWithoutSentChatMessagesNestedInput;
};
export type ChatMessageUncheckedUpdateWithoutConversationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageUncheckedUpdateManyWithoutConversationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    senderId?: Prisma.StringFieldUpdateOperationsInput | string;
    text?: Prisma.StringFieldUpdateOperationsInput | string;
    readAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChatMessageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conversationId?: boolean;
    senderId?: boolean;
    text?: boolean;
    readAt?: boolean;
    createdAt?: boolean;
    conversation?: boolean | Prisma.ChatConversationDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chatMessage"]>;
export type ChatMessageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conversationId?: boolean;
    senderId?: boolean;
    text?: boolean;
    readAt?: boolean;
    createdAt?: boolean;
    conversation?: boolean | Prisma.ChatConversationDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chatMessage"]>;
export type ChatMessageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    conversationId?: boolean;
    senderId?: boolean;
    text?: boolean;
    readAt?: boolean;
    createdAt?: boolean;
    conversation?: boolean | Prisma.ChatConversationDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chatMessage"]>;
export type ChatMessageSelectScalar = {
    id?: boolean;
    conversationId?: boolean;
    senderId?: boolean;
    text?: boolean;
    readAt?: boolean;
    createdAt?: boolean;
};
export type ChatMessageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "conversationId" | "senderId" | "text" | "readAt" | "createdAt", ExtArgs["result"]["chatMessage"]>;
export type ChatMessageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ChatConversationDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type ChatMessageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ChatConversationDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type ChatMessageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    conversation?: boolean | Prisma.ChatConversationDefaultArgs<ExtArgs>;
    sender?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $ChatMessagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ChatMessage";
    objects: {
        conversation: Prisma.$ChatConversationPayload<ExtArgs>;
        sender: Prisma.$UsersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        conversationId: string;
        senderId: string;
        text: string;
        readAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["chatMessage"]>;
    composites: {};
};
export type ChatMessageGetPayload<S extends boolean | null | undefined | ChatMessageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload, S>;
export type ChatMessageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ChatMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ChatMessageCountAggregateInputType | true;
};
export interface ChatMessageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ChatMessage'];
        meta: {
            name: 'ChatMessage';
        };
    };
    findUnique<T extends ChatMessageFindUniqueArgs>(args: Prisma.SelectSubset<T, ChatMessageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ChatMessageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ChatMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ChatMessageFindFirstArgs>(args?: Prisma.SelectSubset<T, ChatMessageFindFirstArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ChatMessageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ChatMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ChatMessageFindManyArgs>(args?: Prisma.SelectSubset<T, ChatMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ChatMessageCreateArgs>(args: Prisma.SelectSubset<T, ChatMessageCreateArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ChatMessageCreateManyArgs>(args?: Prisma.SelectSubset<T, ChatMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ChatMessageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ChatMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ChatMessageDeleteArgs>(args: Prisma.SelectSubset<T, ChatMessageDeleteArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ChatMessageUpdateArgs>(args: Prisma.SelectSubset<T, ChatMessageUpdateArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ChatMessageDeleteManyArgs>(args?: Prisma.SelectSubset<T, ChatMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ChatMessageUpdateManyArgs>(args: Prisma.SelectSubset<T, ChatMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ChatMessageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ChatMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ChatMessageUpsertArgs>(args: Prisma.SelectSubset<T, ChatMessageUpsertArgs<ExtArgs>>): Prisma.Prisma__ChatMessageClient<runtime.Types.Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ChatMessageCountArgs>(args?: Prisma.Subset<T, ChatMessageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ChatMessageCountAggregateOutputType> : number>;
    aggregate<T extends ChatMessageAggregateArgs>(args: Prisma.Subset<T, ChatMessageAggregateArgs>): Prisma.PrismaPromise<GetChatMessageAggregateType<T>>;
    groupBy<T extends ChatMessageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ChatMessageGroupByArgs['orderBy'];
    } : {
        orderBy?: ChatMessageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ChatMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ChatMessageFieldRefs;
}
export interface Prisma__ChatMessageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    conversation<T extends Prisma.ChatConversationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ChatConversationDefaultArgs<ExtArgs>>): Prisma.Prisma__ChatConversationClient<runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    sender<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ChatMessageFieldRefs {
    readonly id: Prisma.FieldRef<"ChatMessage", 'String'>;
    readonly conversationId: Prisma.FieldRef<"ChatMessage", 'String'>;
    readonly senderId: Prisma.FieldRef<"ChatMessage", 'String'>;
    readonly text: Prisma.FieldRef<"ChatMessage", 'String'>;
    readonly readAt: Prisma.FieldRef<"ChatMessage", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"ChatMessage", 'DateTime'>;
}
export type ChatMessageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    where: Prisma.ChatMessageWhereUniqueInput;
};
export type ChatMessageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    where: Prisma.ChatMessageWhereUniqueInput;
};
export type ChatMessageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ChatMessageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ChatMessageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ChatMessageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChatMessageCreateInput, Prisma.ChatMessageUncheckedCreateInput>;
};
export type ChatMessageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ChatMessageCreateManyInput | Prisma.ChatMessageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ChatMessageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    data: Prisma.ChatMessageCreateManyInput | Prisma.ChatMessageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ChatMessageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ChatMessageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChatMessageUpdateInput, Prisma.ChatMessageUncheckedUpdateInput>;
    where: Prisma.ChatMessageWhereUniqueInput;
};
export type ChatMessageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ChatMessageUpdateManyMutationInput, Prisma.ChatMessageUncheckedUpdateManyInput>;
    where?: Prisma.ChatMessageWhereInput;
    limit?: number;
};
export type ChatMessageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChatMessageUpdateManyMutationInput, Prisma.ChatMessageUncheckedUpdateManyInput>;
    where?: Prisma.ChatMessageWhereInput;
    limit?: number;
    include?: Prisma.ChatMessageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ChatMessageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    where: Prisma.ChatMessageWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChatMessageCreateInput, Prisma.ChatMessageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ChatMessageUpdateInput, Prisma.ChatMessageUncheckedUpdateInput>;
};
export type ChatMessageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
    where: Prisma.ChatMessageWhereUniqueInput;
};
export type ChatMessageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatMessageWhereInput;
    limit?: number;
};
export type ChatMessageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChatMessageSelect<ExtArgs> | null;
    omit?: Prisma.ChatMessageOmit<ExtArgs> | null;
    include?: Prisma.ChatMessageInclude<ExtArgs> | null;
};
