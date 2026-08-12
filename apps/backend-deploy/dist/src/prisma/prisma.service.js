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
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("../../generated/prisma/client");
const fs_1 = require("fs");
const path_1 = require("path");
function requireEnvironmentVariable(name) {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
function requireBooleanEnvironmentVariable(name) {
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
    if (!DB_SSL)
        return undefined;
    const caPath = (0, path_1.resolve)(process.cwd(), DB_SSL_CA_PATH);
    return {
        ca: (0, fs_1.readFileSync)(caPath, 'utf8'),
        rejectUnauthorized: true,
    };
}
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({
            adapter: new adapter_pg_1.PrismaPg({
                connectionString: databaseUrl.toString(),
                ssl: getSslConfig(),
            }),
        });
    }
    async onModuleInit() {
        await this.$connect();
        console.log('✅ Database connected');
    }
    async onModuleDestroy() {
        await this.$disconnect();
        console.log('🛑 Database disconnected');
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
//# sourceMappingURL=prisma.service.js.map