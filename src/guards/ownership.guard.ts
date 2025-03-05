import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class OwnerShipGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ){}
    canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest()
        const requiredParamKey = this.reflector.getAllAndOverride<string>("ownership",[context.getHandler(),context.getClass()])
        const {user} = request;

       const ownerUserId = request.params[requiredParamKey]

    // When user try to get information by using users/:id param
       const isOwner = Number(ownerUserId) === user.sub
       const hasSuperAdmin = user.role === 'super-admin'

    //    When user try to create profile for his user 
       const ownProfile = request.body.userId === user.sub

       if(ownProfile){
        return true 
       }

       if(isOwner || hasSuperAdmin) {
        return true
       }

       throw new HttpException("You dont own this profile", HttpStatus.FORBIDDEN)

    }
    
}