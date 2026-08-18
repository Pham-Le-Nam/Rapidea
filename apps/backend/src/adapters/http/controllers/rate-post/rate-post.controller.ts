import { 
    Controller,
    Get,
    Post,
    UseGuards,
    Param,
    Body,
    Query,
    Request,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { RatePostService } from '../../../../application/rate-post/rate-post.service';
import { JwtAuthGuard } from '../../guards/auth/jwt.guard';
import { AddRatePostDto } from '../../dto/rate-post/add-rate-post.dto';
import { UpdateRatePostDto } from '../../dto/rate-post/update-rate-post.dto';

@Controller('api/rate-post')
export class RatePostController {
    constructor (
        private readonly ratePostService: RatePostService,
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

        const ratePost = await this.ratePostService.findRatePost(id, userId);

        const isRated = !!ratePost;

        if (isRated) {
            return {
                isRated,
                ratePost,
            };
        }

        return {
            isRated,
        };
    }

    // @UseGuards(JwtAuthGuard)
    @Get('post/:id')
    async getRatingByPostId (
        @Param('id') id: string,
        // @Request() req: any,
    ) {
        // const user = req.user;
        // const userId = user?.userId;

        // if (!userId) {
        //     throw new NotFoundException("User not found", "User not found");
        // }

        const ratePosts = await this.ratePostService.findRatePostByPostId(id);

        if (!ratePosts) {
            return [];
        }

        return ratePosts;
    }

    // @UseGuards(JwtAuthGuard)
    @Get('user/:id')
    async getRatingByUserId (
        @Param('id') id: string,
        // @Request() req: any,
    ) {
        // const user = req.user;
        // const userId = user?.userId;

        // if (!userId) {
        //     throw new NotFoundException("User not found", "User not found");
        // }

        const ratePosts = await this.ratePostService.findRatePostByUserId(id);

        if (!ratePosts) {
            return [];
        }

        return ratePosts;
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async ratePost (
        @Request() req: any,
        @Body() addRatePostDto: AddRatePostDto,
    ) {
        const user = req.user;
        const userId = user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        const ratePost = await this.ratePostService.createRatePost(addRatePostDto.postId, userId, addRatePostDto.rating);

        if (!ratePost) {
            throw new InternalServerErrorException("Couldn't rate the post", "Couldn't rate the post");
        }

        return ratePost;
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

        const ratePost = await this.ratePostService.updateRatePostById(id, userId, data.rating);

        if (!ratePost) {
            throw new InternalServerErrorException("Couldn't re-rate the post", "Couldn't re-rate the post");
        }

        return ratePost;
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updateRatePost (
        @Request() req: any,
        @Body() updateRatePostDto: UpdateRatePostDto,
    ) {
        const user = req.user;
        const userId = user?.userId;

        if (!userId) {
            throw new NotFoundException("User not found", "User not found");
        }

        const ratePost = await this.ratePostService.updateRatePostByPostId(updateRatePostDto.postId, userId, updateRatePostDto.rating);

        if (!ratePost) {
            throw new InternalServerErrorException("Couldn't re-rate the post", "Couldn't re-rate the post");
        }

        return ratePost;
    }
}
