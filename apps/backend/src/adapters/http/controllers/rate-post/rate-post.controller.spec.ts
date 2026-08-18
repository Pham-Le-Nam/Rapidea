import { Test, TestingModule } from '@nestjs/testing';
import { RatePostController } from './rate-post.controller';

describe('RatePostController', () => {
  let controller: RatePostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatePostController],
    })
      .useMocker(() => ({}))
      .compile();

    controller = module.get<RatePostController>(RatePostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
