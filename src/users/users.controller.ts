import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto, createUserSchema } from 'src/zodSchema/create-user.schema';
import { ZodValidationPipe } from 'src/zodValidation/zodValidation';
import { AuthGuard } from 'src/guards/auth.guard';
import { ForbiddenException } from 'src/exceptions/forbidden.exceptions';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ){}

    @Get(":name")
    testController(){
        throw new ForbiddenException
    }

    // get all users
    @Get()
    getUsers(){
        return this.usersService.getAllUsers()
    }

    // create new user
    @Post()
    createUser(@Body(new ZodValidationPipe(createUserSchema)) body: CreateUserDto) {
        return this.usersService.createUser(body)
    }

    // get user by id
    @Get(":id")
    findUser(@Param("id",ParseIntPipe) id: number ) {
        return this.usersService.findUserById(id)

    }

    // delete user by id
    @Delete(":id")
    @UseGuards(AuthGuard)
    deleteUser(@Param("id",ParseIntPipe) id: number){
        return this.usersService.removeUser(id)
    }

    // update user by id
    @Patch(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param("id",ParseIntPipe) id: number, @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserDto){
        return this.usersService.updateUser(id,body)
    }
}
