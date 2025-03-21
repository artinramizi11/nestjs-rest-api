import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Product,User])],
    controllers: [ProductsController],
    providers: [ProductsService,UsersService]
})
export class ProductsModule {}
