import { HttpException, HttpStatus } from '@nestjs/common';
export class DataNotFoundException{
    static exception(errorMessage){
        throw new HttpException({
            message : errorMessage
        },HttpStatus.BAD_REQUEST)
    }
}