import { 
    Controller, 
    Post, 
    UseGuards, 
    Request, 
    Body, 
    Get,
    Param, 
    NotFoundException,
    Query
} from '@nestjs/common';
import { PostService } from './post.service';
import { AddPostDto } from './post-dto/add-post.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { OptionalJwtAuthGuard } from '../auth/optional-jwt.guard';
import { CourseService } from '../course/course.service';
import { UsersService } from '../users/users.service';

@Controller('api/post')
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly courseService: CourseService,
        private readonly usersService: UsersService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async createPost (
        @Request() req: any,
        @Body() addPostDto: AddPostDto,
    ) {
        const user = req.user;
        const post = await this.postService.createPost(
            user.userId,
            addPostDto.title,
            addPostDto.content,
            addPostDto.courseId,
            addPostDto.isPreview,
        );

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
    @Get('user/:username')
    async getPostsByUsername (
        @Request() req: any,
        @Param('username') username: string,
    ) {
        const viewer = req.user;
        const user = await this.usersService.getUserByUsername(username);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        const posts = await this.postService.getPostsByUserId(user.id);

        return {
            posts,
            isOwner: viewer ? viewer.userId === user.id : false,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('update')
    async updatePost (
        @Request() req: any,
        @Body() data: { postId: string, title?: string, content?: any, isPreview?: boolean },
    ) {
        const user = req.user;
        const post = await this.postService.updatePostById(data.postId, user.userId, data.title, data.content, data.isPreview);

        return post;
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Get('course/:courseId')
    async getPostsByCourseId (
        @Request() req: any,
        @Param('courseId') courseId: string,
        @Query('previewOnly') previewOnly?: string,
        @Query('orderBy') orderBy?: 'rating' | 'createdAt',
        @Query('order') order?: 'asc' | 'desc',
    ) {
        const user = req.user;
        const course = await this.courseService.getCourseById(courseId);

        if (!course) {
            throw new NotFoundException("Course not found");
        }

        const canViewAllPosts = await this.postService.canViewAllCoursePosts(courseId, user?.userId);
        const posts = await this.postService.getPostsByCourseId(courseId, user?.userId, {
            previewOnly: previewOnly === 'true',
            orderBy,
            order,
        });

        return {
            posts,
            isOwner: user ? course.userId === user.userId : false,
            canViewAllPosts,
        };
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Get(':id')
    async getPost (
        @Request() req: any,
        @Param('id') id: string,
    ) {
        const user = req.user;
        const post = await this.postService.getPostById(id);

        if (!post) {
            throw new NotFoundException("Post not found");
        }

        const canViewPost = !post.courseId
            || post.isPreview
            || (user?.userId && user.userId === post.userId)
            || (user?.userId && post.course?.subscribers?.some((subscription: any) => subscription.userId === user.userId));

        if (user?.userId && user.userId !== post.userId) {
            await this.postService.recordPostView(id, user.userId);
        }

        const { course: _course, ...safePost } = post;

        return {
            post: safePost,
            isOwner: user ? (user.userId === post.userId) : false,
            canViewPost,
        };
    }
}
