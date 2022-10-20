import { IsDate, IsDateString,IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjsx/crud/lib/crud';
import { Type } from "class-transformer";

export class GetAttendanceServerDto {
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty()
    last_update : string
}