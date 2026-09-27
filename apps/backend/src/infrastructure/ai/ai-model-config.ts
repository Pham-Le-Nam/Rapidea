import { InternalServerErrorException } from '@nestjs/common';

export enum AiModelEnvironmentVariable {
    TEXT_EMBEDDING = 'TEXT_EMBEDDING_MODEL',
    VIDEO_TRANSCRIPTION = 'VIDEO_TRANSCRIPTION_MODEL',
    RESPONSE = 'RESPONSE_MODEL',
}

export enum AiNumericEnvironmentVariable {
    TEXT_EMBEDDING_DIMENSIONS = 'TEXT_EMBEDDING_DIMENSIONS',
}

export const DATABASE_EMBEDDING_DIMENSIONS = 1536;

export function requiredAiModel(name: AiModelEnvironmentVariable): string {
    const model = process.env[name]?.trim();
    if (!model) {
        throw new InternalServerErrorException(`${name} is not configured`);
    }

    return model;
}

export function requiredPositiveInteger(
    name: AiNumericEnvironmentVariable,
): number {
    const rawValue = process.env[name]?.trim();
    const value = Number(rawValue);
    if (!rawValue || !Number.isInteger(value) || value <= 0) {
        throw new InternalServerErrorException(
            `${name} must be configured as a positive integer`,
        );
    }
    return value;
}

export function requiredEmbeddingDimensions(): number {
    const dimensions = requiredPositiveInteger(
        AiNumericEnvironmentVariable.TEXT_EMBEDDING_DIMENSIONS,
    );
    if (dimensions !== DATABASE_EMBEDDING_DIMENSIONS) {
        throw new InternalServerErrorException(
            `${AiNumericEnvironmentVariable.TEXT_EMBEDDING_DIMENSIONS} must be ${DATABASE_EMBEDDING_DIMENSIONS} to match the database vector columns`,
        );
    }
    return dimensions;
}
