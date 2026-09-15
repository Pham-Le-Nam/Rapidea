import { InternalServerErrorException } from '@nestjs/common';

export enum AiModelEnvironmentVariable {
    TEXT_EMBEDDING = 'TEXT_EMBEDDING_MODEL',
    VIDEO_TRANSCRIPTION = 'VIDEO_TRANSCRIPTION_MODEL',
    RESPONSE = 'RESPONSE_MODEL',
}

export function requiredAiModel(name: AiModelEnvironmentVariable): string {
    const model = process.env[name]?.trim();
    if (!model) {
        throw new InternalServerErrorException(`${name} is not configured`);
    }

    return model;
}
