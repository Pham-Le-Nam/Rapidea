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

const DB_USER = requireEnvironmentVariable('DB_USERNAME');
const DB_PASSWORD = requireEnvironmentVariable('DB_PASSWORD');
const DB_HOST = requireEnvironmentVariable('DB_HOST');
const DB_PORT = requireEnvironmentVariable('DB_PORT');
const DB_NAME = requireEnvironmentVariable('DB_NAME');
const DB_SSL = requireBooleanEnvironmentVariable('DB_SSL');
const DB_SSL_CA_PATH = requireEnvironmentVariable('DB_SSL_CA_PATH');

const databaseUrl = new URL(`postgresql://${DB_HOST}:${DB_PORT}`);
databaseUrl.username = DB_USER;
databaseUrl.password = DB_PASSWORD;
databaseUrl.pathname = DB_NAME;
databaseUrl.searchParams.set('schema', 'public');

function getSslConfig() {
  if (!DB_SSL) return undefined;

  const caPath = resolve(process.cwd(), DB_SSL_CA_PATH);

  return {
    ca: readFileSync(caPath, 'utf8'),
    rejectUnauthorized: true,
  };
}

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  
  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: databaseUrl.toString(),
        ssl: getSslConfig(),
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
