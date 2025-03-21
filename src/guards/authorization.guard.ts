import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Roles, roles_key } from "src/auth/roles";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/users/users.service";


@Injectable()
export class authorizationGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private usersService: UsersService
    ){}
    async canActivate(context: ExecutionContext) {
        console.log("inside authorization guard")
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(roles_key, [
            context.getHandler(),
            context.getClass()
        ])

          const request = context.switchToHttp().getRequest()
        const userId = request.user?.sub;
        const user = await this.usersService.findUserById(userId)


        if(user.role === 'super-admin') {
            return true
        }
        const hasAllRoles = requiredRoles.every(role => user.role?.includes(role))

        if(!hasAllRoles){
            throw new HttpException("No permission to do this action",HttpStatus.UNAUTHORIZED)
        }
        return hasAllRoles
     

       
    }
}