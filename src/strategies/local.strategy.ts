
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService
  ) {
    super({
        usernameField: "email",
        passwordField: "password"
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email,password)
    if(!user) {
        throw new HttpException("Validation failed for this user", HttpStatus.FAILED_DEPENDENCY)
    }
    return user
   
  }
}
