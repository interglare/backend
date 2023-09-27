import { Test, TestingModule } from '@nestjs/testing';
import { FirstApiService } from './first-api.service';

describe('FirstApiService', () => {
  let service: FirstApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirstApiService],
    }).compile();

    service = module.get<FirstApiService>(FirstApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
