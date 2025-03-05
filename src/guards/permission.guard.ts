import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { permission_key } from "src/auth/permissions";
import { Permission } from "src/enums/permission.enum";
import { UsersService } from "src/users/users.service";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private usersService: UsersService
    
    ){}
    async canActivate(context: ExecutionContext) {
        console.log("inside permission guard")

        const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(permission_key,[context.getHandler(),context.getClass()])
        const request = context.switchToHttp().getRequest()
        const user = await this.usersService.findUserById(request.user.sub)

        console.log(user)

        const hasAllPermissions = requiredPermissions.every(permission => user.permissions?.includes(permission))     
        
        if(hasAllPermissions) {
            return true
        }
         throw new HttpException("You dont have permission to do this action",HttpStatus.UNAUTHORIZED)
        
    }
}