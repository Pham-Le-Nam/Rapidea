import { Injectable } from '@nestjs/common';

export type ModerationDecision = {
    status: 'PASSED' | 'WARNING' | 'SERIOUS_WARNING' | 'BLOCKED' | 'NOT_SCANNED';
    score: number | null;
    categories: string[];
    message: string | null;
};

@Injectable()
export class ContentModerationService {
    private readonly apiKey = process.env.OPENAI_API_KEY;

    async moderate(file: Express.Multer.File, transcript = ''): Promise<ModerationDecision> {
        if (!this.apiKey) {
            return {
                status: 'NOT_SCANNED',
                score: null,
                categories: [],
                message: 'Automated safety screening is unavailable. The upload was not scanned.',
            };
        }

        const text = this.extractText(file, transcript);
        const input: any[] = [{ type: 'text', text: text || `${file.originalname}\n${file.mimetype}` }];
        if (file.mimetype.startsWith('image/')) {
            input.push({
                type: 'image_url',
                image_url: { url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}` },
            });
        }

        const response = await fetch('https://api.openai.com/v1/moderations', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: 'omni-moderation-latest', input }),
        });
        if (!response.ok) {
            return {
                status: 'NOT_SCANNED',
                score: null,
                categories: [],
                message: 'Automated safety screening could not be completed.',
            };
        }

        const data = await response.json() as {
            results?: Array<{
                categories?: Record<string, boolean>;
                category_scores?: Record<string, number>;
            }>;
        };
        const result = data.results?.[0];
        const scores = result?.category_scores ?? {};
        const ranked = Object.entries(scores)
            .filter(([, score]) => score >= 0.5)
            .sort((a, b) => b[1] - a[1]);
        const score = ranked[0]?.[1] ?? Math.max(0, ...Object.values(scores));
        const categories = ranked.map(([category]) => this.describeCategory(category));

        if (score >= 0.95) return this.decision('BLOCKED', score, categories);
        if (score >= 0.75) return this.decision('SERIOUS_WARNING', score, categories);
        if (score >= 0.5) return this.decision('WARNING', score, categories);
        return { status: 'PASSED', score, categories: [], message: null };
    }

    private extractText(file: Express.Multer.File, transcript: string) {
        if (transcript) return `${file.originalname}\n${transcript}`.slice(0, 100_000);
        const textTypes = ['text/', 'application/json', 'application/xml', 'application/javascript'];
        return textTypes.some((type) => file.mimetype.startsWith(type))
            ? `${file.originalname}\n${file.buffer.toString('utf8', 0, 100_000)}`
            : file.originalname;
    }

    private decision(status: 'WARNING' | 'SERIOUS_WARNING' | 'BLOCKED', score: number, categories: string[]): ModerationDecision {
        const aspect = categories.length ? categories.join(', ') : 'potentially prohibited content';
        const prefix = status === 'BLOCKED'
            ? 'Upload blocked'
            : status === 'SERIOUS_WARNING'
                ? 'Serious content warning'
                : 'Content warning';
        return { status, score, categories, message: `${prefix}: detected ${aspect}.` };
    }

    private describeCategory(category: string) {
        return category
            .replaceAll('/', ' / ')
            .replaceAll('-', ' ')
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
    }
}
