import { Body, Controller, Delete, Get , Param, ParseIntPipe, Patch, Post, Query, SetMetadata, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
import { CreateUserDto, createUserSchema } from 'src/zodSchema/create-user.schema';
import { ZodValidationPipe } from 'src/zodValidation/zodValidation';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles';
import { Role } from 'src/enums/role.enum';
import { authorizationGuard } from 'src/guards/authorization.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multerconfig';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOwner } from 'src/guards/user-owner.guard';
import { PaginationDto, paginationSchema } from 'src/zodSchema/pagination.schema';
import { UpdateUserDto, UpdateUserSchema } from 'src/zodSchema/update-user.schema';
import { SkipThrottle, Throttle, ThrottlerGuard } from '@nestjs/throttler';


// This controller is protected by an authentication guard that verifies JWT tokens.  
// Once the JWT token is validated, the authorizationGuard checks if the user role includes the Role.Admin to acess the route
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
        @InjectRepository(User) private usersRepository: Repository<User>
    ){}

    // get all users by using pagination with query Skip and Take
    @Get()
   async getUsers(@Query(new ZodValidationPipe(paginationSchema)) query: PaginationDto){
         return this.usersService.getAllUsers(query)
        
    }


    // Only the owner user can upload the image on his user details
    @Post(":id/image")
    @UseGuards(UserOwner)
    @UseInterceptors(FileInterceptor("image", multerConfig))
      async uploadUserImage(@UploadedFile() file: Express.Multer.File, @Param("id") id: number){
        return this.usersService.uploadUserImage(id,file)
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
    findUser(@Param("id",ParseIntPipe) id: number ) {
        return this.usersService.findUserById(id)

    }

    // delete user by id , only the owners can remove their own user
    @Delete(":id") 
    @UseGuards(UserOwner)
    deleteUser(@Param("id",ParseIntPipe) id: number){
        return this.usersService.removeUser(id)
    }

    // update user by id, only the owners can update their own user
    @Patch(':id')
    @UseGuards(UserOwner)
    updateUser(@Param("id",ParseIntPipe) id: number, @Body(new ZodValidationPipe(UpdateUserSchema)) body: UpdateUserDto){
        return this.usersService.updateUser(id,body)
    }
}
