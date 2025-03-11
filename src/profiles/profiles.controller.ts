import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { createProfileDto, createProfileSchema } from 'src/zodSchema/create-profile.schema';
import { ZodValidationPipe } from 'src/zodValidation/zodValidation';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles';
import { Role } from 'src/enums/role.enum';
import { authorizationGuard } from 'src/guards/authorization.guard';
import { UserOwner } from 'src/guards/user-owner.guard';


@UseGuards(JwtAuthGuard)
@Controller('profiles')
export class ProfilesController {
    constructor(
        private profileService: ProfilesService
    ){}

    // get all profiles
    @Get()
    getProfiles() {
        return this.profileService.getProfiles()
    }

    // get user profile by user id
    @Get("/users/:id")
    @Roles(Role.Admin)
    @UseGuards(authorizationGuard,UserOwner)
    getProfileOfUser(@Param("id",ParseIntPipe) id: number){
        return this.profileService.getProfileByUserId(id)
    }

    // create new profile
    @Post()
    @Roles(Role.SuperAdmin)
    @UseGuards(authorizationGuard)
    createProfile(@Body(new ZodValidationPipe(createProfileSchema)) body: createProfileDto) {
        return this.profileService.createProfile(body)
    }

    // delete profile from user id
    @Delete("/users/:userId/")
    @Roles(Role.Admin)
    @UseGuards(authorizationGuard,UserOwner)
    deleteProfile(@Param("userId", ParseIntPipe) userId: number){
        return this.profileService.removeProfileByUserId(userId)
    }
}
 