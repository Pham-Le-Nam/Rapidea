import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get users(): Prisma.UsersDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get socialLink(): Prisma.SocialLinkDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get oAuthAccount(): Prisma.OAuthAccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get emailAuthToken(): Prisma.EmailAuthTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get payoutAccount(): Prisma.PayoutAccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get passwordResetToken(): Prisma.PasswordResetTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get follow(): Prisma.FollowDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get chatConversation(): Prisma.ChatConversationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get chatMessage(): Prisma.ChatMessageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get course(): Prisma.CourseDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get subscribe(): Prisma.SubscribeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get post(): Prisma.PostDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get recentCourseView(): Prisma.RecentCourseViewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get recentPostView(): Prisma.RecentPostViewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ratePost(): Prisma.RatePostDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get discussion(): Prisma.DiscussionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get rateDiscussion(): Prisma.RateDiscussionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get experience(): Prisma.ExperienceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get education(): Prisma.EducationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get project(): Prisma.ProjectDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get projectContributor(): Prisma.ProjectContributorDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get projectLink(): Prisma.ProjectLinkDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get folder(): Prisma.FolderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get file(): Prisma.FileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get fileTranscript(): Prisma.FileTranscriptDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get tag(): Prisma.TagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get courseTag(): Prisma.CourseTagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get postTag(): Prisma.PostTagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get fileTag(): Prisma.FileTagDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get fileInCourse(): Prisma.FileInCourseDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get fileInPost(): Prisma.FileInPostDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get photo(): Prisma.PhotoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
