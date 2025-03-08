import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/zodSchema/create-user.schema';
import { PaginationDto } from 'src/zodSchema/pagination.schema';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        // We need to import the repository from database so we can work with it
        @InjectRepository(User) private usersRepository: Repository<User>
    ){}

    // get all users from db
    async getAllUsers(query: PaginationDto): Promise<User[]> {
        return await this.usersRepository.find({relations: ['profile','products'], skip: Number(query.skip),take: Number(query.take)})
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
    async findUserById(id: number): Promise<User | any> {
        const user = await this.usersRepository.findOne({where: {id} , relations: ['products','profile']})
        if(!user) {
            throw new NotFoundException("No user found with this id")
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

    async validateUser(email: string,password: string){
        const user = await this.usersRepository.findOne({where: {email}})

        if(user) {
            const validatePassword = user?.password === password
            if(validatePassword) {
                return user 
            }
        }
        throw new HttpException("No user found with these credentials",HttpStatus.NOT_FOUND) 

    }

    async uploadUserImage(userId: number, file: Express.Multer.File){
        const user = await this.findUserById(userId)
 const imageurl = file?.originalname;

            if(!file) {
                throw new HttpException("You need to provide a file first",HttpStatus.BAD_REQUEST)
            }

          if(user){
            user.imageurl = imageurl
            await this.usersRepository.save(user)
            return {message: "Sucessfully uploaded the image for the user"}
          }

          throw new HttpException("Image upload failed", HttpStatus.BAD_REQUEST) 
    }
}
