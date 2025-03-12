import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { signInDto } from 'src/zodSchema/sign-in.schema';
import { Repository } from 'typeorm';
import * as dotenv from "dotenv"
import { ConfigService } from '@nestjs/config';
dotenv.config()

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    // Try to find a user in database by using the credentials from request user
   async signIn(user: signInDto) {
        const userExists = await this.usersRepository.findOne({where: {email: user.email}})
        if(userExists?.password !== user.password) {
            throw new UnauthorizedException()
        }
        const token = await this.jwtService.signAsync({sub: userExists?.id, email: userExists?.email, role: userExists?.email},{secret: this.configService.get("SECRET_KEY")})
        const refreshToken = await this.jwtService.signAsync({sub: userExists?.id, email: userExists?.email, userExists: user?.email}, {secret: this.configService.get("REFRESH_SECRET_KEY"),expiresIn: this.configService.get("REFRESH_EXPIRE_TIME")})

        return {
            token,
            refreshToken
        }
    }



    async refreshToken(userId: number){
            const user = await this.usersRepository.findOne({where: {id: userId}})
            if(!user){
                throw new UnauthorizedException("No user found")
            }
            const token = await this.jwtService.signAsync({id: user.id,email: user.email,role: user.role},{secret: this.configService.get("SECRET_KEY")})
            return {
                id: user.id,
                token
            }
    }   
}
