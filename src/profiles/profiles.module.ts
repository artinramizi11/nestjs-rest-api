import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile,User])],
  controllers: [ProfilesController],
  providers: [ProfilesService,UsersService]
})
export class ProfilesModule {}
