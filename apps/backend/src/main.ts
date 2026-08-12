import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const storageDriver = (process.env.STORAGE_DRIVER || 'local').trim().toLowerCase();

    app.enableCors({
        origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
        }),
    );

    if (storageDriver === 'local') {
        const storageRoot = process.env.STORAGE_ROOT || process.env.STORAGE_URL || 'storage';
        const storagePublicPath = (process.env.STORAGE_PUBLIC_PATH || process.env.STORAGE_URL || 'storage')
            .replace(/^\/+|\/+$/g, '');

        app.useStaticAssets(join(process.cwd(), storageRoot), {
            prefix: `/${storagePublicPath}/`,
        });
    }

    const port = Number(process.env.PORT ?? process.env.API_PORT ?? 1234);
    await app.listen(port, '0.0.0.0');
}
bootstrap();
