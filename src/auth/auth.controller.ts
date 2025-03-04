import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { signInDto, signInSchema } from 'src/zodSchema/sign-in.schema';
import { ZodValidationPipe } from 'src/zodValidation/zodValidation';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    
    ){}

    // Login in existing account in database to get your token
    @Post("login")
    login(@Body(new ZodValidationPipe(signInSchema)) body: signInDto){
        return this.authService.signIn(body)
    }

    // Get access to your profile by using your token 
    @Get("profile")
    @UseGuards(AuthGuard)
    getProfile(@Req() request){
        return this.usersService.findUserById(request.user.sub)
    }
}
