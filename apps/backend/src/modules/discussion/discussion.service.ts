import { 
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { DiscussionRepository } from './discussion.repository';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from '../../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DiscussionService {
    constructor (
        @Inject('DISCUSSION_REPOSITORY')
        private readonly discussionRepo: DiscussionRepository,
        private readonly notificationService: NotificationService,
        private readonly prisma: PrismaService,
    ) {}

    async createDiscussion (discussion: any, postId: string, userId: string, repliedId?: string) {
        let postDiscussion: any;

        if (!repliedId) {
            postDiscussion = await this.discussionRepo.create(discussion, postId, userId);
        } else {
            const repliedDiscussion = await this.discussionRepo.findById(repliedId);

            if (!repliedDiscussion) {
                throw new NotFoundException("Replied discussion not found");
            }

            const parentId = repliedDiscussion.parentId ?? repliedDiscussion.id;

            postDiscussion = await this.discussionRepo.create(discussion, postId, userId, parentId, repliedId);
        }        

        if (!postDiscussion) {
            throw new InternalServerErrorException("Couldn't create discussion", "Couldn't create discussion");
        }

        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            select: {
                userId: true,
                title: true,
            },
        });

        if (post) {
            await this.notificationService.createNotification({
                userId: post.userId,
                actorId: userId,
                type: NotificationType.POST_DISCUSSION,
                title: 'New post discussion',
                message: post.title || 'Untitled post',
                link: `/post/${postId}`,
            });
        }

        return postDiscussion;
    }

    async updateDiscussionById (id: string, userId: string, discussion: any) {
        const postDiscussion = await this.discussionRepo.updateById(id, userId, discussion);

        if (!postDiscussion) {
            throw new InternalServerErrorException("Couldn't update discussion", "Couldn't update discussion");
        }

        return postDiscussion;
    }

    async deleteDiscussionById (id: string, userId: string) {
        const postDiscussion = await this.discussionRepo.deleteById(id, userId);

        if (!postDiscussion) {
            throw new InternalServerErrorException("Couldn't delete discussion", "Couldn't delete discussion");
        }

        return postDiscussion;
    }

    async getDiscussionById (id: string) {
        const postDiscussion = await this.discussionRepo.findById(id);

        if (!postDiscussion) {
            throw new NotFoundException("Discussion not found", "Discussion not found");
        }

        return postDiscussion;
    }

    async getDiscussionsByPostId (postId: string, startIndex?: number, amount?: number) {
        const postDiscussions = await this.discussionRepo.findByPostId(postId, startIndex, amount);

        if (!postDiscussions) {
            throw new NotFoundException("Discussions not found", "Discussions not found");
        }

        return postDiscussions;
    }

    async getReplyingDiscussionById (id: string, startIndex?: number, amount?: number) {
        const replyingDiscussions = await this.discussionRepo.findReplyingById(id, startIndex, amount);

        if (!replyingDiscussions) {
            throw new NotFoundException("Discussions not found", "Discussions not found");
        }

        return replyingDiscussions;
    }

    async getChildrenDiscussionById (id: string, startIndex?: number, amount?: number) {
        const childrenDiscussions = await this.discussionRepo.findChildrenById(id, startIndex, amount);

        if (!childrenDiscussions) {
            throw new NotFoundException("Discussions not found", "Discussions not found");
        }

        return childrenDiscussions;
    }
}
