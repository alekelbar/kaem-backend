import { Test, TestingModule } from '@nestjs/testing';
import { SubjetsService } from './subjets.service';

describe('SubjetsService', () => {
  let service: SubjetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubjetsService],
    }).compile();

    service = module.get<SubjetsService>(SubjetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
