import { InternalServerErrorException } from '@nestjs/common';
import { AiTextModelPurpose } from '../../application/ports/learning-assistant-response.port';

export enum AiModelEnvironmentVariable {
    TEXT_EMBEDDING = 'TEXT_EMBEDDING_MODEL',
    VIDEO_TRANSCRIPTION = 'VIDEO_TRANSCRIPTION_MODEL',
    PROCESSING = 'PROCESSING_MODEL',
    PLANNING = 'PLANNING_MODEL',
    RESPONSE = 'RESPONSE_MODEL',
}

export enum AiNumericEnvironmentVariable {
    TEXT_EMBEDDING_DIMENSIONS = 'TEXT_EMBEDDING_DIMENSIONS',
}

export enum AiReasoningEffort {
    MINIMAL = 'minimal',
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export enum AiTextVerbosity {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export type AiTextGenerationProfile = {
    reasoningEffort: AiReasoningEffort;
    verbosity: AiTextVerbosity;
};

export const DATABASE_EMBEDDING_DIMENSIONS = 1536;

export function requiredAiModel(name: AiModelEnvironmentVariable): string {
    const model = process.env[name]?.trim();
    if (!model) {
        throw new InternalServerErrorException(`${name} is not configured`);
    }

    return model;
}

const TEXT_MODEL_ENVIRONMENT_VARIABLE: Record<
    AiTextModelPurpose,
    AiModelEnvironmentVariable
> = {
    [AiTextModelPurpose.PROCESSING]: AiModelEnvironmentVariable.PROCESSING,
    [AiTextModelPurpose.PLANNING]: AiModelEnvironmentVariable.PLANNING,
    [AiTextModelPurpose.RESPONSE]: AiModelEnvironmentVariable.RESPONSE,
};

const TEXT_GENERATION_PROFILE: Record<
    AiTextModelPurpose,
    AiTextGenerationProfile
> = {
    [AiTextModelPurpose.PROCESSING]: {
        reasoningEffort: AiReasoningEffort.MINIMAL,
        verbosity: AiTextVerbosity.LOW,
    },
    [AiTextModelPurpose.PLANNING]: {
        reasoningEffort: AiReasoningEffort.LOW,
        verbosity: AiTextVerbosity.LOW,
    },
    [AiTextModelPurpose.RESPONSE]: {
        reasoningEffort: AiReasoningEffort.LOW,
        verbosity: AiTextVerbosity.MEDIUM,
    },
};

export function requiredAiTextModel(purpose: AiTextModelPurpose): string {
    return requiredAiModel(TEXT_MODEL_ENVIRONMENT_VARIABLE[purpose]);
}

export function aiTextGenerationProfile(
    purpose: AiTextModelPurpose,
): AiTextGenerationProfile {
    return TEXT_GENERATION_PROFILE[purpose];
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
