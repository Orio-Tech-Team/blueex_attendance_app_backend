import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsDateString, isDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetAttendanceDataDto{
    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    from_date : string

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    to_date : string

    @ApiProperty()
    @IsString()
    @IsOptional()
    employee_number : string
}