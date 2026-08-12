import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly Users: "Users";
    readonly SocialLink: "SocialLink";
    readonly OAuthAccount: "OAuthAccount";
    readonly EmailAuthToken: "EmailAuthToken";
    readonly PayoutAccount: "PayoutAccount";
    readonly Notification: "Notification";
    readonly PasswordResetToken: "PasswordResetToken";
    readonly Follow: "Follow";
    readonly ChatConversation: "ChatConversation";
    readonly ChatMessage: "ChatMessage";
    readonly Course: "Course";
    readonly Subscribe: "Subscribe";
    readonly Post: "Post";
    readonly RecentCourseView: "RecentCourseView";
    readonly RecentPostView: "RecentPostView";
    readonly RatePost: "RatePost";
    readonly Discussion: "Discussion";
    readonly RateDiscussion: "RateDiscussion";
    readonly Experience: "Experience";
    readonly Education: "Education";
    readonly Project: "Project";
    readonly ProjectContributor: "ProjectContributor";
    readonly ProjectLink: "ProjectLink";
    readonly Folder: "Folder";
    readonly File: "File";
    readonly FileTranscript: "FileTranscript";
    readonly Tag: "Tag";
    readonly CourseTag: "CourseTag";
    readonly PostTag: "PostTag";
    readonly FileTag: "FileTag";
    readonly FileInCourse: "FileInCourse";
    readonly FileInPost: "FileInPost";
    readonly Photo: "Photo";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "users" | "socialLink" | "oAuthAccount" | "emailAuthToken" | "payoutAccount" | "notification" | "passwordResetToken" | "follow" | "chatConversation" | "chatMessage" | "course" | "subscribe" | "post" | "recentCourseView" | "recentPostView" | "ratePost" | "discussion" | "rateDiscussion" | "experience" | "education" | "project" | "projectContributor" | "projectLink" | "folder" | "file" | "fileTranscript" | "tag" | "courseTag" | "postTag" | "fileTag" | "fileInCourse" | "fileInPost" | "photo";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        Users: {
            payload: Prisma.$UsersPayload<ExtArgs>;
            fields: Prisma.UsersFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UsersFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsersPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UsersFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsersPayload>;
                };
                findFirst: {
                    args: Prisma.UsersFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsersPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UsersFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsersPayload>;
                };
                findMany: {
                    args: Prisma.UsersFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsersPayload>[];
                };
                create: {
                    args: Prisma.UsersCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsersPayload>;
                };
                createMany: {
                    args: Prisma.UsersCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UsersCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsersPayload>[];
                };
                delete: {
                    args: Prisma.UsersDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsersPayload>;
                };
                update: {
                    args: Prisma.UsersUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsersPayload>;
                };
                deleteMany: {
                    args: Prisma.UsersDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UsersUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UsersUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsersPayload>[];
                };
                upsert: {
                    args: Prisma.UsersUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsersPayload>;
                };
                aggregate: {
                    args: Prisma.UsersAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUsers>;
                };
                groupBy: {
                    args: Prisma.UsersGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsersGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UsersCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsersCountAggregateOutputType> | number;
                };
            };
        };
        SocialLink: {
            payload: Prisma.$SocialLinkPayload<ExtArgs>;
            fields: Prisma.SocialLinkFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SocialLinkFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialLinkPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SocialLinkFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialLinkPayload>;
                };
                findFirst: {
                    args: Prisma.SocialLinkFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialLinkPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SocialLinkFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialLinkPayload>;
                };
                findMany: {
                    args: Prisma.SocialLinkFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialLinkPayload>[];
                };
                create: {
                    args: Prisma.SocialLinkCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialLinkPayload>;
                };
                createMany: {
                    args: Prisma.SocialLinkCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SocialLinkCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialLinkPayload>[];
                };
                delete: {
                    args: Prisma.SocialLinkDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialLinkPayload>;
                };
                update: {
                    args: Prisma.SocialLinkUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialLinkPayload>;
                };
                deleteMany: {
                    args: Prisma.SocialLinkDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SocialLinkUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SocialLinkUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialLinkPayload>[];
                };
                upsert: {
                    args: Prisma.SocialLinkUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialLinkPayload>;
                };
                aggregate: {
                    args: Prisma.SocialLinkAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSocialLink>;
                };
                groupBy: {
                    args: Prisma.SocialLinkGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SocialLinkGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SocialLinkCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SocialLinkCountAggregateOutputType> | number;
                };
            };
        };
        OAuthAccount: {
            payload: Prisma.$OAuthAccountPayload<ExtArgs>;
            fields: Prisma.OAuthAccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OAuthAccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OAuthAccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>;
                };
                findFirst: {
                    args: Prisma.OAuthAccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OAuthAccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>;
                };
                findMany: {
                    args: Prisma.OAuthAccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>[];
                };
                create: {
                    args: Prisma.OAuthAccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>;
                };
                createMany: {
                    args: Prisma.OAuthAccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OAuthAccountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>[];
                };
                delete: {
                    args: Prisma.OAuthAccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>;
                };
                update: {
                    args: Prisma.OAuthAccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>;
                };
                deleteMany: {
                    args: Prisma.OAuthAccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OAuthAccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OAuthAccountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>[];
                };
                upsert: {
                    args: Prisma.OAuthAccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OAuthAccountPayload>;
                };
                aggregate: {
                    args: Prisma.OAuthAccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOAuthAccount>;
                };
                groupBy: {
                    args: Prisma.OAuthAccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OAuthAccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OAuthAccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OAuthAccountCountAggregateOutputType> | number;
                };
            };
        };
        EmailAuthToken: {
            payload: Prisma.$EmailAuthTokenPayload<ExtArgs>;
            fields: Prisma.EmailAuthTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EmailAuthTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailAuthTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EmailAuthTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailAuthTokenPayload>;
                };
                findFirst: {
                    args: Prisma.EmailAuthTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailAuthTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EmailAuthTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailAuthTokenPayload>;
                };
                findMany: {
                    args: Prisma.EmailAuthTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailAuthTokenPayload>[];
                };
                create: {
                    args: Prisma.EmailAuthTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailAuthTokenPayload>;
                };
                createMany: {
                    args: Prisma.EmailAuthTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EmailAuthTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailAuthTokenPayload>[];
                };
                delete: {
                    args: Prisma.EmailAuthTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailAuthTokenPayload>;
                };
                update: {
                    args: Prisma.EmailAuthTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailAuthTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.EmailAuthTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EmailAuthTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EmailAuthTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailAuthTokenPayload>[];
                };
                upsert: {
                    args: Prisma.EmailAuthTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailAuthTokenPayload>;
                };
                aggregate: {
                    args: Prisma.EmailAuthTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEmailAuthToken>;
                };
                groupBy: {
                    args: Prisma.EmailAuthTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmailAuthTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EmailAuthTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmailAuthTokenCountAggregateOutputType> | number;
                };
            };
        };
        PayoutAccount: {
            payload: Prisma.$PayoutAccountPayload<ExtArgs>;
            fields: Prisma.PayoutAccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PayoutAccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayoutAccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PayoutAccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayoutAccountPayload>;
                };
                findFirst: {
                    args: Prisma.PayoutAccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayoutAccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PayoutAccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayoutAccountPayload>;
                };
                findMany: {
                    args: Prisma.PayoutAccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayoutAccountPayload>[];
                };
                create: {
                    args: Prisma.PayoutAccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayoutAccountPayload>;
                };
                createMany: {
                    args: Prisma.PayoutAccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PayoutAccountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayoutAccountPayload>[];
                };
                delete: {
                    args: Prisma.PayoutAccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayoutAccountPayload>;
                };
                update: {
                    args: Prisma.PayoutAccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayoutAccountPayload>;
                };
                deleteMany: {
                    args: Prisma.PayoutAccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PayoutAccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PayoutAccountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayoutAccountPayload>[];
                };
                upsert: {
                    args: Prisma.PayoutAccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PayoutAccountPayload>;
                };
                aggregate: {
                    args: Prisma.PayoutAccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePayoutAccount>;
                };
                groupBy: {
                    args: Prisma.PayoutAccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PayoutAccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PayoutAccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PayoutAccountCountAggregateOutputType> | number;
                };
            };
        };
        Notification: {
            payload: Prisma.$NotificationPayload<ExtArgs>;
            fields: Prisma.NotificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findMany: {
                    args: Prisma.NotificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                create: {
                    args: Prisma.NotificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                createMany: {
                    args: Prisma.NotificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                delete: {
                    args: Prisma.NotificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                update: {
                    args: Prisma.NotificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification>;
                };
                groupBy: {
                    args: Prisma.NotificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationCountAggregateOutputType> | number;
                };
            };
        };
        PasswordResetToken: {
            payload: Prisma.$PasswordResetTokenPayload<ExtArgs>;
            fields: Prisma.PasswordResetTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                findFirst: {
                    args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                findMany: {
                    args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[];
                };
                create: {
                    args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                createMany: {
                    args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PasswordResetTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[];
                };
                delete: {
                    args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                update: {
                    args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PasswordResetTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[];
                };
                upsert: {
                    args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                aggregate: {
                    args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePasswordResetToken>;
                };
                groupBy: {
                    args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordResetTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PasswordResetTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordResetTokenCountAggregateOutputType> | number;
                };
            };
        };
        Follow: {
            payload: Prisma.$FollowPayload<ExtArgs>;
            fields: Prisma.FollowFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FollowFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FollowFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                findFirst: {
                    args: Prisma.FollowFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FollowFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                findMany: {
                    args: Prisma.FollowFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>[];
                };
                create: {
                    args: Prisma.FollowCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                createMany: {
                    args: Prisma.FollowCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FollowCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>[];
                };
                delete: {
                    args: Prisma.FollowDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                update: {
                    args: Prisma.FollowUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                deleteMany: {
                    args: Prisma.FollowDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FollowUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FollowUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>[];
                };
                upsert: {
                    args: Prisma.FollowUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                aggregate: {
                    args: Prisma.FollowAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFollow>;
                };
                groupBy: {
                    args: Prisma.FollowGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FollowGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FollowCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FollowCountAggregateOutputType> | number;
                };
            };
        };
        ChatConversation: {
            payload: Prisma.$ChatConversationPayload<ExtArgs>;
            fields: Prisma.ChatConversationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ChatConversationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ChatConversationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>;
                };
                findFirst: {
                    args: Prisma.ChatConversationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ChatConversationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>;
                };
                findMany: {
                    args: Prisma.ChatConversationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>[];
                };
                create: {
                    args: Prisma.ChatConversationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>;
                };
                createMany: {
                    args: Prisma.ChatConversationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ChatConversationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>[];
                };
                delete: {
                    args: Prisma.ChatConversationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>;
                };
                update: {
                    args: Prisma.ChatConversationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>;
                };
                deleteMany: {
                    args: Prisma.ChatConversationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ChatConversationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ChatConversationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>[];
                };
                upsert: {
                    args: Prisma.ChatConversationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatConversationPayload>;
                };
                aggregate: {
                    args: Prisma.ChatConversationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChatConversation>;
                };
                groupBy: {
                    args: Prisma.ChatConversationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatConversationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ChatConversationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatConversationCountAggregateOutputType> | number;
                };
            };
        };
        ChatMessage: {
            payload: Prisma.$ChatMessagePayload<ExtArgs>;
            fields: Prisma.ChatMessageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ChatMessageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ChatMessageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                findFirst: {
                    args: Prisma.ChatMessageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ChatMessageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                findMany: {
                    args: Prisma.ChatMessageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>[];
                };
                create: {
                    args: Prisma.ChatMessageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                createMany: {
                    args: Prisma.ChatMessageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ChatMessageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>[];
                };
                delete: {
                    args: Prisma.ChatMessageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                update: {
                    args: Prisma.ChatMessageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                deleteMany: {
                    args: Prisma.ChatMessageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ChatMessageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ChatMessageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>[];
                };
                upsert: {
                    args: Prisma.ChatMessageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChatMessagePayload>;
                };
                aggregate: {
                    args: Prisma.ChatMessageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChatMessage>;
                };
                groupBy: {
                    args: Prisma.ChatMessageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatMessageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ChatMessageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChatMessageCountAggregateOutputType> | number;
                };
            };
        };
        Course: {
            payload: Prisma.$CoursePayload<ExtArgs>;
            fields: Prisma.CourseFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CourseFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CourseFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
                };
                findFirst: {
                    args: Prisma.CourseFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CourseFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
                };
                findMany: {
                    args: Prisma.CourseFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>[];
                };
                create: {
                    args: Prisma.CourseCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
                };
                createMany: {
                    args: Prisma.CourseCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CourseCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>[];
                };
                delete: {
                    args: Prisma.CourseDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
                };
                update: {
                    args: Prisma.CourseUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
                };
                deleteMany: {
                    args: Prisma.CourseDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CourseUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CourseUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>[];
                };
                upsert: {
                    args: Prisma.CourseUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CoursePayload>;
                };
                aggregate: {
                    args: Prisma.CourseAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCourse>;
                };
                groupBy: {
                    args: Prisma.CourseGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CourseGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CourseCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CourseCountAggregateOutputType> | number;
                };
            };
        };
        Subscribe: {
            payload: Prisma.$SubscribePayload<ExtArgs>;
            fields: Prisma.SubscribeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SubscribeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscribePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SubscribeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscribePayload>;
                };
                findFirst: {
                    args: Prisma.SubscribeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscribePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SubscribeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscribePayload>;
                };
                findMany: {
                    args: Prisma.SubscribeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscribePayload>[];
                };
                create: {
                    args: Prisma.SubscribeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscribePayload>;
                };
                createMany: {
                    args: Prisma.SubscribeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SubscribeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscribePayload>[];
                };
                delete: {
                    args: Prisma.SubscribeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscribePayload>;
                };
                update: {
                    args: Prisma.SubscribeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscribePayload>;
                };
                deleteMany: {
                    args: Prisma.SubscribeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SubscribeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SubscribeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscribePayload>[];
                };
                upsert: {
                    args: Prisma.SubscribeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SubscribePayload>;
                };
                aggregate: {
                    args: Prisma.SubscribeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSubscribe>;
                };
                groupBy: {
                    args: Prisma.SubscribeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SubscribeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SubscribeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SubscribeCountAggregateOutputType> | number;
                };
            };
        };
        Post: {
            payload: Prisma.$PostPayload<ExtArgs>;
            fields: Prisma.PostFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PostFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>;
                };
                findFirst: {
                    args: Prisma.PostFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>;
                };
                findMany: {
                    args: Prisma.PostFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>[];
                };
                create: {
                    args: Prisma.PostCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>;
                };
                createMany: {
                    args: Prisma.PostCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>[];
                };
                delete: {
                    args: Prisma.PostDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>;
                };
                update: {
                    args: Prisma.PostUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>;
                };
                deleteMany: {
                    args: Prisma.PostDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PostUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>[];
                };
                upsert: {
                    args: Prisma.PostUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostPayload>;
                };
                aggregate: {
                    args: Prisma.PostAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePost>;
                };
                groupBy: {
                    args: Prisma.PostGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PostCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostCountAggregateOutputType> | number;
                };
            };
        };
        RecentCourseView: {
            payload: Prisma.$RecentCourseViewPayload<ExtArgs>;
            fields: Prisma.RecentCourseViewFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RecentCourseViewFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentCourseViewPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RecentCourseViewFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentCourseViewPayload>;
                };
                findFirst: {
                    args: Prisma.RecentCourseViewFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentCourseViewPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RecentCourseViewFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentCourseViewPayload>;
                };
                findMany: {
                    args: Prisma.RecentCourseViewFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentCourseViewPayload>[];
                };
                create: {
                    args: Prisma.RecentCourseViewCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentCourseViewPayload>;
                };
                createMany: {
                    args: Prisma.RecentCourseViewCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RecentCourseViewCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentCourseViewPayload>[];
                };
                delete: {
                    args: Prisma.RecentCourseViewDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentCourseViewPayload>;
                };
                update: {
                    args: Prisma.RecentCourseViewUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentCourseViewPayload>;
                };
                deleteMany: {
                    args: Prisma.RecentCourseViewDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RecentCourseViewUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RecentCourseViewUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentCourseViewPayload>[];
                };
                upsert: {
                    args: Prisma.RecentCourseViewUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentCourseViewPayload>;
                };
                aggregate: {
                    args: Prisma.RecentCourseViewAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRecentCourseView>;
                };
                groupBy: {
                    args: Prisma.RecentCourseViewGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecentCourseViewGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RecentCourseViewCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecentCourseViewCountAggregateOutputType> | number;
                };
            };
        };
        RecentPostView: {
            payload: Prisma.$RecentPostViewPayload<ExtArgs>;
            fields: Prisma.RecentPostViewFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RecentPostViewFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentPostViewPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RecentPostViewFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentPostViewPayload>;
                };
                findFirst: {
                    args: Prisma.RecentPostViewFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentPostViewPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RecentPostViewFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentPostViewPayload>;
                };
                findMany: {
                    args: Prisma.RecentPostViewFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentPostViewPayload>[];
                };
                create: {
                    args: Prisma.RecentPostViewCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentPostViewPayload>;
                };
                createMany: {
                    args: Prisma.RecentPostViewCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RecentPostViewCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentPostViewPayload>[];
                };
                delete: {
                    args: Prisma.RecentPostViewDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentPostViewPayload>;
                };
                update: {
                    args: Prisma.RecentPostViewUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentPostViewPayload>;
                };
                deleteMany: {
                    args: Prisma.RecentPostViewDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RecentPostViewUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RecentPostViewUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentPostViewPayload>[];
                };
                upsert: {
                    args: Prisma.RecentPostViewUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecentPostViewPayload>;
                };
                aggregate: {
                    args: Prisma.RecentPostViewAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRecentPostView>;
                };
                groupBy: {
                    args: Prisma.RecentPostViewGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecentPostViewGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RecentPostViewCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecentPostViewCountAggregateOutputType> | number;
                };
            };
        };
        RatePost: {
            payload: Prisma.$RatePostPayload<ExtArgs>;
            fields: Prisma.RatePostFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RatePostFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatePostPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RatePostFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatePostPayload>;
                };
                findFirst: {
                    args: Prisma.RatePostFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatePostPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RatePostFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatePostPayload>;
                };
                findMany: {
                    args: Prisma.RatePostFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatePostPayload>[];
                };
                create: {
                    args: Prisma.RatePostCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatePostPayload>;
                };
                createMany: {
                    args: Prisma.RatePostCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RatePostCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatePostPayload>[];
                };
                delete: {
                    args: Prisma.RatePostDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatePostPayload>;
                };
                update: {
                    args: Prisma.RatePostUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatePostPayload>;
                };
                deleteMany: {
                    args: Prisma.RatePostDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RatePostUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RatePostUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatePostPayload>[];
                };
                upsert: {
                    args: Prisma.RatePostUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RatePostPayload>;
                };
                aggregate: {
                    args: Prisma.RatePostAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRatePost>;
                };
                groupBy: {
                    args: Prisma.RatePostGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RatePostGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RatePostCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RatePostCountAggregateOutputType> | number;
                };
            };
        };
        Discussion: {
            payload: Prisma.$DiscussionPayload<ExtArgs>;
            fields: Prisma.DiscussionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DiscussionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscussionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DiscussionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscussionPayload>;
                };
                findFirst: {
                    args: Prisma.DiscussionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscussionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DiscussionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscussionPayload>;
                };
                findMany: {
                    args: Prisma.DiscussionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscussionPayload>[];
                };
                create: {
                    args: Prisma.DiscussionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscussionPayload>;
                };
                createMany: {
                    args: Prisma.DiscussionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DiscussionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscussionPayload>[];
                };
                delete: {
                    args: Prisma.DiscussionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscussionPayload>;
                };
                update: {
                    args: Prisma.DiscussionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscussionPayload>;
                };
                deleteMany: {
                    args: Prisma.DiscussionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DiscussionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DiscussionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscussionPayload>[];
                };
                upsert: {
                    args: Prisma.DiscussionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DiscussionPayload>;
                };
                aggregate: {
                    args: Prisma.DiscussionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDiscussion>;
                };
                groupBy: {
                    args: Prisma.DiscussionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiscussionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DiscussionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiscussionCountAggregateOutputType> | number;
                };
            };
        };
        RateDiscussion: {
            payload: Prisma.$RateDiscussionPayload<ExtArgs>;
            fields: Prisma.RateDiscussionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RateDiscussionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateDiscussionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RateDiscussionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateDiscussionPayload>;
                };
                findFirst: {
                    args: Prisma.RateDiscussionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateDiscussionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RateDiscussionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateDiscussionPayload>;
                };
                findMany: {
                    args: Prisma.RateDiscussionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateDiscussionPayload>[];
                };
                create: {
                    args: Prisma.RateDiscussionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateDiscussionPayload>;
                };
                createMany: {
                    args: Prisma.RateDiscussionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RateDiscussionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateDiscussionPayload>[];
                };
                delete: {
                    args: Prisma.RateDiscussionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateDiscussionPayload>;
                };
                update: {
                    args: Prisma.RateDiscussionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateDiscussionPayload>;
                };
                deleteMany: {
                    args: Prisma.RateDiscussionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RateDiscussionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RateDiscussionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateDiscussionPayload>[];
                };
                upsert: {
                    args: Prisma.RateDiscussionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateDiscussionPayload>;
                };
                aggregate: {
                    args: Prisma.RateDiscussionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRateDiscussion>;
                };
                groupBy: {
                    args: Prisma.RateDiscussionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RateDiscussionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RateDiscussionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RateDiscussionCountAggregateOutputType> | number;
                };
            };
        };
        Experience: {
            payload: Prisma.$ExperiencePayload<ExtArgs>;
            fields: Prisma.ExperienceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExperienceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExperiencePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExperienceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExperiencePayload>;
                };
                findFirst: {
                    args: Prisma.ExperienceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExperiencePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExperienceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExperiencePayload>;
                };
                findMany: {
                    args: Prisma.ExperienceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExperiencePayload>[];
                };
                create: {
                    args: Prisma.ExperienceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExperiencePayload>;
                };
                createMany: {
                    args: Prisma.ExperienceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ExperienceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExperiencePayload>[];
                };
                delete: {
                    args: Prisma.ExperienceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExperiencePayload>;
                };
                update: {
                    args: Prisma.ExperienceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExperiencePayload>;
                };
                deleteMany: {
                    args: Prisma.ExperienceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExperienceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ExperienceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExperiencePayload>[];
                };
                upsert: {
                    args: Prisma.ExperienceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExperiencePayload>;
                };
                aggregate: {
                    args: Prisma.ExperienceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExperience>;
                };
                groupBy: {
                    args: Prisma.ExperienceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExperienceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExperienceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExperienceCountAggregateOutputType> | number;
                };
            };
        };
        Education: {
            payload: Prisma.$EducationPayload<ExtArgs>;
            fields: Prisma.EducationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EducationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EducationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationPayload>;
                };
                findFirst: {
                    args: Prisma.EducationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EducationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationPayload>;
                };
                findMany: {
                    args: Prisma.EducationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationPayload>[];
                };
                create: {
                    args: Prisma.EducationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationPayload>;
                };
                createMany: {
                    args: Prisma.EducationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EducationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationPayload>[];
                };
                delete: {
                    args: Prisma.EducationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationPayload>;
                };
                update: {
                    args: Prisma.EducationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationPayload>;
                };
                deleteMany: {
                    args: Prisma.EducationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EducationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EducationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationPayload>[];
                };
                upsert: {
                    args: Prisma.EducationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EducationPayload>;
                };
                aggregate: {
                    args: Prisma.EducationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEducation>;
                };
                groupBy: {
                    args: Prisma.EducationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EducationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EducationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EducationCountAggregateOutputType> | number;
                };
            };
        };
        Project: {
            payload: Prisma.$ProjectPayload<ExtArgs>;
            fields: Prisma.ProjectFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProjectFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                findFirst: {
                    args: Prisma.ProjectFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                findMany: {
                    args: Prisma.ProjectFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>[];
                };
                create: {
                    args: Prisma.ProjectCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                createMany: {
                    args: Prisma.ProjectCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>[];
                };
                delete: {
                    args: Prisma.ProjectDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                update: {
                    args: Prisma.ProjectUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                deleteMany: {
                    args: Prisma.ProjectDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProjectUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>[];
                };
                upsert: {
                    args: Prisma.ProjectUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectPayload>;
                };
                aggregate: {
                    args: Prisma.ProjectAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProject>;
                };
                groupBy: {
                    args: Prisma.ProjectGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProjectCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectCountAggregateOutputType> | number;
                };
            };
        };
        ProjectContributor: {
            payload: Prisma.$ProjectContributorPayload<ExtArgs>;
            fields: Prisma.ProjectContributorFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProjectContributorFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContributorPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProjectContributorFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContributorPayload>;
                };
                findFirst: {
                    args: Prisma.ProjectContributorFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContributorPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProjectContributorFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContributorPayload>;
                };
                findMany: {
                    args: Prisma.ProjectContributorFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContributorPayload>[];
                };
                create: {
                    args: Prisma.ProjectContributorCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContributorPayload>;
                };
                createMany: {
                    args: Prisma.ProjectContributorCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProjectContributorCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContributorPayload>[];
                };
                delete: {
                    args: Prisma.ProjectContributorDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContributorPayload>;
                };
                update: {
                    args: Prisma.ProjectContributorUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContributorPayload>;
                };
                deleteMany: {
                    args: Prisma.ProjectContributorDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProjectContributorUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProjectContributorUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContributorPayload>[];
                };
                upsert: {
                    args: Prisma.ProjectContributorUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectContributorPayload>;
                };
                aggregate: {
                    args: Prisma.ProjectContributorAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProjectContributor>;
                };
                groupBy: {
                    args: Prisma.ProjectContributorGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectContributorGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProjectContributorCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectContributorCountAggregateOutputType> | number;
                };
            };
        };
        ProjectLink: {
            payload: Prisma.$ProjectLinkPayload<ExtArgs>;
            fields: Prisma.ProjectLinkFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProjectLinkFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectLinkPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProjectLinkFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectLinkPayload>;
                };
                findFirst: {
                    args: Prisma.ProjectLinkFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectLinkPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProjectLinkFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectLinkPayload>;
                };
                findMany: {
                    args: Prisma.ProjectLinkFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectLinkPayload>[];
                };
                create: {
                    args: Prisma.ProjectLinkCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectLinkPayload>;
                };
                createMany: {
                    args: Prisma.ProjectLinkCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProjectLinkCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectLinkPayload>[];
                };
                delete: {
                    args: Prisma.ProjectLinkDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectLinkPayload>;
                };
                update: {
                    args: Prisma.ProjectLinkUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectLinkPayload>;
                };
                deleteMany: {
                    args: Prisma.ProjectLinkDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProjectLinkUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProjectLinkUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectLinkPayload>[];
                };
                upsert: {
                    args: Prisma.ProjectLinkUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProjectLinkPayload>;
                };
                aggregate: {
                    args: Prisma.ProjectLinkAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProjectLink>;
                };
                groupBy: {
                    args: Prisma.ProjectLinkGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectLinkGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProjectLinkCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProjectLinkCountAggregateOutputType> | number;
                };
            };
        };
        Folder: {
            payload: Prisma.$FolderPayload<ExtArgs>;
            fields: Prisma.FolderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FolderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FolderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FolderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FolderPayload>;
                };
                findFirst: {
                    args: Prisma.FolderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FolderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FolderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FolderPayload>;
                };
                findMany: {
                    args: Prisma.FolderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FolderPayload>[];
                };
                create: {
                    args: Prisma.FolderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FolderPayload>;
                };
                createMany: {
                    args: Prisma.FolderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FolderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FolderPayload>[];
                };
                delete: {
                    args: Prisma.FolderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FolderPayload>;
                };
                update: {
                    args: Prisma.FolderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FolderPayload>;
                };
                deleteMany: {
                    args: Prisma.FolderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FolderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FolderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FolderPayload>[];
                };
                upsert: {
                    args: Prisma.FolderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FolderPayload>;
                };
                aggregate: {
                    args: Prisma.FolderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFolder>;
                };
                groupBy: {
                    args: Prisma.FolderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FolderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FolderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FolderCountAggregateOutputType> | number;
                };
            };
        };
        File: {
            payload: Prisma.$FilePayload<ExtArgs>;
            fields: Prisma.FileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FilePayload>;
                };
                findFirst: {
                    args: Prisma.FileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FilePayload>;
                };
                findMany: {
                    args: Prisma.FileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FilePayload>[];
                };
                create: {
                    args: Prisma.FileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FilePayload>;
                };
                createMany: {
                    args: Prisma.FileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FileCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FilePayload>[];
                };
                delete: {
                    args: Prisma.FileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FilePayload>;
                };
                update: {
                    args: Prisma.FileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FilePayload>;
                };
                deleteMany: {
                    args: Prisma.FileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FileUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FilePayload>[];
                };
                upsert: {
                    args: Prisma.FileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FilePayload>;
                };
                aggregate: {
                    args: Prisma.FileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFile>;
                };
                groupBy: {
                    args: Prisma.FileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FileCountAggregateOutputType> | number;
                };
            };
        };
        FileTranscript: {
            payload: Prisma.$FileTranscriptPayload<ExtArgs>;
            fields: Prisma.FileTranscriptFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FileTranscriptFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTranscriptPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FileTranscriptFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTranscriptPayload>;
                };
                findFirst: {
                    args: Prisma.FileTranscriptFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTranscriptPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FileTranscriptFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTranscriptPayload>;
                };
                findMany: {
                    args: Prisma.FileTranscriptFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTranscriptPayload>[];
                };
                create: {
                    args: Prisma.FileTranscriptCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTranscriptPayload>;
                };
                createMany: {
                    args: Prisma.FileTranscriptCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FileTranscriptCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTranscriptPayload>[];
                };
                delete: {
                    args: Prisma.FileTranscriptDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTranscriptPayload>;
                };
                update: {
                    args: Prisma.FileTranscriptUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTranscriptPayload>;
                };
                deleteMany: {
                    args: Prisma.FileTranscriptDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FileTranscriptUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FileTranscriptUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTranscriptPayload>[];
                };
                upsert: {
                    args: Prisma.FileTranscriptUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTranscriptPayload>;
                };
                aggregate: {
                    args: Prisma.FileTranscriptAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFileTranscript>;
                };
                groupBy: {
                    args: Prisma.FileTranscriptGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FileTranscriptGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FileTranscriptCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FileTranscriptCountAggregateOutputType> | number;
                };
            };
        };
        Tag: {
            payload: Prisma.$TagPayload<ExtArgs>;
            fields: Prisma.TagFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TagFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                findFirst: {
                    args: Prisma.TagFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                findMany: {
                    args: Prisma.TagFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>[];
                };
                create: {
                    args: Prisma.TagCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                createMany: {
                    args: Prisma.TagCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>[];
                };
                delete: {
                    args: Prisma.TagDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                update: {
                    args: Prisma.TagUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                deleteMany: {
                    args: Prisma.TagDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TagUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>[];
                };
                upsert: {
                    args: Prisma.TagUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TagPayload>;
                };
                aggregate: {
                    args: Prisma.TagAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTag>;
                };
                groupBy: {
                    args: Prisma.TagGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TagGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TagCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TagCountAggregateOutputType> | number;
                };
            };
        };
        CourseTag: {
            payload: Prisma.$CourseTagPayload<ExtArgs>;
            fields: Prisma.CourseTagFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CourseTagFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CourseTagPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CourseTagFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CourseTagPayload>;
                };
                findFirst: {
                    args: Prisma.CourseTagFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CourseTagPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CourseTagFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CourseTagPayload>;
                };
                findMany: {
                    args: Prisma.CourseTagFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CourseTagPayload>[];
                };
                create: {
                    args: Prisma.CourseTagCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CourseTagPayload>;
                };
                createMany: {
                    args: Prisma.CourseTagCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CourseTagCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CourseTagPayload>[];
                };
                delete: {
                    args: Prisma.CourseTagDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CourseTagPayload>;
                };
                update: {
                    args: Prisma.CourseTagUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CourseTagPayload>;
                };
                deleteMany: {
                    args: Prisma.CourseTagDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CourseTagUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CourseTagUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CourseTagPayload>[];
                };
                upsert: {
                    args: Prisma.CourseTagUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CourseTagPayload>;
                };
                aggregate: {
                    args: Prisma.CourseTagAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCourseTag>;
                };
                groupBy: {
                    args: Prisma.CourseTagGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CourseTagGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CourseTagCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CourseTagCountAggregateOutputType> | number;
                };
            };
        };
        PostTag: {
            payload: Prisma.$PostTagPayload<ExtArgs>;
            fields: Prisma.PostTagFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PostTagFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PostTagFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>;
                };
                findFirst: {
                    args: Prisma.PostTagFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PostTagFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>;
                };
                findMany: {
                    args: Prisma.PostTagFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>[];
                };
                create: {
                    args: Prisma.PostTagCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>;
                };
                createMany: {
                    args: Prisma.PostTagCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PostTagCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>[];
                };
                delete: {
                    args: Prisma.PostTagDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>;
                };
                update: {
                    args: Prisma.PostTagUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>;
                };
                deleteMany: {
                    args: Prisma.PostTagDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PostTagUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PostTagUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>[];
                };
                upsert: {
                    args: Prisma.PostTagUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PostTagPayload>;
                };
                aggregate: {
                    args: Prisma.PostTagAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePostTag>;
                };
                groupBy: {
                    args: Prisma.PostTagGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostTagGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PostTagCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PostTagCountAggregateOutputType> | number;
                };
            };
        };
        FileTag: {
            payload: Prisma.$FileTagPayload<ExtArgs>;
            fields: Prisma.FileTagFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FileTagFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTagPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FileTagFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTagPayload>;
                };
                findFirst: {
                    args: Prisma.FileTagFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTagPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FileTagFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTagPayload>;
                };
                findMany: {
                    args: Prisma.FileTagFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTagPayload>[];
                };
                create: {
                    args: Prisma.FileTagCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTagPayload>;
                };
                createMany: {
                    args: Prisma.FileTagCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FileTagCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTagPayload>[];
                };
                delete: {
                    args: Prisma.FileTagDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTagPayload>;
                };
                update: {
                    args: Prisma.FileTagUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTagPayload>;
                };
                deleteMany: {
                    args: Prisma.FileTagDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FileTagUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FileTagUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTagPayload>[];
                };
                upsert: {
                    args: Prisma.FileTagUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileTagPayload>;
                };
                aggregate: {
                    args: Prisma.FileTagAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFileTag>;
                };
                groupBy: {
                    args: Prisma.FileTagGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FileTagGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FileTagCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FileTagCountAggregateOutputType> | number;
                };
            };
        };
        FileInCourse: {
            payload: Prisma.$FileInCoursePayload<ExtArgs>;
            fields: Prisma.FileInCourseFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FileInCourseFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInCoursePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FileInCourseFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInCoursePayload>;
                };
                findFirst: {
                    args: Prisma.FileInCourseFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInCoursePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FileInCourseFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInCoursePayload>;
                };
                findMany: {
                    args: Prisma.FileInCourseFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInCoursePayload>[];
                };
                create: {
                    args: Prisma.FileInCourseCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInCoursePayload>;
                };
                createMany: {
                    args: Prisma.FileInCourseCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FileInCourseCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInCoursePayload>[];
                };
                delete: {
                    args: Prisma.FileInCourseDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInCoursePayload>;
                };
                update: {
                    args: Prisma.FileInCourseUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInCoursePayload>;
                };
                deleteMany: {
                    args: Prisma.FileInCourseDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FileInCourseUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FileInCourseUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInCoursePayload>[];
                };
                upsert: {
                    args: Prisma.FileInCourseUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInCoursePayload>;
                };
                aggregate: {
                    args: Prisma.FileInCourseAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFileInCourse>;
                };
                groupBy: {
                    args: Prisma.FileInCourseGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FileInCourseGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FileInCourseCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FileInCourseCountAggregateOutputType> | number;
                };
            };
        };
        FileInPost: {
            payload: Prisma.$FileInPostPayload<ExtArgs>;
            fields: Prisma.FileInPostFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FileInPostFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInPostPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FileInPostFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInPostPayload>;
                };
                findFirst: {
                    args: Prisma.FileInPostFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInPostPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FileInPostFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInPostPayload>;
                };
                findMany: {
                    args: Prisma.FileInPostFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInPostPayload>[];
                };
                create: {
                    args: Prisma.FileInPostCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInPostPayload>;
                };
                createMany: {
                    args: Prisma.FileInPostCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FileInPostCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInPostPayload>[];
                };
                delete: {
                    args: Prisma.FileInPostDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInPostPayload>;
                };
                update: {
                    args: Prisma.FileInPostUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInPostPayload>;
                };
                deleteMany: {
                    args: Prisma.FileInPostDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FileInPostUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FileInPostUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInPostPayload>[];
                };
                upsert: {
                    args: Prisma.FileInPostUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileInPostPayload>;
                };
                aggregate: {
                    args: Prisma.FileInPostAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFileInPost>;
                };
                groupBy: {
                    args: Prisma.FileInPostGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FileInPostGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FileInPostCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FileInPostCountAggregateOutputType> | number;
                };
            };
        };
        Photo: {
            payload: Prisma.$PhotoPayload<ExtArgs>;
            fields: Prisma.PhotoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PhotoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhotoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PhotoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhotoPayload>;
                };
                findFirst: {
                    args: Prisma.PhotoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhotoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PhotoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhotoPayload>;
                };
                findMany: {
                    args: Prisma.PhotoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhotoPayload>[];
                };
                create: {
                    args: Prisma.PhotoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhotoPayload>;
                };
                createMany: {
                    args: Prisma.PhotoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PhotoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhotoPayload>[];
                };
                delete: {
                    args: Prisma.PhotoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhotoPayload>;
                };
                update: {
                    args: Prisma.PhotoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhotoPayload>;
                };
                deleteMany: {
                    args: Prisma.PhotoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PhotoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PhotoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhotoPayload>[];
                };
                upsert: {
                    args: Prisma.PhotoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PhotoPayload>;
                };
                aggregate: {
                    args: Prisma.PhotoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePhoto>;
                };
                groupBy: {
                    args: Prisma.PhotoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PhotoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PhotoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PhotoCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UsersScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly password: "password";
    readonly firstname: "firstname";
    readonly lastname: "lastname";
    readonly middlename: "middlename";
    readonly username: "username";
    readonly avatarId: "avatarId";
    readonly backgroundId: "backgroundId";
    readonly headline: "headline";
    readonly bio: "bio";
    readonly postsCount: "postsCount";
    readonly coursesCount: "coursesCount";
    readonly followersCount: "followersCount";
    readonly followingCount: "followingCount";
    readonly subscribersCount: "subscribersCount";
    readonly ratingCount: "ratingCount";
    readonly ratingTotal: "ratingTotal";
    readonly rating: "rating";
    readonly sessionVersion: "sessionVersion";
    readonly role: "role";
    readonly isBanned: "isBanned";
    readonly bannedAt: "bannedAt";
    readonly banReason: "banReason";
    readonly creatorPrompt: "creatorPrompt";
    readonly createdAt: "createdAt";
};
export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum];
export declare const SocialLinkScalarFieldEnum: {
    readonly id: "id";
    readonly platform: "platform";
    readonly url: "url";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type SocialLinkScalarFieldEnum = (typeof SocialLinkScalarFieldEnum)[keyof typeof SocialLinkScalarFieldEnum];
export declare const OAuthAccountScalarFieldEnum: {
    readonly id: "id";
    readonly provider: "provider";
    readonly providerUserId: "providerUserId";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type OAuthAccountScalarFieldEnum = (typeof OAuthAccountScalarFieldEnum)[keyof typeof OAuthAccountScalarFieldEnum];
export declare const EmailAuthTokenScalarFieldEnum: {
    readonly id: "id";
    readonly tokenHash: "tokenHash";
    readonly email: "email";
    readonly purpose: "purpose";
    readonly pendingUser: "pendingUser";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
};
export type EmailAuthTokenScalarFieldEnum = (typeof EmailAuthTokenScalarFieldEnum)[keyof typeof EmailAuthTokenScalarFieldEnum];
export declare const PayoutAccountScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly accountHolderName: "accountHolderName";
    readonly country: "country";
    readonly currency: "currency";
    readonly payoutMethod: "payoutMethod";
    readonly bankName: "bankName";
    readonly routingNumber: "routingNumber";
    readonly accountNumber: "accountNumber";
    readonly paypalEmail: "paypalEmail";
    readonly taxResidency: "taxResidency";
    readonly businessType: "businessType";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PayoutAccountScalarFieldEnum = (typeof PayoutAccountScalarFieldEnum)[keyof typeof PayoutAccountScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly actorId: "actorId";
    readonly type: "type";
    readonly title: "title";
    readonly message: "message";
    readonly link: "link";
    readonly readAt: "readAt";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const PasswordResetTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly token: "token";
    readonly expiresAt: "expiresAt";
    readonly used: "used";
    readonly createdAt: "createdAt";
};
export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum];
export declare const FollowScalarFieldEnum: {
    readonly followerId: "followerId";
    readonly followingId: "followingId";
    readonly createdAt: "createdAt";
};
export type FollowScalarFieldEnum = (typeof FollowScalarFieldEnum)[keyof typeof FollowScalarFieldEnum];
export declare const ChatConversationScalarFieldEnum: {
    readonly id: "id";
    readonly userAId: "userAId";
    readonly userBId: "userBId";
    readonly lastMessageAt: "lastMessageAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ChatConversationScalarFieldEnum = (typeof ChatConversationScalarFieldEnum)[keyof typeof ChatConversationScalarFieldEnum];
export declare const ChatMessageScalarFieldEnum: {
    readonly id: "id";
    readonly conversationId: "conversationId";
    readonly senderId: "senderId";
    readonly text: "text";
    readonly readAt: "readAt";
    readonly createdAt: "createdAt";
};
export type ChatMessageScalarFieldEnum = (typeof ChatMessageScalarFieldEnum)[keyof typeof ChatMessageScalarFieldEnum];
export declare const CourseScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly userId: "userId";
    readonly price: "price";
    readonly currency: "currency";
    readonly thumbnailId: "thumbnailId";
    readonly folderId: "folderId";
    readonly subscribersCount: "subscribersCount";
    readonly postsCount: "postsCount";
    readonly ratingCount: "ratingCount";
    readonly ratingTotal: "ratingTotal";
    readonly rating: "rating";
    readonly createdAt: "createdAt";
    readonly lastUpdated: "lastUpdated";
};
export type CourseScalarFieldEnum = (typeof CourseScalarFieldEnum)[keyof typeof CourseScalarFieldEnum];
export declare const SubscribeScalarFieldEnum: {
    readonly id: "id";
    readonly courseId: "courseId";
    readonly userId: "userId";
    readonly review: "review";
    readonly rating: "rating";
    readonly price: "price";
    readonly currency: "currency";
    readonly paymentSessionId: "paymentSessionId";
    readonly createdAt: "createdAt";
};
export type SubscribeScalarFieldEnum = (typeof SubscribeScalarFieldEnum)[keyof typeof SubscribeScalarFieldEnum];
export declare const PostScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly content: "content";
    readonly userId: "userId";
    readonly courseId: "courseId";
    readonly isPreview: "isPreview";
    readonly ratingCount: "ratingCount";
    readonly ratingTotal: "ratingTotal";
    readonly rating: "rating";
    readonly createdAt: "createdAt";
    readonly lastUpdated: "lastUpdated";
};
export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum];
export declare const RecentCourseViewScalarFieldEnum: {
    readonly id: "id";
    readonly courseId: "courseId";
    readonly userId: "userId";
    readonly viewedAt: "viewedAt";
};
export type RecentCourseViewScalarFieldEnum = (typeof RecentCourseViewScalarFieldEnum)[keyof typeof RecentCourseViewScalarFieldEnum];
export declare const RecentPostViewScalarFieldEnum: {
    readonly id: "id";
    readonly postId: "postId";
    readonly userId: "userId";
    readonly viewedAt: "viewedAt";
};
export type RecentPostViewScalarFieldEnum = (typeof RecentPostViewScalarFieldEnum)[keyof typeof RecentPostViewScalarFieldEnum];
export declare const RatePostScalarFieldEnum: {
    readonly id: "id";
    readonly postId: "postId";
    readonly userId: "userId";
    readonly rating: "rating";
    readonly createdAt: "createdAt";
};
export type RatePostScalarFieldEnum = (typeof RatePostScalarFieldEnum)[keyof typeof RatePostScalarFieldEnum];
export declare const DiscussionScalarFieldEnum: {
    readonly id: "id";
    readonly discussion: "discussion";
    readonly ratingCount: "ratingCount";
    readonly ratingTotal: "ratingTotal";
    readonly rating: "rating";
    readonly postId: "postId";
    readonly userId: "userId";
    readonly parentId: "parentId";
    readonly repliedId: "repliedId";
    readonly createdAt: "createdAt";
};
export type DiscussionScalarFieldEnum = (typeof DiscussionScalarFieldEnum)[keyof typeof DiscussionScalarFieldEnum];
export declare const RateDiscussionScalarFieldEnum: {
    readonly id: "id";
    readonly discussionId: "discussionId";
    readonly userId: "userId";
    readonly rating: "rating";
    readonly createdAt: "createdAt";
};
export type RateDiscussionScalarFieldEnum = (typeof RateDiscussionScalarFieldEnum)[keyof typeof RateDiscussionScalarFieldEnum];
export declare const ExperienceScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly position: "position";
    readonly role: "role";
    readonly startedAt: "startedAt";
    readonly endedAt: "endedAt";
    readonly location: "location";
    readonly achievement: "achievement";
    readonly order: "order";
    readonly userId: "userId";
    readonly logoId: "logoId";
    readonly createdAt: "createdAt";
};
export type ExperienceScalarFieldEnum = (typeof ExperienceScalarFieldEnum)[keyof typeof ExperienceScalarFieldEnum];
export declare const EducationScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly major: "major";
    readonly degree: "degree";
    readonly startedAt: "startedAt";
    readonly endedAt: "endedAt";
    readonly location: "location";
    readonly achievement: "achievement";
    readonly order: "order";
    readonly userId: "userId";
    readonly logoId: "logoId";
    readonly createdAt: "createdAt";
};
export type EducationScalarFieldEnum = (typeof EducationScalarFieldEnum)[keyof typeof EducationScalarFieldEnum];
export declare const ProjectScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly role: "role";
    readonly startedAt: "startedAt";
    readonly endedAt: "endedAt";
    readonly details: "details";
    readonly order: "order";
    readonly userId: "userId";
    readonly logoId: "logoId";
    readonly createdAt: "createdAt";
};
export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum];
export declare const ProjectContributorScalarFieldEnum: {
    readonly projectId: "projectId";
    readonly userId: "userId";
    readonly role: "role";
    readonly createdAt: "createdAt";
};
export type ProjectContributorScalarFieldEnum = (typeof ProjectContributorScalarFieldEnum)[keyof typeof ProjectContributorScalarFieldEnum];
export declare const ProjectLinkScalarFieldEnum: {
    readonly id: "id";
    readonly projectId: "projectId";
    readonly name: "name";
    readonly url: "url";
    readonly createdAt: "createdAt";
};
export type ProjectLinkScalarFieldEnum = (typeof ProjectLinkScalarFieldEnum)[keyof typeof ProjectLinkScalarFieldEnum];
export declare const FolderScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly name: "name";
    readonly parentId: "parentId";
    readonly createdAt: "createdAt";
};
export type FolderScalarFieldEnum = (typeof FolderScalarFieldEnum)[keyof typeof FolderScalarFieldEnum];
export declare const FileScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly mimeType: "mimeType";
    readonly size: "size";
    readonly userId: "userId";
    readonly folderId: "folderId";
    readonly createdAt: "createdAt";
    readonly moderationStatus: "moderationStatus";
    readonly moderationScore: "moderationScore";
    readonly moderationCategories: "moderationCategories";
    readonly moderationMessage: "moderationMessage";
};
export type FileScalarFieldEnum = (typeof FileScalarFieldEnum)[keyof typeof FileScalarFieldEnum];
export declare const FileTranscriptScalarFieldEnum: {
    readonly id: "id";
    readonly fileId: "fileId";
    readonly status: "status";
    readonly text: "text";
    readonly language: "language";
    readonly durationSec: "durationSec";
    readonly provider: "provider";
    readonly model: "model";
    readonly errorMessage: "errorMessage";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FileTranscriptScalarFieldEnum = (typeof FileTranscriptScalarFieldEnum)[keyof typeof FileTranscriptScalarFieldEnum];
export declare const TagScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly embedding: "embedding";
    readonly createdAt: "createdAt";
};
export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum];
export declare const CourseTagScalarFieldEnum: {
    readonly courseId: "courseId";
    readonly tagId: "tagId";
    readonly isSuggested: "isSuggested";
    readonly score: "score";
    readonly createdAt: "createdAt";
};
export type CourseTagScalarFieldEnum = (typeof CourseTagScalarFieldEnum)[keyof typeof CourseTagScalarFieldEnum];
export declare const PostTagScalarFieldEnum: {
    readonly postId: "postId";
    readonly tagId: "tagId";
    readonly isSuggested: "isSuggested";
    readonly score: "score";
    readonly createdAt: "createdAt";
};
export type PostTagScalarFieldEnum = (typeof PostTagScalarFieldEnum)[keyof typeof PostTagScalarFieldEnum];
export declare const FileTagScalarFieldEnum: {
    readonly fileId: "fileId";
    readonly tagId: "tagId";
    readonly isSuggested: "isSuggested";
    readonly score: "score";
    readonly createdAt: "createdAt";
};
export type FileTagScalarFieldEnum = (typeof FileTagScalarFieldEnum)[keyof typeof FileTagScalarFieldEnum];
export declare const FileInCourseScalarFieldEnum: {
    readonly fileId: "fileId";
    readonly courseId: "courseId";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type FileInCourseScalarFieldEnum = (typeof FileInCourseScalarFieldEnum)[keyof typeof FileInCourseScalarFieldEnum];
export declare const FileInPostScalarFieldEnum: {
    readonly fileId: "fileId";
    readonly postId: "postId";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type FileInPostScalarFieldEnum = (typeof FileInPostScalarFieldEnum)[keyof typeof FileInPostScalarFieldEnum];
export declare const PhotoScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly url: "url";
    readonly name: "name";
    readonly createdAt: "createdAt";
};
export type PhotoScalarFieldEnum = (typeof PhotoScalarFieldEnum)[keyof typeof PhotoScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type EnumAccountRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountRole'>;
export type ListEnumAccountRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountRole[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type EnumSocialPlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SocialPlatform'>;
export type ListEnumSocialPlatformFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SocialPlatform[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>;
export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>;
export type EnumModerationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModerationStatus'>;
export type ListEnumModerationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModerationStatus[]'>;
export type EnumTranscriptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TranscriptStatus'>;
export type ListEnumTranscriptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TranscriptStatus[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    users?: Prisma.UsersOmit;
    socialLink?: Prisma.SocialLinkOmit;
    oAuthAccount?: Prisma.OAuthAccountOmit;
    emailAuthToken?: Prisma.EmailAuthTokenOmit;
    payoutAccount?: Prisma.PayoutAccountOmit;
    notification?: Prisma.NotificationOmit;
    passwordResetToken?: Prisma.PasswordResetTokenOmit;
    follow?: Prisma.FollowOmit;
    chatConversation?: Prisma.ChatConversationOmit;
    chatMessage?: Prisma.ChatMessageOmit;
    course?: Prisma.CourseOmit;
    subscribe?: Prisma.SubscribeOmit;
    post?: Prisma.PostOmit;
    recentCourseView?: Prisma.RecentCourseViewOmit;
    recentPostView?: Prisma.RecentPostViewOmit;
    ratePost?: Prisma.RatePostOmit;
    discussion?: Prisma.DiscussionOmit;
    rateDiscussion?: Prisma.RateDiscussionOmit;
    experience?: Prisma.ExperienceOmit;
    education?: Prisma.EducationOmit;
    project?: Prisma.ProjectOmit;
    projectContributor?: Prisma.ProjectContributorOmit;
    projectLink?: Prisma.ProjectLinkOmit;
    folder?: Prisma.FolderOmit;
    file?: Prisma.FileOmit;
    fileTranscript?: Prisma.FileTranscriptOmit;
    tag?: Prisma.TagOmit;
    courseTag?: Prisma.CourseTagOmit;
    postTag?: Prisma.PostTagOmit;
    fileTag?: Prisma.FileTagOmit;
    fileInCourse?: Prisma.FileInCourseOmit;
    fileInPost?: Prisma.FileInPostOmit;
    photo?: Prisma.PhotoOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
