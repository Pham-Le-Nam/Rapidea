import { Transform, Type } from 'class-transformer';
import {
    ArrayMaxSize,
    IsArray,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    MinLength,
    ValidateNested,
} from 'class-validator';
import { TrustedSourceInputDto } from './trusted-source-input.dto';

export class SendAiChatMessageDto {
    @IsUUID()
    clientRequestId!: string;

    @IsOptional()
    @IsUUID()
    conversationId?: string;

    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @MinLength(1)
    @MaxLength(4000)
    content!: string;

    @IsOptional()
    @IsArray()
    @ArrayMaxSize(10)
    @ValidateNested({ each: true })
    @Type(() => TrustedSourceInputDto)
    trustedSourcesToAdd?: TrustedSourceInputDto[];
}
