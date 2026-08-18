import { IsObject, IsString } from "class-validator";

export class UpdateDiscussionDto {
    @IsString()
    id!: string;

    @IsObject()
    discussion!: Record<string, any>;
}