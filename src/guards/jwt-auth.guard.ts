import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    constructor(
        private reflector: Reflector
    ){
        super()
    }

    canActivate(context: ExecutionContext) {

        // The routes that have public metadata wont be asked for authorization for jwt token
        const isPublic = this.reflector.getAllAndOverride<boolean>("public", [context.getHandler(),context.getClass()])
        if(isPublic) {
            return true
        }

        // the routes that are not included with metadata public will get asked for authorization
        return super.canActivate(context)
    }
}