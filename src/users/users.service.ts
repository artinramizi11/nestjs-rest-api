import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/zodSchema/create-user.schema';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ){}

    // get all users from db
    async getAllUsers(): Promise<User[]> {
        return await this.usersRepository.find({relations: ['profile','products']})
    }

    // create user in db
    async createUser(createUser: CreateUserDto): Promise<User | {message: string}>{
        try {
            const user = await this.usersRepository.save(createUser)
            return user
        } catch(err) {
            if(err.code === '23505') {
                return {message: "This email is already in use, try another email"}
            }
            return err
        }
    }

    // find user in db
    async findUserById(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({where: {id} , relations: ['products','profile']})
        if(!user) {
            throw new NotFoundException()
        }
        return user
    }

    // remove user from db
    async removeUser(id: number): Promise<{message: string}>{
        const user = await this.usersRepository.findOne({where: {id}})
        if(!user) {
            throw new NotFoundException()
        }
        await this.usersRepository.remove(user)
        return {message: "user got removed sucessfully"}
    }

    // update user in db
    async updateUser(id: number,updatedInfo: CreateUserDto): Promise<User | {message: string,user: User}>{
        const user = await this.usersRepository.findOne({where: {id}})
        if(!user){
            throw new NotFoundException()
        }
        Object.assign(user,updatedInfo )
        await this.usersRepository.save(user)
        return {message: "Sucessfully updated the new user", user}

    }
}
