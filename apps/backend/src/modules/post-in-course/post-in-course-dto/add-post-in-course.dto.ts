import { IsString } from "class-validator";

export class AddPostInCourseDto {
    @IsString()
    postId: string;

    @IsString()
    courseId: string;
}