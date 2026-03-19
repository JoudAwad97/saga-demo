import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

function parseDirectUrl(): { host: string; port: number; database: string; user: string; password: string } {
  const envUrl = process.env.DATABASE_URL || '';
  let connectionString = envUrl;

  if (envUrl.startsWith('prisma+postgres://')) {
    try {
      const apiKey = new URL(envUrl).searchParams.get('api_key') || '';
      const decoded = JSON.parse(Buffer.from(apiKey, 'base64').toString());
      connectionString = decoded.databaseUrl;
    } catch {
      // fallback
    }
  }

  const parsed = new URL(connectionString);
  return {
    host: parsed.hostname,
    port: parseInt(parsed.port, 10) || 5432,
    database: parsed.pathname.slice(1),
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
  };
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const config = parseDirectUrl();
    const adapter = new PrismaPg({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: false,
    });
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
