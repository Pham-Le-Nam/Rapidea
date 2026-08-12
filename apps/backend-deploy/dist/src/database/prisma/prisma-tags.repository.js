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
exports.PrismaTagsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaTagsRepository = class PrismaTagsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async ensure(names) { await this.prisma.$transaction(names.map(name => this.prisma.tag.upsert({ where: { name }, update: {}, create: { name } }))); }
    list() { return this.prisma.tag.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }); }
    listWithEmbeddings() { return this.prisma.tag.findMany({ select: { id: true, name: true, embedding: true } }); }
    async replaceCourseTags(courseId, tags, isSuggested) { await this.prisma.courseTag.deleteMany({ where: { courseId } }); if (tags.length)
        await this.prisma.courseTag.createMany({ data: tags.map(tag => ({ courseId, tagId: tag.id, isSuggested })), skipDuplicates: true }); }
    async replacePostTags(postId, tags, isSuggested) { await this.prisma.postTag.deleteMany({ where: { postId } }); if (tags.length)
        await this.prisma.postTag.createMany({ data: tags.map(tag => ({ postId, tagId: tag.id, isSuggested })), skipDuplicates: true }); }
    async replaceFileTags(fileId, tags, scores) { await this.prisma.fileTag.deleteMany({ where: { fileId } }); if (tags.length)
        await this.prisma.fileTag.createMany({ data: tags.map(tag => ({ fileId, tagId: tag.id, isSuggested: true, score: scores.get(tag.name) })), skipDuplicates: true }); }
    findFileTags(fileIds) { return this.prisma.fileTag.findMany({ where: { fileId: { in: fileIds } }, include: { tag: true } }); }
    async addFileTagsToPost(postId, fileTags) { if (fileTags.length)
        await this.prisma.postTag.createMany({ data: fileTags.map(x => ({ postId, tagId: x.tagId, isSuggested: true, score: x.score })), skipDuplicates: true }); }
    createTranscript(fileId) { const model = process.env.VIDEO_TRANSCRIPTION_MODEL || 'gpt-4o-mini-transcribe'; return this.prisma.fileTranscript.upsert({ where: { fileId }, update: { status: 'PROCESSING', errorMessage: null, provider: 'openai', model }, create: { fileId, status: 'PROCESSING', provider: 'openai', model } }); }
    completeTranscript(fileId, text, language, durationSec) { return this.prisma.fileTranscript.update({ where: { fileId }, data: { status: 'COMPLETED', text, language, durationSec, errorMessage: null } }); }
    failTranscript(fileId, errorMessage) { return this.prisma.fileTranscript.update({ where: { fileId }, data: { status: 'FAILED', errorMessage } }); }
    findByNames(names) { return this.prisma.tag.findMany({ where: { name: { in: names } }, select: { id: true, name: true } }); }
    async updateEmbeddings(tags, embeddings) { await this.prisma.$transaction(tags.map((tag, i) => this.prisma.tag.update({ where: { id: tag.id }, data: { embedding: embeddings[i] ?? undefined } }))); }
};
exports.PrismaTagsRepository = PrismaTagsRepository;
exports.PrismaTagsRepository = PrismaTagsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaTagsRepository);
//# sourceMappingURL=prisma-tags.repository.js.map