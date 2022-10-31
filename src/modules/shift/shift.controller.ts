import { Controller, Get, Req } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { Shift } from './entities/shift.entity';

@Controller('shift')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Get('all')
  async find(@Req() req): Promise<Shift[]> {
    return await this.shiftService.getAllShifts();
  }
}
