import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client';
import { readFileSync } from 'fs';
import { resolve } from 'path';

function requireEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function requireBooleanEnvironmentVariable(name: string): boolean {
  const value = requireEnvironmentVariable(name).toLowerCase();
  if (value !== 'true' && value !== 'false') {
    throw new Error(`${name} must be either true or false`);
  }
  return value === 'true';
}

function getSslConfig(enabled: boolean, caPathValue: string) {
  if (!enabled) return undefined;

  const caPath = resolve(process.cwd(), caPathValue);

  return {
    ca: readFileSync(caPath, 'utf8'),
    rejectUnauthorized: true,
  };
}

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  
  constructor() {
    const databaseUrl = new URL(
      `postgresql://${requireEnvironmentVariable('DB_HOST')}:${requireEnvironmentVariable('DB_PORT')}`,
    );
    databaseUrl.username = requireEnvironmentVariable('DB_USERNAME');
    databaseUrl.password = requireEnvironmentVariable('DB_PASSWORD');
    databaseUrl.pathname = requireEnvironmentVariable('DB_NAME');
    databaseUrl.searchParams.set('schema', 'public');

    super({
      adapter: new PrismaPg({
        connectionString: databaseUrl.toString(),
        ssl: getSslConfig(
          requireBooleanEnvironmentVariable('DB_SSL'),
          requireEnvironmentVariable('DB_SSL_CA_PATH'),
        ),
      }),
    })
  }    

  // Called when NestJS starts this module
  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected');
  }

  // Optional: cleanly disconnect when app shuts down
  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🛑 Database disconnected');
  }
}
