import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ReplyDiscussionRepository } from '../../modules/reply-discussion/reply-discussion.repository';

@Injectable()
export class PrismaReplyDiscussionRepository implements ReplyDiscussionRepository {
    constructor(private prisma: PrismaService) {}

    async create(repliedId: string, replyingId: string): Promise<any> {
        const replied = await this.prisma.discussion.findUnique({
            where: {
                id: repliedId,
            },
        });

        const replying = await this.prisma.discussion.findUnique({
            where: {
                id: replyingId,
            },
        });

        if(!replied || !replying) {
            throw new InternalServerErrorException("Couldn't reply to the discussion");
        }

        return this.prisma.replyDiscussion.create({
            data: {
                repliedId,
                replyingId,
            },
        });
    }

    async findByRepliedId(repliedId: string): Promise<any> {
        const replyings = await this.prisma.replyDiscussion.findMany({
            where: {
                repliedId,
            },
            select: {
                replyingId: true,
            },
        });

        const ids = replyings.map(replying => replying.replyingId);

        return this.prisma.discussion.findMany({
            where: {
                id: { in: ids },
            },
        });
    }
}