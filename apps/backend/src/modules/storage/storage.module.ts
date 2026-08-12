import { Module } from '@nestjs/common';
import { LocalStorageService } from './local-storage.service';
import { S3StorageService } from './s3-storage.service';
import { STORAGE_SERVICE } from './storage.constants';

@Module({
    providers: [
        {
            provide: STORAGE_SERVICE,
            useFactory: () => {
                const driver = (process.env.STORAGE_DRIVER || 'local').trim().toLowerCase();

                if (driver === 'local') return new LocalStorageService();
                if (driver === 's3') return new S3StorageService();

                throw new Error(`Unsupported STORAGE_DRIVER: ${driver}`);
            },
        },
    ],
    exports: [
        STORAGE_SERVICE,
    ],
})
export class StorageModule {}
