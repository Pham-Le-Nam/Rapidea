import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class AddRatePostDto {
    @IsString()
    postId!: string;

    @Type(() => Number)
    @IsNumber()
    rating!: number;
}