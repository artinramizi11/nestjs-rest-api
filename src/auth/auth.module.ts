import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from 'src/strategies/jwt.strategy';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService,JwtService,UsersService,JwtStrategy]
})
export class AuthModule {}
