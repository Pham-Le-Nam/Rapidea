import { 
    Controller, 
    Post, 
    UseGuards, 
    Request, 
    Body, 
    Get,
    Param, 
    NotFoundException
} from '@nestjs/common';
import { PostService } from './post.service';
import { AddPostDto } from './post-dto/add-post.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt.guard';
import { CourseService } from '../course/course.service';

@Controller('api/post')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly courseService: CourseService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async createPost (
        @Request() req: any,
        @Body() addPostDto: AddPostDto,
    ) {
        const user = req.user;
        const post = await this.postService.createPost(user.userId, addPostDto.title, addPostDto.content, addPostDto.courseId);

        return post;
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deletePost (
        @Request() req: any,
        @Body() data: { postId: string },
    ) {
        const user = req.user;
        const post = await this.postService.deletePostById(data.postId, user.userId);

        return post;
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Get(':id')
    async getPost (
        @Request() req: any,
        @Param('id') id: string,
    ) {
        const user = req.user;
        const post = await this.postService.getPostById(id);

        return {
            post,
            isOwner: user ? (user.userId === post.userId) : false,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updatePost (
        @Request() req: any,
        @Body() data: { postId: string, title?: string, content?: any },
    ) {
        const user = req.user;
        const post = await this.postService.updatePostById(data.postId, user.userId, data.title, data.content);

        return post;
    }

    @UseGuards(JwtAuthGuard)
    @Get('course/:courseId')
    async getPostsByCourseId (
        @Request() req: any,
        @Param('courseId') courseId: string,
    ) {
        const user = req.user;
        const course = await this.courseService.getCourseById(courseId);

        if (!course) {
            throw new NotFoundException("Course not found");
        }

        const posts = await this.postService.getPostsByCourseId(courseId);

        return {
            posts,
            isOwner: user ? course.userId === user.userId : false,
        };
    }
}