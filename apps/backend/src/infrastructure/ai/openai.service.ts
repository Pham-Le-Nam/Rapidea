import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AiMediaFile, AiService } from '../../application/ports/ai.service';

@Injectable()
export class OpenAiService implements AiService {
    async generatePostContent(input: {
        target: 'title' | 'details';
        systemPrompt: string;
        context: string;
    }) {
        const apiKey = this.requiredApiKey();
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: process.env.CONTENT_GENERATION_MODEL || 'gpt-4.1-mini',
                messages: [
                    { role: 'system', content: input.systemPrompt },
                    { role: 'user', content: input.context },
                ],
                response_format: input.target === 'details' ? { type: 'json_object' } : undefined,
                temperature: 0.4,
            }),
        });
        if (!response.ok) {
            throw new InternalServerErrorException(`Post generation failed (${response.status})`);
        }

        const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
        const value = data.choices?.[0]?.message?.content?.trim();
        if (!value) throw new InternalServerErrorException('Post generation returned no content');
        return value;
    }

    async createEmbeddings(input: string[]) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) return null;

        try {
            const response = await fetch('https://api.openai.com/v1/embeddings', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: process.env.TEXT_EMBEDDING_MODEL || 'text-embedding-3-small',
                    input,
                }),
            });
            if (!response.ok) return null;

            const data = await response.json() as { data?: { embedding: number[] }[] };
            return data.data?.map((item) => item.embedding) ?? null;
        } catch {
            return null;
        }
    }

    async transcribeMedia(file: AiMediaFile) {
        const apiKey = this.requiredApiKey();
        const formData = new FormData();
        formData.append('model', process.env.VIDEO_TRANSCRIPTION_MODEL || 'gpt-4o-mini-transcribe');
        formData.append(
            'file',
            new Blob([new Uint8Array(file.buffer)], { type: file.mimetype }),
            file.originalname,
        );

        const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}` },
            body: formData,
        });
        if (!response.ok) throw new Error(`Transcription failed with status ${response.status}`);

        const data = await response.json() as { text?: string };
        return data.text ?? '';
    }

    private requiredApiKey() {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) throw new InternalServerErrorException('OPENAI_API_KEY is not configured');
        return apiKey;
    }
}
