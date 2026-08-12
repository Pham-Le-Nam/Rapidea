import { S3StorageService } from './s3-storage.service';

describe('S3StorageService', () => {
    const originalEnvironment = { ...process.env };

    beforeEach(() => {
        process.env.STORAGE_BUCKET = 'rapidea-test';
        process.env.STORAGE_REGION = 'ap-southeast-2';
        delete process.env.STORAGE_ENDPOINT;
        delete process.env.STORAGE_PUBLIC_URL;
        delete process.env.STORAGE_KEY_PREFIX;
    });

    afterAll(() => {
        process.env = originalEnvironment;
    });

    it('builds an encoded Amazon S3 object URL', () => {
        process.env.STORAGE_KEY_PREFIX = 'production';
        const storage = new S3StorageService();

        expect(storage.getPublicUrl('media/profile photo.jpg')).toBe(
            'https://rapidea-test.s3.ap-southeast-2.amazonaws.com/production/media/profile%20photo.jpg',
        );
    });

    it('uses the configured public base URL', () => {
        process.env.STORAGE_PUBLIC_URL = 'https://files.example.com/';
        const storage = new S3StorageService();

        expect(storage.getPublicUrl('media/avatar.png')).toBe(
            'https://files.example.com/media/avatar.png',
        );
    });

    it('requires a bucket when the S3 service is selected', () => {
        delete process.env.STORAGE_BUCKET;

        expect(() => new S3StorageService()).toThrow(
            'STORAGE_BUCKET is required when STORAGE_DRIVER=s3',
        );
    });
});
