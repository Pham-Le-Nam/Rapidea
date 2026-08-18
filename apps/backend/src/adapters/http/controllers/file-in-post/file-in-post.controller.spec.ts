import { Test, TestingModule } from '@nestjs/testing';
import { FileInPostController } from './file-in-post.controller';

describe('FileInPostController', () => {
  let controller: FileInPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileInPostController],
    })
      .useMocker(() => ({}))
      .compile();

    controller = module.get<FileInPostController>(FileInPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
