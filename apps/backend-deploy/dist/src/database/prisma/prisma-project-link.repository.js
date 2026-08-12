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
exports.PrismaProjectLinkRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaProjectLinkRepository = class PrismaProjectLinkRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(projectId, name, url) {
        const project = await this.prisma.project.findUnique({
            where: {
                id: projectId,
            },
        });
        if (!project) {
            throw new common_1.InternalServerErrorException("Project not found");
        }
        return this.prisma.projectLink.create({
            data: {
                projectId,
                name,
                url,
            },
        });
    }
    async update(id, name, url) {
        return this.prisma.projectLink.update({
            where: {
                id,
            },
            data: {
                name,
                url,
            },
        });
    }
    async delete(id) {
        return this.prisma.projectLink.delete({
            where: {
                id,
            },
        });
    }
    async findById(id) {
        return this.prisma.projectLink.findUnique({
            where: {
                id,
            },
        });
    }
    async findLinks(projectId) {
        return this.prisma.projectLink.findMany({
            where: {
                projectId,
            },
        });
    }
};
exports.PrismaProjectLinkRepository = PrismaProjectLinkRepository;
exports.PrismaProjectLinkRepository = PrismaProjectLinkRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProjectLinkRepository);
//# sourceMappingURL=prisma-project-link.repository.js.map