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
            passReqToCallback: true //This lets us to access the request in validate function so we can get the refresh token
        })
    }
    async validate(request: Request,payload: any) {
        const authHeader = request.headers['authorization']

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Invalid or missing refresh token");
        }
        const [bearer,refreshtoken] = authHeader.split(" ")

        // we check if we have user with this id in our database
        const user = await this.usersService.findUserById(payload.sub)

        // we verify the refresh token in database with the one in authorization header
        const hasRefreshedToken = await argon2.verify(user.refreshToken,refreshtoken)
  
        // if we have the same token in headers with the one in database then we return that user 
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