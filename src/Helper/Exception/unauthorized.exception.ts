import { HttpException, HttpStatus } from '@nestjs/common';
export class UnAuthorizedException{
    static exception(errorMessage){
        throw new HttpException({
            message : errorMessage
        },HttpStatus.UNAUTHORIZED)
    }
}