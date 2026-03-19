"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
require("dotenv/config");
function parseDirectUrl() {
    const envUrl = process.env.DATABASE_URL || '';
    let connectionString = envUrl;
    if (envUrl.startsWith('prisma+postgres://')) {
        try {
            const apiKey = new URL(envUrl).searchParams.get('api_key') || '';
            const decoded = JSON.parse(Buffer.from(apiKey, 'base64').toString());
            connectionString = decoded.databaseUrl;
        }
        catch {
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
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        const config = parseDirectUrl();
        const adapter = new adapter_pg_1.PrismaPg({
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
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map