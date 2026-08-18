import { IsNumber, IsString } from "class-validator";

export class UpdateRatePostDto {
    @IsString()
    postId!: string;

    @IsNumber()
    rating!: number;
}