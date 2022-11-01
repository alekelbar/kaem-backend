import { Test, TestingModule } from '@nestjs/testing';
import { SubjetsController } from './subjets.controller';
import { SubjetsService } from './subjets.service';

describe('SubjetsController', () => {
  let controller: SubjetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjetsController],
      providers: [SubjetsService],
    }).compile();

    controller = module.get<SubjetsController>(SubjetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
