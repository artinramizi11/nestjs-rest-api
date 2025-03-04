import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import * as dotenv from "dotenv"
dotenv.config()

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService){}
   async canActivate(context: ExecutionContext)  {
        const request = context.switchToHttp().getRequest()
        const authHeader = request.headers?.authorization
        if(!authHeader) {
            throw new UnauthorizedException()
        }
        const [bearer,token] = authHeader.split(" ")
        try {
            const payload = await this.jwtService.verifyAsync(token, {secret: process.env.SECRET_KEY })
            request.user = payload;
            return true;

        } catch(err) {
            throw new UnauthorizedException()
        }
    }
}