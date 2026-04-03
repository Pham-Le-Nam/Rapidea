import { 
    Controller, 
    Param, 
    Body, 
    Request, 
    Get, 
    Post,  
    NotFoundException,
    InternalServerErrorException,
    UseGuards,
} from "@nestjs/common";
import { PostInCourseService } from "./post-in-course.service";
import { CourseService } from "../course/course.service";
import { AddPostInCourseDto } from "./post-in-course-dto/add-post-in-course.dto";
import { JwtAuthGuard } from "../auth/jwt.guard";
import { PostService } from "../post/post.service";

@Controller('api/post-in-course')
export class PostInCourseController {
    constructor(
        private readonly postInCourseService: PostInCourseService,
        private readonly courseService: CourseService,
        private readonly postService: PostService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('course/:courseId')
    async getPostsInCourse (
        @Request() req: any,
        @Param('courseId') courseId: string,
    ) {
        const user = req.user;
        const course = await this.courseService.getCourseById(courseId);
        const isOwner = user ? (user.userId === course.userId) : false;
        const posts = await this.postInCourseService.findPosts(courseId);

        return {
            posts,
            isOwner,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addPostToCourse (
        @Request() req: any,
        @Body() addPostInCourseDto: AddPostInCourseDto,
    ) {
        const user = req.user;
        const course = await this.courseService.getCourseById(addPostInCourseDto.courseId);
        const post = await this.postService.getPostById(addPostInCourseDto.postId);

        if (!course || !post) {
            throw new NotFoundException("Course or post not found");
        }

        if (course.userId !== user.userId || post.userId !== user.userId) {
            throw new InternalServerErrorException("You are not the owner of the course or post");
        }

        const postInCourse = await this.postInCourseService.addPostToCourse(addPostInCourseDto.courseId, addPostInCourseDto.postId, user.userId);

        return postInCourse;
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async removePostFromCourse (
        @Request() req: any,
        @Body() addPostInCourseDto: AddPostInCourseDto,
    ) {
        const user = req.user;
        const course = await this.courseService.getCourseById(addPostInCourseDto.courseId);
        const post = await this.postInCourseService.findCourse(addPostInCourseDto.postId);

        if (!course || !post) {
            throw new NotFoundException("Course or post not found");
        }

        const postInCourse = await this.postInCourseService.removePostFromCourse(addPostInCourseDto.postId, addPostInCourseDto.courseId, user.userId);

        return postInCourse;
    }
}