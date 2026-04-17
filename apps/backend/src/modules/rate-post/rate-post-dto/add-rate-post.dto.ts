import { IsNumber, IsString } from "class-validator";

export class AddRatePostDto {
    @IsString()
    postId!: string;

    @IsNumber()
    rating!: number;
}