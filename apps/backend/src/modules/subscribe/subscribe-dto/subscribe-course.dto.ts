import { IsString } from 'class-validator';

export class SubscribeCourseDto {
    @IsString()
    courseId!: string;
}
