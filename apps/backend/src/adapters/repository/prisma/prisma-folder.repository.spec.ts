import { PrismaFolderRepository } from './prisma-folder.repository';

function createPrismaMock() {
    const transaction = {
        folder: {
            update: jest.fn(),
            updateMany: jest.fn(),
        },
    };
    return {
        users: { findUnique: jest.fn() },
        folder: {
            findFirst: jest.fn(),
            findMany: jest.fn(),
            create: jest.fn(),
        },
        $transaction: jest.fn(async (operation) => operation(transaction)),
        transaction,
    };
}

describe('PrismaFolderRepository public folder visibility', () => {
    it('inherits public visibility when creating a child folder', async () => {
        const prisma = createPrismaMock();
        prisma.users.findUnique.mockResolvedValue({ id: 'user-1' });
        prisma.folder.findFirst.mockResolvedValue({ isPublic: true });
        prisma.folder.create.mockResolvedValue({ id: 'child-1' });
        const repository = new PrismaFolderRepository(prisma as any);

        await repository.create('user-1', 'Examples', 'free-folder');

        expect(prisma.folder.create).toHaveBeenCalledWith({
            data: {
                userId: 'user-1',
                parentId: 'free-folder',
                name: 'Examples',
                isPublic: true,
            },
        });
    });

    it('allows the application to create the initial public folder explicitly', async () => {
        const prisma = createPrismaMock();
        prisma.users.findUnique.mockResolvedValue({ id: 'user-1' });
        prisma.folder.findFirst.mockResolvedValue({ isPublic: false });
        prisma.folder.create.mockResolvedValue({ id: 'free-folder' });
        const repository = new PrismaFolderRepository(prisma as any);

        await repository.create('user-1', 'free', 'root-folder', true);

        expect(prisma.folder.create).toHaveBeenCalledWith({
            data: expect.objectContaining({ isPublic: true }),
        });
    });

    it('cascades the destination visibility through a moved subtree', async () => {
        const prisma = createPrismaMock();
        prisma.folder.findFirst.mockImplementation(({ where }) => {
            if (where.id === 'folder-1') return Promise.resolve({ id: 'folder-1' });
            return Promise.resolve({ id: 'free-folder', isPublic: true });
        });
        prisma.folder.findMany
            .mockResolvedValueOnce([{ id: 'child-1' }])
            .mockResolvedValueOnce([]);
        prisma.transaction.folder.update.mockResolvedValue({
            id: 'folder-1',
            isPublic: true,
        });
        const repository = new PrismaFolderRepository(prisma as any);

        await repository.move('folder-1', 'user-1', 'free-folder');

        expect(prisma.transaction.folder.update).toHaveBeenCalledWith({
            where: { id: 'folder-1', userId: 'user-1' },
            data: { parentId: 'free-folder', isPublic: true },
        });
        expect(prisma.transaction.folder.updateMany).toHaveBeenCalledWith({
            where: {
                id: { in: ['child-1'] },
                userId: 'user-1',
            },
            data: { isPublic: true },
        });
    });
});
