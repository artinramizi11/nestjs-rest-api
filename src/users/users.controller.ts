import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto, createUserSchema } from 'src/zodSchema/create-user.schema';
import { ZodValidationPipe } from 'src/zodValidation/zodValidation';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { OwnerShip } from 'src/auth/ownership.metadata';
import { OwnerShipGuard } from 'src/guards/ownership.guard';


// This controller is protected by an authentication guard that verifies JWT tokens.  
// Once the JWT token is validated, the authorizationGuard checks if the user role includes the Role.Admin to acess the route
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ){}

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
    @OwnerShip("id")
    @UseGuards(OwnerShipGuard)
    findUser(@Param("id",ParseIntPipe) id: number ) {
        return this.usersService.findUserById(id)

    }

    // delete user by id
    @Delete(":id") 
    @OwnerShip("id")
    @UseGuards(OwnerShipGuard)
    deleteUser(@Param("id",ParseIntPipe) id: number){
        return this.usersService.removeUser(id)
    }

    // update user by id
    @Patch(':id')
    @OwnerShip("id")
    @UseGuards(OwnerShipGuard)
    updateUser(@Param("id",ParseIntPipe) id: number, @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserDto){
        return this.usersService.updateUser(id,body)
    }
}
