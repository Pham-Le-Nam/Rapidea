import { Type } from 'class-transformer';
import { IsNumber, IsString, Max, Min } from 'class-validator';

export class ReviewSubscriptionDto {
    @IsString()
    courseId!: string;

    @IsString()
    review!: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(5)
    rating!: number;
}
