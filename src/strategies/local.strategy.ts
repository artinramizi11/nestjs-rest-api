
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entities/user.entity';

// Just added 1 more authentification strategy to practice
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private usersService: UsersService
  ) {
    // Local Strategy as default use username and password but we can change the property names
    super({
        usernameField: "email",
        passwordField: "password"
    });
  }

  // The validate parameters contains email and password from the request body.
  // After we get email passsword from the body we check if it exist in database
  // If exists in database we return user which that user will be registered as request.user
  async validate(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email,password)
    if(!user) {
        throw new HttpException("Validation failed for this user", HttpStatus.FAILED_DEPENDENCY)
    }
    return user
   
  }
}
