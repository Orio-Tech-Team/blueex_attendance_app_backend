import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsDateString, IsNotEmpty} from "class-validator";

export class GetAttendanceDto{
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty()
    attedance_date : string
}