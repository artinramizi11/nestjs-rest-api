import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { signInDto, signInSchema } from 'src/zodSchema/sign-in.schema';
import { ZodValidationPipe } from 'src/zodValidation/zodValidation';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    
    ){}

    @Get("test")
    @UseFilters()
    test(){
        throw new HttpException("Something went wrong",HttpStatus.UNAUTHORIZED)
        
    }

    // Login in existing account in database to get your token
    @Post("login")
    login(@Body(new ZodValidationPipe(signInSchema)) body: signInDto){
        return this.authService.signIn(body)
    }

    // Get access to your profile by using token
    @Get("profile")
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() request){
        return this.usersService.findUserById(request.user.sub)
    }

    // Get a new token
    @Post("refresh")
    @UseGuards(AuthGuard("refresh-jwt"))
    refreshToken(@Req() req){
       return this.authService.refreshToken(req.user.id)
        
    }

    // when logging out the refresh token in database will get removed
    @Post("logout")
    @UseGuards(JwtAuthGuard)
    SignOut(@Req() req){
        return this.authService.logout(req.user.sub)
    }
}
