import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class GetAttendanceDto {
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty()
  attedance_date: string;
}

export class GetPerEmployeeAttendanceDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  attendance_month: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  attendance_year: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  employee_number: string;
}
