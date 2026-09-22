import { IsEnum, IsUUID } from 'class-validator';
import { AiChatTrustedSourceType } from '../../../../application/ai-chat/ai-chat-trusted-source.types';

export class TrustedSourceInputDto {
    @IsEnum(AiChatTrustedSourceType)
    sourceType!: AiChatTrustedSourceType;

    @IsUUID()
    sourceId!: string;
}
