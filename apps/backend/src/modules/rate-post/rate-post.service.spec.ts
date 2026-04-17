import { Test, TestingModule } from '@nestjs/testing';
import { RatePostService } from './rate-post.service';

describe('RatePostService', () => {
  let service: RatePostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RatePostService],
    }).compile();

    service = module.get<RatePostService>(RatePostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
