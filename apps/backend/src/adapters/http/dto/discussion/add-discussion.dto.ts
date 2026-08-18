import { IsObject, IsOptional, IsString } from "class-validator";

export class AddDiscussionDto {
    @IsObject()
    discussion!: Record<string, any>;

    @IsString()
    postId!: string;

    @IsString()
    @IsOptional()
    repliedId?: string;
}