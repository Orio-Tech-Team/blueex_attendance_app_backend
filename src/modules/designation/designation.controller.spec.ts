import { Test, TestingModule } from '@nestjs/testing';
import { DesignationController } from './designation.controller';
import { DesignationService } from './designation.service';

describe('DesignationController', () => {
  let controller: DesignationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesignationController],
      providers: [DesignationService],
    }).compile();

    controller = module.get<DesignationController>(DesignationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
