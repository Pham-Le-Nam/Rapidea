import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RateDiscussionService } from './rate-discussion.service';
import { AddRateDiscussionDto } from './rate-discussion-dto/add-rate-discussion.dto';
import { UpdateRateDiscussionDto } from './rate-discussion-dto/update-rate-discussion.dto';

@Controller('api/rate-discussion')
export class RateDiscussionController {
    constructor (
        private readonly rateDiscussionService: RateDiscussionService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getRating (
        @Param('id') id: string,
        @Request() req: any,
    ) {
        const user = req.user;
        const userId = user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        const rateDiscussion = await this.rateDiscussionService.findRateDiscussion(id, userId);
        const isRated = !!rateDiscussion;

        if (isRated) {
            return {
                isRated,
                rateDiscussion,
            };
        }

        return {
            isRated,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async rateDiscussion (
        @Request() req: any,
        @Body() addRateDiscussionDto: AddRateDiscussionDto,
    ) {
        const user = req.user;
        const userId = user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        const rateDiscussion = await this.rateDiscussionService.createRateDiscussion(
            addRateDiscussionDto.discussionId,
            userId,
            addRateDiscussionDto.rating,
        );

        if (!rateDiscussion) {
            throw new InternalServerErrorException("Couldn't rate the discussion", "Couldn't rate the discussion");
        }

        return rateDiscussion;
    }

    @UseGuards(JwtAuthGuard)
    @Post('update/:id')
    async updateRateById (
        @Param('id') id: string,
        @Request() req: any,
        @Body() data: {rating: number},
    ) {
        const user = req.user;
        const userId = user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        const rateDiscussion = await this.rateDiscussionService.updateRateDiscussionById(id, userId, data.rating);

        if (!rateDiscussion) {
            throw new InternalServerErrorException("Couldn't re-rate the discussion", "Couldn't re-rate the discussion");
        }

        return rateDiscussion;
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updateRateDiscussion (
        @Request() req: any,
        @Body() updateRateDiscussionDto: UpdateRateDiscussionDto,
    ) {
        const user = req.user;
        const userId = user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        const rateDiscussion = await this.rateDiscussionService.updateRateDiscussionByDiscussionId(
            updateRateDiscussionDto.discussionId,
            userId,
            updateRateDiscussionDto.rating,
        );

        if (!rateDiscussion) {
            throw new InternalServerErrorException("Couldn't re-rate the discussion", "Couldn't re-rate the discussion");
        }

        return rateDiscussion;
    }
}
