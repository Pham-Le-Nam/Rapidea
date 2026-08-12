import { UsersService } from "../users/users.service";
import { AddCourseDto } from "./course-dto/add-course.dto";
import { UpdateCourseDto } from "./course-dto/update-course.dto";
import { CourseService } from "./course.service";
export declare class CourseController {
    private readonly courseService;
    private readonly userService;
    constructor(courseService: CourseService, userService: UsersService);
    getCourses(username: string, req: any, offset?: string, limit?: string): Promise<{
        course: any;
        hasMore: boolean;
        isOwner: boolean;
    }>;
    getCourse(id: string, req: any): Promise<{
        course: any;
        isOwner: boolean;
    }>;
    addCourse(req: any, addCourseDto: AddCourseDto): Promise<any>;
    deleteCourse(req: any, data: {
        id: string;
    }): Promise<any>;
    updateCourse(courseId: string, req: any, updateCourseDto: UpdateCourseDto): Promise<any>;
    private getPagination;
}
