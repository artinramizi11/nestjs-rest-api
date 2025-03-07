import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto, createUserSchema } from 'src/zodSchema/create-user.schema';
import { ZodValidationPipe } from 'src/zodValidation/zodValidation';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { OwnerShip } from 'src/auth/ownership.metadata';
import { OwnerShipGuard } from 'src/guards/ownership.guard';
import { Roles } from 'src/auth/roles';
import { Role } from 'src/enums/role.enum';
import { authorizationGuard } from 'src/guards/authorization.guard';


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

    // Just a demo where we can use metadata so we dont need to access authorization where the logic is on auth guard
    @Get("demo-users")
    @SetMetadata("public",true)
    getDemoUsers(){
        return {users: [{id: 1,user: "jonathan",age: 20},{id: 2,user: "emily",age: 30},{id: 3,user: "john",age: 26}]}
    }

    // create new user
    @Post()
    @Roles(Role.Admin)
    @UseGuards(authorizationGuard)
    createUser(@Body(new ZodValidationPipe(createUserSchema)) body: CreateUserDto) {
        return this.usersService.createUser(body)
    }

    // Only the owner of user's can access to their own user
    @Get(":id")
    @OwnerShip("id")
    @UseGuards(OwnerShipGuard)
    findUser(@Param("id",ParseIntPipe) id: number ) {
        return this.usersService.findUserById(id)

    }

    // delete user by id , only the owners can remove their own user
    @Delete(":id") 
    @OwnerShip("id")
    @UseGuards(OwnerShipGuard)
    deleteUser(@Param("id",ParseIntPipe) id: number){
        return this.usersService.removeUser(id)
    }

    // update user by id, only the owners can update their own user
    @Patch(':id')
    @OwnerShip("id")
    @UseGuards(OwnerShipGuard)
    updateUser(@Param("id",ParseIntPipe) id: number, @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserDto){
        return this.usersService.updateUser(id,body)
    }
}
