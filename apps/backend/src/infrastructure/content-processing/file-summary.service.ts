import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getEncoding } from 'js-tiktoken';
import { OpenAiClientService } from '../ai/openai-client.service';
import {
    FILE_SUMMARY_CHUNK_INSTRUCTIONS,
    FILE_SUMMARY_INSTRUCTIONS,
    FILE_SUMMARY_SYNTHESIS_INSTRUCTIONS,
} from '../ai/prompts/file-summary.prompts';

const DEFAULT_DIRECT_MAX_TOKENS = 50_000;
const DEFAULT_CHUNK_SIZE_TOKENS = 10_000;
const DEFAULT_CHUNK_OVERLAP_TOKENS = 200;
const SUMMARY_MAX_OUTPUT_TOKENS = 2_000;
const CHUNK_NOTES_MAX_OUTPUT_TOKENS = 1_200;

export type FileSummaryInput = {
    fileName: string;
    mimeType: string;
    text: string;
};

@Injectable()
export class FileSummaryService {
    private readonly tokenizer = getEncoding('cl100k_base');

    constructor(private readonly openAiClient: OpenAiClientService) {}

    async generate(input: FileSummaryInput): Promise<string> {
        const text = this.normalizeText(input.text);
        if (!text) {
            throw new InternalServerErrorException(
                'File summary cannot be generated from empty text',
            );
        }

        const directMaxTokens = this.environmentInteger(
            'FILE_SUMMARY_DIRECT_MAX_TOKENS',
            DEFAULT_DIRECT_MAX_TOKENS,
        );
        if (this.tokenizer.encode(text).length <= directMaxTokens) {
            return this.generateDirectSummary(input, text);
        }

        return this.generateChunkedSummary(input, text);
    }

    private generateDirectSummary(
        input: FileSummaryInput,
        text: string,
    ): Promise<string> {
        return this.openAiClient.createTextResponse({
            instructions: FILE_SUMMARY_INSTRUCTIONS,
            input: this.fileSourceInput(input.fileName, input.mimeType, text),
            maxOutputTokens: SUMMARY_MAX_OUTPUT_TOKENS,
            failureLabel: 'File summary generation',
        });
    }

    private async generateChunkedSummary(
        input: FileSummaryInput,
        text: string,
    ): Promise<string> {
        const chunkSizeTokens = this.environmentInteger(
            'FILE_SUMMARY_CHUNK_SIZE_TOKENS',
            DEFAULT_CHUNK_SIZE_TOKENS,
        );
        const overlapTokens = this.environmentInteger(
            'FILE_SUMMARY_CHUNK_OVERLAP_TOKENS',
            DEFAULT_CHUNK_OVERLAP_TOKENS,
            true,
        );
        if (overlapTokens >= chunkSizeTokens) {
            throw new InternalServerErrorException(
                'FILE_SUMMARY_CHUNK_OVERLAP_TOKENS must be smaller than FILE_SUMMARY_CHUNK_SIZE_TOKENS',
            );
        }

        const chunks = this.splitByTokens(text, chunkSizeTokens, overlapTokens);
        const notes: string[] = [];

        for (let index = 0; index < chunks.length; index += 1) {
            notes.push(
                await this.openAiClient.createTextResponse({
                    instructions: FILE_SUMMARY_CHUNK_INSTRUCTIONS,
                    input: this.chunkInput(
                        input,
                        chunks[index],
                        index,
                        chunks.length,
                    ),
                    maxOutputTokens: CHUNK_NOTES_MAX_OUTPUT_TOKENS,
                    failureLabel: `File summary chunk ${index + 1}/${chunks.length}`,
                }),
            );
        }

        return this.openAiClient.createTextResponse({
            instructions: FILE_SUMMARY_SYNTHESIS_INSTRUCTIONS,
            input: this.synthesisInput(input, notes),
            maxOutputTokens: SUMMARY_MAX_OUTPUT_TOKENS,
            failureLabel: 'File summary synthesis',
        });
    }

    private chunkInput(
        input: FileSummaryInput,
        text: string,
        index: number,
        totalChunks: number,
    ): string {
        return [
            `File metadata: ${JSON.stringify({
                fileName: input.fileName,
                mimeType: input.mimeType,
                chunk: index + 1,
                totalChunks,
            })}`,
            '<source_chunk>',
            text,
            '</source_chunk>',
        ].join('\n');
    }

    private synthesisInput(input: FileSummaryInput, notes: string[]): string {
        return [
            `File metadata: ${JSON.stringify({
                fileName: input.fileName,
                mimeType: input.mimeType,
                totalChunks: notes.length,
            })}`,
            '<chunk_notes>',
            notes
                .map((note, index) =>
                    [
                        `## Notes from source chunk ${index + 1} of ${notes.length}`,
                        note,
                    ].join('\n'),
                )
                .join('\n\n'),
            '</chunk_notes>',
        ].join('\n');
    }

    private fileSourceInput(
        fileName: string,
        mimeType: string,
        text: string,
    ): string {
        return [
            `File metadata: ${JSON.stringify({ fileName, mimeType })}`,
            '<source>',
            text,
            '</source>',
        ].join('\n');
    }

    private splitByTokens(
        text: string,
        maxTokens: number,
        overlapTokens: number,
    ): string[] {
        const tokens = this.tokenizer.encode(text);
        const chunks: string[] = [];
        const step = maxTokens - overlapTokens;

        for (let start = 0; start < tokens.length; start += step) {
            const end = Math.min(start + maxTokens, tokens.length);
            const chunk = this.tokenizer
                .decode(tokens.slice(start, end))
                .trim();
            if (chunk) chunks.push(chunk);
            if (end === tokens.length) break;
        }

        return chunks;
    }

    private normalizeText(text: string): string {
        return text
            .replace(/^\uFEFF/, '')
            .replace(/\r\n?/g, '\n')
            .replace(/[\t ]+/g, ' ')
            .replace(/ *\n */g, '\n')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    }

    private environmentInteger(
        name: string,
        fallback: number,
        allowZero = false,
    ): number {
        const value = Number(process.env[name]);
        return Number.isInteger(value) && (allowZero ? value >= 0 : value > 0)
            ? value
            : fallback;
    }
}
