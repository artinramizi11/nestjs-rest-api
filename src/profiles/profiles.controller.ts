import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { createProfileDto, createProfileSchema } from 'src/zodSchema/create-profile.schema';
import { ZodValidationPipe } from 'src/zodValidation/zodValidation';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/auth/roles';
import { authorizationGuard } from 'src/guards/authorization.guard';
import { OwnerShipGuard } from 'src/guards/ownership.guard';


@UseGuards(AuthGuard)
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

    // get user by id
    @Get("/users/:id")
    getProfileOfUser(@Param("id",ParseIntPipe) id: number){
        return this.profileService.getProfileByUserId(id)
    }

    // create new profile
    @Post()
    @UseGuards(AuthGuard,OwnerShipGuard)
    createProfile(@Body(new ZodValidationPipe(createProfileSchema)) body: createProfileDto) {
        return this.profileService.createProfile(body)
    }

    // delete profile from user id
    @Delete("/users/:userId/")
    deleteProfile(@Param("userId", ParseIntPipe) userId: number){
        return this.profileService.removeProfileByUserId(userId)
    }
}
 