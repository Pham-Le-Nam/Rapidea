import { IsString, MaxLength } from 'class-validator';

export class UpdateCreatorPromptDto {
    @IsString()
    @MaxLength(4000)
    creatorPrompt!: string;
}
