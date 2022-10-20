import { Test, TestingModule } from '@nestjs/testing';
import { AttendacneService } from './attendacne.service';

describe('AttendacneService', () => {
  let service: AttendacneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendacneService],
    }).compile();

    service = module.get<AttendacneService>(AttendacneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
