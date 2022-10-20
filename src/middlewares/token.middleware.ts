import { Injectable, NestMiddleware, Headers } from '@nestjs/common';
import { UnAuthorizedException } from 'src/Helper/Exception/unauthorized.exception';
const jwt = require('jsonwebtoken'); 

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    try{
      let token = req.headers.authorization
      token = token.split(" ")
      token = token[1]
      jwt.verify(token,'3GKsOqRULgOicqaAgzPWGO',function(error,decode){
        if(error){
          throw UnAuthorizedException.exception("Unathorized")
        }
        else{
            req.user_information = {
            user_name : decode.user_name,
            refrence_number : decode.refrence_number
          }
        }
      })
    }
    catch(error){
      throw UnAuthorizedException.exception("UnAuthorized")
    }
    finally{
      next();
    }
  }
}
