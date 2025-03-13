import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class UserOwner implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const user = request.user
        const userId = request.params.id

        const isOwner = user.sub === Number(userId)

        // Only the owner or super admin's can have access to the route handler else will throw an error
        if(isOwner || user.role === "super-admin"){
            return true
        }

        throw new HttpException("No permissions to do this action", HttpStatus.UNAUTHORIZED)
        
       
    }
}