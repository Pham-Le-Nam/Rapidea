import { PrismaService } from '../../prisma/prisma.service';
import { RateDiscussionRepository } from '../../modules/rate-discussion/rate-discussion.repository';
export declare class PrismaRateDiscussionRepository implements RateDiscussionRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(discussionId: string, userId: string, rating: number): Promise<any>;
    updateById(id: string, userId: string, rating: number): Promise<any>;
    updateByDiscussionId(discussionId: string, userId: string, rating: number): Promise<any>;
    findRating(discussionId: string, userId: string): Promise<any>;
}
