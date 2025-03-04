import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { createProfileDto } from 'src/zodSchema/create-profile.schema';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
        private userService: UsersService
    ){}

    // get all profiles from db
    async getProfiles(): Promise<Profile[]>{
        return await this.profileRepository.find()
    }

    // create profile in db
    async createProfile(createProfile: createProfileDto): Promise<User | {message: string}> {
        const user = await this.userService.findUserById(createProfile.userId)

        const existingProfile = await this.profileRepository.findOne({where: {user: user}})

        if(existingProfile) {
            Object.assign(existingProfile,createProfile)
            await this.profileRepository.save(existingProfile)
            return { message: "Profile updated successfully", profile: existingProfile };
        }

        const newProfile = this.profileRepository.create({...createProfile, user: user})
        await this.profileRepository.save(newProfile)
        return { message: "Profile created successfully", profile: newProfile };
    }

    // remove profile by user id in db
    async removeProfileByUserId(userId: number): Promise<User | {message: string}>{
        const user = this.userService.findUserById(userId)
        if(!user) {
            throw new NotFoundException()
        }
        const profile = await this.profileRepository.findOne({where: {user: {id: userId}}})
        if(!profile) {
            throw new NotFoundException()
        }
        await this.profileRepository.remove(profile)
        return {message: `Sucessfully removed the profile in the user with ID ${userId}`}

    }

    // get profile by user id from db
    async getProfileByUserId(id): Promise<Profile>{
        const profile = await this.profileRepository.findOne({where: {user: {id}}})
        if(!profile) {
            throw new NotFoundException()
        }
        return profile

    }


}
