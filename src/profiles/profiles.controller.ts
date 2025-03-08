import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { createProfileDto, createProfileSchema } from 'src/zodSchema/create-profile.schema';
import { ZodValidationPipe } from 'src/zodValidation/zodValidation';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';


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
    getProfileOfUser(@Param("id",ParseIntPipe) id: number){
        return this.profileService.getProfileByUserId(id)
    }

    // create new profile
    @Post()
    createProfile(@Body(new ZodValidationPipe(createProfileSchema)) body: createProfileDto) {
        return this.profileService.createProfile(body)
    }

    // delete profile from user id
    @Delete("/users/:userId/")
    deleteProfile(@Param("userId", ParseIntPipe) userId: number){
        return this.profileService.removeProfileByUserId(userId)
    }
}
 