"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("prisma/config");
function requireEnvironmentVariable(name) {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
function requireBooleanEnvironmentVariable(name) {
    const value = requireEnvironmentVariable(name).toLowerCase();
    if (value !== "true" && value !== "false") {
        throw new Error(`${name} must be either true or false`);
    }
    return value === "true";
}
const DB_USER = requireEnvironmentVariable("DB_USERNAME");
const DB_PASSWORD = requireEnvironmentVariable("DB_PASSWORD");
const DB_HOST = requireEnvironmentVariable("DB_HOST");
const DB_PORT = requireEnvironmentVariable("DB_PORT");
const DB_NAME = requireEnvironmentVariable("DB_NAME");
requireBooleanEnvironmentVariable("DB_SSL");
requireEnvironmentVariable("DB_SSL_CA_PATH");
const databaseUrl = new URL(`postgresql://${DB_HOST}:${DB_PORT}`);
databaseUrl.username = DB_USER;
databaseUrl.password = DB_PASSWORD;
databaseUrl.pathname = DB_NAME;
databaseUrl.searchParams.set("schema", "public");
exports.default = (0, config_1.defineConfig)({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: databaseUrl.toString(),
    },
});
//# sourceMappingURL=prisma.config.js.map