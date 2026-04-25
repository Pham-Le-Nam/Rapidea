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
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { DiscussionService } from './discussion.service';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt.guard';
import { AddDiscussionDto } from './discussion-dto/add-discussion.dto';
import { UpdateDiscussionDto } from './discussion-dto/update-discussion.dto';

@Controller('api/discussion')
export class DiscussionController {
    constructor (
        private readonly discussionService: DiscussionService,
    ) {}

    @UseGuards(OptionalJwtAuthGuard)
    @Get(':id')
    async getDiscussionById (
        @Param('id') id: string,
        @Request() req: any,
    ) {
        const user = req.user;

        const discusssion = await this.discussionService.getDiscussionById(id);
        const isOwner = (user?.userId === discusssion.userId);

        return {
            isOwner,
            discusssion,
        };
    }

    @Get('post/:id')
    async getDiscussionsById (
        @Param('id') id: string,
        @Query('startIndex', ParseIntPipe) startIndex = 0,
        @Query('amount', ParseIntPipe) amount = 5,
    ) {
        return this.discussionService.getDiscussionsByPostId(id, startIndex, amount);
    }

    @Get('replying/:id')
    async getReplyingDiscussions (
        @Param('id') id: string,
        @Query('startIndex', ParseIntPipe) startIndex = 0,
        @Query('amount', ParseIntPipe) amount = 5,
    ) {
        return this.discussionService.getReplyingDiscussionById(id, startIndex, amount);
    }

    @Get('children/:id')
    async getChildrenDiscussions (
        @Param('id') id: string,
        @Query('startIndex', ParseIntPipe) startIndex = 0,
        @Query('amount', ParseIntPipe) amount = 5,
    ) {
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
