import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/auth/auth.service";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/users/users.service";
import * as argon2 from "argon2"

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "refresh-jwt"){


    constructor(
        private configService: ConfigService,
        private authService: AuthService,
        private usersService: UsersService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("REFRESH_SECRET_KEY") as string,
            ignoreExpiration: false,
            passReqToCallback: true
        })
    }
    async validate(request: Request,payload: any) {
        console.log(payload)
        const authHeader = request.headers['authorization']

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Invalid or missing refresh token");
        }
        const [bearer,refreshtoken] = authHeader.split(" ")

        const user: User = await this.usersService.findUserById(payload.sub)
        const hasRefreshedToken = await argon2.verify(user.refreshToken,refreshtoken)
  
        if(hasRefreshedToken){
            return {
                id: user.id,
                user: user.email,
                role: user.role
               }
        }

        throw new UnauthorizedException("You dont have the valid refresh token to do this action")
      
      
        
    }
   

}