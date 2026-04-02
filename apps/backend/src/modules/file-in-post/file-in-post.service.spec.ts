import { Test, TestingModule } from '@nestjs/testing';
import { FileInPostService } from './file-in-post.service';

describe('FileInPostService', () => {
  let service: FileInPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileInPostService],
    }).compile();

    service = module.get<FileInPostService>(FileInPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
