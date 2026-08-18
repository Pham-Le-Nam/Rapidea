import { IsNumber, IsString } from "class-validator";

export class UpdateRateDiscussionDto {
    @IsString()
    discussionId!: string;

    @IsNumber()
    rating!: number;
}
