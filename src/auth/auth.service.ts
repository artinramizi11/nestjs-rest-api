import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/zodSchema/create-user.schema';
import { signInDto } from 'src/zodSchema/sign-in.schema';
import { Repository } from 'typeorm';
import * as dotenv from "dotenv"
dotenv.config()

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    // Try to find a user in database by using the credentials from request user
   async signIn(user: signInDto): Promise<{message: string, token: string}> {
        const userExists = await this.usersRepository.findOne({where: {email: user.email}})
        if(userExists?.password !== user.password) {
            throw new UnauthorizedException()
        }
        const token = await this.jwtService.signAsync({sub: userExists.id,email: userExists.email}, {secret: process.env.SECRET_KEY})
        return {message: "You logged in sucessfully",token}
    }
   
}
