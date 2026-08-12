import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PayoutAccountModel = runtime.Types.Result.DefaultSelection<Prisma.$PayoutAccountPayload>;
export type AggregatePayoutAccount = {
    _count: PayoutAccountCountAggregateOutputType | null;
    _min: PayoutAccountMinAggregateOutputType | null;
    _max: PayoutAccountMaxAggregateOutputType | null;
};
export type PayoutAccountMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    accountHolderName: string | null;
    country: string | null;
    currency: string | null;
    payoutMethod: string | null;
    bankName: string | null;
    routingNumber: string | null;
    accountNumber: string | null;
    paypalEmail: string | null;
    taxResidency: string | null;
    businessType: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PayoutAccountMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    accountHolderName: string | null;
    country: string | null;
    currency: string | null;
    payoutMethod: string | null;
    bankName: string | null;
    routingNumber: string | null;
    accountNumber: string | null;
    paypalEmail: string | null;
    taxResidency: string | null;
    businessType: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PayoutAccountCountAggregateOutputType = {
    id: number;
    userId: number;
    accountHolderName: number;
    country: number;
    currency: number;
    payoutMethod: number;
    bankName: number;
    routingNumber: number;
    accountNumber: number;
    paypalEmail: number;
    taxResidency: number;
    businessType: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PayoutAccountMinAggregateInputType = {
    id?: true;
    userId?: true;
    accountHolderName?: true;
    country?: true;
    currency?: true;
    payoutMethod?: true;
    bankName?: true;
    routingNumber?: true;
    accountNumber?: true;
    paypalEmail?: true;
    taxResidency?: true;
    businessType?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PayoutAccountMaxAggregateInputType = {
    id?: true;
    userId?: true;
    accountHolderName?: true;
    country?: true;
    currency?: true;
    payoutMethod?: true;
    bankName?: true;
    routingNumber?: true;
    accountNumber?: true;
    paypalEmail?: true;
    taxResidency?: true;
    businessType?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PayoutAccountCountAggregateInputType = {
    id?: true;
    userId?: true;
    accountHolderName?: true;
    country?: true;
    currency?: true;
    payoutMethod?: true;
    bankName?: true;
    routingNumber?: true;
    accountNumber?: true;
    paypalEmail?: true;
    taxResidency?: true;
    businessType?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PayoutAccountAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PayoutAccountWhereInput;
    orderBy?: Prisma.PayoutAccountOrderByWithRelationInput | Prisma.PayoutAccountOrderByWithRelationInput[];
    cursor?: Prisma.PayoutAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PayoutAccountCountAggregateInputType;
    _min?: PayoutAccountMinAggregateInputType;
    _max?: PayoutAccountMaxAggregateInputType;
};
export type GetPayoutAccountAggregateType<T extends PayoutAccountAggregateArgs> = {
    [P in keyof T & keyof AggregatePayoutAccount]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePayoutAccount[P]> : Prisma.GetScalarType<T[P], AggregatePayoutAccount[P]>;
};
export type PayoutAccountGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PayoutAccountWhereInput;
    orderBy?: Prisma.PayoutAccountOrderByWithAggregationInput | Prisma.PayoutAccountOrderByWithAggregationInput[];
    by: Prisma.PayoutAccountScalarFieldEnum[] | Prisma.PayoutAccountScalarFieldEnum;
    having?: Prisma.PayoutAccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PayoutAccountCountAggregateInputType | true;
    _min?: PayoutAccountMinAggregateInputType;
    _max?: PayoutAccountMaxAggregateInputType;
};
export type PayoutAccountGroupByOutputType = {
    id: string;
    userId: string;
    accountHolderName: string | null;
    country: string | null;
    currency: string;
    payoutMethod: string;
    bankName: string | null;
    routingNumber: string | null;
    accountNumber: string | null;
    paypalEmail: string | null;
    taxResidency: string | null;
    businessType: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    _count: PayoutAccountCountAggregateOutputType | null;
    _min: PayoutAccountMinAggregateOutputType | null;
    _max: PayoutAccountMaxAggregateOutputType | null;
};
export type GetPayoutAccountGroupByPayload<T extends PayoutAccountGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PayoutAccountGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PayoutAccountGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PayoutAccountGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PayoutAccountGroupByOutputType[P]>;
}>>;
export type PayoutAccountWhereInput = {
    AND?: Prisma.PayoutAccountWhereInput | Prisma.PayoutAccountWhereInput[];
    OR?: Prisma.PayoutAccountWhereInput[];
    NOT?: Prisma.PayoutAccountWhereInput | Prisma.PayoutAccountWhereInput[];
    id?: Prisma.StringFilter<"PayoutAccount"> | string;
    userId?: Prisma.StringFilter<"PayoutAccount"> | string;
    accountHolderName?: Prisma.StringNullableFilter<"PayoutAccount"> | string | null;
    country?: Prisma.StringNullableFilter<"PayoutAccount"> | string | null;
    currency?: Prisma.StringFilter<"PayoutAccount"> | string;
    payoutMethod?: Prisma.StringFilter<"PayoutAccount"> | string;
    bankName?: Prisma.StringNullableFilter<"PayoutAccount"> | string | null;
    routingNumber?: Prisma.StringNullableFilter<"PayoutAccount"> | string | null;
    accountNumber?: Prisma.StringNullableFilter<"PayoutAccount"> | string | null;
    paypalEmail?: Prisma.StringNullableFilter<"PayoutAccount"> | string | null;
    taxResidency?: Prisma.StringNullableFilter<"PayoutAccount"> | string | null;
    businessType?: Prisma.StringFilter<"PayoutAccount"> | string;
    status?: Prisma.StringFilter<"PayoutAccount"> | string;
    createdAt?: Prisma.DateTimeFilter<"PayoutAccount"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PayoutAccount"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
};
export type PayoutAccountOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    accountHolderName?: Prisma.SortOrderInput | Prisma.SortOrder;
    country?: Prisma.SortOrderInput | Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    payoutMethod?: Prisma.SortOrder;
    bankName?: Prisma.SortOrderInput | Prisma.SortOrder;
    routingNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    accountNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    paypalEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    taxResidency?: Prisma.SortOrderInput | Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UsersOrderByWithRelationInput;
};
export type PayoutAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.PayoutAccountWhereInput | Prisma.PayoutAccountWhereInput[];
    OR?: Prisma.PayoutAccountWhereInput[];
    NOT?: Prisma.PayoutAccountWhereInput | Prisma.PayoutAccountWhereInput[];
    accountHolderName?: Prisma.StringNullableFilter<"PayoutAccount"> | string | null;
    country?: Prisma.StringNullableFilter<"PayoutAccount"> | string | null;
    currency?: Prisma.StringFilter<"PayoutAccount"> | string;
    payoutMethod?: Prisma.StringFilter<"PayoutAccount"> | string;
    bankName?: Prisma.StringNullableFilter<"PayoutAccount"> | string | null;
    routingNumber?: Prisma.StringNullableFilter<"PayoutAccount"> | string | null;
    accountNumber?: Prisma.StringNullableFilter<"PayoutAccount"> | string | null;
    paypalEmail?: Prisma.StringNullableFilter<"PayoutAccount"> | string | null;
    taxResidency?: Prisma.StringNullableFilter<"PayoutAccount"> | string | null;
    businessType?: Prisma.StringFilter<"PayoutAccount"> | string;
    status?: Prisma.StringFilter<"PayoutAccount"> | string;
    createdAt?: Prisma.DateTimeFilter<"PayoutAccount"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PayoutAccount"> | Date | string;
    user?: Prisma.XOR<Prisma.UsersScalarRelationFilter, Prisma.UsersWhereInput>;
}, "id" | "userId">;
export type PayoutAccountOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    accountHolderName?: Prisma.SortOrderInput | Prisma.SortOrder;
    country?: Prisma.SortOrderInput | Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    payoutMethod?: Prisma.SortOrder;
    bankName?: Prisma.SortOrderInput | Prisma.SortOrder;
    routingNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    accountNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    paypalEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    taxResidency?: Prisma.SortOrderInput | Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PayoutAccountCountOrderByAggregateInput;
    _max?: Prisma.PayoutAccountMaxOrderByAggregateInput;
    _min?: Prisma.PayoutAccountMinOrderByAggregateInput;
};
export type PayoutAccountScalarWhereWithAggregatesInput = {
    AND?: Prisma.PayoutAccountScalarWhereWithAggregatesInput | Prisma.PayoutAccountScalarWhereWithAggregatesInput[];
    OR?: Prisma.PayoutAccountScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PayoutAccountScalarWhereWithAggregatesInput | Prisma.PayoutAccountScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PayoutAccount"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"PayoutAccount"> | string;
    accountHolderName?: Prisma.StringNullableWithAggregatesFilter<"PayoutAccount"> | string | null;
    country?: Prisma.StringNullableWithAggregatesFilter<"PayoutAccount"> | string | null;
    currency?: Prisma.StringWithAggregatesFilter<"PayoutAccount"> | string;
    payoutMethod?: Prisma.StringWithAggregatesFilter<"PayoutAccount"> | string;
    bankName?: Prisma.StringNullableWithAggregatesFilter<"PayoutAccount"> | string | null;
    routingNumber?: Prisma.StringNullableWithAggregatesFilter<"PayoutAccount"> | string | null;
    accountNumber?: Prisma.StringNullableWithAggregatesFilter<"PayoutAccount"> | string | null;
    paypalEmail?: Prisma.StringNullableWithAggregatesFilter<"PayoutAccount"> | string | null;
    taxResidency?: Prisma.StringNullableWithAggregatesFilter<"PayoutAccount"> | string | null;
    businessType?: Prisma.StringWithAggregatesFilter<"PayoutAccount"> | string;
    status?: Prisma.StringWithAggregatesFilter<"PayoutAccount"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PayoutAccount"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PayoutAccount"> | Date | string;
};
export type PayoutAccountCreateInput = {
    id?: string;
    accountHolderName?: string | null;
    country?: string | null;
    currency?: string;
    payoutMethod?: string;
    bankName?: string | null;
    routingNumber?: string | null;
    accountNumber?: string | null;
    paypalEmail?: string | null;
    taxResidency?: string | null;
    businessType?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UsersCreateNestedOneWithoutPayoutAccountInput;
};
export type PayoutAccountUncheckedCreateInput = {
    id?: string;
    userId: string;
    accountHolderName?: string | null;
    country?: string | null;
    currency?: string;
    payoutMethod?: string;
    bankName?: string | null;
    routingNumber?: string | null;
    accountNumber?: string | null;
    paypalEmail?: string | null;
    taxResidency?: string | null;
    businessType?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PayoutAccountUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountHolderName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    payoutMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    routingNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paypalEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxResidency?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UsersUpdateOneRequiredWithoutPayoutAccountNestedInput;
};
export type PayoutAccountUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountHolderName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    payoutMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    routingNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paypalEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxResidency?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoutAccountCreateManyInput = {
    id?: string;
    userId: string;
    accountHolderName?: string | null;
    country?: string | null;
    currency?: string;
    payoutMethod?: string;
    bankName?: string | null;
    routingNumber?: string | null;
    accountNumber?: string | null;
    paypalEmail?: string | null;
    taxResidency?: string | null;
    businessType?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PayoutAccountUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountHolderName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    payoutMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    routingNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paypalEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxResidency?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoutAccountUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    accountHolderName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    payoutMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    routingNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paypalEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxResidency?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoutAccountNullableScalarRelationFilter = {
    is?: Prisma.PayoutAccountWhereInput | null;
    isNot?: Prisma.PayoutAccountWhereInput | null;
};
export type PayoutAccountCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    accountHolderName?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    payoutMethod?: Prisma.SortOrder;
    bankName?: Prisma.SortOrder;
    routingNumber?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    paypalEmail?: Prisma.SortOrder;
    taxResidency?: Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PayoutAccountMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    accountHolderName?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    payoutMethod?: Prisma.SortOrder;
    bankName?: Prisma.SortOrder;
    routingNumber?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    paypalEmail?: Prisma.SortOrder;
    taxResidency?: Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PayoutAccountMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    accountHolderName?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    currency?: Prisma.SortOrder;
    payoutMethod?: Prisma.SortOrder;
    bankName?: Prisma.SortOrder;
    routingNumber?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    paypalEmail?: Prisma.SortOrder;
    taxResidency?: Prisma.SortOrder;
    businessType?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PayoutAccountCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PayoutAccountCreateWithoutUserInput, Prisma.PayoutAccountUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PayoutAccountCreateOrConnectWithoutUserInput;
    connect?: Prisma.PayoutAccountWhereUniqueInput;
};
export type PayoutAccountUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PayoutAccountCreateWithoutUserInput, Prisma.PayoutAccountUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PayoutAccountCreateOrConnectWithoutUserInput;
    connect?: Prisma.PayoutAccountWhereUniqueInput;
};
export type PayoutAccountUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PayoutAccountCreateWithoutUserInput, Prisma.PayoutAccountUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PayoutAccountCreateOrConnectWithoutUserInput;
    upsert?: Prisma.PayoutAccountUpsertWithoutUserInput;
    disconnect?: Prisma.PayoutAccountWhereInput | boolean;
    delete?: Prisma.PayoutAccountWhereInput | boolean;
    connect?: Prisma.PayoutAccountWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PayoutAccountUpdateToOneWithWhereWithoutUserInput, Prisma.PayoutAccountUpdateWithoutUserInput>, Prisma.PayoutAccountUncheckedUpdateWithoutUserInput>;
};
export type PayoutAccountUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PayoutAccountCreateWithoutUserInput, Prisma.PayoutAccountUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PayoutAccountCreateOrConnectWithoutUserInput;
    upsert?: Prisma.PayoutAccountUpsertWithoutUserInput;
    disconnect?: Prisma.PayoutAccountWhereInput | boolean;
    delete?: Prisma.PayoutAccountWhereInput | boolean;
    connect?: Prisma.PayoutAccountWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PayoutAccountUpdateToOneWithWhereWithoutUserInput, Prisma.PayoutAccountUpdateWithoutUserInput>, Prisma.PayoutAccountUncheckedUpdateWithoutUserInput>;
};
export type PayoutAccountCreateWithoutUserInput = {
    id?: string;
    accountHolderName?: string | null;
    country?: string | null;
    currency?: string;
    payoutMethod?: string;
    bankName?: string | null;
    routingNumber?: string | null;
    accountNumber?: string | null;
    paypalEmail?: string | null;
    taxResidency?: string | null;
    businessType?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PayoutAccountUncheckedCreateWithoutUserInput = {
    id?: string;
    accountHolderName?: string | null;
    country?: string | null;
    currency?: string;
    payoutMethod?: string;
    bankName?: string | null;
    routingNumber?: string | null;
    accountNumber?: string | null;
    paypalEmail?: string | null;
    taxResidency?: string | null;
    businessType?: string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PayoutAccountCreateOrConnectWithoutUserInput = {
    where: Prisma.PayoutAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.PayoutAccountCreateWithoutUserInput, Prisma.PayoutAccountUncheckedCreateWithoutUserInput>;
};
export type PayoutAccountUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.PayoutAccountUpdateWithoutUserInput, Prisma.PayoutAccountUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PayoutAccountCreateWithoutUserInput, Prisma.PayoutAccountUncheckedCreateWithoutUserInput>;
    where?: Prisma.PayoutAccountWhereInput;
};
export type PayoutAccountUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.PayoutAccountWhereInput;
    data: Prisma.XOR<Prisma.PayoutAccountUpdateWithoutUserInput, Prisma.PayoutAccountUncheckedUpdateWithoutUserInput>;
};
export type PayoutAccountUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountHolderName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    payoutMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    routingNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paypalEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxResidency?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoutAccountUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    accountHolderName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    country?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    currency?: Prisma.StringFieldUpdateOperationsInput | string;
    payoutMethod?: Prisma.StringFieldUpdateOperationsInput | string;
    bankName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    routingNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    paypalEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    taxResidency?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    businessType?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PayoutAccountSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    accountHolderName?: boolean;
    country?: boolean;
    currency?: boolean;
    payoutMethod?: boolean;
    bankName?: boolean;
    routingNumber?: boolean;
    accountNumber?: boolean;
    paypalEmail?: boolean;
    taxResidency?: boolean;
    businessType?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payoutAccount"]>;
export type PayoutAccountSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    accountHolderName?: boolean;
    country?: boolean;
    currency?: boolean;
    payoutMethod?: boolean;
    bankName?: boolean;
    routingNumber?: boolean;
    accountNumber?: boolean;
    paypalEmail?: boolean;
    taxResidency?: boolean;
    businessType?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payoutAccount"]>;
export type PayoutAccountSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    accountHolderName?: boolean;
    country?: boolean;
    currency?: boolean;
    payoutMethod?: boolean;
    bankName?: boolean;
    routingNumber?: boolean;
    accountNumber?: boolean;
    paypalEmail?: boolean;
    taxResidency?: boolean;
    businessType?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["payoutAccount"]>;
export type PayoutAccountSelectScalar = {
    id?: boolean;
    userId?: boolean;
    accountHolderName?: boolean;
    country?: boolean;
    currency?: boolean;
    payoutMethod?: boolean;
    bankName?: boolean;
    routingNumber?: boolean;
    accountNumber?: boolean;
    paypalEmail?: boolean;
    taxResidency?: boolean;
    businessType?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PayoutAccountOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "accountHolderName" | "country" | "currency" | "payoutMethod" | "bankName" | "routingNumber" | "accountNumber" | "paypalEmail" | "taxResidency" | "businessType" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["payoutAccount"]>;
export type PayoutAccountInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type PayoutAccountIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type PayoutAccountIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UsersDefaultArgs<ExtArgs>;
};
export type $PayoutAccountPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PayoutAccount";
    objects: {
        user: Prisma.$UsersPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        accountHolderName: string | null;
        country: string | null;
        currency: string;
        payoutMethod: string;
        bankName: string | null;
        routingNumber: string | null;
        accountNumber: string | null;
        paypalEmail: string | null;
        taxResidency: string | null;
        businessType: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["payoutAccount"]>;
    composites: {};
};
export type PayoutAccountGetPayload<S extends boolean | null | undefined | PayoutAccountDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PayoutAccountPayload, S>;
export type PayoutAccountCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PayoutAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PayoutAccountCountAggregateInputType | true;
};
export interface PayoutAccountDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PayoutAccount'];
        meta: {
            name: 'PayoutAccount';
        };
    };
    findUnique<T extends PayoutAccountFindUniqueArgs>(args: Prisma.SelectSubset<T, PayoutAccountFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PayoutAccountClient<runtime.Types.Result.GetResult<Prisma.$PayoutAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PayoutAccountFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PayoutAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PayoutAccountClient<runtime.Types.Result.GetResult<Prisma.$PayoutAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PayoutAccountFindFirstArgs>(args?: Prisma.SelectSubset<T, PayoutAccountFindFirstArgs<ExtArgs>>): Prisma.Prisma__PayoutAccountClient<runtime.Types.Result.GetResult<Prisma.$PayoutAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PayoutAccountFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PayoutAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PayoutAccountClient<runtime.Types.Result.GetResult<Prisma.$PayoutAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PayoutAccountFindManyArgs>(args?: Prisma.SelectSubset<T, PayoutAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PayoutAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PayoutAccountCreateArgs>(args: Prisma.SelectSubset<T, PayoutAccountCreateArgs<ExtArgs>>): Prisma.Prisma__PayoutAccountClient<runtime.Types.Result.GetResult<Prisma.$PayoutAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PayoutAccountCreateManyArgs>(args?: Prisma.SelectSubset<T, PayoutAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PayoutAccountCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PayoutAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PayoutAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PayoutAccountDeleteArgs>(args: Prisma.SelectSubset<T, PayoutAccountDeleteArgs<ExtArgs>>): Prisma.Prisma__PayoutAccountClient<runtime.Types.Result.GetResult<Prisma.$PayoutAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PayoutAccountUpdateArgs>(args: Prisma.SelectSubset<T, PayoutAccountUpdateArgs<ExtArgs>>): Prisma.Prisma__PayoutAccountClient<runtime.Types.Result.GetResult<Prisma.$PayoutAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PayoutAccountDeleteManyArgs>(args?: Prisma.SelectSubset<T, PayoutAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PayoutAccountUpdateManyArgs>(args: Prisma.SelectSubset<T, PayoutAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PayoutAccountUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PayoutAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PayoutAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PayoutAccountUpsertArgs>(args: Prisma.SelectSubset<T, PayoutAccountUpsertArgs<ExtArgs>>): Prisma.Prisma__PayoutAccountClient<runtime.Types.Result.GetResult<Prisma.$PayoutAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PayoutAccountCountArgs>(args?: Prisma.Subset<T, PayoutAccountCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PayoutAccountCountAggregateOutputType> : number>;
    aggregate<T extends PayoutAccountAggregateArgs>(args: Prisma.Subset<T, PayoutAccountAggregateArgs>): Prisma.PrismaPromise<GetPayoutAccountAggregateType<T>>;
    groupBy<T extends PayoutAccountGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PayoutAccountGroupByArgs['orderBy'];
    } : {
        orderBy?: PayoutAccountGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PayoutAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayoutAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PayoutAccountFieldRefs;
}
export interface Prisma__PayoutAccountClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UsersDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UsersDefaultArgs<ExtArgs>>): Prisma.Prisma__UsersClient<runtime.Types.Result.GetResult<Prisma.$UsersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PayoutAccountFieldRefs {
    readonly id: Prisma.FieldRef<"PayoutAccount", 'String'>;
    readonly userId: Prisma.FieldRef<"PayoutAccount", 'String'>;
    readonly accountHolderName: Prisma.FieldRef<"PayoutAccount", 'String'>;
    readonly country: Prisma.FieldRef<"PayoutAccount", 'String'>;
    readonly currency: Prisma.FieldRef<"PayoutAccount", 'String'>;
    readonly payoutMethod: Prisma.FieldRef<"PayoutAccount", 'String'>;
    readonly bankName: Prisma.FieldRef<"PayoutAccount", 'String'>;
    readonly routingNumber: Prisma.FieldRef<"PayoutAccount", 'String'>;
    readonly accountNumber: Prisma.FieldRef<"PayoutAccount", 'String'>;
    readonly paypalEmail: Prisma.FieldRef<"PayoutAccount", 'String'>;
    readonly taxResidency: Prisma.FieldRef<"PayoutAccount", 'String'>;
    readonly businessType: Prisma.FieldRef<"PayoutAccount", 'String'>;
    readonly status: Prisma.FieldRef<"PayoutAccount", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PayoutAccount", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PayoutAccount", 'DateTime'>;
}
export type PayoutAccountFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PayoutAccountSelect<ExtArgs> | null;
    omit?: Prisma.PayoutAccountOmit<ExtArgs> | null;
    include?: Prisma.PayoutAccountInclude<ExtArgs> | null;
    where: Prisma.PayoutAccountWhereUniqueInput;
};
export type PayoutAccountFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PayoutAccountSelect<ExtArgs> | null;
    omit?: Prisma.PayoutAccountOmit<ExtArgs> | null;
    include?: Prisma.PayoutAccountInclude<ExtArgs> | null;
    where: Prisma.PayoutAccountWhereUniqueInput;
};
export type PayoutAccountFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PayoutAccountSelect<ExtArgs> | null;
    omit?: Prisma.PayoutAccountOmit<ExtArgs> | null;
    include?: Prisma.PayoutAccountInclude<ExtArgs> | null;
    where?: Prisma.PayoutAccountWhereInput;
    orderBy?: Prisma.PayoutAccountOrderByWithRelationInput | Prisma.PayoutAccountOrderByWithRelationInput[];
    cursor?: Prisma.PayoutAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PayoutAccountScalarFieldEnum | Prisma.PayoutAccountScalarFieldEnum[];
};
export type PayoutAccountFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PayoutAccountSelect<ExtArgs> | null;
    omit?: Prisma.PayoutAccountOmit<ExtArgs> | null;
    include?: Prisma.PayoutAccountInclude<ExtArgs> | null;
    where?: Prisma.PayoutAccountWhereInput;
    orderBy?: Prisma.PayoutAccountOrderByWithRelationInput | Prisma.PayoutAccountOrderByWithRelationInput[];
    cursor?: Prisma.PayoutAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PayoutAccountScalarFieldEnum | Prisma.PayoutAccountScalarFieldEnum[];
};
export type PayoutAccountFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PayoutAccountSelect<ExtArgs> | null;
    omit?: Prisma.PayoutAccountOmit<ExtArgs> | null;
    include?: Prisma.PayoutAccountInclude<ExtArgs> | null;
    where?: Prisma.PayoutAccountWhereInput;
    orderBy?: Prisma.PayoutAccountOrderByWithRelationInput | Prisma.PayoutAccountOrderByWithRelationInput[];
    cursor?: Prisma.PayoutAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PayoutAccountScalarFieldEnum | Prisma.PayoutAccountScalarFieldEnum[];
};
export type PayoutAccountCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PayoutAccountSelect<ExtArgs> | null;
    omit?: Prisma.PayoutAccountOmit<ExtArgs> | null;
    include?: Prisma.PayoutAccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PayoutAccountCreateInput, Prisma.PayoutAccountUncheckedCreateInput>;
};
export type PayoutAccountCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PayoutAccountCreateManyInput | Prisma.PayoutAccountCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PayoutAccountCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PayoutAccountSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PayoutAccountOmit<ExtArgs> | null;
    data: Prisma.PayoutAccountCreateManyInput | Prisma.PayoutAccountCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PayoutAccountIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PayoutAccountUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PayoutAccountSelect<ExtArgs> | null;
    omit?: Prisma.PayoutAccountOmit<ExtArgs> | null;
    include?: Prisma.PayoutAccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PayoutAccountUpdateInput, Prisma.PayoutAccountUncheckedUpdateInput>;
    where: Prisma.PayoutAccountWhereUniqueInput;
};
export type PayoutAccountUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PayoutAccountUpdateManyMutationInput, Prisma.PayoutAccountUncheckedUpdateManyInput>;
    where?: Prisma.PayoutAccountWhereInput;
    limit?: number;
};
export type PayoutAccountUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PayoutAccountSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PayoutAccountOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PayoutAccountUpdateManyMutationInput, Prisma.PayoutAccountUncheckedUpdateManyInput>;
    where?: Prisma.PayoutAccountWhereInput;
    limit?: number;
    include?: Prisma.PayoutAccountIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PayoutAccountUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PayoutAccountSelect<ExtArgs> | null;
    omit?: Prisma.PayoutAccountOmit<ExtArgs> | null;
    include?: Prisma.PayoutAccountInclude<ExtArgs> | null;
    where: Prisma.PayoutAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.PayoutAccountCreateInput, Prisma.PayoutAccountUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PayoutAccountUpdateInput, Prisma.PayoutAccountUncheckedUpdateInput>;
};
export type PayoutAccountDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PayoutAccountSelect<ExtArgs> | null;
    omit?: Prisma.PayoutAccountOmit<ExtArgs> | null;
    include?: Prisma.PayoutAccountInclude<ExtArgs> | null;
    where: Prisma.PayoutAccountWhereUniqueInput;
};
export type PayoutAccountDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PayoutAccountWhereInput;
    limit?: number;
};
export type PayoutAccountDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PayoutAccountSelect<ExtArgs> | null;
    omit?: Prisma.PayoutAccountOmit<ExtArgs> | null;
    include?: Prisma.PayoutAccountInclude<ExtArgs> | null;
};
