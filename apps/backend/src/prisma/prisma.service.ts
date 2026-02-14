import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

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