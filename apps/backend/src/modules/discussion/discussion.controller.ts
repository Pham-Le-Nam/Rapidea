import { 
    Controller,
    UseGuards,
    Get,
    Post,
    Param,
    Body,
    Query,
    Request,
    NotFoundException,
    InternalServerErrorException,
    ParseIntPipe,
    ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { DiscussionService } from './discussion.service';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt.guard';
import { AddDiscussionDto } from './discussion-dto/add-discussion.dto';
import { UpdateDiscussionDto } from './discussion-dto/update-discussion.dto';
import { PostService } from '../post/post.service';

@Controller('api/discussion')
export class DiscussionController {
    constructor (
        private readonly discussionService: DiscussionService,
        private readonly postService: PostService,
    ) {}

    private async assertCanViewPostDiscussions(postId: string, userId?: string) {
        const post = await this.postService.getPostById(postId);

        if (!post) {
            throw new NotFoundException("Post not found");
        }

        const canView = !post.courseId
            || post.isPreview
            || (userId && userId === post.userId)
            || (userId && post.course?.subscribers?.some((subscription: any) => subscription.userId === userId));

        if (!canView) {
            throw new ForbiddenException("Subscribe to this course to view this post's discussions");
        }
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Get(':id')
    async getDiscussionById (
        @Param('id') id: string,
        @Request() req: any,
    ) {
        const user = req.user;

        const discusssion = await this.discussionService.getDiscussionById(id);
        await this.assertCanViewPostDiscussions(discusssion.postId, user?.userId);
        const isOwner = (user?.userId === discusssion.userId);

        return {
            isOwner,
            discusssion,
        };
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Get('post/:id')
    async getDiscussionsById (
        @Param('id') id: string,
        @Request() req: any,
        @Query('startIndex', ParseIntPipe) startIndex = 0,
        @Query('amount', ParseIntPipe) amount = 5,
    ) {
        await this.assertCanViewPostDiscussions(id, req.user?.userId);

        return this.discussionService.getDiscussionsByPostId(id, startIndex, amount);
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Get('replying/:id')
    async getReplyingDiscussions (
        @Param('id') id: string,
        @Request() req: any,
        @Query('startIndex', ParseIntPipe) startIndex = 0,
        @Query('amount', ParseIntPipe) amount = 5,
    ) {
        const discussion = await this.discussionService.getDiscussionById(id);
        await this.assertCanViewPostDiscussions(discussion.postId, req.user?.userId);

        return this.discussionService.getReplyingDiscussionById(id, startIndex, amount);
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Get('children/:id')
    async getChildrenDiscussions (
        @Param('id') id: string,
        @Request() req: any,
        @Query('startIndex', ParseIntPipe) startIndex = 0,
        @Query('amount', ParseIntPipe) amount = 5,
    ) {
        const discussion = await this.discussionService.getDiscussionById(id);
        await this.assertCanViewPostDiscussions(discussion.postId, req.user?.userId);

        return this.discussionService.getChildrenDiscussionById(id, startIndex, amount);
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addDiscussion (
        @Request() req: any,
        @Body() addDiscussionDto: AddDiscussionDto,
    ) {
        const user = req.user;
        const userId = user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        await this.assertCanViewPostDiscussions(addDiscussionDto.postId, userId);

        const discussion = await this.discussionService.createDiscussion(
            addDiscussionDto.discussion,
            addDiscussionDto.postId,
            userId,
            addDiscussionDto.repliedId,
        );

        return discussion;
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updateDiscussion (
        @Request() req: any,
        @Body() updateDiscussionDto: UpdateDiscussionDto,
    ) {
        const user = req.user;
        const userId = user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        const discussion = await this.discussionService.updateDiscussionById(
            updateDiscussionDto.id,
            userId,
            updateDiscussionDto.discussion,
        );

        return discussion;
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteDiscussion (
        @Request() req: any,
        @Body() data: {id: string},
    ) {
        const user = req.user;
        const userId = user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        const discussion = await this.discussionService.deleteDiscussionById(data.id, userId);

        return discussion;
    }
}
