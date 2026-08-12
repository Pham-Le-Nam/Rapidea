import { PrismaService } from '../../prisma/prisma.service';
import { SubscribeRepository } from '../../modules/subscribe/subscribe.repository';
export declare class PrismaSubscribeRepository implements SubscribeRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getCoursePrice(courseId: string): import("../../../generated/prisma/models").Prisma__CourseClient<{
        price: number;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    getCheckoutContext(courseId: string, userId: string): Promise<{
        course: ({
            user: {
                payoutAccount: {
                    id: string;
                    createdAt: Date;
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
                    updatedAt: Date;
                } | null;
            } & {
                id: string;
                email: string;
                password: string | null;
                firstname: string;
                lastname: string;
                middlename: string | null;
                username: string;
                avatarId: number | null;
                backgroundId: number | null;
                headline: string | null;
                bio: string | null;
                postsCount: number;
                coursesCount: number;
                followersCount: number;
                followingCount: number;
                subscribersCount: number;
                ratingCount: number;
                ratingTotal: number;
                rating: number;
                sessionVersion: number;
                role: import("../../../generated/prisma/enums").AccountRole;
                isBanned: boolean;
                bannedAt: Date | null;
                banReason: string | null;
                creatorPrompt: string | null;
                createdAt: Date;
            };
        } & {
            id: string;
            postsCount: number;
            subscribersCount: number;
            ratingCount: number;
            ratingTotal: number;
            rating: number;
            createdAt: Date;
            userId: string;
            currency: string;
            title: string;
            description: string | null;
            price: number;
            thumbnailId: number | null;
            folderId: string;
            lastUpdated: Date;
        }) | null;
        user: {
            id: string;
            email: string;
            password: string | null;
            firstname: string;
            lastname: string;
            middlename: string | null;
            username: string;
            avatarId: number | null;
            backgroundId: number | null;
            headline: string | null;
            bio: string | null;
            postsCount: number;
            coursesCount: number;
            followersCount: number;
            followingCount: number;
            subscribersCount: number;
            ratingCount: number;
            ratingTotal: number;
            rating: number;
            sessionVersion: number;
            role: import("../../../generated/prisma/enums").AccountRole;
            isBanned: boolean;
            bannedAt: Date | null;
            banReason: string | null;
            creatorPrompt: string | null;
            createdAt: Date;
        } | null;
    }>;
    findByPaymentSession(sessionId: string): import("../../../generated/prisma/models").Prisma__SubscribeClient<{
        id: string;
        rating: number;
        createdAt: Date;
        userId: string;
        currency: string;
        price: number;
        courseId: string;
        review: string | null;
        paymentSessionId: string | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    attachPaymentSession(subscriptionId: string, sessionId: string): import("../../../generated/prisma/models").Prisma__SubscribeClient<{
        id: string;
        rating: number;
        createdAt: Date;
        userId: string;
        currency: string;
        price: number;
        courseId: string;
        review: string | null;
        paymentSessionId: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findCourseSummary(courseId: string): import("../../../generated/prisma/models").Prisma__CourseClient<{
        userId: string;
        title: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    create(courseId: string, userId: string): Promise<any>;
    delete(courseId: string, userId: string): Promise<any>;
    reviewByCourseId(courseId: string, userId: string, review: string, rating: number): Promise<any>;
    getSubscribedCourses(userId: string): Promise<any>;
    getSubscribers(courseId: string): Promise<any>;
    getSubscriptionsByCourse(courseId: string): Promise<any>;
    getSubscription(courseId: string, userId: string): Promise<any>;
}
