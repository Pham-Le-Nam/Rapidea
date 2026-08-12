"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
let LocalStorageService = class LocalStorageService {
    root = process.env.STORAGE_ROOT || process.env.STORAGE_URL || 'storage';
    publicUrl = process.env.STORAGE_PUBLIC_URL;
    async ensureDirectory(key) {
        await (0, promises_1.mkdir)(this.resolvePath(key), { recursive: true });
    }
    async deleteDirectory(key) {
        await (0, promises_1.rm)(this.resolvePath(key), {
            recursive: true,
            force: true,
        });
    }
    async moveDirectory(sourceKey, destinationKey) {
        await (0, promises_1.mkdir)(path_1.default.dirname(this.resolvePath(destinationKey)), { recursive: true });
        await (0, promises_1.rename)(this.resolvePath(sourceKey), this.resolvePath(destinationKey));
    }
    async writeFile(key, buffer) {
        const filePath = this.resolvePath(key);
        await (0, promises_1.mkdir)(path_1.default.dirname(filePath), { recursive: true });
        await (0, promises_1.writeFile)(filePath, buffer);
    }
    async deleteFile(key) {
        await (0, promises_1.rm)(this.resolvePath(key), { force: true });
    }
    async moveFile(sourceKey, destinationKey) {
        const destinationPath = this.resolvePath(destinationKey);
        await (0, promises_1.mkdir)(path_1.default.dirname(destinationPath), { recursive: true });
        await (0, promises_1.rename)(this.resolvePath(sourceKey), destinationPath);
    }
    getPublicUrl(key) {
        const normalizedKey = this.normalizeKey(key);
        if (!this.publicUrl) {
            return path_1.default.posix.join(this.normalizeKey(this.root), normalizedKey);
        }
        return `${this.publicUrl.replace(/\/$/, '')}/${normalizedKey}`;
    }
    resolvePath(key) {
        const rootPath = path_1.default.resolve(this.root);
        const targetPath = path_1.default.resolve(rootPath, this.normalizeKey(key));
        if (targetPath !== rootPath && !targetPath.startsWith(`${rootPath}${path_1.default.sep}`)) {
            throw new Error('Invalid storage key');
        }
        return targetPath;
    }
    normalizeKey(key) {
        const normalizedKey = path_1.default.posix.normalize(key.replace(/\\/g, '/')).replace(/^\/+/, '');
        if (normalizedKey === '..' || normalizedKey.startsWith('../')) {
            throw new Error('Invalid storage key');
        }
        return normalizedKey === '.' ? '' : normalizedKey;
    }
};
exports.LocalStorageService = LocalStorageService;
exports.LocalStorageService = LocalStorageService = __decorate([
    (0, common_1.Injectable)()
], LocalStorageService);
//# sourceMappingURL=local-storage.service.js.map