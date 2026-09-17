import { FileSummaryService } from './file-summary.service';

describe('FileSummaryService', () => {
    const originalDirectMaxTokens = process.env.FILE_SUMMARY_DIRECT_MAX_TOKENS;
    const originalChunkSizeTokens = process.env.FILE_SUMMARY_CHUNK_SIZE_TOKENS;
    const originalChunkOverlapTokens =
        process.env.FILE_SUMMARY_CHUNK_OVERLAP_TOKENS;
    const openAiClient = {
        createTextResponse: jest.fn(),
    };
    const service = new FileSummaryService(openAiClient as any);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        restoreEnvironmentVariable(
            'FILE_SUMMARY_DIRECT_MAX_TOKENS',
            originalDirectMaxTokens,
        );
        restoreEnvironmentVariable(
            'FILE_SUMMARY_CHUNK_SIZE_TOKENS',
            originalChunkSizeTokens,
        );
        restoreEnvironmentVariable(
            'FILE_SUMMARY_CHUNK_OVERLAP_TOKENS',
            originalChunkOverlapTokens,
        );
    });

    it('generates one learner-facing summary for a small file', async () => {
        openAiClient.createTextResponse.mockResolvedValue(
            '## Overview\n\nA concise lesson summary.',
        );

        await expect(
            service.generate({
                fileName: 'lesson.pdf',
                mimeType: 'application/pdf',
                text: 'A short lesson about testing.',
            }),
        ).resolves.toBe('## Overview\n\nA concise lesson summary.');

        expect(openAiClient.createTextResponse).toHaveBeenCalledTimes(1);
        const request = openAiClient.createTextResponse.mock.calls[0][0];
        expect(request.instructions).toContain(
            'learner-friendly study summary',
        );
        expect(request.input).toContain('<source>');
        expect(request.input).toContain('A short lesson about testing.');
        expect(request.maxOutputTokens).toBe(2_000);
    });

    it('summarizes large files through chunk notes and final synthesis', async () => {
        process.env.FILE_SUMMARY_DIRECT_MAX_TOKENS = '4';
        process.env.FILE_SUMMARY_CHUNK_SIZE_TOKENS = '4';
        process.env.FILE_SUMMARY_CHUNK_OVERLAP_TOKENS = '0';
        openAiClient.createTextResponse.mockImplementation(async (request) =>
            request.instructions.includes(
                'from ordered notes extracted from a file',
            )
                ? '## Overview\n\nCombined summary.'
                : '- Preserved fact from this chunk.',
        );

        await expect(
            service.generate({
                fileName: 'long.pdf',
                mimeType: 'application/pdf',
                text: 'one two three four five six seven eight nine ten',
            }),
        ).resolves.toBe('## Overview\n\nCombined summary.');

        expect(
            openAiClient.createTextResponse.mock.calls.length,
        ).toBeGreaterThan(2);
        const requests = openAiClient.createTextResponse.mock.calls.map(
            ([request]) => request,
        );
        expect(
            requests
                .slice(0, -1)
                .every((request) =>
                    request.instructions.includes(
                        'one section of a larger file',
                    ),
                ),
        ).toBe(true);
        expect(requests[requests.length - 1].input).toContain('<chunk_notes>');
    });

    it('rejects empty extracted text', async () => {
        await expect(
            service.generate({
                fileName: 'empty.pdf',
                mimeType: 'application/pdf',
                text: ' \n ',
            }),
        ).rejects.toThrow('File summary cannot be generated from empty text');
        expect(openAiClient.createTextResponse).not.toHaveBeenCalled();
    });
});

function restoreEnvironmentVariable(
    name: string,
    originalValue: string | undefined,
): void {
    if (originalValue === undefined) {
        delete process.env[name];
    } else {
        process.env[name] = originalValue;
    }
}
