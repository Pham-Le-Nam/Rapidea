import { Injectable } from '@nestjs/common';
import { TagsRepository } from '../../../domain/tags/repositories/tags.repository';
import { PrismaService } from '../../../infrastructure/database/prisma/prisma.service';
@Injectable()
export class PrismaTagsRepository implements TagsRepository {
    constructor(private readonly prisma: PrismaService) {}
    async ensure(names: readonly string[]) { await this.prisma.$transaction(names.map(name => this.prisma.tag.upsert({ where: { name }, update: {}, create: { name } }))); }
    list() { return this.prisma.tag.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }); }
    listWithEmbeddings() { return this.prisma.tag.findMany({ select: { id: true, name: true, embedding: true } }); }
    async replaceCourseTags(courseId: string, tags: any[], isSuggested: boolean) { await this.prisma.courseTag.deleteMany({ where: { courseId } }); if (tags.length) await this.prisma.courseTag.createMany({ data: tags.map(tag => ({ courseId, tagId: tag.id, isSuggested })), skipDuplicates: true }); }
    async replacePostTags(postId: string, tags: any[], isSuggested: boolean) { await this.prisma.postTag.deleteMany({ where: { postId } }); if (tags.length) await this.prisma.postTag.createMany({ data: tags.map(tag => ({ postId, tagId: tag.id, isSuggested })), skipDuplicates: true }); }
    async replaceFileTags(fileId: string, tags: any[], scores: Map<string, number>) { await this.prisma.fileTag.deleteMany({ where: { fileId } }); if (tags.length) await this.prisma.fileTag.createMany({ data: tags.map(tag => ({ fileId, tagId: tag.id, isSuggested: true, score: scores.get(tag.name) })), skipDuplicates: true }); }
    findFileTags(fileIds: string[]) { return this.prisma.fileTag.findMany({ where: { fileId: { in: fileIds } }, include: { tag: true } }); }
    async addFileTagsToPost(postId: string, fileTags: any[]) { if (fileTags.length) await this.prisma.postTag.createMany({ data: fileTags.map(x => ({ postId, tagId: x.tagId, isSuggested: true, score: x.score })), skipDuplicates: true }); }
    createTranscript(fileId: string) { const model = process.env.VIDEO_TRANSCRIPTION_MODEL || 'gpt-4o-mini-transcribe'; return this.prisma.fileTranscript.upsert({ where: { fileId }, update: { status: 'PROCESSING', errorMessage: null, provider: 'openai', model }, create: { fileId, status: 'PROCESSING', provider: 'openai', model } }); }
    completeTranscript(fileId: string, text: string, language?: string, durationSec?: number) { return this.prisma.fileTranscript.update({ where: { fileId }, data: { status: 'COMPLETED', text, language, durationSec, errorMessage: null } }); }
    failTranscript(fileId: string, errorMessage: string) { return this.prisma.fileTranscript.update({ where: { fileId }, data: { status: 'FAILED', errorMessage } }); }
    findByNames(names: string[]) { return this.prisma.tag.findMany({ where: { name: { in: names } }, select: { id: true, name: true } }); }
    async updateEmbeddings(tags: { id: string }[], embeddings: number[][]) { await this.prisma.$transaction(tags.map((tag, i) => this.prisma.tag.update({ where: { id: tag.id }, data: { embedding: embeddings[i] ?? undefined } }))); }
}
