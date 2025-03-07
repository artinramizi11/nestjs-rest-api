import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class UserOwner implements CanActivate {
    canActivate(context: ExecutionContext) {
        return false
    }
}