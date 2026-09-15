import { Inject, Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import path from 'path';
import { OfficeParser, SupportedFileType } from 'officeparser';
import { AI_SERVICE, AiMediaFile, AiService } from '../../application/ports/ai.service';
import {
    AiModelEnvironmentVariable,
    requiredAiModel,
} from '../ai/ai-model-config';

export type TextExtractionMethod = 'document' | 'media-transcription' | 'plain-text';

export type ExtractedText = {
    text: string;
    format: string;
    method: TextExtractionMethod;
    model?: string;
};

const OFFICE_FORMATS = new Set<SupportedFileType>([
    'docx',
    'pptx',
    'xlsx',
    'odt',
    'odp',
    'ods',
    'pdf',
    'rtf',
]);

const OFFICE_MIME_TYPES = new Map<string, SupportedFileType>([
    ['application/pdf', 'pdf'],
    ['application/rtf', 'rtf'],
    ['text/rtf', 'rtf'],
    ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'docx'],
    ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'pptx'],
    ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'xlsx'],
    ['application/vnd.oasis.opendocument.text', 'odt'],
    ['application/vnd.oasis.opendocument.presentation', 'odp'],
    ['application/vnd.oasis.opendocument.spreadsheet', 'ods'],
]);

const MEDIA_EXTENSIONS = new Set([
    '.flac',
    '.m4a',
    '.mp3',
    '.mp4',
    '.mpeg',
    '.mpga',
    '.ogg',
    '.wav',
    '.webm',
]);

const MEDIA_MIME_TYPES = new Set([
    'audio/flac',
    'audio/m4a',
    'audio/mp4',
    'audio/mpeg',
    'audio/ogg',
    'audio/wav',
    'audio/webm',
    'video/mp4',
    'video/mpeg',
    'video/webm',
]);

const PLAIN_TEXT_EXTENSIONS = new Set([
    '.csv',
    '.css',
    '.htm',
    '.html',
    '.ini',
    '.java',
    '.js',
    '.json',
    '.log',
    '.md',
    '.py',
    '.sql',
    '.ts',
    '.txt',
    '.xml',
    '.yaml',
    '.yml',
]);

@Injectable()
export class TextExtractionService {
    constructor(@Inject(AI_SERVICE) private readonly aiService: AiService) {}

    async extract(file: AiMediaFile): Promise<ExtractedText> {
        const extension = path.extname(file.originalname).toLowerCase();
        const mimeType = file.mimetype.toLowerCase().split(';', 1)[0].trim();

        if (this.isMedia(mimeType, extension)) {
            const model = requiredAiModel(
                AiModelEnvironmentVariable.VIDEO_TRANSCRIPTION,
            );
            return {
                text: this.normalize(await this.aiService.transcribeMedia(file)),
                format: extension.slice(1) || mimeType,
                method: 'media-transcription',
                model,
            };
        }

        const officeFormat = this.officeFormat(extension, mimeType);
        if (officeFormat) {
            const document = await OfficeParser.parseOffice(file.buffer, {
                ocr: process.env.TEXT_EXTRACTION_OCR === 'true',
            });

            return {
                text: this.normalize(document.toText()),
                format: officeFormat,
                method: 'document',
            };
        }

        if (mimeType.startsWith('text/') || PLAIN_TEXT_EXTENSIONS.has(extension)) {
            return {
                text: this.normalize(file.buffer.toString('utf8')),
                format: extension.slice(1) || mimeType,
                method: 'plain-text',
            };
        }

        throw new UnsupportedMediaTypeException(
            `Text extraction is not supported for ${file.originalname} (${file.mimetype})`,
        );
    }

    private isMedia(mimeType: string, extension: string) {
        return MEDIA_MIME_TYPES.has(mimeType) ||
            MEDIA_EXTENSIONS.has(extension);
    }

    private officeFormat(extension: string, mimeType: string): SupportedFileType | undefined {
        const extensionFormat = extension.slice(1) as SupportedFileType;
        if (OFFICE_FORMATS.has(extensionFormat)) {
            return extensionFormat;
        }

        return OFFICE_MIME_TYPES.get(mimeType);
    }

    private normalize(text: string) {
        return text
            .replace(/^\uFEFF/, '')
            .replace(/\r\n?/g, '\n')
            .replace(/[\t ]+\n/g, '\n')
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    }
}
