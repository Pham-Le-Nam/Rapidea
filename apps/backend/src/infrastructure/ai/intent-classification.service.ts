import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AiChatTrustedSourceInput } from '../../application/ai-chat/ai-chat-trusted-source.types';
import {
    constrainLearnerQueryReferences,
    parseLearnerQuery,
} from '../../application/ai-chat/learner-query.parser';
import { LearnerQuery } from '../../application/ai-chat/learner-query.types';
import { AiTextModelPurpose } from '../../application/ports/learning-assistant-response.port';
import { LEARNER_QUERY_FORMAT } from './learner-query.schema';
import { OpenAiClientService } from './openai-client.service';
import { LEARNER_INTENT_CLASSIFIER_INSTRUCTIONS } from './prompts/learner-intent-classification.prompts';
import { AiChatTrustedSourceService } from './ai-chat-trusted-source.service';

@Injectable()
export class IntentClassificationService {
    constructor(
        private readonly openAiClient: OpenAiClientService,
        private readonly trustedSources: AiChatTrustedSourceService,
    ) {}

    async classify(
        userId: string,
        conversationId: string,
        learnerMessage: string,
        currentSources: readonly AiChatTrustedSourceInput[] = [],
    ): Promise<LearnerQuery> {
        const trustedPageContext =
            await this.trustedSources.getLearnerQueryContext(
                userId,
                conversationId,
                currentSources,
            );
        const response = await this.openAiClient.createTextResponse({
            modelPurpose: AiTextModelPurpose.PROCESSING,
            instructions: LEARNER_INTENT_CLASSIFIER_INSTRUCTIONS,
            input: [
                '<learner_query_input>',
                JSON.stringify({ learnerMessage, trustedPageContext }),
                '</learner_query_input>',
            ].join('\n'),
            textFormat: LEARNER_QUERY_FORMAT,
            maxOutputTokens: 4_000,
            failureLabel: 'Learner intent classification',
        });

        let parsed: unknown;
        try {
            parsed = JSON.parse(response);
        } catch {
            throw new InternalServerErrorException(
                'Learner intent classification returned invalid JSON',
            );
        }

        try {
            return constrainLearnerQueryReferences(
                parseLearnerQuery(parsed),
                trustedPageContext,
            );
        } catch (error) {
            throw new InternalServerErrorException(
                'Learner intent classification returned an invalid learner query',
                { cause: error },
            );
        }
    }
}
