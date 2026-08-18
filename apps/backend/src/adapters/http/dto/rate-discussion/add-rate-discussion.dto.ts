import { IsNumber, IsString } from "class-validator";

export class AddRateDiscussionDto {
    @IsString()
    discussionId!: string;

    @IsNumber()
    rating!: number;
}
