import { Test, TestingModule } from '@nestjs/testing';
import { AttendacneController } from './attendacne.controller';
import { AttendacneService } from './attendacne.service';

describe('AttendacneController', () => {
  let controller: AttendacneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendacneController],
      providers: [AttendacneService],
    }).compile();

    controller = module.get<AttendacneController>(AttendacneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
