import { Test, TestingModule } from '@nestjs/testing';
import { DesignationService } from './designation.service';

describe('DesignationService', () => {
  let service: DesignationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesignationService],
    }).compile();

    service = module.get<DesignationService>(DesignationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
