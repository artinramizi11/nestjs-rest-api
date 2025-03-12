import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/auth/auth.service";
import { User } from "src/entities/user.entity";
import { UsersService } from "src/users/users.service";

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
            ignoreExpiration: false
        })
    }
    async validate(payload: any) {
        const user: User = await this.usersService.findUserById(payload.sub)
       return {
        id: user.id,
        user: user.email,
        role: user.role
       }
        
    }
   

}