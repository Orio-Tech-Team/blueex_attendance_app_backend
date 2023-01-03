import { Module } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { DesignationController } from './designation.controller';

@Module({
  controllers: [DesignationController],
  providers: [DesignationService]
})
export class DesignationModule {}
