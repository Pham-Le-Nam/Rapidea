import { UnsupportedMediaTypeException } from '@nestjs/common';
import { OfficeParser } from 'officeparser';
import { AiService } from '../../application/ports/ai.service';
import { TextExtractionService } from './text-extraction.service';

describe('TextExtractionService', () => {
    const originalTranscriptionModel = process.env.VIDEO_TRANSCRIPTION_MODEL;
    const aiService = {
        transcribeMedia: jest.fn(),
    } as unknown as AiService;
    const service = new TextExtractionService(aiService);

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.VIDEO_TRANSCRIPTION_MODEL = 'test-transcription-model';
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    afterAll(() => {
        if (originalTranscriptionModel === undefined) {
            delete process.env.VIDEO_TRANSCRIPTION_MODEL;
        } else {
            process.env.VIDEO_TRANSCRIPTION_MODEL = originalTranscriptionModel;
        }
    });

    it('uses the configured transcription service for media files', async () => {
        jest.mocked(aiService.transcribeMedia).mockResolvedValue('  spoken words\r\n  ');
        const file = {
            originalname: 'lesson.mp4',
            mimetype: 'video/mp4',
            buffer: Buffer.from('media'),
        };

        await expect(service.extract(file)).resolves.toMatchObject({
            text: 'spoken words',
            format: 'mp4',
            method: 'media-transcription',
            model: 'test-transcription-model',
        });
        expect(aiService.transcribeMedia).toHaveBeenCalledWith(file);
    });

    it('extracts text from OfficeParser-supported document buffers', async () => {
        jest.spyOn(OfficeParser, 'parseOffice').mockResolvedValue({
            toText: () => 'Lesson title\nLesson body',
        } as any);
        const buffer = Buffer.from('%PDF document');
        const result = await service.extract({
            originalname: 'lesson.pdf',
            mimetype: 'application/pdf',
            buffer,
        });

        expect(result.method).toBe('document');
        expect(result.text).toContain('Lesson title');
        expect(result.text).toContain('Lesson body');
        expect(OfficeParser.parseOffice).toHaveBeenCalledWith(
            buffer,
            expect.objectContaining({ ocr: false }),
        );
    });

    it('reads common plain-text files without sending them to OpenAI', async () => {
        const result = await service.extract({
            originalname: 'example.json',
            mimetype: 'application/json',
            buffer: Buffer.from('{"answer": 42}'),
        });

        expect(result).toMatchObject({
            text: '{"answer": 42}',
            format: 'json',
            method: 'plain-text',
        });
        expect(aiService.transcribeMedia).not.toHaveBeenCalled();
    });

    it('rejects unsupported binary formats', async () => {
        await expect(service.extract({
            originalname: 'archive.zip',
            mimetype: 'application/zip',
            buffer: Buffer.from('not a document'),
        })).rejects.toBeInstanceOf(UnsupportedMediaTypeException);
    });

    it('rejects media containers unsupported by the transcription endpoint', async () => {
        await expect(service.extract({
            originalname: 'lesson.mov',
            mimetype: 'video/quicktime',
            buffer: Buffer.from('media'),
        })).rejects.toBeInstanceOf(UnsupportedMediaTypeException);
        expect(aiService.transcribeMedia).not.toHaveBeenCalled();
    });

    it('rejects transcribable media when VIDEO_TRANSCRIPTION_MODEL is missing', async () => {
        delete process.env.VIDEO_TRANSCRIPTION_MODEL;

        await expect(service.extract({
            originalname: 'lesson.mp4',
            mimetype: 'video/mp4',
            buffer: Buffer.from('media'),
        })).rejects.toThrow('VIDEO_TRANSCRIPTION_MODEL is not configured');
        expect(aiService.transcribeMedia).not.toHaveBeenCalled();
    });
});
