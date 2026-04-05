import { JwtAuthGuard } from "../auth/jwt.guard";
import { OptionalJwtAuthGuard } from "../auth/optional-jwt.guard";
import { UsersService } from "../users/users.service";
import { AddCourseDto } from "./course-dto/add-course.dto";
import { UpdateCourseDto } from "./course-dto/update-course.dto";
import { CourseService } from "./course.service";
import { Controller, Post, Get, Param, Request, NotFoundException, Body, InternalServerErrorException, UseGuards } from "@nestjs/common";


@Controller('api/course')
export class CourseController {
    constructor(
        private readonly courseService: CourseService,
        private readonly userService: UsersService,
    ) {}

    @UseGuards(OptionalJwtAuthGuard)
    @Get(':username')
    async getCourses (
        @Param('username') username: string,
        @Request() req: any
    ) {
        const viewer = req.user;
        const owner = await this.userService.getUserByUsername(username);

        if(!owner) {
            throw new NotFoundException("User not found");
        }

        const course = await this.courseService.getCourseByUserId(owner.id);

        if (!course) {
            throw new NotFoundException("Courses not found");
        }

        return {
            course,
            isOwner: viewer?.userId === owner.id,
        };
    }

    @UseGuards(OptionalJwtAuthGuard)
    @Get('id/:id')
    async getCourse (
        @Param('id') id: string,
        @Request() req: any,
    ) {
        const viewer = req.user;
        const course = await this.courseService.getCourseById(id);

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        return {
            course,
            isOwner: viewer?.userId === course.userId,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('add')
    async addCourse (
        @Request() req: any,
        @Body() addCourseDto: AddCourseDto,
    ) {
        const user = req.user;

        const course = await this.courseService.createCourse(
            user.userId,
            addCourseDto.title,
            addCourseDto.description,
            addCourseDto.price,
            addCourseDto.currency,
        )

        if (!course) {
            throw new InternalServerErrorException("Couldn't add course");
        }

        return course;
    }

    @UseGuards(JwtAuthGuard)
    @Post('delete')
    async deleteCourse (
        @Request() req: any,
        @Body() data: { id: string },
    ) {
        const user = req.user;
        const course = await this.courseService.deleteCourse(data.id, user.userId);

        if (!course) {
            throw new InternalServerErrorException("Couldn't delete this course");
        }

        return course;
    }

    @UseGuards(JwtAuthGuard)
    @Post('update/:courseId')
    async updateCourse (
        @Param('courseId') courseId: string,
        @Request() req: any,
        @Body() updateCourseDto: UpdateCourseDto,
    ) {
        const user = req.user;
        const userId = user.userId;
        const course = await this.courseService.updateCourse(
            courseId, 
            userId,
            updateCourseDto.title,
            updateCourseDto.description,
            updateCourseDto.price,
            updateCourseDto.currency, 
        );

        return course;
    }
}