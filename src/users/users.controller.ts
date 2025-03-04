import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto, createUserSchema } from 'src/zodSchema/create-user.schema';
import { ZodValidationPipe } from 'src/zodValidation/zodValidation';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/auth/roles';
import { authorizationGuard } from 'src/guards/authorization.guard';
import { Role } from 'src/enums/role.enum';
import { Permissions } from 'src/auth/permissions';
import { Permission } from 'src/enums/permission.enum';
import { PermissionGuard } from 'src/guards/permission.guard';
import { RolesPermissions } from 'src/auth/permissions-map';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ){}

    // get all users
    @Get()
    @Roles(Role.Admin)
    @Permissions(Permission.Read)
    @UseGuards(AuthGuard,authorizationGuard,PermissionGuard)
    getUsers(){
        return this.usersService.getAllUsers()
    }

    // create new user
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,authorizationGuard)
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
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,authorizationGuard)
    @UseGuards(AuthGuard)
    deleteUser(@Param("id",ParseIntPipe) id: number){
        return this.usersService.removeUser(id)
    }

    // update user by id
    @Patch(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,authorizationGuard)
    updateUser(@Param("id",ParseIntPipe) id: number, @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserDto){
        return this.usersService.updateUser(id,body)
    }
}
